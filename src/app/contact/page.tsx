'use client';

import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FAQS = [
  {
    q: 'How do you ship live plants safely?',
    a: 'We use custom designed corrugated boxes with protective inserts. The plant pot is secured to prevent moving, and the soil is wrapped to hold moisture and prevent spilling. Our packaging allows the leaves to breathe during transit.'
  },
  {
    q: 'What is your live plant health guarantee?',
    a: 'We guarantee our plants will arrive healthy and sound. If your plant arrives damaged or displays severe distress, send us a photo within 14 days, and we will issue a replacement or refund immediately.'
  },
  {
    q: 'Can I use the AI Care Guide for any plant?',
    a: 'Absolutely! Our AI Care system handles hundreds of houseplant species and garden crops. Simply input the plant type, the problem details, and the season, and it will return immediate recommendations.'
  },
  {
    q: 'How long does shipping take?',
    a: 'Orders are processed in 1-2 business days. Express shipping takes 2-3 business days, while standard shipping takes 4-7 business days depending on your location.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Your message has been sent! We will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900">Get In Touch</h1>
        <p className="text-gray-500 mt-4 leading-relaxed">
          Have questions about shipping, care advice, or plant orders? Contact our nursery team today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Contact Information & Map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Support Information</h3>
            
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Call Us</h4>
                <p className="text-xs text-gray-500 mt-1">+1 (800) 555-PLNT</p>
                <p className="text-xs text-gray-400">Mon - Fri: 9am - 6pm EST</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Email Support</h4>
                <p className="text-xs text-gray-500 mt-1">support@verdeloom.com</p>
                <p className="text-xs text-gray-400">24/7 Response time</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Verdeloom Nursery</h4>
                <p className="text-xs text-gray-500 mt-1">456 botanical Dr, Suite Green</p>
                <p className="text-xs text-gray-400">Orlando, FL 32801</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 rounded-3xl overflow-hidden shadow-inner border border-gray-100 relative bg-cream flex flex-col justify-center items-center text-center p-6">
            <div className="absolute inset-0 bg-[#e4ded0] opacity-40 pattern-grid" />
            <FaMapMarkerAlt className="text-primary text-4xl mb-3 animate-bounce z-10" />
            <span className="text-sm font-bold text-gray-800 z-10">Orlando Nursery Center</span>
            <span className="text-xs text-gray-500 mt-1 z-10">Map View Placeholder</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Send A Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Product inquiry, bulk order, etc."
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your question or feedback..."
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-primary/10"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t border-gray-100 pt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                >
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{faq.q}</span>
                  <span className="text-primary text-sm shrink-0">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
