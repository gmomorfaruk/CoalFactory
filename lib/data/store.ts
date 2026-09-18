'use client';

import { 
  Product, 
  Offer, 
  Order, 
  OrderStatus, 
  GalleryItem, 
  Review, 
  ContactMessage, 
  HomepageContent, 
  SiteSettings, 
  MediaItem 
} from '@/types';
import { 
  initialProducts, 
  initialOffers, 
  initialGallery, 
  initialReviews, 
  initialOrders, 
  initialMessages, 
  initialHomepageContent, 
  initialSiteSettings,
  initialMediaItems 
} from './initialData';
import { isDemoMode } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/client';

const STORAGE_KEYS = {
  PRODUCTS: 'hasib_products_v2',
  OFFERS: 'hasib_offers_v2',
  ORDERS: 'hasib_orders_v1',
  GALLERY: 'hasib_gallery_v2',
  REVIEWS: 'hasib_reviews_v2',
  MESSAGES: 'hasib_messages_v1',
  HOMEPAGE: 'hasib_homepage_v2',
  SETTINGS: 'hasib_settings_v3',
  MEDIA: 'hasib_media_v2',
  AUTH: 'hasib_admin_auth_v1'
};

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Error reading localStorage key', key, e);
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('hasib_store_updated'));
  } catch (e) {
    console.error('Error setting localStorage key', key, e);
  }
}

// ----------------------------------------------------
// PRODUCTS
// ----------------------------------------------------
export async function getProducts(): Promise<Product[]> {
  if (isDemoMode()) {
    return getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  }
  const supabase = createClient();
  if (!supabase) return initialProducts;
  const { data, error } = await supabase.from('products').select('*').order('display_order', { ascending: true });
  if (error || !data) return getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
}

export async function saveProduct(product: Product): Promise<Product> {
  if (isDemoMode()) {
    const products = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    const existingIndex = products.findIndex(p => p.id === product.id);
    let updated: Product[];
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = { ...product, updated_at: new Date().toISOString() };
    } else {
      updated = [{ ...product, id: product.id || `prod-${Date.now()}`, created_at: new Date().toISOString() }, ...products];
    }
    setLocal(STORAGE_KEYS.PRODUCTS, updated);
    return product;
  }

  const supabase = createClient();
  if (!supabase) throw new Error('Supabase client unavailable');
  const { data, error } = await supabase.from('products').upsert(product).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  if (isDemoMode()) {
    const products = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    const filtered = products.filter(p => p.id !== id);
    setLocal(STORAGE_KEYS.PRODUCTS, filtered);
    return;
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.from('products').delete().eq('id', id);
  }
}

// ----------------------------------------------------
// OFFERS
// ----------------------------------------------------
export async function getOffers(): Promise<Offer[]> {
  if (isDemoMode()) {
    return getLocal<Offer[]>(STORAGE_KEYS.OFFERS, initialOffers);
  }
  const supabase = createClient();
  if (!supabase) return initialOffers;
  const { data } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
  return data || initialOffers;
}

export async function getActiveOffer(): Promise<Offer | null> {
  const offers = await getOffers();
  return offers.find(o => o.is_active) || null;
}

export async function saveOffer(offer: Offer): Promise<Offer> {
  if (isDemoMode()) {
    const offers = getLocal<Offer[]>(STORAGE_KEYS.OFFERS, initialOffers);
    const idx = offers.findIndex(o => o.id === offer.id);
    let updated: Offer[];
    if (idx >= 0) {
      updated = [...offers];
      updated[idx] = offer;
    } else {
      updated = [{ ...offer, id: offer.id || `offer-${Date.now()}` }, ...offers];
    }
    setLocal(STORAGE_KEYS.OFFERS, updated);
    return offer;
  }
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase unavailable');
  const { data, error } = await supabase.from('offers').upsert(offer).select().single();
  if (error) throw error;
  return data;
}

export async function deleteOffer(id: string): Promise<void> {
  if (isDemoMode()) {
    const offers = getLocal<Offer[]>(STORAGE_KEYS.OFFERS, initialOffers);
    setLocal(STORAGE_KEYS.OFFERS, offers.filter(o => o.id !== id));
    return;
  }
  const supabase = createClient();
  if (supabase) await supabase.from('offers').delete().eq('id', id);
}

