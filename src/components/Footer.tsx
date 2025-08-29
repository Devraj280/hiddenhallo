import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
 
const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cream to-warm-gold rounded-full flex items-center justify-center">
                <span className="text-deep-teal font-bold text-sm">HH</span>
              </div>
              <span className="text-2xl font-bold">HiddenHallo</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Discover the beauty of oxidized jewelry with our carefully curated collection of rings, bracelets, sets, and more.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/hiddenhallo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-warm-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/919173312623" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-warm-gold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-warm-gold transition-colors">
                About Us
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-warm-gold transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-warm-gold transition-colors">
                Contact Us
              </Link>
              <Link to="/products" className="block text-gray-300 hover:text-warm-gold transition-colors">
                Products
              </Link>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Policies</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-300 hover:text-warm-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-300 hover:text-warm-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/ShippingPolicyPage" className="block text-gray-300 hover:text-warm-gold transition-colors">
                Shipping Policy
              </Link>
              <Link to="/CancellationRefundPage" className="block text-gray-300 hover:text-warm-gold transition-colors">
                Cancellation & Refund
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-warm-gold" />
                <a 
                  href="mailto:hiddenhalloinfo@gmail.com" 
                  className="text-gray-300 hover:text-warm-gold transition-colors"
                >
                  hiddenhalloinfo@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-warm-gold" />
                <a 
                  href="https://wa.me/919173312623" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-warm-gold transition-colors"
                >
                  +91 9173312623
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-warm-gold" />
                <span className="text-gray-300">Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 HiddenHallo - Premium Oxidized Jewelry. Made with ❤️ in Ahmedabad.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-warm-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-warm-gold text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;