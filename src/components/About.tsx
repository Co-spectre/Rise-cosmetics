
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Leaf, Droplets, Heart, Sparkles, ChevronDown, ChevronLeft, ChevronRight, Droplet, Sun, Moon } from 'lucide-react';
import { getAssetPath } from '@/utils/assetPath';
import { motion, AnimatePresence } from 'framer-motion';

// Ritual Steps Data
const ritualSteps = [
  {
    step: 1,
    title: "Cleanse",
    subtitle: "Begin Fresh",
    description: "Start your ritual with our gentle rice water cleanser. Massage in circular motions to remove impurities while nourishing your skin with essential nutrients.",
    tip: "Use lukewarm water for best results",
    image: "/Rise-cosmetics/images/products/slider/Girl1.jpg",
    icon: Droplet,
    duration: "60 seconds"
  },
  {
    step: 2,
    title: "Tone",
    subtitle: "Balance & Prepare",
    description: "Apply our botanical toner to restore your skin's natural pH balance. Pat gently to help your skin absorb the essence of rice and olive extracts.",
    tip: "Apply while skin is still slightly damp",
    image: "/Rise-cosmetics/images/products/slider/Girl2.jpg",
    icon: Sparkles,
    duration: "30 seconds"
  },
  {
    step: 3,
    title: "Nourish",
    subtitle: "Deep Treatment",
    description: "Our signature serum penetrates deep into your skin, delivering concentrated botanical actives. Allow the formula to work its magic as you breathe deeply.",
    tip: "Press gently, don't rub",
    image: "/Rise-cosmetics/images/products/slider/Girl3.jpg",
    icon: Sun,
    duration: "45 seconds"
  },
  {
    step: 4,
    title: "Protect",
    subtitle: "Seal & Glow",
    description: "Complete your ritual with our hydrating moisturizer. Lock in all the goodness and create a protective barrier that keeps your skin radiant all day.",
    tip: "Don't forget your neck and décolletage",
    image: "/Rise-cosmetics/images/products/slider/Product1.jpg",
    icon: Moon,
    duration: "30 seconds"
  }
];

