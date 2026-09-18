'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { getProducts } from '@/lib/data/store';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { Flame, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    getProducts().then(all => setProducts(all.filter(p => p.published)));
    const handleUpdate = () => {
      getProducts().then(all => setProducts(all.filter(p => p.published)));
    };
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  const filteredProducts = products.filter(p => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'available') return p.availability === 'Available';
    if (selectedFilter === 'offers') return p.offer_price && p.offer_price < p.price;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Header Section */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-charcoal-800 text-xs font-semibold text-ember-400">
          <Flame className="w-3.5 h-3.5 text-ember-500" />
          <span>{language === 'bn' ? 'সরাসরি নিজস্ব কারখানা' : 'Direct Factory Stock'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t.products.title}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-400 leading-relaxed">
          {t.products.subtitle}
        </p>

        {/* Filter Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedFilter === 'all'
                ? 'bg-ember-600 text-white shadow-sm'
                : 'bg-charcoal-900 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            {t.common.all} ({products.length})
          </button>
          <button
            onClick={() => setSelectedFilter('available')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedFilter === 'available'
                ? 'bg-ember-600 text-white shadow-sm'
                : 'bg-charcoal-900 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            {t.common.available}
          </button>
          <button
            onClick={() => setSelectedFilter('offers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedFilter === 'offers'
                ? 'bg-ember-600 text-white shadow-sm'
                : 'bg-charcoal-900 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            {language === 'bn' ? 'বিশেষ অফারসমূহ' : 'Special Offers'}
          </button>
        </div>
      </div>

      {/* Bulk Orders Notice Callout */}
      <div className="rounded-xl border border-charcoal-700/80 bg-charcoal-900/80 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-ember-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-charcoal-300">
            <span className="font-bold text-white block sm:inline mr-2">
              {language === 'bn' ? 'পাইকারি ও বাণিজ্যিক সরবরাহ:' : 'Wholesale & Commercial Orders:'}
            </span>
            <span>{t.common.bulkNotice}</span>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          {t.common.requestQuote}
        </Link>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-charcoal-500 text-sm">
          {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি।' : 'No products found.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
