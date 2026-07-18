'use client';

import React from 'react';
import { FaLeaf, FaSeedling, FaHandsHelping, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary/15 px-3.5 py-1 rounded-full">Our Story</span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-4">Nurturing Nature Indoors</h1>
        <p className="text-gray-500 mt-4 leading-relaxed">
          Verdeloom was founded with a singular mission: to bring the health, tranquility, and aesthetic power of real organic plant life into homes and workspaces everywhere.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-cream border border-gray-100">
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=60"
            alt="Beautiful green nursery room"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Rooted in Organic Excellence</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our journey began in a small local glass greenhouse where we propagated organic heirloom tomato seeds and raised hardy houseplants. Today, Verdeloom has grown into a community platform uniting growers, designers, and botanists.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            We partner exclusively with sustainable growers who practice biological farming, ensuring that every plant, seed, and fertilizer container we deliver contributes positively to the global ecosystem.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <FaAward className="text-primary text-xl" />
              <span className="text-sm font-semibold text-gray-700">Certified Organic</span>
            </div>
            <div className="flex items-center gap-3">
              <FaSeedling className="text-primary text-xl" />
              <span className="text-sm font-semibold text-gray-700">Non-GMO Seeds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-cream/40 rounded-3xl p-12 mb-20 border border-cream-dark/30">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-800">Our Core Pillars</h2>
          <p className="text-xs text-gray-500 mt-2">The guidelines behind everything we create and package at Verdeloom.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
            <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mx-auto mb-4">
              <FaLeaf className="text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Ecological Stewardship</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We pack in compostable and recyclable cartons, minimizing ocean plastic waste.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
            <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mx-auto mb-4">
              <FaHandsHelping className="text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Botanical Education</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We empower growers with custom AI advice, turning absolute beginners into expert gardeners.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
            <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mx-auto mb-4">
              <FaSeedling className="text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Generative Quality</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every leaf, branch, and root system is thoroughly checked prior to shipping to guarantee health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
