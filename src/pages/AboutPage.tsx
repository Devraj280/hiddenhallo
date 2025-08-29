import React from 'react';
import { Award, Users, Heart, Gem } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About HiddenHallo</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Crafting timeless oxidised jewelry pieces that celebrate individuality and artistic expression
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-deep-teal mb-6">About HiddenHallo</h2>
              <div className="space-y-4 text-oxidized-silver leading-relaxed">
                <p>
                  Every sparkle has a story… and at HiddenHallo, we believe yours should shine in the most beautiful way. ✨
                </p>
                <p>
                  The name HiddenHallo was born from a simple thought — every woman carries an unseen halo, a glow that's uniquely hers. Our jewellery is crafted (and carefully chosen) to bring that hidden radiance to light.
                </p>
                <h3 className="text-xl font-semibold text-deep-teal mt-6 mb-3">Our Story</h3>
                <p>
                  It all began with a love for timeless beauty and a fascination for jewellery that blends tradition with trend. Oxidised jewellery caught our eye — the intricate designs, the vintage charm, the way it speaks of heritage yet fits effortlessly into modern style. We decided to curate pieces that celebrate both worlds: from statement oxidised necklaces to chic earrings, graceful bangles to complete jewellery sets.
                </p>
                <p>
                  We started HiddenHallo with one mission: to make elegant, high-quality accessories accessible to everyone — without the luxury price tag.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Jewelry crafting process"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-teal mb-4">Our Mission & Values</h2>
            <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
              These core values guide everything we do, from design to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-warm-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Quality you can trust</h3>
              <p className="text-oxidized-silver">
                Every piece is handpicked for craftsmanship and durability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-warm-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Affordable elegance</h3>
              <p className="text-oxidized-silver">
                Luxury shouldn't be out of reach.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-warm-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Customer happiness first</h3>
              <p className="text-oxidized-silver">
                We're not happy until you are.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-warm-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Designs that stand out</h3>
              <p className="text-oxidized-silver">
                From classic to contemporary, you'll find pieces you won't see everywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-teal mb-4">What Makes Us Different?</h2>
            <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
              We're more than just another jewellery store. At HiddenHallo, you'll find:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-deep-teal mb-2">Lowest Prices</h3>
              <p className="text-oxidized-silver text-sm">
                Without compromising on quality
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-deep-teal mb-2">Exclusive Designs</h3>
              <p className="text-oxidized-silver text-sm">
                You won't find in every market
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-deep-teal mb-2">Fast Shipping</h3>
              <p className="text-oxidized-silver text-sm">
                So your sparkle doesn't have to wait
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-deep-teal mb-2">Curated Mix</h3>
              <p className="text-oxidized-silver text-sm">
                Trendy, traditional, and fusion accessories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-teal mb-4">Our Crafting Process</h2>
            <p className="text-lg text-oxidized-silver max-w-2xl mx-auto">
              From concept to creation, every piece follows our time-tested artisan process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-deep-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Design & Sketch</h3>
              <p className="text-oxidized-silver">
                Every piece begins with a careful design process, sketching unique patterns and forms 
                that will become wearable art, inspired by Indian traditions and modern aesthetics.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-deep-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Handcraft & Shape</h3>
              <p className="text-oxidized-silver">
                Using traditional metalworking techniques, our artisans carefully shape each piece 
                from premium silver and mixed metals in our Ahmedabad workshop.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-deep-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-deep-teal">Oxidize & Polish</h3>
              <p className="text-oxidized-silver">
                The final step involves our signature oxidation process, creating the distinctive 
                dark patina that makes each piece unique and beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Your Halo Awaits */}
      <section className="py-16 bg-deep-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Halo Awaits</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We'd love for you to explore our collection and find the pieces that speak to you. Whether it's for a festival, a wedding, or simply to add a little magic to your everyday, HiddenHallo is here to help you shine brighter than ever.
          </p>
          <p className="text-lg text-warm-gold mb-8 font-medium">
            Because your halo isn't gone… it's just waiting to be discovered. 🌙✨
          </p>
          <div className="space-x-4">
            <a
              href="mailto:HiddenHalloinfo@gmail.com"
              className="inline-block bg-warm-gold hover:bg-warm-gold/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="inline-block border-2 border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
            >
              View FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;