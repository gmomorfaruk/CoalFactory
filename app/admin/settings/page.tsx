'use client';

import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data/store';
import { SiteSettings } from '@/types';
import { Settings, Save, CheckCircle2, Phone, MapPin, Share2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  if (!settings) {
    return <div className="text-center py-12 text-charcoal-400">Loading settings...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Business Information & Social Links
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Update phone numbers, factory and office addresses, Google Maps embed, and social channels
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Contact Numbers */}
        <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-ember-500" />
            <span>Direct Phone Numbers & WhatsApp</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Primary Phone Number *
              </label>
              <input
                type="text"
                required
                value={settings.phone_primary}
                onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Secondary Phone Number
              </label>
              <input
                type="text"
                value={settings.phone_secondary}
                onChange={(e) => setSettings({ ...settings, phone_secondary: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                WhatsApp Number *
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-charcoal-300 font-semibold block mb-1">
              Official Email Address *
            </label>
            <input
              type="email"
              required
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
            />
          </div>
        </div>

        {/* Addresses */}
        <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-ember-500" />
            <span>Factory & Corporate Office Addresses</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Factory Address (Bangla)
              </label>
              <input
                type="text"
                value={settings.factory_address_bn}
                onChange={(e) => setSettings({ ...settings, factory_address_bn: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Factory Address (English)
              </label>
              <input
                type="text"
                value={settings.factory_address_en}
                onChange={(e) => setSettings({ ...settings, factory_address_en: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Office Address (Bangla)
              </label>
              <input
                type="text"
                value={settings.office_address_bn}
                onChange={(e) => setSettings({ ...settings, office_address_bn: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Office Address (English)
              </label>
              <input
                type="text"
                value={settings.office_address_en}
                onChange={(e) => setSettings({ ...settings, office_address_en: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>
          </div>

          <div className="text-xs pt-2">
            <label className="text-charcoal-300 font-semibold block mb-1">
              Google Maps Embed URL
            </label>
            <input
              type="text"
              value={settings.map_embed_url}
              onChange={(e) => setSettings({ ...settings, map_embed_url: e.target.value })}
              className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-ember-500" />
            <span>Social Media Channels (Leave blank if inactive)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">Facebook Page URL</label>
              <input
                type="url"
                value={settings.social_links.facebook || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/..."
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">WhatsApp Link</label>
              <input
                type="text"
                value={settings.social_links.whatsapp || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, whatsapp: e.target.value }
                })}
                placeholder="https://wa.me/..."
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={settings.social_links.youtube || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, youtube: e.target.value }
                })}
                placeholder="https://youtube.com/..."
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">LinkedIn Page URL</label>
              <input
                type="url"
                value={settings.social_links.linkedin || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/..."
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          {saved && (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </div>
          )}
          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 bg-gradient-to-r from-ember-600 to-ember-500 hover:from-ember-500 hover:to-ember-400 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}
