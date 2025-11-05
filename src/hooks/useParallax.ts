import { useEffect, useState, RefObject } from 'react';
import { useSpring, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  mouseInfluence?: number;
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const {
    speed = 0.5,
    direction = 'vertical',
    mouseInfluence = 0.1
  } = options;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();

  // Smooth mouse movement
  const smoothMouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(0, { stiffness: 50, damping: 20 });

  // Parallax values based on scroll
  const parallaxY = useTransform(
    scrollY,
    [elementPosition.y - 800, elementPosition.y + 800],
    [400 * speed, -400 * speed]
  );

  // Update mouse position with smooth animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) * mouseInfluence;
      const moveY = (clientY - centerY) * mouseInfluence;

      smoothMouseX.set(moveX);
      smoothMouseY.set(moveY);
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseInfluence, smoothMouseX, smoothMouseY]);

  // Update element position
  useEffect(() => {
    if (!ref.current) return;

    const updatePosition = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setElementPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [ref]);

  return {
    x: direction === 'horizontal' ? smoothMouseX : 0,
    y: direction === 'vertical' ? parallaxY : 0,
    mouseX: smoothMouseX,
    mouseY: smoothMouseY
  };
};

export const useParallaxRotate = (
  ref: RefObject<HTMLElement>,
  { sensitivity = 20 } = {}
) => {
  const { scrollY } = useScroll();
  const [elementPosition, setElementPosition] = useState(0);
  const rotation = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!ref.current) return;

    const updateRotation = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = centerY - viewportCenter;
        rotation.set((distance / viewportCenter) * sensitivity);
        setElementPosition(rect.top);
      }
    };

    updateRotation();
    window.addEventListener('scroll', updateRotation);
    window.addEventListener('resize', updateRotation);

    return () => {
      window.removeEventListener('scroll', updateRotation);
      window.removeEventListener('resize', updateRotation);
    };
  }, [ref, rotation, sensitivity]);

  return { rotate: rotation };
};

export const useParallaxScale = (
  ref: RefObject<HTMLElement>,
  { baseScale = 1, scaleRange = 0.2 } = {}
) => {
  const { scrollY } = useScroll();
  const [elementPosition, setElementPosition] = useState(0);
  const scale = useSpring(baseScale, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!ref.current) return;

    const updateScale = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        const maxDistance = window.innerHeight / 2;
        const scaleValue = baseScale - (distance / maxDistance) * scaleRange;
        scale.set(scaleValue);
        setElementPosition(rect.top);
      }
    };

    updateScale();
    window.addEventListener('scroll', updateScale);
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('scroll', updateScale);
      window.removeEventListener('resize', updateScale);
    };
  }, [ref, scale, baseScale, scaleRange]);

  return { scale };
};