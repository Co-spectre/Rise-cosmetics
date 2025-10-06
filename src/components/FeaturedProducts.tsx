import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "RISE Radiance Serum",
      price: 89,
      originalPrice: 120,
      image: "/images/products/IMG-20250808-WA0006.jpg",
      badge: "BESTSELLER",
      rating: 4.9,
      reviews: 1247
    },
    {
      id: 2,
      name: "RISE Soul Night Cream", 
      price: 125,
      image: "/images/products/IMG-20250808-WA0007.jpg",
      badge: "NEW",
      rating: 4.8,
      reviews: 892
    },
    {
      id: 3,
      name: "RISE Eye Complex",
      price: 75,
      image: "/images/products/IMG-20250808-WA0008.jpg",
      rating: 4.7,
      reviews: 654
    },
    {
      id: 4,
      name: "RISE Glow Oil Elixir",
      price: 150,
      image: "/images/products/IMG-20250808-WA0010.jpg",
      badge: "LUXURY",
      rating: 4.8,
      reviews: 423
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-rice-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-olive-900 mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our signature collection of luxury skincare essentials
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                    product.badge === 'BESTSELLER' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' :
                    product.badge === 'NEW' ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' :
                    product.badge === 'LUXURY' ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Heart Icon */}
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:bg-olive-50 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-olive-600" />
                    <span className="text-olive-600 font-medium">Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-olive-600 transition-colors">
                  {product.name}
                </h3>

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
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-olive-600 to-rice-600 text-white py-3 rounded-xl font-medium hover:from-olive-700 hover:to-rice-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white transition-all duration-500 tracking-wide transform hover:scale-105 relative overflow-hidden rounded-xl">
            <span className="relative z-10 font-medium text-base">View All Products</span>
            <div className="absolute inset-0 bg-olive-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
