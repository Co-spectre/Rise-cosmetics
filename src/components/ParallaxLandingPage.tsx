import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, ShoppingBag, Heart, Play, Pause, Leaf, Sparkles, Recycle, MapPin, Shield, FlaskConical, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Logo from './common/Logo';
import { useCart } from '@/contexts/CartContext';
import { getAssetPath } from '@/utils/assetPath';
import '../styles/optimized-landing.css';
import '../styles/luxury-animations.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Belief details data
const beliefDetails = {
  vegan: {
    title: "100% Vegan",
    icon: Leaf,
    description: "We believe in the power of plants. Every RISE product is crafted without any animal-derived ingredients, proving that effective skincare can be both ethical and luxurious.",
    features: [
      "No animal-derived ingredients",
      "Plant-based formulations",
      "Certified vegan products",
      "Ethical ingredient sourcing"
    ]
  },
  crueltyFree: {
    title: "Cruelty Free",
    icon: Heart,
    description: "Beauty shouldn't come at the cost of animal welfare. We never test on animals at any stage of product development, and we work exclusively with suppliers who share our values.",
    features: [
      "No animal testing",
      "Cruelty-free certified",
      "Ethical supply chain",
      "Compassionate beauty"
    ]
  },
  natural: {
    title: "Natural Ingredients",
    icon: Sparkles,
    description: "Nature provides the finest ingredients. We harness botanical extracts, essential oils, and natural compounds that have been trusted for centuries, enhanced by modern science.",
    features: [
      "Botanical extracts",
      "Essential oils",
      "No harsh chemicals",
      "Pure formulations"
    ]
  },
  sustainable: {
    title: "Sustainable Packaging",
    icon: Recycle,
    description: "Our commitment extends beyond the product. We use recyclable materials, minimize waste, and continuously innovate to reduce our environmental footprint.",
    features: [
      "Recyclable materials",
      "Minimal packaging",
      "Eco-friendly design",
      "Carbon-conscious shipping"
    ]
  },
  italy: {
    title: "Made in Italy",
    icon: MapPin,
    description: "Crafted with Italian excellence. Our products are formulated and produced in Italy, combining traditional craftsmanship with cutting-edge skincare innovation.",
    features: [
      "Italian craftsmanship",
      "Premium quality",
      "Traditional expertise",
      "Modern innovation"
    ]
  },
  tested: {
    title: "Dermatologically Tested",
    icon: Shield,
    description: "Your skin's safety is paramount. Every product undergoes rigorous dermatological testing to ensure it's gentle, effective, and suitable for all skin types.",
    features: [
      "Clinical testing",
      "Safe for all skin types",
      "Hypoallergenic formulas",
      "Expert verified"
    ]
  }
};

// Product images for the carousel (products only)
const carouselImages = [
  { src: '/images/products/slider/Product1.jpg', alt: 'RISE Product 1' },
  { src: '/images/products/slider/Product2.jpg', alt: 'RISE Product 2' },
  { src: '/images/products/slider/product3.jpg', alt: 'RISE Product 3' },
  { src: '/images/products/slider/product4.jpg', alt: 'RISE Product 4' },
  { src: '/images/products/slider/Product5.jpg', alt: 'RISE Product 5' },
  { src: '/images/products/slider/Product6.jpg', alt: 'RISE Product 6' },
  { src: '/images/products/slider/Product7.jpg', alt: 'RISE Product 7' },
  { src: '/images/products/slider/product8.jpg', alt: 'RISE Product 8' },
  { src: '/images/products/slider/product9.jpg', alt: 'RISE Product 9' },
];

