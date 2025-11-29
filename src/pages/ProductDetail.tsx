import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Star, Heart, Truck, Shield, RotateCcw, Minus, Plus, ChevronDown, ChevronUp, Check, Package, Clock } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-stone-200">
      <button
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors uppercase tracking-wider">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-stone-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-stone-400" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100 mb-6" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-sm text-stone-600 leading-relaxed font-light">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const productData = await productService.getProductById(id);
        
        // Ensure multiple images for gallery view (User request)
        if (productData && productData.images.length === 1) {
           productData.images = [
             productData.images[0],
             productData.images[0],
             productData.images[0]
           ];
        }

        setProduct(productData);
        
        const allProducts = await productService.getProducts();
        const related = allProducts
          .filter(p => p.id !== id && p.category === productData?.category)
          .slice(0, 4);
        setRelatedProducts(related.length > 0 ? related : allProducts.slice(0, 4));
        
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: parseInt(product.id),
        name: product.name,
        subtitle: product.shortDescription || '',
        price: product.price,
        type: product.category,
        color: 'default',
        description: product.description,
        image: product.images[0]
      });
    }
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

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-playfair text-stone-900 mb-4">Product Not Found</h1>
            <Link to="/products" className="text-stone-600 hover:text-stone-900 underline underline-offset-4">
              Return to Collection
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-stone-900 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-stone-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Images */}
            <div className="lg:col-span-7">
              <div className="sticky top-24 flex flex-col lg:flex-row gap-6">
                {/* Thumbnails (Desktop: Vertical Left) */}
                {product.images.length > 1 && (
                  <div className="hidden lg:flex flex-col gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "w-20 h-20 bg-[#F9F9F9] overflow-hidden transition-all duration-300 border border-transparent",
                          selectedImage === index 
                            ? "border-stone-900 opacity-100" 
                            : "opacity-60 hover:opacity-100"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="flex-1 aspect-[4/5] bg-[#F9F9F9] relative group overflow-hidden">
                  <img
                    src={product.images[selectedImage] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.featured && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-stone-900 text-[10px] uppercase tracking-widest px-3 py-1">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Mobile Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex lg:hidden gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "w-20 h-20 flex-shrink-0 bg-[#F9F9F9] overflow-hidden transition-all duration-300 border border-transparent",
                          selectedImage === index 
                            ? "border-stone-900 opacity-100" 
                            : "opacity-60 hover:opacity-100"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Info */}
            <div className="lg:col-span-5 flex flex-col pt-2">
              <div className="mb-6">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700 uppercase mb-3 block">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair text-stone-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-stone-500 font-light tracking-wide">
                  {product.shortDescription}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-2xl text-stone-900">€{product.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="flex items-center border border-stone-200 h-12 w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors hover:bg-stone-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors hover:bg-stone-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 h-12 bg-[#D4C4B0] text-stone-800 hover:bg-[#C5B5A0] border border-[#C5B5A0] rounded-none text-xs uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>

                <button
                  onClick={handleWishlistToggle}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Heart
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isInWishlist(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-stone-400"
                    )}
                  />
                  <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Trust Badges - Horizontal Row */}
              <div className="flex flex-wrap gap-6 mb-10 border-t border-b border-stone-100 py-6">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-stone-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-stone-900">Free Delivery</span>
                    <span className="text-[10px] text-stone-500">From €50</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-stone-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-stone-900">Delivery Time</span>
                    <span className="text-[10px] text-stone-500">1-3 Working Days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-stone-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-stone-900">Free Returns</span>
                    <span className="text-[10px] text-stone-500">Within 30 Days</span>
                  </div>
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-stone-200">
                <AccordionItem
                  title="Description"
                  isOpen={openAccordion === 'description'}
                  onClick={() => toggleAccordion('description')}
                >
                  <p className="mb-4">{product.description}</p>
                  {product.benefits && (
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionItem>

                <AccordionItem
                  title="Ingredients"
                  isOpen={openAccordion === 'ingredients'}
                  onClick={() => toggleAccordion('ingredients')}
                >
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients?.map((ing, i) => (
                      <span key={i} className="text-stone-600">{ing}{i < (product.ingredients?.length || 0) - 1 ? ',' : ''}</span>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem
                  title="How to Use"
                  isOpen={openAccordion === 'usage'}
                  onClick={() => toggleAccordion('usage')}
                >
                  <p>{product.howToUse}</p>
                </AccordionItem>

                <AccordionItem
                  title="Shipping & Returns"
                  isOpen={openAccordion === 'shipping'}
                  onClick={() => toggleAccordion('shipping')}
                >
                  <p className="mb-2">We offer free standard shipping on all orders over €50. Orders are typically processed within 1-2 business days.</p>
                  <p>If you are not completely satisfied with your purchase, you may return it within 30 days for a full refund.</p>
                </AccordionItem>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 border-t border-stone-100 pt-16">
              <h2 className="text-2xl font-playfair text-stone-900 mb-10 text-center">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
