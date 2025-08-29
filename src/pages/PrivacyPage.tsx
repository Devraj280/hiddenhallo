import React from 'react';
import { Shield, AlertTriangle, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Important Notice - No Returns Policy</h3>
                <p className="text-red-700">
                  Please note that HiddenHallo operates with a strict NO RETURNS and NO REFUNDS policy. 
                  All sales are final. Please review your order carefully before purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-8">
              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>When you visit HiddenHallo or make a purchase, we collect the following information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
                    <li><strong>Order Information:</strong> Products purchased, order history, payment details (encrypted)</li>
                    <li><strong>Technical Information:</strong> IP address, browser type, device information</li>
                    <li><strong>Communication:</strong> Messages sent through our contact forms or customer service</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">How We Use Your Information</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate about your orders and our services</li>
                    <li>Provide customer support</li>
                    <li>Improve our website and services</li>
                    <li>Send promotional offers (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Information Sharing</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>We only share your information with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Shipping Partners:</strong> To deliver your orders</li>
                    <li><strong>Payment Processors:</strong> To process payments securely</li>
                    <li><strong>Legal Authorities:</strong> When required by law</li>
                  </ul>
                  <p className="mt-4 font-medium">We never sell your personal information to third parties.</p>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Data Security</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>We implement appropriate security measures to protect your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure payment processing</li>
                    <li>Regular security updates and monitoring</li>
                    <li>Limited access to personal information</li>
                  </ul>
                </div>
              </div>

              {/* Returns Policy Emphasis */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4">Returns & Refunds Policy</h2>
                <div className="space-y-4 text-red-700">
                  <p className="font-semibold text-lg">NO RETURNS • NO EXCHANGES • NO REFUNDS</p>
                  <p>
                    All sales at HiddenHallo are final. We do not accept returns, exchanges, or provide refunds 
                    for any reason except in cases of:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Manufacturing defects</li>
                    <li>Damaged items received</li>
                    <li>Incorrect items shipped</li>
                  </ul>
                  <p>
                    Please inspect your order carefully upon receipt. Claims for defective or damaged items 
                    must be reported within 48 hours of delivery.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Your Rights</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>File a complaint with relevant authorities</li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Cookies</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    We use cookies to enhance your browsing experience, analyze website traffic, 
                    and personalize content. You can control cookie settings through your browser.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2" />
                  Contact Us
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>If you have questions about this Privacy Policy or your personal information:</p>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <p><strong>Email:</strong> HiddenHalloinfo@gmail.com</p>
                    <p><strong>Address:</strong> Nirnaynagar, Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-oxidized-silver">
                  <strong>Last Updated:</strong> December 2024
                </p>
                <p className="text-sm text-oxidized-silver mt-2">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;