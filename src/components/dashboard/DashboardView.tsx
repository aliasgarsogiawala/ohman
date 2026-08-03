import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  Image, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Trash2, 
  Upload, 
  X, 
  Eye,
  ArrowUpRight,
  Calendar,
  MessageCircle,
  Moon,
  Sun,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { Product, Category, BusinessSettings } from '../../types';
import { demoBanners, demoContacts } from '../../data/mockData';

interface DashboardViewProps {
  products: Product[];
  categories: Category[];
  businessSettings: BusinessSettings;
  onAddProduct: (prod: Omit<Product, 'id' | 'createdAt'>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateSettings: (settings: Partial<BusinessSettings>) => void;
  onSelectProductForMobilePreview: (id: string) => void;
}

type DashboardTab = 'dashboard' | 'products' | 'categories' | 'banners' | 'contacts' | 'settings';

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  categories,
  businessSettings,
  onAddProduct,
  onDeleteProduct,
  onUpdateSettings,
  onSelectProductForMobilePreview
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [logoutTheme, setLogoutTheme] = useState<'light' | 'dark'>('light');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Add Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(categories[0]?.name || 'Trek Bags');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdFeatures, setNewProdFeatures] = useState('');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');
  const [newProdFeatured, setNewProdFeatured] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState(businessSettings);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    onAddProduct({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      description: newProdDescription || 'No description provided.',
      images: newProdImageUrl ? [newProdImageUrl] : [],
      features: newProdFeatures ? newProdFeatures.split('\n').filter(Boolean) : ['Standard Build', 'Quality Assured'],
      featured: newProdFeatured,
      stockStatus: 'IN STOCK',
      status: 'ACTIVE'
    });

    setIsAddProductModalOpen(false);
    // Reset form
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDescription('');
    setNewProdFeatures('');
    setNewProdImageUrl('');
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'ALL' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (isLoggedOut) {
    const heroStyle = products.find(product => product.category === 'Shoes') ?? products[0];
    const isDark = logoutTheme === 'dark';

    return (
      <div className={`relative h-full min-h-[560px] overflow-y-auto transition-colors duration-500 ${isDark ? 'bg-[#0b0b0b] text-white' : 'bg-[#f3f0e8] text-[#111]'}`}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] bg-grid-pattern" aria-hidden="true" />

        <div className="relative grid min-h-full lg:grid-cols-[minmax(390px,0.92fr)_minmax(500px,1.08fr)]">
          <section className="relative hidden min-h-[620px] overflow-hidden border-r border-black/20 bg-black text-white lg:block">
            <img
              src={heroStyle.images[0]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale-[25%] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/90" />
            <div className="absolute inset-x-0 top-0 h-1 bg-[#F7C318]" />

            <div className="relative flex h-full min-h-[620px] flex-col justify-between p-8 xl:p-12">
              <div className="flex items-start justify-between">
                <div>
                  <div className="ohman-wordmark text-[42px] leading-none text-white">OH MAN</div>
                  <p className="mt-2 font-mono text-[8px] tracking-[0.24em] text-white/60">MAZGAON / MUMBAI</p>
                </div>
                <span className="border border-white/40 bg-black/30 px-3 py-2 font-mono text-[8px] tracking-[0.18em] backdrop-blur-md">
                  ADMIN / 01
                </span>
              </div>

              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 bg-[#F7C318] px-3 py-1.5 font-mono text-[8px] font-bold tracking-[0.14em] text-black">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  PRIVATE CONTROL ROOM
                </span>
                <h1 className="mt-5 font-bebas text-[72px] leading-[0.84] tracking-[-0.025em] xl:text-[92px]">
                  THE STORE,
                  <br />
                  <span className="text-[#F7C318]">UNDER CONTROL.</span>
                </h1>
                <div className="mt-7 flex items-center gap-4 border-t border-white/25 pt-5">
                  <p className="max-w-sm text-xs leading-relaxed text-white/65">
                    One sharp workspace for products, campaigns and every customer conversation.
                  </p>
                  <ArrowUpRight className="h-6 w-6 flex-none text-[#F7C318]" />
                </div>
              </div>
            </div>
          </section>

          <main className="relative flex min-h-[560px] flex-col px-5 py-5 sm:px-10 sm:py-8 xl:px-20">
            <header className="flex items-center justify-between">
              <div className="lg:hidden">
                <div className="ohman-wordmark text-[30px] leading-none">OH MAN</div>
                <p className="mt-1 font-mono text-[7px] tracking-[0.2em] opacity-50">ADMIN SYSTEM</p>
              </div>
              <span className="hidden items-center gap-2 font-mono text-[8px] tracking-[0.14em] opacity-55 sm:flex lg:ml-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-[#41B883]" />
                SECURE SESSION
              </span>
              <button
                type="button"
                onClick={() => setLogoutTheme(theme => theme === 'light' ? 'dark' : 'light')}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 sm:ml-5 ${isDark ? 'border-white/15 bg-white text-black' : 'border-black/15 bg-black text-white'}`}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </header>

            <div className="mx-auto flex w-full max-w-[470px] flex-1 flex-col justify-center py-10 sm:py-14">
              <div className="mb-9">
                <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#D9432E]">AUTHORISED ACCESS ONLY</p>
                <h2 className="mt-3 font-bebas text-[52px] leading-[0.9] tracking-[-0.01em] sm:text-[64px]">WELCOME BACK.</h2>
                <p className={`mt-4 max-w-sm text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-black/55'}`}>
                  Sign in to manage the OH MAN catalogue and customer enquiries.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsLoggedOut(false);
                }}
              >
                <label className="block">
                  <span className="mb-2 block font-mono text-[9px] font-bold tracking-[0.14em]">EMAIL ADDRESS</span>
                  <span className={`flex h-14 items-center border px-4 transition-colors focus-within:border-[#F7C318] focus-within:ring-2 focus-within:ring-[#F7C318]/20 ${isDark ? 'border-white/15 bg-white/[0.04]' : 'border-black/15 bg-white/55'}`}>
                    <Mail className="mr-3 h-[18px] w-[18px] opacity-40" />
                    <input
                      type="email"
                      required
                      defaultValue="admin@ohman.in"
                      autoComplete="email"
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-35"
                      placeholder="you@ohman.in"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[9px] font-bold tracking-[0.14em]">PASSWORD</span>
                  <span className={`flex h-14 items-center border px-4 transition-colors focus-within:border-[#F7C318] focus-within:ring-2 focus-within:ring-[#F7C318]/20 ${isDark ? 'border-white/15 bg-white/[0.04]' : 'border-black/15 bg-white/55'}`}>
                    <LockKeyhole className="mr-3 h-[18px] w-[18px] opacity-40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      defaultValue="ohmanadmin"
                      autoComplete="current-password"
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-35"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(value => !value)}
                      className="ml-3 p-1 opacity-40 transition-opacity hover:opacity-100"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-2.5 text-xs opacity-65">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={event => setRememberMe(event.target.checked)}
                      className="sr-only"
                    />
                    <span className={`flex h-4 w-4 items-center justify-center border ${rememberMe ? 'border-[#F7C318] bg-[#F7C318]' : isDark ? 'border-white/30' : 'border-black/30'}`}>
                      {rememberMe && <span className="h-1.5 w-1.5 bg-black" />}
                    </span>
                    Remember me
                  </label>
                  <button type="button" className="font-mono text-[9px] font-bold tracking-[0.08em] underline decoration-[#F7C318] decoration-2 underline-offset-4">
                    FORGOT PASSWORD?
                  </button>
                </div>

                <button
                  type="submit"
                  className="group flex h-14 w-full items-center justify-between bg-[#F7C318] px-5 text-left text-black shadow-[5px_5px_0_#D9432E] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <span className="font-bebas text-xl tracking-[0.08em]">ENTER DASHBOARD</span>
                  <span className="flex h-8 w-8 items-center justify-center bg-black text-white transition-transform group-hover:rotate-[-4deg]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </form>

              <div className={`mt-8 flex items-start gap-3 border-t pt-5 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-[#41B883]" />
                <p className={`font-mono text-[8px] leading-relaxed tracking-[0.06em] ${isDark ? 'text-white/35' : 'text-black/40'}`}>
                  ENCRYPTED ADMIN ACCESS · ACTIVITY MONITORED · OH MAN SYSTEMS
                </p>
              </div>
            </div>

            <footer className={`flex items-center justify-between border-t pt-4 font-mono text-[7px] tracking-[0.12em] ${isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/35'}`}>
              <span>© 2026 OH MAN.</span>
              <span>EST. 2013 / MUMBAI</span>
            </footer>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-[#0B0B0B] font-sans text-white">
      <aside className="z-20 hidden w-52 flex-none flex-col justify-between border-r-2 border-[#292929] bg-[#0B0B0B] p-3 md:flex">
        <div>
          <div className="flex items-start justify-between border-b-2 border-[#262626] pb-5 pt-2">
            <h1 className="font-bebas text-[25px] leading-[0.82] tracking-wide text-white">
              OH
              <br />
              MAN.
            </h1>
            <span className="om-stamp mt-1 bg-[#f7c318] px-1 font-mono text-[7px] leading-3 text-black">OM<br/>SYS</span>
          </div>

          <nav className="mt-5 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'dashboard' ? 'bg-[#F7C318] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>DASHBOARD</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'products' ? 'bg-[#F7C318] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Package className="w-5 h-5" />
              <span>PRODUCTS</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'categories' ? 'bg-[#F7C318] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Grid className="w-5 h-5" />
              <span>CATEGORIES</span>
            </button>

            <button
              onClick={() => setActiveTab('banners')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'banners' ? 'bg-[#F7C318] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Image className="w-5 h-5" />
              <span>BANNERS</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'contacts' ? 'bg-[#F7C318] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Users className="w-5 h-5" />
              <span>CONTACTS</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'settings' ? 'bg-[#F7C318] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Settings className="w-5 h-5" />
              <span>SETTINGS</span>
            </button>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="pt-4 border-t border-[#262626]">
          <button
            type="button"
            onClick={() => setIsLoggedOut(true)}
            className="w-full flex items-center space-x-2 text-accentDanger font-bebas text-sm hover:underline"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#0B0B0B]">
        {/* Top Navbar */}
        <header className="relative z-10 flex h-14 flex-none items-center justify-end border-b-2 border-[#292929] bg-[#0B0B0B] px-4 lg:px-5">
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center space-x-3 text-center">
            <h2 className="font-bebas text-[26px] uppercase tracking-wider text-white">
              {activeTab}
            </h2>
            <span className="hidden border border-[#363636] px-2 py-1 font-mono text-[8px] text-textGray sm:inline">CATALOGUE / ISSUE 01</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 border border-[#333] bg-[#171717] px-2 py-1 font-mono text-[9px] text-[#F7C318]">
              <span className="w-2 h-2 rounded-full bg-accentSuccess animate-pulse"></span>
              <span>ADMIN: LIVE SYSTEM</span>
            </div>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <div className="flex-1 space-y-5 overflow-y-auto p-3 lg:p-5">

          {/* VIEW: DASHBOARD STATS & OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 gap-2 xl:grid-cols-4 xl:gap-3">
                <div className="flex items-center justify-between border-2 border-[#303030] bg-[#111] p-3 shadow-[3px_3px_0_#1d1d1d]">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">TOTAL PRODUCTS</span>
                    <span className="font-bebas text-[34px] font-bold text-white">{products.length.toLocaleString()}</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#F7C318]">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-2 border-[#303030] bg-[#111] p-3 shadow-[3px_3px_0_#1d1d1d]">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">CATEGORIES</span>
                    <span className="font-bebas text-[34px] font-bold text-white">06</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#F7C318]">
                    <Grid className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#303030] bg-[#111] p-3">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">TOTAL ENQUIRIES</span>
                    <span className="font-bebas text-[34px] font-bold text-white">428</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#D9432E]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#303030] bg-[#111] p-3">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">TOTAL VIEWS</span>
                    <span className="font-bebas text-[34px] font-bold text-white">8.4K</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#F7C318]">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                {[
                  ['HOT LEADS', '18', 'READY FOR CALLBACK'],
                  ['WHATSAPP CLICKS', '286', 'LAST 7 DAYS'],
                  ['AVG. RESPONSE', '18 MIN', 'CLIENT-FRIENDLY'],
                ].map(([label, value, helper]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveTab('contacts')}
                    className="group flex items-center justify-between border border-[#303030] bg-[#141414] p-4 text-left transition-colors hover:border-[#F7C318]"
                  >
                    <div>
                      <span className="font-mono text-[9px] text-textGray">{label}</span>
                      <p className="font-bebas text-3xl text-white group-hover:text-[#F7C318]">{value}</p>
                    </div>
                    <span className="max-w-24 text-right font-mono text-[8px] leading-tight text-[#F7C318]">{helper}</span>
                  </button>
                ))}
              </div>

              {/* Recent Products Table */}
              <div className="space-y-3 border border-[#303030] bg-[#111] p-3 lg:p-4">
                <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">RECENT PRODUCTS</h3>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="bg-[#222] hover:bg-[#F7C318] hover:text-black border border-[#333] px-3 py-1 text-xs font-mono transition-colors"
                  >
                    VIEW ALL
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#262626] font-mono text-xs text-textGray">
                        <th className="py-2 px-3">PRODUCT</th>
                        <th className="py-2 px-3">CATEGORY</th>
                        <th className="py-2 px-3">PRICE</th>
                        <th className="py-2 px-3">STATUS</th>
                        <th className="py-2 px-3 text-right">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222] font-mono text-xs">
                      {products.slice(0, 5).map(prod => (
                        <tr
                          key={prod.id}
                          onClick={() => onSelectProductForMobilePreview(prod.id)}
                          className="cursor-pointer transition-colors hover:bg-[#202020]"
                        >
                          <td className="py-3 px-3 flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#111] border border-[#333] flex-shrink-0">
                              <img src={prod.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bebas text-base text-white">{prod.name}</span>
                          </td>
                          <td className="py-3 px-3 text-textGray">{prod.category}</td>
                          <td className="py-3 px-3 text-[#F7C318] font-bold">₹{prod.price}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-[#222] text-[#7CFC7C] border border-[#333] text-[10px]">
                              {prod.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right text-[9px] text-textGray">
                            {new Date(prod.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PRODUCTS TABLE & CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-[#171717] p-4 border border-[#262626]">
                <div className="flex items-center space-x-2 flex-1">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="SEARCH PRODUCTS..." 
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-[#333] px-3 py-2 text-xs font-mono text-white placeholder-textGray focus:outline-none focus:border-[#F7C318]"
                    />
                    <Search className="w-4 h-4 text-textGray absolute right-3 top-2.5" />
                  </div>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-[#0B0B0B] border border-[#333] px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#F7C318]"
                  >
                    <option value="ALL">ALL CATEGORIES</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="bg-[#D9432E] hover:bg-[#6D28D9] text-white font-bebas text-base px-4 py-2 border border-black shadow-[3px_3px_0px_#000] flex items-center justify-center space-x-2 active:translate-x-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD PRODUCT</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-[#171717] border border-[#262626] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#262626] font-mono text-xs text-textGray bg-[#141414]">
                      <th className="py-3 px-4">IMAGE</th>
                      <th className="py-3 px-4">PRODUCT NAME</th>
                      <th className="py-3 px-4">CATEGORY</th>
                      <th className="py-3 px-4">PRICE</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222] font-mono text-xs">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-[#202020] transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 bg-[#0B0B0B] border border-[#333] overflow-hidden">
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bebas text-base text-white tracking-wide">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 text-textGray">{product.category}</td>
                        <td className="py-3 px-4 text-[#F7C318] font-bold">₹{product.price}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`border border-[#333] bg-[#222] px-2 py-0.5 text-[10px] ${
                              product.status === 'ACTIVE'
                                ? 'text-[#7CFC7C]'
                                : product.status === 'DRAFT'
                                  ? 'text-[#F7C318]'
                                  : 'text-[#9CA3AF]'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button 
                            onClick={() => onSelectProductForMobilePreview(product.id)}
                            className="p-1 bg-[#222] hover:bg-[#F7C318] hover:text-black border border-[#333] inline-flex items-center"
                            title="Preview on Mobile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onDeleteProduct(product.id)}
                            className="p-1 bg-[#222] hover:bg-[#FF4D6D] hover:text-black border border-[#333] inline-flex items-center"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-[#2b2b2b] bg-[#111] px-4 py-3">
                  <span className="font-mono text-[10px] text-textGray">
                    SHOWING {filteredProducts.length} OF {products.length} PRODUCTS
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="border border-[#333] bg-[#1d1d1d] px-2 py-1 font-mono text-[9px] text-textGray">
                      PREV
                    </button>
                    <span className="bg-[#F7C318] px-2 py-1 font-mono text-[9px] font-bold text-black">01</span>
                    <button className="border border-[#333] bg-[#1d1d1d] px-2 py-1 font-mono text-[9px] text-white">
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: CATEGORIES GRID */}
          {activeTab === 'categories' && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#F7C318]">VISUAL CATALOGUE</p>
                <h2 className="mt-1 font-bebas text-4xl text-white">SHOP CATEGORIES</h2>
                <p className="mx-auto mt-1 max-w-lg text-xs text-textGray">Every category now has a visual cover so the catalogue feels real at a glance.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categories.map((cat, index) => {
                  const categoryItems = products.filter(product => product.category === cat.name);
                  const cover = categoryItems[0] ?? products[index % products.length];
                  return (
                    <article key={cat.id} className="group overflow-hidden rounded-xl border border-[#303030] bg-[#141414]">
                      <div className="relative h-48 overflow-hidden bg-[#ece7de]">
                        {cover && <img src={cover.images[0]} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                        <span className="absolute right-3 top-3 rounded-full bg-[#F7C318] px-2.5 py-1 font-mono text-[8px] font-bold text-black">{cat.productCount} STYLES</span>
                        <h3 className="absolute inset-x-0 bottom-4 text-center font-bebas text-3xl tracking-wide text-white">{cat.name}</h3>
                      </div>
                      <div className="p-4 text-center">
                        <p className="mx-auto min-h-8 max-w-sm text-xs leading-relaxed text-textGray">{cat.description}</p>
                        <div className="mt-4 flex items-center justify-center gap-5 border-t border-[#2a2a2a] pt-3 font-mono text-[9px]">
                          <button className="text-[#F7C318] hover:underline">EDIT CATEGORY</button>
                          <span className="text-[#777]">{categoryItems.length} LIVE</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 border border-[#303030] bg-[#141414] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bebas text-xl text-white">CAMPAIGN BANNERS</p>
                  <p className="font-mono text-[10px] text-textGray">MANAGE MOBILE HOME PROMOTIONS AND SCHEDULED DROPS</p>
                </div>
                <button className="flex items-center justify-center gap-2 border border-black bg-[#D9432E] px-4 py-2 font-bebas text-sm text-white shadow-[3px_3px_0_#000]">
                  <Plus className="h-4 w-4" /> NEW BANNER
                </button>
              </div>

              <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                {demoBanners.map((banner, index) => (
                  <article key={banner.id} className="overflow-hidden border border-[#303030] bg-[#141414]">
                    <div className="relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-[#0a0a0a] p-4">
                      <span
                        className="absolute -right-10 top-0 h-full w-32 rotate-[12deg]"
                        style={{ backgroundColor: banner.accent }}
                      />
                      <div className="relative z-10 flex items-start justify-between">
                        <span className="font-mono text-[9px] text-[#aaa]">{banner.eyebrow}</span>
                        <span className="font-mono text-lg text-[#555]">0{index + 1}</span>
                      </div>
                      <div className="relative z-10 max-w-[75%]">
                        <h3 className="font-bebas text-[34px] leading-[0.86] text-white">{banner.title}</h3>
                        <p className="mt-2 text-[10px] leading-snug text-[#b5b5b5]">{banner.copy}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span
                        className={`border border-[#333] px-2 py-1 font-mono text-[9px] ${
                          banner.status === 'LIVE'
                            ? 'text-[#7CFC7C]'
                            : banner.status === 'SCHEDULED'
                              ? 'text-[#F7C318]'
                              : 'text-textGray'
                        }`}
                      >
                        {banner.status}
                      </span>
                      <div className="flex items-center gap-2 text-textGray">
                        <Calendar className="h-4 w-4" />
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['NEW ENQUIRIES', '12', 'LAST 24 HOURS'],
                  ['QUALIFIED LEADS', '34', 'THIS MONTH'],
                  ['RESPONSE RATE', '92%', 'AVG. 18 MIN'],
                ].map(([label, value, helper]) => (
                  <div key={label} className="flex items-center justify-between border border-[#303030] bg-[#141414] p-4">
                    <div>
                      <span className="font-mono text-[9px] text-textGray">{label}</span>
                      <p className="font-bebas text-3xl text-white">{value}</p>
                    </div>
                    <span className="font-mono text-[8px] text-[#F7C318]">{helper}</span>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto border border-[#303030] bg-[#141414]">
                <div className="flex items-center justify-between border-b border-[#303030] p-4">
                  <div>
                    <h3 className="font-bebas text-xl text-white">CUSTOMER CONTACTS</h3>
                    <p className="font-mono text-[9px] text-textGray">ENQUIRIES ACROSS WHATSAPP, SOCIAL AND WEB</p>
                  </div>
                  <button className="flex items-center gap-2 bg-[#F7C318] px-3 py-2 font-bebas text-sm text-black">
                    <MessageCircle className="h-4 w-4" /> NEW MESSAGE
                  </button>
                </div>
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="bg-[#101010] font-mono text-[9px] text-textGray">
                    <tr>
                      <th className="px-4 py-3">CONTACT</th>
                      <th className="px-4 py-3">INTEREST</th>
                      <th className="px-4 py-3">CHANNEL</th>
                      <th className="px-4 py-3">LOCATION</th>
                      <th className="px-4 py-3">STATUS</th>
                      <th className="px-4 py-3 text-right">LAST ACTIVE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#292929] font-mono text-[10px]">
                    {demoContacts.map(contact => (
                      <tr key={contact.name} className="hover:bg-[#1b1b1b]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center bg-[#292929] font-bebas text-sm text-[#F7C318]">
                              {contact.name.split(' ').map(part => part[0]).join('')}
                            </span>
                            <span className="font-bold text-white">{contact.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-textGray">{contact.interest}</td>
                        <td className="px-4 py-3 text-white">{contact.channel}</td>
                        <td className="px-4 py-3 text-textGray">{contact.location}</td>
                        <td className="px-4 py-3">
                          <span className="border border-[#333] px-2 py-1 text-[#F7C318]">{contact.status}</span>
                        </td>
                        <td className="px-4 py-3 text-right text-textGray">{contact.lastSeen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: BUSINESS SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-[#171717] border-2 border-black p-6 shadow-[4px_4px_0px_#000] max-w-2xl space-y-4">
              <h3 className="font-bebas text-2xl text-white border-b border-[#262626] pb-2 uppercase">STORE DETAILS</h3>
              
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-textGray mb-1">BUSINESS NAME</label>
                  <input 
                    type="text" 
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({...settingsForm, name: e.target.value})}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-textGray mb-1">PHONE NUMBER</label>
                    <input 
                      type="text" 
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                      className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                    />
                  </div>
                  <div>
                    <label className="block text-textGray mb-1">WHATSAPP</label>
                    <input 
                      type="text" 
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({...settingsForm, whatsapp: e.target.value})}
                      className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-textGray mb-1">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-textGray mb-1">WEBSITE</label>
                    <input
                      type="text"
                      value={settingsForm.website}
                      onChange={(e) => setSettingsForm({...settingsForm, website: e.target.value})}
                      className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                    />
                  </div>
                  <div>
                    <label className="block text-textGray mb-1">INSTAGRAM</label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({...settingsForm, instagram: e.target.value})}
                      className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-textGray mb-1">PHYSICAL ADDRESS</label>
                  <textarea 
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                    rows={2}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                  />
                </div>

                <button 
                  onClick={() => onUpdateSettings(settingsForm)}
                  className="bg-[#F7C318] text-black font-bebas text-lg px-6 py-2 border border-black shadow-[3px_3px_0px_#000] font-bold active:translate-x-0.5"
                >
                  SAVE CHANGES
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ADD PRODUCT MODAL / DRAWER */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/75 backdrop-blur-sm">
          <div className="h-full w-full max-w-2xl space-y-4 overflow-y-auto border-l border-[#333] bg-[#141414] p-5 shadow-[-12px_0_40px_rgba(0,0,0,.55)]">
            <div className="flex justify-between items-center border-b border-[#262626] pb-3">
              <h3 className="font-bebas text-3xl text-white tracking-wider">ADD PRODUCT</h3>
              <button 
                onClick={() => setIsAddProductModalOpen(false)}
                className="w-8 h-8 bg-[#222] border border-[#333] flex items-center justify-center text-textGray hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-textGray mb-1">PRODUCT NAME</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Summit Pro 40L"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-textGray mb-1">CATEGORY</label>
                  <select 
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-textGray mb-1">PRICE (₹)</label>
                  <input 
                    type="number"
                    required
                    placeholder="3499"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-textGray mb-1">IMAGE URL (OPTIONAL)</label>
                <input 
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProdImageUrl}
                  onChange={(e) => setNewProdImageUrl(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                />
              </div>

              {/* Upload Dropzone Placeholder */}
              <div className="border-2 border-dashed border-[#333] p-4 text-center bg-[#111] hover:border-[#F7C318] transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-[#F7C318] mx-auto mb-1" />
                <span className="font-bebas text-sm text-white uppercase block">CLICK TO UPLOAD OR DRAG AND DROP</span>
                <span className="text-[10px] text-textGray">SVG, PNG, JPG (MAX 800x800px)</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="aspect-square overflow-hidden border border-[#333] bg-[#ddd] p-1">
                    <img src={product.images[0]} alt="" className="h-full w-full object-cover grayscale" />
                  </div>
                ))}
                <button
                  type="button"
                  className="flex aspect-square items-center justify-center border border-[#333] bg-[#1b1b1b] text-2xl text-textGray hover:border-[#F7C318] hover:text-[#F7C318]"
                >
                  +
                </button>
              </div>

              <div>
                <label className="block text-textGray mb-1">DESCRIPTION</label>
                <textarea 
                  rows={3}
                  placeholder="Enter product description..."
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                />
              </div>

              <div>
                <label className="block text-textGray mb-1">FEATURES (ONE PER LINE)</label>
                <textarea 
                  rows={2}
                  placeholder="Water Resistant&#10;40L Capacity"
                  value={newProdFeatures}
                  onChange={(e) => setNewProdFeatures(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#F7C318]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox"
                  id="featured"
                  checked={newProdFeatured}
                  onChange={(e) => setNewProdFeatured(e.target.checked)}
                  className="accent-[#F7C318] w-4 h-4"
                />
                <label htmlFor="featured" className="text-white cursor-pointer font-bebas text-base">FEATURE ON HOME CAROUSEL</label>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="bg-[#222] text-white font-bebas text-base px-4 py-2 border border-[#333]"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="bg-[#F7C318] text-black font-bebas text-base px-6 py-2 border border-black shadow-[3px_3px_0px_#000] font-bold"
                >
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
