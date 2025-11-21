import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, ShoppingBag, Heart, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import Logo from './common/Logo';
import IngredientSpotlight from './IngredientSpotlight';
import { useCart } from '@/contexts/CartContext';
import { getAssetPath } from '@/utils/assetPath';
import '../styles/optimized-landing.css';
import '../styles/luxury-animations.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const ParallaxLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  // Simplified scroll handling for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Optimize video loading
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Set video attributes for better performance
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      // Handle video load events
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.setAttribute('data-loaded', 'true');
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleVideoLoad);
      
      // Error handling for video
      const handleVideoError = () => {
        console.warn('Video failed to load, falling back to background');
        setIsVideoLoaded(false);
      };
      
      video.addEventListener('error', handleVideoError);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('error', handleVideoError);
      };
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Video event handlers
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Simplified for better performance - minimal parallax effects

  // Handle add to cart
  const handleAddToCart = (product: {
    id: number;
    name: string;
    subtitle: string;
    price: string;
    description: string;
    type: string;
    color: string;
    special?: boolean;
    image?: string;
  }) => {
    // Convert price from string (€68) to number (68)
    const priceNumber = parseFloat(product.price.replace('€', ''));
    
    addToCart({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: priceNumber,
      type: product.type,
      color: product.color,
      description: product.description,
      special: product.special,
      image: product.image,
    }, 1);
  };

  return (
    <div className="relative">
      {/* Enhanced Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden optimized-hero">
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          {/* Fallback Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-700" />
          
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover video-hero-bg optimized-video"
            style={{
              filter: 'brightness(0.4) contrast(1.1)',
              opacity: isVideoLoaded ? 1 : 0,
            }}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            poster="" // Remove poster to prevent flash
          >
            <source src={getAssetPath('/videos/6811826-uhd_4096_2160_24fps.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-olive-900/30 via-transparent to-olive-900/30" />
        </div>

        {/* Floating Parallax Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Organic floating shapes */}
          <div 
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-rice-300/10 to-olive-300/15 blur-3xl"
            style={{
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute top-1/3 right-1/6 w-80 h-80 rounded-full bg-gradient-to-r from-olive-400/10 to-rice-400/15 blur-3xl"
            style={{
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
          
          <div 
            className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-rice-500/8 to-olive-500/12 blur-3xl"
            style={{
              animation: 'float 30s ease-in-out infinite'
            }}
          />

          {/* Subtle geometric accents */}
          <div 
            className="absolute top-1/4 left-1/6 w-2 h-32 bg-rice-300/20 rounded-full blur-sm"
            style={{
              animation: 'fadeInOut 8s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute bottom-1/3 right-1/5 w-2 h-24 bg-olive-300/20 rounded-full blur-sm"
            style={{
              animation: 'fadeInOut 12s ease-in-out infinite 2s'
            }}
          />
        </div>

        {/* Asymmetrical Hero Content - Option 3 (Adjusted: Middle Left) */}
        <div 
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.0008)
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Brand Name (Middle Left, Smaller) */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-7"
            >
              <h1 className="text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] leading-[0.9] font-light tracking-tighter text-white mix-blend-overlay opacity-90">
                RISE
              </h1>
              <div className="flex items-center gap-4 mt-2 ml-2">
                <div className="h-px w-12 sm:w-16 bg-white/60"></div>
                <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-white/80 font-light">
                  Cosmetics
                </span>
              </div>
            </motion.div>

            {/* Right: Philosophy & CTA (Aligned with logo or slightly offset) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="lg:col-span-5"
            >
              <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-6 max-w-md"
                 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                Natural Beauty, <br/>
                <span className="italic font-serif">Timeless Radiance.</span>
              </p>
              
              <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-sm font-light hidden sm:block">
                Crafted in Italy using the finest rice-based ingredients. 
                A ritual of self-care that honors your skin's natural essence.
              </p>

              <Link 
                to="/products"
                className="group inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-all duration-300"
              >
                <span className="text-sm tracking-widest uppercase font-light">Discover Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator - Moved to bottom right corner for Option 3 */}
        <div 
          className="absolute bottom-8 right-8 sm:right-12 text-white/50 hidden lg:block"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <div className="flex flex-col items-center space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase writing-vertical-rl rotate-180">
              Scroll
            </span>
            <div className="h-12 w-px bg-white/30 overflow-hidden">
              <div className="h-full w-full bg-white animate-scrolldown"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section with modern design */}
      <section 
        className="py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-warm-cream to-warm-ivory relative overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-20 right-16 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-r from-rice-100/30 to-olive-100/20 blur-3xl"
            style={{
              transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.04}px)`,
              animation: 'float 25s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-32 left-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-gradient-to-r from-olive-100/25 to-rice-100/15 blur-3xl"
            style={{
              transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.02}px)`,
              animation: 'float 30s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            style={{
              transform: `translateY(${scrollY * 0.02}px)`
            }}
          >
            <div className="mb-2 sm:mb-3">
              <span className="text-[0.65rem] sm:text-xs text-stone-500 tracking-[0.3em] uppercase font-light">Featured</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-700 mb-3 sm:mb-4 tracking-wide leading-tight px-4">
              Signature Collection
            </h2>
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-olive-300 to-transparent mx-auto mb-3 sm:mb-4"></div>
            <p className="text-xs sm:text-sm text-stone-600/80 font-light max-w-xl mx-auto leading-relaxed px-4">
              Discover our most beloved formulations, crafted with the finest natural ingredients and Italian precision
            </p>
          </motion.div>

          {/* Enhanced Product Grid - Compact Size */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`
            }}
          >
            {[
              {
                id: 'rise-1',
                name: 'RISE Radiance Illuminating Serum',
                subtitle: 'Brightening serum that gives skin an instant glow',
                price: '€89.00',
                description: 'An ultra-lightweight, deeply hydrating serum infused with premium rice bran extract and vitamin C.',
                type: 'Serums',
                color: 'bg-gradient-to-br from-stone-100 to-neutral-100',
                special: true,
                image: getAssetPath('/images/products/IMG-20250808-WA0006.jpg')
              },
              {
                id: 'rise-2',
                name: 'RISE Soul Renewal Night Cream',
                subtitle: 'Luxurious night cream for skin renewal',
                price: '€125.00',
                description: 'Advanced night cream that works while you sleep to reveal smoother, firmer skin by morning.',
                type: 'Moisturizers',
                color: 'bg-gradient-to-br from-neutral-100 to-stone-100',
                special: true,
                image: getAssetPath('/images/products/IMG-20250808-WA0007.jpg')
              },
              {
                id: 'rise-3',
                name: 'RISE Eye Luce Brightening Complex',
                subtitle: 'Brightening eye complex for refreshed eyes',
                price: '€75.00',
                description: 'Intensive eye treatment that reduces dark circles and puffiness for a refreshed appearance.',
                type: 'Eye Care',
                color: 'bg-gradient-to-br from-stone-50 to-neutral-100',
                special: true,
                image: getAssetPath('/images/products/IMG-20250808-WA0008.jpg')
              }
            ].map((product, index) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                className="group block bg-warm-cream border border-warm-taupe/30 hover:border-warm-olive/40 hover:shadow-2xl transition-all duration-500 rounded-lg overflow-hidden"
                style={{
                  transform: `translateY(${scrollY * (0.005 + index * 0.002)}px)`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Enhanced Product Image Area - Smaller */}
                <div 
                  className={`aspect-[3/4] ${product.color} relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}
                >
                  {/* Product Image */}
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  
                  {/* Special Badge */}
                  {product.special && (
                    <div className="absolute top-3 right-3 bg-stone-800 text-white px-2 py-0.5 text-[10px] tracking-widest uppercase font-medium rounded">
                      Featured
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Enhanced Product Info - Compact */}
                <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                  <div>
                    <p className="text-soft-gray text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2 font-medium">{product.type}</p>
                    <h3 className="text-base sm:text-lg font-light text-rich-brown mb-1 sm:mb-1.5 tracking-wide group-hover:text-warm-olive transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-soft-gray/80 text-[11px] sm:text-xs tracking-wide font-light line-clamp-1">{product.subtitle}</p>
                  </div>
                  
                  <p className="text-soft-gray/70 text-[11px] sm:text-xs leading-relaxed font-light line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-warm-taupe/20">
                    <span className="text-base sm:text-lg font-light text-rich-brown tracking-wide">
                      {product.price}
                    </span>
                    <div className="flex space-x-1.5 sm:space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to wishlist logic
                        }}
                        className="p-2 sm:p-2.5 rounded-lg border border-warm-olive/30 hover:bg-warm-olive hover:text-white hover:border-warm-olive transition-all duration-300 group/btn"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-warm-olive text-white hover:bg-warm-olive-dark transition-all duration-300 group/btn flex items-center justify-center gap-1.5 sm:gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                        <span className="text-xs sm:text-sm font-medium tracking-wide">View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Call-to-Action */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12 sm:mt-16"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`
            }}
          >
            <Link 
              to="/products"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-warm-olive text-white hover:bg-warm-olive-dark transition-all duration-300 tracking-wide transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <span className="relative z-10 font-medium">View Complete Collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-pale-sand">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-10 sm:mb-12"
            >
              <span className="text-[0.65rem] sm:text-xs text-soft-gray tracking-[0.2em] uppercase font-light">Our Mission</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-rich-brown mt-3 sm:mt-4 mb-4 sm:mb-6 tracking-wide leading-tight px-4">
                Premium skincare, inspired by nature and crafted with care.
              </h2>
              <div className="w-12 sm:w-16 h-0.5 bg-warm-olive/40 mx-auto mb-6 sm:mb-8"></div>
              <p className="text-sm sm:text-base text-soft-gray font-light max-w-xl mx-auto px-4">
                We create clean, effective skincare using rice-based ingredients and botanicals, with a focus on sustainability and simplicity. Our products are designed to elevate your daily routine and honor your skin’s natural radiance.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gradient-to-b from-warm-ivory to-warm-cream relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-16 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-rice-100/40 to-olive-100/20 blur-3xl"
            style={{
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-20 right-16 w-72 h-72 rounded-full bg-gradient-to-l from-olive-100/30 to-rice-100/15 blur-3xl"
            style={{
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Philosophy Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <div className="mb-6">
                  <span className="text-sm text-soft-gray tracking-[0.3em] uppercase font-light">Our Beliefs</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-rich-brown mb-8 tracking-wide leading-tight">
                  Philosophy
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-warm-olive/50 to-transparent mb-8"></div>
              </div>

              {/* Philosophy Text */}
              <div className="space-y-6">
                <p className="text-lg text-soft-gray/90 leading-relaxed font-light">
                  Embrace your natural essence with <span className="font-semibold text-rich-brown">RISE</span>, where holistic beauty meets mindful care. 
                  Our transformative ingredients connect you to the root of your radiance.
                </p>
                <p className="text-lg text-soft-gray/90 leading-relaxed font-light">
                  Crafted in Italy, we pride ourselves on using botanical and other healing ingredients 
                  to provide you with the glow your skin craves. Beauty is intention, so we treat it with respect.
                </p>
                <p className="text-lg text-stone-600/90 leading-relaxed font-light">
                  Every product is a bridge between ancient wisdom and modern science, designed to nurture 
                  not just your skin, but your daily self-care and mindfulness.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex items-start gap-4 p-6 bg-warm-cream/70 backdrop-blur-sm border border-warm-taupe/30 rounded-xl">
                  <div className="w-3 h-3 bg-warm-olive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-rich-brown font-medium mb-2 tracking-wide">Mindful Beauty</h4>
                    <p className="text-soft-gray/80 text-sm">Intentional skincare that honors your natural essence</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-warm-cream/70 backdrop-blur-sm border border-warm-taupe/30 rounded-xl">
                  <div className="w-3 h-3 bg-soft-terracotta rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-rich-brown font-medium mb-2 tracking-wide">Ancient Wisdom</h4>
                    <p className="text-soft-gray/80 text-sm">Time-tested ingredients meet modern innovation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-warm-cream/70 backdrop-blur-sm border border-warm-taupe/30 rounded-xl">
                  <div className="w-3 h-3 bg-warm-olive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-rich-brown font-medium mb-2 tracking-wide">Holistic Care</h4>
                    <p className="text-soft-gray/80 text-sm">Nurturing your skin, mind, and spirit together</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-warm-cream/70 backdrop-blur-sm border border-warm-taupe/30 rounded-xl">
                  <div className="w-3 h-3 bg-soft-terracotta rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-rich-brown font-medium mb-2 tracking-wide">Radiance Philosophy</h4>
                    <p className="text-soft-gray/80 text-sm">Transforming daily care into meaningful moments</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Philosophy Visual with Products */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-olive-50 to-rice-50 rounded-3xl overflow-hidden relative border border-olive-100/50">
                {/* Product Images Around Video */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Top Section with Products */}
                  <div className="h-1/4 p-4 flex justify-between items-start">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&crop=center" 
                        alt="Serum"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-stone-700 text-xs font-medium mt-1 text-center">Serum</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center" 
                        alt="Cream"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-stone-700 text-xs font-medium mt-1 text-center">Cream</p>
                    </div>
                  </div>
                  
                  {/* Video Area */}
                  <div className="flex-1 bg-gradient-to-br from-olive-100/50 to-rice-100/30 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-olive-200/50 hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <Play className="w-8 h-8 text-stone-500 ml-1 group-hover:text-stone-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Section with More Products */}
                  <div className="h-1/4 p-4 flex justify-between items-end">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=80&h=80&fit=crop&crop=center" 
                        alt="Moisturizer"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-stone-700 text-xs font-medium mt-1 text-center">Moisturizer</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop&crop=center" 
                        alt="Cleanser"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-stone-700 text-xs font-medium mt-1 text-center">Cleanser</p>
                    </div>
                  </div>
                  
                  {/* Text Footer */}
                  <div className="p-8 bg-white/70 backdrop-blur-sm border-t border-olive-100/50">
                    <p className="text-stone-600 text-sm font-light text-center leading-relaxed">
                      Discover the philosophy behind our mindful beauty
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <IngredientSpotlight />
    </div>
  );
};

export default ParallaxLandingPage;
