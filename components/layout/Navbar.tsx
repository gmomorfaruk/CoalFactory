'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { getSiteSettings } from '@/lib/data/store';
import { SiteSettings } from '@/types';
import { Phone, Menu, X, Flame, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
    const handleUpdate = () => getSiteSettings().then(setSettings);
    window.addEventListener('hasib_store_updated', handleUpdate);
    return () => window.removeEventListener('hasib_store_updated', handleUpdate);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/gallery', label: t.nav.gallery },
    { href: '/contact', label: t.nav.contact },
  ];

  const primaryPhone = settings?.phone_primary || '+880 1711-223344';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-charcoal-700/60 bg-charcoal-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-ember-500 shadow-md group-hover:border-ember-500/50 group-hover:text-ember-400 transition-all">
              <Flame className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-ember-400 transition-colors">
                HASIB <span className="text-ember-500 font-light">ENTERPRISES</span>
              </span>
              <span className="text-[11px] text-charcoal-400 tracking-wider uppercase font-medium">
                {language === 'bn' ? 'কাঠের কয়লা কারখানা ও সরবরাহ' : 'Wood Charcoal Manufacturer'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'text-ember-400 bg-charcoal-850 border border-charcoal-700/80 shadow-sm'
                      : 'text-charcoal-300 hover:text-white hover:bg-charcoal-850/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-charcoal-900 border border-charcoal-700 rounded-lg p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'bn'
                    ? 'bg-ember-600 text-white shadow-sm'
                    : 'text-charcoal-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-ember-600 text-white shadow-sm'
                    : 'text-charcoal-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct Call CTA */}
            <a
              href={`tel:${primaryPhone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-ember-600 to-ember-500 hover:from-ember-500 hover:to-ember-400 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-ember-glow transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.callNow}</span>
            </a>

            {/* Admin Discreet Portal Link */}
            <Link
              href="/admin"
              className="text-charcoal-500 hover:text-charcoal-300 transition-colors p-1.5 rounded"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Trigger & Language Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center bg-charcoal-900 border border-charcoal-700 rounded-lg p-0.5 text-xs font-semibold mr-1">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 rounded ${
                  language === 'bn' ? 'bg-ember-600 text-white' : 'text-charcoal-400'
                }`}
              >
                বাং
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded ${
                  language === 'en' ? 'bg-ember-600 text-white' : 'text-charcoal-400'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-charcoal-300 hover:text-white hover:bg-charcoal-850 border border-charcoal-700/60"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-charcoal-700 bg-charcoal-950/98 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-charcoal-850 text-ember-400 border border-charcoal-700'
                    : 'text-charcoal-200 hover:bg-charcoal-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-charcoal-800 space-y-2">
            <a
              href={`tel:${primaryPhone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 bg-ember-600 hover:bg-ember-500 text-white font-semibold py-3 rounded-lg shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.callNow}: {primaryPhone}</span>
            </a>

            <div className="text-center pt-2">
              <Link
                href="/admin"
                className="text-xs text-charcoal-400 hover:text-charcoal-200"
              >
                Admin Control Panel
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