// Optimized Infinite Scrollable Product Carousel Component with Momentum
const InfiniteProductCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const animationFrameId = useRef<number>();
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumFrameId = useRef<number>();

  // Triple the images for seamless infinite scroll
  const extendedImages = [...carouselImages, ...carouselImages, ...carouselImages];

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (carouselRef.current) {
      const singleSetWidth = carouselRef.current.scrollWidth / 3;
      carouselRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  // Check and reset infinite loop position
  const checkLoop = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth } = carouselRef.current;
    const setWidth = scrollWidth / 3;
    
    if (scrollLeft >= setWidth * 2 - 10) {
      carouselRef.current.scrollLeft = scrollLeft - setWidth;
    } else if (scrollLeft <= 10) {
      carouselRef.current.scrollLeft = scrollLeft + setWidth;
    }
  }, []);

  // Mouse handlers with window-level listeners for smooth dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    
    // Stop any ongoing momentum
    if (momentumFrameId.current) {
      cancelAnimationFrame(momentumFrameId.current);
    }
    
    isDragging.current = true;
    startX.current = e.pageX;
    lastXRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    scrollStart.current = carouselRef.current.scrollLeft;
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
      carouselRef.current.style.scrollBehavior = 'auto';
    }
  }, []);

  // Apply momentum/inertia effect
  const applyMomentum = useCallback(() => {
    if (!carouselRef.current) return;
    
    const friction = 0.95; // Higher = slides longer
    const minVelocity = 0.5; // Minimum velocity to keep animating
    
    const animate = () => {
      if (!carouselRef.current || Math.abs(velocityRef.current) < minVelocity) {
        velocityRef.current = 0;
        return;
      }
      
      carouselRef.current.scrollLeft += velocityRef.current;
      velocityRef.current *= friction;
      checkLoop();
      
      momentumFrameId.current = requestAnimationFrame(animate);
    };
    
    momentumFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !carouselRef.current) return;
      
      // Use requestAnimationFrame for smooth updates
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      animationFrameId.current = requestAnimationFrame(() => {
        if (!carouselRef.current) return;
        
        const currentTime = Date.now();
        const currentX = e.pageX;
        const timeDelta = currentTime - lastTimeRef.current;
        
        // Calculate velocity for momentum
        if (timeDelta > 0) {
          const distance = lastXRef.current - currentX;
          velocityRef.current = distance / timeDelta * 16; // Normalize to ~60fps
        }
        
        lastXRef.current = currentX;
        lastTimeRef.current = currentTime;
        
        const dx = e.pageX - startX.current;
        carouselRef.current.scrollLeft = scrollStart.current - dx;
        checkLoop();
      });
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      
      isDragging.current = false;
      if (carouselRef.current) {
        carouselRef.current.style.cursor = 'grab';
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      // Apply momentum when releasing
      applyMomentum();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (momentumFrameId.current) {
        cancelAnimationFrame(momentumFrameId.current);
      }
    };
  }, [checkLoop, applyMomentum]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    
    // Stop any ongoing momentum
    if (momentumFrameId.current) {
      cancelAnimationFrame(momentumFrameId.current);
    }
    
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    scrollStart.current = carouselRef.current.scrollLeft;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      if (!carouselRef.current) return;
      
      const currentTime = Date.now();
      const currentX = e.touches[0].pageX;
      const timeDelta = currentTime - lastTimeRef.current;
      
      // Calculate velocity for momentum
      if (timeDelta > 0) {
        const distance = lastXRef.current - currentX;
        velocityRef.current = distance / timeDelta * 16;
      }
      
      lastXRef.current = currentX;
      lastTimeRef.current = currentTime;
      
      const dx = e.touches[0].pageX - startX.current;
      carouselRef.current.scrollLeft = scrollStart.current - dx;
      checkLoop();
    });
  }, [checkLoop]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    // Apply momentum when releasing
    applyMomentum();
  }, [applyMomentum]);

  // Handle scroll wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    carouselRef.current.scrollLeft += e.deltaY * 0.5;
    checkLoop();
  }, [checkLoop]);

  return (
    <div className="relative w-full py-4">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#F5F0EA] to-transparent z-10 pointer-events-none" />
      
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-8 sm:px-16 select-none"
        style={{
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {extendedImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="flex-shrink-0"
            style={{ userSelect: 'none' }}
          >
            <div className="w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group">
              <img
                src={getAssetPath(image.src)}
                alt={image.alt}
                className="w-full h-full object-cover"
                draggable="false"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Quick view button on hover */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  to="/products"
                  className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-stone-800 hover:bg-white transition-colors duration-200 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll hint */}
      <div className="text-center mt-6 text-stone-400 text-xs tracking-wider">
        <span className="inline-flex items-center gap-2">
          <span className="w-8 h-px bg-stone-300"></span>
          Drag to explore
          <span className="w-8 h-px bg-stone-300"></span>
        </span>
      </div>
    </div>
  );
};

// Image Carousel Slide Component
const ImageCarouselSlide = ({ src, index }: { src: string; index: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  const isActive = currentIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.05
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-10"
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <img 
          src={getAssetPath(src)}
          alt={`Natural Beauty ${index + 1}`}
          className="w-full h-full object-cover rounded-3xl shadow-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl" />
      </motion.div>
    </motion.div>
  );
};

const ParallaxLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [videoScrollProgress, setVideoScrollProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [selectedBelief, setSelectedBelief] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  // Simplified scroll handling for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    
    // Calculate video section scroll progress for immersive effect
    if (videoSectionRef.current) {
      const rect = videoSectionRef.current.getBoundingClientRect();
      const sectionHeight = videoSectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const effectRange = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      
      let progress = 0;
      if (scrolled >= 0 && scrolled <= effectRange) {
        progress = scrolled / effectRange;
      } else if (scrolled > effectRange) {
        progress = 1;
      }
      
      setVideoScrollProgress(progress);
    }
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
      {/* Immersive Video Hero with Scroll Animation */}
      <div 
        ref={videoSectionRef}
        className="relative"
        style={{ minHeight: '130vh' }}
      >
        {/* Sticky Video Container */}
        <div 
          className="sticky top-0 h-screen overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {/* Fallback Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-700" />
          
          {/* Video Background with zoom effect */}
          <div 
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${1 + videoScrollProgress * 0.15})`,
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover video-hero-bg optimized-video"
              style={{
                filter: `brightness(${0.4 - videoScrollProgress * 0.15}) contrast(1.1)`,
                opacity: isVideoLoaded ? 1 : 0,
              }}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              poster=""
            >
              <source src={getAssetPath('/videos/6811826-uhd_4096_2160_24fps.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Video Overlay that intensifies on scroll */}
          <div 
            className="absolute inset-0 transition-opacity duration-100"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(0,0,0,${0.3 + videoScrollProgress * 0.2}) 0%, 
                rgba(0,0,0,${0.2 + videoScrollProgress * 0.2}) 50%, 
                rgba(250,248,245,${videoScrollProgress * 0.95}) 100%)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-olive-900/30 via-transparent to-olive-900/30" />

          {/* Floating Parallax Elements - Fade out on scroll */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - videoScrollProgress * 2) }}
          >
            <div 
              className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-rice-300/10 to-olive-300/15 blur-3xl"
              style={{ animation: 'float 20s ease-in-out infinite' }}
            />
            <div 
              className="absolute top-1/3 right-1/6 w-80 h-80 rounded-full bg-gradient-to-r from-olive-400/10 to-rice-400/15 blur-3xl"
              style={{ animation: 'float 25s ease-in-out infinite reverse' }}
            />
            <div 
              className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-rice-500/8 to-olive-500/12 blur-3xl"
              style={{ animation: 'float 30s ease-in-out infinite' }}
            />
          </div>

          {/* Hero Content - Fades up and away */}
          <div 
            className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 lg:px-24 transition-all duration-100"
            style={{
              opacity: Math.max(0, 1 - videoScrollProgress * 2.5),
              transform: `translateY(${-videoScrollProgress * 120}px)`,
            }}
          >
            <div className="flex flex-col items-start text-left">
              {/* Large Logo */}
              <motion.div 
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="mb-12 sm:mb-16"
              >
                <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] leading-[0.85] font-light tracking-tighter text-white mix-blend-overlay opacity-95">
                  RISE
                </h1>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm sm:text-base tracking-[0.4em] uppercase text-white/80 font-light">
                    Cosmetics
                  </span>
                  <div className="h-px w-12 sm:w-20 bg-white/60"></div>
                </div>
              </motion.div>

              {/* Philosophy & CTA - Below Logo */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="flex flex-col items-start"
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 leading-relaxed mb-8 max-w-lg"
                   style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  Natural Beauty, <br/>
                  <span className="italic font-serif">Timeless Radiance.</span>
                </p>
                
                <p className="text-sm text-white/70 leading-relaxed mb-10 max-w-md font-light hidden sm:block text-left">
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

          {/* Scroll Indicator - Fades out on scroll */}
          <div 
            className="absolute bottom-8 right-8 sm:right-12 text-white/50 hidden lg:block transition-opacity duration-300"
            style={{
              opacity: Math.max(0, 1 - videoScrollProgress * 3)
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

          {/* Vignette Effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 150px rgba(0,0,0,0.3)'
          }} />
        </div>
      </div>

      {/* Smooth Gradient Fade Transition from Video to Collections */}
      <div className="relative h-40 sm:h-48 -mt-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF8F5]/50 to-[#FAF8F5]"></div>
      </div>

      {/* Mysterious Product Preview Section - 3 Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-[#F5F0EA] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Minimal Header with Mystery */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-10 sm:mb-12 lg:mb-14"
          >
            <span className="text-[0.65rem] sm:text-xs text-stone-500 tracking-[0.4em] uppercase font-light mb-3 block">
              Signature Collection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-stone-800 mb-3 tracking-tight">
              A Glimpse of Luxury
            </h2>
            <p className="text-sm text-stone-600/70 font-light max-w-md mx-auto leading-relaxed">
              Discover the essence of botanical elegance
            </p>
          </motion.div>

          {/* Three Featured Products - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            
            {/* Product 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/40 backdrop-blur-sm border border-stone-200/50 shadow-lg hover:shadow-2xl transition-all duration-700">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={getAssetPath('/images/products/IMG-20250808-WA0006.jpg')}
                    alt="Radiance Serum"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[0.6rem] text-white/70 tracking-[0.3em] uppercase font-light block mb-1">
                        Botanical Elixir
                      </span>
                      <h3 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wide">
                        Radiance Serum
                      </h3>
                      <p className="text-xs text-white/80 font-light leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Luminous rice extract blend for radiant skin
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-xs text-white border-b border-white/40 pb-1 hover:border-white transition-all duration-300 opacity-0 group-hover:opacity-100 delay-200"
                      >
                        <span className="tracking-wide">Discover More</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/40 backdrop-blur-sm border border-stone-200/50 shadow-lg hover:shadow-2xl transition-all duration-700">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={getAssetPath('/images/products/IMG-20250808-WA0007.jpg')}
                    alt="Eye Luce Drops"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[0.6rem] text-white/70 tracking-[0.3em] uppercase font-light block mb-1">
                        Illuminating Care
                      </span>
                      <h3 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wide">
                        Eye Luce Drops
                      </h3>
                      <p className="text-xs text-white/80 font-light leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Brightening drops for refreshed, vibrant eyes
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-xs text-white border-b border-white/40 pb-1 hover:border-white transition-all duration-300 opacity-0 group-hover:opacity-100 delay-200"
                      >
                        <span className="tracking-wide">Discover More</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/40 backdrop-blur-sm border border-stone-200/50 shadow-lg hover:shadow-2xl transition-all duration-700">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={getAssetPath('/images/products/IMG-20250808-WA0008.jpg')}
                    alt="Body Harmony"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[0.6rem] text-white/70 tracking-[0.3em] uppercase font-light block mb-1">
                        Nourishing Ritual
                      </span>
                      <h3 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wide">
                        Body Harmony
                      </h3>
                      <p className="text-xs text-white/80 font-light leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Luxurious body cream for silky smooth skin
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-xs text-white border-b border-white/40 pb-1 hover:border-white transition-all duration-300 opacity-0 group-hover:opacity-100 delay-200"
                      >
                        <span className="tracking-wide">Discover More</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mysterious CTA - Hint at More */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-xs sm:text-sm text-stone-500/70 font-light mb-5 tracking-wide">
              Three of our finest. More wonders await...
            </p>
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-stone-800/5 backdrop-blur-sm border border-stone-300/30 hover:bg-stone-800 hover:border-stone-800 transition-all duration-500 text-stone-700 hover:text-white"
            >
              <span className="text-sm tracking-widest uppercase font-light">Explore Full Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Ambient Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-stone-200/30 to-transparent blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gradient-to-l from-amber-100/20 to-transparent blur-3xl"></div>
        </div>
      </section>

      {/* Soft Fade Transition */}
      <div className="relative h-32 sm:h-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0EA] via-[#F3EDE5] to-[#F0E8DD]"></div>
      </div>

      {/* Philosophy Section - Enhanced with Parallax */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#F0E8DD] via-warm-cream to-warm-cream relative overflow-hidden">
        {/* Enhanced Background Elements with Parallax */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-rice-100/30 to-olive-100/20 blur-3xl"
            style={{ animation: 'float 25s ease-in-out infinite' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-olive-100/20 to-rice-100/25 blur-3xl"
            style={{ animation: 'float 30s ease-in-out infinite reverse' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Auto-changing Image Carousel */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative order-2 lg:order-1"
            >
              <div className="relative h-[700px] md:h-[800px]">
                {/* Image Carousel */}
                <AnimatePresence mode="wait">
                  {[
                    { src: '/images/products/slider/Girl1.jpg', key: 'girl1' },
                    { src: '/images/products/slider/Girl2.jpg', key: 'girl2' },
                    { src: '/images/products/slider/Girl3.jpg', key: 'girl3' }
                  ].map((image, index) => (
                    <ImageCarouselSlide 
                      key={image.key}
                      src={image.src}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
                
                {/* Decorative Element */}
                <motion.div 
                  className="absolute top-1/2 -left-12 w-32 h-32 rounded-full bg-warm-olive/10 blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Right: Philosophy Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8 order-1 lg:order-2"
            >
              {/* Header */}
              <div>
                <span className="text-xs text-warm-olive tracking-[0.3em] uppercase font-medium">Our Beliefs</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-rich-brown mt-4 mb-6 leading-tight">
                  Philosophy
                </h2>
                <div className="w-16 h-0.5 bg-warm-olive/50"></div>
              </div>

              {/* Philosophy Text - Dynamic based on selected belief */}
              <motion.div 
                className="space-y-5 min-h-[180px]"
                key={selectedBelief || 'default'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedBelief ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      {(() => {
                        const belief = beliefDetails[selectedBelief as keyof typeof beliefDetails];
                        const Icon = belief.icon;
                        return (
                          <>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warm-olive/20 to-amber-100/30 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-warm-olive" strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-playfair font-light text-rich-brown">{belief.title}</h3>
                          </>
                        );
                      })()}
                    </div>
                    <p className="text-lg text-stone-700 leading-relaxed font-normal">
                      {beliefDetails[selectedBelief as keyof typeof beliefDetails].description}
                    </p>
                    <ul className="space-y-2 mt-4">
                      {beliefDetails[selectedBelief as keyof typeof beliefDetails].features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-stone-600"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-warm-olive to-amber-600" />
                          <span className="font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-lg text-stone-700 leading-relaxed font-normal">
                      Embrace your natural essence with <span className="font-semibold text-rich-brown">RISE</span>, where holistic beauty meets mindful care.
                    </p>
                    <p className="text-base text-stone-600 leading-relaxed">
                      Crafted in Italy using botanical ingredients to provide you with the glow your skin craves. Every product bridges ancient wisdom and modern science.
                    </p>
                    <p className="text-sm text-warm-olive/80 italic mt-4">
                      Click on any commitment below to learn more about our values
                    </p>
                  </>
                )}
              </motion.div>

              {/* Our Commitments - Clickable Cards with Details */}
              <div className="pt-6 border-t border-warm-taupe/20">
                <h3 className="text-sm text-warm-olive tracking-[0.2em] uppercase font-medium mb-6">Our Commitments</h3>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* 100% Vegan */}
                  <motion.button
                    variants={scaleIn}
                    onClick={() => setSelectedBelief(selectedBelief === 'vegan' ? null : 'vegan')}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedBelief === 'vegan' 
                        ? 'bg-gradient-to-br from-stone-100/50 to-stone-50/40 border-stone-300/40 shadow-md shadow-stone-400/10 -translate-y-1' 
                        : 'bg-white/50 border-warm-taupe/10 hover:bg-white hover:shadow-md hover:shadow-stone-400/5 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        selectedBelief === 'vegan' ? 'bg-stone-300 text-white' : 'bg-stone-200/30 text-stone-600 group-hover:bg-stone-200/40'
                      }`}>
                        <Leaf className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        selectedBelief === 'vegan' ? 'text-rich-brown font-semibold' : 'text-stone-600'
                      }`}>100% Vegan</span>
                    </div>
                  </motion.button>
                  
                  {/* Cruelty Free */}
                  <motion.button
                    variants={scaleIn}
                    onClick={() => setSelectedBelief(selectedBelief === 'crueltyFree' ? null : 'crueltyFree')}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedBelief === 'crueltyFree' 
                        ? 'bg-gradient-to-br from-amber-50/50 to-orange-50/40 border-amber-300/40 shadow-md shadow-amber-400/10 -translate-y-1' 
                        : 'bg-white/50 border-warm-taupe/10 hover:bg-white hover:shadow-md hover:shadow-amber-400/5 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        selectedBelief === 'crueltyFree' ? 'bg-amber-300 text-white' : 'bg-amber-200/30 text-amber-700 group-hover:bg-amber-200/40'
                      }`}>
                        <Heart className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        selectedBelief === 'crueltyFree' ? 'text-rich-brown font-semibold' : 'text-stone-600'
                      }`}>Cruelty Free</span>
                    </div>
                  </motion.button>
                  
                  {/* Natural Ingredients */}
                  <motion.button
                    variants={scaleIn}
                    onClick={() => setSelectedBelief(selectedBelief === 'natural' ? null : 'natural')}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedBelief === 'natural' 
                        ? 'bg-gradient-to-br from-yellow-50/50 to-amber-50/40 border-yellow-300/40 shadow-md shadow-yellow-400/10 -translate-y-1' 
                        : 'bg-white/50 border-warm-taupe/10 hover:bg-white hover:shadow-md hover:shadow-yellow-400/5 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        selectedBelief === 'natural' ? 'bg-yellow-300 text-white' : 'bg-yellow-200/30 text-yellow-700 group-hover:bg-yellow-200/40'
                      }`}>
                        <Sparkles className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        selectedBelief === 'natural' ? 'text-rich-brown font-semibold' : 'text-stone-600'
                      }`}>Natural Ingredients</span>
                    </div>
                  </motion.button>
                  
                  {/* Sustainable Packaging */}
                  <motion.button
                    variants={scaleIn}
                    onClick={() => setSelectedBelief(selectedBelief === 'sustainable' ? null : 'sustainable')}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedBelief === 'sustainable' 
                        ? 'bg-gradient-to-br from-emerald-50/50 to-green-50/40 border-emerald-300/40 shadow-md shadow-emerald-400/10 -translate-y-1' 
                        : 'bg-white/50 border-warm-taupe/10 hover:bg-white hover:shadow-md hover:shadow-emerald-400/5 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        selectedBelief === 'sustainable' ? 'bg-emerald-300 text-white' : 'bg-emerald-200/30 text-emerald-700 group-hover:bg-emerald-200/40'
                      }`}>
                        <Recycle className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        selectedBelief === 'sustainable' ? 'text-rich-brown font-semibold' : 'text-stone-600'
                      }`}>Sustainable Packaging</span>
                    </div>
                  </motion.button>
                  
                  {/* Made in Italy */}
                  <motion.button
                    variants={scaleIn}
                    onClick={() => setSelectedBelief(selectedBelief === 'italy' ? null : 'italy')}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedBelief === 'italy' 
                        ? 'bg-gradient-to-br from-rose-50/50 to-pink-50/40 border-rose-300/40 shadow-md shadow-rose-400/10 -translate-y-1' 
                        : 'bg-white/50 border-warm-taupe/10 hover:bg-white hover:shadow-md hover:shadow-rose-400/5 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        selectedBelief === 'italy' ? 'bg-rose-300 text-white' : 'bg-rose-200/30 text-rose-700 group-hover:bg-rose-200/40'
                      }`}>
                        <MapPin className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        selectedBelief === 'italy' ? 'text-rich-brown font-semibold' : 'text-stone-600'
                      }`}>Made in Italy</span>
                    </div>
                  </motion.button>
                  
                  {/* Dermatologically Tested */}
                  <motion.button
                    variants={scaleIn}
                    onClick={() => setSelectedBelief(selectedBelief === 'tested' ? null : 'tested')}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedBelief === 'tested' 
                        ? 'bg-gradient-to-br from-violet-50/50 to-purple-50/40 border-violet-300/40 shadow-md shadow-violet-400/10 -translate-y-1' 
                        : 'bg-white/50 border-warm-taupe/10 hover:bg-white hover:shadow-md hover:shadow-violet-400/5 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        selectedBelief === 'tested' ? 'bg-violet-300 text-white' : 'bg-violet-200/30 text-violet-700 group-hover:bg-violet-200/40'
                      }`}>
                        <Shield className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        selectedBelief === 'tested' ? 'text-rich-brown font-semibold' : 'text-stone-600'
                      }`}>Dermatologically Tested</span>
                    </div>
                  </motion.button>
                </motion.div>
              </div>

              {/* CTA */}
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 text-warm-olive hover:text-rich-brown transition-colors duration-300 group pt-4"
              >
                <span className="text-sm tracking-wide font-medium">Learn More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Soft Fade Transition */}
      <div className="relative h-32 sm:h-40">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-cream via-[#FAF8F5] to-[#FEFDFB]"></div>
      </div>

      {/* Our Signature Products Section */}
      <section className="relative bg-gradient-to-b from-[#FEFDFB] via-white to-white py-20 sm:py-28 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-cream/15 via-transparent to-warm-cream/15"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="text-xs text-warm-olive tracking-[0.3em] uppercase font-medium">Our Collection</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-light text-rich-brown mt-3 mb-4 leading-tight">
              Signature Products
            </h2>
            <div className="w-16 h-0.5 bg-warm-olive/50 mx-auto"></div>
          </motion.div>

          {/* Products Grid - Alternating Layout */}
          <div className="space-y-16">
            
            {/* Product 1: Body Harmony - Image Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
            >
              {/* Image */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromLeft}
                className="relative group order-2 lg:order-1"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={getAssetPath('/images/products/slider/Product1.jpg')}
                    alt="Body Harmony Cream"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-4 order-1 lg:order-2">
                <div>
                  <p className="text-xs text-warm-olive tracking-[0.25em] uppercase mb-3">Body Care</p>
                  <h3 className="text-3xl md:text-4xl font-playfair font-light text-rich-brown mb-4">
                    Body Harmony
                  </h3>
                  <p className="text-stone-600 text-lg leading-relaxed mb-6">
                    Rich, creamy body cream in recycled matte beige packaging with golden accents. 
                    Perfect for daily massage rituals.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Texture</h4>
                    <p className="text-sm text-stone-600">Silky & Creamy</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Scent</h4>
                    <p className="text-sm text-stone-600">Natural & Spiritual</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Finish</h4>
                    <p className="text-sm text-stone-600">Nourished & Soft</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Use</h4>
                    <p className="text-sm text-stone-600">Daily Massage</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link 
                    to="/products/body-harmony"
                    className="inline-flex items-center gap-2 text-warm-olive hover:text-rich-brown transition-colors duration-300 group"
                  >
                    <span className="text-sm tracking-wide font-medium">Discover More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Product 2: Radiance Serum - Image Right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
            >
              {/* Content */}
              <div className="space-y-4 order-1">
                <div>
                  <p className="text-xs text-warm-olive tracking-[0.25em] uppercase mb-2">Face Care</p>
                  <h3 className="text-2xl md:text-3xl font-playfair font-light text-rich-brown mb-3">
                    Radiance Serum
                  </h3>
                  <p className="text-stone-600 text-base leading-relaxed">
                    Luminous face serum in an amber bottle with gold dropper. 
                    Precision-crafted for visible radiance and tone.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Texture</h4>
                    <p className="text-sm text-stone-600">Silky Liquid</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Absorption</h4>
                    <p className="text-sm text-stone-600">Rapid</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Finish</h4>
                    <p className="text-sm text-stone-600">Luminous & Toned</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Layering</h4>
                    <p className="text-sm text-stone-600">Ideal Base</p>
                  </div>
                </div>

                <div className="pt-3">
                  <Link 
                    to="/products/radiance-serum"
                    className="inline-flex items-center gap-2 text-warm-olive hover:text-rich-brown transition-colors duration-300 group"
                  >
                    <span className="text-sm tracking-wide font-medium">Discover More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Image */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromRight}
                className="relative group order-2"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={getAssetPath('/images/products/slider/Product5.jpg')}
                    alt="Radiance Serum"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Product 3: Eye Luce - Image Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
            >
              {/* Image */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromLeft}
                className="relative group order-2 lg:order-1"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={getAssetPath('/images/products/slider/Product6.jpg')}
                    alt="Eye Luce Drops"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-4 order-1 lg:order-2">
                <div>
                  <p className="text-xs text-warm-olive tracking-[0.25em] uppercase mb-2">Eye Care</p>
                  <h3 className="text-2xl md:text-3xl font-playfair font-light text-rich-brown mb-3">
                    Eye Luce
                  </h3>
                  <p className="text-stone-600 text-base leading-relaxed">
                    Refreshing eye drops in frosted glass with rose gold accents. 
                    Awakens and hydrates the delicate eye area.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Texture</h4>
                    <p className="text-sm text-stone-600">Ultra-Light Gel</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Effect</h4>
                    <p className="text-sm text-stone-600">Cooling</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Benefit</h4>
                    <p className="text-sm text-stone-600">Instant Hydration</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Application</h4>
                    <p className="text-sm text-stone-600">Precision Dropper</p>
                  </div>
                </div>

                <div className="pt-3">
                  <Link 
                    to="/products/eye-luce"
                    className="inline-flex items-center gap-2 text-warm-olive hover:text-rich-brown transition-colors duration-300 group"
                  >
                    <span className="text-sm tracking-wide font-medium">Discover More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Product 4: Soulrise - Image Right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
            >
              {/* Content */}
              <div className="space-y-4 order-1">
                <div>
                  <p className="text-xs text-warm-olive tracking-[0.25em] uppercase mb-2">Face Care</p>
                  <h3 className="text-2xl md:text-3xl font-playfair font-light text-rich-brown mb-3">
                    Soulrise
                  </h3>
                  <p className="text-stone-600 text-base leading-relaxed">
                    Luxurious face cream in satin beige airless bottle. 
                    Melts into skin for a natural glow and second-skin comfort.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Texture</h4>
                    <p className="text-sm text-stone-600">Rich & Light</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Sensation</h4>
                    <p className="text-sm text-stone-600">Second Skin</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Finish</h4>
                    <p className="text-sm text-stone-600">Natural Glow</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs text-warm-olive tracking-wider uppercase font-medium">Packaging</h4>
                    <p className="text-sm text-stone-600">Airless System</p>
                  </div>
                </div>

                <div className="pt-3">
                  <Link 
                    to="/products/soulrise"
                    className="inline-flex items-center gap-2 text-warm-olive hover:text-rich-brown transition-colors duration-300 group"
                  >
                    <span className="text-sm tracking-wide font-medium">Discover More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Image */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromRight}
                className="relative group order-2"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={getAssetPath('/images/products/slider/Product7.jpg')}
                    alt="Soulrise Face Cream"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Smooth Wave Transition */}
      <div className="relative h-1 bg-gradient-to-b from-white to-warm-cream"></div>
    </div>
  );
};

export default ParallaxLandingPage;
