import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-deep-teal to-deep-teal/90 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-teal to-deep-teal/90 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have questions about our handcrafted jewelry, 
            need help with your order, or want to learn more about our artisan techniques.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Visit Store */}
            <div className="text-center group bg-gradient-to-br from-cream/50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-deep-teal/20 to-deep-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-deep-teal" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Visit Our Store</h3>
              <p className="text-oxidized-silver text-sm leading-relaxed">
                14, Ratna Jyot Complex<br />
                Near Green City, Ahmedabad<br />
                Gujarat, India - 382481
              </p>
            </div>

            {/* Call Us */}
            <div className="text-center group bg-gradient-to-br from-cream/50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Call Us</h3>
              <p className="text-oxidized-silver text-sm leading-relaxed">
                +91 98765 43210<br />
                Mon-Sat: 10AM-7PM<br />
                Sunday: Closed
              </p>
            </div>

            {/* Email Us */}
            <div className="text-center group bg-gradient-to-br from-cream/50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-deep-teal/20 to-deep-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-deep-teal" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Email Us</h3>
              <p className="text-oxidized-silver text-sm leading-relaxed">
                hello@hiddenhallo.com<br />
                support@hiddenhallo.com<br />
                Quick Response 24/7
              </p>
            </div>

            {/* Live Chat */}
            <div className="text-center group bg-gradient-to-br from-cream/50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold text-deep-teal mb-2">Live Chat</h3>
              <p className="text-oxidized-silver text-sm leading-relaxed">
                Chat with our experts<br />
                Instant answers<br />
                Available 9AM-6PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Hours & Map Section */}
      <section className="py-16 bg-gradient-to-b from-cream/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Store Hours */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-deep-teal/20 to-deep-teal/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-deep-teal" />
                </div>
                <h3 className="text-2xl font-semibold text-deep-teal">Store Hours</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-deep-teal">Monday - Friday</span>
                  <span className="text-oxidized-silver">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-deep-teal">Saturday</span>
                  <span className="text-oxidized-silver">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-deep-teal">Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-warm-gold/10 to-warm-gold/5 rounded-lg">
                <h4 className="font-semibold text-deep-teal mb-2">Special Hours</h4>
                <p className="text-sm text-oxidized-silver">
                  During festival seasons, we may have extended hours. 
                  Please call ahead to confirm our availability.
                </p>
              </div>
            </div>

            {/* Map Placeholder & Directions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-deep-teal mb-6">Find Us</h3>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-cream to-cream/50 rounded-lg h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-deep-teal mx-auto mb-4" />
                  <p className="text-deep-teal font-semibold">14, Ratna Jyot Complex, Near Green City, Ahmedabad - 382481</p>
                  <p className="text-oxidized-silver text-sm"> </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-deep-teal mb-2">By Car</h4>
                  <p className="text-sm text-oxidized-silver">
                    Free parking available in front of the store. 
                    Easily accessible from major highways.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-deep-teal mb-2">By Public Transport</h4>
                  <p className="text-sm text-oxidized-silver">
                    Bus Stop: Jewelry Market (2 min walk)<br />
                    Metro Station: Central Plaza (5 min walk)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-teal mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
              Find quick answers to common questions about our jewelry and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cream/30 to-white rounded-lg p-6">
                <h4 className="font-semibold text-deep-teal mb-2">What is oxidized jewelry?</h4>
                <p className="text-oxidized-silver text-sm">
                  Oxidized jewelry is silver that has been treated to create a darkened, antique finish. 
                  This gives each piece a unique, vintage look that's both elegant and contemporary.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cream/30 to-white rounded-lg p-6">
                <h4 className="font-semibold text-deep-teal mb-2">How do I care for my jewelry?</h4>
                <p className="text-oxidized-silver text-sm">
                  Store in a dry place, clean gently with a soft cloth, and avoid exposure to harsh chemicals. 
                  We provide detailed care instructions with every purchase.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cream/30 to-white rounded-lg p-6">
                <h4 className="font-semibold text-deep-teal mb-2">Do you offer custom designs?</h4>
                <p className="text-oxidized-silver text-sm">
                  Yes! We love creating custom pieces. Contact us to discuss your vision, 
                  and our artisans will work with you to create something truly special.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cream/30 to-white rounded-lg p-6">
                <h4 className="font-semibold text-deep-teal mb-2">What's your return policy?</h4>
                <p className="text-oxidized-silver text-sm">
                  We offer a 30-day return policy for unworn items in original packaging. 
                  Custom pieces are excluded from returns unless there's a defect.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cream/30 to-white rounded-lg p-6">
                <h4 className="font-semibold text-deep-teal mb-2">Do you ship internationally?</h4>
                <p className="text-oxidized-silver text-sm">
                  Currently, we ship within India. International shipping is coming soon! 
                  Sign up for our newsletter to be notified when it's available.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cream/30 to-white rounded-lg p-6">
                <h4 className="font-semibold text-deep-teal mb-2">How long does delivery take?</h4>
                <p className="text-oxidized-silver text-sm">
                  Standard delivery takes 3-5 business days within India. 
                  Express delivery (1-2 days) is available for select locations.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/faq"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All FAQs
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gradient-to-b from-cream/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-teal mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-oxidized-silver">
              Don't just take our word for it - hear from our happy customers!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warm-gold fill-current" />
                ))}
              </div>
              <p className="text-oxidized-silver italic mb-4">
                "Amazing quality and beautiful designs! The oxidized finish is exactly what I was looking for. 
                Excellent customer service too."
              </p>
              <div>
                <p className="font-semibold text-deep-teal">Priya Sharma</p>
                <p className="text-sm text-oxidized-silver">Mumbai</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warm-gold fill-current" />
                ))}
              </div>
              <p className="text-oxidized-silver italic mb-4">
                "The craftsmanship is outstanding! Each piece tells a story. 
                I've bought multiple items and they're all perfect."
              </p>
              <div>
                <p className="font-semibold text-deep-teal">Rohit Patel</p>
                <p className="text-sm text-oxidized-silver">Ahmedabad</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warm-gold fill-current" />
                ))}
              </div>
              <p className="text-oxidized-silver italic mb-4">
                "Fast delivery, beautiful packaging, and the jewelry exceeded my expectations. 
                Will definitely order again!"
              </p>
              <div>
                <p className="font-semibold text-deep-teal">Anita Joshi</p>
                <p className="text-sm text-oxidized-silver">Pune</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;