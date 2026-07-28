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
    createdAt: '2026-07-28',
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
    createdAt: '2026-07-27',
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
    createdAt: '2026-07-27'
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
    createdAt: '2026-07-26'
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
    createdAt: '2026-07-26'
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
    createdAt: '2026-07-25',
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
    createdAt: '2026-07-25'
  },
  {
    id: 'prod-8',
    name: 'Alpine Core 45L',
    category: 'Trek Bags',
    price: 4599,
    description: 'A balanced multi-day trekking pack with a ventilated back panel and adjustable torso system.',
    images: [
      'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=800&q=82'
    ],
    features: ['45L Expedition Capacity', 'Airflow Back System', 'Integrated Rain Cover', 'Trekking Pole Loops'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-24',
    tag: 'EDITOR’S PICK'
  },
  {
    id: 'prod-9',
    name: 'Expedition Duffel 80L',
    category: 'Travel Bags',
    price: 3899,
    description: 'Oversized expedition duffel engineered for hard transfers, wet gear and long-haul travel.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['80L Main Compartment', 'Abrasion Resistant Base', 'Stowable Shoulder Straps', 'ID Window'],
    featured: true,
    stockStatus: 'LOW STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-23',
    tag: 'LIMITED DROP'
  },
  {
    id: 'prod-10',
    name: 'Metro Weekender',
    category: 'Travel Bags',
    price: 3199,
    description: 'A refined carry-on weekender with structured walls, laptop sleeve and quick-access travel pockets.',
    images: [
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['Cabin Friendly', '16-inch Laptop Sleeve', 'Shoe Compartment', 'Detachable Strap'],
    featured: false,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-22'
  },
  {
    id: 'prod-11',
    name: 'Velocity Runner 2',
    category: 'Shoes',
    price: 3299,
    description: 'Responsive everyday runners with a sculpted foam platform and a lightweight technical mesh upper.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['Energy Return Midsole', 'Engineered Mesh Upper', 'Heel Lock System', 'Road Grip Outsole'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-21',
    tag: '4.9 (84)'
  },
  {
    id: 'prod-12',
    name: 'Terra Grip Trail',
    category: 'Shoes',
    price: 4199,
    description: 'Aggressive all-terrain footwear for wet trails, technical descents and high-mileage weekends.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    ],
    features: ['5mm Trail Lugs', 'Rock Protection Plate', 'Water Repellent Upper', 'Toe Guard'],
    featured: false,
    stockStatus: 'LOW STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-13',
    name: 'Heavyweight Logo Tee',
    category: 'T-Shirts',
    price: 1099,
    description: 'Boxy heavyweight jersey tee with a tonal front mark and oversized expedition back print.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['280 GSM Jersey', 'Oversized Fit', 'Screen Printed Artwork', 'Pre-shrunk Cotton'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-19',
    tag: 'NEW'
  },
  {
    id: 'prod-14',
    name: 'Terrain Tech Tee',
    category: 'T-Shirts',
    price: 1299,
    description: 'Quick-dry performance tee with an everyday silhouette and underarm ventilation zones.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['Moisture Wicking Knit', 'UPF 40+', 'Odour Control Finish', 'Reflective Back Mark'],
    featured: false,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-18'
  },
  {
    id: 'prod-15',
    name: 'Utility Chest Rig',
    category: 'Corsets',
    price: 1899,
    description: 'A modular street utility layer with adjustable webbing and removable storage pouches.',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['Adjustable Harness', 'Two Modular Pouches', 'Quick Release Buckles', 'Unisex Fit'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-17',
    tag: 'DROP 02'
  },
  {
    id: 'prod-16',
    name: 'Contour Tech Vest',
    category: 'Corsets',
    price: 2399,
    description: 'Structured technical vest balancing editorial shape with practical everyday storage.',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=78'
    ],
    features: ['Structured Ripstop Shell', 'Four Utility Pockets', 'Adjustable Side Tabs', 'Mesh Lining'],
    featured: false,
    stockStatus: 'IN STOCK',
    status: 'DRAFT',
    createdAt: '2026-07-16'
  },
  {
    id: 'prod-17',
    name: 'Transit Sling 8L',
    category: 'Accessories',
    price: 1299,
    description: 'A close-carry crossbody sling designed for daily essentials, travel documents and compact tech.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=78'
    ],
    features: ['8L Capacity', 'Ambidextrous Strap', 'Hidden Passport Pocket', 'Key Clip'],
    featured: true,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-15',
    tag: 'BESTSELLER'
  },
  {
    id: 'prod-18',
    name: 'Trail Cap',
    category: 'Accessories',
    price: 899,
    description: 'Packable five-panel cap with laser-cut ventilation and a moisture-managing inner band.',
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['Packable Brim', 'Quick Dry Fabric', 'Laser Cut Vents', 'Reflective Cord'],
    featured: false,
    stockStatus: 'IN STOCK',
    status: 'ACTIVE',
    createdAt: '2026-07-14'
  },
  {
    id: 'prod-19',
    name: 'Carbon Trail Bottle',
    category: 'Accessories',
    price: 749,
    description: 'Double-wall steel bottle with a powder coated grip and fast-access loop lid.',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=82'
    ],
    features: ['750ml Capacity', '18/8 Stainless Steel', '24-hour Cold Retention', 'BPA Free'],
    featured: false,
    stockStatus: 'OUT OF STOCK',
    status: 'ARCHIVED',
    createdAt: '2026-07-12'
  }
];

