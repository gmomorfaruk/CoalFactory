'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProducts, saveProduct, deleteProduct } from '@/lib/data/store';
import { Product, AvailabilityStatus } from '@/types';
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  ExternalLink, 
  Flame 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener('hasib_store_updated', loadProducts);
    return () => window.removeEventListener('hasib_store_updated', loadProducts);
  }, []);

  const handleOpenNew = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      slug: '',
      name_bn: '',
      name_en: '',
      description_bn: '',
      description_en: '',
      price: 85,
      offer_price: null,
      unit: 'kg',
      availability: 'Available',
      specifications: {
        carbonContent: '80%+',
        moisture: '< 4%',
        ash: '< 3%',
        burnDuration: '4 Hours',
        heatValue: '7,200 kcal/kg',
      },
      packaging_bn: '২৫ ও ৫০ কেজি বস্তা',
      packaging_en: '25kg & 50kg sacks',
      applications_bn: 'রেস্তোরাঁ ও কাবাব গ্রিল',
      applications_en: 'Commercial grilling and restaurants',
      image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
      is_featured: true,
      published: true,
      display_order: products.length + 1,
    });
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Auto-generate slug if empty
    let slug = editingProduct.slug;
    if (!slug) {
      slug = (editingProduct.name_en || editingProduct.name_bn)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    await saveProduct({ ...editingProduct, slug });
    setEditingProduct(null);
    setIsNew(false);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  // Quick 1-click price update directly on table!
  const handleInlinePriceChange = async (product: Product, newPrice: number) => {
    await saveProduct({ ...product, price: newPrice });
    loadProducts();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Products Management
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Add, edit prices, change availability, and control website catalog
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="glass-panel rounded-2xl p-6 border border-charcoal-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-charcoal-800 text-charcoal-400 uppercase tracking-wider">
              <tr>
                <th className="pb-3 font-semibold">Image</th>
                <th className="pb-3 font-semibold">Product Name</th>
                <th className="pb-3 font-semibold">Regular Price</th>
                <th className="pb-3 font-semibold">Offer Price</th>
                <th className="pb-3 font-semibold">Availability</th>
                <th className="pb-3 font-semibold">Featured</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-charcoal-850/50 transition-colors">
                  <td className="py-3 pr-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-charcoal-700 bg-charcoal-900">
                      <Image
                        src={prod.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop'}
                        alt={prod.name_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="py-3 pr-3">
                    <div className="font-bold text-white text-sm">{prod.name_en}</div>
                    <div className="text-charcoal-400 text-[11px]">{prod.name_bn}</div>
                    <div className="text-charcoal-500 text-[10px]">Slug: /products/{prod.slug}</div>
                  </td>

                  <td className="py-3 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-charcoal-400">৳</span>
                      <input
                        type="number"
                        defaultValue={prod.price}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val !== prod.price) {
                            handleInlinePriceChange(prod, val);
                          }
                        }}
                        className="w-16 bg-charcoal-900 border border-charcoal-700 rounded px-2 py-1 text-white font-bold focus:border-ember-500 focus:outline-none"
                      />
                      <span className="text-charcoal-500 text-[11px]">/{prod.unit}</span>
                    </div>
                  </td>

                  <td className="py-3 pr-3 whitespace-nowrap">
                    {prod.offer_price ? (
                      <span className="text-ember-400 font-bold">
                        ৳{prod.offer_price}
                      </span>
                    ) : (
                      <span className="text-charcoal-600">—</span>
                    )}
                  </td>

                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-charcoal-850 border border-charcoal-700 text-charcoal-300">
                      {prod.availability}
                    </span>
                  </td>

                  <td className="py-3 pr-3 whitespace-nowrap">
                    {prod.is_featured ? (
                      <span className="text-ember-400 font-bold text-[11px]">Yes</span>
                    ) : (
                      <span className="text-charcoal-500 text-[11px]">No</span>
                    )}
                  </td>

                  <td className="py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 rounded bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 hover:text-white"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsNew(false);
                        }}
                        className="p-1.5 rounded bg-charcoal-800 hover:bg-charcoal-700 text-ember-400 hover:text-ember-300"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded bg-charcoal-800 hover:bg-charcoal-700 text-red-400 hover:text-red-300"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {isNew ? 'Add New Product' : `Edit Product: ${editingProduct.name_en}`}
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-charcoal-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name_en}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name_en: e.target.value })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    Bangla Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name_bn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name_bn: e.target.value })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    Regular Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>

                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    Offer Price (৳) (Optional)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.offer_price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, offer_price: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="Leave blank if none"
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>

                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    Unit (e.g. kg, 50kg bag)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    Availability Status
                  </label>
                  <select
                    value={editingProduct.availability}
                    onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value as AvailabilityStatus })}
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Limited Availability">Limited Availability</option>
                    <option value="Made to Order">Made to Order</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>

                <div>
                  <label className="text-charcoal-300 font-semibold block mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.image_url}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">
                  Bangla Description
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description_bn}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description_bn: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div>
                <label className="text-charcoal-300 font-semibold block mb-1">
                  English Description
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description_en}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description_en: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-ember-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_featured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    className="rounded text-ember-500 bg-charcoal-850 border-charcoal-700"
                  />
                  <span className="text-charcoal-200">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.published}
                    onChange={(e) => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                    className="rounded text-ember-500 bg-charcoal-850 border-charcoal-700"
                  />
                  <span className="text-charcoal-200">Published in Catalog</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ember-600 hover:bg-ember-500 text-white font-semibold"
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
