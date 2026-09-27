import React from "react";

/**
 * The fanned playing cards above each step: one card for step 1, two for step
 * 2, three for step 3.
 */
export default function StepCards({ count }: { count: number }) {
  const spread = 14; // degrees between neighbouring cards
  const start = (-(count - 1) * spread) / 2;
  return (
    <svg
      viewBox="0 0 120 80"
      width="96"
      height="64"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {Array.from({ length: count }, (_, i) => (
        <g
          key={i}
          transform={`rotate(${start + i * spread} 60 90) translate(${(i - (count - 1) / 2) * 6} 0)`}
        >
          <rect x="44" y="6" width="32" height="46" rx="4" fill="#fff" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M60 36c-6-4-9-7-9-10.5a4.3 4.3 0 0 1 9-1.6 4.3 4.3 0 0 1 9 1.6C69 29 66 32 60 36z"
            fill="currentColor"
          />
        </g>
      ))}
    </svg>
  );
}
