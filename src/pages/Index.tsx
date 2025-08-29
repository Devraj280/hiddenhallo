import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, Sparkles, ArrowRight, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ContactForm from '../components/ContactForm';
import heroImage1 from '@/assets/hero-carousel-1.jpg';
import heroImage2 from '@/assets/hero-carousel-2.jpg';
import heroImage3 from '@/assets/hero-carousel-3.jpg';

const heroSlides = [
  { 
    image: heroImage1,
    title: "Discover the Beauty of",
    subtitle: "Oxidized Art",
    description: "Each piece tells a story of traditional craftsmanship meets modern elegance.",
    cta: "Shop Collection"
  },
  {
    image: heroImage2,
    title: "Handcrafted with Love",
    subtitle: "in Ahmedabad",
    description: "Premium oxidized jewelry created by skilled artisans using time-honored techniques.",
    cta: "Explore Craftsmanship"
  },
  {
    image: heroImage3,
    title: "Traditional Meets",
    subtitle: "Modern Design",
    description: "Where ancient artistry meets contemporary style in every unique piece.",
    cta: "View Collections"
  }
];

const Index = () => {
  const { data: products, isLoading, error } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Desktop/Laptop */}
      <section className="relative h-[60vh] lg:h-[65vh] overflow-hidden hidden md:block">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.image} 
                  alt={`${slide.title} ${slide.subtitle}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="text-center max-w-4xl mx-auto">
                    <div className="space-y-4 md:space-y-6 text-white">
                      <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-warm-gold/20 to-warm-gold/10 backdrop-blur-sm border border-warm-gold/30 rounded-full text-white font-medium text-sm">
                        <Sparkles className="w-4 h-4 mr-2 text-warm-gold" />
                        Handcrafted Oxidized Jewelry
                      </div>
                      
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.title}
                        <span className="block bg-gradient-to-r from-warm-gold via-cream to-warm-gold bg-clip-text text-transparent mt-2">
                          {slide.subtitle}
                        </span>
                      </h1>
                      
                      <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                        {slide.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link
                          to="/products"
                          className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-warm-gold to-warm-gold/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          {slide.cta}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link
                          to="/about"
                          className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                        >
                          Our Story
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mobile Hero Section */}
      <section className="md:hidden bg-gradient-to-br from-deep-teal via-deep-teal/90 to-warm-gold/20 py-16 px-4">
        <div className="text-center text-white space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium text-sm">
            <Sparkles className="w-4 h-4 mr-2 text-warm-gold" />
            Handcrafted Jewelry
          </div>
          
          <h1 className="text-3xl font-bold leading-tight">
            Discover the Beauty of
            <span className="block bg-gradient-to-r from-warm-gold via-cream to-warm-gold bg-clip-text text-transparent mt-2">
              Oxidized Art
            </span>
          </h1>
          
          <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
            Traditional craftsmanship meets modern elegance in every piece
          </p>
          
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center px-6 py-3 bg-warm-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Nationwide Delivery</h3>
              <p className="text-oxidized-silver">Fast and secure delivery across all states in India</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Authentic Materials</h3>
              <p className="text-oxidized-silver">Premium silver and metals with certified quality</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Artisan Crafted</h3>
              <p className="text-oxidized-silver">Traditional techniques passed down through generations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-cream/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-teal mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
              Discover our most loved pieces, each crafted with passion and attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {product.original_price && (
                    <div className="absolute top-4 left-4 bg-warm-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ₹{product.original_price - product.price}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-deep-teal mb-2 group-hover:text-warm-gold transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-warm-gold fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-oxidized-silver ml-2">
                      ({product.reviews_count} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-deep-teal">₹{product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.original_price}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white text-center py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all duration-300">
                    Add to Cart
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-warm-gold to-warm-gold/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-teal mb-6">
                Crafted with Love in Ahmedabad
              </h2>
              <p className="text-lg text-oxidized-silver leading-relaxed mb-6">
                HiddenHallo was born from a passion for creating unique, oxidized jewelry that tells a story. 
                Our journey began in 2018 when our founder discovered the ancient art of metal oxidation 
                and fell in love with its ability to transform ordinary silver into extraordinary pieces.
              </p>
              <p className="text-lg text-oxidized-silver leading-relaxed mb-8">
                Each piece in our collection is carefully handcrafted using traditional techniques 
                combined with contemporary design aesthetics, making every item truly one-of-a-kind.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border-2 border-deep-teal text-deep-teal font-semibold rounded-lg hover:bg-deep-teal hover:text-white transition-all duration-300"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Jewelry crafting process"
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
};

export default Index;