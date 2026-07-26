export interface Product {
  id: string;
  name: string;
  category: string;
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
