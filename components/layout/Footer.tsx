'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { getSiteSettings } from '@/lib/data/store';
import { SiteSettings } from '@/types';
import { Phone, Mail, MapPin, Factory, Flame, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
    const handleUpdate = () => getSiteSettings().then(setSettings);
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  const phonePrimary = settings?.phone_primary || '+880 1711-223344';
  const phoneSecondary = settings?.phone_secondary || '+880 1811-223344';
  const email = settings?.email || 'info.hasibenterprises@gmail.com';
  const officeAddr = language === 'bn' ? settings?.office_address_bn : settings?.office_address_en;
  const factoryAddr = language === 'bn' ? settings?.factory_address_bn : settings?.factory_address_en;
  const socials = settings?.social_links || {};

  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800/80 text-charcoal-400 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-ember-500">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">HASIB ENTERPRISES</span>
            </div>
            <p className="text-charcoal-400 text-xs leading-relaxed">
              {t.footer.about}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-charcoal-900 border border-charcoal-700 text-ember-400 font-medium">
                {t.footer.tagline}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold tracking-wider text-xs uppercase border-l-2 border-ember-500 pl-2">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold tracking-wider text-xs uppercase border-l-2 border-ember-500 pl-2">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-ember-500 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${phonePrimary.replace(/[^0-9+]/g, '')}`} className="hover:text-white block transition-colors">
                    {phonePrimary}
                  </a>
                  {phoneSecondary && (
                    <a href={`tel:${phoneSecondary.replace(/[^0-9+]/g, '')}`} className="hover:text-white block text-charcoal-500 text-[11px] transition-colors">
                      {phoneSecondary}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ember-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors truncate">
                  {email}
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2">
                  {socials.facebook && (
                    <a
                      href={socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-300 hover:text-white transition-colors text-xs font-bold"
                      title="Facebook"
                    >
                      f
                    </a>
                  )}
                  {socials.whatsapp && (
                    <a
                      href={socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-300 hover:text-green-400 transition-colors text-xs font-bold"
                      title="WhatsApp"
                    >
                      WA
                    </a>
                  )}
                  {socials.youtube && (
                    <a
                      href={socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-300 hover:text-red-400 transition-colors text-xs font-bold"
                      title="YouTube"
                    >
                      YT
                    </a>
                  )}
                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-300 hover:text-blue-400 transition-colors text-xs font-bold"
                      title="LinkedIn"
                    >
                      in
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Addresses */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold tracking-wider text-xs uppercase border-l-2 border-ember-500 pl-2">
              {language === 'bn' ? 'ঠিকানা ও অবস্থান' : 'Locations'}
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Factory className="w-4 h-4 text-ember-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">
                    {language === 'bn' ? 'কয়লা কারখানা:' : 'Plant Location:'}
                  </span>
                  <span className="text-charcoal-400 leading-snug">
                    {factoryAddr || (language === 'bn' ? 'ঘাটাইল, টাঙ্গাইল, বাংলাদেশ' : 'Ghatail, Tangail, Bangladesh')}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-charcoal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">
                    {language === 'bn' ? 'প্রধান অফিস:' : 'Head Office:'}
                  </span>
                  <span className="text-charcoal-400 leading-snug">
                    {officeAddr || (language === 'bn' ? 'মিরপুর, ঢাকা - ১২১৬' : 'Mirpur, Dhaka - 1216')}
                  </span>
                </div>
              </div>
              {settings?.map_embed_url && (
                <div className="pt-1">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ember-400 hover:text-ember-300 text-xs font-medium transition-colors"
                  >
                    <span>{language === 'bn' ? 'গুগল ম্যাপে দেখুন' : 'View on Google Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="flex items-center gap-3">
            <span>{language === 'bn' ? 'সরাসরি নিজস্ব কারখানা থেকে সরবরাহ' : 'Direct from Own Kilns'}</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-charcoal-400 transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
