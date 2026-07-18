'use client';

import React from 'react';
import Link from 'next/link';
import { FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Wilted Plant Icon */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <motion.div
            initial={{ rotate: 0, y: 0 }}
            animate={{ rotate: 135, y: 15 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 60 }}
            className="text-accent text-6xl"
          >
            <FaLeaf />
          </motion.div>
          <div className="absolute bottom-1 right-8 w-3 h-3 bg-red-400 rounded-full animate-ping" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">404 - Plant Wilted</h1>
          <p className="text-base font-bold text-secondary">Page Not Found</p>
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
            The garden path you are looking for doesn't exist or has been pruned away. Let's get you back to safety.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Link
            href="/"
            className="bg-primary text-white hover:bg-secondary px-6 py-3 rounded-full text-sm font-bold shadow-md shadow-primary/10 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/explore"
            className="bg-white hover:bg-cream/20 text-primary border-2 border-primary/20 px-6 py-3 rounded-full text-sm font-bold transition-all"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
