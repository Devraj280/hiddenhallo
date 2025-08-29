import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
 
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;

      toast.success('Thank you for contacting us! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-teal mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
            Have questions about our jewelry? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-deep-teal mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-warm-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-teal mb-1">Visit Our Store</h4>
                    <p className="text-oxidized-silver">
                     14, Ratna Jyot Complex<br />
                      Near Green City, Ahmedabad<br />
                      Gujarat, India - 382481
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-warm-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-teal mb-1">Call Us</h4>
                    <p className="text-oxidized-silver">
                      +91 91733 12623<br />
                      Mon-Sat 10AM-7PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-warm-gold/20 to-warm-gold/10 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-warm-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-teal mb-1">Email Us</h4>
                    <p className="text-oxidized-silver">
                      hiddenhalloinfo@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-deep-teal/10 to-warm-gold/10 rounded-xl p-6">
              <h4 className="font-semibold text-deep-teal mb-3">Store Hours</h4>
              <div className="space-y-2 text-oxidized-silver">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-deep-teal mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;