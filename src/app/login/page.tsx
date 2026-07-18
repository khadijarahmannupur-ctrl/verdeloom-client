'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => setIsLoading(true),
      onResponse: () => setIsLoading(false),
      onSuccess: () => {
        toast.success('Logged in successfully!');
        router.push('/');
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Login failed. Please check credentials.');
      }
    });
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/'
    }, {
      onRequest: () => setIsLoading(true),
      onResponse: () => setIsLoading(false),
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Google Sign-In failed.');
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage your garden products and get AI health guidance.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-secondary disabled:opacity-50 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-primary/10"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Google OAuth Simulation */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold py-3.5 rounded-full transition-colors text-sm"
        >
          <FaGoogle className="text-red-500" />
          <span>Google Sign-In</span>
        </button>

        {/* Footer link */}
        <div className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:text-secondary font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
