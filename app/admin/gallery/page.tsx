'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGallery, saveGalleryItem, deleteGalleryItem } from '@/lib/data/store';
import { GalleryItem, GalleryCategory } from '@/types';
import { Plus, Trash2, Edit2, Image as ImageIcon, CheckCircle, X } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const loadGallery = async () => {
    const list = await getGallery();
    setItems(list);
  };

  useEffect(() => {
    loadGallery();
    window.addEventListener('hasib_store_updated', loadGallery);
    return () => window.removeEventListener('hasib_store_updated', loadGallery);
  }, []);

  const handleOpenNew = () => {
    setEditingItem({
      id: `gal-${Date.now()}`,
      title_bn: '',
      title_en: '',
      description_bn: '',
      description_en: '',
      image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
      category: 'Factory',
      display_order: items.length + 1,
      is_featured: false,
      published: true,
      created_at: new Date().toISOString()
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    await saveGalleryItem(editingItem);
    setEditingItem(null);
    loadGallery();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this gallery photo?')) {
      await deleteGalleryItem(id);
      loadGallery();
    }
  };

  const toggleFeatured = async (item: GalleryItem) => {
    await saveGalleryItem({ ...item, is_featured: !item.is_featured });
    loadGallery();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gallery Management
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Upload and categorize factory photos, production shots, packaging, and toggle homepage preview
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-2xl overflow-hidden border border-charcoal-800 flex flex-col justify-between"
          >
            <div className="relative h-48 w-full bg-charcoal-900">
              <Image
                src={item.image_url}
                alt={item.title_en || 'Charcoal Factory Photo'}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/80 backdrop-blur-sm text-[10px] uppercase font-bold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                {item.category}
              </div>

              {item.is_featured && (
                <div className="absolute top-2 right-2 bg-ember-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Homepage Preview
                </div>
              )}
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{item.title_en || 'Untitled'}</h4>
                <p className="text-charcoal-400 text-xs line-clamp-1">{item.title_bn}</p>
                {item.description_en && (
                  <p className="text-charcoal-500 text-[11px] mt-1 line-clamp-2">{item.description_en}</p>
                )}
              </div>

              <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => toggleFeatured(item)}
                  className={`text-[11px] font-semibold px-2 py-1 rounded transition-colors ${
                    item.is_featured
                      ? 'bg-ember-600/20 text-ember-400 border border-ember-500/40'
                      : 'bg-charcoal-800 text-charcoal-400 hover:text-white'
                  }`}
                >
                  {item.is_featured ? '★ Homepage' : '☆ Make Homepage'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1 rounded hover:bg-charcoal-800 text-charcoal-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded hover:bg-charcoal-800 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h2 className="text-base font-bold text-white">Edit Gallery Visual</h2>
              <button onClick={() => setEditingItem(null)} className="text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={editingItem.image_url}
                  onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Category *</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as GalleryCategory })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  >
                    <option value="Factory">Factory</option>
                    <option value="Products">Products</option>
                    <option value="Production">Production</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Customers">Customers</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.display_order}
                    onChange={(e) => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Title (English)</label>
                <input
                  type="text"
                  value={editingItem.title_en || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">Title (Bangla)</label>
                <input
                  type="text"
                  value={editingItem.title_bn || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_featured}
                    onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked })}
                    className="rounded text-ember-500 bg-charcoal-850 border-charcoal-700"
                  />
                  <span className="text-charcoal-200">Show on Homepage (Featured 4)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="rounded text-ember-500 bg-charcoal-850 border-charcoal-700"
                  />
                  <span className="text-charcoal-200">Published in Gallery</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg bg-charcoal-800 text-charcoal-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ember-600 hover:bg-ember-500 text-white font-semibold"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
