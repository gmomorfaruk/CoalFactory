'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getProducts, 
  getOrders, 
  getOffers, 
  getMessages, 
  updateOrderStatus 
} from '@/lib/data/store';
import { Product, Order, Offer, ContactMessage, OrderStatus } from '@/types';
import { 
  Package, 
  ShoppingBag, 
  Flame, 
  MessageSquare, 
  Phone, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [p, o, off, m] = await Promise.all([
      getProducts(),
      getOrders(),
      getOffers(),
      getMessages(),
    ]);
    setProducts(p);
    setOrders(o);
    setOffers(off);
    setMessages(m);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('hasib_store_updated', loadData);
    return () => window.removeEventListener('hasib_store_updated', loadData);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    loadData();
  };

  const activeOffersCount = offers.filter(o => o.is_active).length;
  const newOrdersCount = orders.filter(o => o.status === 'New').length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-950 text-blue-400 border-blue-800';
      case 'Contacted':
        return 'bg-purple-950 text-purple-400 border-purple-800';
      case 'Quoted':
        return 'bg-amber-950 text-amber-400 border-amber-800';
      case 'Confirmed':
        return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Completed':
        return 'bg-zinc-900 text-zinc-300 border-zinc-700';
      case 'Cancelled':
        return 'bg-red-950 text-red-400 border-red-800';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Real-time commercial summary for Hasib Enterprises
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>

          <Link
            href="/admin/offers"
            className="inline-flex items-center gap-2 bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
          >
            <Flame className="w-4 h-4 text-ember-400" />
            <span>New Offer</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Products Card */}
        <div className="glass-card rounded-xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
              Products
            </span>
            <div className="p-2 rounded-lg bg-charcoal-850 text-ember-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {products.length}
          </div>
          <p className="text-[11px] text-charcoal-400">
            {products.filter(p => p.published).length} Published in catalog
          </p>
        </div>

        {/* Orders Card */}
        <div className="glass-card rounded-xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
              Inquiries & Orders
            </span>
            <div className="p-2 rounded-lg bg-charcoal-850 text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {orders.length}
          </div>
          <p className="text-[11px] text-ember-400 font-semibold">
            {newOrdersCount} Pending action (New)
          </p>
        </div>

        {/* Offers Card */}
        <div className="glass-card rounded-xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
              Promotions
            </span>
            <div className="p-2 rounded-lg bg-charcoal-850 text-ember-500">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {activeOffersCount}
          </div>
          <p className="text-[11px] text-charcoal-400">
            Active homepage campaigns
          </p>
        </div>

        {/* Messages Card */}
        <div className="glass-card rounded-xl p-5 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
              Inquiries
            </span>
            <div className="p-2 rounded-lg bg-charcoal-850 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {messages.length}
          </div>
          <p className="text-[11px] text-charcoal-400">
            {messages.filter(m => m.status === 'Unread').length} Unread inquiries
          </p>
        </div>

      </div>

      {/* Recent Orders & Pipeline Section */}
      <div className="glass-panel rounded-2xl p-6 border border-charcoal-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Recent Order Requests & Quotations
            </h2>
            <p className="text-xs text-charcoal-400">
              Direct pipeline from the public website
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-ember-400 hover:text-ember-300 flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-10 text-charcoal-500 text-xs">
            No orders submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-charcoal-800 text-charcoal-400 uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-semibold">Customer / Company</th>
                  <th className="pb-3 font-semibold">Product & Quantity</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-charcoal-850/50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-white">{ord.customer_name}</div>
                      {ord.company_name && (
                        <div className="text-charcoal-400 text-[11px]">{ord.company_name}</div>
                      )}
                      <div className="text-charcoal-500 text-[11px]">{ord.phone}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="font-medium text-charcoal-200">{ord.product_name}</div>
                      <div className="text-ember-400 font-semibold text-[11px]">{ord.quantity}</div>
                    </td>
                    <td className="py-3.5 pr-4 text-charcoal-300 max-w-xs truncate">
                      {ord.location}
                    </td>
                    <td className="py-3.5 pr-4 text-charcoal-400 whitespace-nowrap">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 pr-4 whitespace-nowrap">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-charcoal-900 focus:outline-none cursor-pointer ${getStatusBadge(ord.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <a
                          href={`tel:${ord.phone.replace(/[^0-9+]/g, '')}`}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 hover:text-white"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        </a>
                        <a
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 hover:text-white font-bold text-[10px]"
                          title="WhatsApp Customer"
                        >
                          WA
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
