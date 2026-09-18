'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { getHomepageContent } from '@/lib/data/store';
import { HomepageContent } from '@/types';
import { Flame, X } from 'lucide-react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const { language } = useLanguage();
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getHomepageContent().then(setContent);

    const handleUpdate = () => {
      getHomepageContent().then(setContent);
    };
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  if (!content || !content.announcement_active || dismissed) {
    return null;
  }

  const text = language === 'bn' ? content.announcement_text_bn : content.announcement_text_en;
  if (!text) return null;

  return (
    <div className="bg-gradient-to-r from-ember-900 via-ember-700 to-ember-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-ember-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto truncate">
          <Flame className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
          <span className="font-medium truncate">{text}</span>
          <Link 
            href="/contact" 
            className="underline underline-offset-2 hover:text-amber-200 ml-2 shrink-0 font-semibold transition-colors"
          >
            {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white transition-colors p-0.5 rounded shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
