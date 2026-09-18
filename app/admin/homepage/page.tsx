'use client';

import React, { useState, useEffect } from 'react';
import { getHomepageContent, updateHomepageContent } from '@/lib/data/store';
import { HomepageContent } from '@/types';
import { Globe, Save, CheckCircle2, Flame } from 'lucide-react';

export default function AdminHomepageCMSPage() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getHomepageContent().then(setContent);
  }, []);

  if (!content) {
    return <div className="text-center py-12 text-charcoal-400">Loading Homepage CMS...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHomepageContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Homepage CMS & Announcement Bar
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Customize website headlines, top announcement bar, and value propositions without editing code
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. TOP ANNOUNCEMENT BAR */}
        <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-ember-500" />
              <span>Top Announcement Bar</span>
            </h2>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={content.announcement_active}
                onChange={(e) => setContent({ ...content, announcement_active: e.target.checked })}
                className="rounded text-ember-500 bg-charcoal-850 border-charcoal-700"
              />
              <span className="font-semibold text-white">Enable Top Banner</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Bangla Announcement Text
              </label>
              <input
                type="text"
                value={content.announcement_text_bn}
                onChange={(e) => setContent({ ...content, announcement_text_bn: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                English Announcement Text
              </label>
              <input
                type="text"
                value={content.announcement_text_en}
                onChange={(e) => setContent({ ...content, announcement_text_en: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>
          </div>
        </div>

        {/* 2. HERO SECTION CMS */}
        <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-4">
          <h2 className="text-base font-bold text-white border-l-2 border-ember-500 pl-3">
            Hero Section Headlines & Photography
          </h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">
                  Hero Headline (Bangla)
                </label>
                <input
                  type="text"
                  value={content.hero_title_bn}
                  onChange={(e) => setContent({ ...content, hero_title_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">
                  Hero Headline (English)
                </label>
                <input
                  type="text"
                  value={content.hero_title_en}
                  onChange={(e) => setContent({ ...content, hero_title_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">
                  Hero Subtitle Copy (Bangla)
                </label>
                <textarea
                  rows={3}
                  value={content.hero_subtitle_bn}
                  onChange={(e) => setContent({ ...content, hero_subtitle_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">
                  Hero Subtitle Copy (English)
                </label>
                <textarea
                  rows={3}
                  value={content.hero_subtitle_en}
                  onChange={(e) => setContent({ ...content, hero_subtitle_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="text-charcoal-300 font-semibold block mb-1">
                Hero Large Factory Image URL
              </label>
              <input
                type="text"
                value={content.hero_image_url}
                onChange={(e) => setContent({ ...content, hero_image_url: e.target.value })}
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
              />
            </div>
          </div>
        </div>

        {/* 3. WHY CHOOSE US ITEMS */}
        <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-4">
          <h2 className="text-base font-bold text-white border-l-2 border-ember-500 pl-3">
            Why Choose Hasib Enterprises (4 Pillars)
          </h2>

          <div className="space-y-6">
            {content.why_us_items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-charcoal-850 border border-charcoal-700/80 space-y-3 text-xs">
                <div className="font-bold text-ember-400">Pillar {idx + 1}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Title (English)"
                    value={item.title_en}
                    onChange={(e) => {
                      const updated = [...content.why_us_items];
                      updated[idx].title_en = e.target.value;
                      setContent({ ...content, why_us_items: updated });
                    }}
                    className="bg-charcoal-900 border border-charcoal-700 rounded p-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Title (Bangla)"
                    value={item.title_bn}
                    onChange={(e) => {
                      const updated = [...content.why_us_items];
                      updated[idx].title_bn = e.target.value;
                      setContent({ ...content, why_us_items: updated });
                    }}
                    className="bg-charcoal-900 border border-charcoal-700 rounded p-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <textarea
                    rows={2}
                    placeholder="Description (English)"
                    value={item.description_en}
                    onChange={(e) => {
                      const updated = [...content.why_us_items];
                      updated[idx].description_en = e.target.value;
                      setContent({ ...content, why_us_items: updated });
                    }}
                    className="bg-charcoal-900 border border-charcoal-700 rounded p-2 text-white resize-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Description (Bangla)"
                    value={item.description_bn}
                    onChange={(e) => {
                      const updated = [...content.why_us_items];
                      updated[idx].description_bn = e.target.value;
                      setContent({ ...content, why_us_items: updated });
                    }}
                    className="bg-charcoal-900 border border-charcoal-700 rounded p-2 text-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          {saved && (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Homepage content saved and live!</span>
            </div>
          )}
          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 bg-gradient-to-r from-ember-600 to-ember-500 hover:from-ember-500 hover:to-ember-400 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
}
