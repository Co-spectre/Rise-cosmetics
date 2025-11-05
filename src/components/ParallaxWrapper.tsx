import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax, useParallaxRotate, useParallaxScale } from '@/hooks/useParallax';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  mouseInfluence?: number;
  rotate?: boolean;
  scale?: boolean;
  className?: string;
  baseScale?: number;
  scaleRange?: number;
  rotateSensitivity?: number;
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  mouseInfluence = 0.1,
  rotate = false,
  scale = false,
  className = '',
  baseScale = 1,
  scaleRange = 0.2,
  rotateSensitivity = 20,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useParallax(ref, { speed, direction, mouseInfluence });
  const { rotate: rotation } = useParallaxRotate(ref, { sensitivity: rotateSensitivity });
  const { scale: scaleValue } = useParallaxScale(ref, { baseScale, scaleRange });

  return (
    <motion.div
      ref={ref}
      style={{
        x: direction === 'horizontal' ? x : 0,
        y: direction === 'vertical' ? y : 0,
        rotate: rotate ? rotation : 0,
        scale: scale ? scaleValue : 1,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};