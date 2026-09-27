import { categoryIconForKey, type CategoryIconName } from "./categoryIcons";

export interface ExampleCard {
  /** Short code printed in the card's corner, e.g. "GENRE01". */
  code: string;
  icon: CategoryIconName;
  /** Printed in the tag under the description, e.g. "What-Outcome". */
  category: string;
  categoryPrompt?: string;
  backHeading?: string;
  /** Big text on the back, e.g. "DESIGN GENRE"; replaces the category there. */
  backTitle?: string;
  /** Line under the back title, e.g. "Story Design"; replaces the tool name. */
  backSubtitle?: string;
  title: string;
  content: string;
}

/** One entry of public/data/toolExampleCards/<toolId>.json. */
interface ExampleCardEntry {
  front: { category: string; title: string; subtitle: string };
  back: { category: string; title: string; subtitle: string };
}

// The example cards are curated per tool rather than drawn from the decks.
// Listed out so each file is its own chunk and a page downloads only its own.
const exampleDecks: Record<string, () => Promise<{ default: ExampleCardEntry[] }>> = {
  character_design: () => import("@/public/data/toolExampleCards/character_design.json"),
  content_design: () => import("@/public/data/toolExampleCards/content_design.json"),
  education_design: () => import("@/public/data/toolExampleCards/education_design.json"),
  gamification_in_business: () =>
    import("@/public/data/toolExampleCards/gamification_in_business.json"),
  innovation_design: () => import("@/public/data/toolExampleCards/innovation_design.json"),
  pitching_design: () => import("@/public/data/toolExampleCards/pitching_design.json"),
  story_design: () => import("@/public/data/toolExampleCards/story_design.json"),
};

/** Short, card-corner style code from a category: "Genre" → "GENRE01". */
function cardCode(category: string, index: number): string {
  const letters = category.replace(/[^a-z]/gi, "").slice(0, 6).toUpperCase();
  return `${letters}${String(index + 1).padStart(2, "0")}`;
}

/** The tool's curated example cards, in the order they are listed in its file. */
export async function loadExampleCards(toolId: string): Promise<ExampleCard[]> {
  const loader = exampleDecks[toolId];
  if (!loader) return [];
  const entries = (await loader()).default;

  const perCategory = new Map<string, number>();
  return entries.map(({ front, back }) => {
    const index = perCategory.get(front.category) ?? 0;
    perCategory.set(front.category, index + 1);
    return {
      code: cardCode(front.category, index),
      // "What-Outcome" → "Outcome", which is the key the icon set knows.
      icon: categoryIconForKey(front.category.split("-").pop() ?? front.category),
      category: front.category,
      title: front.title,
      content: front.subtitle,
      backTitle: back.title,
      backSubtitle: back.subtitle,
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
 * Draw up to `count` random cards, spread across as many categories as
 * possible: categories are shuffled and dealt round-robin, one random card
 * from each in turn, so a category only repeats once every one has been used.
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
