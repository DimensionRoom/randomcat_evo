import { categoryIconForKey, type CategoryIconName } from "./categoryIcons";
import type { CardSource } from "@/public/data/toolDetails";

export interface ExampleCard {
  /** Short code printed in the card's corner, e.g. "WHY01". */
  code: string;
  icon: CategoryIconName;
  category: string;
  categoryPrompt?: string;
  backHeading?: string;
  title: string;
  content: string;
}

/** Short, card-corner style code from a category key: "Why" → "WHY01". */
function cardCode(key: string, index: number): string {
  return `${key.replace(/[^a-z]/gi, "").slice(0, 6).toUpperCase()}${String(index + 1).padStart(2, "0")}`;
}

// Listed out rather than built from a template string, so each deck is its own
// chunk and only the one a page needs is downloaded.
const catDecks: Record<string, () => Promise<{ default: any }>> = {
  characterdesignCat: () => import("@/public/json/characterdesignCat.json"),
  contentdesignCat: () => import("@/public/json/contentdesignCat.json"),
  edudesignCat: () => import("@/public/json/edudesignCat.json"),
  innodesignCat: () => import("@/public/json/innodesignCat.json"),
  storydesignCat: () => import("@/public/json/storydesignCat.json"),
};

const boardDecks = {
  pitchingdesign: () => import("@/public/data/pitchingdesign/cards_en"),
  gamificationinbusiness: () => import("@/public/data/gamificationinbusiness/cards_en"),
};

/** Load every real card so random selection covers the entire tool deck. */
export async function loadExampleCards(
  source: CardSource,
  locale: string
): Promise<ExampleCard[]> {
  const isThai = locale === "th";

  if (source.kind === "catJson") {
    const loader = catDecks[source.file];
    if (!loader) return [];
    const deck = (await loader()).default as Record<string, any>;
    return Object.entries(deck).flatMap(([key, category]) => {
      return (category.data ?? []).map((item: {
        th?: string; en?: string; content_th?: string; content_en?: string;
      }, index: number): ExampleCard => {
        const title = (isThai ? item.th : item.en) || item.en || item.th || "";
        const content =
          (isThai ? item.content_th : item.content_en) ||
          item.content_en ||
          item.content_th ||
          "";
        return {
          code: cardCode(key, index),
          icon: categoryIconForKey(key),
          backHeading: source.file === "characterdesignCat" ? "Character" : undefined,
          categoryPrompt: source.file === "innodesignCat" ? key : undefined,
          category: category.subTitle || category.title || key,
          title,
          content,
        };
      });
    });
  }

  const { cards, cardCategories } = (await boardDecks[source.tool]()) as {
    cards: { category: string; frontTitle: string; backContent: string }[];
    cardCategories: Record<string, { name: string }>;
  };
  // Include source cards even if their category is absent from the UI legend.
  const categoryIndices = new Map<string, number>();
  return cards.map(card => {
    const index = categoryIndices.get(card.category) ?? 0;
    categoryIndices.set(card.category, index + 1);
    return {
      code: cardCode(card.category, index),
      icon: categoryIconForKey(card.category),
      category: cardCategories[card.category]?.name ?? card.category,
      title: card.frontTitle,
      content: card.backContent,
    };
  });
}

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Draw `count` random cards spread across as many categories as possible.
 *
 * A plain shuffle favours the big categories (Innovation Design's "User" has
 * 51 cards against "Material"'s 17), so four examples often came from the same
 * one or two. Here the categories are shuffled and dealt round-robin, one
 * random card from each in turn, so categories only repeat once every one of
 * them has been used.
 */
export function pickVariedCards(cards: ExampleCard[], count: number): ExampleCard[] {
  const byCategory = new Map<string, ExampleCard[]>();
  for (const card of cards) {
    const group = byCategory.get(card.category);
    if (group) group.push(card);
    else byCategory.set(card.category, [card]);
  }

  const piles = shuffled([...byCategory.values()]).map((pile) => shuffled(pile));
  const picked: ExampleCard[] = [];
  while (picked.length < count && piles.some((pile) => pile.length > 0)) {
    for (const pile of piles) {
      const card = pile.pop();
      if (card) picked.push(card);
      if (picked.length === count) break;
    }
  }
  return picked;
}
