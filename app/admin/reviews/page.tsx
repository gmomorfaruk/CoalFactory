'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getReviews, saveReview, deleteReview } from '@/lib/data/store';
import { Review } from '@/types';
import { Star, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const loadReviews = async () => {
    const list = await getReviews();
    setReviews(list);
  };

  useEffect(() => {
    loadReviews();
    window.addEventListener('hasib_store_updated', loadReviews);
    return () => window.removeEventListener('hasib_store_updated', loadReviews);
  }, []);

  const handleOpenNew = () => {
    setEditingReview({
      id: `rev-${Date.now()}`,
      customer_name: '',
      business_name: '',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      review_bn: '',
      review_en: '',
      rating: 5,
      is_featured_home: true,
      published: true,
      created_at: new Date().toISOString()
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    await saveReview(editingReview);
    setEditingReview(null);
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this customer review?')) {
      await deleteReview(id);
      loadReviews();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Manage genuine client reviews displayed on the Gallery page and public trust sections
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-panel rounded-2xl p-5 border border-charcoal-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingReview(rev)}
                    className="p-1 rounded hover:bg-charcoal-800 text-charcoal-300"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1 rounded hover:bg-charcoal-800 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-charcoal-300 leading-relaxed line-clamp-3 italic">
                "{rev.review_bn}"
              </p>
            </div>

            <div className="pt-3 border-t border-charcoal-800 flex items-center gap-3">
              {rev.photo_url ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-charcoal-700 shrink-0">
                  <Image src={rev.photo_url} alt={rev.customer_name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-charcoal-800 flex items-center justify-center font-bold text-xs text-white shrink-0">
                  {rev.customer_name[0]}
                </div>
              )}
              <div className="min-w-0">
                <div className="font-bold text-white text-xs truncate">{rev.customer_name}</div>
                <div className="text-[11px] text-ember-400 truncate">{rev.business_name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h2 className="text-base font-bold text-white">Edit Customer Review</h2>
              <button onClick={() => setEditingReview(null)} className="text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={editingReview.customer_name}
                    onChange={(e) => setEditingReview({ ...editingReview, customer_name: e.target.value })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={editingReview.business_name || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, business_name: e.target.value })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={editingReview.photo_url || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, photo_url: e.target.value })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Review Text (Bangla) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingReview.review_bn}
                  onChange={(e) => setEditingReview({ ...editingReview, review_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Review Text (English)</label>
                <textarea
                  rows={2}
                  value={editingReview.review_en || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, review_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-lg bg-charcoal-800 text-charcoal-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ember-600 hover:bg-ember-500 text-white font-semibold"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
