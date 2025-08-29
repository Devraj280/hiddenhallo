import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Plus, Minus, ZoomIn } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackViewItem } from '@/components/GoogleAnalytics';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id || '');
  const { dispatch } = useCart();
  const { state: wishlistState, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Check if item is already in wishlist
  const isInWishlist = wishlistState.items.some(item => item.id === product?.id);

  // Track product view
  React.useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-teal mx-auto mb-4"></div>
          <p className="text-deep-teal">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-teal mb-4">Product Not Found</h1>
          <Link
            to="/products"
            className="inline-flex items-center text-deep-teal hover:text-warm-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setIsAddingToCart(true);

    try {
      // Add to local cart
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          size: selectedSize || undefined,
          category: product.category
        }
      });

      // Add to Supabase cart if user is logged in
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: product.id,
            quantity,
            size: selectedSize || null
          }, {
            onConflict: 'user_id,product_id,size'
          });

        if (error) {
          console.error('Error adding to cart:', error);
        }
      }

      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;

    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      original_price: product.original_price,
      rating: product.rating,
      reviews_count: product.reviews_count
    };

    if (isInWishlist) {
      await removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      await addToWishlist(wishlistItem);
    }
  };

  // Get all available images for the gallery
  const getAllImages = () => {
    const images = [];
    
    // Add main image first
    if (product.image) {
      images.push(product.image);
    }
    
    // Add additional individual images
    if (product.image1 && product.image1 !== product.image) {
      images.push(product.image1);
    }
    if (product.image2 && product.image2 !== product.image) {
      images.push(product.image2);
    }
    if (product.image3 && product.image3 !== product.image) {
      images.push(product.image3);
    }
    if (product.image4 && product.image4 !== product.image) {
      images.push(product.image4);
    }
    if (product.image5 && product.image5 !== product.image) {
      images.push(product.image5);
    }
    
    // Add images from the images array if available
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img && !images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    return images.filter((img, index, self) => img && self.indexOf(img) === index);
  };

  const productImages = product ? getAllImages() : [];
  const currentImage = productImages[selectedImageIndex] || product?.image;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-deep-teal hover:text-warm-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images - Mobile Optimized */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-lg group">
              <div
                className="relative w-full h-full cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={currentImage}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  }}
                />
                <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5" />
                </div>
                
                {/* Image Counter */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {productImages.length}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Thumbnail Gallery - Below Main Image */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-deep-teal ring-offset-2 scale-105' 
                        : 'hover:ring-2 hover:ring-warm-gold hover:ring-offset-1'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay for non-selected images */}
                    {selectedImageIndex !== index && (
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-200" />
                    )}
                    
                    {/* Active indicator */}
                    {selectedImageIndex === index && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-deep-teal rounded-full border border-white shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Thumbnail Gallery - Side Layout */}
            {productImages.length > 1 && (
              <div className="hidden lg:flex gap-4">
                <div className="flex flex-col gap-3 w-20">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden bg-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                        selectedImageIndex === index 
                          ? 'ring-3 ring-deep-teal ring-offset-2 scale-105' 
                          : 'hover:ring-2 hover:ring-warm-gold hover:ring-offset-1'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay for non-selected images */}
                      {selectedImageIndex !== index && (
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-200" />
                      )}
                      
                      {/* Active indicator */}
                      {selectedImageIndex === index && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-deep-teal rounded-full border border-white shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center text-sm text-oxidized-silver">
              {productImages.length > 1 ? 'Tap thumbnails to view • ' : ''}Touch image to zoom
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-warm-gold/10 border border-warm-gold/20 rounded-full text-xs text-deep-teal font-medium mb-4">
                {product.category}
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-teal mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-warm-gold fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-oxidized-silver ml-2 text-sm sm:text-base">
                  {product.rating} ({product.reviews_count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl sm:text-3xl font-bold text-deep-teal">₹{product.price.toLocaleString()}</span>
              {product.original_price && (
                <>
                  <span className="text-lg sm:text-xl text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
                  <span className="bg-warm-gold text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-oxidized-silver leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-deep-teal mb-3">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-warm-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-oxidized-silver text-sm sm:text-base">Handcrafted with traditional techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-warm-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-oxidized-silver text-sm sm:text-base">Premium oxidized finish</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-warm-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-oxidized-silver text-sm sm:text-base">Hypoallergenic materials</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-warm-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-oxidized-silver text-sm sm:text-base">Unique artisan design</span>
                </li>
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-deep-teal mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 sm:px-4 sm:py-2 border-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        selectedSize === size
                          ? 'border-deep-teal bg-deep-teal text-white shadow-lg'
                          : 'border-gray-300 text-oxidized-silver hover:border-deep-teal hover:shadow-md'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-deep-teal mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(quantity - 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:border-deep-teal transition-all duration-200"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => updateQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:border-deep-teal transition-all duration-200"
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className="w-full bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </button>

              <button 
                onClick={handleWishlistToggle}
                className={`w-full border-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-sm sm:text-base ${
                  isInWishlist 
                    ? 'border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600' 
                    : 'border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-warm-gold/10 to-warm-gold/5 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-warm-gold" />
                </div>
                <p className="text-sm font-medium text-deep-teal">Free Shipping</p>
                <p className="text-xs text-oxidized-silver">Orders above ₹2000</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;