// Ritual Steps Carousel Component
const RitualStepsCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setActiveStep((prev) => (prev + 1) % ritualSteps.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const goToStep = (index: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
    // Restart auto-play after 10 seconds of inactivity
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setActiveStep((prev) => (prev + 1) % ritualSteps.length);
    }, 6000);
  };

  const nextStep = () => {
    goToStep((activeStep + 1) % ritualSteps.length);
  };

  const prevStep = () => {
    goToStep((activeStep - 1 + ritualSteps.length) % ritualSteps.length);
  };

  const currentStep = ritualSteps[activeStep];
  const IconComponent = currentStep.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.05,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        opacity: { duration: 0.6 },
        filter: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30, filter: "blur(4px)" },
    center: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.7, 
        delay: 0.15,
        ease: "easeOut" as const,
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      filter: "blur(4px)",
      transition: { duration: 0.4 } 
    },
  };

  return (
    <div className="relative">
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left: Image Carousel */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-stone-100">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 will-change-transform"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="eager"
                />
                {/* Soft gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
              </motion.div>
            </AnimatePresence>

            {/* Step Badge on Image */}
            <motion.div 
              className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-sm font-medium text-stone-800">
                Step {currentStep.step} of {ritualSteps.length}
              </span>
            </motion.div>

            {/* Duration Badge */}
            <motion.div 
              className="absolute bottom-6 left-6 bg-[#d4c8b8]/90 backdrop-blur-sm px-4 py-2 rounded-full text-stone-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm font-light">⏱ {currentStep.duration}</span>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevStep}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStep}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {ritualSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeStep 
                    ? 'w-8 h-2 bg-amber-700' 
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Step Content */}
        <div className="order-1 lg:order-2 space-y-8">
          {/* Step Indicators */}
          <div className="flex gap-4">
            {ritualSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`flex flex-col items-center gap-2 group transition-all duration-300 ${
                  index === activeStep ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index === activeStep 
                    ? 'bg-amber-700 text-white scale-110' 
                    : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'
                }`}>
                  <step.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  index === activeStep ? 'text-amber-700' : 'text-stone-400'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-amber-700" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-amber-700 font-medium">
                    {currentStep.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-playfair font-light text-stone-800">
                    {currentStep.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-stone-600 font-light leading-relaxed">
                {currentStep.description}
              </p>

              {/* Pro Tip */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-amber-800">Pro Tip</span>
                    <p className="text-sm text-amber-700 font-light mt-1">{currentStep.tip}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4c8b8] text-stone-800 rounded-lg hover:bg-[#c9baa6] transition-colors duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium tracking-wide">Shop {currentStep.title} Products</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Parallax Decorative Elements */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-amber-200/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-stone-200/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoScrollProgress, setVideoScrollProgress] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  
  // Polaroid Scatter state - optimized
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const sliderImages = [
    getAssetPath('/images/products/slider/Product1.jpg'),
    getAssetPath('/images/products/slider/Product2.jpg'),
    getAssetPath('/images/products/slider/product3.jpg'),
    getAssetPath('/images/products/slider/product4.jpg'),
    getAssetPath('/images/products/slider/Product5.jpg'),
    getAssetPath('/images/products/slider/Product6.jpg'),
    getAssetPath('/images/products/slider/Product7.jpg'),
    getAssetPath('/images/products/slider/product8.jpg'),
    getAssetPath('/images/products/slider/product9.jpg'),
  ];

  // Polaroid positions - widely scattered like photos thrown on a table
  const polaroidPositions = [
    { x: -140, y: -120, rotate: -22, scale: 0.95 },
    { x: 120, y: -100, rotate: 18, scale: 1.0 },
    { x: -160, y: 60, rotate: -14, scale: 0.92 },
    { x: 140, y: 110, rotate: 25, scale: 0.88 },
    { x: 0, y: 0, rotate: -5, scale: 1.05 },  // Center photo
    { x: -180, y: -20, rotate: -30, scale: 0.85 },
    { x: 170, y: -10, rotate: 20, scale: 0.9 },
    { x: -60, y: 140, rotate: 12, scale: 0.95 },
    { x: 70, y: -140, rotate: -16, scale: 0.9 },
  ];

  // Start auto-cycling function
  const startAutoPlay = useCallback((delay: number = 4000) => {
    // Clear any existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      setActivePhoto((prev) => {
        const next = prev === null ? 0 : (prev + 1) % sliderImages.length;
        return next;
      });
    }, delay);
  }, [sliderImages.length]);

  // Handle user clicking on a photo
  const handlePhotoClick = useCallback((index: number) => {
    // Clear auto-play when user interacts
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    
    // Clear any pending reset timer
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    
    setUserInteracted(true);
    
    // Toggle the clicked photo
    setActivePhoto((prev) => prev === index ? null : index);
    
    // After 8 seconds of no interaction, resume auto-play with slower timing
    resetTimerRef.current = setTimeout(() => {
      setUserInteracted(false);
      startAutoPlay(6000); // Slower auto-play after user interaction
    }, 8000);
  }, [startAutoPlay]);

  // Initialize auto-play on mount
  useEffect(() => {
    startAutoPlay(4000);
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [startAutoPlay]);

  // Scroll progress bar and video section tracking
  useEffect(() => {
    const handleScroll = () => {
      try {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
        
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
          
          console.log('Video scroll progress:', progress); // Debug
          setVideoScrollProgress(progress);
        }
      } catch (error) {
        console.error('Scroll handler error:', error);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    // Force update after a short delay to ensure ref is set
    const timer = setTimeout(() => handleScroll(), 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const ingredients = [
    {
      name: 'Rice Extract',
      origin: 'Northern Italy',
      benefit: 'Brightening & Nourishing'
    },
    {
      name: 'Olive Oil',
      origin: 'Tuscan Groves',
      benefit: 'Deep Hydration'
    },
    {
      name: 'Botanical Blend',
      origin: 'Mediterranean Coast',
      benefit: 'Skin Renewal'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Ethically sourced ingredients from nature, for nature.'
    },
    {
      icon: Droplets,
      title: 'Pure',
      description: 'No compromise on quality. Only the finest botanicals.'
    },
    {
      icon: Heart,
      title: 'Transparent',
      description: 'Complete honesty in every ingredient we choose.'
    }
  ];

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#d6c083] to-[#7d8c6a] z-[10000] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <section id="about" className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #fdfcf9 0%, #FAF6F0 50%, #f5f1e8 100%)'
      }}>

        {/* Our Journey Section */}
        <div 
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="py-20 sm:py-32 px-4 sm:px-6 relative fade-in-element"
        >
          <div className="max-w-6xl mx-auto">
            <div className="backdrop-blur-sm bg-white/60 rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 border border-white/40">
              <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-stone-600 mb-12 sm:mb-16 text-center font-light">
                Our Journey
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-amber-700 mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110">
                    2024
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">The Beginning</h3>
                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                    Founded in Italy with a vision to merge nature's wisdom with scientific innovation
                  </p>
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-amber-700 mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110">
                    2025
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">First Collection</h3>
                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                    Launched our signature range of botanical-based skincare essentials
                  </p>
                </div>
                <div className="text-center group sm:col-span-2 lg:col-span-1">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-amber-700 mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110">
                    Today
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">Growing Legacy</h3>
                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                    Expanding our reach while staying true to our commitment to pure, sustainable beauty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth transition to next section */}
        <div className="relative h-20 sm:h-28 bg-gradient-to-b from-[#f5f1e8] to-[#fdfcf9]">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,40 Q360,80 720,50 T1440,60 L1440,100 L0,100 Z" fill="#fdfcf9" />
          </svg>
        </div>

        {/* Philosophy Section - Warm cream */}
        <div 
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: '#faf6f0' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7d8c6a] font-light">
                  Our Philosophy
                </h2>
                <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-light text-[#7d8c6a] leading-relaxed italic">
                  "True beauty emerges when nature's wisdom meets intentional care"
                </blockquote>
                <p className="text-base sm:text-lg text-[#797870] font-light leading-relaxed">
                  We believe skincare should be a ritual—a moment of connection between you and the natural world. 
                  Each product is crafted to honor this sacred relationship.
                </p>
              </div>
              <div 
                ref={philosophyRef}
                className="relative min-h-[550px] md:min-h-[700px] overflow-visible"
              >
                {/* Polaroid Scatter - Photos scattered like on a table */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {sliderImages.map((image, index) => {
                    const pos = polaroidPositions[index];
                    const isActive = activePhoto === index;
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute cursor-pointer select-none"
                        style={{
                          width: '260px',
                          zIndex: isActive ? 50 : 10 + index,
                        }}
                        initial={false}
                        animate={{
                          x: isActive ? 0 : pos.x,
                          y: isActive ? 0 : pos.y,
                          rotate: isActive ? 0 : pos.rotate,
                          scale: isActive ? 1.5 : pos.scale,
                          zIndex: isActive ? 50 : 10 + index,
                        }}
                        whileHover={{
                          scale: isActive ? 1.5 : pos.scale * 1.15,
                          zIndex: 45,
                          rotate: pos.rotate * 0.3,
                          y: pos.y - 10,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          duration: 0.6
                        }}
                        onClick={() => handlePhotoClick(index)}
                      >
                        {/* Polaroid Frame */}
                        <div 
                          className={`bg-white p-2 sm:p-3 pb-10 sm:pb-12 rounded-sm transition-all duration-300 ${
                            isActive 
                              ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]' 
                              : 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]'
                          }`}
                        >
                          {/* Photo */}
                          <div className="aspect-square overflow-hidden bg-[#f8f6f2]">
                            <img
                              src={image}
                              alt={`RISE Product ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              draggable="false"
                            />
                          </div>
                          {/* Polaroid Bottom - subtle branding */}
                          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center">
                            <span className="text-[9px] sm:text-[10px] text-[#a89878] tracking-[0.25em] uppercase font-light">
                              Rise
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Smooth wave transition to The Ritual */}
        <div className="relative h-24 sm:h-32" style={{ background: 'linear-gradient(to bottom, #faf6f0, #fdfcf9)' }}>
          <svg className="absolute w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ritualWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fdfcf9" />
                <stop offset="50%" stopColor="#f5f0e8" />
                <stop offset="100%" stopColor="#fdfcf9" />
              </linearGradient>
            </defs>
            <path d="M0,60 Q240,0 480,60 T960,60 T1440,30 L1440,120 L0,120 Z" fill="url(#ritualWaveGradient)" opacity="0.5" />
            <path d="M0,80 Q360,20 720,70 T1440,50 L1440,120 L0,120 Z" fill="#fdfcf9" />
          </svg>
        </div>

        {/* THE RITUAL - Interactive Skincare Routine Section */}
        <div 
          ref={(el) => (sectionsRef.current[4] = el)}
          className="relative py-20 md:py-32 fade-in-element overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #fdfcf9 0%, #f5f0e8 50%, #ebe5dc 100%)' }}
        >
          {/* Floating Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-amber-100/30 to-stone-200/20 blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-stone-200/30 to-amber-100/20 blur-3xl"
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4 block font-light">
                Your Daily Practice
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-stone-800 mb-6">
                The Ritual
              </h2>
              <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto">
                Transform your skincare routine into a moment of self-care. Follow our four-step ritual for radiant, healthy skin.
              </p>
            </motion.div>

            {/* Interactive Ritual Steps */}
            <RitualStepsCarousel />
          </div>
        </div>

        {/* Smooth wave transition to Craftsmanship */}
        <div className="relative h-20 sm:h-28" style={{ background: 'linear-gradient(to bottom, #ebe5dc, #f5ede8)' }}>
          <svg className="absolute w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,40 Q480,100 960,30 T1440,60 L1440,100 L0,100 Z" fill="#f5ede8" opacity="0.6" />
            <path d="M0,60 C360,20 720,90 1440,40 L1440,100 L0,100 Z" fill="#f5ede8" />
          </svg>
        </div>



        {/* Values Grid - Warm sand theme */}
        <div 
          ref={(el) => (sectionsRef.current[6] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #ede5dd 0%, #e8e1d5 100%)' }}
        >
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-700 mb-12 sm:mb-16 text-center font-light">
              Our Commitments
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-full border border-stone-300 group-hover:bg-stone-200 transition-all duration-300">
                    <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-stone-600 group-hover:text-stone-700 transition-all duration-300" strokeWidth={1} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-3 sm:mb-4 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smooth blend to Commitment Stats */}
        <div className="relative h-16 sm:h-20" style={{ background: 'linear-gradient(to bottom, #e8e1d5, #e8e1d5)' }}>
          <svg className="absolute w-full h-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 Q480,60 960,20 T1440,40 L1440,60 L0,60 Z" fill="#e8e1d5" opacity="0.7" />
          </svg>
        </div>

        {/* Founder's Note - Light cream transition */}
        <div 
          ref={(el) => (sectionsRef.current[8] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #f5f0e8 0%, #fdfcf9 100%)' }}
        >
          <div className="px-4 sm:px-6 max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-stone-700 leading-relaxed mb-6 sm:mb-8 italic">
              "Our mission is simple: to create skincare that honors both your skin and the earth. 
              Every product is a love letter to nature's incredible healing power."
            </p>
            <p className="text-base sm:text-lg font-playfair text-amber-900 mb-1 sm:mb-2">— The RISE Team</p>
            <p className="text-xs sm:text-sm text-amber-700 tracking-wide">Italy, 2025</p>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 sm:py-16 md:py-20 text-center bg-[#fdfcf9] px-4">
          <a 
            href="/products"
            className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 border-2 border-[#c9baa6] bg-[#d4c8b8] text-stone-800 font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm hover:bg-[#c9baa6] transition-all duration-300 rounded-sm"
          >
            Discover Our Collection
          </a>
        </div>

        {/* Smooth wave transition to Footer */}
        <div className="relative h-20 sm:h-28" style={{ background: '#fdfcf9' }}>
          <svg className="absolute w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="footerTransition" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdfcf9" />
                <stop offset="100%" stopColor="#F5F0EA" />
              </linearGradient>
            </defs>
            <path d="M0,20 Q360,80 720,40 T1440,60 L1440,100 L0,100 Z" fill="url(#footerTransition)" />
          </svg>
        </div>

      </section>

      {/* Custom CSS for fade-in animations */}
            <style>{`
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .product-3d-card {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-3d-card:hover {
          transform: translateY(-10px) rotateY(5deg) scale(1.02);
        }

        .product-3d-card:hover > div {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 60px rgba(214, 192, 131, 0.3);
        }
      `}</style>
    </>
  );
};

export default About;
