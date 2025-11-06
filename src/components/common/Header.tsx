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

  const isLanding = location.pathname === '/' || location.pathname === '/Rise-cosmetics/' || location.pathname === '/Rise-cosmetics';
  const isAboutPage = location.pathname === '/about' || location.pathname === '/Rise-cosmetics/about';
  const isTransparentPage = isLanding || isAboutPage;

  // Scroll detection with RAF for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          const shouldShowNavbar = scrollPosition > 50;
          setIsScrolled(shouldShowNavbar);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run on mount
    handleScroll();
    
    // Listen to scroll - use capture phase to catch it before other handlers
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isTransparentPage, location.pathname]);

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: 'Shop', href: '/products' },
    { name: 'Collections', href: '/products?collection=special' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
    // Removed admin panel from navbar - it's now only accessible via user menu
  ], []);

  // Navbar styling based on scroll position and page
  const styleClasses = useMemo(() => {
    // Transparent pages (Homepage & About) - completely transparent when not scrolled
    if (isTransparentPage && !isScrolled) {
      return {
        navbar: 'bg-transparent border-b border-transparent',
        text: 'text-white hover:text-white/90 drop-shadow-lg',
        icon: 'text-white group-hover:text-white/90 drop-shadow-lg',
        button: 'border-white/40 bg-transparent hover:bg-white/10 text-white',
        authButton: 'px-6 py-2 text-sm font-light tracking-wide rounded-lg border border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300',
        mobileMenu: 'bg-slate-900/95 backdrop-blur-md border-t border-white/20',
        mobileText: 'text-white hover:bg-white/10 font-medium'
      };
    }
    
    // Transparent pages scrolled - glossy transparent navbar
    if (isTransparentPage && isScrolled) {
      return {
        navbar: 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg',
        text: 'text-stone-800 hover:text-stone-950',
        icon: 'text-stone-800 group-hover:text-stone-950',
        button: 'border-stone-300 bg-white/50 hover:bg-white/70 text-stone-800 backdrop-blur-sm',
        authButton: 'px-6 py-2 text-sm font-light tracking-wide rounded-lg border border-stone-300 bg-white/50 text-stone-800 hover:bg-white/70 hover:border-stone-400 transition-all duration-300 backdrop-blur-sm',
        mobileMenu: 'bg-white/90 backdrop-blur-xl border-t border-stone-200',
        mobileText: 'text-stone-700 hover:bg-stone-100 font-medium'
      };
    }
    
    // Other pages - soft beige navbar
    return {
      navbar: 'bg-rice-50 shadow-md border-b border-stone-200',
      text: 'text-stone-700 hover:text-stone-900',
      icon: 'text-stone-700 group-hover:text-stone-900',
      button: 'border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700',
      authButton: 'px-6 py-2 text-sm font-medium tracking-wide rounded-lg bg-warm-olive text-white hover:bg-warm-olive-dark transition-all duration-300 shadow-sm',
      mobileMenu: 'bg-rice-50 border-t border-stone-200',
      mobileText: 'text-stone-700 hover:bg-stone-100 font-medium'
    };
  }, [isTransparentPage, isScrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-700 ease-in-out`}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 9999,
        transition: 'all 0.5s ease-in-out',
        backgroundColor: isTransparentPage && isScrolled ? 'rgba(250, 246, 240, 0.75)' : (isTransparentPage ? 'transparent' : 'rgba(250, 249, 247, 1)'),
        backdropFilter: isTransparentPage && isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isTransparentPage && isScrolled ? 'blur(20px)' : 'none',
        boxShadow: isTransparentPage && isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.08)' : 'none',
        borderBottom: isTransparentPage && isScrolled ? '1px solid rgba(212, 192, 165, 0.2)' : 'none'
      }}
      data-scrolled={isScrolled ? 'true' : 'false'}
      data-landing={isTransparentPage ? 'true' : 'false'}
    >
      <CartDrawer />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="flex-shrink-0">
          <Logo 
            size="lg"
            variant={isTransparentPage && !isScrolled ? "light" : "dark"}
            className="transition-colors duration-500 scale-110"
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
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User Profile/Auth Section */}
          {user ? (
            <div className="relative group hidden sm:flex items-center space-x-3">
              <Link to="/profile" className={`flex items-center space-x-2 ${styleClasses.authButton}`}>
                <User className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden lg:inline">
                  {user.name ? user.name.split(' ')[0] : 'Profile'}
                </span>
              </Link>
              <button
                onClick={logout}
                className={`p-2 rounded-full border transition-all duration-300 ${styleClasses.button}`}
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className={`hidden sm:flex items-center space-x-2 ${styleClasses.authButton}`}>
              <span>Sign In</span>
            </Link>
          )}
          
          {/* Admin Link - Only show for admin users */}
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Link 
              to="/admin" 
              className="relative group flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 shadow-md hidden sm:flex"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              <span className="text-xs sm:text-sm font-medium hidden lg:inline">Admin</span>
            </Link>
          )}
          <button
            className={`relative p-1.5 sm:p-2 rounded-full border smooth-button ${styleClasses.button}`}
            onClick={toggleCart}
            aria-label="Cart"
          >
            <ShoppingBag className={`w-5 h-5 sm:w-6 sm:h-6 ${styleClasses.icon}`} strokeWidth={1.5} />
            {/* Real cart count */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] sm:text-xs rounded-full px-1 sm:px-1.5 py-0.5 font-bold cart-badge bg-rose-500 text-white min-w-[18px] sm:min-w-[20px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
            {/* Cart notification */}
            <CartNotification 
              show={isCartNotificationVisible} 
              onHide={hideCartNotification}
            />
          </button>
          <button className="md:hidden ml-1 smooth-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
            <span className={`block w-5 h-0.5 mb-1 transition-colors duration-300 ${styleClasses.icon}`} />
            <span className={`block w-5 h-0.5 mb-1 transition-colors duration-300 ${styleClasses.icon}`} />
            <span className={`block w-5 h-0.5 transition-colors duration-300 ${styleClasses.icon}`} />
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
