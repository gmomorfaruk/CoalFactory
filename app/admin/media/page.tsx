'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMediaItems, addMediaItem, deleteMediaItem } from '@/lib/data/store';
import { MediaItem } from '@/types';
import { FolderOpen, Plus, Copy, Check, Trash2, ExternalLink } from 'lucide-react';

export default function AdminMediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newCategory, setNewCategory] = useState('Product');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = async () => {
    const list = await getMediaItems();
    setMedia(list);
  };

  useEffect(() => {
    loadMedia();
    window.addEventListener('hasib_store_updated', loadMedia);
    return () => window.removeEventListener('hasib_store_updated', loadMedia);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    await addMediaItem({
      file_name: newFileName || `charcoal-asset-${Date.now()}.jpg`,
      file_url: newUrl,
      category: newCategory,
      file_size: 450000,
    });

    setNewUrl('');
    setNewFileName('');
    loadMedia();
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remove this media asset?')) {
      await deleteMediaItem(id);
      loadMedia();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Central Media Library
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Store product photos, factory kilns, banners and customer images to reuse anywhere across the website
        </p>
      </div>

      {/* Add Media Box */}
      <div className="glass-panel rounded-2xl p-6 border border-charcoal-800">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-ember-500" />
          <span>Add Media Asset / Image URL</span>
        </h3>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-5">
            <input
              type="text"
              required
              placeholder="Image URL (Unsplash or Supabase Storage URL)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="text"
              placeholder="Asset title or file name (e.g. bbq-lump.jpg)"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
            />
          </div>

          <div className="sm:col-span-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
            >
              <option value="Product">Product</option>
              <option value="Factory">Factory</option>
              <option value="Banner">Banner</option>
              <option value="Customer">Customer</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-ember-600 hover:bg-ember-500 text-white font-semibold transition-colors"
            >
              Add to Library
            </button>
          </div>
        </form>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {media.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-xl overflow-hidden border border-charcoal-800 flex flex-col justify-between group"
          >
            <div className="relative h-44 w-full bg-charcoal-900">
              <Image
                src={item.file_url}
                alt={item.file_name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-charcoal-950/80 text-[10px] uppercase font-bold text-ember-400 px-2 py-0.5 rounded border border-charcoal-700">
                {item.category}
              </div>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="text-xs font-semibold text-white truncate" title={item.file_name}>
                {item.file_name}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-charcoal-800 text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.file_url)}
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded transition-colors ${
                    copiedId === item.id
                      ? 'bg-emerald-900 text-emerald-300'
                      : 'bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 hover:text-white'
                  }`}
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded text-red-400 hover:bg-charcoal-800"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
