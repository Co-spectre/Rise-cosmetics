import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Settings, LogOut, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import CartDrawer from '../cart/CartDrawer';
import CartNotification from '../cart/CartNotification';
import Logo from './Logo';
import '../../styles/smooth-transitions.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const { isCartNotificationVisible, hideCartNotification } = useNotification();

  // Move isLanding up to avoid variable declaration issues
  const isLanding = location.pathname === '/';

  // Optimized scroll handler with better performance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10; // Reduced threshold for faster response
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Call immediately to set initial state
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: 'Shop', href: '/products' },
    { name: 'Collections', href: '/products?collection=special' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
    // Removed admin panel from navbar - it's now only accessible via user menu
  ], []);

  // Memoize style classes for better performance - Updated for scroll-based styling
  const styleClasses = useMemo(() => {
    if (isLanding && !isScrolled) {
      // Semi-transparent navbar for landing page when not scrolled - improved visibility
      return {
        navbar: 'bg-black/20 backdrop-blur-md border-b border-white/10',
        text: 'text-white hover:text-white/80 drop-shadow-sm',
        icon: 'text-white group-hover:text-white/80 drop-shadow-sm',
        button: 'border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm',
        mobileMenu: 'bg-slate-900/95 backdrop-blur-md border-t border-white/20',
        mobileText: 'text-white hover:bg-white/10 font-medium'
      };
    } else {
      // Solid white navbar with container for scrolled state or non-landing pages
      return {
        navbar: 'bg-white shadow-lg border-b border-gray-200',
        text: 'text-gray-900 hover:text-olive-600',
        icon: 'text-gray-900 group-hover:text-olive-600',
        button: 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-900',
        mobileMenu: 'bg-white border-t border-gray-200',
        mobileText: 'text-gray-900 hover:bg-gray-100 font-medium'
      };
    }
  }, [isLanding, isScrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-500 ease-in-out ${styleClasses.navbar}`}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <CartDrawer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/">
          <Logo 
            size="md"
            variant={isLanding && !isScrolled ? "light" : "dark"}
            className="transition-colors duration-500"
          />
        </Link>
        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.href}
              className={`font-light smooth-link ${styleClasses.text}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/favorites" className="relative group smooth-button">
            <span className="sr-only">Favorites</span>
            <svg className={`w-6 h-6 ${styleClasses.icon}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 0 1 4.5 8.25c-1.5 2.25-6.75 7.5-7.5 8.25a.75.75 0 0 1-1 0c-.75-.75-6-6-7.5-8.25a5.25 5.25 0 1 1 8.5-6.25 5.25 5.25 0 0 1 8.5 6.25z" />
            </svg>
          </Link>
          {/* User Profile/Auth Section */}
          {user ? (
            <div className="relative group">
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="relative group flex items-center space-x-1">
                  <span className="sr-only">Profile</span>
                  <User className={`w-6 h-6 transition-colors duration-300 ${styleClasses.icon}`} strokeWidth={1.5} />
                  {user.name && (
                    <span className={`text-sm font-medium transition-colors duration-300 ${styleClasses.text}`}>
                      {user.name.split(' ')[0]}
                    </span>
                  )}
                </Link>
                <button
                  onClick={logout}
                  className={`relative p-2 rounded-full border transition-all duration-300 ${styleClasses.button}`}
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className={`w-5 h-5 transition-colors duration-300 ${styleClasses.icon}`} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="relative group">
              <span className="sr-only">Login/Register</span>
              <User className={`w-6 h-6 transition-colors duration-300 ${styleClasses.icon}`} strokeWidth={1.5} />
            </Link>
          )}
          
          {/* Admin Link - Only show for admin users */}
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Link 
              to="/admin" 
              className="relative group flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 shadow-md"
              title="Admin Dashboard"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm font-medium">Admin</span>
            </Link>
          )}
          <button
            className={`relative p-2 rounded-full border smooth-button ${styleClasses.button}`}
            onClick={toggleCart}
            aria-label="Cart"
          >
            <ShoppingBag className={`w-6 h-6 ${styleClasses.icon}`} strokeWidth={1.5} />
            {/* Real cart count */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full px-1.5 py-0.5 font-bold cart-badge bg-rose-500 text-white">
                {totalItems}
              </span>
            )}
            {/* Cart notification */}
            <CartNotification 
              show={isCartNotificationVisible} 
              onHide={hideCartNotification}
            />
          </button>
          <button className="md:hidden ml-2 smooth-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
            <span className={`block w-6 h-0.5 mb-1 transition-colors duration-300 ${styleClasses.icon}`} />
            <span className={`block w-6 h-0.5 mb-1 transition-colors duration-300 ${styleClasses.icon}`} />
            <span className={`block w-6 h-0.5 transition-colors duration-300 ${styleClasses.icon}`} />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className={`md:hidden px-4 py-4 space-y-2 ${styleClasses.mobileMenu}`}>
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.href}
              className={`block py-2 px-2 rounded transition-all duration-300 ${styleClasses.mobileText}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* User Authentication Section */}
          <div className="border-t pt-2 mt-2 space-y-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 py-2 px-2 rounded transition-all duration-300 ${styleClasses.mobileText}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  <span>Profile{user.name ? ` (${user.name.split(' ')[0]})` : ''}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 py-2 px-2 rounded transition-all duration-300 w-full text-left ${styleClasses.mobileText}`}
                >
                  <LogOut className="w-5 h-5" strokeWidth={1.5} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/profile"
                className={`flex items-center space-x-2 py-2 px-2 rounded transition-all duration-300 ${styleClasses.mobileText}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
                <span>Login/Register</span>
              </Link>
            )}
          </div>
        </nav>
      )}
      
      {/* Cart Drawer */}
      <CartDrawer />
    </header>
  );
};

export default Header;
