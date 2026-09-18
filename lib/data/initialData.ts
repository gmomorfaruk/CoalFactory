import { 
  Product, 
  Offer, 
  Order, 
  GalleryItem, 
  Review, 
  ContactMessage, 
  HomepageContent, 
  SiteSettings,
  MediaItem 
} from '@/types';

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'restaurant-bbq-charcoal',
    name_bn: 'রেস্টুরেন্ট ও বারবিকিউ স্পেশাল কাঠের কয়লা',
    name_en: 'Restaurant & BBQ Grade Wood Charcoal',
    description_bn: 'উচ্চমানের শক্ত কাঠের কয়লা যা দীর্ঘক্ষণ উচ্চ তাপে জ্বলে। রেস্টুরেন্ট, বারবিকিউ পার্টি এবং গ্রিল ব্যবসার জন্য আদর্শ। ধোঁয়াহীন, গন্ধহীন ও কম ছাই।',
    description_en: 'Premium hardwood charcoal delivering long-lasting steady heat. Ideal for commercial smokehouses, BBQ eateries, and kebab grills with low smoke and minimal ash.',
    price: 90,
    offer_price: 82,
    unit: 'kg',
    availability: 'Available',
    specifications: {
      carbonContent: '78% - 85%',
      moisture: '< 4%',
      ash: '< 3%',
      burnDuration: '3.5 - 4.5 Hours',
      heatValue: '7,200+ kcal/kg',
      sizeGrading: 'Medium to Large Chunks (5-12cm)',
      smokeLevel: 'Virtually Smokeless'
    },
    packaging_bn: '২৫ কেজি পলি-লাইন্ড পিটি ব্যাগে ও ৫০ কেজি বস্তায় সরবরাহযোগ্য।',
    packaging_en: 'Available in 25kg poly-lined woven sacks and 50kg wholesale bulk bags.',
    applications_bn: 'রেস্তোরাঁ বারবিকিউ, কাবাব হাউস, তন্দুর ও গ্রিল কিচেন।',
    applications_en: 'Commercial BBQ, Kebab smokehouses, tandoori ovens, and steak grills.',
    image_url: '/images/hardwood-lump.jpeg',
    is_featured: true,
    published: true,
    display_order: 1,
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    slug: 'commercial-hardwood-lump',
    name_bn: 'বাছাইকৃত শক্ত কাঠের লাম্প কয়লা (পাইকারি)',
    name_en: 'Commercial Hardwood Lump Charcoal (Bulk)',
    description_bn: 'দেশি শক্ত তেঁতুল ও জাম কাঠ থেকে তৈরি খাঁটি কয়লা। কোনো ধরনের কেমিক্যাল বা কৃত্রিম আঠা ছাড়া হস্তচালিত গ্রেডিংয়ে প্রস্তুত।',
    description_en: 'Natural lump charcoal produced from seasoned dense hardwoods. Free of chemical additives, perfect for commercial roasting and steady thermal performance.',
    price: 80,
    offer_price: null,
    unit: 'kg',
    availability: 'Available',
    specifications: {
      carbonContent: '80%+',
      moisture: '< 5%',
      ash: '< 2.5%',
      burnDuration: '4+ Hours',
      heatValue: '7,500 kcal/kg',
      sizeGrading: 'Selected Natural Lump Chunks',
      smokeLevel: 'Clean Natural Burn'
    },
    packaging_bn: '২০ কেজি ও ৫০ কেজি বস্তা। ক্রেতার চাহিদা অনুযায়ী কাস্টম প্যাকিং সম্ভব।',
    packaging_en: '20kg sacks & 50kg bulk sacks. Custom buyer-branded packing available for distributors.',
    applications_bn: 'হোটেল, ক্যাটারিং সার্ভিস ও মেটাল ফাউন্ড্রি ওয়ার্ক।',
    applications_en: 'Hotels, industrial catering, and metal casting foundries.',
    image_url: '/images/coal_1.jpeg',
    is_featured: true,
    published: true,
    display_order: 2,
    created_at: '2026-03-02T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z'
  },
  {
    id: 'prod-3',
    slug: 'industrial-bulk-charcoal',
    name_bn: 'ইন্ডাস্ট্রিয়াল বাল্ক কয়লা (শিল্প কারখানা)',
    name_en: 'Industrial Bulk Charcoal',
    description_bn: 'লৌহজাত পণ্য প্রক্রিয়াকরণ, ঢালাই কারখানা এবং রাসায়নিক শিল্পের জন্য উপযুক্ত ঘন কয়লা। নিরবচ্ছিন্ন ট্রাকলোড বাল্ক সরবরাহ ব্যবস্থা।',
    description_en: 'Dense, carbon-rich charcoal tailored for industrial thermal processing, metal smelters, and chemical reduction applications with guaranteed steady volume supply.',
    price: 75,
    offer_price: 70,
    unit: 'kg',
    availability: 'Available',
    specifications: {
      carbonContent: '75% - 82%',
      moisture: '< 6%',
      ash: '< 4%',
      burnDuration: 'Steady high-thermal yield',
      heatValue: '6,800 kcal/kg',
      sizeGrading: 'Uniform Medium Size',
      smokeLevel: 'Industrial Standard'
    },
    packaging_bn: 'ট্রাকলোড ও কনটেইনার বাল্ক লট অথবা ৫০ কেজি ব্যাগে।',
    packaging_en: 'Bulk truckload deliveries or 50kg heavy-duty woven bags.',
    applications_bn: 'ধাতব ঢালাই কারখানা, এগ্রো-প্রসেসিং ড্রায়ার ও শিল্প চুল্লি।',
    applications_en: 'Foundries, boiler drying chambers, agricultural curing units.',
    image_url: '/images/industrial-bulk.jpeg',
    is_featured: true,
    published: true,
    display_order: 3,
    created_at: '2026-03-03T10:00:00Z',
    updated_at: '2026-03-03T10:00:00Z'
  },
  {
    id: 'prod-4',
    slug: 'selected-dense-hardwood-chunks',
    name_bn: 'প্রিমিয়াম বাছাইকৃত খণ্ড কয়লা',
    name_en: 'Selected Dense Hardwood Charcoal',
    description_bn: 'অতি উচ্চ ঘনত্ব ও সুষম আকারের বাছাই করা কয়লা। শূন্য গন্ধ এবং দীর্ঘ সময় ধরে ধীর প্রজ্বলন নিশ্চিত করে।',
    description_en: 'Uniform density selected dense hardwood charcoal with zero odor and consistent long-duration thermal output. Clean burning and low residue.',
    price: 85,
    offer_price: null,
    unit: 'kg',
    availability: 'Available',
    specifications: {
      carbonContent: '82%+',
      moisture: '< 3%',
      ash: '< 2%',
      burnDuration: '4.5+ Hours',
      heatValue: '7,400 kcal/kg',
      sizeGrading: 'Hand-sorted Medium Blocks',
      smokeLevel: 'Zero Smoke & Clean'
    },
    packaging_bn: '২০ কেজি ও ৫০ কেজি বস্তা।',
    packaging_en: '20kg & 50kg sacks.',
    applications_bn: 'প্রিমিয়াম লাউঞ্জ, কাবাব তন্দুর ও বিশেষায়িত গ্রিল।',
    applications_en: 'Specialized lounges, tandoori ovens, indoor grilling.',
    image_url: '/images/coal_3.jpeg',
    is_featured: true,
    published: true,
    display_order: 4,
    created_at: '2026-03-04T10:00:00Z',
    updated_at: '2026-03-04T10:00:00Z'
  }
];