// ----------------------------------------------------
// ORDERS & INQUIRIES
// ----------------------------------------------------
export async function getOrders(): Promise<Order[]> {
  if (isDemoMode()) {
    return getLocal<Order[]>(STORAGE_KEYS.ORDERS, initialOrders);
  }
  const supabase = createClient();
  if (!supabase) return initialOrders;
  const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  return data || initialOrders;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order> {
  const newOrder: Order = {
    ...order,
    id: `ord-${Date.now()}`,
    status: 'New',
    created_at: new Date().toISOString()
  };

  if (isDemoMode()) {
    const orders = getLocal<Order[]>(STORAGE_KEYS.ORDERS, initialOrders);
    setLocal(STORAGE_KEYS.ORDERS, [newOrder, ...orders]);
    return newOrder;
  }

  const supabase = createClient();
  if (!supabase) {
    const orders = getLocal<Order[]>(STORAGE_KEYS.ORDERS, initialOrders);
    setLocal(STORAGE_KEYS.ORDERS, [newOrder, ...orders]);
    return newOrder;
  }

  const { data, error } = await supabase.from('orders').insert([newOrder]).select().single();
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  if (isDemoMode()) {
    const orders = getLocal<Order[]>(STORAGE_KEYS.ORDERS, initialOrders);
    const updated = orders.map(o => o.id === id ? { ...o, status, updated_at: new Date().toISOString() } : o);
    setLocal(STORAGE_KEYS.ORDERS, updated);
    return;
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  }
}

// ----------------------------------------------------
// GALLERY
// ----------------------------------------------------
export async function getGallery(): Promise<GalleryItem[]> {
  if (isDemoMode()) {
    return getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
  }
  const supabase = createClient();
  if (!supabase) return initialGallery;
  const { data } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
  return data || initialGallery;
}

export async function saveGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  if (isDemoMode()) {
    const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    const idx = gallery.findIndex(g => g.id === item.id);
    let updated: GalleryItem[];
    if (idx >= 0) {
      updated = [...gallery];
      updated[idx] = item;
    } else {
      updated = [{ ...item, id: item.id || `gal-${Date.now()}` }, ...gallery];
    }
    setLocal(STORAGE_KEYS.GALLERY, updated);
    return item;
  }
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase client unavailable');
  const { data, error } = await supabase.from('gallery').upsert(item).select().single();
  if (error) throw error;
  return data;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  if (isDemoMode()) {
    const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    setLocal(STORAGE_KEYS.GALLERY, gallery.filter(g => g.id !== id));
    return;
  }
  const supabase = createClient();
  if (supabase) await supabase.from('gallery').delete().eq('id', id);
}

// ----------------------------------------------------
// REVIEWS
// ----------------------------------------------------
export async function getReviews(): Promise<Review[]> {
  if (isDemoMode()) {
    return getLocal<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
  }
  const supabase = createClient();
  if (!supabase) return initialReviews;
  const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
  return data || initialReviews;
}

export async function saveReview(review: Review): Promise<Review> {
  if (isDemoMode()) {
    const reviews = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
    const idx = reviews.findIndex(r => r.id === review.id);
    let updated: Review[];
    if (idx >= 0) {
      updated = [...reviews];
      updated[idx] = review;
    } else {
      updated = [{ ...review, id: review.id || `rev-${Date.now()}` }, ...reviews];
    }
    setLocal(STORAGE_KEYS.REVIEWS, updated);
    return review;
  }
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase unavailable');
  const { data, error } = await supabase.from('reviews').upsert(review).select().single();
  if (error) throw error;
  return data;
}

export async function deleteReview(id: string): Promise<void> {
  if (isDemoMode()) {
    const reviews = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
    setLocal(STORAGE_KEYS.REVIEWS, reviews.filter(r => r.id !== id));
    return;
  }
  const supabase = createClient();
  if (supabase) await supabase.from('reviews').delete().eq('id', id);
}