export const demoOrders = [
  { id: 'GZ-1048', customer: 'Arjun Mehta', item: 'Summit Pro 40L', total: 3499, status: 'PAID', date: '28 Jul 2026' },
  { id: 'GZ-1047', customer: 'Naina Kapoor', item: 'Velocity Runner 2', total: 3299, status: 'PACKED', date: '28 Jul 2026' },
  { id: 'GZ-1046', customer: 'Rohan Shah', item: 'Transit Sling 8L', total: 1299, status: 'SHIPPED', date: '27 Jul 2026' },
  { id: 'GZ-1045', customer: 'Mira Desai', item: 'Heavyweight Logo Tee', total: 1099, status: 'DELIVERED', date: '27 Jul 2026' },
  { id: 'GZ-1044', customer: 'Kabir Rao', item: 'Expedition Duffel 80L', total: 3899, status: 'PAID', date: '26 Jul 2026' },
  { id: 'GZ-1043', customer: 'Ishita Sen', item: 'Utility Chest Rig', total: 1899, status: 'PACKED', date: '26 Jul 2026' },
  { id: 'GZ-1042', customer: 'Dev Malhotra', item: 'Terra Grip Trail', total: 4199, status: 'SHIPPED', date: '25 Jul 2026' },
  { id: 'GZ-1041', customer: 'Anika Jain', item: 'Metro Weekender', total: 3199, status: 'DELIVERED', date: '24 Jul 2026' },
];

export const demoContacts = [
  { name: 'Aarav Khanna', interest: 'Corporate trekking kits', channel: 'WhatsApp', location: 'Pune', status: 'HOT', lastSeen: '8 min ago' },
  { name: 'Meera Iyer', interest: 'Summit Pro 40L', channel: 'Instagram', location: 'Bengaluru', status: 'NEW', lastSeen: '24 min ago' },
  { name: 'Vihaan Batra', interest: 'Bulk travel bags', channel: 'Email', location: 'Delhi', status: 'FOLLOW-UP', lastSeen: '1 hr ago' },
  { name: 'Sara Fernandes', interest: 'Velocity Runner 2', channel: 'Website', location: 'Goa', status: 'NEW', lastSeen: '2 hrs ago' },
  { name: 'Aditya Pillai', interest: 'Retail partnership', channel: 'Phone', location: 'Chennai', status: 'QUALIFIED', lastSeen: 'Yesterday' },
  { name: 'Tara Kulkarni', interest: 'Utility collection', channel: 'Instagram', location: 'Mumbai', status: 'FOLLOW-UP', lastSeen: 'Yesterday' },
];

export const demoBanners = [
  {
    id: 'banner-1',
    title: 'MOVE BEYOND',
    eyebrow: 'MONSOON TRAIL EDIT',
    copy: 'Water-ready packs and technical layers for the season ahead.',
    accent: '#D9FF3F',
    status: 'LIVE',
  },
  {
    id: 'banner-2',
    title: 'CITY / SUMMIT',
    eyebrow: 'NEW ARRIVALS',
    copy: 'One system. Weekday movement to weekend altitude.',
    accent: '#7C3AED',
    status: 'SCHEDULED',
  },
  {
    id: 'banner-3',
    title: 'PACK LIGHTER',
    eyebrow: 'TRAVEL SERIES',
    copy: 'Modular carry designed for faster departures.',
    accent: '#FFFFFF',
    status: 'DRAFT',
  },
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
