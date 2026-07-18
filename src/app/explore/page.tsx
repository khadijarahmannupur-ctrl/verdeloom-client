'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, Product } from '@/context/AppContext';
import { FaSearch, FaFilter, FaArrowUp, FaArrowDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const CATEGORIES = ['All', 'Live Plants', 'Seeds', 'Pots', 'Fertilizers', 'Gardening Tools'];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchProducts, isLoadingProducts } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Read URL search params
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const sortByParam = searchParams.get('sortBy') || 'createdAt';
  const sortOrderParam = searchParams.get('sortOrder') || 'desc';

  useEffect(() => {
    const loadProducts = async () => {
      const { products: loaded, totalPages: total } = await fetchProducts({
        search: searchParam,
        category: categoryParam === 'All' ? undefined : categoryParam,
        sortBy: sortByParam,
        sortOrder: sortOrderParam,
        page: currentPage,
        limit: 8
      });
      setProducts(loaded);
      setTotalPages(total);
    };

    loadProducts();
  }, [categoryParam, searchParam, sortByParam, sortOrderParam, currentPage]);

  const updateFilters = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === '' || val === 'All') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });
    // Reset to page 1 on search/filter changes
    if (!newParams.page) {
      params.set('page', '1');
      setCurrentPage(1);
    }
    router.push(`/explore?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  const handleCategorySelect = (cat: string) => {
    updateFilters({ category: cat });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    updateFilters({ sortBy, sortOrder });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateFilters({ page });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Explore Catalog</h1>
        <p className="text-gray-500 text-sm mt-1">Find the perfect additions to your home or garden collection.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search plants, seeds, tools..."
            value={searchParam}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm outline-none"
          />
        </div>

        {/* Sort */}
        <div className="flex gap-3 items-center w-full md:w-auto shrink-0">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">Sort By</span>
          <select
            value={`${sortByParam}-${sortOrderParam}`}
            onChange={handleSortChange}
            className="w-full sm:w-auto bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar categories (Desktop) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaFilter className="text-sm text-primary" /> Categories
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    categoryParam === cat
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-cream/40 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Capsule Carousel (Mobile) */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryParam === cat
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid & Pagination */}
        <div className="lg:col-span-3 space-y-10">
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl h-80" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl p-8">
              <p className="text-lg font-bold text-gray-800">No products found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => router.push('/explore')}
                className="mt-6 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {products.map((prod) => (
                <div
                  key={prod._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden bg-cream">
                    <img
                      src={prod.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=60'}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-secondary font-medium tracking-wider uppercase">{prod.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1 hover:text-primary transition-colors text-base line-clamp-1">
                        <Link href={`/products/${prod._id}`}>{prod.title}</Link>
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{prod.shortDescription}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-black text-primary">${prod.price.toFixed(2)}</span>
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
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading explore page...
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
