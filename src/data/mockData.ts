import { Product, Category, BusinessSettings } from '../types';

export const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Shoes', iconName: 'Footprints', productCount: 42, description: 'High-performance street and trail footwear' },
  { id: 'cat-2', name: 'Trek Bags', iconName: 'Backpack', productCount: 28, description: 'Rugged ergonomic backpacks for expedition' },
  { id: 'cat-3', name: 'Travel Bags', iconName: 'Luggage', productCount: 19, description: 'Heavy-duty duffels and weekenders' },
  { id: 'cat-4', name: 'T-Shirts', iconName: 'Shirt', productCount: 65, description: 'Heavyweight oversized streetwear tops' },
  { id: 'cat-5', name: 'Corsets', iconName: 'Layers', productCount: 14, description: 'Tactical and technical structured vests' },
  { id: 'cat-6', name: 'Accessories', iconName: 'Hat', productCount: 37, description: 'Headwear, straps, and utility gear' },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Summit Pro 40L',
    category: 'Trek Bags',
    price: 3499,
    description: 'Built for the bold. The Summit Pro 40L is your ultimate companion for trekking, hiking & outdoor adventures.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      '40L Large Capacity',
      'Water Resistant Cordura® Nylon',
      'Multiple Quick-Access Compartments',
      'Ergonomic Padded Harness'
    ],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-20',
    tag: 'RATING 4.8 (126)'
  },
  {
    id: 'prod-2',
    name: 'Trail Explorer 60L',
    category: 'Trek Bags',
    price: 4299,
    description: 'Heavy duty expedition pack designed for extreme multi-day mountain traverses.',
    images: [
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['60L Expandable Capacity', 'Integrated Raincover', 'Load Adjustment Straps'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-16',
    tag: 'BESTSELLER'
  },
  {
    id: 'prod-3',
    name: 'Hike Lite 30L',
    category: 'Trek Bags',
    price: 2299,
    description: 'Lightweight daypack with high airflow mesh backing for fast ascents.',
    images: [
      'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Hydration Reservoir Compatible', 'Ultra-light 650g', 'Reflective Accents'],
    featured: false,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-14'
  },
  {
    id: 'prod-4',
    name: 'Peak Adventure 55L',
    category: 'Trek Bags',
    price: 3799,
    description: 'All-weather alpine backpack with reinforced crampon straps and ice axe loops.',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Ripstop Fabric', 'Aluminium Internal Frame', 'Detachable Top Lid'],
    featured: true,
    stockStatus: 'LOW STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-10'
  },
  {
    id: 'prod-5',
    name: 'Urban Travel Duffel',
    category: 'Travel Bags',
    price: 2699,
    description: 'Modular weekender duffel with convertible backpack straps and waterproof shoe pocket.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Waterproof Tarpaulin Shell', 'Separate Dirty Shoe Cavity', 'TSA Compliant'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-18'
  },
  {
    id: 'prod-6',
    name: 'Running Shoes X1',
    category: 'Shoes',
    price: 2999,
    description: 'Cyberpunk inspired futuristic tread with extreme energy return cushioning.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Nitro Foam Sole', 'Breathable Flyknit Mesh', 'High Traction Outsole'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-19',
    tag: 'NEW RELEASE'
  },
  {
    id: 'prod-7',
    name: 'Core Performance T-Shirt',
    category: 'T-Shirts',
    price: 799,
    description: '300 GSM Heavyweight oversized cotton graphic tee with brutalist typographic print.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['100% Combed Cotton', 'Drop Shoulder Fit', 'Anti-Pilling Wash'],
    featured: false,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2024-05-17'
  }
];

export const initialBusinessSettings: BusinessSettings = {
  name: 'GEAR ZONE.',
  tagline: 'GEAR THAT MOVES YOU.',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'hello@gearzone.in',
  website: 'https://gearzone.in',
  address: '123, Adventure Street, Mumbai, India - 400001',
  instagram: 'gearzone.offcl',
  facebook: 'gearzone.official',
  youtube: 'gearzonetv',
  currency: '₹'
};
