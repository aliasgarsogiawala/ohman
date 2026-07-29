import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  AtSign,
  Backpack,
  BatteryFull,
  Footprints,
  Grid3X3,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  PackageSearch,
  Phone,
  Search,
  Share2,
  Shirt,
  Signal,
  SlidersHorizontal,
  Sun,
  User,
  UsersRound,
  Wifi,
  Play,
  X,
} from 'lucide-react';
import { BusinessSettings, Category, Product } from '../../types';

interface MobileSimulatorProps {
  products: Product[];
  categories: Category[];
  businessSettings: BusinessSettings;
  activeProductId?: string;
  onProductSelect?: (id: string) => void;
}

type TabType = 'home' | 'categories' | 'search' | 'contact' | 'profile';

const categoryIcons = [Footprints, Backpack, PackageSearch, Shirt, SlidersHorizontal, Grid3X3];

const ProductImage = ({
  product,
  className = '',
}: {
  product: Product;
  className?: string;
}) => (
  <img
    src={product.images[0]}
    alt={product.name}
    className={`h-full w-full object-contain ${className}`}
  />
);

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  products,
  categories,
  businessSettings,
  activeProductId,
  onProductSelect,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [landingTheme, setLandingTheme] = useState<'light' | 'dark'>('light');
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!activeProductId) return;
    const product = products.find((item) => item.id === activeProductId);
    if (product) {
      setShowIntro(false);
      setCurrentProduct(product);
    }
  }, [activeProductId, products]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab, currentProduct, showIntro]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          selectedCategory === 'ALL' ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();
        const query = searchQuery.toLowerCase();
        return (
          matchesCategory &&
          (product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query))
        );
      }),
    [products, searchQuery, selectedCategory],
  );

  const featuredProducts = products.filter((product) => product.featured);
  const heroProduct = products.find((product) => product.category === 'T-Shirts') ?? products[0];
  const landingProducts = products
    .filter((product) => product.category === 'T-Shirts' || product.category === 'Shoes')
    .slice(0, 6);

  const openProduct = (product: Product) => {
    setIsMenuOpen(false);
    setShowIntro(false);
    setCurrentProduct(product);
    onProductSelect?.(product.id);
  };

  const navigate = (tab: TabType) => {
    setIsMenuOpen(false);
    setShowIntro(tab === 'home');
    setCurrentProduct(null);
    setActiveTab(tab);
  };

  const toggleWishlist = (id: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="mobile-shell relative flex w-[390px] max-w-[calc(100vw-20px)] flex-col overflow-hidden rounded-[26px] border-[5px] border-[#252525] bg-[#090909] shadow-[8px_8px_0_#F7C318,0_24px_70px_rgba(0,0,0,.55)]"
        style={{ height: 'min(800px, calc(100dvh - 76px))', minHeight: 570 }}
      >
        <div className={`relative z-50 flex h-7 flex-none items-center justify-between px-4 text-[10px] font-semibold transition-colors ${
          showIntro && landingTheme === 'light' ? 'bg-[#faf9f6] text-black' : 'bg-[#090909] text-white'
        }`}>
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" strokeWidth={2.6} />
            <Wifi className="h-3 w-3" strokeWidth={2.6} />
            <BatteryFull className="h-3.5 w-3.5" strokeWidth={2.6} />
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 bottom-0 top-7 z-40">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              className={`absolute bottom-0 left-0 top-0 flex w-[82%] flex-col shadow-[12px_0_0_#f7c318] ${
                landingTheme === 'dark' ? 'bg-[#111] text-white' : 'bg-[#f6f3ed] text-black'
              }`}
            >
              <div className="flex items-start justify-between border-b border-black/15 px-4 py-4">
                <div>
                  <div className="ohman-wordmark text-[28px] leading-none">OH MAN</div>
                  <p className="mt-1 font-mono text-[7px] tracking-[0.16em] text-[#6f6a62]">MENSWEAR / MAZGAON</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="px-3 py-4">
                {(
                  [
                    ['home', Home, 'HOME', 'Latest drops & featured styles'],
                    ['categories', Grid3X3, 'CATEGORIES', 'Browse the full range'],
                    ['search', Search, 'SEARCH', 'Find any product quickly'],
                    ['contact', MessageCircle, 'ENQUIRE', 'Talk to the Oh Man team'],
                    ['profile', User, 'PROFILE', 'Saved styles & preferences'],
                  ] as const
                ).map(([tab, Icon, label, helper], index) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => navigate(tab)}
                    className={`group flex w-full items-center gap-3 border-b border-black/10 px-2 py-3 text-left ${
                      activeTab === tab ? 'bg-[#f7c318]' : 'hover:bg-white'
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bebas text-base leading-none tracking-wide">{label}</span>
                      <span className="mt-1 block truncate text-[8px] text-[#716b62]">{helper}</span>
                    </span>
                    <span className="font-mono text-[8px] text-[#8a847b]">0{index + 1}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-auto p-4">
                <div className="rounded-lg bg-black p-4 text-white">
                  <p className="font-mono text-[7px] tracking-[0.15em] text-[#f7c318]">NEED HELP CHOOSING?</p>
                  <p className="mt-1 font-bebas text-xl leading-none">TALK TO US.</p>
                  <a
                    href={`https://wa.me/${businessSettings.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center justify-between rounded bg-[#f7c318] px-3 py-2 font-bebas text-xs text-black"
                  >
                    WHATSAPP OH MAN
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        )}

        {showIntro ? (
          <section className={`mobile-scroll flex min-h-0 flex-1 flex-col overflow-y-auto transition-colors duration-300 ${
            landingTheme === 'dark' ? 'bg-[#0c0c0c] text-white' : 'bg-[#faf9f6] text-black'
          }`}>
            <div className="flex h-7 flex-none items-center justify-center bg-[#f7c318] font-mono text-[7px] font-bold tracking-[0.15em] text-black">
              NEW DROPS IN STORE • MAZGAON • OPEN 10AM–9PM
            </div>

            <header className={`flex h-14 flex-none items-center justify-between border-b px-4 ${
              landingTheme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-start"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="ohman-wordmark text-[24px] leading-none">OH MAN</div>
                <p className="mt-1 font-mono text-[6px] tracking-[0.2em] opacity-55">MENSWEAR / MUMBAI</p>
              </div>
              <button
                type="button"
                onClick={() => setLandingTheme(theme => theme === 'light' ? 'dark' : 'light')}
                aria-label={`Switch to ${landingTheme === 'light' ? 'dark' : 'light'} theme`}
                className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                  landingTheme === 'dark' ? 'border-white/20 bg-white text-black' : 'border-black/15 bg-black text-white'
                }`}
              >
                {landingTheme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </header>

            <div className="px-4 pt-3">
              <button
                type="button"
                onClick={() => navigate('search')}
                className={`flex h-10 w-full items-center gap-2 rounded-full border px-4 text-left text-[9px] ${
                  landingTheme === 'dark'
                    ? 'border-white/15 bg-[#181818] text-[#aaa]'
                    : 'border-black/10 bg-white text-[#777] shadow-[0_4px_16px_rgba(0,0,0,.05)]'
                }`}
              >
                <Search className="h-4 w-4" />
                What are you looking for?
              </button>
            </div>

            <section className="pt-4">
              <div className="mb-2 flex items-end justify-between px-4">
                <h2 className="font-bebas text-lg tracking-wide">SHOP CATEGORIES</h2>
                <button type="button" onClick={() => navigate('categories')} className="font-mono text-[7px] underline underline-offset-4">VIEW ALL</button>
              </div>
              <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none">
                {[
                  ['T-SHIRTS', landingProducts[0]],
                  ['SHIRTS', landingProducts[1]],
                  ['JEANS', landingProducts[2]],
                  ['SNEAKERS', landingProducts[3]],
                  ['ACCESSORIES', landingProducts[4]],
                ].map(([label, product]) => (
                  <button
                    type="button"
                    key={label as string}
                    onClick={() => navigate('categories')}
                    className="w-[68px] flex-none text-center"
                  >
                    <span className={`block h-[68px] overflow-hidden rounded-full border-2 ${
                      landingTheme === 'dark' ? 'border-[#333] bg-[#181818]' : 'border-white bg-[#eee9e0] shadow-sm'
                    }`}>
                      {product && <ProductImage product={product as Product} />}
                    </span>
                    <span className="mt-1.5 block font-bebas text-[8px] tracking-[0.08em]">{label as string}</span>
                  </button>
                ))}
              </div>
            </section>

            {heroProduct && (
              <button
                type="button"
                onClick={() => openProduct(heroProduct)}
                className={`relative mx-4 mt-3 block h-[248px] w-[calc(100%_-_2rem)] overflow-hidden rounded-2xl text-left ${
                  landingTheme === 'dark' ? 'bg-[#1c1c1c]' : 'bg-[#e9e2d6]'
                }`}
              >
                <div className="absolute inset-y-0 right-0 w-[58%] bg-[#f7c318]" />
                <div className="relative z-20 flex h-full max-w-[52%] flex-col p-4">
                  <span className="font-mono text-[7px] font-bold tracking-[0.16em] text-[#D9432E]">OH MAN ORIGINALS</span>
                  <h1 className="mt-3 font-bebas text-[39px] leading-[0.84] tracking-[-0.015em]">
                    EVERYDAY
                    <br />
                    LOOKS.
                    <br />
                    BETTER.
                  </h1>
                  <p className="mt-3 max-w-[128px] text-[8px] leading-relaxed opacity-65">Fresh casualwear made for Mumbai days and after-hours plans.</p>
                  <span className={`mt-auto inline-flex w-fit items-center gap-1 border-b pb-0.5 font-bebas text-[10px] tracking-wide ${
                    landingTheme === 'dark' ? 'border-white' : 'border-black'
                  }`}>
                    EXPLORE COLLECTION <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-3 h-[228px] w-[220px]">
                  <ProductImage product={heroProduct} className="drop-shadow-[0_20px_12px_rgba(0,0,0,.2)]" />
                </div>
              </button>
            )}

            <section className="px-4 pb-4 pt-5">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[7px] tracking-[0.14em] text-[#D9432E]">JUST LANDED</p>
                  <h2 className="font-bebas text-[21px] leading-none">NEW & TRENDING</h2>
                </div>
                <button type="button" onClick={() => navigate('search')} className="font-mono text-[7px] underline underline-offset-4">SEE ALL</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(landingProducts.length ? landingProducts : featuredProducts).slice(0, 4).map((product) => (
                  <button type="button" key={product.id} onClick={() => openProduct(product)} className="min-w-0 text-left">
                    <div className={`relative h-[164px] overflow-hidden rounded-xl ${
                      landingTheme === 'dark' ? 'bg-[#181818]' : 'bg-[#f0ece5]'
                    }`}>
                      <ProductImage product={product} />
                      <span className="absolute left-2 top-2 rounded-full bg-[#f7c318] px-2 py-1 font-mono text-[6px] font-bold text-black">NEW</span>
                    </div>
                    <p className="mt-2 truncate text-[9px] font-semibold">{product.name}</p>
                    <p className="mt-0.5 font-mono text-[8px] opacity-60">₹{product.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </section>

            <nav className={`sticky bottom-0 mt-auto grid h-14 flex-none grid-cols-5 border-t backdrop-blur-xl ${
              landingTheme === 'dark' ? 'border-white/10 bg-black/95' : 'border-black/10 bg-white/95'
            }`}>
              {(
                [
                  ['home', Home, 'HOME'],
                  ['categories', Grid3X3, 'CATEGORIES'],
                  ['search', Search, 'SEARCH'],
                  ['contact', MessageCircle, 'ENQUIRE'],
                  ['profile', User, 'PROFILE'],
                ] as const
              ).map(([tab, Icon, label]) => (
                <button type="button" key={tab} onClick={() => navigate(tab)} className={`flex flex-col items-center justify-center gap-0.5 ${tab === 'home' ? 'text-[#D9432E]' : 'opacity-55'}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  <span className="font-bebas text-[7px] tracking-wide">{label}</span>
                </button>
              ))}
            </nav>
          </section>
        ) : (
          <>
            <div className="flex h-11 flex-none items-center justify-between border-b border-[#202020] bg-[#090909] px-4">
              {currentProduct ? (
                <button
                  type="button"
                  onClick={() => setCurrentProduct(null)}
                  aria-label="Back to products"
                  className="text-white transition-colors hover:text-[#f7c318]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  className="text-white transition-colors hover:text-[#f7c318]"
                >
                  <Menu className="h-4 w-4" />
                </button>
              )}

              <span className="font-bebas text-sm tracking-[0.08em] text-white">
                {currentProduct ? currentProduct.category : businessSettings.name}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (!currentProduct) navigate('contact');
                }}
                aria-label={currentProduct ? 'Share product' : 'Contact Oh Man'}
                className="text-white transition-colors hover:text-[#f7c318]"
              >
                {currentProduct ? (
                  <Share2 className="h-4 w-4" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
              </button>
            </div>

            <main
              ref={scrollRef}
              className="mobile-scroll relative min-h-0 flex-1 overflow-y-auto bg-[#090909]"
            >
              {currentProduct ? (
                <div className="pb-24">
                  <div className="relative h-[330px] overflow-hidden border-b border-black bg-[#151515]">
                    <div className="absolute inset-y-0 right-0 w-[54%] skew-x-[-11deg] bg-[#f7c318]" />
                    <div className="absolute left-4 top-3 z-10 max-w-[210px]">
                      <h1 className="font-bebas text-[42px] leading-[0.86] tracking-[-0.02em] text-white">
                        {currentProduct.name}
                      </h1>
                      <p className="mt-3 font-mono text-base font-bold text-white">
                        ₹{currentProduct.price.toLocaleString()}
                      </p>
                      {currentProduct.tag && (
                        <span className="mt-2 inline-flex border border-[#f7c318] bg-[#161616] px-2 py-1 font-mono text-[8px] text-[#f7c318]">
                          ★ {currentProduct.tag}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-0 z-10 h-[240px] w-[260px]">
                      <ProductImage product={currentProduct} className="drop-shadow-[0_20px_10px_rgba(0,0,0,.65)]" />
                    </div>
                    <div className="absolute bottom-4 left-[54%] z-20 font-mono text-xs text-black">
                      +&nbsp;&nbsp;+
                      <br />
                      &nbsp;&nbsp;+&nbsp;&nbsp;+
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1 border-b border-[#303030] bg-[#111] p-2">
                    {[...products.slice(0, 4), currentProduct].map((product, index) => (
                      <button
                        key={`${product.id}-${index}`}
                        type="button"
                        onClick={() => openProduct(product)}
                        className={`h-12 border bg-[#d4d4d4] p-1 ${
                          product.id === currentProduct.id
                            ? 'border-[#f7c318]'
                            : 'border-[#333]'
                        }`}
                      >
                        <ProductImage product={product} />
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="border-b border-[#333] pb-3">
                      <h2 className="font-bebas text-sm tracking-wide text-white">DESCRIPTION</h2>
                      <p className="mt-1 text-[10px] leading-[1.4] text-[#b9b9b9]">
                        {currentProduct.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="font-bebas text-sm tracking-wide text-white">FEATURES</h2>
                        <span className="font-mono text-base text-white">+</span>
                      </div>
                      <ul className="mt-1 space-y-0.5 text-[9px] leading-[1.3] text-[#d0d0d0]">
                        {currentProduct.features.map((feature) => (
                          <li key={feature}>+&nbsp; {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-30 flex gap-2 border-t border-[#242424] bg-[#090909] p-2">
                    <a
                      href={`tel:${businessSettings.phone}`}
                      className="flex-1 border border-black bg-[#f7c318] py-2.5 text-center font-bebas text-sm text-black"
                    >
                      ENQUIRE NOW
                    </a>
                    <a
                      href={`https://wa.me/${businessSettings.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 border border-black bg-[#d9432e] py-2.5 font-bebas text-sm text-white"
                    >
                      WHATSAPP <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === 'home' && (
                    <div className="space-y-4 px-3 pb-5 pt-2">
                      <div>
                        <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[#f7c318]">ISSUE 01 / 1500 OBJECTS</p>
                        <h1 className="font-bebas text-[34px] leading-[0.86] tracking-[-0.01em] text-white">
                          THE DAILY
                          <br />
                          <span className="text-[#f7c318]">UNIFORM.</span>
                        </h1>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate('search')}
                        className="flex h-9 w-full items-center justify-between border border-[#222] bg-[#f1f1f1] pl-3 text-left font-mono text-[9px] text-[#777]"
                      >
                        SEARCH PRODUCTS...
                        <span className="flex h-full w-11 items-center justify-center bg-[#f7c318] text-black">
                          <SlidersHorizontal className="h-4 w-4" />
                        </span>
                      </button>

                      <section>
                        <div className="mb-2 flex items-center justify-between">
                          <h2 className="font-bebas text-sm tracking-wide text-white">CATEGORIES</h2>
                          <button
                            type="button"
                            onClick={() => navigate('categories')}
                            className="font-mono text-[8px] text-[#b3b3b3]"
                          >
                            VIEW ALL
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {categories.slice(0, 6).map((category, index) => {
                            const Icon = categoryIcons[index % categoryIcons.length];
                            return (
                              <button
                                type="button"
                                key={category.id}
                                onClick={() => {
                                  setSelectedCategory(category.name);
                                  navigate('search');
                                }}
                                className="flex h-[82px] flex-col items-center justify-center border border-black bg-[#f0f0f0] text-black transition-transform active:translate-y-0.5"
                              >
                                <Icon className="h-8 w-8" strokeWidth={1.5} />
                                <span className="mt-2 font-bebas text-[10px] tracking-wide">
                                  {category.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </section>

                      <ProductGrid
                        title="FEATURED PRODUCTS"
                        products={featuredProducts.slice(0, 4)}
                        wishlist={wishlist}
                        onProductClick={openProduct}
                        onToggleWishlist={toggleWishlist}
                      />
                    </div>
                  )}

                  {activeTab === 'categories' && (
                    <div className="space-y-4 p-3">
                      <h1 className="font-bebas text-[34px] leading-none text-white">
                        SHOP BY
                        <br />
                        <span className="text-[#f7c318]">CATEGORY</span>
                      </h1>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category, index) => {
                          const Icon = categoryIcons[index % categoryIcons.length];
                          return (
                            <button
                              type="button"
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.name);
                                navigate('search');
                              }}
                              className="flex aspect-[1.25] flex-col items-start justify-between border border-black bg-[#ededed] p-3 text-left text-black"
                            >
                              <div className="flex w-full items-start justify-between">
                                <Icon className="h-8 w-8" strokeWidth={1.5} />
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                              <div>
                                <h2 className="font-bebas text-lg">{category.name}</h2>
                                <p className="font-mono text-[8px]">{category.productCount} PRODUCTS</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'search' && (
                    <div className="space-y-3 p-3">
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {['ALL', ...categories.map((category) => category.name)].map((category) => (
                          <button
                            type="button"
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-3 py-1.5 font-bebas text-[10px] ${
                              selectedCategory === category
                                ? 'bg-[#f7c318] text-black'
                                : 'border border-[#333] bg-[#171717] text-white'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <input
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="SEARCH PRODUCTS..."
                          aria-label="Search products"
                          className="h-9 w-full border border-[#333] bg-[#f2f2f2] px-3 pr-10 font-mono text-[9px] text-black outline-none focus:border-[#f7c318]"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-black" />
                      </div>
                      <ProductGrid
                        title={selectedCategory === 'ALL' ? 'ALL PRODUCTS' : selectedCategory}
                        products={filteredProducts}
                        wishlist={wishlist}
                        onProductClick={openProduct}
                        onToggleWishlist={toggleWishlist}
                      />
                    </div>
                  )}

                  {activeTab === 'contact' && (
                    <div className="hero-noise min-h-full space-y-5 px-4 py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="font-bebas text-[40px] leading-[0.88] text-white">
                            GET IN
                            <br />
                            TOUCH
                          </h1>
                          <p className="mt-2 text-[10px] text-[#c8c8c8]">We’re here to help.</p>
                        </div>
                        <div className="mt-1 flex h-16 w-16 items-center justify-center bg-[#d9432e] text-black">
                          <ArrowUpRight className="h-11 w-11" strokeWidth={2.8} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <ContactRow
                          icon={Phone}
                          label="PHONE"
                          value={businessSettings.phone}
                          href={`tel:${businessSettings.phone}`}
                        />
                        <ContactRow
                          icon={MessageCircle}
                          label="WHATSAPP"
                          value={businessSettings.whatsapp}
                          href={`https://wa.me/${businessSettings.whatsapp.replace(/\D/g, '')}`}
                        />
                        <ContactRow
                          icon={Mail}
                          label="EMAIL"
                          value={businessSettings.email}
                          href={`mailto:${businessSettings.email}`}
                        />
                        <ContactRow
                          icon={MapPin}
                          label="ADDRESS"
                          value={businessSettings.address}
                        />
                      </div>

                      <div className="border border-[#282828] p-3">
                        <span className="font-bebas text-[10px] text-[#aaa]">FOLLOW US</span>
                        <div className="mt-2 grid grid-cols-3 divide-x divide-[#333]">
                          {[AtSign, UsersRound, Play].map((Icon, index) => (
                            <button
                              type="button"
                              key={index}
                              aria-label={['Instagram', 'Facebook', 'YouTube'][index]}
                              className="flex items-center justify-center py-2 text-white hover:text-[#f7c318]"
                            >
                              <Icon className="h-4 w-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div className="space-y-4 p-4">
                      <div className="border border-[#303030] bg-[#151515] p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center bg-[#f7c318] font-bebas text-xl text-black">
                            OM
                          </div>
                          <div>
                            <h1 className="font-bebas text-2xl text-white">OH MAN MEMBER</h1>
                            <p className="font-mono text-[8px] text-[#f7c318]">ADVENTURE CLUB / 2026</p>
                          </div>
                        </div>
                      </div>
                      <div className="border border-[#303030] bg-[#151515] p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-bebas text-sm text-white">SAVED OBJECTS</span>
                          <span className="font-mono text-xs text-[#f7c318]">{wishlist.length}</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          {wishlist.length ? (
                            products
                              .filter((product) => wishlist.includes(product.id))
                              .map((product) => (
                                <button
                                  type="button"
                                  key={product.id}
                                  onClick={() => openProduct(product)}
                                  className="flex w-full items-center justify-between border-t border-[#2a2a2a] pt-2 text-left"
                                >
                                  <span className="font-bebas text-xs text-white">{product.name}</span>
                                  <span className="font-mono text-[9px] text-[#f7c318]">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                </button>
                              ))
                          ) : (
                            <p className="border-t border-[#2a2a2a] pt-3 font-mono text-[9px] text-[#888]">
                              NO SAVED PRODUCTS YET
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>

            {!currentProduct && (
              <nav className="grid h-14 flex-none grid-cols-5 border-t border-[#303030] bg-[#090909]">
                {(
                  [
                    ['home', Home, 'HOME'],
                    ['categories', Grid3X3, 'CATEGORIES'],
                    ['search', Search, 'SEARCH'],
                    ['contact', Phone, 'CONTACT'],
                    ['profile', User, 'PROFILE'],
                  ] as const
                ).map(([tab, Icon, label]) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => navigate(tab)}
                    className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                      activeTab === tab ? 'bg-[#f7c318] text-black' : 'text-[#a5a5a5]'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                    <span className="font-bebas text-[7px] tracking-wide">{label}</span>
                  </button>
                ))}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function ProductGrid({
  title,
  products,
  wishlist,
  onProductClick,
  onToggleWishlist,
}: {
  title: string;
  products: Product[];
  wishlist: string[];
  onProductClick: (product: Product) => void;
  onToggleWishlist: (id: string, event: React.MouseEvent) => void;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bebas text-sm tracking-wide text-white">{title}</h2>
        <span className="font-mono text-[8px] text-[#aaa]">VIEW ALL</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => (
          <button
            type="button"
            key={product.id}
            onClick={() => onProductClick(product)}
            className="group overflow-hidden border border-black bg-[#d8d8d8] text-left text-black"
          >
            <div className="relative h-[150px] overflow-hidden bg-[#cfcfcf]">
              <ProductImage
                product={product}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-0 top-0 h-full w-1 bg-[#f7c318]" />
              <span
                role="button"
                tabIndex={0}
                aria-label="Save product"
                onClick={(event) => onToggleWishlist(product.id, event)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    onToggleWishlist(product.id, event as unknown as React.MouseEvent);
                  }
                }}
                className="absolute right-2 top-2 text-black"
              >
                <Heart
                  className={`h-4 w-4 ${
                    wishlist.includes(product.id) ? 'fill-black' : ''
                  }`}
                />
              </span>
            </div>
            <div className="p-2">
              <h3 className="truncate font-bebas text-sm">{product.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="flex h-5 w-5 items-center justify-center bg-[#f7c318] text-base leading-none">
                  +
                </span>
              </div>
            </div>
          </button>
        ))}
        {!products.length && (
          <div className="col-span-2 flex min-h-36 flex-col items-center justify-center border border-dashed border-[#333] text-[#777]">
            <PackageSearch className="mb-2 h-7 w-7" />
            <span className="font-mono text-[9px]">NO OBJECTS FOUND</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <Icon className="h-5 w-5 flex-none text-black" strokeWidth={1.7} />
        <div className="min-w-0">
          <span className="block font-bebas text-[10px] text-black">{label}</span>
          <span className="block truncate font-mono text-[8px] text-[#333]">{value}</span>
        </div>
      </div>
      <span className="flex h-8 w-8 flex-none items-center justify-center bg-[#f7c318] text-black">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </>
  );

  const className =
    'flex min-h-14 items-center justify-between gap-3 border border-black bg-[#f1f1f1] p-2.5';

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
