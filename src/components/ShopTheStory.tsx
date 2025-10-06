import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Heart, ShoppingBag, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopTheStory: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stories = [
    {
      id: 1,
      title: "Morning Ritual",
      subtitle: "The Golden Hour Glow",
      description: "Discover the secret to radiant morning skin with our curated collection of rice-infused essentials. Each product works harmoniously to awaken your natural luminosity.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop",
      products: [
        {
          id: 1,
          name: "RISE Radiance Serum",
          price: 89,
          rating: 4.9,
          reviews: 1247,
          image: "/images/products/IMG-20250808-WA0006.jpg"
        },
        {
          id: 2,
          name: "RISE Gentle Cleanser",
          price: 42,
          rating: 4.8,
          reviews: 892,
          image: "/images/products/IMG-20250808-WA0013.jpg"
        }
      ],
      videoUrl: "/videos/4153584-uhd_4096_2160_25fps.mp4"
    },
    {
      id: 2,
      title: "Evening Transformation",
      subtitle: "Nighttime Renewal",
      description: "As the day winds down, treat your skin to the ultimate luxury experience. Our evening collection repairs, rejuvenates, and prepares your skin for tomorrow's radiance.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=1000&fit=crop",
      products: [
        {
          id: 3,
          name: "RISE Soul Night Cream",
          price: 125,
          rating: 4.9,
          reviews: 756,
          image: "/images/products/IMG-20250808-WA0007.jpg"
        },
        {
          id: 4,
          name: "RISE Eye Complex",
          price: 75,
          rating: 4.7,
          reviews: 543,
          image: "/images/products/IMG-20250808-WA0008.jpg"
        }
      ],
      videoUrl: "/videos/5358965-uhd_4096_2160_25fps.mp4"
    },
    {
      id: 3,
      title: "Special Occasion",
      subtitle: "Red Carpet Ready",
      description: "For those moments when you need to shine brightest, our premium collection delivers instant glamour and long-lasting radiance that photographs beautifully.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop",
      products: [
        {
          id: 5,
          name: "RISE Glow Oil Elixir",
          price: 150,
          rating: 4.8,
          reviews: 934,
          image: "/images/products/IMG-20250808-WA0010.jpg"
        },
        {
          id: 6,
          name: "RISE Hydrating Mist",
          price: 45,
          rating: 4.9,
          reviews: 678,
          image: "/images/products/IMG-20250808-WA0012.jpg"
        }
      ],
      videoUrl: "/videos/8959179-hd_1920_1080_25fps.mp4"
    }
  ];

  const currentStory = stories[activeStory];

  const handleVideoPlay = () => {
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
    <section className="py-24 bg-gradient-to-b from-white via-rice-25 to-olive-25">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-olive-900 mb-6">
            Shop the Story
          </h2>
          <p className="text-xl text-olive-700 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in carefully curated beauty narratives that blend storytelling with seamless shopping experiences
          </p>
        </div>

        {/* Story Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(index)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeStory === index
                    ? 'bg-olive-900 text-white shadow-lg'
                    : 'text-olive-700 hover:text-olive-900 hover:bg-white/50'
                }`}
              >
                {story.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Story Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Story Visual */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={currentStory.image}
                alt={currentStory.title}
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Play Video Button */}
              <button
                onClick={handleVideoPlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </button>

              {/* Hidden Video Element */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                style={{ opacity: isVideoPlaying ? 1 : 0 }}
                muted
                loop
                onEnded={() => setIsVideoPlaying(false)}
              >
                <source src={currentStory.videoUrl} type="video/mp4" />
              </video>

              {/* Story Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-olive-900 font-medium text-sm">{currentStory.subtitle}</span>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-light text-olive-900 mb-4">
                {currentStory.title}
              </h3>
              <h4 className="text-2xl text-olive-600 mb-6 font-light">
                {currentStory.subtitle}
              </h4>
              <p className="text-lg text-olive-700 leading-relaxed">
                {currentStory.description}
              </p>
            </div>

            {/* Featured Products */}
            <div className="space-y-6">
              <h5 className="text-xl font-medium text-olive-900">Featured Products</h5>
              
              {currentStory.products.map((product) => (
                <div key={product.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-rice-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h6 className="font-medium text-olive-900 mb-1">{product.name}</h6>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-olive-600 ml-1">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light text-olive-900">${product.price}</span>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg border border-olive-200 hover:bg-olive-50 transition-colors">
                            <Heart className="w-5 h-5 text-olive-600" />
                          </button>
                          <button className="bg-olive-900 text-white px-6 py-2 rounded-lg hover:bg-olive-800 transition-colors flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-olive-900 to-olive-700 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="font-medium">Explore Full Collection</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Story Indicators */}
        <div className="flex justify-center mt-16 gap-3">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStory === index
                  ? 'bg-olive-900 scale-125'
                  : 'bg-olive-300 hover:bg-olive-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopTheStory;
