import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const OrderSummary: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  
  const shipping = 5.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const getBottleShape = (type: string) => {
    switch (type) {
      case 'Serum':
      case 'Drops':
        return (
          <div className="w-8 h-12 bg-gradient-to-b from-amber-600 to-amber-800 relative rounded-sm">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-b from-amber-500 to-amber-600 rounded-t-sm" />
          </div>
        );
      case 'Cream':
        return (
          <div className="w-10 h-10 bg-gradient-to-b from-rose-600 to-rose-800 relative rounded-sm">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-b from-rose-500 to-rose-600 rounded-t-sm" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-10 bg-gradient-to-b from-stone-600 to-stone-800 relative rounded-sm">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-b from-stone-500 to-stone-600 rounded-t-sm" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
      <h2 className="text-xl font-playfair font-light text-stone-800 mb-6">
        Order Summary
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-stone-100 last:border-b-0">
            {/* Product Image/Icon */}
            <div className="flex-shrink-0">
              {getBottleShape(item.type)}
            </div>
            
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-stone-800 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-stone-500 truncate">
                {item.subtitle}
              </p>
              <p className="text-sm text-stone-600">
                €{item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="p-1 hover:bg-stone-100 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="p-1 hover:bg-stone-100 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1 hover:bg-red-100 rounded transition-colors text-red-600 ml-2"
                aria-label="Remove item"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Subtotal</span>
          <span className="text-stone-800">€{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Shipping</span>
          <span className="text-stone-800">€{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Tax</span>
          <span className="text-stone-800">€{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-medium pt-3 border-t border-stone-200">
          <span className="text-stone-800">Total</span>
          <span className="text-stone-800">€{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-3 bg-stone-50 rounded text-xs text-stone-600">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Secure checkout powered by SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
