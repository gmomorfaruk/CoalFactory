export type AvailabilityStatus = 
  | 'Available' 
  | 'Limited Availability' 
  | 'Made to Order' 
  | 'Unavailable';

export interface ProductSpecifications {
  carbonContent?: string;
  moisture?: string;
  ash?: string;
  burnDuration?: string;
  heatValue?: string;
  sizeGrading?: string;
  smokeLevel?: string;
}

export interface Product {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  description_en: string;
  price: number; // in BDT (৳)
  offer_price?: number | null;
  unit: string; // 'kg', '20kg sack', '50kg bag', 'ton'
  availability: AvailabilityStatus;
  specifications: ProductSpecifications;
  packaging_bn: string;
  packaging_en: string;
  applications_bn: string;
  applications_en: string;
  image_url: string;
  is_featured: boolean;
  published: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Offer {
  id: string;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  original_price?: number | null;
  offer_price: number;
  banner_url?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  created_at?: string;
}

export type OrderStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Quoted' 
  | 'Confirmed' 
  | 'Completed' 
  | 'Cancelled';

export interface Order {
  id: string;
  customer_name: string;
  company_name?: string;
  phone: string;
  email?: string;
  product_id?: string;
  product_name?: string;
  quantity: string;
  location: string;
  notes?: string;
  status: OrderStatus;
  created_at: string;
  updated_at?: string;
}

export type GalleryCategory = 
  | 'Factory' 
  | 'Products' 
  | 'Production' 
  | 'Packaging' 
  | 'Customers' 
  | 'Delivery' 
  | 'Other';

export interface GalleryItem {
  id: string;
  title_bn?: string;
  title_en?: string;
  description_bn?: string;
  description_en?: string;
  image_url: string;
  category: GalleryCategory;
  display_order: number;
  is_featured: boolean; // Shown in the 4-item homepage preview
  published: boolean;
  created_at?: string;
}

export interface Review {
  id: string;
  customer_name: string;
  business_name?: string;
  photo_url?: string;
  review_bn: string;
  review_en?: string;
  rating: number; // 1 to 5
  is_featured_home: boolean;
  published: boolean;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  created_at: string;
}

export interface WhyUsItem {
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  icon: string;
}

export interface HomepageContent {
  announcement_active: boolean;
  announcement_text_bn: string;
  announcement_text_en: string;
  announcement_type: 'offer' | 'notice';
  hero_title_bn: string;
  hero_title_en: string;
  hero_subtitle_bn: string;
  hero_subtitle_en: string;
  hero_image_url: string;
  why_us_items: WhyUsItem[];
}

export interface SocialLinks {
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
}

export interface SiteSettings {
  phone_primary: string;
  phone_secondary: string;
  whatsapp_number: string;
  email: string;
  office_address_bn: string;
  office_address_en: string;
  factory_address_bn: string;
  factory_address_en: string;
  map_embed_url: string;
  social_links: SocialLinks;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  category: string;
  file_size?: number;
  created_at: string;
}