// ----------------------------------------------------
// CONTACT MESSAGES
// ----------------------------------------------------
export async function getMessages(): Promise<ContactMessage[]> {
  if (isDemoMode()) {
    return getLocal<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
  }
  const supabase = createClient();
  if (!supabase) return initialMessages;
  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  return data || initialMessages;
}

export async function createMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    status: 'Unread',
    created_at: new Date().toISOString()
  };
  if (isDemoMode()) {
    const msgs = getLocal<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
    setLocal(STORAGE_KEYS.MESSAGES, [newMsg, ...msgs]);
    return newMsg;
  }
  const supabase = createClient();
  if (!supabase) {
    const msgs = getLocal<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
    setLocal(STORAGE_KEYS.MESSAGES, [newMsg, ...msgs]);
    return newMsg;
  }
  const { data, error } = await supabase.from('contact_messages').insert([newMsg]).select().single();
  if (error) throw error;
  return data;
}

export async function updateMessageStatus(id: string, status: 'Unread' | 'Read' | 'Replied'): Promise<void> {
  if (isDemoMode()) {
    const msgs = getLocal<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages);
    const updated = msgs.map(m => m.id === id ? { ...m, status } : m);
    setLocal(STORAGE_KEYS.MESSAGES, updated);
    return;
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.from('contact_messages').update({ status }).eq('id', id);
  }
}

// ----------------------------------------------------
// HOMEPAGE CONTENT
// ----------------------------------------------------
export async function getHomepageContent(): Promise<HomepageContent> {
  if (isDemoMode()) {
    return getLocal<HomepageContent>(STORAGE_KEYS.HOMEPAGE, initialHomepageContent);
  }
  const supabase = createClient();
  if (!supabase) return initialHomepageContent;
  const { data } = await supabase.from('homepage_content').select('*').single();
  return data || initialHomepageContent;
}

export async function updateHomepageContent(content: HomepageContent): Promise<void> {
  if (isDemoMode()) {
    setLocal(STORAGE_KEYS.HOMEPAGE, content);
    return;
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.from('homepage_content').upsert({ id: 1, ...content, updated_at: new Date().toISOString() });
  }
}

// ----------------------------------------------------
// SITE SETTINGS
// ----------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isDemoMode()) {
    return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  }
  const supabase = createClient();
  if (!supabase) return initialSiteSettings;
  const { data } = await supabase.from('site_settings').select('*').single();
  return data || initialSiteSettings;
}

export async function updateSiteSettings(settings: SiteSettings): Promise<void> {
  if (isDemoMode()) {
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    return;
  }
  const supabase = createClient();
  if (supabase) {
    await supabase.from('site_settings').upsert({ id: 1, ...settings, updated_at: new Date().toISOString() });
  }
}

// ----------------------------------------------------
// MEDIA ITEMS (MEDIA LIBRARY)
// ----------------------------------------------------
export async function getMediaItems(): Promise<MediaItem[]> {
  if (isDemoMode()) {
    return getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
  }
  const supabase = createClient();
  if (!supabase) return initialMediaItems;
  const { data } = await supabase.from('media_items').select('*').order('created_at', { ascending: false });
  return data || initialMediaItems;
}

export async function addMediaItem(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
  const newItem: MediaItem = {
    ...item,
    id: `med-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  if (isDemoMode()) {
    const items = getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
    setLocal(STORAGE_KEYS.MEDIA, [newItem, ...items]);
    return newItem;
  }
  const supabase = createClient();
  if (!supabase) {
    const items = getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
    setLocal(STORAGE_KEYS.MEDIA, [newItem, ...items]);
    return newItem;
  }
  const { data, error } = await supabase.from('media_items').insert([newItem]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteMediaItem(id: string): Promise<void> {
  if (isDemoMode()) {
    const items = getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
    setLocal(STORAGE_KEYS.MEDIA, items.filter(m => m.id !== id));
    return;
  }
  const supabase = createClient();
  if (supabase) await supabase.from('media_items').delete().eq('id', id);
}

// ----------------------------------------------------
// DEMO AUTHENTICATION HELPER
// ----------------------------------------------------
export function isDemoAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'authenticated';
}

export function setDemoAdminAuthenticated(auth: boolean): void {
  if (typeof window === 'undefined') return;
  if (auth) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}
