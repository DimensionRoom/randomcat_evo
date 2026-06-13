"use client";
import React, { useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import type { AnimationItem } from "lottie-web";

type PlayerProps = React.ComponentProps<typeof Player>;

/**
 * Drop-in replacement for @lottiefiles/react-lottie-player's <Player> that is
 * cheaper on the CPU while rendering identically to the original:
 *   - pauses the animation while it is scrolled off screen (IntersectionObserver),
 *     so off-screen animations stop consuming CPU entirely,
 *   - shows a single static frame for users who prefer reduced motion.
 *
 * Renderer stays `svg` by default: the `canvas` renderer does not support all
 * Lottie features (masks, mattes, some effects) and visibly distorts many
 * designer-made animations. Pass renderer="canvas" only for a clip you have
 * confirmed renders correctly.
 *
 * All <Player> props/children are forwarded, so usage is identical.
 */
export default function LottiePlayer({
  renderer = "svg",
  lottieRef,
  ...rest
}: PlayerProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleRef = (anim: AnimationItem) => {
    lottieRef?.(anim);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      anim.goToAndStop(0, true);
      return;
    }

    // `wrapper` (the container element lottie renders into) exists at runtime
    // but is missing from lottie-web's published types.
    const el = (anim as unknown as { wrapper?: Element }).wrapper;
    if (!el || typeof IntersectionObserver === "undefined") return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      },
      { threshold: 0.01 }
    );
    observerRef.current.observe(el);
  };

  return <Player renderer={renderer} lottieRef={handleRef} {...rest} />;
}
