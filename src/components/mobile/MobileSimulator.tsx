import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  AtSign,
  BatteryFull,
  Grid3X3,
  Heart,
  Home,
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  PackageSearch,
  Phone,
  Search,
  Share2,
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
  const [isMobileLoggedIn, setIsMobileLoggedIn] = useState(false);
  const [mobileAuthMode, setMobileAuthMode] = useState<'login' | 'signup'>('login');
  const [showMobilePassword, setShowMobilePassword] = useState(false);
  const [rememberMobileLogin, setRememberMobileLogin] = useState(true);
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
  const isDark = landingTheme === 'dark';

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
        className="mobile-shell relative flex w-[390px] max-w-[calc(100vw-20px)] flex-col overflow-hidden rounded-[25px] border-[4px] border-[#141414] bg-[#090909] shadow-[7px_7px_0_#F7C318,0_24px_70px_rgba(0,0,0,.5)]"
        style={{ height: 'min(800px, calc(100dvh - 76px))', minHeight: 570 }}
      >
        <div className={`relative z-50 flex h-7 flex-none items-center justify-between px-4 text-[12px] font-semibold transition-colors ${
          !isMobileLoggedIn || isDark ? 'bg-[#090909] text-white' : 'bg-[#fffdf5] text-black'
        }`}>
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" strokeWidth={2.6} />
            <Wifi className="h-3 w-3" strokeWidth={2.6} />
            <BatteryFull className="h-3.5 w-3.5" strokeWidth={2.6} />
          </div>
        </div>

        {!isMobileLoggedIn ? (
          <section className="mobile-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#090909] text-white">
            <div className={`auth-hero relative flex items-center justify-center overflow-hidden bg-[#f7c318] px-5 text-center text-black ${mobileAuthMode === 'signup' ? 'min-h-[202px]' : 'min-h-[226px]'}`}>
              <span className="auth-orbit auth-orbit-one" aria-hidden="true" />
              <span className="auth-orbit auth-orbit-two" aria-hidden="true" />
              <div className="auth-hero-content relative flex flex-col items-center">
                <img src="/ohman-logo.png" alt="OH MAN" className="auth-logo-float h-[92px] w-[178px] object-contain" />
                <h1 key={mobileAuthMode} className="auth-title-enter mt-3 font-bebas text-[31px] leading-none tracking-[-0.035em]">
                  {mobileAuthMode === 'login' ? 'WELCOME BACK.' : 'JOIN OH MAN.'}
                </h1>
              </div>
            </div>

            <form
              className="flex flex-1 flex-col px-5 pb-5 pt-5"
              onSubmit={(event) => {
                event.preventDefault();
                setIsMobileLoggedIn(true);
                setShowIntro(true);
                setActiveTab('home');
              }}
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.12em] text-[#f7c318]">{mobileAuthMode === 'login' ? 'SIGN IN TO CONTINUE' : 'CREATE YOUR ACCOUNT'}</p>
                <p className="mt-1.5 max-w-[310px] text-[13px] leading-relaxed text-white/55">
                  {mobileAuthMode === 'login' ? 'Access products, saved styles and customer enquiry tools.' : 'Save styles and enquire faster from your personal OH MAN catalogue.'}
                </p>
              </div>

              <div className={`mt-4 ${mobileAuthMode === 'signup' ? 'space-y-2.5' : 'space-y-3.5'}`}>
                {mobileAuthMode === 'signup' && (
                  <AuthField icon={User} label="FULL NAME" type="text" placeholder="Your full name" autoComplete="name" />
                )}
                <AuthField icon={Mail} label="EMAIL ADDRESS" type="email" placeholder="you@example.com" autoComplete="email" defaultValue={mobileAuthMode === 'login' ? 'admin@ohman.in' : undefined} />
                {mobileAuthMode === 'signup' && (
                  <AuthField icon={Phone} label="PHONE NUMBER" type="tel" placeholder="+91 98765 43210" autoComplete="tel" />
                )}
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] font-bold tracking-[0.12em] text-white/65">PASSWORD</span>
                  <span className={`auth-field flex items-center border border-white/15 bg-white/[0.04] px-3 focus-within:border-[#f7c318] ${mobileAuthMode === 'signup' ? 'h-10' : 'h-12'}`}>
                    <LockKeyhole className="mr-3 h-4 w-4 text-[#f7c318]" />
                    <input type={showMobilePassword ? 'text' : 'password'} required defaultValue={mobileAuthMode === 'login' ? 'ohman2026' : undefined} autoComplete={mobileAuthMode === 'login' ? 'current-password' : 'new-password'} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30" placeholder={mobileAuthMode === 'login' ? 'Enter password' : 'Create a strong password'} />
                    <button type="button" onClick={() => setShowMobilePassword(value => !value)} aria-label={showMobilePassword ? 'Hide password' : 'Show password'} className="ml-2 p-1 text-white/40 hover:text-white">
                      {showMobilePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex cursor-pointer items-center gap-2 text-[12px] text-white/55">
                    <input type="checkbox" checked={rememberMobileLogin} onChange={event => setRememberMobileLogin(event.target.checked)} className="sr-only" />
                    <span className={`flex h-3.5 w-3.5 items-center justify-center border ${rememberMobileLogin ? 'border-[#f7c318] bg-[#f7c318]' : 'border-white/30'}`}>
                      {rememberMobileLogin && <span className="h-1.5 w-1.5 bg-black" />}
                    </span>
                    {mobileAuthMode === 'login' ? 'Remember me' : 'I agree to the terms'}
                  </label>
                  {mobileAuthMode === 'login' && <button type="button" className="font-mono text-[11px] text-[#f7c318] underline underline-offset-4">FORGOT PASSWORD?</button>}
                </div>
              </div>

              <button type="submit" className="auth-cta-shimmer group mt-5 flex w-full items-center justify-between overflow-hidden bg-[#f7c318] px-4 py-3 text-black shadow-[4px_4px_0_#fff] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
                <span className="font-bebas text-base tracking-[0.04em]">{mobileAuthMode === 'login' ? 'ENTER CATALOGUE' : 'CREATE ACCOUNT'}</span>
                <span className="flex h-7 w-7 items-center justify-center bg-black text-white"><ArrowUpRight className="h-4 w-4" /></span>
              </button>

              <p className="mt-4 text-center text-[12px] text-white/50">
                {mobileAuthMode === 'login' ? 'New to OH MAN?' : 'Already have an account?'}{' '}
                <button type="button" onClick={() => { setMobileAuthMode(mode => mode === 'login' ? 'signup' : 'login'); setShowMobilePassword(false); }} className="font-mono text-[11px] font-bold text-[#f7c318] underline underline-offset-4">
                  {mobileAuthMode === 'login' ? 'CREATE ACCOUNT' : 'SIGN IN'}
                </button>
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] tracking-[0.09em] text-white/30">
                <span>SECURE ACCESS</span>
                <span>OH MAN / 2026</span>
              </div>
            </form>
          </section>
        ) : (
          <>
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
                  <img src="/ohman-logo.png" alt="OH MAN" className={`h-[58px] w-[112px] object-contain ${isDark ? 'invert' : ''}`} />
                  <p className={`mt-1 font-mono text-[9px] tracking-[0.16em] ${isDark ? 'text-white/45' : 'text-black/45'}`}>MENSWEAR / MAZGAON</p>
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
                    ['profile', Heart, 'SAVED', 'Products you want to revisit'],
                  ] as const
                ).map(([tab, Icon, label, helper], index) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => navigate(tab)}
                    className={`group flex w-full items-center gap-3 border-b px-2 py-3 text-left ${
                      isDark ? 'border-white/10' : 'border-black/10'
                    } ${
                      activeTab === tab ? 'bg-[#f7c318] text-black' : isDark ? 'hover:bg-white/5' : 'hover:bg-white'
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bebas text-base leading-none tracking-wide">{label}</span>
                      <span className="mt-1 block truncate text-[10px] opacity-50">{helper}</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#8a847b]">0{index + 1}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-auto p-4">
                <div className="rounded-lg bg-black p-4 text-white">
                  <p className="font-mono text-[9px] tracking-[0.15em] text-[#f7c318]">NEED HELP CHOOSING?</p>
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
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setCurrentProduct(null);
                    setShowIntro(true);
                    setActiveTab('home');
                    setMobileAuthMode('login');
                    setIsMobileLoggedIn(false);
                  }}
                  className={`mt-3 flex w-full items-center justify-between border px-3 py-2.5 font-bebas text-xs ${isDark ? 'border-white/15 text-white' : 'border-black/15 text-black'}`}
                >
                  LOG OUT
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </aside>
          </div>
        )}

        {showIntro ? (
          <section className={`mobile-scroll flex min-h-0 flex-1 flex-col overflow-y-auto transition-colors duration-300 ${
            isDark ? 'bg-[#0c0c0c] text-white' : 'bg-[#fffdf5] text-black'
          }`}>
            <div className="flex h-6 flex-none items-center justify-center bg-[#f7c318] font-mono text-[8px] font-bold tracking-[0.18em] text-black">
              NEW SEASON / MAZGAON / OPEN 10AM–9PM
            </div>

            <header className={`flex h-[58px] flex-none items-center justify-between border-b px-4 ${
              isDark ? 'border-white/10' : 'border-black/10'
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
                <img src="/ohman-logo.png" alt="OH MAN" className={`mx-auto h-[35px] w-[76px] object-contain ${isDark ? 'invert' : ''}`} />
                <p className="mt-1 font-mono text-[8px] tracking-[0.2em] opacity-55">MENSWEAR / MUMBAI</p>
              </div>
              <button
                type="button"
                onClick={() => setLandingTheme(theme => theme === 'light' ? 'dark' : 'light')}
                aria-label={`Switch to ${landingTheme === 'light' ? 'dark' : 'light'} theme`}
                className={`flex h-8 w-8 items-center justify-center border ${
                  isDark ? 'border-white/20 bg-[#f7c318] text-black' : 'border-black bg-black text-white'
                }`}
              >
                {!isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              </button>
            </header>

            <div className="px-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('search')}
                className={`flex h-10 w-full items-center gap-2 border px-3 text-left font-mono text-[10px] tracking-[0.04em] ${
                  isDark
                    ? 'border-white/15 bg-[#151515] text-white/50'
                    : 'border-black/15 bg-white text-black/45'
                }`}
              >
                <Search className="h-3.5 w-3.5" />
                SEARCH THE COLLECTION
              </button>
            </div>

            {heroProduct && (
              <button
                type="button"
                onClick={() => openProduct(heroProduct)}
                className="relative mx-4 mt-3 block h-[244px] w-[calc(100%_-_2rem)] overflow-hidden bg-black text-left text-white"
              >
                <img src={heroProduct.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#f7c318]" />
                <div className="relative z-20 flex h-full max-w-[64%] flex-col p-5">
                  <span className="w-fit bg-[#f7c318] px-2 py-1 font-mono text-[8px] font-bold tracking-[0.16em] text-black">OH MAN / EDIT 01</span>
                  <h1 className="mt-4 font-bebas text-[42px] leading-[0.84] tracking-[-0.015em]">
                    THE DAILY
                    <br />
                    UNIFORM.
                  </h1>
                  <p className="mt-3 max-w-[148px] text-[10px] leading-relaxed text-white/65">Essential menswear, selected in Mazgaon and built for Mumbai.</p>
                  <span className="mt-auto inline-flex w-fit items-center gap-1 border-b border-[#f7c318] pb-0.5 font-bebas text-[12px] tracking-wide text-[#f7c318]">
                    VIEW THE EDIT <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            )}

            <section className="px-4 pt-5">
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[8px] tracking-[0.15em] text-[#a98200]">CURATED DEPARTMENTS</p>
                  <h2 className="font-bebas text-[20px] leading-none">BROWSE CATEGORIES</h2>
                </div>
                <button type="button" onClick={() => navigate('categories')} className="font-mono text-[9px] underline underline-offset-4">VIEW ALL</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map((category, index) => {
                  const cover = products.find(product => product.category === category.name) ?? products[index];
                  return (
                  <button type="button" key={category.id} onClick={() => { setSelectedCategory(category.name); navigate('search'); }} className="relative h-[112px] overflow-hidden bg-[#161616] text-left text-white">
                    {cover && <img src={cover.images[0]} alt="" className="h-full w-full object-cover opacity-65 grayscale" />}
                    <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 font-bebas text-base tracking-wide">{category.name}</span>
                    <ArrowUpRight className="absolute right-2 top-2 h-5 w-5 bg-[#f7c318] p-1 text-black" />
                  </button>
                  );
                })}
              </div>
            </section>

            <section className="px-4 pb-4 pt-5">
              <div className="mb-2 flex items-end justify-between">
                <div><p className="font-mono text-[8px] tracking-[0.15em] text-[#a98200]">NEW ARRIVALS</p><h2 className="font-bebas text-[20px] leading-none">LATEST OBJECTS</h2></div>
                <button type="button" onClick={() => navigate('search')} className="font-mono text-[9px] underline underline-offset-4">SEE ALL</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(landingProducts.length ? landingProducts : featuredProducts).slice(0, 4).map(product => (
                  <button type="button" key={product.id} onClick={() => openProduct(product)} className={`border text-left ${isDark ? 'border-white/10 bg-[#151515]' : 'border-black/10 bg-white'}`}>
                    <div className={`relative h-[142px] ${isDark ? 'bg-[#222]' : 'bg-[#f0eee7]'}`}><ProductImage product={product} /><span className="absolute left-2 top-2 bg-[#f7c318] px-2 py-1 font-mono text-[8px] font-bold text-black">NEW</span></div>
                    <div className="p-2"><p className="truncate text-[11px] font-semibold">{product.name}</p><p className="mt-1 font-mono text-[10px] opacity-55">₹{product.price.toLocaleString()}</p></div>
                  </button>
                ))}
              </div>
            </section>

            <nav className={`sticky bottom-0 mt-auto grid h-14 flex-none grid-cols-5 border-t backdrop-blur-xl ${
              isDark ? 'border-white/10 bg-black/95' : 'border-black/10 bg-[#fffdf5]/95'
            }`}>
              {(
                [
                  ['home', Home, 'HOME'],
                  ['categories', Grid3X3, 'CATEGORIES'],
                  ['search', Search, 'SEARCH'],
                  ['contact', MessageCircle, 'ENQUIRE'],
                  ['profile', Heart, 'SAVED'],
                ] as const
              ).map(([tab, Icon, label]) => (
                <button type="button" key={tab} onClick={() => navigate(tab)} className={`relative flex flex-col items-center justify-center gap-0.5 ${tab === 'home' ? isDark ? 'text-white' : 'text-black' : 'opacity-45'}`}>
                  {tab === 'home' && <span className="absolute top-0 h-0.5 w-7 bg-[#f7c318]" />}
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  <span className="font-bebas text-[9px] tracking-wide">{label}</span>
                </button>
              ))}
            </nav>
          </section>
        ) : (
          <>
            <div className={`flex h-12 flex-none items-center justify-between border-b px-4 ${isDark ? 'border-white/10 bg-[#090909]' : 'border-black/10 bg-[#fffdf5]'}`}>
              {currentProduct ? (
                <button
                  type="button"
                  onClick={() => setCurrentProduct(null)}
                  aria-label="Back to products"
                  className={`transition-colors hover:text-[#a98200] ${isDark ? 'text-white' : 'text-black'}`}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  className={`transition-colors hover:text-[#a98200] ${isDark ? 'text-white' : 'text-black'}`}
                >
                  <Menu className="h-4 w-4" />
                </button>
              )}

              <span className={`font-bebas text-sm tracking-[0.08em] ${isDark ? 'text-white' : 'text-black'}`}>
                {currentProduct ? currentProduct.category : businessSettings.name}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (!currentProduct) navigate('contact');
                }}
                aria-label={currentProduct ? 'Share product' : 'Contact Oh Man'}
                className={`transition-colors hover:text-[#a98200] ${isDark ? 'text-white' : 'text-black'}`}
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
              className={`mobile-scroll relative min-h-0 flex-1 overflow-y-auto ${isDark ? 'bg-[#090909] text-white' : 'bg-[#fffdf5] text-black'}`}
            >
              {currentProduct ? (
                <div className="pb-24">
                  <div className={`relative h-[320px] overflow-hidden border-b ${isDark ? 'border-white/10 bg-[#171717]' : 'border-black/10 bg-[#efede5]'}`}>
                    <div className="absolute left-0 top-0 z-10 bg-[#f7c318] px-3 py-2 font-mono text-[9px] font-bold tracking-[0.14em] text-black">OH MAN / PRODUCT</div>
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#f7c318]" />
                    <div className="absolute inset-0 p-7 pt-10"><ProductImage product={currentProduct} className="drop-shadow-[0_18px_12px_rgba(0,0,0,.16)]" /></div>
                  </div>

                  <div className={`grid grid-cols-5 gap-1 border-b p-2 ${isDark ? 'border-white/10 bg-[#111]' : 'border-black/10 bg-white'}`}>
                    {[...products.slice(0, 4), currentProduct].map((product, index) => (
                      <button
                        key={`${product.id}-${index}`}
                        type="button"
                        onClick={() => openProduct(product)}
                        className={`h-12 border bg-[#eceae3] p-1 ${
                          product.id === currentProduct.id
                            ? 'border-2 border-[#f7c318]'
                            : isDark ? 'border-[#333]' : 'border-black/10'
                        }`}
                      >
                        <ProductImage product={product} />
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 p-4">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.14em] text-[#a98200]">{currentProduct.category}</p>
                      <h1 className={`mt-1 font-bebas text-[35px] leading-[0.9] ${isDark ? 'text-white' : 'text-black'}`}>{currentProduct.name}</h1>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-mono text-sm font-bold">₹{currentProduct.price.toLocaleString()}</p>
                        {currentProduct.tag && <span className="bg-[#f7c318] px-2 py-1 font-mono text-[8px] font-bold text-black">{currentProduct.tag}</span>}
                      </div>
                    </div>
                    <div className={`border-t pt-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      <h2 className="font-bebas text-sm tracking-wide">DESCRIPTION</h2>
                      <p className="mt-1 text-[12px] leading-[1.5] opacity-55">
                        {currentProduct.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="font-bebas text-sm tracking-wide">DETAILS</h2>
                        <span className="font-mono text-base">+</span>
                      </div>
                      <ul className="mt-1 space-y-1 text-[11px] leading-[1.3] opacity-65">
                        {currentProduct.features.map((feature) => (
                          <li key={feature}>+&nbsp; {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 z-30 flex gap-2 border-t p-2 ${isDark ? 'border-white/10 bg-[#090909]' : 'border-black/10 bg-[#fffdf5]'}`}>
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
                      className={`flex flex-1 items-center justify-center gap-2 border py-2.5 font-bebas text-sm ${isDark ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}
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
                        <p className="mb-1 font-mono text-[10px] tracking-[0.18em] text-[#f7c318]">ISSUE 01 / 1500 OBJECTS</p>
                        <h1 className="font-bebas text-[34px] leading-[0.86] tracking-[-0.01em]">
                          THE DAILY
                          <br />
                          <span className="text-[#f7c318]">UNIFORM.</span>
                        </h1>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate('search')}
                        className="flex h-9 w-full items-center justify-between border border-[#222] bg-[#f1f1f1] pl-3 text-left font-mono text-[11px] text-[#777]"
                      >
                        SEARCH PRODUCTS...
                        <span className="flex h-full w-11 items-center justify-center bg-[#f7c318] text-black">
                          <SlidersHorizontal className="h-4 w-4" />
                        </span>
                      </button>

                      <section>
                        <div className="mb-2 flex items-center justify-between">
                          <h2 className="font-bebas text-sm tracking-wide">CATEGORIES</h2>
                          <button
                            type="button"
                            onClick={() => navigate('categories')}
                            className="font-mono text-[10px] text-[#b3b3b3]"
                          >
                            VIEW ALL
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {categories.slice(0, 6).map((category, index) => {
                            const cover = products.find(product => product.category === category.name) ?? products[index];
                            return (
                              <button
                                type="button"
                                key={category.id}
                                onClick={() => {
                                  setSelectedCategory(category.name);
                                  navigate('search');
                                }}
                                className="relative h-[96px] overflow-hidden border border-black bg-[#f0f0f0] text-black transition-transform active:translate-y-0.5"
                              >
                                {cover && <ProductImage product={cover} className="object-cover" />}
                                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <span className="absolute inset-x-0 bottom-2 text-center font-bebas text-[13px] tracking-wide text-white">
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
                        dark={isDark}
                      />
                    </div>
                  )}

                  {activeTab === 'categories' && (
                    <div className="space-y-4 p-3">
                      <div className="border-b border-current/10 pb-3 text-center">
                        <p className="font-mono text-[9px] tracking-[0.16em] text-[#a98200]">CURATED FOR OH MAN</p>
                        <h1 className="mt-2 font-bebas text-[34px] leading-none">
                        BROWSE
                        <br />
                        <span className="text-[#a98200]">CATEGORIES</span>
                        </h1>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category, index) => {
                          const cover = products.find(product => product.category === category.name) ?? products[index];
                          return (
                            <button
                              type="button"
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.name);
                                navigate('search');
                              }}
                              className="relative aspect-[.9] overflow-hidden border border-black/10 bg-[#ededed] text-left text-black"
                            >
                              {cover && <ProductImage product={cover} className="object-cover" />}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                              <ArrowUpRight className="absolute right-2 top-2 h-6 w-6 bg-[#f7c318] p-1.5 text-black" />
                              <div className="absolute inset-x-0 bottom-3 text-center text-white">
                                <h2 className="font-bebas text-xl">{category.name}</h2>
                                <p className="font-mono text-[9px] text-[#f7c318]">{category.productCount} PRODUCTS</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'search' && (
                    <div className="space-y-3 p-3">
                      <div className="border-b border-current/10 pb-3">
                        <p className="font-mono text-[9px] tracking-[0.15em] text-[#a98200]">OH MAN CATALOGUE</p>
                        <h1 className="mt-1 font-bebas text-[30px] leading-none">FIND YOUR NEXT.</h1>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {['ALL', ...categories.map((category) => category.name)].map((category) => (
                          <button
                            type="button"
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-3 py-1.5 font-bebas text-[12px] ${
                              selectedCategory === category
                                ? 'bg-[#f7c318] text-black'
                                : isDark ? 'border border-[#333] bg-[#171717] text-white' : 'border border-black/15 bg-white text-black'
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
                          className="h-10 w-full border border-black/20 bg-white px-3 pr-10 font-mono text-[11px] text-black outline-none focus:border-[#f7c318]"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-black" />
                      </div>
                      <ProductGrid
                        title={selectedCategory === 'ALL' ? 'ALL PRODUCTS' : selectedCategory}
                        products={filteredProducts}
                        wishlist={wishlist}
                        onProductClick={openProduct}
                        onToggleWishlist={toggleWishlist}
                        dark={isDark}
                      />
                    </div>
                  )}

                  {activeTab === 'contact' && (
                    <div className="min-h-full space-y-5 px-4 py-4">
                      <div className="flex items-start justify-between border-b border-current/10 pb-4">
                        <div>
                          <p className="font-mono text-[9px] tracking-[0.16em] text-[#a98200]">PERSONAL ASSISTANCE</p>
                          <h1 className="mt-2 font-bebas text-[40px] leading-[0.88]">
                            GET IN
                            <br />
                            TOUCH
                          </h1>
                          <p className="mt-2 text-[12px] opacity-50">We’re here to help.</p>
                        </div>
                        <div className="mt-1 flex h-16 w-16 items-center justify-center bg-[#f7c318] text-black">
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

                      <div className={`border p-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <span className="font-bebas text-[12px] opacity-50">FOLLOW US</span>
                        <div className="mt-2 grid grid-cols-3 divide-x divide-current/10">
                          {[AtSign, UsersRound, Play].map((Icon, index) => (
                            <button
                              type="button"
                              key={index}
                              aria-label={['Instagram', 'Facebook', 'YouTube'][index]}
                              className="flex items-center justify-center py-2 hover:text-[#a98200]"
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
                      <div className={`border p-4 ${isDark ? 'border-white/10 bg-[#151515]' : 'border-black/10 bg-white'}`}>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center bg-[#f7c318] font-bebas text-xl text-black">
                            OM
                          </div>
                          <div>
                            <h1 className="font-bebas text-2xl">SAVED PRODUCTS</h1>
                            <p className="font-mono text-[10px] text-[#a98200]">YOUR PERSONAL SHORTLIST</p>
                          </div>
                        </div>
                      </div>
                      <div className={`border p-4 ${isDark ? 'border-white/10 bg-[#151515]' : 'border-black/10 bg-white'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bebas text-sm">YOUR SHORTLIST</span>
                          <span className="bg-[#f7c318] px-2 py-1 font-mono text-[10px] text-black">{wishlist.length} SAVED</span>
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
                                  className="flex w-full items-center justify-between border-t border-current/10 pt-2 text-left"
                                >
                                  <span className="font-bebas text-xs">{product.name}</span>
                                  <span className="font-mono text-[11px] text-[#a98200]">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                </button>
                              ))
                          ) : (
                            <p className="border-t border-current/10 pt-3 font-mono text-[11px] opacity-45">
                              SAVE PRODUCTS USING THE HEART ICON
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
              <nav className={`grid h-14 flex-none grid-cols-5 border-t ${isDark ? 'border-white/10 bg-[#090909]' : 'border-black/10 bg-[#fffdf5]'}`}>
                {(
                  [
                    ['home', Home, 'HOME'],
                    ['categories', Grid3X3, 'CATEGORIES'],
                    ['search', Search, 'SEARCH'],
                    ['contact', Phone, 'ENQUIRE'],
                    ['profile', Heart, 'SAVED'],
                  ] as const
                ).map(([tab, Icon, label]) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => navigate(tab)}
                    className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                      activeTab === tab ? 'border-t-2 border-[#f7c318]' : 'opacity-40'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                    <span className="font-bebas text-[9px] tracking-wide">{label}</span>
                  </button>
                ))}
              </nav>
            )}
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
};

function AuthField({
  icon: Icon,
  label,
  type,
  placeholder,
  autoComplete,
  defaultValue,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] font-bold tracking-[0.12em] text-white/65">{label}</span>
      <span className="auth-field flex h-10 items-center border border-white/15 bg-white/[0.04] px-3 focus-within:border-[#f7c318]">
        <Icon className="mr-3 h-4 w-4 text-[#f7c318]" />
        <input
          type={type}
          required
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          placeholder={placeholder}
        />
      </span>
    </label>
  );
}

function ProductGrid({
  title,
  products,
  wishlist,
  onProductClick,
  onToggleWishlist,
  dark,
}: {
  title: string;
  products: Product[];
  wishlist: string[];
  onProductClick: (product: Product) => void;
  onToggleWishlist: (id: string, event: React.MouseEvent) => void;
  dark: boolean;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className={`font-bebas text-sm tracking-wide ${dark ? 'text-white' : 'text-black'}`}>{title}</h2>
        <span className="font-mono text-[9px] opacity-45">{products.length} OBJECTS</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => (
          <button
            type="button"
            key={product.id}
            onClick={() => onProductClick(product)}
            className={`group overflow-hidden border text-left ${dark ? 'border-white/10 bg-[#151515] text-white' : 'border-black/10 bg-white text-black'}`}
          >
            <div className={`relative h-[150px] overflow-hidden ${dark ? 'bg-[#252525]' : 'bg-[#efede7]'}`}>
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
                className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-white ${dark ? 'text-black' : 'text-black'}`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    wishlist.includes(product.id) ? 'fill-black' : ''
                  }`}
                />
              </span>
            </div>
            <div className="p-2">
              <p className="font-mono text-[8px] tracking-[0.1em] text-[#a98200]">{product.category}</p>
              <h3 className="mt-1 truncate font-bebas text-sm">{product.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-[12px] font-bold">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="bg-black px-2 py-1 font-bebas text-[9px] tracking-wide text-white">
                  VIEW
                </span>
              </div>
            </div>
          </button>
        ))}
        {!products.length && (
          <div className="col-span-2 flex min-h-36 flex-col items-center justify-center border border-dashed border-[#333] text-[#777]">
            <PackageSearch className="mb-2 h-7 w-7" />
            <span className="font-mono text-[11px]">NO OBJECTS FOUND</span>
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
          <span className="block font-bebas text-[12px] text-black">{label}</span>
          <span className="block truncate font-mono text-[10px] text-[#333]">{value}</span>
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
