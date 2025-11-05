import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';

const AesopInspiredLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[data-section]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle video playback
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-rice-50">
      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4">
            {/* Logo */}
            <Link to="/" className="relative z-50">
              <Logo 
                variant={scrollY > 50 ? 'dark' : 'light'}
                size="sm"
                className="transform scale-90"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink href="/products" scrolled={scrollY > 50}>Products</NavLink>
              <NavLink href="/collections" scrolled={scrollY > 50}>Collections</NavLink>
              <NavLink href="/about" scrolled={scrollY > 50}>About</NavLink>
              <NavLink href="/stores" scrolled={scrollY > 50}>Stores</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-50 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrollY > 50 ? 'text-stone-800' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrollY > 50 ? 'text-stone-800' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-rice-50 transform transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
          <div className="h-full flex flex-col pt-24 px-6">
            <MobileNavLink href="/products" onClick={() => setIsMenuOpen(false)}>Products</MobileNavLink>
            <MobileNavLink href="/collections" onClick={() => setIsMenuOpen(false)}>Collections</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="/stores" onClick={() => setIsMenuOpen(false)}>Stores</MobileNavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        data-section="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/6811826-uhd_4096_2160_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight mb-6">
            The poetry of design meets the science of nature
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/90 mb-12">
            Discover our collection of natural skincare formulated with purpose
          </p>
          <Link
            to="/products"
            className="inline-flex items-center border border-white/80 px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            <span>Explore Products</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Video Controls */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 z-10 text-white/80 hover:text-white transition-colors"
          aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
        >
          {isVideoPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section 
        data-section="featured"
        className="min-h-screen bg-rice-50 relative overflow-hidden"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2 min-h-screen">
            {/* Product Image */}
            <div className="relative h-[60vh] lg:h-screen order-1 lg:order-none">
              <div className="absolute inset-0">
                <div className="relative h-full">
                  <img
                    src="/images/products/serum-display.jpg"
                    alt="Radiance Serum"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rice-50/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex items-center px-6 lg:px-20 py-20 lg:py-0">
              <div className="max-w-xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">Featured Product</h3>
                    <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-stone-900 mb-4">
                      Radiance Serum
                    </h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                      A lightweight yet potent formulation featuring our signature rice peptide complex,
                      designed to illuminate and revitalize your skin's natural radiance.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-px h-12 bg-stone-300" />
                      <div>
                        <h4 className="text-sm font-medium text-stone-900 mb-1">Ideal For</h4>
                        <p className="text-stone-600">All skin types, especially those seeking enhanced luminosity</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-px h-12 bg-stone-300" />
                      <div>
                        <h4 className="text-sm font-medium text-stone-900 mb-1">Key Ingredients</h4>
                        <p className="text-stone-600">Rice peptides, botanical extracts, natural antioxidants</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link
                      to="/product/radiance-serum"
                      className="inline-block w-full lg:w-auto text-center border border-stone-900 px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-all duration-300"
                    >
                      Discover More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Collection Section */}
      <section 
        data-section="collection"
        className="min-h-screen bg-stone-100 relative py-20 lg:py-32"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-stone-900 mb-6">
              Skincare with intention
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              Each product in our collection is thoughtfully formulated to work in harmony,
              creating a complete experience for your skin's wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: 'Radiance Serum',
                description: 'Illuminating face serum with rice peptides',
                image: '/images/products/serum.jpg',
                price: '€68',
              },
              {
                name: 'Soulrise Cream',
                description: 'Nourishing face cream for daily use',
                image: '/images/products/cream.jpg',
                price: '€78',
              },
              {
                name: 'Eye Luce Drops',
                description: 'Revitalizing eye treatment',
                image: '/images/products/drops.jpg',
                price: '€58',
              },
            ].map((product, index) => (
              <Link
                key={product.name}
                to={`/product/${product.name.toLowerCase().replace(' ', '-')}`}
                className="group block bg-white"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-lg font-light text-stone-900 mb-2">{product.name}</h3>
                  <p className="text-stone-600 mb-4">{product.description}</p>
                  <span className="text-stone-900">{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        data-section="philosophy"
        className="min-h-screen bg-white relative py-20 lg:py-32 overflow-hidden"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0">
            {/* Text Content */}
            <div className="flex items-center px-6 lg:px-20">
              <div className="max-w-xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-2">Our Philosophy</h3>
                    <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-stone-900 mb-6">
                      The essence of mindful beauty
                    </h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                      We believe in the power of intention, the wisdom of nature, and the poetry of science.
                      Each product is a testament to this philosophy, crafted with purpose and precision.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-px h-12 bg-stone-300" />
                      <div>
                        <h4 className="text-sm font-medium text-stone-900 mb-1">Italian Craftsmanship</h4>
                        <p className="text-stone-600">Created with precision and care in our Italian laboratories</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-px h-12 bg-stone-300" />
                      <div>
                        <h4 className="text-sm font-medium text-stone-900 mb-1">Natural Innovation</h4>
                        <p className="text-stone-600">Advanced formulations powered by nature's finest ingredients</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link
                      to="/about"
                      className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors"
                    >
                      <span className="text-sm tracking-widest uppercase">Read More</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative h-[60vh] lg:h-screen">
              <div className="absolute inset-0 grid grid-cols-2 gap-px">
                <div className="relative">
                  <img
                    src="/images/philosophy-1.jpg"
                    alt="Natural ingredients"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="relative">
                  <img
                    src="/images/philosophy-2.jpg"
                    alt="Italian craftsmanship"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Navigation Components
const NavLink = ({ href, children, scrolled = false }) => (
  <Link
    to={href}
    className={`text-sm tracking-widest uppercase ${
      scrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white hover:text-white/80'
    } transition-colors`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
    className="block py-4 text-lg text-stone-900 hover:text-stone-600 transition-colors border-b border-stone-200"
  >
    {children}
  </Link>
);

export default AesopInspiredLanding;