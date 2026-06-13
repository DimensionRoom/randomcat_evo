import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  color?: string[]; // Optional color prop to dynamically change the color
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, color }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Keep the SVG renderer: lottie-web's canvas renderer drops unsupported
    // features (masks, mattes, some effects) and distorts many animations.
    // The CPU win comes from pausing while off screen instead (see below).
    const anim: AnimationItem = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false, // playback is driven by on-screen visibility below
      animationData,
    });

    // Change color dynamically (requires the SVG DOM).
    if (color) {
      anim.addEventListener('DOMLoaded', () => {
        const elements = container.querySelectorAll(
          'path, g, rect, circle, polygon, polyline, line, ellipse'
        );
        elements[10]?.setAttribute('fill', color[0]);
        elements[13]?.setAttribute('fill', color[1]);
        elements[16]?.setAttribute('fill', color[2]);
      });
    }

    // Respect users who prefer reduced motion: show a single static frame.
    if (prefersReducedMotion) {
      anim.goToAndStop(0, true);
      return () => anim.destroy();
    }

    // Only run the rAF loop while the animation is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      anim.destroy();
    };
  }, [animationData, color]);

  return <div ref={containerRef} style={{ width: '30vh' }} />;
};

export default LottieAnimation;
