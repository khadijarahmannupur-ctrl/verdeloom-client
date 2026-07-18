'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { authClient } from '@/lib/auth-client';
import { FaPlusCircle, FaImage, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';

const CATEGORIES = ['Live Plants', 'Seeds', 'Pots', 'Fertilizers', 'Gardening Tools'];

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useApp();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!isPending && !user) {
      toast.error('You must be logged in to access this page.');
      router.push('/login');
    }
  }, [user, isPending]);

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500 animate-pulse">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
        <p className="text-gray-500 mt-1">Please log in to add products to the catalog.</p>
        <Link href="/login" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold">
          Login Now
        </Link>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock local URL for showcase preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Convert to base64 string to simulate database saving
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !stock) {
      toast.error('Please fill in title, price, and stock levels.');
      return;
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    if (isNaN(priceNum) || priceNum < 0) {
      toast.error('Price must be a valid positive number.');
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      toast.error('Stock must be a non-negative integer.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await addProduct({
        title,
        category,
        shortDescription,
        description,
        price: priceNum,
        stock: stockNum,
        image: image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=60'
      }, user.id);
      if (success) {
        router.push('/manage-products');
      }
    } catch (err) {
      toast.error('Failed to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link href="/manage-products" className="text-sm font-semibold text-secondary hover:text-primary mb-8 inline-flex items-center gap-1.5">
        <FaChevronLeft className="text-xs" /> Back to Dashboard
      </Link>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaPlusCircle className="text-primary" /> Create New Product Listing
          </h1>
          <p className="text-gray-500 text-xs mt-1">Fill in the fields below to add a new plant, seed variety, or tool to the Verdeloom catalog.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Rare Variegated Monstera Deliciosa"
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price ($ USD) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="49.99"
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Stock Level */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Available Stock *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Image Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Image *</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-file-picker"
                />
                <label
                  htmlFor="image-file-picker"
                  className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-primary/50 transition-colors flex items-center gap-2 justify-center cursor-pointer font-medium"
                >
                  <FaImage className="text-primary" /> {imagePreview ? 'Change Image' : 'Choose File'}
                </label>
              </div>
            </div>

            {/* Image Preview Window */}
            {imagePreview && (
              <div className="md:col-span-2 flex justify-center">
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-gray-200 bg-cream">
                  <img src={imagePreview} alt="Product preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Short Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Short Description</label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary displaying in catalog search results..."
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Long Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed information regarding growth, lighting requirements, and overall specs..."
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-secondary disabled:opacity-50 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-primary/10"
          >
            {isSubmitting ? 'Creating listing...' : 'Create Product Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
