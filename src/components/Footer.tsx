'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaGithub, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thank you for subscribing to Verdeloom updates!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-[#1c2e1d] to-[#0c180d] text-gray-300 border-t border-secondary/20 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <FaLeaf className="text-accent text-2xl" />
              <span className="tracking-wide">Verdeloom</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Empowering gardening enthusiasts worldwide with premium organic plants, seeds, gardening gear, and advanced AI-driven crop guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><FaGithub size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-accent transition-colors">Explore Products</Link></li>
              <li><Link href="/ai-care" className="hover:text-accent transition-colors">AI Care Guide</Link></li>
              <li><Link href="/ai-recommendation" className="hover:text-accent transition-colors">AI Plant Finder</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Support</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">Join Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Subscribe to get seasonal care tips, special discounts, and product announcements.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-primary text-white hover:bg-secondary p-2.5 rounded-full transition-colors shrink-0 flex items-center justify-center"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Verdeloom Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>Powered by Next.js & Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
