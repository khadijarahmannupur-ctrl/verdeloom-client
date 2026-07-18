'use client';

import React, { use, useState, useEffect } from 'react';
import { useApp, Product } from '@/context/AppContext';
import { FaLeaf, FaShieldAlt, FaTruck, FaShoppingCart, FaMagic } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const { getProductById, apiBaseUrl } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const loadProductAndRelated = async () => {
      setIsLoading(true);
      const prod = await getProductById(id);
      setProduct(prod);
      if (prod) {
        try {
          const res = await fetch(`${apiBaseUrl}/products?category=${encodeURIComponent(prod.category)}&limit=4`);
          if (res.ok) {
            const data = await res.json();
            const filtered = (data.products || []).filter((p: Product) => p._id !== prod._id).slice(0, 3);
            setRelatedProducts(filtered);
          }
        } catch (e) {
          console.error('Failed to fetch related products', e);
        }
      }
      setIsLoading(false);
    };
    loadProductAndRelated();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    toast.success(`Added ${qty} x ${product.title} to cart! (Simulation)`);
  };

  if (isLoading) {
    return (
      <div className="overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500 animate-pulse">
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <p className="text-gray-500 mt-2">The product you are looking for might have been deleted or moved.</p>
          <Link href="/explore" className="mt-6 inline-block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  // Generate customized AI tips based on category
  const getAiSummary = () => {
    switch (product.category) {
      case 'Live Plants':
        return {
          light: 'Thrives in bright, indirect sunlight. Avoid direct afternoon exposure.',
          water: 'Water thoroughly when top 2 inches of soil are dry. Sensitive to overwatering.',
          difficulty: 'Easy to Medium',
          benefit: 'Highly effective air-purifying plant, releases clean oxygen.'
        };
      case 'Seeds':
        return {
          light: 'Requires 6-8 hours of direct daily sunlight for high germination rate.',
          water: 'Keep seedbeds consistently moist but not waterlogged until sprouts emerge.',
          difficulty: 'Easy',
          benefit: 'Heirloom cultivar, non-GMO, selected for superior taste and yields.'
        };
      case 'Pots':
        return {
          light: 'Weather resistant. Suitable for both indoors and outdoor patios.',
          water: 'Equipped with bottom drainage hole to prevent water stagnation and root rot.',
          difficulty: 'N/A',
          benefit: 'Highly breathable clay walls wick moisture naturally, protecting roots.'
        };
      case 'Fertilizers':
        return {
          light: 'Store in a cool, dark, dry storage cupboard away from children.',
          water: 'Dilute 10ml in 1 gallon of pure water. Apply every 2 weeks during active growth.',
          difficulty: 'Easy',
          benefit: 'Enriches soil micro-biome, increases root absorption efficiency by 40%.'
        };
      default:
        return {
          light: 'Store dry. Keep clean of soil after usage to prevent rust.',
          water: 'Not applicable. Heavy duty construction.',
          difficulty: 'N/A',
          benefit: 'Ergonomic shape reduces hand fatigue during long pruning sessions.'
        };
    }
  };

  const aiSummary = getAiSummary();

  return (
    <div className="overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Back button */}
        <Link href="/explore" className="text-sm font-semibold text-secondary hover:text-primary mb-8 inline-flex items-center gap-1.5">
          &larr; Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column - Product Image */}
          <div className="lg:col-span-6 min-w-0 bg-cream rounded-3xl overflow-hidden aspect-square relative shadow-inner border border-gray-100 max-h-[500px]">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=60'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Product Meta */}
          <div className="lg:col-span-6 min-w-0 flex flex-col justify-between space-y-8">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/15 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                <FaLeaf className="text-xs" /> {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 break-words">{product.title}</h1>

              {/* Price */}
              <div className="text-2xl font-black text-primary mt-4">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-6 leading-relaxed break-words whitespace-pre-line">
                {product.description || product.shortDescription}
              </p>

              {/* Stock details */}
              <div className="mt-6 flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity and CTA */}
            {product.stock > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-gray-800 w-12 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-primary text-white hover:bg-secondary px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/10 hover:shadow-xl shrink-0"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            )}

            {/* Delivery & Security Guarantee */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-2 min-w-0">
                <FaTruck className="text-primary text-sm shrink-0" />
                <span className="truncate">Safe live plant shipping</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <FaShieldAlt className="text-primary text-sm shrink-0" />
                <span className="truncate">Secure checkout guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Care/Summary Card */}
        <div className="bg-gradient-to-tr from-[#1c2e1d] to-[#2c4e2d] text-white p-8 rounded-3xl mb-16 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2.5 mb-6">
            <FaMagic className="text-accent text-xl animate-pulse" />
            <h2 className="text-lg font-bold tracking-wide uppercase text-accent">Gemini AI Quick Care Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1.5 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent/80">Lighting Requirement</h4>
              <p className="text-sm text-gray-200 leading-relaxed break-words">{aiSummary.light}</p>
            </div>
            <div className="space-y-1.5 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent/80">Watering Schedule</h4>
              <p className="text-sm text-gray-200 leading-relaxed break-words">{aiSummary.water}</p>
            </div>
            <div className="space-y-1.5 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent/80">Growth Difficulty</h4>
              <p className="text-sm text-gray-200 leading-relaxed break-words">{aiSummary.difficulty}</p>
            </div>
            <div className="space-y-1.5 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent/80">Ecological Benefit</h4>
              <p className="text-sm text-gray-200 leading-relaxed break-words">{aiSummary.benefit}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <div
                  key={prod._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden min-w-0"
                >
                  <div className="relative h-56 overflow-hidden bg-cream">
                    <img
                      src={prod.image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=60'}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between min-w-0">
                    <div className="min-w-0">
                      <span className="text-xs text-secondary font-medium tracking-wider uppercase">{prod.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1 hover:text-primary transition-colors text-base line-clamp-1">
                        <Link href={`/products/${prod._id}`}>{prod.title}</Link>
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-base font-black text-primary shrink-0">${prod.price.toFixed(2)}</span>
                      <Link
                        href={`/products/${prod._id}`}
                        className="text-xs font-semibold px-4 py-2 bg-cream text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-200 shrink-0"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}