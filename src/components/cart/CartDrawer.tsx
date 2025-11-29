import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import '../../styles/smooth-transitions.css';

const CartDrawer: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    clearCart, 
    updateQuantity,
    recentlyAddedItem 
  } = useCart();

  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle smooth open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Force a reflow to ensure the element is rendered before animating
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 350); // Slightly longer than transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  // Don't render anything if the cart should not be shown
  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <>
      {/* Backdrop with smooth fade */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 ease-in-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
        style={{ 
          position: 'fixed',
          isolation: 'isolate',
          willChange: 'opacity'
        }}
      />
      
      {/* Cart Drawer with smooth slide - Minimalist Design */}
      <div 
        className="fixed top-0 right-0 h-full w-[400px] max-w-[95vw] bg-white shadow-lg z-[9999] overflow-hidden transform transition-transform duration-300 ease-out"
        style={{ 
          position: 'fixed',
          isolation: 'isolate',
          willChange: 'transform',
          contain: 'layout style paint',
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        {/* Header with smooth fade-in - Minimalist Design */}
        <div className={`flex justify-between items-center p-6 border-b border-stone-200 bg-white transition-opacity duration-300 delay-100 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          <div>
            <h2 className="text-lg font-normal text-stone-800">
              Cart ({totalItems})
            </h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-stone-100 rounded-xl transition-colors duration-200"
            aria-label="Close cart"
            type="button"
          >
            <X className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Content with smooth fade-in */}
        <div className={`flex flex-col h-[calc(100%-72px)] transition-opacity duration-300 delay-150 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          {items.length === 0 ? (
            /* Empty Cart - Minimalist Design */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-normal text-stone-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-stone-500 mb-6 max-w-xs">
                Add items to get started
              </p>
              <Link 
                to="/products"
                onClick={closeCart}
                className="px-6 py-2.5 bg-stone-400 text-white font-light text-sm rounded-xl hover:bg-stone-500 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items - Minimalist Design */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex items-start space-x-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-stone-300 transition-all duration-200 transform ${
                      isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${200 + index * 100}ms`
                    }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-stone-300" />
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details - Minimalist Layout */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <Link 
                        to={`/product/${item.id}`}
                        onClick={closeCart}
                        className="group block mb-2"
                      >
                        <h3 className="font-normal text-sm text-stone-800 group-hover:text-stone-600 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-stone-500 text-xs">{item.type}</p>
                      </Link>
                      
                      <div className="mt-auto space-y-2">
                        {/* Price and Delete */}
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-stone-800">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg transition-colors duration-200"
                            aria-label="Remove item"
                            type="button"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        
                        {/* Quantity Controls - Minimalist */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                            aria-label="Decrease quantity"
                            type="button"
                          >
                            <Minus className="w-3.5 h-3.5 text-stone-600" strokeWidth={1.5} />
                          </button>
                          <span className="flex-1 text-center text-sm text-stone-600 px-3 min-w-[40px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                            aria-label="Increase quantity"
                            type="button"
                          >
                            <Plus className="w-3.5 h-3.5 text-stone-600" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer - Minimalist Design */}
              <div className={`border-t border-stone-200 p-6 bg-white transition-all duration-400 transform ${
                isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: '300ms' }}>
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={() => clearCart()}
                    className="text-xs text-stone-500 hover:text-stone-700 px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors duration-200 mb-4 block"
                    type="button"
                  >
                    Clear Cart
                  </button>
                )}
                
                {/* Total - Minimalist */}
                <div className="mb-4 pb-4 border-b border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-normal text-stone-600">Subtotal</span>
                    <span className="text-lg font-medium text-stone-900">
                      €{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">Shipping calculated at checkout</p>
                </div>
                
                {/* Action Buttons - Minimalist */}
                <div className="space-y-2">
                  <Link 
                    to="/checkout"
                    onClick={closeCart}
                    className="block w-full"
                  >
                    <button 
                      type="button"
                      className="w-full py-3 bg-[#D4C4B0] text-stone-800 font-light text-sm hover:bg-[#C5B5A0] transition-colors duration-200 rounded-xl"
                    >
                      Checkout
                    </button>
                  </Link>
                  
                  <Link 
                    to="/products"
                    onClick={closeCart}
                    className="block w-full"
                  >
                    <button 
                      type="button"
                      className="w-full py-3 border border-stone-300 text-stone-700 font-light text-sm hover:bg-stone-50 transition-colors duration-200 rounded-xl"
                    >
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default CartDrawer;
