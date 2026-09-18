'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/context';
import { getGallery, getReviews } from '@/lib/data/store';
import { GalleryItem, Review, GalleryCategory } from '@/types';
import { Star, Image as ImageIcon, CheckCircle, Factory, Sparkles, X } from 'lucide-react';

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    getGallery().then((all) => setGallery(all.filter((g) => g.published)));
    getReviews().then((all) => setReviews(all.filter((r) => r.published)));

    const handleUpdate = () => {
      getGallery().then((all) => setGallery(all.filter((g) => g.published)));
      getReviews().then((all) => setReviews(all.filter((r) => r.published)));
    };
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  const categories = [
    { key: 'All', label: t.gallery.categories.all },
    { key: 'Factory', label: t.gallery.categories.factory },
    { key: 'Products', label: t.gallery.categories.products },
    { key: 'Production', label: t.gallery.categories.production },
    { key: 'Packaging', label: t.gallery.categories.packaging },
    { key: 'Customers', label: t.gallery.categories.customers },
    { key: 'Delivery', label: t.gallery.categories.delivery },
  ];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* 1. Gallery Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-charcoal-800 text-xs font-semibold text-ember-400">
          <Factory className="w-3.5 h-3.5 text-ember-500" />
          <span>{language === 'bn' ? 'বাস্তব কর্মক্ষেত্র' : 'Authentic Field Visuals'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t.gallery.title}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-400 leading-relaxed">
          {t.gallery.subtitle}
        </p>

        {/* Category Filters */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-ember-600 text-white shadow-sm scale-105'
                  : 'bg-charcoal-900 text-charcoal-400 hover:text-white border border-charcoal-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Gallery Masonry / Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-charcoal-500 text-sm">
          {language === 'bn' ? 'এই ক্যাটাগরিতে কোনো ছবি নেই।' : 'No images in this category.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const title = language === 'bn' ? item.title_bn : item.title_en;
            const desc = language === 'bn' ? item.description_bn : item.description_en;

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative h-72 rounded-xl overflow-hidden border border-charcoal-800 bg-charcoal-900 cursor-pointer shadow-md hover:border-ember-500/40 transition-all"
              >
                <Image
                  src={item.image_url}
                  alt={title || 'Hasib Charcoal Gallery'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                <div className="absolute top-3 right-3 bg-charcoal-950/80 backdrop-blur-sm text-charcoal-300 text-[10px] font-bold px-2 py-0.5 rounded border border-charcoal-700/60 uppercase">
                  {item.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-sm font-bold line-clamp-1 mb-1 group-hover:text-ember-400 transition-colors">
                    {title}
                  </h3>
                  {desc && (
                    <p className="text-xs text-charcoal-400 line-clamp-2">
                      {desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. "What Our Customers Say" Section (Clean & Authentic) */}
      <section className="pt-10 border-t border-charcoal-800/80">
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-charcoal-900 border border-charcoal-800 text-[11px] font-bold text-ember-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-ember-400" />
            <span>{language === 'bn' ? 'বাস্তব অভিজ্ঞতা' : 'Client Feedback'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.gallery.testimonialsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400">
            {t.gallery.testimonialsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => {
            const reviewText = language === 'bn' ? rev.review_bn : (rev.review_en || rev.review_bn);
            return (
              <div
                key={rev.id}
                className="glass-card rounded-xl p-6 border border-charcoal-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed italic">
                    "{reviewText}"
                  </p>
                </div>

                {/* Customer Identity */}
                <div className="pt-5 border-t border-charcoal-800/80 mt-6 flex items-center gap-3">
                  {rev.photo_url ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-charcoal-700 shrink-0">
                      <Image
                        src={rev.photo_url}
                        alt={rev.customer_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-charcoal-850 border border-charcoal-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      {rev.customer_name[0]}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="font-bold text-white text-xs truncate">
                      {rev.customer_name}
                    </div>
                    {rev.business_name && (
                      <div className="text-[11px] text-ember-400 truncate">
                        {rev.business_name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-12 right-0 text-white hover:text-ember-400 transition-colors p-2"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full h-[65vh] rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-800">
              <Image
                src={activeLightbox.image_url}
                alt={activeLightbox.title_bn || 'Charcoal Factory Image'}
                fill
                className="object-contain"
              />
            </div>

            <div className="w-full mt-4 text-center">
              <span className="text-[11px] uppercase font-bold text-ember-400 block mb-1">
                {activeLightbox.category}
              </span>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? activeLightbox.title_bn : activeLightbox.title_en}
              </h3>
              {activeLightbox.description_bn && (
                <p className="text-xs text-charcoal-400 mt-1 max-w-lg mx-auto">
                  {language === 'bn' ? activeLightbox.description_bn : activeLightbox.description_en}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
