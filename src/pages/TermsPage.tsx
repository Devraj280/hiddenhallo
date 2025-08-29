import React from 'react';
import { FileText, AlertTriangle, Scale, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read these terms carefully before using our services or making a purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Important: No Returns Policy</h3>
                <p className="text-red-700">
                  By making a purchase, you acknowledge and agree that all sales are final. 
                  NO RETURNS, NO EXCHANGES, NO REFUNDS except for defective items.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Acceptance of Terms
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    By accessing and using the HiddenHallo website or making a purchase, you agree to be bound 
                    by these Terms and Conditions. If you do not agree with any part of these terms, 
                    please do not use our website or services.
                  </p>
                </div>
              </div>

              {/* Products and Orders */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Products and Orders</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All jewelry items are handcrafted oxidized pieces with unique characteristics</li>
                    <li>Product images are for illustration purposes; actual items may vary slightly</li>
                    <li>We reserve the right to refuse or cancel orders for any reason</li>
                    <li>Prices are subject to change without prior notice</li>
                    <li>Product availability is subject to stock levels</li>
                  </ul>
                </div>
              </div>

              {/* Returns and Refunds Policy */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-2" />
                  Returns and Refunds Policy
                </h2>
                <div className="space-y-4 text-red-700">
                  <p className="font-semibold text-lg">STRICT NO RETURNS POLICY</p>
                  <div className="space-y-3">
                    <p><strong>ALL SALES ARE FINAL</strong></p>
                    <p>HiddenHallo does not accept returns, exchanges, or provide refunds for any reason including but not limited to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Change of mind</li>
                      <li>Size issues</li>
                      <li>Color variations</li>
                      <li>Design preferences</li>
                      <li>Delayed delivery</li>
                    </ul>
                    
                    <div className="mt-4 p-4 bg-red-100 rounded-lg">
                      <p className="font-semibold">Exceptions (Defective Items Only):</p>
                      <p>We only accept returns for:</p>
                      <ul className="list-disc pl-6 mt-2">
                        <li>Manufacturing defects</li>
                        <li>Items damaged during shipping</li>
                        <li>Incorrect items sent</li>
                      </ul>
                      <p className="mt-2 text-sm">
                        <strong>Claims must be reported within 48 hours of delivery with photo evidence.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Payment Terms</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prices are in Indian Rupees (INR)</li>
                    <li>Payment must be made in full before order processing</li>
                    <li>We accept various payment methods as displayed at checkout</li>
                    <li>You are responsible for any bank or payment gateway charges</li>
                    <li>Failed payments may result in order cancellation</li>
                  </ul>
                </div>
              </div>

              {/* Shipping and Delivery */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Shipping and Delivery</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We currently ship only within India</li>
                    <li>Delivery times are estimates and not guaranteed</li>
                    <li>Risk of loss passes to you upon delivery</li>
                    <li>You are responsible for providing accurate shipping information</li>
                    <li>Additional charges may apply for remote locations</li>
                  </ul>
                </div>
              </div>

              {/* Product Care */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Product Care and Warranty</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Oxidized jewelry requires proper care to maintain appearance</li>
                    <li>Natural oxidation changes over time are normal and expected</li>
                    <li>We provide care instructions with each purchase</li>
                    <li>Damage due to misuse or normal wear is not covered</li>
                    <li>No warranty is provided except for manufacturing defects</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Intellectual Property</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    All content on this website, including images, text, designs, and logos, 
                    is the property of HiddenHallo and protected by intellectual property laws. 
                    Unauthorized use is prohibited.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Limitation of Liability</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    HiddenHallo's liability is limited to the purchase price of the product. 
                    We are not responsible for indirect, consequential, or incidental damages. 
                    Your sole remedy is replacement of defective items (subject to our no returns policy).
                  </p>
                </div>
              </div>

              {/* Privacy */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Privacy</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    Your privacy is important to us. Please review our 
                    <Link to="/privacy" className="text-deep-teal hover:text-warm-gold ml-1">Privacy Policy</Link> 
                    to understand how we collect, use, and protect your information.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Governing Law</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    These terms are governed by the laws of India. Any disputes will be resolved 
                    in the courts of Gujarat, India.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Contact Information</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>For questions about these Terms and Conditions:</p>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <p><strong>Email:</strong> HiddenHalloinfo@gmail.com</p>
                    <p><strong>Address:</strong> Nirnaynagar, Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Changes to Terms</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting. Your continued use of our services constitutes acceptance 
                    of the modified terms.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-oxidized-silver">
                  <strong>Last Updated:</strong> December 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;