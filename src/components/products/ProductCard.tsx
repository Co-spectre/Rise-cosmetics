import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import LazyImage from '@/components/LazyImage';

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading = false }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      subtitle: product.shortDescription || '',
      price: product.price,
      type: product.category,
      color: 'default',
      description: product.description,
      image: product.images?.[0] || '/placeholder.svg'
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <div className="group cursor-pointer">
        <div className="relative aspect-[4/5] bg-[#F5F5F5] mb-4 overflow-hidden animate-pulse"></div>
        <div className="space-y-2 text-center">
          <div className="h-6 bg-neutral-100 rounded w-3/4 mx-auto animate-pulse"></div>
          <div className="h-4 bg-neutral-100 rounded w-1/2 mx-auto animate-pulse"></div>
          <div className="h-5 bg-neutral-100 rounded w-1/4 mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  const productImage = product.images?.[0] || '/placeholder.svg';

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group bg-white h-full flex flex-col"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] bg-[#F9F9F9] mb-6 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <LazyImage
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Wishlist Button (Subtle, top right) */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-rose-500 transition-colors z-10"
        >
          <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Badges */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-stone-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
            Sale
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="text-center flex flex-col flex-grow px-2">
        {/* Title */}
        <h3 className="font-playfair text-xl text-stone-900 mb-2 leading-tight group-hover:text-stone-600 transition-colors">
          {product.name}
        </h3>

        {/* Subtitle / Category */}
        <p className="text-sm text-stone-500 font-light mb-4">
          {product.category} product, 50ml
        </p>

        {/* Price Section */}
        <div className="mt-auto space-y-1 mb-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-normal text-stone-900">
              €{product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-holistic-200 text-holistic-900 uppercase text-xs tracking-[0.15em] py-3.5 hover:bg-holistic-300 transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;