'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { getProductBySlug, getSiteSettings } from '@/lib/data/store';
import { Product, SiteSettings } from '@/types';
import { 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Package, 
  Layers, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug).then((p) => {
        setProduct(p);
        setLoading(false);
      });
      getSiteSettings().then(setSettings);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-charcoal-400">
        <div className="w-8 h-8 border-2 border-ember-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>{language === 'bn' ? 'লোড হচ্ছে...' : 'Loading product...'}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">
          {language === 'bn' ? 'পণ্যটি পাওয়া যায়নি' : 'Product Not Found'}
        </h2>
        <p className="text-charcoal-400 text-sm">
          {language === 'bn' ? 'অনুরোধকৃত কয়লা পণ্যটি বর্তমানে তালিকায় নেই।' : 'The requested charcoal item is not listed.'}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.viewAllProducts}</span>
        </Link>
      </div>
    );
  }

  const name = language === 'bn' ? product.name_bn : product.name_en;
  const description = language === 'bn' ? product.description_bn : product.description_en;
  const packaging = language === 'bn' ? product.packaging_bn : product.packaging_en;
  const applications = language === 'bn' ? product.applications_bn : product.applications_en;
  const hasOffer = product.offer_price !== null && product.offer_price !== undefined && product.offer_price < product.price;

  const primaryPhone = settings?.phone_primary || '+880 1581-291614';
  const rawPhone = primaryPhone.replace(/[^0-9+]/g, '');
  const rawWhatsApp = (settings?.whatsapp_number || primaryPhone).replace(/[^0-9]/g, '');

  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.common.available}
          </span>
        );
      case 'Limited Availability':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-400 border border-amber-800">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.common.limitedAvailability}
          </span>
        );
      case 'Made to Order':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-400 border border-blue-800">
            <Clock className="w-3.5 h-3.5" />
            {t.common.madeToOrder}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">
            {t.common.unavailable}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Back to Products Navigation */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.viewAllProducts}</span>
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        
        {/* Left Column: Large Product Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-charcoal-800 aspect-[4/3] bg-charcoal-900 shadow-2xl">
            <Image
              src={product.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              {getAvailabilityBadge(product.availability)}
            </div>
            {hasOffer && (
              <div className="absolute top-4 right-4 bg-ember-600 text-white text-xs font-bold px-3 py-1 rounded shadow uppercase tracking-wider">
                {language === 'bn' ? 'স্পেশাল অফার' : 'Special Offer'}
              </div>
            )}
          </div>

          {/* Direct Supply Assurance */}
          <div className="mt-4 p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 text-xs text-charcoal-300 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {language === 'bn' 
                ? 'কারখানা থেকে সরাসরি ওজন ও মান যাচাইকৃত। কোনো প্রকার ভেজাল বা কেমিক্যাল মুক্ত।' 
                : 'Direct kiln supply with verified net weight. 100% natural, free of chemical fillers.'}
            </span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              {name}
            </h1>

            {/* Price block */}
            <div className="p-4 rounded-xl bg-charcoal-900/90 border border-charcoal-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-charcoal-400 block font-medium">
                  {language === 'bn' ? 'কারখানা মূল্য:' : 'Factory Price:'}
                </span>
                <div className="flex items-baseline gap-3 mt-0.5">
                  {hasOffer ? (
                    <>
                      <span className="text-3xl font-extrabold text-ember-400">
                        ৳{product.offer_price}
                      </span>
                      <span className="text-lg text-charcoal-500 line-through">
                        ৳{product.price}
                      </span>
                      <span className="text-sm text-charcoal-400 font-medium">
                        /{product.unit}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-extrabold text-white">
                        ৳{product.price}
                      </span>
                      <span className="text-sm text-charcoal-400 font-medium">
                        /{product.unit}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-charcoal-500 block">
                  {language === 'bn' ? 'সরবরাহ মাত্রা' : 'Unit'}
                </span>
                <span className="text-sm font-semibold text-charcoal-200">
                  {product.unit}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-charcoal-300 leading-relaxed">
              {description}
            </p>

            {/* Packaging & Applications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {packaging && (
                <div className="p-3.5 rounded-lg bg-charcoal-850 border border-charcoal-700/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                    <Package className="w-3.5 h-3.5 text-ember-400" />
                    <span>{t.products.packaging}</span>
                  </div>
                  <p className="text-xs text-charcoal-400">{packaging}</p>
                </div>
              )}

              {applications && (
                <div className="p-3.5 rounded-lg bg-charcoal-850 border border-charcoal-700/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                    <Flame className="w-3.5 h-3.5 text-ember-400" />
                    <span>{t.products.applications}</span>
                  </div>
                  <p className="text-xs text-charcoal-400">{applications}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5 text-ember-400" />
                  <span>{t.products.specifications}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specifications.carbonContent && (
                    <div className="bg-charcoal-900 p-2.5 rounded border border-charcoal-800">
                      <span className="text-charcoal-500 block">কার্বন / Fixed Carbon</span>
                      <span className="font-semibold text-white">{product.specifications.carbonContent}</span>
                    </div>
                  )}
                  {product.specifications.burnDuration && (
                    <div className="bg-charcoal-900 p-2.5 rounded border border-charcoal-800">
                      <span className="text-charcoal-500 block">জ্বলার সময় / Burn Time</span>
                      <span className="font-semibold text-white">{product.specifications.burnDuration}</span>
                    </div>
                  )}
                  {product.specifications.heatValue && (
                    <div className="bg-charcoal-900 p-2.5 rounded border border-charcoal-800">
                      <span className="text-charcoal-500 block">তাপমান / Caloric Value</span>
                      <span className="font-semibold text-white">{product.specifications.heatValue}</span>
                    </div>
                  )}
                  {product.specifications.sizeGrading && (
                    <div className="bg-charcoal-900 p-2.5 rounded border border-charcoal-800">
                      <span className="text-charcoal-500 block">সাইজ / Size Grading</span>
                      <span className="font-semibold text-white">{product.specifications.sizeGrading}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Actions & Quotation Trigger */}
          <div className="pt-6 border-t border-charcoal-800 space-y-3">
            <div className="text-xs text-charcoal-400">
              {t.common.bulkNotice}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href={`/contact?product=${encodeURIComponent(name)}`}
                className="w-full text-center py-3 px-4 rounded-xl bg-ember-600 hover:bg-ember-500 text-white text-sm font-bold shadow-md hover:shadow-ember-glow transition-all active:scale-95"
              >
                {t.common.requestQuote}
              </Link>

              <a
                href={`tel:${rawPhone}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-white text-sm font-semibold transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{t.common.callNow}</span>
              </a>

              <a
                href={`https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
                  language === 'bn' 
                    ? `আসসালামু আলাইকুম, আমি ${name} কয়লার কোটেশন ও সরবরাহ সংক্রান্ত তথ্য জানতে চাই।` 
                    : `Hello, I would like to request a quotation for ${name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-emerald-400 hover:text-white text-sm font-semibold transition-all active:scale-95"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
