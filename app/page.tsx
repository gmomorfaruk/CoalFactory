'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/context';
import { 
  getHomepageContent, 
  getProducts, 
  getActiveOffer, 
  getGallery, 
  getSiteSettings 
} from '@/lib/data/store';
import { 
  HomepageContent, 
  Product, 
  Offer, 
  GalleryItem, 
  SiteSettings 
} from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Factory, 
  Sparkles, 
  Truck, 
  UtensilsCrossed, 
  Building2, 
  Store, 
  Globe 
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      const [c, p, o, g, s] = await Promise.all([
        getHomepageContent(),
        getProducts(),
        getActiveOffer(),
        getGallery(),
        getSiteSettings(),
      ]);
      setContent(c);
      setProducts(p.filter(prod => prod.published && prod.is_featured));
      setActiveOffer(o);
      setGallery(g.filter(item => item.published && item.is_featured).slice(0, 4));
      setSettings(s);
    };

    loadAll();

    const handleUpdate = () => loadAll();
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  const heroTitle = language === 'bn' 
    ? (content?.hero_title_bn || t.hero.title) 
    : (content?.hero_title_en || t.hero.title);

  const heroSubtitle = language === 'bn' 
    ? (content?.hero_subtitle_bn || t.hero.subtitle) 
    : (content?.hero_subtitle_en || t.hero.subtitle);

  const heroImage = content?.hero_image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop';
  const primaryPhone = settings?.phone_primary || '+880 1581-291614';
  const rawPhone = primaryPhone.replace(/[^0-9+]/g, '');

  const iconMap: Record<string, React.ReactNode> = {
    Flame: <Flame className="w-6 h-6 text-ember-400" />,
    Factory: <Factory className="w-6 h-6 text-ember-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-ember-400" />,
    Truck: <Truck className="w-6 h-6 text-ember-400" />
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-coal-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Small subtle badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-charcoal-700/80 text-xs font-semibold text-ember-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ember-500 animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {heroTitle}
            </h1>

            {/* Natural Copy */}
            <p className="text-base sm:text-lg text-charcoal-300 max-w-2xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>

            {/* Clear Primary Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={`tel:${rawPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ember-600 to-ember-500 hover:from-ember-500 hover:to-ember-400 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-ember-glow transition-all active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <span>{t.hero.ctaCall}</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 hover:border-charcoal-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-95"
              >
                <span>{t.hero.ctaOrder}</span>
                <ArrowRight className="w-4 h-4 text-charcoal-400" />
              </Link>
            </div>

          </div>

          {/* Large Factory Photography & Video Showcase */}
          <div className="mt-12 sm:mt-16 relative rounded-2xl overflow-hidden border border-charcoal-800 shadow-2xl max-w-5xl mx-auto aspect-[16/9] sm:aspect-[21/9] bg-charcoal-900 group">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/factory-plant.jpeg"
              className="w-full h-full object-cover brightness-85 contrast-105"
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-xs text-charcoal-300 flex items-center justify-between pointer-events-none">
              <span className="font-medium bg-charcoal-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-charcoal-800">
                {language === 'bn' ? 'কয়লা কারখানা — ফুলতলা, খুলনা' : 'Charcoal Plant — Phultala, Khulna'}
              </span>
              <span className="hidden sm:inline-block bg-charcoal-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-charcoal-800">
                {language === 'bn' ? 'সুশৃঙ্খল কার্বনাইজেশন ও বাছাইকৃত মান' : 'Controlled Carbonization & Hand-Graded'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE BUSINESS JOURNEY: Factory → Production → Sorting → Packaging → Dispatch */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-charcoal-800 text-xs font-semibold text-ember-400 uppercase tracking-wider mb-2">
            <span>{language === 'bn' ? 'আমাদের কর্মপদ্ধতি' : 'Our Quality Process'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {language === 'bn' ? 'কারখানা থেকে সরবরাহ: ৫টি সুশৃঙ্খল ধাপ' : 'Factory to Dispatch: A Disciplined Supply Chain'}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-2">
            {language === 'bn' 
              ? 'আমরা ধোঁয়া বা আগুনের আড়ম্বর নয়, গুরুত্ব দিই কাঠ নির্বাচন, সঠিক রূপান্তর ও পেশাদার ডেলিভারিতে।' 
              : 'Our focus is on wood selection, clean carbonization, hand-sorting, and secure logistics.'}
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Step 1: Factory & Raw Hardwood */}
          <div className="glass-card rounded-xl overflow-hidden border border-charcoal-800 flex flex-col justify-between">
            <div className="relative h-40 w-full bg-charcoal-900">
              <Image
                src="/images/wood-storage.jpeg"
                alt="Factory and Hardwood Storage"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/85 text-[11px] font-extrabold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                01. {language === 'bn' ? 'কারখানা' : 'Factory'}
              </div>
            </div>
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'কাঠ সংগ্রহ ও সিজনিং' : 'Hardwood Sourcing'}
                </h3>
                <p className="text-[11px] text-charcoal-400 leading-relaxed mt-1">
                  {language === 'bn' ? 'পরিপক্ক তেঁতুল ও শক্ত কাঠের প্রাকৃতিক আর্দ্রতা নিয়ন্ত্রণ।' : 'Dense hardwoods naturally seasoned in open yards.'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Controlled Production */}
          <div className="glass-card rounded-xl overflow-hidden border border-charcoal-800 flex flex-col justify-between">
            <div className="relative h-40 w-full bg-charcoal-900">
              <Image
                src="/images/factory-coal-piles.jpeg"
                alt="Controlled Carbonization Output"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/85 text-[11px] font-extrabold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                02. {language === 'bn' ? 'উৎপাদন' : 'Production'}
              </div>
            </div>
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'সুশৃঙ্খল কার্বনাইজেশন' : 'Controlled Kilns'}
                </h3>
                <p className="text-[11px] text-charcoal-400 leading-relaxed mt-1">
                  {language === 'bn' ? 'নিয়ন্ত্রিত তাপমাত্রায় সুষম কয়লায় রূপান্তর ও নিরাপদ কুলিং।' : 'Gradual thermal curing yielding high carbon content.'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Hand Sorting & Grading */}
          <div className="glass-card rounded-xl overflow-hidden border border-charcoal-800 flex flex-col justify-between">
            <div className="relative h-40 w-full bg-charcoal-900">
              <Image
                src="/images/hardwood-lump.jpeg"
                alt="Hand-Sorted Clean Hardwood Lump"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/85 text-[11px] font-extrabold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                03. {language === 'bn' ? 'বাছাইকরণ' : 'Sorting'}
              </div>
            </div>
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'গ্রেডিং ও ছাঁকন' : 'Hand Grading'}
                </h3>
                <p className="text-[11px] text-charcoal-400 leading-relaxed mt-1">
                  {language === 'bn' ? 'ধুলাবালি ও অপ্রয়োজনীয় অংশমুক্ত পরিষ্কার খণ্ড নির্বাচন।' : 'Separating dust & fines to ensure clean lump chunks.'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Weatherproof Packaging */}
          <div className="glass-card rounded-xl overflow-hidden border border-charcoal-800 flex flex-col justify-between">
            <div className="relative h-40 w-full bg-charcoal-900">
              <Image
                src="/images/packaging-sacks.jpeg"
                alt="Heavy-Duty Weatherproof Packaging"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/85 text-[11px] font-extrabold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                04. {language === 'bn' ? 'প্যাকেজিং' : 'Packaging'}
              </div>
            </div>
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'সুরক্ষিত বস্তায় প্যাকিং' : 'Secure Sacks'}
                </h3>
                <p className="text-[11px] text-charcoal-400 leading-relaxed mt-1">
                  {language === 'bn' ? 'আর্দ্রতারোধক পলি-লাইন্ড ব্যাগে সঠিক ওজন নিশ্চিতকরণ।' : 'Poly-lined woven bags preserving bone-dry moisture.'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 5: Nationwide Dispatch */}
          <div className="glass-card rounded-xl overflow-hidden border border-charcoal-800 flex flex-col justify-between">
            <div className="relative h-40 w-full bg-charcoal-900">
              <Image
                src="/images/dispatch-loading.jpeg"
                alt="Freight Dispatch and Truck Delivery"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/85 text-[11px] font-extrabold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                05. {language === 'bn' ? 'ডেলিভারি' : 'Dispatch'}
              </div>
            </div>
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'সরাসরি ট্রাকে লোডিং' : 'Direct Dispatch'}
                </h3>
                <p className="text-[11px] text-charcoal-400 leading-relaxed mt-1">
                  {language === 'bn' ? 'রেস্তোরাঁ ও পাইকারি ওয়্যারহাউজে সময়মতো সরবরাহ।' : 'Scheduled freight runs to commercial buyers nationwide.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-ember-500 uppercase tracking-wider mb-1">
              {language === 'bn' ? 'আমাদের কয়লা' : 'Our Charcoal'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {t.home.featuredProductsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
              {t.home.featuredProductsSubtitle}
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-400 hover:text-ember-300 transition-colors self-start sm:self-auto"
          >
            <span>{t.common.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. SPECIAL OFFER (If Active) */}
      {activeOffer && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-ember-600/40 bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-ember-950/30 p-6 sm:p-10 shadow-xl">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-ember-600/20 border border-ember-500/40 text-ember-400 text-xs font-bold uppercase tracking-wider">
                {t.home.specialOfferTitle}
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {language === 'bn' ? activeOffer.title_bn : activeOffer.title_en}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-300 leading-relaxed">
                {language === 'bn' ? activeOffer.description_bn : activeOffer.description_en}
              </p>

              <div className="pt-2 flex flex-wrap items-baseline gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-ember-400">
                    ৳{activeOffer.offer_price}
                  </span>
                  {activeOffer.original_price && (
                    <span className="text-lg text-charcoal-500 line-through">
                      ৳{activeOffer.original_price}
                    </span>
                  )}
                  <span className="text-xs text-charcoal-400 font-medium">/কেজি</span>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
                >
                  <span>{t.common.orderNow}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. WHY CHOOSE HASIB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-ember-500 uppercase tracking-wider mb-1">
            {language === 'bn' ? 'আমাদের বিশেষত্ব' : 'Why Us'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.home.whyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-2">
            {t.home.whySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(content?.why_us_items || []).map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-6 border border-charcoal-800 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-charcoal-850 border border-charcoal-700 flex items-center justify-center">
                  {iconMap[item.icon] || <Flame className="w-6 h-6 text-ember-400" />}
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? item.title_bn : item.title_en}
                </h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">
                  {language === 'bn' ? item.description_bn : item.description_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OUR CUSTOMERS (Commercial Sectors We Serve) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-charcoal-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t.home.customersTitle}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
              {t.home.customersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            <div className="p-5 rounded-xl bg-charcoal-900 border border-charcoal-800/80 space-y-2">
              <UtensilsCrossed className="w-8 h-8 text-ember-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? 'রেস্তোরাঁ ও কাবাব হাউস' : 'BBQ & Kebab Houses'}
              </h4>
              <p className="text-[11px] text-charcoal-400">
                {language === 'bn' ? 'নিয়মিত দৈনিক ও সাপ্তাহিক সরবরাহ' : 'Daily & weekly kitchen supplies'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-charcoal-900 border border-charcoal-800/80 space-y-2">
              <Store className="w-8 h-8 text-ember-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? 'পাইকারি পরিবেশক' : 'Wholesalers & Stockists'}
              </h4>
              <p className="text-[11px] text-charcoal-400">
                {language === 'bn' ? 'বাল্ক বস্তা ও ট্রাকলোড রেট' : 'Bulk truckload allocation'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-charcoal-900 border border-charcoal-800/80 space-y-2">
              <Building2 className="w-8 h-8 text-ember-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? 'বাণিজ্যিক ও শিল্প প্রতিষ্ঠান' : 'Commercial & Industrial'}
              </h4>
              <p className="text-[11px] text-charcoal-400">
                {language === 'bn' ? 'ধাতব ঢালাই ও উচ্চ তাপ চুল্লি' : 'Foundry & thermal processors'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-charcoal-900 border border-charcoal-800/80 space-y-2">
              <Flame className="w-8 h-8 text-ember-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? 'হোটেল ও ক্যাটারিং' : 'Hotels & Caterers'}
              </h4>
              <p className="text-[11px] text-charcoal-400">
                {language === 'bn' ? 'ধোঁয়াহীন ও সুষম কয়লা' : 'Smokeless clean burn grade'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW (4 striking photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-ember-500 uppercase tracking-wider mb-1">
              {language === 'bn' ? 'বাস্তব চিত্র' : 'Factory Visuals'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {t.home.galleryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
              {t.home.gallerySubtitle}
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-400 hover:text-ember-300 transition-colors self-start sm:self-auto"
          >
            <span>{t.common.viewGallery}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative h-64 rounded-xl overflow-hidden border border-charcoal-800 block bg-charcoal-900"
            >
              <Image
                src={item.image_url}
                alt={item.title_bn || 'Charcoal Factory Visual'}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-ember-400 block tracking-wider">
                  {item.category}
                </span>
                <p className="text-xs font-semibold line-clamp-1">
                  {language === 'bn' ? item.title_bn : item.title_en}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. CONTACT / ORDER CTA (with Export Teaser Note) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-charcoal-700/80 bg-charcoal-900/90 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.home.ctaReadyTitle}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-300 leading-relaxed">
              {t.home.ctaReadySubtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${rawPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ember-600 hover:bg-ember-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>{primaryPhone}</span>
              </a>

              <a
                href={`https://wa.me/${(settings?.whatsapp_number || primaryPhone).replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-emerald-400 font-semibold px-8 py-3.5 rounded-xl transition-all"
              >
                <span>WhatsApp এ কথা বলুন</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all"
              >
                <span>{t.common.requestQuote}</span>
              </Link>
            </div>

            {/* Subtle Export Inquiry Note */}
            <div className="pt-6 border-t border-charcoal-800/80 text-xs text-charcoal-400 flex items-center justify-center gap-2">
              <Globe className="w-4 h-4 text-charcoal-400 shrink-0" />
              <span>{t.home.exportNote}</span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