export const initialOffers: Offer[] = [
  {
    id: 'offer-1',
    title_bn: '🔥 স্পেশাল বাল্ক পাইকারি অফার',
    title_en: '🔥 Special Bulk Wholesale Offer',
    description_bn: '৫০০ কেজি বা তদূর্ধ্ব রেস্টুরেন্ট কয়লা অর্ডারে সরাসরি কারখানা মূল্যের সাথে বিশেষ ছাড়। নিয়মিত সাপ্লাই কন্ট্রাক্ট সুবিধা!',
    description_en: 'Factory-direct discounted rate on orders of 500kg or more for restaurant and commercial buyers. Scheduled contract benefits!',
    original_price: 90,
    offer_price: 82,
    banner_url: '/images/packaging-sacks.jpeg',
    start_date: '2026-03-01',
    end_date: '2026-04-30',
    is_active: true,
    created_at: '2026-03-01T10:00:00Z'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title_bn: 'আমাদের আধুনিক কয়লা কারখানা ও প্ল্যান্ট',
    title_en: 'Charcoal Plant & Factory Grounds',
    description_bn: 'খুলনার ফুলতলার সিদ্ধিপাশায় অবস্থিত হাসিব এন্টারপ্রাইজের সুশৃঙ্খল ও পরিবেশসম্মত উৎপাদন চত্বর।',
    description_en: 'Hasib Enterprises production facility located in Siddhipasha, Phultala, Khulna.',
    image_url: '/images/factory-plant.jpeg',
    category: 'Factory',
    display_order: 1,
    is_featured: true, // Homepage preview 1
    published: true
  },
  {
    id: 'gal-2',
    title_bn: 'পরিপক্ক শক্ত কাঠ সংগ্রহ ও সিজনিং ইয়ার্ড',
    title_en: 'Hardwood Sourcing & Natural Wood Curing',
    description_bn: 'খাঁটি শক্ত তেঁতুল ও জাম কাঠের সুশৃঙ্খল স্টোরেজ। প্রাকৃতিক তাপে শুকিয়ে সুষম কার্বনাইজেশন নিশ্চিত করা হয়।',
    description_en: 'Selected dense hardwoods naturally cured in open storage yards for maximum energy density.',
    image_url: '/images/wood-storage.jpeg',
    category: 'Production',
    display_order: 2,
    is_featured: true, // Homepage preview 2
    published: true
  },
  {
    id: 'gal-3',
    title_bn: 'হস্তচালিত বাছাইকরণ ও গ্রেডিং',
    title_en: 'Hand-Sorted Clean Hardwood Lump',
    description_bn: 'কার্বনাইজেশনের পর ধূলিকণা ও অপদ্রব্য সরিয়ে নিখুঁত আকারের কয়লা আলাদা করা হয়।',
    description_en: 'Meticulously hand-graded lump charcoal cleared of dust and impurities for optimal restaurant grilling.',
    image_url: '/images/hardwood-lump.jpeg',
    category: 'Products',
    display_order: 3,
    is_featured: true, // Homepage preview 3
    published: true
  },
  {
    id: 'gal-4',
    title_bn: 'সুরক্ষিত পলি-লাইন্ড প্যাকেজিং',
    title_en: 'Heavy-Duty Weatherproof Packaging Sacks',
    description_bn: 'আর্দ্রতা থেকে রক্ষা করতে বিশেষ পলি-লাইন্ড ব্যাগে মানসম্মত প্যাকেজিং সম্পন্ন করা হয়।',
    description_en: 'Heavy-duty woven bags preserving dry moisture levels during storage and transit.',
    image_url: '/images/packaging-sacks.jpeg',
    category: 'Packaging',
    display_order: 4,
    is_featured: true, // Homepage preview 4
    published: true
  },
  {
    id: 'gal-5',
    title_bn: 'সরাসরি ট্রাকে লোডিং ও দেশব্যাপী সরবরাহ',
    title_en: 'Freight Dispatch & Nationwide Truck Delivery',
    description_bn: 'কারখানা থেকে সরাসরি ট্রাক বোঝাই করে ঢাকাসহ দেশের বিভিন্ন বাণিজ্যিক গ্রাহকের কাছে দ্রুত পৌঁছানো হয়।',
    description_en: 'Bulk truckload deliveries loaded directly from the plant for scheduled client runs.',
    image_url: '/images/dispatch-loading.jpeg',
    category: 'Delivery',
    display_order: 5,
    is_featured: true, // Homepage preview 5
    published: true
  },
  {
    id: 'gal-6',
    title_bn: 'শীর্ষস্থানীয় কাবাব ও বারবিকিউ রেস্তোরাঁয় ব্যবহার',
    title_en: 'Commercial BBQ & Restaurant Kitchen Operation',
    description_bn: 'আমাদের সরবরাহকৃত কয়লায় খাবার তৈরি হচ্ছে বাণিজ্যিক কাবাব হাউস ও বারবিকিউ রেস্তোরাঁয়।',
    description_en: 'Our consistent hardwood lump fueling dinner service at commercial BBQ smokehouses.',
    image_url: '/images/restaurant-bbq.jpeg',
    category: 'Customers',
    display_order: 6,
    is_featured: false,
    published: true
  },
  {
    id: 'gal-7',
    title_bn: 'নিয়ন্ত্রিত কার্বনাইজেশনের কয়লা স্তূপ',
    title_en: 'Controlled Carbonization Output',
    description_bn: 'নিয়ন্ত্রিত তাপমাত্রায় কয়লা রূপান্তরের পর শীতলীকরণ ও প্রাথমিক গ্রেডিং।',
    description_en: 'Evenly carbonized lump charcoal heaps following gradual thermal kiln curing.',
    image_url: '/images/factory-coal-piles.jpeg',
    category: 'Production',
    display_order: 7,
    is_featured: false,
    published: true
  },
  {
    id: 'gal-8',
    title_bn: 'কাঁচামাল শুকানো ও আর্দ্রতা নিয়ন্ত্রণ',
    title_en: 'Wood Seasoning & Moisture Control',
    description_bn: 'উৎপাদনের পূর্বে কাঠের সুষম আর্দ্রতা বজায় রাখতে উন্মুক্ত ইয়ার্ডে কাঠের স্তূপ।',
    description_en: 'Seasoning of dense hardwood logs prior to kiln loading.',
    image_url: '/images/wood-storage-2.jpeg',
    category: 'Factory',
    display_order: 8,
    is_featured: false,
    published: true
  },
  {
    id: 'gal-9',
    title_bn: 'বাণিজ্যিক ও শিল্প চুল্লির কয়লা',
    title_en: 'Commercial & Industrial Bulk Charcoal',
    description_bn: 'শিল্প কারখানা ও ভারী খাদ্য প্রক্রিয়াকরণে উচ্চ তাপমাত্রার সুষম কয়লা।',
    description_en: 'High caloric output charcoal designated for heavy thermal applications.',
    image_url: '/images/industrial-bulk.jpeg',
    category: 'Products',
    display_order: 9,
    is_featured: false,
    published: true
  },
  {
    id: 'gal-10',
    title_bn: 'রেস্তোরাঁ কিচেনে খাদ্য প্রস্তুতি',
    title_en: 'Restaurant Food Preparation',
    description_bn: 'ধোঁয়াহীন কয়লায় কাবাব ও তন্দুর রান্নার অভিজ্ঞতা।',
    description_en: 'Smokeless charcoal grilling ensuring rich natural food flavors.',
    image_url: '/images/restaurent_1.jpeg',
    category: 'Customers',
    display_order: 10,
    is_featured: false,
    published: true
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    customer_name: 'কাজী রফিকুল ইসলাম',
    business_name: 'স্মোকি গ্রিল বারবিকিউ, ধানমন্ডি',
    photo_url: '/images/restaurant-bbq.jpeg',
    review_bn: 'আমরা গত ১ বছর ধরে হাসিব এন্টারপ্রাইজ থেকে আমাদের রেস্টুরেন্টের জন্য কয়লা নিচ্ছি। কয়লার সাইজ ভালো, ধোঁয়া হয় না বললেই চলে এবং দীর্ঘ সময় জ্বলে। দাম ও ডেলিভারি কমিটমেন্ট খুব নির্ভরযোগ্য।',
    review_en: 'We have been sourcing charcoal from Hasib Enterprises for over a year for our BBQ restaurant. Great chunk size, virtually smokeless, and very consistent burn. Highly reliable supply.',
    rating: 5,
    is_featured_home: true,
    published: true
  },
  {
    id: 'rev-2',
    customer_name: 'তারেক মাহমুদ',
    business_name: 'আল-মদিনা তন্দুর ও কাবাব জোন, উত্তরা',
    photo_url: '/images/restaurent_1.jpeg',
    review_bn: 'আগে অন্য জায়গা থেকে নিলে বস্তায় অনেক গুঁড়া থাকত। হাসিব ভাইদের কয়লা একদম পরিষ্কার এবং শক্ত কাঠ। একবার অর্ডার করলে সঠিক সময়ে মাল এসে পৌঁছায়।',
    review_en: 'Previously we had problems with excessive dust from other suppliers. Hasib Enterprises delivers clean, solid chunks on time every single week.',
    rating: 5,
    is_featured_home: true,
    published: true
  },
  {
    id: 'rev-3',
    customer_name: 'মোঃ জসিম উদ্দিন',
    business_name: 'পাইকারি পরিবেশক, নারায়ণগঞ্জ',
    photo_url: '/images/restaurent_3.jpeg',
    review_bn: 'কারখানা থেকে সরাসরি ট্রাক পাঠায়, মালের গুণমান খুব ভালো। শীতের মৌসুমে কয়লার টান থাকলেও তারা আমাদের সরবরাহ স্বাভাবিক রেখেছিল।',
    review_en: 'Direct truck supply from their factory with honest weights and consistent grade. Kept our inventory fully supplied even in peak winter season.',
    rating: 5,
    is_featured_home: true,
    published: true
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    customer_name: 'ফারহান আহমেদ',
    company_name: 'দ্য কয়লা লাউঞ্জ ও ক্যাফে',
    phone: '01711223344',
    email: 'farhan@cafekoyla.com',
    product_name: 'রেস্টুরেন্ট ও বারবিকিউ স্পেশাল কাঠের কয়লা',
    quantity: '৫০০ কেজি (20 বস্তা)',
    location: 'বনানী, ঢাকা',
    notes: 'জরুরি ভিত্তিতে আগামী মঙ্গলবার সকাল ১০টার মধ্যে লাগবে।',
    status: 'New',
    created_at: '2026-03-10T09:30:00Z'
  },
  {
    id: 'ord-102',
    customer_name: 'মোঃ শাহ আলম',
    company_name: 'মেসার্স শাহ আলম এন্টারপ্রাইজ',
    phone: '01819876543',
    email: 'shahalam.trade@gmail.com',
    product_name: 'বাছাইকৃত শক্ত কাঠের লাম্প কয়লা (পাইকারি)',
    quantity: '২ টন (ট্রাক ডেলিভারি)',
    location: 'টঙ্গী বাজার, গাজীপুর',
    notes: 'দরদাম নিয়ে ফোনে কথা হয়েছে, কোটেশন কনফার্ম করুন।',
    status: 'Quoted',
    created_at: '2026-03-09T14:15:00Z'
  },
  {
    id: 'ord-103',
    customer_name: 'আব্দুল কাদির',
    company_name: 'গ্রিল ইন রেস্টুরেন্ট',
    phone: '01912345678',
    email: '',
    product_name: 'রেস্টুরেন্ট ও বারবিকিউ স্পেশাল কাঠের কয়লা',
    quantity: '২০০ কেজি',
    location: 'মিরপুর ১০, ঢাকা',
    notes: 'নিয়মিত সাপ্তাহিক অর্ডার।',
    status: 'Confirmed',
    created_at: '2026-03-08T11:00:00Z'
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'তানভীর হাসান',
    phone: '01678123456',
    email: 'tanvir@primefoods.com',
    subject: 'সাপ্তাহিক ১ টন কয়লা সাপ্লাই প্রসঙ্গে',
    message: 'আমাদের রেস্তোরাঁ চেইনের জন্য নিয়মিত কয়লা প্রয়োজন। কারখানা ভিজিট ও বাল্ক রেট নিয়ে আলোচনা করতে চাই।',
    status: 'Unread',
    created_at: '2026-03-11T12:00:00Z'
  }
];

