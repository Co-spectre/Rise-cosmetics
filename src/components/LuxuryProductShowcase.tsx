import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  bestseller?: boolean;
  new?: boolean;
  ingredients: string[];
  description: string;
}

const LuxuryProductShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const products: Product[] = [
    {
      id: 1,
      name: "RISE Radiance Illuminating Serum",
      price: 89,
      originalPrice: 120,
      image: "/images/products/IMG-20250808-WA0006.jpg",
      category: "Serums",
      rating: 4.9,
      reviews: 1247,
      bestseller: true,
      ingredients: ["Rice Bran Extract", "Vitamin C", "Hyaluronic Acid", "Niacinamide"],
      description: "Brightening serum that gives skin an instant glow while providing long-term radiance benefits."
    },
    {
      id: 2,
      name: "RISE Soul Renewal Night Cream",
      price: 125,
      image: "/images/products/IMG-20250808-WA0007.jpg",
      category: "Moisturizers",
      rating: 4.8,
      reviews: 892,
      new: true,
      ingredients: ["Retinol", "Peptides", "Ceramides", "Squalane"],
      description: "Advanced night cream that works while you sleep to reveal smoother, firmer skin by morning."
    },
    {
      id: 3,
      name: "RISE Eye Luce Brightening Complex",
      price: 75,
      image: "/images/products/IMG-20250808-WA0008.jpg",
      category: "Eye Care",
      rating: 4.7,
      reviews: 654,
      ingredients: ["Caffeine", "Vitamin K", "Arnica", "Hyaluronic Acid"],
      description: "Intensive eye treatment that reduces dark circles and puffiness for a refreshed appearance."
    },
    {
      id: 4,
      name: "RISE Rice Exfoliating Mask",
      price: 95,
      originalPrice: 110,
      image: "/images/products/IMG-20250808-WA0009.jpg",
      category: "Masks",
      rating: 4.9,
      reviews: 1089,
      bestseller: true,
      ingredients: ["Rice Powder", "AHA", "BHA", "Vitamin E"],
      description: "Gentle yet effective exfoliating mask that reveals smoother, brighter skin with natural rice extracts."
    },
    {
      id: 5,
      name: "RISE Luxury Glow Oil Elixir",
      price: 150,
      image: "/images/products/IMG-20250808-WA0010.jpg",
      category: "Oils",
      rating: 4.8,
      reviews: 423,
      new: true,
      ingredients: ["Jojoba Oil", "Rosehip Oil", "Vitamin C", "Gold Particles"],
      description: "Luxurious facial oil infused with 24k gold particles for the ultimate radiant complexion."
    },
    {
      id: 6,
      name: "RISE Vitamin C Brightening Drops",
      price: 68,
      image: "/images/products/IMG-20250808-WA0011.jpg",
      category: "Serums",
      rating: 4.6,
      reviews: 756,
      ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E", "Rice Water"],
      description: "Potent vitamin C drops that brighten and even skin tone with antioxidant protection."
    },
    {
      id: 7,
      name: "RISE Hydrating Mist Spray",
      price: 45,
      originalPrice: 55,
      image: "/images/products/IMG-20250808-WA0012.jpg",
      category: "Mists",
      rating: 4.5,
      reviews: 432,
      ingredients: ["Rose Water", "Hyaluronic Acid", "Aloe Vera", "Green Tea"],
      description: "Refreshing hydrating mist that instantly revitalizes and sets makeup throughout the day."
    },
    {
      id: 8,
      name: "RISE Gentle Cleansing Foam",
      price: 42,
      image: "/images/products/IMG-20250808-WA0013.jpg",
      category: "Cleansers",
      rating: 4.7,
      reviews: 623,
      ingredients: ["Rice Bran", "Coconut Oil", "Chamomile", "Glycerin"],
      description: "Luxurious foaming cleanser that gently removes impurities while maintaining skin's natural moisture."
    },
    {
      id: 9,
      name: "RISE Antioxidant Protection Cream",
      price: 98,
      image: "/images/products/IMG-20250808-WA0014.jpg",
      category: "Moisturizers",
      rating: 4.8,
      reviews: 567,
      ingredients: ["Green Tea", "Vitamin E", "Coenzyme Q10", "Rice Extract"],
      description: "Daily protection cream packed with antioxidants to shield skin from environmental damage."
    },
    {
      id: 10,
      name: "RISE Overnight Recovery Serum",
      price: 115,
      image: "/images/products/IMG-20250808-WA0015.jpg",
      category: "Serums",
      rating: 4.9,
      reviews: 892,
      bestseller: true,
      ingredients: ["Bakuchiol", "Hyaluronic Acid", "Peptides", "Rice Ceramides"],
      description: "Intensive overnight serum that repairs and rejuvenates skin while you sleep."
    }
  ];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 2));
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 2)) % Math.max(1, products.length - 2));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredProduct === null) {
        nextProduct();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [hoveredProduct]);

  return (
    <section className="py-20 bg-gradient-to-br from-rice-50 via-white to-olive-50 relative overflow-hidden">
      {/* Background Elements - Removed floating particles for cleaner look */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-olive-200/20 to-rice-200/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-rice-200/15 to-olive-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-olive-600" />
            <span className="text-olive-600 font-medium tracking-wide">FEATURED COLLECTION</span>
            <Sparkles className="w-6 h-6 text-olive-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-600 to-rice-600">
              Signature Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Handpicked luxury skincare products that transform your beauty routine into a ritual of self-care
          </p>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevProduct}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-olive-600 transition-colors" />
          </button>

          <button
            onClick={nextProduct}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-olive-600 transition-colors" />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.bestseller && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                      BESTSELLER
                    </span>
                  )}
                  {product.new && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                      NEW
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                      SALE
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-olive-50 transition-colors group/btn">
                        <Eye className="w-5 h-5 text-gray-700 group-hover/btn:text-olive-600" />
                      </button>
                      <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-olive-50 transition-colors group/btn">
                        <ShoppingBag className="w-5 h-5 text-gray-700 group-hover/btn:text-olive-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-olive-600 font-medium">{product.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-olive-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Ingredients Preview */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 font-medium">KEY INGREDIENTS:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.ingredients.slice(0, 2).map((ingredient, index) => (
                        <span key={index} className="text-xs bg-olive-50 text-olive-700 px-2 py-1 rounded-full">
                          {ingredient}
                        </span>
                      ))}
                      {product.ingredients.length > 2 && (
                        <span className="text-xs text-gray-500">+{product.ingredients.length - 2} more</span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-gradient-to-r from-olive-600 to-rice-600 text-white py-3 rounded-xl font-medium hover:from-olive-700 hover:to-rice-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: Math.max(1, products.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-olive-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProductShowcase;
