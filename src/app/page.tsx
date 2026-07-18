'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLeaf, FaSeedling, FaToolbox, FaChevronRight, FaStar, FaAward, FaTruck, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useApp, Product } from '@/context/AppContext';

const CATEGORIES = [
  { name: 'Live Plants', icon: FaLeaf, count: '120+ Varieties', color: 'from-green-500/10 to-emerald-500/10' },
  { name: 'Seeds', icon: FaSeedling, count: '80+ Heirloom Seeds', color: 'from-amber-500/10 to-orange-500/10' },
  { name: 'Pots', icon: FaToolbox, count: '40+ Designs', color: 'from-amber-600/10 to-yellow-600/10' },
  { name: 'Fertilizers', icon: FaLeaf, count: '15+ Organic Mixes', color: 'from-teal-500/10 to-cyan-500/10' },
  { name: 'Gardening Tools', icon: FaToolbox, count: '50+ High-end tools', color: 'from-blue-500/10 to-indigo-500/10' }
];

const TESTIMONIALS = [
  {
    name: 'Emily Watson',
    role: 'Home Gardener',
    comment: 'The plant recommendations I received through their AI tool were spot on! My Monstera is absolutely thriving now.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
  },
  {
    name: 'Robert Davis',
    role: 'Urban Botanist',
    comment: 'Verdeloom has the best selection of organic fertilizers and heirloom seeds. The tools feel heavy-duty and premium.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
  },
  {
    name: 'Sophia Martinez',
    role: 'Indoor Plant Collector',
    comment: 'Exceptional shipping speed. Everything arrived in immaculate, healthy condition. Highly recommend the Fiddle Leaf Fig!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
  }
];

const STATISTICS = [
  { value: '15k+', label: 'Happy Growers' },
  { value: '300+', label: 'Plant Species' },
  { value: '99.7%', label: 'Success Rate' },
  { value: '24/7', label: 'AI Support' }
];

