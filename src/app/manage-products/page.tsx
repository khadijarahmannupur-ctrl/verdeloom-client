'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, Product } from '@/context/AppContext';
import { authClient } from '@/lib/auth-client';
import ConfirmModal from '@/components/ConfirmModal';
import { FaTrash, FaEye, FaPlus, FaTachometerAlt } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function ManageProductsPage() {
  const router = useRouter();
  const { products, fetchProducts, deleteProduct } = useApp();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!isPending && !user) {
      toast.error('Access denied. Please log in.');
      router.push('/login');
    }
  }, [user, isPending]);

  // Load products from backend
  useEffect(() => {
    if (user) {
      fetchProducts({ limit: 100 });
    }
  }, [user]);

  // Filter products by logged-in user id
  useEffect(() => {
    if (user) {
      setUserProducts(products.filter(p => p.userId === user.id));
    }
  }, [products, user]);

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500 animate-pulse">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleDeleteRequest = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      const success = await deleteProduct(productToDelete._id, user.id);
      if (success) {
        setUserProducts(prev => prev.filter(p => p._id !== productToDelete._id));
        setIsModalOpen(false);
        setProductToDelete(null);
      }
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Process data for charts
  const getCategoryData = () => {
    const categoryCounts: Record<string, number> = {};
    userProducts.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value
    }));
  };

  const chartData = getCategoryData();
  const COLORS = ['#005F02', '#427A43', '#C0B87A', '#e8d5a7', '#8bb88c'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTachometerAlt className="text-primary text-2xl" /> Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track your published nursery catalog items.</p>
        </div>
        <Link
          href="/add-product"
          className="bg-primary text-white hover:bg-secondary px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {userProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <p className="text-lg font-bold text-gray-800">No product listings found</p>
          <p className="text-sm text-gray-500 mt-2">Get started by creating your first product listing.</p>
          <Link href="/add-product" className="mt-6 inline-block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold">
            Add Product Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Table List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">Active Product Listings</h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                  {userProducts.length} Listings
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/20">
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProducts.map((prod) => (
                      <tr key={prod._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=150&auto=format&fit=crop&q=60'}
                              alt={prod.title}
                              className="w-10 h-10 rounded-lg object-cover bg-cream shrink-0"
                            />
                            <div className="font-bold text-gray-800 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]" title={prod.title}>
                              {prod.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-500">{prod.category}</td>
                        <td className="px-6 py-4 text-xs font-bold text-primary">${prod.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            prod.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {prod.stock} left
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/products/${prod._id}`}
                              className="p-2 text-gray-500 hover:text-primary hover:bg-cream/40 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </Link>
                            <button
                              onClick={() => handleDeleteRequest(prod)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Listing"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stats & Charts Side Column */}
          <div className="space-y-6">
            {/* Visual pie breakdown */}
            {chartData.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">Category Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Quick Metrics */}
            <div className="bg-[#1c2e1d] text-white p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-bold text-accent text-sm uppercase tracking-wider">Catalog Value</h3>
              <div className="space-y-1">
                <div className="text-3xl font-black">
                  ${userProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-400">Total valuation of current inventory</div>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-xs text-gray-300">
                <span>Total Items:</span>
                <span className="font-bold text-white">{userProducts.reduce((sum, p) => sum + p.stock, 0)} items</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Product Listing?"
        message={`Are you sure you want to permanently delete "${productToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Listing"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isDeleting}
        isDanger={true}
      />
    </div>
  );
}
