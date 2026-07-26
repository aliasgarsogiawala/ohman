import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  Image, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Trash2, 
  Upload, 
  X, 
  Eye
} from 'lucide-react';
import { Product, Category, BusinessSettings } from '../../types';

interface DashboardViewProps {
  products: Product[];
  categories: Category[];
  businessSettings: BusinessSettings;
  onAddProduct: (prod: Omit<Product, 'id' | 'createdAt'>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateSettings: (settings: Partial<BusinessSettings>) => void;
  onSelectProductForMobilePreview: (id: string) => void;
}

type DashboardTab = 'dashboard' | 'products' | 'categories' | 'banners' | 'orders' | 'contacts' | 'settings';

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

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-[#0B0B0B] font-sans text-white">
      <aside className="z-20 hidden w-52 flex-none flex-col justify-between border-r border-[#292929] bg-[#0B0B0B] p-3 md:flex">
        <div>
          <div className="flex items-start justify-between border-b border-[#262626] pb-5 pt-2">
            <h1 className="font-bebas text-[25px] leading-[0.82] tracking-wide text-white">
              GEAR
              <br />
              ZONE.
            </h1>
            <span className="pt-1 font-mono text-sm leading-3 text-[#565656]">⋮</span>
          </div>

          <nav className="mt-5 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'dashboard' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>DASHBOARD</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'products' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Package className="w-5 h-5" />
              <span>PRODUCTS</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'categories' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Grid className="w-5 h-5" />
              <span>CATEGORIES</span>
            </button>

            <button
              onClick={() => setActiveTab('banners')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'banners' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Image className="w-5 h-5" />
              <span>BANNERS</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'orders' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>ORDERS</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'contacts' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Users className="w-5 h-5" />
              <span>CONTACTS</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 font-bebas text-sm tracking-wider transition-all border ${activeTab === 'settings' ? 'bg-[#D9FF3F] text-black border-black shadow-[3px_3px_0px_#000] font-bold' : 'text-textGray hover:text-white border-transparent hover:bg-[#171717]'}`}
            >
              <Settings className="w-5 h-5" />
              <span>SETTINGS</span>
            </button>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="pt-4 border-t border-[#262626]">
          <button className="w-full flex items-center space-x-2 text-accentDanger font-bebas text-sm hover:underline">
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#0B0B0B]">
        {/* Top Navbar */}
        <header className="z-10 flex h-14 flex-none items-center justify-between border-b border-[#292929] bg-[#0B0B0B] px-4 lg:px-5">
          <div className="flex items-center space-x-4">
            <h2 className="font-bebas text-[26px] uppercase tracking-wider text-white">
              {activeTab}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 border border-[#333] bg-[#171717] px-2 py-1 font-mono text-[9px] text-[#D9FF3F]">
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
                <div className="flex items-center justify-between border border-[#303030] bg-[#111] p-3">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">TOTAL PRODUCTS</span>
                    <span className="font-bebas text-[34px] font-bold text-white">245</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#D9FF3F]">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#303030] bg-[#111] p-3">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">CATEGORIES</span>
                    <span className="font-bebas text-[34px] font-bold text-white">18</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#D9FF3F]">
                    <Grid className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#303030] bg-[#111] p-3">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">TOTAL ORDERS</span>
                    <span className="font-bebas text-[34px] font-bold text-white">120</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#FF4D6D]">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#303030] bg-[#111] p-3">
                  <div>
                    <span className="text-[10px] font-mono text-textGray uppercase block">TOTAL VIEWS</span>
                    <span className="font-bebas text-[34px] font-bold text-white">8.4K</span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center text-[#D9FF3F]">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Recent Products Table */}
              <div className="space-y-3 border border-[#303030] bg-[#111] p-3 lg:p-4">
                <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">RECENT PRODUCTS</h3>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="bg-[#222] hover:bg-[#D9FF3F] hover:text-black border border-[#333] px-3 py-1 text-xs font-mono transition-colors"
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
                          <td className="py-3 px-3 text-[#D9FF3F] font-bold">₹{prod.price}</td>
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
                      className="w-full bg-[#0B0B0B] border border-[#333] px-3 py-2 text-xs font-mono text-white placeholder-textGray focus:outline-none focus:border-[#D9FF3F]"
                    />
                    <Search className="w-4 h-4 text-textGray absolute right-3 top-2.5" />
                  </div>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-[#0B0B0B] border border-[#333] px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D9FF3F]"
                  >
                    <option value="ALL">ALL CATEGORIES</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bebas text-base px-4 py-2 border border-black shadow-[3px_3px_0px_#000] flex items-center justify-center space-x-2 active:translate-x-0.5"
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
                        <td className="py-3 px-4 text-[#D9FF3F] font-bold">₹{product.price}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-[#222] text-[#7CFC7C] border border-[#333] text-[10px]">
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button 
                            onClick={() => onSelectProductForMobilePreview(product.id)}
                            className="p-1 bg-[#222] hover:bg-[#D9FF3F] hover:text-black border border-[#333] inline-flex items-center"
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
              </div>
            </div>
          )}

          {/* VIEW: CATEGORIES GRID */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-[#171717] border-2 border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-[#222] border border-[#333] flex items-center justify-center text-[#D9FF3F]">
                      <Grid className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-textGray">{cat.productCount} PRODUCTS</span>
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-white">{cat.name}</h3>
                    <p className="text-xs text-textGray font-sans">{cat.description}</p>
                  </div>
                  <div className="pt-2 border-t border-[#262626] flex justify-between">
                    <button className="text-xs font-mono text-[#D9FF3F] hover:underline">EDIT</button>
                    <button className="text-xs font-mono text-accentDanger hover:underline">DELETE</button>
                  </div>
                </div>
              ))}
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
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-textGray mb-1">PHONE NUMBER</label>
                    <input 
                      type="text" 
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                      className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-textGray mb-1">WHATSAPP</label>
                    <input 
                      type="text" 
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({...settingsForm, whatsapp: e.target.value})}
                      className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-textGray mb-1">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                  />
                </div>

                <div>
                  <label className="block text-textGray mb-1">PHYSICAL ADDRESS</label>
                  <textarea 
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                    rows={2}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                  />
                </div>

                <button 
                  onClick={() => onUpdateSettings(settingsForm)}
                  className="bg-[#D9FF3F] text-black font-bebas text-lg px-6 py-2 border border-black shadow-[3px_3px_0px_#000] font-bold active:translate-x-0.5"
                >
                  SAVE CHANGES
                </button>
              </div>
            </div>
          )}

          {/* GENERIC PLACEHOLDER FOR OTHER DASHBOARD TABS */}
          {['banners', 'orders', 'contacts'].includes(activeTab) && (
            <div className="bg-[#171717] border-2 border-black border-dashed p-12 text-center space-y-3">
              <span className="font-bebas text-3xl text-[#D9FF3F]">{activeTab.toUpperCase()} MODULE ACTIVE</span>
              <p className="font-mono text-xs text-textGray">CONNECTED TO MOCK CATALOGUE SERVICE</p>
            </div>
          )}
        </div>
      </main>

      {/* ADD PRODUCT MODAL / DRAWER */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#171717] border-2 border-black p-6 w-full max-w-xl shadow-[6px_6px_0px_#D9FF3F] space-y-4 max-h-[90vh] overflow-y-auto">
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
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-textGray mb-1">CATEGORY</label>
                  <select 
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
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
                    className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
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
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                />
              </div>

              {/* Upload Dropzone Placeholder */}
              <div className="border-2 border-dashed border-[#333] p-4 text-center bg-[#111] hover:border-[#D9FF3F] transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-[#D9FF3F] mx-auto mb-1" />
                <span className="font-bebas text-sm text-white uppercase block">CLICK TO UPLOAD OR DRAG AND DROP</span>
                <span className="text-[10px] text-textGray">SVG, PNG, JPG (MAX 800x800px)</span>
              </div>

              <div>
                <label className="block text-textGray mb-1">DESCRIPTION</label>
                <textarea 
                  rows={3}
                  placeholder="Enter product description..."
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                />
              </div>

              <div>
                <label className="block text-textGray mb-1">FEATURES (ONE PER LINE)</label>
                <textarea 
                  rows={2}
                  placeholder="Water Resistant&#10;40L Capacity"
                  value={newProdFeatures}
                  onChange={(e) => setNewProdFeatures(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#333] p-2 text-white focus:outline-none focus:border-[#D9FF3F]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox"
                  id="featured"
                  checked={newProdFeatured}
                  onChange={(e) => setNewProdFeatured(e.target.checked)}
                  className="accent-[#D9FF3F] w-4 h-4"
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
                  className="bg-[#D9FF3F] text-black font-bebas text-base px-6 py-2 border border-black shadow-[3px_3px_0px_#000] font-bold"
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
