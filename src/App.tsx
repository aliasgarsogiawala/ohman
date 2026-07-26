import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Sparkles, RefreshCw } from 'lucide-react';
import { Product, Category, BusinessSettings } from './types';
import { catalogueService } from './services/catalogueService';
import { MobileSimulator } from './components/mobile/MobileSimulator';
import { DashboardView } from './components/dashboard/DashboardView';

export function App() {
  const [viewMode, setViewMode] = useState<'split' | 'dashboard' | 'mobile'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 960 ? 'mobile' : 'split',
  );
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
        <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-[#D9FF3F] font-bebas text-3xl text-black shadow-[4px_4px_0px_#000] animate-bounce">
          GZ
        </div>
        <span className="font-bebas text-lg tracking-[0.18em] text-white animate-pulse">
          LOADING THE RANGE...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#0B0B0B]">
      <header className="z-50 flex h-11 flex-shrink-0 items-center justify-between border-b border-[#303030] bg-[#0c0c0c] px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-[#D9FF3F] font-bebas text-[11px] text-black">
            GZ
          </span>
          <span className="hidden font-bebas text-sm tracking-[0.12em] text-white sm:inline">
            GEAR ZONE / CATALOGUE SYSTEM
          </span>
        </div>

        <div className="flex items-center gap-0.5 border border-[#303030] bg-black p-0.5">
          <button
            onClick={() => setViewMode('split')}
            className={`hidden items-center gap-1 px-2 py-1 font-bebas text-[10px] tracking-wider transition-colors lg:flex ${
              viewMode === 'split'
                ? 'bg-[#D9FF3F] text-black'
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
                ? 'bg-[#D9FF3F] text-black'
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
                ? 'bg-[#D9FF3F] text-black'
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
