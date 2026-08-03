import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Sparkles, RefreshCw } from 'lucide-react';
import { Product, Category, BusinessSettings } from './types';
import { catalogueService } from './services/catalogueService';
import { MobileSimulator } from './components/mobile/MobileSimulator';
import { DashboardView } from './components/dashboard/DashboardView';

export function App() {
  const [viewMode, setViewMode] = useState<'split' | 'dashboard' | 'mobile'>('mobile');
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
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-[#0B0B0B]">
        <div className="flex h-24 w-40 items-center justify-center border-2 border-black bg-[#F7C318] p-4 shadow-[5px_5px_0px_#fff] animate-pulse">
          <img src="/ohman-logo.png" alt="OH MAN" className="h-full w-full object-contain" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.18em] text-white/60">
          LOADING OH MAN...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#0B0B0B] om-shell">
      <header className="z-50 flex h-12 flex-shrink-0 items-center justify-between border-b-2 border-black bg-[#f4f2eb] px-3 text-black sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-[76px] items-center border border-black bg-[#F7C318] px-2 shadow-[2px_2px_0_#000]">
            <img src="/ohman-logo.png" alt="OH MAN" className="h-full w-full object-contain" />
          </span>
          <span className="hidden font-mono text-[9px] font-medium tracking-[0.1em] text-black sm:inline">
            MAZGAON, MUMBAI / EST. 2013
          </span>
        </div>

          <div className="flex items-center gap-0.5 border-2 border-black bg-black p-0.5 shadow-[2px_2px_0_#000]">
          <button
            onClick={() => setViewMode('split')}
            className={`hidden items-center gap-1 px-2 py-1 font-bebas text-[10px] tracking-wider transition-colors lg:flex ${
              viewMode === 'split'
                ? 'bg-[#F7C318] text-black'
                : 'text-textGray hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DUAL VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center gap-1 px-2 py-1 font-bebas text-[10px] tracking-wider transition-colors ${
              viewMode === 'dashboard'
                ? 'bg-[#F7C318] text-black'
                : 'text-textGray hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>DASHBOARD</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2 py-1 font-bebas text-[10px] tracking-wider transition-colors ${
              viewMode === 'mobile'
                ? 'bg-[#F7C318] text-black'
                : 'text-textGray hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE</span>
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        {viewMode === 'split' && (
          <div className="flex h-full divide-x divide-[#303030]">
            <div className="h-full min-w-0 flex-1 overflow-hidden">
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
            <div className="hidden h-full w-[430px] flex-none items-center justify-center overflow-hidden border-l border-black bg-[#111] p-3 bg-grid-pattern lg:flex">
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
          <div className="h-full min-h-0">
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
          <div className="flex h-full items-center justify-center bg-[#111] p-2 bg-grid-pattern">
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
