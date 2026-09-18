'use client';

import React, { useState, useEffect } from 'react';
import { getMessages, updateMessageStatus } from '@/lib/data/store';
import { ContactMessage } from '@/types';
import { MessageSquare, Phone, Mail, CheckCircle2, Clock } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const loadMessages = async () => {
    const list = await getMessages();
    setMessages(list);
  };

  useEffect(() => {
    loadMessages();
    window.addEventListener('hasib_store_updated', loadMessages);
    return () => window.removeEventListener('hasib_store_updated', loadMessages);
  }, []);

  const handleStatus = async (id: string, status: 'Unread' | 'Read' | 'Replied') => {
    await updateMessageStatus(id, status);
    loadMessages();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Inquiries Inbox
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          General contact inquiries sent via the public contact form
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-charcoal-500 text-xs">
            No contact inquiries currently in inbox.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-panel rounded-2xl p-6 border transition-all ${
                msg.status === 'Unread' ? 'border-ember-500/50 bg-charcoal-900' : 'border-charcoal-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${msg.status === 'Unread' ? 'bg-ember-500' : 'bg-charcoal-600'}`} />
                  <div>
                    <h3 className="text-sm font-bold text-white">{msg.name}</h3>
                    <div className="flex items-center gap-3 text-charcoal-400 text-xs">
                      <span>{msg.phone}</span>
                      {msg.email && <span>• {msg.email}</span>}
                      <span>• {new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={msg.status}
                    onChange={(e) => handleStatus(msg.id, e.target.value as any)}
                    className="text-[11px] font-bold px-3 py-1 rounded bg-charcoal-850 border border-charcoal-700 text-charcoal-300 focus:outline-none"
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                  </select>

                  <a
                    href={`tel:${msg.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-1.5 rounded bg-charcoal-800 hover:bg-charcoal-700 text-emerald-400"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800"
                  >
                    WA
                  </a>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-semibold text-ember-400 mb-1">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs text-charcoal-300 leading-relaxed bg-charcoal-950/60 p-3.5 rounded-xl border border-charcoal-850">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
