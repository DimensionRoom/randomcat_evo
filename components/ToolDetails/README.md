# DeckCard

Reusable front/back card based on the supplied Innovation Design print references.
The card has a 3:5 aspect ratio; all internal sizes scale with its container width.

```tsx
<DeckCard
  side="front"
  theme="blue"
  toolTitle="Innovation Design"
  brandLabel="Inno Design"
  card={{
    code: "WHAT06",
    icon: "outcome",
    categoryPrompt: "What",
    category: "Outcome",
    title: "Personal item",
    content: "Objects used for personal use and convenience, such as wallets or keys.",
  }}
/>

<DeckCard
  side="back"
  theme={{ primary: "#1082f5", tint: "#d5eeff", accent: "#006b9f" }}
  toolTitle="Innovation Design"
  card={{ categoryPrompt: "What", category: "Outcome" }}
/>
```

Use `blue`, `purple`, or a custom `{ primary, tint, accent }` palette for either face.
`brandLabel` defaults to `toolTitle`; `seriesLabel` defaults to `A Series of ThinkTools`.
`categoryPrompt` is optional for decks without a question prefix.
The component uses live text, the existing brand logo, and themeable decoration.
Example content comes exclusively from all real cards in each tool's source deck.
The page shuffles once on load and displays four unique samples, with the third
initially showing its back. The hero uses the first randomly selected card.
Source language falls back to English where Thai is unavailable.

Both sides require a card. Render a front and back using the same card object to preserve category pairing.