export default function Home() {
  const { apiBaseUrl } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/products?limit=8&sortBy=createdAt&sortOrder=desc`);
        if (res.ok) {
          const data = await res.json();
          setFeaturedProducts(data.products || []);
        }
      } catch (e) {
        console.error('Failed to fetch featured products:', e);
      }
    };
    getFeatured();
  }, [apiBaseUrl]);

  return (
    <div className="overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-tr from-[#fdfbf7] via-[#f7fdf7] to-[#eef9ee] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/15 text-primary">
                <FaLeaf className="text-sm" /> The Future of Home Gardening
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Cultivate Your Dream <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Green Haven
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Discover organic live plants, premium seeds, custom pots, and high-performance fertilizers. Unlock personalized crop insights with our advanced AI health assistants.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/explore"
                  className="bg-primary text-white hover:bg-secondary px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/ai-care"
                  className="bg-white hover:bg-cream/20 text-primary border-2 border-primary/20 px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get AI Care Guide
                </Link>
              </div>
            </motion.div>

            {/* Hero Image / Animated elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative w-72 sm:w-96 h-72 sm:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-cream">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=60"
                  alt="Lush interior plants"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
                <div className="p-3 bg-secondary/10 rounded-xl text-primary font-bold">
                  99.8%
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Healthy Delivery</div>
                  <div className="text-xs text-gray-500">Live plant guarantee</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Browse by Category</h2>
            <p className="mt-4 text-gray-500">Discover everything you need to start or expand your personal garden.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/explore?category=${encodeURIComponent(cat.name)}`}
                  className="group relative flex flex-col items-center text-center p-6 bg-gradient-to-b from-[#fdfbf7] to-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${cat.color} text-primary mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors text-sm sm:text-base">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#fdfbf7] to-white border-t border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-500">Your seamless journey from selection to flourishing home garden.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mx-auto">1</div>
              <h3 className="font-bold text-gray-800 text-base">Browse & Choose</h3>
              <p className="text-xs text-gray-500">Select from our certified organic plants, heirloom seeds, and professional-grade tools.</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mx-auto">2</div>
              <h3 className="font-bold text-gray-800 text-base">Order Securely</h3>
              <p className="text-xs text-gray-500">Checkout securely via Better Auth. Your data remains fully protected.</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mx-auto">3</div>
              <h3 className="font-bold text-gray-800 text-base">Nursery Dispatch</h3>
              <p className="text-xs text-gray-500">We carefully package live plants in breathable containers ensuring arrival in peak health.</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mx-auto">4</div>
              <h3 className="font-bold text-gray-800 text-base">AI Assisted Grow</h3>
              <p className="text-xs text-gray-500">Leverage our Gemini AI Care Guides to diagnose health problems and monitor growth cycles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-gradient-to-b from-white to-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-2">Handpicked seasonal favorites recommended by our nursery specialists.</p>
            </div>
            <Link href="/explore" className="text-primary hover:text-secondary font-semibold flex items-center gap-1 group mt-4 sm:mt-0">
              View All Products <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden bg-cream">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.stock === 0 && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-secondary font-medium tracking-wider uppercase">{prod.category}</span>
                    <h3 className="font-bold text-gray-900 mt-1 hover:text-primary transition-colors text-base line-clamp-1">
                      <Link href={`/products/${prod._id}`}>{prod.title}</Link>
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black text-primary">${prod.price.toFixed(2)}</span>
                    <Link
                      href={`/products/${prod._id}`}
                      className="text-xs font-semibold px-4 py-2 bg-cream text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Grow with Verdeloom?</h2>
            <p className="mt-4 text-gray-500">Combining organic growing traditions with modern generative AI assistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#fdfbf7] to-white border border-gray-100 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-6">
                <FaAward className="text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">100% Organic & Healthy</h3>
              <p className="text-sm text-gray-500">
                All seeds and plants are premium non-GMO varieties, nursery raised with zero chemical enhancers.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#fdfbf7] to-white border border-gray-100 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-6">
                <FaLeaf className="text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI-Powered Care Guides</h3>
              <p className="text-sm text-gray-500">
                Instant botanical guidance for plant diseases, seasonal schedules, and custom environment diagnostics.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#fdfbf7] to-white border border-gray-100 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-6">
                <FaTruck className="text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Safe Transit Delivery</h3>
              <p className="text-sm text-gray-500">
                Eco-safe breathable packaging protects leaves and soil moisture, assuring arrival in absolute peak condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEASONAL PICKS & CARE TIPS */}
      <section className="py-20 bg-gradient-to-b from-white to-[#fdfbf7] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Seasonal Plant Care Tips</h2>
            <p className="mt-4 text-gray-500">Expert recommendations for keeping your plants vibrant all year round.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-cream relative">
                <img 
                  src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&auto=format&fit=crop&q=60" 
                  alt="Summer Watering" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Summer Care</span>
                <h3 className="font-bold text-gray-800 text-base">Summer Hydration Guide</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Water early in the morning to decrease evaporation. Double-check soil moisture levels daily for high-drained pots.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-cream relative">
                <img 
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=60" 
                  alt="Autumn Trimming" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Autumn Pruning</span>
                <h3 className="font-bold text-gray-800 text-base">Preparing for Dormancy</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Prune dead or dying leaves in mid-autumn. Reduce fertilizer dosage by half as growth speeds naturally slow down.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-cream relative">
                <img 
                  src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&auto=format&fit=crop&q=60" 
                  alt="Winter Protection" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Winter Shield</span>
                <h3 className="font-bold text-gray-800 text-base">Cold Draft Mitigation</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Keep indoor plants away from window drafts and heating vents. Maintain temperature bounds above 60°F (15°C).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-16 bg-[#1c2e1d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATISTICS.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-white to-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Growers Say</h2>
            <p className="mt-4 text-gray-500">Loved by home plant owners, horticulturists, and organic urban growers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="text-gray-600 text-sm italic leading-relaxed">"{t.comment}"</p>
                </div>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{t.name}</h4>
                    <span className="text-xs text-gray-400">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
