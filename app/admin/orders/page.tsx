'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/data/store';
import { Order, OrderStatus } from '@/types';
import { ShoppingBag, Phone, MessageSquare, Search, Filter, Calendar } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadOrders = async () => {
    const list = await getOrders();
    setOrders(list);
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('hasib_store_updated', loadOrders);
    return () => window.removeEventListener('hasib_store_updated', loadOrders);
  }, []);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  const filteredOrders = orders.filter((ord) => {
    if (selectedStatus !== 'All' && ord.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = ord.customer_name.toLowerCase().includes(q);
      const matchCompany = ord.company_name?.toLowerCase().includes(q);
      const matchPhone = ord.phone.includes(q);
      const matchProduct = ord.product_name?.toLowerCase().includes(q);
      if (!matchName && !matchCompany && !matchPhone && !matchProduct) return false;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-950 text-blue-400 border-blue-800';
      case 'Contacted': return 'bg-purple-950 text-purple-400 border-purple-800';
      case 'Quoted': return 'bg-amber-950 text-amber-400 border-amber-800';
      case 'Confirmed': return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Completed': return 'bg-zinc-900 text-zinc-300 border-zinc-700';
      case 'Cancelled': return 'bg-red-950 text-red-400 border-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Orders & Inquiries Pipeline
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Track customer order submissions, update quote status, and initiate direct follow-ups
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer, company, phone or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ember-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'New', 'Contacted', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-ember-600 text-white'
                  : 'bg-charcoal-900 text-charcoal-400 hover:text-white border border-charcoal-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="glass-panel rounded-2xl p-6 border border-charcoal-800">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-charcoal-500 text-xs">
            No matching orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-charcoal-800 text-charcoal-400 uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-semibold">Customer & Business</th>
                  <th className="pb-3 font-semibold">Product & Volume</th>
                  <th className="pb-3 font-semibold">Location & Notes</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-charcoal-850/50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-white text-sm">{ord.customer_name}</div>
                      {ord.company_name && (
                        <div className="text-charcoal-400 font-medium text-[11px]">{ord.company_name}</div>
                      )}
                      <div className="text-charcoal-500 text-[11px]">{ord.phone}</div>
                      {ord.email && <div className="text-charcoal-500 text-[10px]">{ord.email}</div>}
                    </td>

                    <td className="py-3.5 pr-4">
                      <div className="font-semibold text-charcoal-200">{ord.product_name}</div>
                      <div className="text-ember-400 font-bold text-xs mt-0.5">{ord.quantity}</div>
                    </td>

                    <td className="py-3.5 pr-4 max-w-xs">
                      <div className="text-charcoal-300 font-medium">{ord.location}</div>
                      {ord.notes && (
                        <div className="text-charcoal-500 text-[11px] italic mt-0.5 line-clamp-2">
                          "{ord.notes}"
                        </div>
                      )}
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
                          className="px-2.5 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-white flex items-center gap-1.5 font-semibold text-[11px]"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Call</span>
                        </a>

                        <a
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-semibold text-[11px]"
                        >
                          WhatsApp
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