export const initialHomepageContent: HomepageContent = {
  announcement_active: true,
  announcement_text_bn: '🔥 বিশেষ বাল্ক পাইকারি অফার চলছে — কারখানা মূল্যে কয়লা পেতে আজই কল করুন',
  announcement_text_en: '🔥 Special wholesale bulk pricing now active — Call today for direct factory quotes',
  announcement_type: 'offer',
  hero_title_bn: 'উন্নত মানের কাঠের কয়লা সরাসরি কারখানা থেকে',
  hero_title_en: 'Quality Wood Charcoal — Direct from Factory',
  hero_subtitle_bn: 'রেস্টুরেন্ট, বারবিকিউ ও বাণিজ্যিক প্রতিষ্ঠানের জন্য সেরা মানের কাঠের কয়লা। কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি নিজস্ব কারখানা থেকে বিশ্বস্ত সরবরাহ।',
  hero_subtitle_en: 'A Bangladesh-based wood charcoal manufacturing and supply business serving restaurants, BBQ businesses, commercial buyers, wholesalers, and distributors.',
  hero_image_url: '/images/factory-plant.jpeg',
  why_us_items: [
    {
      title_bn: 'খাঁটি শক্ত কাঠের কয়লা',
      title_en: '100% Dense Hardwood',
      description_bn: 'তেঁতুল, জাম ও প্রাকৃতিক শক্ত কাঠ থেকে তৈরি। কয়লা দ্রুত শেষ হয় না এবং দীর্ঘক্ষণ উচ্চ তাপ ধরে রাখে।',
      description_en: 'Selected dense hardwoods ensuring long steady heat output and exceptional energy efficiency.',
      icon: 'ShieldCheck'
    },
    {
      title_bn: 'সরাসরি নিজস্ব কারখানা',
      title_en: 'Direct From Our Factory',
      description_bn: 'খুলনার ফুলতলার সিদ্ধিপাশায় নিজস্ব আধুনিক প্ল্যান্ট। কোনো মধ্যস্থতাকারী নেই, তাই নিশ্চিত ন্যায্য মূল্য ও শতভাগ সঠিক ওজন।',
      description_en: 'Manufactured at our own plant in Siddhipasha, Phultala, Khulna. No middlemen, transparent rates, honest weights.',
      icon: 'Factory'
    },
    {
      title_bn: 'ধোঁয়াহীন ও কম ছাই',
      title_en: 'Low Smoke & Minimal Ash',
      description_bn: 'আধুনিক চুল্লিতে নিয়ন্ত্রিত কার্বনাইজেশন। রেস্টুরেন্টের কিচেনে কিংবা ওপেন বারবিকিউতে কোনো ধোঁয়া তৈরি করে না।',
      description_en: 'Evenly carbonized lump charcoal producing virtually zero smoke and clean white ash residue.',
      icon: 'Sparkles'
    },
    {
      title_bn: 'নির্ভরযোগ্য নিরবচ্ছিন্ন ডেলিভারি',
      title_en: 'Guaranteed Steady Supply',
      description_bn: 'সারা বছর নিয়মিত স্টক ও সময়মতো সরাসরি রেস্টুরেন্টে পৌঁছে দেওয়ার বিশ্বস্ত লজিস্টিক ব্যবস্থা।',
      description_en: 'Year-round production capacity with prompt scheduled delivery to your restaurant or warehouse.',
      icon: 'Truck'
    }
  ]
};

