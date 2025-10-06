import { useState, useCallback } from 'react';

export interface CartAnimationState {
  isVisible: boolean;
  productName: string;
  productImage: string;
}

export const useCartAnimation = () => {
  const [animationState, setAnimationState] = useState<CartAnimationState>({
    isVisible: false,
    productName: '',
    productImage: ''
  });

  const showAnimation = useCallback((productName: string, productImage: string) => {
    setAnimationState({
      isVisible: true,
      productName,
      productImage
    });
  }, []);

  const hideAnimation = useCallback(() => {
    setAnimationState(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  return {
    animationState,
    showAnimation,
    hideAnimation
  };
};
