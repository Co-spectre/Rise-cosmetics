import React, { useState, useEffect } from 'react';
import { Star, Heart, Verified, Instagram, Camera } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  username: string;
  avatar: string;
  rating: number;
  review: string;
  beforeImage?: string;
  afterImage?: string;
  productUsed: string;
  verified: boolean;
  location: string;
  socialPlatform: 'instagram' | 'verified';
  timeAgo: string;
  likes: number;
}

const SocialProofTestimonials: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null);
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: '@sarah_glowup',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b282?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: "I've been using RISE for 3 months and the transformation is incredible! My skin has never looked more radiant. The rice serum is pure magic ✨",
      beforeImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop',
      productUsed: 'RISE Radiance Serum',
      verified: true,
      location: 'New York, NY',
      socialPlatform: 'instagram',
      timeAgo: '2 days ago',
      likes: 127
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      username: '@skincare_maven',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: "As someone with sensitive skin, finding RISE was a game-changer. The natural ingredients work so gently yet effectively. My dermatologist even noticed the improvement!",
      productUsed: 'Gentle Rice Cleanser',
      verified: true,
      location: 'Los Angeles, CA',
      socialPlatform: 'verified',
      timeAgo: '1 week ago',
      likes: 89
    },
    {
      id: '3',
      name: 'Emma Thompson',
      username: '@beauty_insider_em',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: "The Soulrise cream is worth every penny! It's luxury skincare that actually delivers on its promises. My makeup artist keeps asking what I've been using.",
      beforeImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=400&fit=crop',
      productUsed: 'Soulrise Night Cream',
      verified: true,
      location: 'London, UK',
      socialPlatform: 'instagram',
      timeAgo: '3 days ago',
      likes: 203
    },
    {
      id: '4',
      name: 'Aisha Patel',
      username: '@aisha_skincare',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: "I was skeptical about another 'miracle' skincare brand, but RISE proved me wrong. The results speak for themselves - glowing, healthy skin in just 4 weeks!",
      productUsed: 'RISE Eye Complex',
      verified: true,
      location: 'Toronto, Canada',
      socialPlatform: 'verified',
      timeAgo: '5 days ago',
      likes: 156
    },
    {
      id: '5',
      name: 'Sophie Martin',
      username: '@sophie_natural',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: "Clean beauty that actually works! I love that RISE is transparent about their ingredients. The rice-based formula is perfect for my combination skin.",
      beforeImage: 'https://images.unsplash.com/photo-1583334146533-5b8b8a6a1951?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=400&fit=crop',
      productUsed: 'Complete Ritual Set',
      verified: true,
      location: 'Paris, France',
      socialPlatform: 'instagram',
      timeAgo: '1 week ago',
      likes: 92
    },
    {
      id: '6',
      name: 'Jessica Liu',
      username: '@jess_skincare_diary',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: "Finally found my holy grail products! The texture, the results, the packaging - everything about RISE screams luxury. My skin barrier has never been stronger.",
      productUsed: 'Restoration Elixir',
      verified: true,
      location: 'Sydney, Australia',
      socialPlatform: 'verified',
      timeAgo: '4 days ago',
      likes: 178
    }
  ];

  const BeforeAfterModal: React.FC<{ testimonial: Testimonial; onClose: () => void }> = ({
    testimonial,
    onClose
  }) => {
    const [showAfter, setShowAfter] = useState(false);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="relative bg-white rounded-3xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            ×
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-light text-olive-900 mb-2">
              {testimonial.name}'s Transformation
            </h3>
            <p className="text-olive-600">Using {testimonial.productUsed}</p>
          </div>

          {testimonial.beforeImage && testimonial.afterImage && (
            <div className="relative mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-olive-600 mb-2">BEFORE</p>
                  <img
                    src={testimonial.beforeImage}
                    alt="Before"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-olive-600 mb-2">AFTER</p>
                  <img
                    src={testimonial.afterImage}
                    alt="After"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="bg-rice-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-olive-900">{testimonial.name}</p>
                <p className="text-sm text-olive-600">{testimonial.username}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-olive-700 leading-relaxed">"{testimonial.review}"</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-olive-25 via-rice-25 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-olive-900 mb-6">
            Real Results, Real Stories
          </h2>
          <p className="text-xl text-olive-700 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have transformed their skin with RISE
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, visibleTestimonials).map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full ring-2 ring-rice-200"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Verified className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-olive-900">{testimonial.name}</p>
                    <p className="text-sm text-olive-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {testimonial.socialPlatform === 'instagram' && (
                    <Instagram className="w-4 h-4 text-pink-500" />
                  )}
                  <span className="text-xs text-olive-500">{testimonial.timeAgo}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-olive-700 mb-4 leading-relaxed line-clamp-3">
                "{testimonial.review}"
              </p>

              {/* Product Used */}
              <div className="bg-rice-50 rounded-xl p-3 mb-4">
                <p className="text-sm text-olive-600 mb-1">Product Used:</p>
                <p className="font-medium text-olive-900">{testimonial.productUsed}</p>
              </div>

              {/* Before/After Indicator */}
              {testimonial.beforeImage && testimonial.afterImage && (
                <button
                  onClick={() => setSelectedTestimonial(testimonial.id)}
                  className="w-full bg-olive-900 text-white py-3 rounded-xl hover:bg-olive-800 transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <Camera className="w-4 h-4" />
                  View Before & After
                </button>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-olive-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{testimonial.likes}</span>
                  </button>
                </div>
                <p className="text-xs text-olive-500">{testimonial.username}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleTestimonials < testimonials.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleTestimonials(prev => prev + 3)}
              className="bg-olive-900 text-white px-8 py-4 rounded-full hover:bg-olive-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Load More Stories
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-3xl font-light text-olive-900 mb-2">98%</p>
            <p className="text-olive-600">Customer Satisfaction</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-3xl font-light text-olive-900 mb-2">12K+</p>
            <p className="text-olive-600">Happy Customers</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-3xl font-light text-olive-900 mb-2">4.9</p>
            <p className="text-olive-600">Average Rating</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-3xl font-light text-olive-900 mb-2">30</p>
            <p className="text-olive-600">Countries Served</p>
          </div>
        </div>
      </div>

      {/* Before/After Modal */}
      {selectedTestimonial && (
        <BeforeAfterModal
          testimonial={testimonials.find(t => t.id === selectedTestimonial)!}
          onClose={() => setSelectedTestimonial(null)}
        />
      )}
    </section>
  );
};

export default SocialProofTestimonials;
