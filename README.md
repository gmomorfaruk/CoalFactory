# HASIB ENTERPRISES (হাসিব এন্টারপ্রাইজ)

> **Bangladesh-based Wood Charcoal Manufacturing & Supply Business**  
> Serving restaurants, BBQ smokehouses, commercial buyers, wholesalers, and industrial distributors with direct-from-kiln charcoal.

---

## 🌟 Overview & Features

### 🌐 Public Experience (Bangla Primary / English Secondary)
1. **Home (`/`)**:
   - Minimalist, industrial aesthetic with deep coal tones & glowing ember accents.
   - Dynamic top announcement banner (controlled from Admin).
   - High-impact factory photography hero section with instant **Call** and **Order Request** actions.
   - Featured charcoal products with live factory pricing and availability badges.
   - Active special bulk discount banner.
   - 4 core trust pillars (Dense hardwood, Direct from factory, Low smoke, Reliable logistics).
   - Commercial customer sectors (BBQ restaurants, kebab houses, wholesalers, foundries).
   - 4-photo factory gallery showcase and discreet international export inquiry note.

2. **Our Products (`/products`)**:
   - Complete admin-managed catalog with regular prices and offer discounts (৳/kg, ৳/sack).
   - Real-time availability badges: `Available`, `Limited Availability`, `Made to Order`, `Unavailable`.
   - B2B bulk quotation guidance (*"Bulk orders: Contact us for custom quotation"*).

3. **Product Details (`/products/[slug]`)**:
   - Dynamic product page with high-res photography, specifications (fixed carbon, burn time, calorific value, moisture, ash), packaging specs, and recommended applications.
   - 1-click **Call Now**, **WhatsApp Chat**, and **Request Quotation** actions.
   - Dynamic SEO metadata.

4. **Gallery (`/gallery`)**:
   - Categorized photo grid: `Factory`, `Products`, `Production`, `Packaging`, `Customers`, `Delivery`.
   - Interactive full-screen image lightbox preview.
   - Genuine **"What Our Customers Say"** customer reviews section with star ratings.

5. **Contact & B2B Order Request (`/contact`)**:
   - Direct telephone lines, WhatsApp link, official email.
   - Factory address in Ghatail, Tangail & Corporate Office in Mirpur, Dhaka.
   - Google Maps embed.
   - Direct B2B order & quote submission form that routes directly into the Admin pipeline.

6. **Mobile Optimization**:
   - Sticky bottom quick bar on mobile viewports: `[ 📞 Call ]` `[ 💬 WhatsApp ]` `[ 📝 Order ]`.

---

### 🛡️ Admin Control Center (`/admin`)
Built in English for fast, clean, clutter-free management:
- **/admin/login**: Supabase Auth login with 1-click Demo Mode access.
- **/admin**: Commercial dashboard overview with metric cards and recent order inquiries table with 1-click status dropdowns.
- **/admin/products**: Full product lifecycle management, image URL, availability status selector, and **instant inline price editing** (*"Faruk, today's price is 85 taka instead of 100" -> Edit -> Save*).
- **/admin/offers**: Promotional campaigns and discounts manager.
- **/admin/orders**: B2B order pipeline with customer search, status filtering (`New`, `Contacted`, `Quoted`, `Confirmed`, `Completed`, `Cancelled`), and 1-click customer Call/WhatsApp triggers.
- **/admin/gallery**: Upload and categorize images, toggle homepage preview flags.
- **/admin/reviews**: Add verified customer testimonials and star ratings.
- **/admin/messages**: Inbound contact inquiries inbox.
- **/admin/media**: Central Media Library for uploading and copying image URLs.
- **/admin/homepage**: Custom CMS to edit Hero titles, Bangla/English copy, and the Top Announcement Bar without code changes.
- **/admin/settings**: Manage contact phone numbers, WhatsApp, physical addresses, Google Maps URL, and social media links.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Charcoal `#090B0D` & Ember `#F97316` palette)
- **Icons**: Lucide React
- **Typography**: Inter & Google Hind Siliguri (for natural Bangladeshi Bengali font rendering)
- **Database & Storage**: Supabase (PostgreSQL with Row-Level Security, Supabase Storage)
- **Development Fallback**: Built-in reactive demo store with rich pre-seeded data for instant local execution.

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/gmomorfaruk/CoalFactory.git
cd CoalFactory
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Configure your `.env.local`:
```env
# Set to true for immediate local testing with pre-seeded data
NEXT_PUBLIC_DEMO_MODE=true

# Optional: Add your Supabase credentials when ready to connect live database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Control Center.

### 4. Supabase Database Migration
When connecting your Supabase project, execute the SQL script in:
`supabase/schema.sql`  
This automatically provisions all tables, indexes, storage buckets (`product-images`, `gallery-images`, etc.), and strict Row-Level Security (RLS) policies.

---

## 📄 License
Private commercial software for **Hasib Enterprises**. All rights reserved.
