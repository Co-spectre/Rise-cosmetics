import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { ChevronDown, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernParallaxLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [videosLoaded, setVideosLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const observerRef = useRef<IntersectionObserver>();
  const lastScrollTime = useRef(0);

  // Throttled scroll handling for better performance
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 16) return; // ~60fps
    
    lastScrollTime.current = now;
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  // Load videos only after initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideosLoaded(true);
    }, 500); // Delay video loading by 500ms for smoother initial load
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced Intersection Observer for reveal effects
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-reveal-id');
          if (elementId) {
            setIsVisible(prev => ({
              ...prev,
              [elementId]: entry.isIntersecting
            }));
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -20px 0px' 
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  // Register elements for reveal animation
  const registerRevealElement = useCallback((element: HTMLElement | null, id: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-reveal-id', id);
      observerRef.current.observe(element);
    }
  }, []);

  // Simplified parallax calculations for better performance
  const parallaxStyles = useMemo(() => {
    const limitedScrollY = Math.min(scrollY, 2000); // Limit parallax effect
    return {
      hero: {
        transform: `translate3d(0, ${limitedScrollY * 0.3}px, 0)`,
      },
      backgroundShapes: {
        transform: `translate3d(0, ${limitedScrollY * 0.1}px, 0)`,
      },
      subtitle: {
        transform: `translate3d(0, ${limitedScrollY * 0.2}px, 0)`,
      },
      buttons: {
        transform: `translate3d(0, ${limitedScrollY * 0.15}px, 0)`,
      },
      productCards: {
        transform: `translate3d(0, ${limitedScrollY * -0.05}px, 0)`,
      },
      aboutText: {
        transform: `translate3d(0, ${limitedScrollY * -0.03}px, 0)`,
      }
    };
  }, [scrollY]);

  // Memoize product data for better performance
  const products = useMemo(() => [
    {
      id: 1,
      name: "Rice Ritual Serum",
      type: "Serum",
      price: "$89",
      color: "bg-gradient-to-br from-rice-100 to-rice-200",
      description: "Nourishing face serum"
    },
    {
      id: 2,
      name: "Radiance Eye Drops",
      type: "Drops",
      price: "$67",
      color: "bg-gradient-to-br from-olive-100 to-olive-200",
      description: "Brightening eye treatment"
    },
    {
      id: 3,
      name: "Soulrise Cream",
      type: "Cream",
      price: "$124",
      color: "bg-gradient-to-br from-rice-200 to-olive-100",
      description: "Luxury moisturizing cream"
    }
  ], []);

  return (
    <div className="w-full">
      {/* Hero Section - Full Screen Video Background */}
      <section 
        ref={heroRef}
        className="relative w-full flex items-center justify-center bg-slate-900 overflow-hidden"
        style={{ 
          height: '100vh',
          marginTop: '-80px',
          paddingTop: '80px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Background Video - Lazy loaded */}
        {videosLoaded ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.4)',
              zIndex: -1
            }}
          >
            <source src="/videos/6811826-uhd_4096_2160_24fps.mp4" type="video/mp4" />
          </video>
        ) : (
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900"
            style={{ zIndex: -1 }}
          />
        )}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: 0 }}></div>
        
        {/* Floating geometric elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div 
            className="absolute w-32 h-32 border border-white/20 rounded-full animate-pulse"
            style={{
              top: '15%',
              right: '10%',
              transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute w-24 h-24 border border-white/15 rounded-lg rotate-45 animate-pulse"
            style={{
              top: '60%',
              left: '5%',
              transform: `translate3d(0, ${scrollY * -0.06}px, 0) rotate(45deg)`,
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute w-16 h-16 border border-white/25 rounded-full animate-pulse"
            style={{
              bottom: '20%',
              right: '20%',
              transform: `translate3d(0, ${scrollY * 0.04}px, 0)`,
              animationDelay: '2s'
            }}
          />
        </div>
        
        {/* Simple Content with subtle parallax */}
        <div className="text-center max-w-4xl px-4 relative" style={{ zIndex: 1 }}>
          <div style={parallaxStyles.hero}>
            <h1 className="text-8xl md:text-9xl font-light tracking-wider text-white mb-6 leading-none">
              RISE
            </h1>
          </div>
          
          <div style={parallaxStyles.subtitle}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              Pure beauty through nature's finest ingredients
            </p>
            
            {/* New attention-grabbing badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light tracking-wide mb-8 animate-pulse">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              New Collection Available
            </div>
          </div>

          <div style={parallaxStyles.buttons} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 hover:bg-gray-100 transition-all duration-300 tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 rounded-lg"
            >
              <span className="font-light">Shop Collection</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300 tracking-wide transform hover:scale-105 rounded-lg backdrop-blur-sm"
            >
              <span className="font-light">Our Story</span>
            </Link>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <div className="flex flex-col items-center space-y-2 animate-pulse">
            <span className="text-sm font-light tracking-wide opacity-80">Discover More</span>
            <div className="relative">
              <ChevronDown className="w-6 h-6 animate-bounce" />
              <div className="absolute inset-0 w-6 h-6 border border-white/30 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Enhanced with subtle parallax */}
      <section className="relative py-20 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 overflow-hidden" style={{ zIndex: 10, position: 'relative' }}>
        {/* Enhanced background with subtle parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-64 h-64 bg-amber-200/20 rounded-full blur-2xl"
            style={{
              top: '10%',
              right: '5%',
              ...parallaxStyles.backgroundShapes
            }}
          />
          <div 
            className="absolute w-48 h-48 bg-stone-300/20 rounded-lg blur-xl"
            style={{
              bottom: '15%',
              left: '3%',
              ...parallaxStyles.backgroundShapes
            }}
          />
          
          {/* Additional floating elements */}
          <div 
            className="absolute w-32 h-32 bg-olive-200/15 rounded-full blur-xl"
            style={{
              top: '50%',
              right: '25%',
              transform: `translate3d(0, ${scrollY * -0.08}px, 0)`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div 
            ref={(el) => registerRevealElement(el, 'products-title')}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-olive-900 mb-4 tracking-wide">
              Featured Products
            </h2>
            <p className="text-lg text-olive-700 font-light">
              Discover our signature collection
            </p>
            
            {/* Attention-grabbing element */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-olive-100 border border-olive-200 rounded-full text-olive-700 text-sm">
              <div className="w-2 h-2 bg-olive-500 rounded-full animate-pulse"></div>
              Limited Edition Available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={parallaxStyles.productCards}>
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => registerRevealElement(el, `product-${product.id}`)}
                className="transform transition-all duration-300 hover:scale-105 group"
                style={{
                  transform: `translateY(${scrollY * (0.02 + index * 0.01)}px)`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <Link 
                  to={`/product/${product.id}`}
                  className="block bg-white border border-rice-200 hover:border-olive-300 transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden relative"
                >
                  {/* New badge for special products */}
                  {index === 0 && (
                    <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                      Best Seller
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                      Limited
                    </div>
                  )}
                  
                  {/* Product Image Area with enhanced effects */}
                  <div className={`aspect-square ${product.color} relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <div className="relative">
                      {product.type === 'Serum' || product.type === 'Drops' ? (
                        <div className="w-8 h-28 bg-gradient-to-b from-olive-600 to-olive-800 relative group-hover:scale-110 transition-transform duration-300">
                          <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-olive-500 to-olive-600" />
                          <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-rice-300 rounded-full group-hover:animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-20 h-16 bg-gradient-to-b from-olive-600 to-olive-800 rounded-lg relative group-hover:scale-110 transition-transform duration-300">
                          <div className="absolute top-0 w-full h-3 bg-gradient-to-b from-olive-500 to-olive-600 rounded-t-lg" />
                        </div>
                      )}
                    </div>
                    
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-pulse"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-light text-olive-900 mb-2 group-hover:text-olive-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-olive-600 mb-3 text-sm">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-light text-olive-900">{product.price}</span>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-olive-600 hover:text-rose-600 transition-colors hover:scale-110 transform">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-olive-600 hover:text-olive-800 transition-colors hover:scale-110 transform">
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Enhanced with subtle parallax */}
      <section className="relative py-20 bg-gradient-to-r from-rice-50 to-olive-50 overflow-hidden" style={{ zIndex: 2 }}>
        {/* Enhanced background with subtle parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-80 h-80 bg-olive-200/20 rounded-full blur-2xl"
            style={{
              top: '5%',
              right: '0%',
              transform: `translate3d(0, ${scrollY * 0.06}px, 0)`,
            }}
          />
          <div 
            className="absolute w-60 h-60 bg-rice-300/25 rounded-full blur-xl"
            style={{
              bottom: '5%',
              left: '5%',
              transform: `translate3d(0, ${scrollY * -0.04}px, 0)`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={(el) => registerRevealElement(el, 'about-text')} style={parallaxStyles.aboutText}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-olive-600"></div>
                <span className="text-olive-600 text-sm tracking-wide uppercase">Our Story</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-olive-900 mb-6 tracking-wide">
                Nature's Wisdom
              </h2>
              
              <p className="text-lg text-olive-700 font-light leading-relaxed mb-6">
                Discover the ancient beauty secrets of rice and botanical ingredients, 
                carefully crafted into modern skincare solutions that honor both tradition and innovation.
              </p>
              
              {/* Stats section for attention */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-olive-900 mb-1">99%</div>
                  <div className="text-sm text-olive-600">Natural Ingredients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-olive-900 mb-1">15+</div>
                  <div className="text-sm text-olive-600">Years of Research</div>
                </div>
              </div>
              
              <Link 
                to="/about"
                className="inline-flex items-center gap-3 px-6 py-3 bg-olive-900 text-white hover:bg-olive-800 transition-all duration-300 tracking-wide transform hover:scale-105 rounded-lg group"
              >
                <span className="font-light">Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div ref={(el) => registerRevealElement(el, 'about-visual')} className="relative">
              <div className="aspect-square bg-gradient-to-br from-olive-200 to-rice-200 rounded-full relative overflow-hidden transform hover:scale-105 transition-transform duration-500 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-olive-800 opacity-30 font-light group-hover:scale-110 transition-transform duration-500">RISE</div>
                </div>
                
                {/* Floating elements inside the circle */}
                <div className="absolute inset-0">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div
                      key={`circle-element-${i}`}
                      className="absolute w-4 h-4 bg-white/40 rounded-full"
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${30 + (i * 10)}%`,
                        transform: `translate3d(0, ${scrollY * (0.02 + i * 0.01)}px, 0)`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform rotate-45"></div>
              </div>
              
              {/* Achievement badge */}
              <div className="absolute -bottom-6 -right-6 bg-white border-4 border-olive-100 rounded-full p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-light text-olive-900">4.9</div>
                  <div className="text-xs text-olive-600">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Testimonial Section with Parallax */}
      <section className="relative py-20 bg-gradient-to-b from-olive-50 to-stone-50 overflow-hidden" style={{ zIndex: 3 }}>
        {/* Parallax background */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-96 h-96 bg-amber-200/15 rounded-full blur-3xl"
            style={{
              top: '20%',
              left: '10%',
              transform: `translate3d(0, ${scrollY * 0.05}px, 0)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div 
            ref={(el) => registerRevealElement(el, 'testimonial')}
            style={{
              transform: `translate3d(0, ${scrollY * -0.02}px, 0)`,
            }}
          >
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 text-amber-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                      ★
                    </div>
                  ))}
                </div>
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-light text-olive-900 italic leading-relaxed mb-6">
                "RISE transformed my skincare routine completely. The rice serum is absolutely divine!"
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-olive-200 to-rice-200 rounded-full flex items-center justify-center">
                  <span className="text-olive-800 font-medium">M</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-olive-900">Maria Rodriguez</div>
                  <div className="text-sm text-olive-600">Beauty Enthusiast</div>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-olive-100 border border-olive-200 rounded-full text-olive-700 text-sm animate-pulse">
              <div className="w-2 h-2 bg-olive-500 rounded-full"></div>
              Join 10,000+ Happy Customers
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ModernParallaxLandingPage;
