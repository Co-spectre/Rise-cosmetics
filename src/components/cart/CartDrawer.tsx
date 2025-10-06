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
      
      {/* Cart Drawer with smooth slide */}
      <div 
        className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl z-[9999] overflow-hidden transform transition-transform duration-300 ease-out"
        style={{ 
          position: 'fixed',
          isolation: 'isolate',
          willChange: 'transform',
          contain: 'layout style paint',
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        {/* Header with smooth fade-in */}
        <div className={`flex justify-between items-center p-4 border-b border-neutral-200 bg-white transition-opacity duration-300 delay-100 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          <div>
            <h2 className="text-lg font-playfair font-medium tracking-wide text-black">
              Shopping Cart ({totalItems})
            </h2>
            {recentlyAddedItem && (
              <p className="text-xs text-green-600 font-medium animate-pulse mt-1">
                ✓ {recentlyAddedItem} added to cart
              </p>
            )}
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-neutral-100 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Cart Content with smooth fade-in */}
        <div className={`flex flex-col h-[calc(100%-72px)] transition-opacity duration-300 delay-150 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-playfair font-medium text-neutral-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                Discover our beautiful collection of natural skincare products.
              </p>
              <Link 
                to="/products"
                onClick={closeCart}
                className="px-6 py-2.5 bg-olive-600 text-white font-medium text-sm rounded-md hover:bg-olive-700 transition-colors smooth-button"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items with staggered animations */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100 hover:shadow-md transition-all duration-300 hover:border-olive-200 transform ${
                      isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${200 + index * 100}ms`
                    }}
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-white rounded-md border border-neutral-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-olive-100 to-olive-200 flex items-center justify-center">
                          <img 
                            src="/placeholder.svg" 
                            alt="Product placeholder"
                            className="w-8 h-8 opacity-60"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${item.id}`}
                        onClick={closeCart}
                        className="group block"
                      >
                        <h3 className="font-playfair font-medium text-base text-black mb-1 group-hover:text-olive-700 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                        {item.subtitle && (
                          <p className="text-neutral-600 text-xs mb-2 line-clamp-1">{item.subtitle}</p>
                        )}
                      </Link>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-50 rounded border border-neutral-200 transition-all duration-200 hover:scale-110 hover:border-olive-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-neutral-600" strokeWidth={2} />
                          </button>
                          <span className="w-8 text-center font-medium text-sm bg-white border border-neutral-200 rounded px-2 py-1 transition-all duration-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-50 rounded border border-neutral-200 transition-all duration-200 hover:scale-110 hover:border-olive-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-neutral-600" strokeWidth={2} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-sm text-black">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-600 transition-colors mt-1 smooth-button"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer with smooth slide-up animation */}
              <div className={`border-t border-neutral-200 p-4 bg-white transition-all duration-400 transform ${
                isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: '300ms' }}>
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-neutral-500 hover:text-red-600 transition-all duration-200 mb-3 block hover:scale-105"
                  >
                    Clear Cart
                  </button>
                )}
                
                {/* Total */}
                <div className="flex justify-between items-center mb-4 p-3 bg-neutral-50 rounded-lg transition-all duration-200 hover:bg-neutral-100">
                  <span className="text-base font-playfair font-medium text-black">Total:</span>
                  <span className="text-xl font-playfair font-medium text-black">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link 
                    to="/checkout"
                    onClick={closeCart}
                    className="block w-full"
                  >
                    <Button className="w-full py-2.5 bg-black text-white font-medium text-sm hover:bg-neutral-800 transition-all duration-200 rounded-md hover:scale-105 hover:shadow-lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link 
                    to="/products"
                    onClick={closeCart}
                    className="block w-full"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full py-2.5 border-neutral-300 text-neutral-700 font-medium text-sm hover:bg-neutral-100 transition-all duration-200 rounded-md hover:scale-105"
                    >
                      Continue Shopping
                    </Button>
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
