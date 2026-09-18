'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isDemoAdminAuthenticated, setDemoAdminAuthenticated } from '@/lib/data/store';
import { isDemoMode } from '@/lib/supabase/config';
import { 
  LayoutDashboard, 
  Package, 
  Flame, 
  ShoppingBag, 
  Image as ImageIcon, 
  Star, 
  MessageSquare, 
  FolderOpen, 
  Globe, 
  Settings, 
  LogOut, 
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // If on login page, skip authentication check
    if (pathname === '/admin/login') {
      setCheckedAuth(true);
      return;
    }

    if (!isDemoAdminAuthenticated()) {
      router.push('/admin/login');
    } else {
      setCheckedAuth(true);
    }
  }, [pathname, router]);

  // If on login page, render children directly without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!checkedAuth) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-charcoal-400">
        <div className="w-8 h-8 border-2 border-ember-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    setDemoAdminAuthenticated(false);
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/admin/products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { href: '/admin/offers', label: 'Offers', icon: <Flame className="w-4 h-4" /> },
    { href: '/admin/orders', label: 'Orders & Pipeline', icon: <ShoppingBag className="w-4 h-4" /> },
    { href: '/admin/gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { href: '/admin/reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
    { href: '/admin/messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { href: '/admin/media', label: 'Media Library', icon: <FolderOpen className="w-4 h-4" /> },
    { href: '/admin/homepage', label: 'Homepage CMS', icon: <Globe className="w-4 h-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col md:flex-row text-charcoal-200">
      
      {/* Mobile Top Nav for Admin */}
      <div className="md:hidden flex items-center justify-between p-4 bg-charcoal-900 border-b border-charcoal-800">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Flame className="w-5 h-5 text-ember-500" />
          <span>HASIB ADMIN</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg bg-charcoal-800 text-charcoal-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-charcoal-900 border-r border-charcoal-800 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 md:static
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-charcoal-800">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-ember-600/20 text-ember-500 border border-ember-500/30 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white tracking-tight text-sm block">HASIB ENTERPRISES</span>
                <span className="text-[10px] text-charcoal-400 font-semibold tracking-wider uppercase">Management Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-ember-600 text-white shadow-sm'
                      : 'text-charcoal-300 hover:bg-charcoal-850 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Area */}
        <div className="p-4 border-t border-charcoal-800 space-y-3">
          {isDemoMode() && (
            <div className="px-3 py-2 rounded-lg bg-amber-950/50 border border-amber-800/60 text-[11px] text-amber-300 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Demo Mode Active</span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 text-xs font-semibold text-charcoal-300 hover:text-white transition-colors border border-charcoal-700/60"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
