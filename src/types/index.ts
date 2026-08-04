export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  images: string[];
  features: string[];
  featured: boolean;
  stockStatus: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  tag?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  productCount: number;
  subcategories: Array<{ id: string; name: string }>;
  bannerUrl?: string;
  description?: string;
}

export interface BusinessSettings {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  currency: string;
  logoUrl?: string;
}

export type OfferStatus = 'ACTIVE' | 'SCHEDULED' | 'DRAFT';

export interface Offer {
  id: string;
  title: string;
  code: string;
  discount: string;
  discountPercent: number;
  description: string;
  audience: string;
  validFrom: string;
  validUntil: string;
  status: OfferStatus;
  visibleOnMobile: boolean;
  productIds: string[];
  redemptions: number;
}