export const initialSiteSettings: SiteSettings = {
  phone_primary: '+880 1581-291614',
  phone_secondary: '+880 1986-659897',
  whatsapp_number: '+880 1581-291614',
  email: 'support.hasibenterprise@gmail.com',
  office_address_bn: 'প্লট নং ১২, রোড ৪, ব্লক সি, মিরপুর, ঢাকা - ১২১৬',
  office_address_en: 'Plot 12, Road 4, Block C, Mirpur, Dhaka - 1216, Bangladesh',
  factory_address_bn: 'হাসিব কোল ফ্যাক্টরি, সিদ্ধিপাশা, ফুলতলা, খুলনা - ৯২০৬, বাংলাদেশ',
  factory_address_en: 'Hasib Charcoal Plant, Siddhipasha, Phultala, Khulna - 9206, Bangladesh',
  map_embed_url: 'https://maps.google.com/maps?q=22.9447679,89.4883762&z=15&output=embed',
  social_links: {
    facebook: 'https://facebook.com/hasibenterprisesbd',
    whatsapp: 'https://wa.me/8801581291614',
    instagram: '',
    youtube: '',
    tiktok: '',
    linkedin: ''
  }
};

export const initialMediaItems: MediaItem[] = [
  {
    id: 'med-1',
    file_name: 'factory-plant.jpeg',
    file_url: '/images/factory-plant.jpeg',
    category: 'Factory',
    file_size: 441230,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-2',
    file_name: 'wood-storage.jpeg',
    file_url: '/images/wood-storage.jpeg',
    category: 'Factory',
    file_size: 1210621,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-3',
    file_name: 'hardwood-lump.jpeg',
    file_url: '/images/hardwood-lump.jpeg',
    category: 'Product',
    file_size: 789295,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-4',
    file_name: 'packaging-sacks.jpeg',
    file_url: '/images/packaging-sacks.jpeg',
    category: 'Packaging',
    file_size: 977742,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-5',
    file_name: 'dispatch-loading.jpeg',
    file_url: '/images/dispatch-loading.jpeg',
    category: 'Delivery',
    file_size: 1211243,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-6',
    file_name: 'industrial-bulk.jpeg',
    file_url: '/images/industrial-bulk.jpeg',
    category: 'Product',
    file_size: 1002026,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-7',
    file_name: 'restaurant-bbq.jpeg',
    file_url: '/images/restaurant-bbq.jpeg',
    category: 'Customer',
    file_size: 143322,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-8',
    file_name: 'factory-coal-piles.jpeg',
    file_url: '/images/factory-coal-piles.jpeg',
    category: 'Production',
    file_size: 539727,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'med-9',
    file_name: 'hero-video.mp4',
    file_url: '/images/hero-video.mp4',
    category: 'Banner',
    file_size: 4104564,
    created_at: '2026-03-01T10:00:00Z'
  }
];
