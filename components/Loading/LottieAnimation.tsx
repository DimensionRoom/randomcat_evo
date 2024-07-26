// components/LottieAnimation.tsx
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  color?: string[]; // Optional color prop to dynamically change the color
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, color }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
      // Change color dynamically
      if (color) {
        const elements = containerRef.current.querySelectorAll('path, g, rect, circle, polygon, polyline, line, ellipse');
        // console.log('elements',elements)
        elements[10].setAttribute('fill', color[0]);
        elements[13].setAttribute('fill', color[1]);
        elements[16].setAttribute('fill', color[2]);
      }

      return () => {
        anim.destroy();
      };
    }
  }, [animationData, color]);

  return <div ref={containerRef} style={{ width: '30vh' }} />;
};

export default LottieAnimation;