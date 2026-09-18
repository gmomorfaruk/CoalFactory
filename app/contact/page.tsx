'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { getSiteSettings, getProducts, createOrder } from '@/lib/data/store';
import { SiteSettings, Product } from '@/types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Factory, 
  CheckCircle2, 
  Send, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams?.get('product') || '';
  const { language, t } = useLanguage();

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    customer_name: '',
    company_name: '',
    phone: '',
    email: '',
    product_name: prefilledProduct,
    quantity: '',
    location: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getSiteSettings().then(setSettings);
    getProducts().then(all => setProducts(all.filter(p => p.published)));
    if (prefilledProduct) {
      setFormData(prev => ({ ...prev, product_name: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.phone || !formData.quantity || !formData.location) {
      setErrorMsg(language === 'bn' ? 'দয়া করে সব আবশ্যক তথ্য সঠিকভাবে দিন।' : 'Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await createOrder({
        customer_name: formData.customer_name,
        company_name: formData.company_name,
        phone: formData.phone,
        email: formData.email,
        product_name: formData.product_name || (language === 'bn' ? 'সাধারণ কাঠ কয়লা' : 'General Wood Charcoal'),
        quantity: formData.quantity,
        location: formData.location,
        notes: formData.notes,
      });

      setSubmitted(true);
      setFormData({
        customer_name: '',
        company_name: '',
        phone: '',
        email: '',
        product_name: '',
        quantity: '',
        location: '',
        notes: '',
      });
    } catch (err) {
      setErrorMsg(t.common.error);
    } finally {
      setSubmitting(false);
    }
  };

  const primaryPhone = settings?.phone_primary || '+880 1581-291614';
  const secondaryPhone = settings?.phone_secondary || '+880 1986-659897';
  const rawPhone = primaryPhone.replace(/[^0-9+]/g, '');
  const rawWhatsApp = (settings?.whatsapp_number || primaryPhone).replace(/[^0-9]/g, '');
  const email = settings?.email || 'support.hasibenterprise@gmail.com';
  const officeAddr = language === 'bn' ? settings?.office_address_bn : settings?.office_address_en;
  const factoryAddr = language === 'bn' ? settings?.factory_address_bn : settings?.factory_address_en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-charcoal-800 text-xs font-semibold text-ember-400">
          <Phone className="w-3.5 h-3.5 text-ember-500" />
          <span>{language === 'bn' ? 'সরাসরি যোগাযোগ ও অর্ডার' : 'Direct Contact & Ordering'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t.contact.title}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-400 leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Main Grid: Contact Info + Order Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        
        {/* Left Column: Direct Phone / WhatsApp / Addresses */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct CTA Box */}
          <div className="rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white border-l-2 border-ember-500 pl-3">
              {language === 'bn' ? 'সরাসরি কল বা WhatsApp করুন' : 'Instant Direct Contact'}
            </h3>

            <div className="space-y-3">
              <a
                href={`tel:${rawPhone}`}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700/80 border border-charcoal-700 text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ember-600/20 text-ember-400 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-charcoal-400 block">{language === 'bn' ? 'প্রধান ফোন নম্বর' : 'Primary Phone'}</span>
                    <span className="font-bold text-sm sm:text-base">{primaryPhone}</span>
                  </div>
                </div>
                <span className="text-xs text-ember-400 font-semibold group-hover:underline">
                  {t.common.callNow}
                </span>
              </a>

              <a
                href={`https://wa.me/${rawWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700/80 border border-charcoal-700 text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                    <span className="font-bold text-sm">WA</span>
                  </div>
                  <div>
                    <span className="text-xs text-charcoal-400 block">{language === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ' : 'WhatsApp Chat'}</span>
                    <span className="font-bold text-sm sm:text-base">{settings?.whatsapp_number || primaryPhone}</span>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-semibold group-hover:underline">
                  {language === 'bn' ? 'মেসেজ পাঠান' : 'Chat Now'}
                </span>
              </a>
            </div>

            <div className="pt-4 border-t border-charcoal-800 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Factory className="w-4 h-4 text-ember-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t.contact.factory}</span>
                  <span className="text-charcoal-400">
                    {factoryAddr || (language === 'bn' ? 'হাসিব কয়লা কারখানা, ঘাটাইল, টাঙ্গাইল, বাংলাদেশ' : 'Hasib Plant, Ghatail, Tangail, Bangladesh')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-charcoal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t.contact.office}</span>
                  <span className="text-charcoal-400">
                    {officeAddr || (language === 'bn' ? 'মিরপুর, ঢাকা - ১২১৬, বাংলাদেশ' : 'Mirpur, Dhaka - 1216, Bangladesh')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-charcoal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t.contact.email}</span>
                  <span className="text-charcoal-400">{email}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Google Map Embed */}
          <div className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-900 h-64 relative">
            <iframe
              src={settings?.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977793836!2d90.33728812613045!3d23.801323719468085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51ab9ddf4f!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.2)' }}
              allowFullScreen={false}
              loading="lazy"
              title="Hasib Enterprises Map Location"
            />
          </div>

        </div>

        {/* Right Column: B2B Order / Quotation Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-charcoal-900/90 border border-charcoal-800 p-6 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {t.contact.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
                {language === 'bn' 
                  ? 'আপনার চাহিদা অনুসারে তথ্যগুলো দিন। আমরা অতি দ্রুত কোটেশন ও সরবরাহ সংক্রান্ত আলোচনায় যোগাযোগ করব।' 
                  : 'Submit your requirements and our factory sales representative will connect with you promptly.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-charcoal-850 border border-emerald-800/80 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'bn' ? 'আপনার রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!' : 'Order Request Received Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-300 max-w-md mx-auto leading-relaxed">
                  {language === 'bn'
                    ? 'আমাদের টিম অতি দ্রুত আপনার দেওয়া মোবাইল নম্বরে সরাসরি যোগাযোগ করে বিস্তারিত নিশ্চিত করবে। ধন্যবাদ!'
                    : 'Our factory representative will contact your phone number shortly with quotations and dispatch details. Thank you!'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-semibold"
                >
                  {language === 'bn' ? 'আরেকটি রিকোয়েস্ট পাঠান' : 'Submit Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-300">
                      {t.contact.nameLabel} <span className="text-ember-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder={language === 'bn' ? 'যেমন: মোঃ রাশেদ করিম' : 'e.g. John Doe'}
                      className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                    />
                  </div>

                  {/* Company / Restaurant */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-300">
                      {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      placeholder={language === 'bn' ? 'যেমন: স্মোকি গ্রিল বারবিকিউ' : 'e.g. Dhaka BBQ House'}
                      className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-300">
                      {t.contact.phoneLabel} <span className="text-ember-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-300">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Product Choice */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-300">
                      {t.contact.productLabel}
                    </label>
                    <select
                      value={formData.product_name}
                      onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                      className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                    >
                      <option value="">{language === 'bn' ? 'পণ্য নির্বাচন করুন...' : 'Select a product...'}</option>
                      {products.map(p => (
                        <option key={p.id} value={language === 'bn' ? p.name_bn : p.name_en}>
                          {language === 'bn' ? p.name_bn : p.name_en}
                        </option>
                      ))}
                      <option value="অন্যান্য বা বাল্ক লট">{language === 'bn' ? 'অন্যান্য / বাল্ক লট' : 'Other / Bulk Lot'}</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-300">
                      {t.contact.quantityLabel} <span className="text-ember-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder={language === 'bn' ? 'যেমন: ৫০০ কেজি / ২০ বস্তা / ২ টন' : 'e.g. 500 kg / 20 sacks / 2 tons'}
                      className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Delivery Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-300">
                    {t.contact.locationLabel} <span className="text-ember-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি ২৭, ঢাকা' : 'e.g. Dhanmondi 27, Dhaka'}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                  />
                </div>

                {/* Notes / Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-300">
                    {t.contact.notesLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={language === 'bn' ? 'ডেলিভারির সময় বা বিশেষ কোনো শর্ত থাকলে লিখুন...' : 'Delivery time preferences, packaging notes, etc.'}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-ember-600 to-ember-500 hover:from-ember-500 hover:to-ember-400 text-white font-bold text-sm shadow-md hover:shadow-ember-glow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t.common.submitting : t.contact.submitBtn}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-charcoal-400">Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
