import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, ShoppingBag } from 'lucide-react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  content: {
    type: 'image' | 'video';
    src: string;
    duration?: number;
  }[];
  products?: {
    name: string;
    price: string;
    x: number;
    y: number;
  }[];
}

const InstagramStories: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);

  const stories: Story[] = [
    {
      id: '1',
      username: 'sarah_glowup',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b282?w=100&h=100&fit=crop&crop=face',
      content: [
        {
          type: 'image',
          src: '/images/products/IMG-20250808-WA0006.jpg',
          duration: 4000
        }
      ],
      products: [
        { name: 'RISE Radiance Serum', price: '$89', x: 60, y: 40 }
      ]
    },
    {
      id: '2',
      username: 'makeup_maven',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: [
        {
          type: 'image',
          src: '/images/products/IMG-20250808-WA0007.jpg',
          duration: 4000
        }
      ],
      products: [
        { name: 'RISE Night Cream', price: '$125', x: 50, y: 60 }
      ]
    },
    {
      id: '3',
      username: 'beauty_insider',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: [
        {
          type: 'image',
          src: '/images/products/IMG-20250808-WA0008.jpg',
          duration: 4000
        }
      ],
      products: [
        { name: 'RISE Eye Complex', price: '$75', x: 45, y: 35 }
      ]
    },
    {
      id: '4',
      username: 'skincare_ritual',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      content: [
        {
          type: 'image',
          src: '/images/products/IMG-20250808-WA0009.jpg',
          duration: 4000
        }
      ],
      products: [
        { name: 'RISE Exfoliating Mask', price: '$95', x: 55, y: 50 }
      ]
    },
    {
      id: '5',
      username: 'glow_goddess',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: [
        {
          type: 'image',
          src: '/images/products/IMG-20250808-WA0010.jpg',
          duration: 4000
        }
      ],
      products: [
        { name: 'RISE Glow Oil', price: '$150', x: 40, y: 45 }
      ]
    }
  ];

  const currentStory = stories[activeStoryIndex];
  const currentContent = currentStory?.content[activeContentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextContent();
          return 0;
        }
        return prev + (100 / (currentContent?.duration || 4000)) * 100;
      });
    }, 100);

    return () => {
      if (progressRef.current !== null) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
    };
  }, [isPlaying, activeStoryIndex, activeContentIndex]);

  const nextContent = () => {
    if (activeContentIndex < currentStory.content.length - 1) {
      setActiveContentIndex(prev => prev + 1);
    } else if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(prev => prev + 1);
      setActiveContentIndex(0);
    } else {
      setActiveStoryIndex(0);
      setActiveContentIndex(0);
    }
    setProgress(0);
  };

  const previousContent = () => {
    if (activeContentIndex > 0) {
      setActiveContentIndex(prev => prev - 1);
    } else if (activeStoryIndex > 0) {
      setActiveStoryIndex(prev => prev - 1);
      setActiveContentIndex(stories[activeStoryIndex - 1].content.length - 1);
    }
    setProgress(0);
  };

  const selectStory = (index: number) => {
    setActiveStoryIndex(index);
    setActiveContentIndex(0);
    setProgress(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rice-50 via-white to-olive-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-olive-900 mb-4">
            Beauty Stories
          </h2>
          <p className="text-lg text-olive-700 max-w-2xl mx-auto">
            Real customers sharing their RISE transformation journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Story Avatars */}
          <div className="flex lg:flex-col gap-4 justify-center lg:justify-start">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => selectStory(index)}
                className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden transition-all duration-300 ${
                  activeStoryIndex === index 
                    ? 'ring-4 ring-gradient-to-r from-rice-400 to-olive-400 scale-110' 
                    : 'ring-2 ring-gray-200 hover:ring-olive-300'
                }`}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-rice-400 to-olive-400 ${
                  activeStoryIndex === index ? 'animate-pulse' : ''
                }`} />
                <div className="absolute inset-1 rounded-full overflow-hidden">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                {activeStoryIndex === index && (
                  <div className="absolute inset-0 bg-olive-900/20 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Story Viewer */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative bg-black rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl">
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
                {currentStory?.content.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                      style={{
                        width: index === activeContentIndex ? `${progress}%` : index < activeContentIndex ? '100%' : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentStory?.avatar}
                    alt={currentStory?.username}
                    className="w-8 h-8 rounded-full ring-2 ring-white"
                  />
                  <span className="text-white font-medium text-sm">
                    {currentStory?.username}
                  </span>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              </div>

              {/* Story Content */}
              <div className="relative w-full h-full">
                <img
                  src={currentContent?.src}
                  alt="Story content"
                  className="w-full h-full object-cover"
                />
                
                {/* Product Tags */}
                {currentStory?.products?.map((product, index) => (
                  <button
                    key={index}
                    className="absolute bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-medium hover:bg-black/80 transition-all duration-300 transform hover:scale-105"
                    style={{ left: `${product.x}%`, top: `${product.y}%` }}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-3 h-3" />
                      <span>{product.name}</span>
                      <span className="text-rice-300">{product.price}</span>
                    </div>
                  </button>
                ))}

                {/* Story Actions */}
                <div className="absolute bottom-6 left-4 right-4 flex items-center justify-between">
                  <button className="text-white/80 hover:text-white transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all">
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Touch Areas for Navigation */}
              <button
                onClick={previousContent}
                className="absolute left-0 top-0 w-1/3 h-full z-10"
              />
              <button
                onClick={nextContent}
                className="absolute right-0 top-0 w-1/3 h-full z-10"
              />
            </div>
          </div>

          {/* Story Info Panel */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-medium text-olive-900 mb-3">
                Featured Products
              </h3>
              {currentStory?.products?.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-olive-100 last:border-0">
                  <div>
                    <p className="font-medium text-olive-900">{product.name}</p>
                    <p className="text-olive-600">{product.price}</p>
                  </div>
                  <button className="bg-olive-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-olive-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-rice-100 to-olive-100 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-olive-900 mb-3">
                @{currentStory?.username}
              </h3>
              <p className="text-olive-700 text-sm leading-relaxed">
                "RISE has completely transformed my skincare routine. The natural ingredients and luxurious textures make every application feel like a spa treatment."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramStories;
