'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { getSiteSettings } from '@/lib/data/store';
import { SiteSettings } from '@/types';
import { Phone, MessageCircle, ClipboardPenLine } from 'lucide-react';

export default function MobileQuickBar() {
  const { language } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
    const handleUpdate = () => getSiteSettings().then(setSettings);
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  const phone = settings?.phone_primary || '+880 1711-223344';
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const whatsapp = (settings?.whatsapp_number || phone).replace(/[^0-9]/g, '');

  return (
    <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-charcoal-950/95 backdrop-blur-lg border-t border-charcoal-800 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          href={`tel:${rawPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700/80 text-charcoal-100 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[11px] font-semibold leading-none">
            {language === 'bn' ? 'কল করুন' : 'Call'}
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700/80 text-charcoal-100 active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4 text-green-500 mb-1" />
          <span className="text-[11px] font-semibold leading-none">
            {language === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}
          </span>
        </a>

        {/* Order / Quote Button */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-ember-600 hover:bg-ember-500 text-white active:scale-95 transition-all text-center shadow-sm"
        >
          <ClipboardPenLine className="w-4 h-4 text-white mb-1" />
          <span className="text-[11px] font-semibold leading-none">
            {language === 'bn' ? 'অর্ডার রিকোয়েস্ট' : 'Order Now'}
          </span>
        </Link>

      </div>
    </aside>
  );
}
