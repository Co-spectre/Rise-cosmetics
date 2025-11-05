import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransfor              <div className="max-w-xl">
                {/* Product Title & Category */}
                <ParallaxWrapper speed={0.2} direction="vertical">
                  <div className="mb-8">
                    <div className="text-xs tracking-widest text-stone-500 uppercase mb-4">
                      {product.category}
                    </div>
                    <h1 className="text-4xl font-light text-stone-900 tracking-wide mb-4">
                      {product.name}
                    </h1>
                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                </ParallaxWrapper>

                {/* Price */}
                <ParallaxWrapper speed={0.3} direction="vertical">
                  <div className="mb-12">
                    <div className="text-2xl text-stone-900 font-light tracking-wide">
                      €{product.price.toFixed(2)}
                    </div>
                  </div>
                </ParallaxWrapper>ion';
import { ParallaxWrapper } from '@/components/ParallaxWrapper';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/optimizedProductService';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Minus, Heart } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const MinimalistProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState('details');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      subtitle: product.shortDescription || '',
      price: product.price,
      type: product.category,
      color: 'default',
      description: product.description,
      image: product.images[0],
      quantity
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-rice-50">
        <Header />
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-stone-200 rounded w-48"></div>
            <div className="h-4 bg-stone-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rice-50">
      <Header />
      
      <main className="pt-24 pb-24">
        {/* Back Navigation */}
        <div className="fixed top-20 left-0 right-0 z-20 bg-rice-50/80 backdrop-blur-sm">
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <Link 
              to="/products" 
              className="inline-flex items-center text-stone-500 hover:text-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm tracking-wide">Back to Products</span>
            </Link>
          </div>
        </div>

        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Images */}
            <div className="relative">
              <div className="sticky top-36 h-[calc(100vh-144px)]">
                {/* Main Image */}
                <div className="h-full flex items-center justify-center p-6">
                  <ParallaxWrapper
                    speed={0.3}
                    mouseInfluence={0.05}
                    rotate
                    scale
                    baseScale={1}
                    scaleRange={0.1}
                    rotateSensitivity={10}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="max-h-full w-auto object-contain"
                    />
                  </ParallaxWrapper>
                </div>

                {/* Thumbnail Navigation */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            selectedImage === index 
                              ? 'bg-stone-900 scale-150' 
                              : 'bg-stone-300 hover:bg-stone-400'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Product Information */}
            <div className="p-6 lg:p-12 xl:p-20">
              <div className="max-w-xl space-y-12">
                <ParallaxWrapper speed={0.2} direction="vertical">
                {/* Product Title & Category */}
                <div className="mb-8">
                  <div className="text-xs tracking-widest text-stone-500 uppercase mb-4">
                    {product.category}
                  </div>
                  <h1 className="text-4xl font-light text-stone-900 tracking-wide mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-12">
                  <div className="text-2xl text-stone-900 font-light tracking-wide">
                    €{product.price.toFixed(2)}
                  </div>
                </div>

                {/* Product Actions */}
                <div className="space-y-6 mb-16">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4 text-stone-600" />
                    </button>
                    <span className="text-lg text-stone-900 font-light w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-stone-600" />
                    </button>
                  </div>

                  {/* Add to Cart & Wishlist */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-sm tracking-wide"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleWishlistToggle}
                      variant="outline"
                      className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-stone-200 hover:bg-stone-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isInWishlist(product.id)
                            ? 'text-rose-500 fill-rose-500'
                            : 'text-stone-600'
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Product Information Tabs */}
                <div className="space-y-12">
                  {/* Tab Navigation */}
                  <div className="flex gap-8 border-b border-stone-200">
                    {['details', 'ingredients', 'how to use'].map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`pb-4 text-sm tracking-wide capitalize transition-colors ${
                          activeSection === section
                            ? 'text-stone-900 border-b-2 border-stone-900'
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="font-light space-y-6">
                    {activeSection === 'details' && (
                      <div className="space-y-6">
                        <p className="text-stone-600 leading-relaxed">
                          {product.description}
                        </p>
                        {product.benefits && (
                          <ul className="space-y-3">
                            {product.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-3 text-stone-600">
                                <span className="text-stone-400">·</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {activeSection === 'ingredients' && product.ingredients && (
                      <div className="space-y-6">
                        <p className="text-stone-600 leading-relaxed">
                          Our products are formulated with carefully selected natural ingredients:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.ingredients.map((ingredient, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-white text-stone-600 text-sm border border-stone-200 rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'how to use' && product.howToUse && (
                      <div className="space-y-6">
                        <p className="text-stone-600 leading-relaxed">
                          {product.howToUse}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Morning Routine */}
                          <div className="p-6 bg-white border border-stone-200 rounded-2xl">
                            <h4 className="text-stone-900 font-medium mb-4">Morning</h4>
                            <ul className="space-y-3 text-sm text-stone-600">
                              <li className="flex items-start gap-3">
                                <span className="text-stone-400">01</span>
                                <span>Cleanse with lukewarm water</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-stone-400">02</span>
                                <span>Apply 2-3 drops to damp skin</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-stone-400">03</span>
                                <span>Gently massage in upward motions</span>
                              </li>
                            </ul>
                          </div>

                          {/* Evening Routine */}
                          <div className="p-6 bg-white border border-stone-200 rounded-2xl">
                            <h4 className="text-stone-900 font-medium mb-4">Evening</h4>
                            <ul className="space-y-3 text-sm text-stone-600">
                              <li className="flex items-start gap-3">
                                <span className="text-stone-400">01</span>
                                <span>Remove makeup thoroughly</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-stone-400">02</span>
                                <span>Apply to face and neck</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-stone-400">03</span>
                                <span>Allow to absorb overnight</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MinimalistProductDetail;