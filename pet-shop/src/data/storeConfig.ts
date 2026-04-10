/* ══════════════════════════════════════════════
   DATA LAYER — Clean separation from UI
   ══════════════════════════════════════════════ */

// ── Interfaces ──

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface GoogleMapsData {
  name: string;
  address: string;
  workingHours: WorkingHours[];
  phone: string;
  gmbRating: number;
  totalReviews: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  imageUrl: string;
  category: string;
  isSubscriptionEligible: boolean;
  subscriptionDiscount?: number; // e.g. 10 for 10%
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  qty: number;
  isSubscription: boolean;
}

// ── Store Data ──

export const STORE_PHONE = "0774 429 524";
export const STORE_PHONE_RAW = "+40774429524";

export const MAPS_DATA: GoogleMapsData = {
  name: "Lucky Pet Shop",
  address: "Strada George Călinescu 52, 014192 București",
  phone: STORE_PHONE,
  gmbRating: 4.7,
  totalReviews: 33,
  workingHours: [
    { day: "Luni",      open: "09:30", close: "20:00", isClosed: false },
    { day: "Marți",     open: "09:30", close: "20:00", isClosed: false },
    { day: "Miercuri",  open: "09:30", close: "20:00", isClosed: false },
    { day: "Joi",       open: "09:30", close: "20:00", isClosed: false },
    { day: "Vineri",    open: "09:30", close: "20:00", isClosed: false },
    { day: "Sâmbătă",   open: "10:00", close: "15:00", isClosed: false },
    { day: "Duminică",  open: "",      close: "",      isClosed: true },
  ],
};

// ── Products ──

export const PRODUCTS: Product[] = [
  {
    id: "prod_001",
    name: "Premium Grain-Free Kibble",
    price: 49.99,
    weight: "6.8 kg",
    category: "Hrană Câini",
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop&q=80",
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    id: "prod_002",
    name: "Salmon & Sweet Potato Blend",
    price: 54.50,
    weight: "5.4 kg",
    category: "Hrană Câini",
    imageUrl: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&h=600&fit=crop&q=80",
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    id: "prod_003",
    name: "Indoor Cat Formula",
    price: 32.00,
    weight: "3.6 kg",
    category: "Hrană Pisici",
    imageUrl: "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=600&h=600&fit=crop&q=80",
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    id: "prod_004",
    name: "Joint Support Chews",
    price: 28.99,
    weight: "120 buc",
    category: "Suplimente",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop&q=80",
    isSubscriptionEligible: false,
  },
  {
    id: "prod_005",
    name: "Natural Dental Sticks",
    price: 18.50,
    weight: "28 buc",
    category: "Recompense",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    isSubscriptionEligible: false,
  },
  {
    id: "prod_006",
    name: "Organic Wet Food · Pui",
    price: 3.99,
    weight: "400g",
    category: "Hrană Câini",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop&q=80",
    isSubscriptionEligible: true,
    subscriptionDiscount: 15,
  },
];

// ── Reviews (from Google Maps) ──

export const REVIEWS: Review[] = [
  {
    id: "rev_001",
    author: "Simina Stan",
    text: "Cei mai amabili angajați cu care am interacționat! Mi-au răspuns la toate întrebările! Recomand 10/10",
    rating: 5,
  },
  {
    id: "rev_002",
    author: "Cristina Ciocan",
    text: "Multitudine de produse, prețuri cu bun simț, amabilitate și pasiune și nu în ultimul rând iubire pentru necuvântătoare!",
    rating: 5,
  },
  {
    id: "rev_003",
    author: "Cornel Valsan",
    text: "Foarte bine aprovizionat, atitudine amabilă și profesionistă, prețuri decente. Recomand cu toată încrederea.",
    rating: 5,
  },
  {
    id: "rev_004",
    author: "Flavius Naste",
    text: "Amabilitatea, bunul simț și iubirea de animale sunt la loc de cinste. Mulțumim!",
    rating: 5,
  },
  {
    id: "rev_005",
    author: "Alex Achim",
    text: "Pet shop-ul nostru preferat din București!",
    rating: 5,
  },
];
