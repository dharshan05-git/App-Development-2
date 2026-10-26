export type Category = 'All' | 'Bridal' | 'Gold' | 'Diamond' | 'Temple' | 'Solitaires' | 'Silver' | 'Platinum';

export interface Product {
  id: string;
  name: string;
  category: Category;
  metal: string;
  purity: string;
  grossWeight: number; // in grams
  netGoldWeight: number; // in grams
  diamondWeight?: number; // in carats
  gemstones?: string;
  price: number;
  mrp: number;
  makingCharges: number;
  rating: number;
  reviewsCount: number;
  badge?: 'BRIDAL EDIT' | 'BESTSELLER' | 'HERITAGE' | 'NEW ARRIVAL' | 'LIMITED PIECE';
  image: string;
  images: string[];
  description: string;
  hallmarkNumber: string;
  certNumber: string;
  certAgency: 'BIS' | 'IGI' | 'GIA' | 'SGL';
  inStock: boolean;
  shipsInDays: number;
  dimensions?: string;
  tryOnSupported: boolean;
  tryOnType: 'necklace' | 'earrings' | 'ring' | 'bangle';
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftWrap: boolean;
  insurance: boolean;
}

export interface EditorialStory {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  goldRateToday: number;
  distance: string;
  inStockPieces: number;
}

export interface DigitalCertificate {
  id: string;
  productName: string;
  purchaseDate: string;
  invoiceNumber: string;
  hallmarkId: string;
  certAgency: string;
  purityKarat: string;
  certifiedWeight: number;
  originalValue: number;
  currentEstimatedValue: number;
}
