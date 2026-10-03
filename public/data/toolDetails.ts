import type { CategoryIconName } from "@/components/ToolDetails/categoryIcons";

/**
 * Everything the shared "Explore more" page needs per tool, apart from its copy.
 *
 * Keyed by the tool's key in locales/<lang>/toolsListData.json, which is also
 * the `toolId` route segment of /onlinetools/details/[toolId]. The words on the
 * page (title, category names, testimonial) live in the `toolDetailsScreen`
 * namespace under `tools.<toolId>`; this file holds only what is not text.
 */

export interface ToolDetailConfig {
  /** The card colours in the mockups: most tools are blue, two are purple. */
  theme: "blue" | "purple";
  cardTheme?: "blue" | "purple" | "orange" | "teal" | "pink" | "coral" | "rose";
  /**
   * Category tiles, in display order. `key` names the copy in
   * `tools.<toolId>.categories.<key>` and selects its matching SVG icon.
   */
  categories: { key: CategoryIconName }[];
  /** Illustration beside the testimonial, if the design has one. */
  testimonialImage?: { src: string; width: number; height: number; layout: "side" | "center" };
}

export const toolDetails: Record<string, ToolDetailConfig> = {
  character_design: {
    theme: "blue",
    cardTheme: "orange",
    categories: [
      { key: "appearance" },
      { key: "goal" },
      { key: "personality" },
      { key: "strength" },
      { key: "weakness" },
      { key: "superpower" },
    ],
    testimonialImage: {
      src: "/image/tool_details/character_design.png",
      width: 370,
      height: 730,
      layout: "side",
    },
  },
  content_design: {
    theme: "purple",
    cardTheme: "teal",
    categories: [
      { key: "objective" },
      { key: "platform" },
      { key: "format" },
      { key: "technique" },
      { key: "moodTone" },
      { key: "contentType" },
    ],
  },
  education_design: {
    theme: "blue",
    cardTheme: "pink",
    categories: [
      { key: "subject" },
      { key: "technique" },
      { key: "format" },
      { key: "usp" },
      { key: "level" },
      { key: "method" },
    ],
  },
  gamification_in_business: {
    theme: "blue",
    cardTheme: "rose",
    categories: [{ key: "purpose" }, { key: "gamification" }, { key: "career" }],
  },
  innovation_design: {
    theme: "blue",
    categories: [
      { key: "outcome" },
      { key: "user" },
      { key: "purpose" },
      { key: "situation" },
      { key: "place" },
      { key: "material" },
    ],
    // The noodle vending machine from the home page's outcome section.
    testimonialImage: {
      src: "/image/product1.jpg",
      width: 594,
      height: 817,
      layout: "center",
    },
  },
  pitching_design: {
    theme: "blue",
    cardTheme: "coral",
    categories: [
      { key: "technique" },
      { key: "mission" },
      { key: "audience" },
      { key: "productService" },
      { key: "emotion" },
    ],
  },
  story_design: {
    theme: "purple",
    cardTheme: "purple",
    categories: [
      { key: "genre" },
      { key: "plot" },
      { key: "period" },
      { key: "setting" },
      { key: "protagonist" },
      { key: "antagonist" },
    ],
    testimonialImage: {
      src: "/image/tool_details/story_design.jpg",
      width: 448,
      height: 568,
      layout: "side",
    },
  },
};

export function hasToolDetails(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(toolDetails, toolId);
}

/**
 * The tools before and after `toolId` in its category, skipping tools that
 * have no details page yet, wrapping around at the ends. `null` when the
 * category has no other tool with a page.
 *
 * `categories` is the `tools` object of locales/<lang>/toolsListData.json, so
 * the order matches the carousel on the online tools page.
 */
export function neighbourTools(
  toolId: string,
  categories: Record<string, Record<string, unknown>>
): { prev: string; next: string } | null {
  for (const tools of Object.values(categories)) {
    const ids = Object.keys(tools);
    if (!ids.includes(toolId)) continue;
    const withPages = ids.filter(hasToolDetails);
    const i = withPages.indexOf(toolId);
    if (withPages.length < 2 || i === -1) return null;
    return {
      prev: withPages[(i - 1 + withPages.length) % withPages.length],
      next: withPages[(i + 1) % withPages.length],
    };
  }
  return null;
}
