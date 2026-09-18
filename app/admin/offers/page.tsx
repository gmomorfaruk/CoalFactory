'use client';

import React, { useState, useEffect } from 'react';
import { getOffers, saveOffer, deleteOffer } from '@/lib/data/store';
import { Offer } from '@/types';
import { Flame, Plus, Edit2, Trash2, CheckCircle2, XCircle, X } from 'lucide-react';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const loadOffers = async () => {
    const list = await getOffers();
    setOffers(list);
  };

  useEffect(() => {
    loadOffers();
    window.addEventListener('hasib_store_updated', loadOffers);
    return () => window.removeEventListener('hasib_store_updated', loadOffers);
  }, []);

  const handleOpenNew = () => {
    setEditingOffer({
      id: `offer-${Date.now()}`,
      title_bn: '🔥 নতুন বিশেষ অফার',
      title_en: '🔥 New Special Bulk Offer',
      description_bn: 'নির্দিষ্ট পরিমাণ অর্ডারে বিশেষ ছাড়। সরাসরি কারখানা থেকে দ্রুত সরবরাহ।',
      description_en: 'Special volume discount on qualifying wholesale orders. Direct from factory.',
      original_price: 90,
      offer_price: 80,
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      is_active: true,
      created_at: new Date().toISOString(),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;
    await saveOffer(editingOffer);
    setEditingOffer(null);
    loadOffers();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this offer?')) {
      await deleteOffer(id);
      loadOffers();
    }
  };

  const toggleActive = async (offer: Offer) => {
    await saveOffer({ ...offer, is_active: !offer.is_active });
    loadOffers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Special Offers & Campaigns
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Create and schedule promotional discounts shown on the homepage
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`glass-panel rounded-2xl p-6 border transition-all ${
              offer.is_active ? 'border-ember-600/60 bg-charcoal-900/90' : 'border-charcoal-800 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${offer.is_active ? 'text-ember-500' : 'text-charcoal-600'}`} />
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                  offer.is_active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-charcoal-800 text-charcoal-400'
                }`}>
                  {offer.is_active ? 'Active on Homepage' : 'Inactive / Paused'}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingOffer(offer)}
                  className="p-1.5 rounded hover:bg-charcoal-800 text-charcoal-300 hover:text-white"
                  title="Edit Offer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="p-1.5 rounded hover:bg-charcoal-800 text-red-400 hover:text-red-300"
                  title="Delete Offer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{offer.title_en}</h3>
            <p className="text-xs text-charcoal-400 mb-2 font-medium">{offer.title_bn}</p>
            <p className="text-xs text-charcoal-300 mb-4 line-clamp-2">{offer.description_en}</p>

            <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-ember-400">৳{offer.offer_price}</span>
                {offer.original_price && (
                  <span className="text-sm text-charcoal-500 line-through">৳{offer.original_price}</span>
                )}
                <span className="text-xs text-charcoal-400">/kg</span>
              </div>

              <button
                onClick={() => toggleActive(offer)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  offer.is_active
                    ? 'bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300'
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                }`}
              >
                {offer.is_active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h2 className="text-base font-bold text-white">Edit Promotional Offer</h2>
              <button onClick={() => setEditingOffer(null)} className="text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={editingOffer.title_en}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Title (Bangla) *</label>
                <input
                  type="text"
                  required
                  value={editingOffer.title_bn}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Offer Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={editingOffer.offer_price}
                    onChange={(e) => setEditingOffer({ ...editingOffer, offer_price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Original Price (৳)</label>
                  <input
                    type="number"
                    value={editingOffer.original_price || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, original_price: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editingOffer.description_en}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Description (Bangla)</label>
                <textarea
                  rows={2}
                  value={editingOffer.description_bn}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="offer-active"
                  checked={editingOffer.is_active}
                  onChange={(e) => setEditingOffer({ ...editingOffer, is_active: e.target.checked })}
                  className="rounded text-ember-500 bg-charcoal-850 border-charcoal-700"
                />
                <label htmlFor="offer-active" className="text-charcoal-200 cursor-pointer">
                  Activate and display on Homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="px-4 py-2 rounded-lg bg-charcoal-800 text-charcoal-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ember-600 hover:bg-ember-500 text-white font-semibold"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
