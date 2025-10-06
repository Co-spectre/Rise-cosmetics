import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import LazyImage from '@/components/LazyImage';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
  isInWishlist?: boolean;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  onWishlistToggle,
  isInWishlist = false,
  isLoading = false 
}) => {
  const { addToCart } = useCart();

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
    if (onWishlistToggle) {
      onWishlistToggle();
    }
  };

  if (isLoading) {
    return (
      <div className="group cursor-pointer">
        <div className="relative aspect-square bg-neutral-100 rounded-lg mb-4 overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-neutral-200 rounded w-full animate-pulse"></div>
          <div className="h-5 bg-neutral-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  const productImage = product.images?.[0] || '/placeholder.svg';
  const hasRating = product.rating && product.rating > 0;

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group cursor-pointer block transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-neutral-50 rounded-lg mb-4 overflow-hidden border border-neutral-200 group-hover:border-olive-200 transition-colors">
        <LazyImage
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isInWishlist 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 text-neutral-700 hover:bg-rose-50 hover:text-rose-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-olive-600 text-white backdrop-blur-sm hover:bg-olive-700 transition-all duration-300 transform hover:scale-110"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Sale badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 text-xs font-medium rounded-full">
            Sale
          </div>
        )}

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-olive-600 text-white px-2 py-1 text-xs font-medium rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Category */}
        <p className="text-olive-600 text-xs uppercase tracking-wider font-medium">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-medium text-neutral-900 group-hover:text-olive-700 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        {product.shortDescription && (
          <p className="text-neutral-600 text-sm line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Rating */}
        {hasRating && (
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-amber-400 fill-current'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-neutral-500 text-xs">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.compareAtPrice && product.compareAtPrice > product.price ? (
            <>
              <span className="text-lg font-semibold text-rose-600">
                ${product.price}
              </span>
              <span className="text-sm text-neutral-500 line-through">
                ${product.compareAtPrice}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-neutral-900">
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;