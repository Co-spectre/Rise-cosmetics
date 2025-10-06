import React, { useState, useEffect } from 'react';

interface CartNotificationProps {
  show: boolean;
  onHide: () => void;
}

const CartNotification: React.FC<CartNotificationProps> = ({ show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
        ✓ Added to cart!
      </div>
    </div>
  );
};

export default CartNotification;
