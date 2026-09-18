-- ==============================================================================
-- HASIB ENTERPRISES - SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table if not exists public.products (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    name_bn text not null,
    name_en text not null,
    description_bn text,
    description_en text,
    price numeric(10, 2) not null,
    offer_price numeric(10, 2),
    unit text not null default 'kg',
    availability text not null default 'Available', -- 'Available', 'Limited Availability', 'Made to Order', 'Unavailable'
    specifications jsonb default '{}'::jsonb,       -- e.g. {"moisture": "< 5%", "ash": "< 3%", "burn_time": "3-4 hours"}
    packaging_bn text,
    packaging_en text,
    applications_bn text,
    applications_en text,
    image_url text,
    is_featured boolean default false,
    published boolean default true,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. SPECIAL OFFERS TABLE
create table if not exists public.offers (
    id uuid primary key default uuid_generate_v4(),
    title_bn text not null,
    title_en text not null,
    description_bn text,
    description_en text,
    original_price numeric(10, 2),
    offer_price numeric(10, 2) not null,
    banner_url text,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS & B2B INQUIRIES TABLE
create table if not exists public.orders (
    id uuid primary key default uuid_generate_v4(),
    customer_name text not null,
    company_name text,
    phone text not null,
    email text,
    product_id uuid references public.products(id) on delete set null,
    product_name text,
    quantity text not null, -- e.g. "500 kg", "2 Tons"
    location text not null,
    notes text,
    status text not null default 'New', -- 'New', 'Contacted', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. GALLERY TABLE
create table if not exists public.gallery (
    id uuid primary key default uuid_generate_v4(),
    title_bn text,
    title_en text,
    description_bn text,
    description_en text,
    image_url text not null,
    category text not null default 'Factory', -- 'Factory', 'Products', 'Production', 'Packaging', 'Customers', 'Delivery', 'Other'
    display_order integer default 0,
    is_featured boolean default false, -- Homepage 4-image showcase
    published boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. CUSTOMER REVIEWS TABLE
create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    customer_name text not null,
    business_name text,
    photo_url text,
    review_bn text not null,
    review_en text,
    rating integer default 5 check (rating >= 1 and rating <= 5),
    is_featured_home boolean default false,
    published boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. CONTACT MESSAGES TABLE
create table if not exists public.contact_messages (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    phone text not null,
    email text,
    subject text,
    message text not null,
    status text not null default 'Unread', -- 'Unread', 'Read', 'Replied'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. HOMEPAGE CMS & ANNOUNCEMENT TABLE
create table if not exists public.homepage_content (
    id integer primary key default 1,
    announcement_active boolean default true,
    announcement_text_bn text default 'রমজান উপলক্ষে বিশেষ পাইকারি অফার চলছে — আজই যোগাযোগ করুন',
    announcement_text_en text default 'Special bulk wholesale offers now active — Contact us today',
    announcement_type text default 'offer',
    hero_title_bn text default 'উন্নত মানের কাঠের কয়লা সরাসরি কারখানা থেকে',
    hero_title_en text default 'High Quality Wood Charcoal — Direct from Factory',
    hero_subtitle_bn text default 'রেস্টুরেন্ট, বারবিকিউ ও বাণিজ্যিক প্রতিষ্ঠানের জন্য পরিবেশবান্ধব ও টেকসই কয়লা সরবরাহ।',
    hero_subtitle_en text default 'Dependable wood charcoal supply for restaurants, BBQ eateries, and industrial buyers across Bangladesh.',
    hero_image_url text,
    why_us_items jsonb default '[]'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint single_row check (id = 1)
);

-- 8. SITE SETTINGS & SOCIAL LINKS TABLE
create table if not exists public.site_settings (
    id integer primary key default 1,
    phone_primary text default '+880 1581-291614',
    phone_secondary text default '+880 1986-659897',
    whatsapp_number text default '+880 1581-291614',
    email text default 'support.hasibenterprise@gmail.com',
    office_address_bn text default 'মিরপুর, ঢাকা - ১২১৬, বাংলাদেশ',
    office_address_en text default 'Mirpur, Dhaka - 1216, Bangladesh',
    factory_address_bn text default 'হাসিব কোল ফ্যাক্টরি, সিদ্ধিপাশা, ফুলতলা, খুলনা - ৯২০৬, বাংলাদেশ',
    factory_address_en text default 'Hasib Charcoal Plant, Siddhipasha, Phultala, Khulna - 9206, Bangladesh',
    map_embed_url text default 'https://maps.google.com/maps?q=22.9447679,89.4883762&z=15&output=embed',
    social_links jsonb default '{"facebook": "https://facebook.com/hasibenterprisesbd", "whatsapp": "https://wa.me/8801581291614", "instagram": "", "youtube": "", "tiktok": "", "linkedin": ""}'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint single_row_settings check (id = 1)
);

-- 9. MEDIA ITEMS TABLE (Central Media Library)
create table if not exists public.media_items (
    id uuid primary key default uuid_generate_v4(),
    file_name text not null,
    file_url text not null,
    category text default 'General', -- 'Product', 'Factory', 'Review', 'Banner', 'General'
    file_size bigint,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.products enable row level security;
alter table public.offers enable row level security;
alter table public.orders enable row level security;
alter table public.gallery enable row level security;
alter table public.reviews enable row level security;
alter table public.contact_messages enable row level security;
alter table public.homepage_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_items enable row level security;

-- PUBLIC READ POLICIES (Published/Active only)
create policy "Public can read published products" 
    on public.products for select using (published = true);

create policy "Public can read active offers" 
    on public.offers for select using (is_active = true);

create policy "Public can read published gallery" 
    on public.gallery for select using (published = true);

create policy "Public can read published reviews" 
    on public.reviews for select using (published = true);

create policy "Public can read homepage content" 
    on public.homepage_content for select using (true);

create policy "Public can read site settings" 
    on public.site_settings for select using (true);

-- PUBLIC WRITE POLICIES (Can submit orders and messages, but NEVER read back other customers' data)
create policy "Public can insert orders" 
    on public.orders for insert with check (true);

create policy "Public can insert contact messages" 
    on public.contact_messages for insert with check (true);

-- AUTHENTICATED ADMIN FULL ACCESS (All operations on all tables)
create policy "Admin full access products" on public.products 
    for all to authenticated using (true) with check (true);

create policy "Admin full access offers" on public.offers 
    for all to authenticated using (true) with check (true);

create policy "Admin full access orders" on public.orders 
    for all to authenticated using (true) with check (true);

create policy "Admin full access gallery" on public.gallery 
    for all to authenticated using (true) with check (true);

create policy "Admin full access reviews" on public.reviews 
    for all to authenticated using (true) with check (true);

create policy "Admin full access contact_messages" on public.contact_messages 
    for all to authenticated using (true) with check (true);

create policy "Admin full access homepage_content" on public.homepage_content 
    for all to authenticated using (true) with check (true);

create policy "Admin full access site_settings" on public.site_settings 
    for all to authenticated using (true) with check (true);

create policy "Admin full access media_items" on public.media_items 
    for all to authenticated using (true) with check (true);

-- ==============================================================================
-- STORAGE BUCKETS (Public Read, Authenticated Write)
-- ==============================================================================
insert into storage.buckets (id, name, public) 
values 
    ('product-images', 'product-images', true),
    ('gallery-images', 'gallery-images', true),
    ('review-images', 'review-images', true),
    ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "Public can read images" on storage.objects 
    for select using (bucket_id in ('product-images', 'gallery-images', 'review-images', 'site-assets'));

create policy "Admin can upload images" on storage.objects 
    for insert to authenticated with check (bucket_id in ('product-images', 'gallery-images', 'review-images', 'site-assets'));

create policy "Admin can update images" on storage.objects 
    for update to authenticated using (bucket_id in ('product-images', 'gallery-images', 'review-images', 'site-assets'));

create policy "Admin can delete images" on storage.objects 
    for delete to authenticated using (bucket_id in ('product-images', 'gallery-images', 'review-images', 'site-assets'));
