import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Share2, Heart, ShoppingBag } from 'lucide-react';

interface VideoTestimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  videoUrl: string;
  thumbnail: string;
  product: string;
  beforeImage: string;
  afterImage: string;
  timeUsed: string;
  skinConcern: string;
  rating: number;
  quote: string;
  verified: boolean;
}

const InteractiveVideoTestimonials: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      location: "Los Angeles, CA",
      videoUrl: "/videos/6811826-uhd_4096_2160_24fps.mp4",
      thumbnail: "/images/products/IMG-20250808-WA0006.jpg",
      product: "RISE Radiance Serum",
      beforeImage: "/api/placeholder/300/400",
      afterImage: "/api/placeholder/300/400",
      timeUsed: "4 weeks",
      skinConcern: "Dull skin & dark spots",
      rating: 5,
      quote: "My skin has never looked this radiant! The RISE serum completely transformed my complexion.",
      verified: true
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      age: 35,
      location: "Miami, FL",
      videoUrl: "/videos/4153584-uhd_4096_2160_25fps.mp4",
      thumbnail: "/images/products/IMG-20250808-WA0007.jpg",
      product: "RISE Soul Renewal Night Cream",
      beforeImage: "/api/placeholder/300/400",
      afterImage: "/api/placeholder/300/400",
      timeUsed: "6 weeks",
      skinConcern: "Fine lines & uneven texture",
      rating: 5,
      quote: "Waking up to visibly smoother skin every morning has been life-changing!",
      verified: true
    },
    {
      id: 3,
      name: "Jessica Park",
      age: 42,
      location: "New York, NY",
      videoUrl: "/videos/8391363-hd_1920_1080_24fps.mp4",
      thumbnail: "/images/products/IMG-20250808-WA0008.jpg",
      product: "RISE Eye Luce Complex",
      beforeImage: "/api/placeholder/300/400",
      afterImage: "/api/placeholder/300/400",
      timeUsed: "3 weeks",
      skinConcern: "Dark circles & puffiness",
      rating: 5,
      quote: "Finally found an eye cream that actually works! No more concealer needed.",
      verified: true
    }
  ];

  const currentTestimonial = testimonials[activeVideo];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    setDuration(Math.floor(Math.random() * 60) + 30); // Random duration between 30-90 seconds
    setCurrentTime(0);
    setIsPlaying(false);
  }, [activeVideo]);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-olive-600 to-rice-600">
              Real Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Watch authentic transformations from our community of beauty enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Container */}
              <div className="relative aspect-video">
                <video
                  className="w-full h-full object-cover"
                  poster={currentTestimonial.thumbnail}
                  muted={isMuted}
                  loop
                >
                  <source src={currentTestimonial.videoUrl} type="video/mp4" />
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-gray-900" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  {/* Progress Bar */}
                  <div className="w-full bg-black/50 rounded-full h-1 mb-4">
                    <div
                      className="h-1 bg-gradient-to-r from-olive-400 to-rice-400 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>

                      <span className="text-white text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowBeforeAfter(true)}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
                      >
                        Before/After
                      </button>

                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{currentTestimonial.name}</h3>
                    <p className="text-gray-600">{currentTestimonial.age} • {currentTestimonial.location}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {currentTestimonial.verified && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        ✓ Verified Purchase
                      </span>
                    )}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic text-lg mb-4">
                  "{currentTestimonial.quote}"
                </blockquote>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500 font-medium">Product Used:</span>
                    <p className="text-gray-900 font-medium">{currentTestimonial.product}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 font-medium">Time Used:</span>
                    <p className="text-gray-900 font-medium">{currentTestimonial.timeUsed}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-gray-500 font-medium">Skin Concern:</span>
                  <p className="text-gray-900 font-medium">{currentTestimonial.skinConcern}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleLike(currentTestimonial.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      liked.has(currentTestimonial.id)
                        ? 'bg-red-50 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked.has(currentTestimonial.id) ? 'fill-current' : ''}`} />
                    Like
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                    Shop This Look
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Selector */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">More Stories</h3>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                onClick={() => setActiveVideo(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === activeVideo
                    ? 'bg-olive-50 border-2 border-olive-200 shadow-lg'
                    : 'bg-white border border-gray-200 hover:border-olive-300 hover:shadow-md'
                }`}
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{testimonial.product}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before/After Modal */}
      {showBeforeAfter && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Before & After</h3>
              <button
                onClick={() => setShowBeforeAfter(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 text-center">Before</h4>
                <img
                  src={currentTestimonial.beforeImage}
                  alt="Before"
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 text-center">After {currentTestimonial.timeUsed}</h4>
                <img
                  src={currentTestimonial.afterImage}
                  alt="After"
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">Results after using <strong>{currentTestimonial.product}</strong> for {currentTestimonial.timeUsed}</p>
              <button
                onClick={() => setShowBeforeAfter(false)}
                className="px-6 py-3 bg-olive-600 text-white rounded-xl hover:bg-olive-700 transition-colors"
              >
                Shop This Product
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveVideoTestimonials;
