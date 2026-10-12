import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ShieldCheck, Scale, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function ProductsPage({ onQuickView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.popularFor?.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    // Default 'featured'
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="bg-cream-soft min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy bg-burgundy-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 font-heading">
            <ShieldCheck className="w-4 h-4" /> 100% Skinless & Halal Slaughtered
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-charcoal tracking-tight">
            Wholesale Chicken Product Catalog
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-3xl">
            Browse our full catalog of 17 certified skinless cuts. Freshly chilled, vacuum-sealed, and machine-trimmed for commercial kitchens, retailers, and bulk buyers across Pakistan.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-sm mb-8 space-y-4">
          
          {/* Top Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cuts (e.g., boneless breast, drumstick, whole)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-neutral-500 whitespace-nowrap flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs sm:text-sm px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium text-neutral-700 focus:outline-none focus:border-burgundy"
              >
                <option value="featured">Wholesale Featured First</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
                <option value="name-desc">Alphabetical (Z - A)</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              Category:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-burgundy text-white shadow-md'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Count & Grid */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            Showing <strong className="text-burgundy">{sortedProducts.length}</strong> of {PRODUCTS.length} chicken cuts
          </p>
          <span className="text-xs text-neutral-500">
            Wholesale orders dispatched from Karachi cold hub
          </span>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-neutral-200 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-800">
              No chicken cuts matched your criteria
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or select another category filter to explore our catalog.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-6 bg-burgundy hover:bg-burgundy-800 text-white font-semibold text-xs px-6 py-2.5 rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
