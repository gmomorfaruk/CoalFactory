'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { isDemoMode } from '@/lib/supabase/config';
import { isDemoAdminAuthenticated, setDemoAdminAuthenticated } from '@/lib/data/store';
import { Flame, Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const demoActive = isDemoMode();

  useEffect(() => {
    // If already logged in, go directly to admin
    if (isDemoAdminAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // If Supabase is configured, use Supabase Auth
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      setDemoAdminAuthenticated(true);
      router.push('/admin');
      return;
    }

    // Demo Mode fallback authentication
    if (email === 'admin@hasib.com' && password === 'admin123') {
      setDemoAdminAuthenticated(true);
      router.push('/admin');
    } else {
      setErrorMsg('Invalid email or password. In Demo Mode, use: admin@hasib.com / admin123, or click Quick Demo Access below.');
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setDemoAdminAuthenticated(true);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-coal-grid">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-ember-500 mx-auto mb-4 shadow-xl">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          HASIB ENTERPRISES
        </h2>
        <p className="text-xs text-charcoal-400 mt-1 uppercase tracking-widest font-semibold">
          Admin Control Center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="glass-panel py-8 px-6 sm:px-10 rounded-2xl border border-charcoal-800 shadow-2xl space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs leading-relaxed">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-charcoal-300 block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hasib.com"
                  className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-charcoal-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-ember-600 to-ember-500 hover:from-ember-500 hover:to-ember-400 text-white font-bold text-sm shadow-md hover:shadow-ember-glow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          {demoActive && (
            <div className="pt-4 border-t border-charcoal-800 text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Development Demo Mode Active</span>
              </div>
              <p className="text-[11px] text-charcoal-400">
                You can test without credentials using pre-seeded charcoal business data:
              </p>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-ember-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Quick 1-Click Demo Login</span>
              </button>
            </div>
          )}

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-charcoal-400 hover:text-white transition-colors"
            >
              ← Back to Public Website
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
