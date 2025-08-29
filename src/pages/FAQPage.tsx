import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'We offer free standard shipping on orders over ₹2000, which typically takes 5-7 business days within India. Express shipping (2-3 business days) is available for ₹399. Orders are processed within 1-2 business days.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within India. We are working on expanding our shipping to international locations. Please stay tuned for updates on international shipping availability.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! Once your order ships, you\'ll receive tracking information via normal message (SMS). You can use this to monitor your package\'s progress throughout delivery.'
        }
      ]
    },
    {
      category: 'Products & Care',
      questions: [
        {
          question: 'What is oxidized jewelry?',
          answer: 'Oxidised jewellery features a darkened, antiqued finish created through a controlled oxidation process. This gives the metal a unique, vintage appearance with varying tones from light gray to deep black.'
        },
        {
          question: 'How do I care for my oxidised jewellery?',
          answer: 'To maintain your oxidised jewellery: avoid harsh chemicals, store in a dry place, clean gently with a soft cloth, and avoid exposure to lotions, perfumes, and water when possible. The oxidation may naturally lighten with wear, which is normal.'
        },
        {
          question: 'What materials do you use?',
          answer: 'We primarily use sterling silver (.925) for our oxidized pieces, along with carefully selected mixed metals. All materials are hypoallergenic and nickel-free to ensure comfort for sensitive skin.'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We do not accept returns or exchanges. All sales are final. Please review your order carefully before purchase. We only accept returns if the item is defective or damaged upon arrival.'
        },
        {
          question: 'Can I exchange my jewelry?',
          answer: 'No, we do not offer exchanges. All sales are final. Please ensure you select the correct size and design before placing your order.'
        }
      ]
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-deep-teal mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
            Find answers to common questions about our oxidised jewellery, orders, and policies.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* FAQ Content */}
        {filteredFAQ.length > 0 ? (
          <div className="space-y-8">
            {filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-deep-teal">{category.category}</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    const isExpanded = expandedItems.includes(globalIndex);
                    
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => toggleExpanded(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                        >
                          <span className="font-medium text-deep-teal pr-4">{item.question}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-6 pb-4">
                            <p className="text-oxidized-silver leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-oxidized-silver text-lg mb-4">No FAQs found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-warm-gold hover:text-warm-gold/80 font-medium"
            >
              Clear search and view all FAQs
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-warm-gold/10 rounded-lg p-8 text-center">
          <MessageCircle className="w-12 h-12 text-warm-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-deep-teal mb-2">Still have questions?</h3>
          <p className="text-oxidized-silver mb-6">
            Can't find the answer you're looking for? Our friendly customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:HiddenHalloinfo@gmail.com"
              className="inline-block bg-warm-gold hover:bg-warm-gold/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Email Support
            </a>
            <a
              href="tel:+91973794xxxx"
              className="inline-block border-2 border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;