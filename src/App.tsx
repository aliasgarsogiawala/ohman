import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Sparkles, RefreshCw } from 'lucide-react';
import { Product, Category, BusinessSettings } from './types';
import { catalogueService } from './services/catalogueService';
import { MobileSimulator } from './components/mobile/MobileSimulator';
import { DashboardView } from './components/dashboard/DashboardView';

export function App() {
  const [viewMode, setViewMode] = useState<'split' | 'dashboard' | 'mobile'>('split');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings | null>(null);
  const [activeMobileProductId, setActiveMobileProductId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [pList, cList, bSettings] = await Promise.all([
      catalogueService.getProducts(),
      catalogueService.getCategories(),
      catalogueService.getBusinessSettings()
    ]);
    setProducts(pList);
    setCategories(cList);
    setBusinessSettings(bSettings);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const created = await catalogueService.addProduct(newProd);
    setProducts(prev => [created, ...prev]);
    setActiveMobileProductId(created.id);
  };

  const handleDeleteProduct = async (id: string) => {
    await catalogueService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateSettings = async (updates: Partial<BusinessSettings>) => {
    const updated = await catalogueService.updateBusinessSettings(updates);
    setBusinessSettings(updated);
  };

  if (loading || !businessSettings) {
    return (
      <div className="h-screen bg-[#0B0B0B] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-[#D9FF3F] text-black font-bebas text-3xl flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_#000] animate-bounce">
          GZ
        </div>
        <span className="font-bebas text-2xl text-white tracking-widest animate-pulse">
          INITIALIZING NEOBRUTALIST PLATFORM...
        </span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0B0B0B] overflow-hidden">
      {/* GLOBAL PLATFORM SWITCHER BAR */}
      <header className="h-14 bg-[#141414] border-b-2 border-black px-4 flex items-center justify-between z-50 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-bebas text-xl text-[#D9FF3F] tracking-wider font-bold">
            GEAR ZONE SYSTEM
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] bg-[#7C3AED] text-white px-2 py-0.5 border border-black font-bold uppercase">
            NEOBRUTALIST HYBRID DEMO
          </span>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center space-x-1 bg-[#0B0B0B] border border-[#333] p-1">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 font-bebas text-xs tracking-wider flex items-center space-x-1 transition-all ${viewMode === 'split' ? 'bg-[#D9FF3F] text-black font-bold border border-black shadow-[2px_2px_0px_#000]' : 'text-textGray hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">SPLIT VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('dashboard')}
            className={`px-3 py-1 font-bebas text-xs tracking-wider flex items-center space-x-1 transition-all ${viewMode === 'dashboard' ? 'bg-[#D9FF3F] text-black font-bold border border-black shadow-[2px_2px_0px_#000]' : 'text-textGray hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>WEB DASHBOARD</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 font-bebas text-xs tracking-wider flex items-center space-x-1 transition-all ${viewMode === 'mobile' ? 'bg-[#D9FF3F] text-black font-bold border border-black shadow-[2px_2px_0px_#000]' : 'text-textGray hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE APP</span>
          </button>
        </div>
      </header>

      {/* VIEW LAYOUT CONTAINER */}
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'split' && (
          <div className="h-full flex divide-x-2 divide-black">
            {/* Left: Web CMS Dashboard */}
            <div className="flex-1 h-full overflow-hidden">
              <DashboardView
                products={products}
                categories={categories}
                businessSettings={businessSettings}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateSettings={handleUpdateSettings}
                onSelectProductForMobilePreview={(id) => setActiveMobileProductId(id)}
              />
            </div>
            {/* Right: Mobile App Simulator */}
            <div className="w-[420px] h-full bg-[#111] overflow-y-auto hidden xl:flex items-center justify-center p-4 border-l-2 border-black bg-grid-pattern">
              <MobileSimulator
                products={products}
                categories={categories}
                businessSettings={businessSettings}
                activeProductId={activeMobileProductId}
                onProductSelect={(id) => setActiveMobileProductId(id)}
              />
            </div>
          </div>
        )}

        {viewMode === 'dashboard' && (
          <div className="h-full">
            <DashboardView
              products={products}
              categories={categories}
              businessSettings={businessSettings}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onUpdateSettings={handleUpdateSettings}
              onSelectProductForMobilePreview={(id) => {
                setActiveMobileProductId(id);
                setViewMode('mobile');
              }}
            />
          </div>
        )}

        {viewMode === 'mobile' && (
          <div className="h-full bg-grid-pattern bg-[#0B0B0B] flex items-center justify-center p-4">
            <MobileSimulator
              products={products}
              categories={categories}
              businessSettings={businessSettings}
              activeProductId={activeMobileProductId}
              onProductSelect={(id) => setActiveMobileProductId(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
