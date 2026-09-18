'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/lib/i18n/context';
import { ArrowRight, Phone, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickOrder?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickOrder }: ProductCardProps) {
  const { language, t } = useLanguage();

  const name = language === 'bn' ? product.name_bn : product.name_en;
  const description = language === 'bn' ? product.description_bn : product.description_en;

  // Availability badge config
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3" />
            {t.common.available}
          </span>
        );
      case 'Limited Availability':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/60">
            <AlertCircle className="w-3 h-3" />
            {t.common.limitedAvailability}
          </span>
        );
      case 'Made to Order':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950/80 text-blue-400 border border-blue-800/60">
            <Clock className="w-3 h-3" />
            {t.common.madeToOrder}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">
            {t.common.unavailable}
          </span>
        );
    }
  };

  const hasOffer = product.offer_price !== null && product.offer_price !== undefined && product.offer_price < product.price;

  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col group h-full">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="relative h-56 w-full block overflow-hidden bg-charcoal-900">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop'}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />
        
        {/* Availability Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          {getAvailabilityBadge(product.availability)}
        </div>

        {/* Offer Tag */}
        {hasOffer && (
          <div className="absolute top-3 right-3 z-10 bg-ember-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-md uppercase tracking-wider">
            {language === 'bn' ? 'বিশেষ অফার' : 'Special Offer'}
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-ember-400 transition-colors line-clamp-1 mb-2">
              {name}
            </h3>
          </Link>
          <p className="text-xs text-charcoal-400 leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-4 border-t border-charcoal-800/80">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-charcoal-400 block font-medium">
                {language === 'bn' ? 'দর / মূল্য:' : 'Factory Price:'}
              </span>
              <div className="flex items-baseline gap-2">
                {hasOffer ? (
                  <>
                    <span className="text-xl font-extrabold text-ember-400">
                      ৳{product.offer_price}
                    </span>
                    <span className="text-sm text-charcoal-500 line-through">
                      ৳{product.price}
                    </span>
                    <span className="text-xs text-charcoal-400 font-medium">
                      /{product.unit}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-extrabold text-white">
                      ৳{product.price}
                    </span>
                    <span className="text-xs text-charcoal-400 font-medium">
                      /{product.unit}
                    </span>
                  </>
                )}
              </div>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="text-xs text-ember-400 hover:text-ember-300 font-semibold inline-flex items-center gap-1 group/btn"
            >
              <span>{t.common.viewDetails}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/contact?product=${encodeURIComponent(name)}`}
              className="w-full text-center py-2 px-3 rounded-lg bg-ember-600 hover:bg-ember-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              {t.common.orderNow}
            </Link>

            <a
              href={`https://wa.me/8801581291614?text=${encodeURIComponent(
                language === 'bn' 
                  ? `আসসালামু আলাইকুম, আমি ${name} সম্পর্কে জানতে আগ্রহী।` 
                  : `Hello, I would like to inquire about ${name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-charcoal-200 hover:text-white text-xs font-medium transition-all"
            >
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
