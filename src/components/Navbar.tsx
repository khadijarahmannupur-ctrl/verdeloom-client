'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FaLeaf, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      await authClient.signOut();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Logout failed');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'AI Care', href: '/ai-care' },
    { name: 'AI Recommendation', href: '/ai-recommendation' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaLeaf className="text-2xl text-primary" />
            </motion.div>
            <span className="tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Verdeloom
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-primary font-semibold'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/manage-products"
                  className="px-3 py-1.5 text-xs font-semibold text-secondary hover:text-primary hover:bg-cream/40 rounded-full transition-colors border border-secondary/30"
                >
                  Dashboard
                </Link>
                <Link
                  href="/add-product"
                  className="bg-primary text-white hover:bg-secondary text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-md shadow-primary/20"
                >
                  + Add Product
                </Link>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center gap-2 group cursor-pointer">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full border border-primary/20 bg-cream" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FaUser className="text-sm" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-lg" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white hover:bg-secondary px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none p-2 rounded-md hover:bg-cream/20"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-cream text-primary font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full bg-cream border border-primary/20" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <FaUser />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <Link
                      href="/manage-products"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary"
                    >
                      Manage Products
                    </Link>
                    <Link
                      href="/add-product"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary"
                    >
                      Add Product
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className="w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-3 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-secondary"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
