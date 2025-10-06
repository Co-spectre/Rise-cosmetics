import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Phone, 
  MessageCircle, 
  Gift, 
  Sparkles,
  X,
  Plus,
  ChevronUp
} from 'lucide-react';

interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  color: string;
  action: () => void;
  badge?: number;
}

const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(7);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "30% off your first order!", type: "offer" },
    { id: 2, text: "Free consultation available", type: "info" }
  ]);

  const actions: FloatingAction[] = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Cart",
      color: "bg-olive-600 hover:bg-olive-700",
      action: () => console.log("Open cart"),
      badge: cartCount
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Wishlist",
      color: "bg-rose-500 hover:bg-rose-600",
      action: () => console.log("Open wishlist"),
      badge: wishlistCount
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Search",
      color: "bg-purple-600 hover:bg-purple-700",
      action: () => console.log("Open search")
    },
    {
      icon: <Gift className="w-5 h-5" />,
      label: "Offers",
      color: "bg-yellow-500 hover:bg-yellow-600",
      action: () => console.log("Open offers"),
      badge: 2
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Chat",
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => console.log("Open chat")
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call",
      color: "bg-green-600 hover:bg-green-700",
      action: () => console.log("Make call")
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Buttons */}
        <div className={`mb-4 space-y-3 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}>
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-bounce"
              style={{ animationDelay: `${index * 100}ms`, animationDuration: '0.6s' }}
            >
              {/* Label */}
              <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 opacity-0 animate-fadeInLeft"
                style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: 'forwards' }}
              >
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              
              {/* Button */}
              <button
                onClick={action.action}
                className={`relative w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group`}
              >
                {action.icon}
                
                {/* Badge */}
                {action.badge && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {action.badge}
                  </span>
                )}
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping"></div>
              </button>
            </div>
          ))}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-gradient-to-r from-olive-600 to-rice-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative overflow-hidden group ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-olive-700 to-rice-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </div>
          
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-olive-600 to-rice-600 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group opacity-0 animate-fadeInUp"
          style={{ animationFillMode: 'forwards' }}
        >
          <ChevronUp className="w-5 h-5 group-hover:text-olive-600 transition-colors" />
        </button>
      )}

      {/* Notification Toasts */}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm animate-slideInRight"
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'offer' ? 'bg-yellow-400' : 'bg-blue-400'
              } animate-pulse`}></div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">{notification.text}</p>
                {notification.type === 'offer' && (
                  <button className="text-xs text-olive-600 hover:text-olive-700 font-medium mt-1">
                    Shop Now →
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingActionMenu;
