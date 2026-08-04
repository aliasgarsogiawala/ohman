import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Grid2X2,
  Heart,
  Home,
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  Send,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Truck,
  User,
  UserRound,
  X,
} from 'lucide-react';
import { BusinessSettings, Category, Offer, Product } from '../../types';

interface MobileSimulatorProps {
  products: Product[];
  categories: Category[];
  businessSettings: BusinessSettings;
  offers: Offer[];
  activeProductId?: string;
  onProductSelect?: (id: string) => void;
}

type Tab = 'home' | 'collections' | 'search' | 'saved' | 'account';

const categoryLabels: Record<string, string> = {
  'Trek Bags': 'TRAIL BAGS',
  'Travel Bags': 'TRAVEL',
  'T-Shirts': 'TEES',
  Shoes: 'FOOTWEAR',
  Corsets: 'LAYERS',
  Accessories: 'ACCESSORIES',
};

const heroSlides = [
  {
    image: '/images/ohman-city-edit.png',
    eyebrow: 'OH MAN / ISSUE 01',
    title: 'CITY\nIN MOTION.',
    copy: 'Everyday gear for the route you make your own.',
    cta: 'SHOP THE EDIT',
    category: 'Travel Bags',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=86',
    eyebrow: 'NEW SEASON / 2026',
    title: 'PACE\nFORWARD.',
    copy: 'Technical comfort with an off-duty point of view.',
    cta: 'DISCOVER FOOTWEAR',
    category: 'Shoes',
  },
  {
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=86',
    eyebrow: 'THE CORE COLLECTION',
    title: 'THE DAILY\nUNIFORM.',
    copy: 'Heavyweight essentials. Built for repeat wear.',
    cta: 'VIEW TEES',
    category: 'T-Shirts',
  },
];

const itemImage = (product?: Product) => product?.images[0] ?? '/images/ohman-city-edit.png';

const getProductOffer = (product: Product, offers: Offer[]) => offers
  .filter((offer) => offer.status === 'ACTIVE' && offer.visibleOnMobile && offer.discountPercent > 0 && offer.productIds.includes(product.id))
  .sort((left, right) => right.discountPercent - left.discountPercent)[0];

const discountedPrice = (product: Product, offer?: Offer) => offer ? Math.round(product.price * (1 - offer.discountPercent / 100)) : product.price;

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  products,
  categories,
  businessSettings,
  offers,
  activeProductId,
  onProductSelect,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [detailOpen, setDetailOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [isMobileLoggedIn, setIsMobileLoggedIn] = useState(true);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured && product.status === 'ACTIVE').slice(0, 8),
    [products],
  );
  const newestProducts = useMemo(
    () => [...products].filter((product) => product.status === 'ACTIVE').sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10),
    [products],
  );
  const liveOffers = useMemo(() => offers.filter((offer) => offer.status === 'ACTIVE' && offer.visibleOnMobile && offer.productIds.length > 0), [offers]);
  const activeOffer = useMemo(() => liveOffers.find((offer) => offer.id === activeOfferId) ?? null, [activeOfferId, liveOffers]);
  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      const matchesQuery = !query || `${product.name} ${product.category}`.toLowerCase().includes(query);
      const inOffer = !activeOffer || activeOffer.productIds.includes(product.id);
      return inCategory && matchesQuery && inOffer && product.status === 'ACTIVE';
    }).slice(0, 30);
  }, [activeOffer, products, searchQuery, selectedCategory]);

  useEffect(() => {
    if (!activeProductId) return;
    const product = products.find((item) => item.id === activeProductId);
    if (product) {
      setCurrentProduct(product);
      setSelectedImage(0);
    }
  }, [activeProductId, products]);

  useEffect(() => {
    if (currentProduct || activeTab !== 'home') return;
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, [activeTab, currentProduct]);

  const openProduct = (product: Product) => {
    setCurrentProduct(product);
    setSelectedImage(0);
    setSelectedSize('M');
    setDetailOpen(false);
    setDeliveryOpen(false);
    onProductSelect?.(product.id);
  };

  const changeTab = (tab: Tab) => {
    setCurrentProduct(null);
    setShowMenu(false);
    setActiveTab(tab);
  };

  const openCollection = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setActiveOfferId(null);
    changeTab('search');
  };

  const openOffer = (offer: Offer) => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    setActiveOfferId(offer.id);
    changeTab('search');
  };

  const toggleWishlist = (id: string) => {
    setWishlisted((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const addToBag = (product: Product) => {
    setCart((items) => [...items, product.id]);
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(''), 2200);
  };

  const bagProducts = cart.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[];
  const bagTotal = bagProducts.reduce((total, product) => total + discountedPrice(product, getProductOffer(product, liveOffers)), 0);
  const displayCategories = categories.length ? categories : Array.from(new Set(products.map((product) => product.category))).map((name, index) => ({ id: `${name}-${index}`, name, iconName: 'circle', productCount: products.filter((product) => product.category === name).length, subcategories: [] }));

  return (
    <div className="flex h-full items-center justify-center">
      <section
        className="relative flex w-[390px] max-w-[calc(100vw-16px)] flex-col overflow-hidden rounded-[28px] border-[3px] border-[#171717] bg-[#faf9f5] text-[#18191b] shadow-[8px_8px_0_#f4c542,0_24px_60px_rgba(0,0,0,.42)]"
        style={{ height: 'min(820px, calc(100dvh - 76px))' }}
      >
        <div className="flex h-7 flex-none items-center justify-between border-b border-black/10 bg-white px-5 text-[10px] font-semibold tracking-[0.03em]">
          <span>9:41</span>
          <div className="flex items-center gap-1.5"><span>5G</span><span className="inline-flex h-2.5 w-4 rounded-sm border border-black/70"><span className="m-px w-2.5 rounded-[1px] bg-black" /></span></div>
        </div>

        {!isMobileLoggedIn ? (
          <MobileAuthScreen onLogin={() => {
            setIsMobileLoggedIn(true);
            setActiveTab('home');
            setCurrentProduct(null);
          }} />
        ) : <>
        <div className="flex h-[60px] flex-none items-center justify-between border-b border-black/10 bg-white px-4">
          <button onClick={() => setShowMenu(true)} aria-label="Open menu" className="flex h-10 w-10 items-center justify-start"><Menu className="h-6 w-6" strokeWidth={1.5} /></button>
          <button onClick={() => changeTab('home')} className="flex flex-col items-center leading-none" aria-label="Go to home">
            <img src="/ohman-logo.png" alt="OH MAN" className="h-9 w-24 object-contain" />
            <span className="-mt-0.5 font-mono text-[6px] tracking-[0.28em] text-black/45">MUMBAI / EST. 2013</span>
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => changeTab('search')} aria-label="Search collection" className="flex h-10 w-8 items-center justify-center"><Search className="h-5 w-5" strokeWidth={1.7} /></button>
            <button onClick={() => setShowBag(true)} aria-label={`Shopping bag, ${cart.length} items`} className="relative flex h-10 w-9 items-center justify-end"><ShoppingBag className="h-5 w-5" strokeWidth={1.7} />{cart.length > 0 && <span className="absolute right-0 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#f1c441] px-1 font-mono text-[7px] font-bold">{cart.length}</span>}</button>
          </div>
        </div>

        {!currentProduct && <div className="flex h-8 flex-none items-center justify-center bg-[#208f91] px-3 text-center font-mono text-[9px] font-bold tracking-[0.03em] text-white">FREE SHIPPING OVER ₹1,499 &nbsp;•&nbsp; EASY 30-DAY RETURNS</div>}

        {currentProduct ? (
          <ProductDetail
            product={currentProduct}
            offer={getProductOffer(currentProduct, liveOffers)}
            selectedImage={selectedImage}
            selectedSize={selectedSize}
            isWishlisted={wishlisted.includes(currentProduct.id)}
            detailOpen={detailOpen}
            deliveryOpen={deliveryOpen}
            onBack={() => setCurrentProduct(null)}
            onSelectImage={setSelectedImage}
            onSelectSize={setSelectedSize}
            onToggleWishlist={() => toggleWishlist(currentProduct.id)}
            onAddToBag={() => addToBag(currentProduct)}
            onToggleDetails={() => setDetailOpen((value) => !value)}
            onToggleDelivery={() => setDeliveryOpen((value) => !value)}
          />
        ) : (
          <main className="mobile-scroll min-h-0 flex-1 overflow-y-auto bg-[#faf9f5]">
            {activeTab === 'home' && (
              <HomeScreen
                activeSlide={activeSlide}
                categories={displayCategories}
                products={products}
                featuredProducts={featuredProducts}
                newestProducts={newestProducts}
                offers={liveOffers}
                onSlideChange={setActiveSlide}
                onOpenProduct={openProduct}
                onOpenCollection={openCollection}
                onOpenOffer={openOffer}
                onViewAll={() => changeTab('collections')}
              />
            )}
            {activeTab === 'collections' && <CollectionsScreen categories={displayCategories} products={products} onOpenCollection={openCollection} />}
            {activeTab === 'search' && <SearchScreen categories={displayCategories} products={visibleProducts} selectedCategory={selectedCategory} activeOffer={activeOffer} offers={liveOffers} searchQuery={searchQuery} onCategoryChange={(category) => { setSelectedCategory(category); setActiveOfferId(null); }} onSearchChange={setSearchQuery} onClearOffer={() => setActiveOfferId(null)} onOpenProduct={openProduct} />}
            {activeTab === 'saved' && <SavedScreen products={products.filter((product) => wishlisted.includes(product.id))} offers={liveOffers} onOpenProduct={openProduct} onBrowse={() => changeTab('search')} />}
            {activeTab === 'account' && <AccountScreen settings={businessSettings} onBrowse={() => changeTab('search')} />}
          </main>
        )}

        {!currentProduct && (
          <nav className="grid h-[66px] flex-none grid-cols-5 border-t border-black/10 bg-white">
            {([
              ['home', Home, 'Home'],
              ['collections', Grid2X2, 'Shop'],
              ['search', Search, 'Search'],
              ['saved', Heart, 'Saved'],
              ['account', UserRound, 'Account'],
            ] as const).map(([tab, Icon, label]) => (
              <button key={tab} onClick={() => changeTab(tab)} className={`relative flex flex-col items-center justify-center gap-1 ${activeTab === tab ? 'text-[#d25036]' : 'text-black/55'}`}>
                {activeTab === tab && <span className="absolute top-0 h-[2px] w-8 bg-[#d25036]" />}
                <Icon className="h-5 w-5" strokeWidth={1.6} fill={tab === 'home' && activeTab === tab ? 'currentColor' : 'none'} />
                <span className="font-bebas text-[10px] tracking-wide">{label}</span>
              </button>
            ))}
          </nav>
        )}

        {showMenu && <MenuDrawer categories={displayCategories} onClose={() => setShowMenu(false)} onNavigate={changeTab} onOpenCollection={openCollection} onLogout={() => {
          setShowMenu(false);
          setShowBag(false);
          setCurrentProduct(null);
          setActiveTab('home');
          setIsMobileLoggedIn(false);
        }} />}
        {showBag && <BagDrawer products={bagProducts} offers={liveOffers} total={bagTotal} onClose={() => setShowBag(false)} onRemove={(id) => setCart((items) => { const index = items.indexOf(id); return index < 0 ? items : [...items.slice(0, index), ...items.slice(index + 1)]; })} />}
        {notice && <div className="absolute inset-x-4 bottom-20 z-50 flex items-center gap-2 bg-[#191919] px-4 py-3 text-[11px] font-semibold text-white shadow-xl"><Check className="h-4 w-4 text-[#f1c441]" />{notice}</div>}
        </>}
      </section>
    </div>
  );
};

function MobileAuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <main className="mobile-scroll flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#090909] text-white">
      <section className="relative flex min-h-[225px] flex-none items-center justify-center overflow-hidden bg-[#f1c441] px-5 text-center text-black">
        <span className="absolute -right-12 -top-16 h-44 w-44 rounded-full border-[22px] border-black/10" aria-hidden="true" />
        <span className="absolute -bottom-24 -left-14 h-48 w-48 rotate-12 border-[24px] border-black/[0.07]" aria-hidden="true" />
        <div className="relative flex flex-col items-center">
          <img src="/ohman-logo.png" alt="OH MAN" className="h-[92px] w-[178px] object-contain drop-shadow-[3px_3px_0_rgba(255,255,255,.35)]" />
          <p className="mt-2 font-mono text-[8px] font-bold tracking-[0.22em]">MEMBER ACCESS / MAZGAON</p>
          <h1 className="mt-2 font-bebas text-[34px] leading-none tracking-[-0.035em]">{mode === 'login' ? 'WELCOME BACK.' : 'JOIN OH MAN.'}</h1>
        </div>
      </section>

      <form
        className="flex flex-1 flex-col px-5 pb-5 pt-5"
        onSubmit={(event) => {
          event.preventDefault();
          onLogin();
        }}
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.13em] text-[#f1c441]">{mode === 'login' ? 'SIGN IN TO CONTINUE' : 'CREATE YOUR ACCOUNT'}</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/50">Save products, discover member offers and enquire directly with the OH MAN team.</p>
        </div>

        <div className="mt-4 space-y-3">
          {mode === 'signup' && (
            <label className="block">
              <span className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.12em] text-white/60">FULL NAME</span>
              <span className="flex h-11 items-center border border-white/15 bg-white/[0.04] px-3 focus-within:border-[#f1c441]">
                <User className="mr-3 h-4 w-4 text-[#f1c441]" />
                <input required autoComplete="name" placeholder="Your full name" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/30" />
              </span>
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.12em] text-white/60">EMAIL ADDRESS</span>
            <span className="flex h-11 items-center border border-white/15 bg-white/[0.04] px-3 focus-within:border-[#f1c441]">
              <Mail className="mr-3 h-4 w-4 text-[#f1c441]" />
              <input type="email" required autoComplete="email" defaultValue={mode === 'login' ? 'admin@ohman.in' : ''} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/30" />
            </span>
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.12em] text-white/60">PASSWORD</span>
            <span className="flex h-11 items-center border border-white/15 bg-white/[0.04] px-3 focus-within:border-[#f1c441]">
              <LockKeyhole className="mr-3 h-4 w-4 text-[#f1c441]" />
              <input type={showPassword ? 'text' : 'password'} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} defaultValue={mode === 'login' ? 'ohman2026' : ''} placeholder={mode === 'login' ? 'Enter password' : 'Create a strong password'} className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/30" />
              <button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="ml-2 text-white/40 hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-white/50">
            <input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} className="sr-only" />
            <span className={`flex h-3.5 w-3.5 items-center justify-center border ${remember ? 'border-[#f1c441] bg-[#f1c441]' : 'border-white/30'}`}>{remember && <span className="h-1.5 w-1.5 bg-black" />}</span>
            {mode === 'login' ? 'Remember me' : 'I agree to the terms'}
          </label>
          {mode === 'login' && <button type="button" className="font-mono text-[9px] text-[#f1c441] underline underline-offset-4">FORGOT?</button>}
        </div>

        <button type="submit" className="mt-5 flex w-full items-center justify-between bg-[#f1c441] px-4 py-3 text-black shadow-[4px_4px_0_#fff] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
          <span className="font-bebas text-[16px] tracking-wide">{mode === 'login' ? 'ENTER CATALOGUE' : 'CREATE ACCOUNT'}</span>
          <span className="flex h-7 w-7 items-center justify-center bg-black text-white"><ArrowUpRight className="h-4 w-4" /></span>
        </button>

        <p className="mt-4 text-center text-[11px] text-white/45">
          {mode === 'login' ? 'New to OH MAN?' : 'Already a member?'}{' '}
          <button type="button" onClick={() => { setMode(current => current === 'login' ? 'signup' : 'login'); setShowPassword(false); }} className="font-mono text-[10px] font-bold text-[#f1c441] underline underline-offset-4">
            {mode === 'login' ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </p>
      </form>
    </main>
  );
}

function HomeScreen({ activeSlide, categories, products, featuredProducts, newestProducts, offers, onSlideChange, onOpenProduct, onOpenCollection, onOpenOffer, onViewAll }: { activeSlide: number; categories: Category[]; products: Product[]; featuredProducts: Product[]; newestProducts: Product[]; offers: Offer[]; onSlideChange: (index: number) => void; onOpenProduct: (product: Product) => void; onOpenCollection: (category: string) => void; onOpenOffer: (offer: Offer) => void; onViewAll: () => void }) {
  const slide = heroSlides[activeSlide];
  return <>
    <button onClick={() => onOpenCollection(slide.category)} className="relative block h-[330px] w-full overflow-hidden bg-[#282521] text-left text-white">
      <img src={slide.image} alt="OH MAN collection" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex h-full max-w-[67%] flex-col p-5">
        <span className="w-fit border border-white/55 bg-black/35 px-2 py-1 font-mono text-[8px] tracking-[0.16em]">{slide.eyebrow}</span>
        <h1 className="mt-5 whitespace-pre-line font-bebas text-[42px] leading-[.86] tracking-[-0.045em]">{slide.title}</h1>
        <p className="mt-3 max-w-[168px] text-[11px] leading-[1.45] text-white/80">{slide.copy}</p>
        <span className="mt-auto inline-flex w-fit items-center gap-2 border-b border-[#f1c441] pb-1 font-bebas text-[13px] tracking-wide text-[#f8d563]">{slide.cta}<ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </button>
    <div className="flex h-9 items-center justify-center gap-2 border-b border-black/10 bg-white">{heroSlides.map((_, index) => <button key={index} onClick={() => onSlideChange(index)} aria-label={`Show slide ${index + 1}`} className={`h-2 rounded-full transition-all ${index === activeSlide ? 'w-5 bg-[#242424]' : 'w-2 bg-black/25'}`} />)}</div>
    <section className="px-4 pb-2 pt-6">
      <SectionHeading eyebrow="JUST DROPPED" title="NEW THIS WEEK" action="VIEW ALL" onAction={onViewAll} />
      <div className="-mr-4 flex gap-3 overflow-x-auto pb-3 pr-4 scrollbar-none">
        {newestProducts.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} offer={getProductOffer(product, offers)} onClick={() => onOpenProduct(product)} compact />)}
      </div>
    </section>
    {offers.length > 0 && <section className="border-y border-black/10 bg-white px-4 py-5"><SectionHeading eyebrow="LIVE NOW" title="OFFER COLLECTIONS" /><div className="-mr-4 flex gap-3 overflow-x-auto pr-4 scrollbar-none">{offers.map((offer) => <button key={offer.id} onClick={() => onOpenOffer(offer)} className="w-[218px] flex-none overflow-hidden bg-[#1c1c1b] p-4 text-left text-white"><p className="font-mono text-[8px] font-bold tracking-[0.16em] text-[#f1c441]">{offer.code || 'OH MAN OFFER'}</p><h3 className="mt-2 font-bebas text-[28px] leading-[.86]">{offer.discount}</h3><p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-white/65">{offer.title} · {offer.productIds.length} selected pieces</p><span className="mt-4 inline-flex items-center gap-1 font-bebas text-[12px] text-[#f1c441]">SHOP COLLECTION <ArrowRight className="h-3 w-3" /></span></button>)}</div></section>}
    <section className="px-4 pb-5 pt-3">
      <SectionHeading eyebrow="SHOP THE FLOOR" title="CURATED FOR YOU" />
      <div className="grid grid-cols-3 gap-2">
        {categories.slice(0, 6).map((category, index) => <CategoryTile key={category.id} category={category} product={products.find((product) => product.category === category.name) ?? products[index]} onClick={() => onOpenCollection(category.name)} />)}
      </div>
    </section>
    <section className="border-y border-black/10 bg-[#e9e5dc] px-4 py-5">
      <p className="font-mono text-[8px] font-bold tracking-[0.18em] text-[#be4935]">THE OH MAN EDIT</p>
      <div className="mt-2 flex items-end justify-between"><h2 className="font-bebas text-[28px] leading-[.9] tracking-[-0.035em]">TRAVEL LIGHT.\nMOVE MORE.</h2><button onClick={() => onOpenCollection('Travel Bags')} className="mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-black"><ArrowRight className="h-4 w-4" /></button></div>
      <div className="mt-4 grid grid-cols-[1.2fr_.8fr] gap-2"><img src="/images/ohman-city-edit.png" alt="Travel collection" className="h-[168px] w-full object-cover object-[64%_55%]" /><div className="flex flex-col justify-between bg-[#f1c441] p-3"><Sparkles className="h-5 w-5" /><p className="font-bebas text-lg leading-none">PACKED\nWITH INTENT.</p><span className="font-mono text-[8px] font-bold">EDIT 01</span></div></div>
    </section>
    <section className="px-4 pb-7 pt-6"><SectionHeading eyebrow="THE BEST OF OH MAN" title="MOST WANTED" /><div className="grid grid-cols-2 gap-x-3 gap-y-5">{featuredProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} offer={getProductOffer(product, offers)} onClick={() => onOpenProduct(product)} />)}</div></section>
    <BenefitsBar />
  </>;
}

function CollectionsScreen({ categories, products, onOpenCollection }: { categories: Category[]; products: Product[]; onOpenCollection: (category: string) => void }) {
  return <div className="px-4 pb-7 pt-6"><SectionHeading eyebrow="SHOP BY DEPARTMENT" title="CATEGORIES" /><div className="grid grid-cols-2 gap-3">{categories.map((category, index) => <button key={category.id} onClick={() => onOpenCollection(category.name)} className="group text-left"><div className="relative h-[176px] overflow-hidden bg-[#e4e1d8]"><img src={itemImage(products.find((product) => product.category === category.name) ?? products[index])} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-black/20" /><span className="absolute bottom-3 left-3 bg-white px-2 py-1 font-bebas text-sm tracking-wide">{categoryLabels[category.name] ?? category.name.toUpperCase()}</span></div><div className="flex items-center justify-between pt-2"><span className="font-mono text-[9px] font-bold tracking-[0.08em]">{category.name.toUpperCase()}</span><ChevronRight className="h-4 w-4" /></div></button>)}</div><div className="mt-6 border border-black bg-[#1b1b1a] p-5 text-white"><p className="font-mono text-[9px] tracking-[0.15em] text-[#f1c441]">JOIN THE LIST</p><h2 className="mt-2 font-bebas text-[25px] leading-[.92]">NEW DROPS,\nFIRST LOOKS.</h2><button className="mt-4 flex w-full items-center justify-between bg-[#f1c441] px-3 py-2.5 font-bebas text-sm text-black">GET ON THE LIST <Send className="h-4 w-4" /></button></div></div>;
}

function SearchScreen({ categories, products, selectedCategory, activeOffer, offers, searchQuery, onCategoryChange, onSearchChange, onClearOffer, onOpenProduct }: { categories: Category[]; products: Product[]; selectedCategory: string; activeOffer: Offer | null; offers: Offer[]; searchQuery: string; onCategoryChange: (category: string) => void; onSearchChange: (query: string) => void; onClearOffer: () => void; onOpenProduct: (product: Product) => void }) {
  return <div className="pb-7"><div className="px-4 pt-5"><p className="font-mono text-[8px] font-bold tracking-[0.18em] text-[#be4935]">{activeOffer ? 'LIVE OFFER COLLECTION' : 'OH MAN CATALOGUE'}</p><h1 className="mt-1 font-bebas text-[31px] leading-none">{activeOffer ? activeOffer.title.toUpperCase() : 'FIND YOUR NEXT.'}</h1>{activeOffer && <div className="mt-3 flex items-center justify-between bg-[#1c1c1b] p-3 text-white"><span><strong className="block font-bebas text-[20px] leading-none text-[#f1c441]">{activeOffer.discount}</strong><span className="mt-1 block font-mono text-[8px] text-white/60">{activeOffer.productIds.length} SELECTED PIECES</span></span><button onClick={onClearOffer} className="font-mono text-[8px] underline underline-offset-4">CLEAR</button></div>}<label className="mt-4 flex h-11 items-center gap-2 border border-black/25 bg-white px-3"><Search className="h-4 w-4" /><input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="SEARCH PRODUCTS" className="min-w-0 flex-1 bg-transparent font-mono text-[10px] outline-none placeholder:text-black/40" /><SlidersHorizontal className="h-4 w-4 text-black/55" /></label></div><div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none">{['ALL', ...categories.map((category) => category.name)].map((category) => <button key={category} onClick={() => onCategoryChange(category)} className={`whitespace-nowrap border px-3 py-2 font-bebas text-[11px] tracking-wide ${selectedCategory === category && !activeOffer ? 'border-[#d25036] bg-[#d25036] text-white' : 'border-black/15 bg-white text-black'}`}>{category === 'ALL' ? 'ALL PRODUCTS' : category}</button>)}</div><div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-5 px-4">{products.map((product) => <ProductCard key={product.id} product={product} offer={activeOffer?.discountPercent ? activeOffer : getProductOffer(product, offers)} onClick={() => onOpenProduct(product)} />)}</div>{products.length === 0 && <div className="px-4 py-16 text-center"><Search className="mx-auto h-7 w-7 text-black/30" /><p className="mt-3 font-bebas text-lg">NO PIECES FOUND.</p><p className="mt-1 text-xs text-black/50">Try another search or department.</p></div>}</div>;
}

function SavedScreen({ products, offers, onOpenProduct, onBrowse }: { products: Product[]; offers: Offer[]; onOpenProduct: (product: Product) => void; onBrowse: () => void }) { return <div className="px-4 pb-8 pt-6"><p className="font-mono text-[8px] font-bold tracking-[0.18em] text-[#be4935]">YOUR SHORTLIST</p><h1 className="mt-1 font-bebas text-[31px] leading-none">SAVED PIECES.</h1>{products.length ? <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5">{products.map((product) => <ProductCard key={product.id} product={product} offer={getProductOffer(product, offers)} onClick={() => onOpenProduct(product)} />)}</div> : <div className="mt-6 flex min-h-[330px] flex-col items-center justify-center border border-dashed border-black/20 bg-white px-7 text-center"><Heart className="h-8 w-8 text-[#d25036]" /><h2 className="mt-4 font-bebas text-xl">YOUR LIST IS CLEAR.</h2><p className="mt-2 text-xs leading-relaxed text-black/55">Tap the heart on any piece to build a collection that is entirely yours.</p><button onClick={onBrowse} className="mt-5 bg-[#1b1b1a] px-4 py-2.5 font-bebas text-sm text-white">BROWSE THE CATALOGUE</button></div>}</div>; }

function AccountScreen({ settings, onBrowse }: { settings: BusinessSettings; onBrowse: () => void }) { return <div className="px-4 pb-8 pt-6"><div className="flex items-center gap-4 border-b border-black/10 pb-5"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1c441] font-bebas text-xl">OM</div><div><p className="font-mono text-[8px] font-bold tracking-[0.17em] text-[#be4935]">OH MAN MEMBER</p><h1 className="mt-1 font-bebas text-[27px] leading-none">YOUR SPACE.</h1></div></div><div className="mt-5 space-y-3"><AccountRow label="STORED PREFERENCES" value="Manage your style profile" /><AccountRow label="DELIVERY & RETURNS" value="Track an order or start a return" /><AccountRow label="CONTACT THE STORE" value={settings.phone} /><AccountRow label="VISIT OUR STORE" value="Mazgaon, Mumbai" /></div><button onClick={onBrowse} className="mt-7 flex w-full items-center justify-between bg-[#d25036] px-4 py-3 font-bebas text-sm text-white">SHOP NEW ARRIVALS <ArrowRight className="h-4 w-4" /></button></div>; }

function ProductDetail({ product, offer, selectedImage, selectedSize, isWishlisted, detailOpen, deliveryOpen, onBack, onSelectImage, onSelectSize, onToggleWishlist, onAddToBag, onToggleDetails, onToggleDelivery }: { product: Product; offer?: Offer; selectedImage: number; selectedSize: string; isWishlisted: boolean; detailOpen: boolean; deliveryOpen: boolean; onBack: () => void; onSelectImage: (index: number) => void; onSelectSize: (size: string) => void; onToggleWishlist: () => void; onAddToBag: () => void; onToggleDetails: () => void; onToggleDelivery: () => void }) {
  const images = product.images.length ? product.images : [itemImage(product)];
  const salePrice = discountedPrice(product, offer);
  return <div className="mobile-scroll min-h-0 flex-1 overflow-y-auto bg-[#faf9f5] pb-[76px]"><div className="sticky top-0 z-20 flex h-13 items-center justify-between border-b border-black/10 bg-white/95 px-4 backdrop-blur"><button onClick={onBack} aria-label="Back to catalogue" className="flex h-10 w-10 items-center justify-start"><ArrowLeft className="h-5 w-5" /></button><span className="max-w-[180px] truncate font-bebas text-[14px] tracking-wide">{product.name}</span><div className="flex gap-1"><button onClick={onToggleWishlist} aria-label="Save product" className="flex h-10 w-8 items-center justify-center"><Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#d25036] text-[#d25036]' : ''}`} strokeWidth={1.6} /></button><button className="flex h-10 w-8 items-center justify-center" aria-label="Share product"><Share2 className="h-4 w-4" /></button></div></div><div className="relative h-[356px] bg-[#eae7df]"><img src={images[selectedImage] ?? images[0]} alt={product.name} className="h-full w-full object-cover" />{product.tag && <span className="absolute left-3 top-3 bg-[#f1c441] px-2 py-1 font-mono text-[8px] font-bold tracking-[0.1em]">{product.tag}</span>}<span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-1 font-mono text-[8px]">{selectedImage + 1}/{images.length}</span></div><div className="flex gap-2 overflow-x-auto border-b border-black/10 bg-white px-3 py-2 scrollbar-none">{images.map((image, index) => <button key={`${image}-${index}`} onClick={() => onSelectImage(index)} className={`h-14 w-12 flex-none overflow-hidden border-2 ${selectedImage === index ? 'border-[#208f91]' : 'border-transparent'}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div><div className="px-4 pb-4 pt-5"><p className="font-mono text-[9px] font-bold tracking-[0.15em] text-[#be4935]">{product.category.toUpperCase()}</p><div className="mt-1 flex items-start justify-between gap-3"><h1 className="font-bebas text-[31px] leading-[.9] tracking-[-0.035em]">{product.name}</h1><button onClick={onToggleWishlist} className="mt-0.5 rounded-full border border-black/15 p-2"><Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#d25036] text-[#d25036]' : ''}`} /></button></div><div className="mt-3 flex items-center justify-between"><span>{offer && <span className="mb-1 block font-mono text-[8px] font-bold text-[#d25036]">{offer.discount} / {offer.code}</span>}<span className="flex items-center gap-2"><b className="font-bebas text-[25px]">₹{salePrice.toLocaleString()}</b>{offer && <s className="font-mono text-[10px] text-black/45">₹{product.price.toLocaleString()}</s>}</span></span><span className="rounded-full bg-[#e1f0eb] px-2 py-1 font-mono text-[8px] font-bold text-[#0b7560]">IN STOCK</span></div><div className="mt-5 border-t border-black/10 pt-4"><div className="flex items-center justify-between"><h2 className="font-bebas text-[16px] tracking-wide">SELECT SIZE</h2><button className="font-mono text-[9px] underline underline-offset-4">SIZE GUIDE</button></div><div className="mt-3 grid grid-cols-5 gap-2">{['S', 'M', 'L', 'XL', 'XXL'].map((size) => <button key={size} onClick={() => onSelectSize(size)} className={`h-10 border font-mono text-[10px] ${selectedSize === size ? 'border-black bg-[#1b1b1a] text-white' : 'border-black/25 bg-white'}`}>{size}</button>)}</div></div><div className="mt-5 space-y-2"><DetailAccordion title="PRODUCT DETAILS" open={detailOpen} onClick={onToggleDetails}>{product.description}<ul className="mt-3 space-y-1.5 font-mono text-[10px] text-black/65">{product.features.map((feature) => <li key={feature}>• {feature}</li>)}</ul></DetailAccordion><DetailAccordion title="DELIVERY & RETURNS" open={deliveryOpen} onClick={onToggleDelivery}><div className="space-y-3 text-[11px] leading-relaxed text-black/65"><div className="flex gap-2"><Truck className="h-4 w-4 flex-none text-[#208f91]" />Free delivery on orders above ₹1,499. Expected delivery in 3–5 working days.</div><div className="flex gap-2"><PackageCheck className="h-4 w-4 flex-none text-[#208f91]" />Easy 30-day return or exchange. Keep the original tags intact.</div></div></DetailAccordion></div></div><div className="fixed bottom-0 z-30 flex h-[69px] w-[384px] max-w-[calc(100vw-22px)] gap-2 border-t border-black/10 bg-white px-3 py-3"><button onClick={onToggleWishlist} className="flex w-[48px] items-center justify-center border border-black/20"><Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#d25036] text-[#d25036]' : ''}`} /></button><button onClick={onAddToBag} className="flex flex-1 items-center justify-center gap-2 bg-[#d25036] font-bebas text-[16px] tracking-wide text-white">ADD TO BAG <ShoppingBag className="h-4 w-4" /></button></div></div>;
}

function ProductCard({ product, offer, onClick, compact = false }: { product: Product; offer?: Offer; onClick: () => void; compact?: boolean }) { const salePrice = discountedPrice(product, offer); return <button onClick={onClick} className={`group text-left ${compact ? 'w-[148px] flex-none' : ''}`}><div className={`relative overflow-hidden bg-[#e7e4db] ${compact ? 'h-[174px]' : 'h-[205px]'}`}><img src={itemImage(product)} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />{offer ? <span className="absolute left-2 top-2 bg-[#d25036] px-1.5 py-1 font-mono text-[7px] font-bold tracking-[0.07em] text-white">{offer.discountPercent}% OFF</span> : product.tag && <span className="absolute left-2 top-2 bg-white px-1.5 py-1 font-mono text-[7px] font-bold tracking-[0.07em]">{product.tag}</span>}<Heart className="absolute right-2 top-2 h-4 w-4 text-white drop-shadow" strokeWidth={1.8} /></div><p className="mt-2 truncate font-semibold text-[11px]">{product.name}</p><p className="mt-1 font-mono text-[10px] text-black/55">{product.category}</p><p className="mt-1 flex items-center gap-1.5"><b className="font-bebas text-[15px]">₹{salePrice.toLocaleString()}</b>{offer && <s className="font-mono text-[8px] text-black/45">₹{product.price.toLocaleString()}</s>}</p></button>; }

function CategoryTile({ category, product, onClick }: { category: Category; product?: Product; onClick: () => void }) { return <button onClick={onClick} className="group text-left"><div className="relative h-[123px] overflow-hidden bg-[#e5e2d9]"><img src={itemImage(product)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-black/20" /><span className="absolute bottom-2 left-2 right-2 font-bebas text-[12px] leading-none tracking-wide text-white">{categoryLabels[category.name] ?? category.name.toUpperCase()}</span></div><p className="mt-1.5 truncate font-mono text-[8px] font-bold tracking-[0.08em]">{category.name.toUpperCase()}</p></button>; }

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action?: string; onAction?: () => void }) { return <div className="mb-3 flex items-end justify-between"><div><p className="font-mono text-[8px] font-bold tracking-[0.17em] text-[#be4935]">{eyebrow}</p><h2 className="mt-1 font-bebas text-[24px] leading-none tracking-[-0.03em]">{title}</h2></div>{action && <button onClick={onAction} className="mb-0.5 font-mono text-[8px] font-bold underline underline-offset-4">{action}</button>}</div>; }

function DetailAccordion({ title, open, onClick, children }: { title: string; open: boolean; onClick: () => void; children: React.ReactNode }) { return <div className="border-y border-black/10"><button onClick={onClick} className="flex w-full items-center justify-between py-4 font-bebas text-[14px] tracking-wide">{title}<ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>{open && <div className="pb-4 text-[11px] leading-relaxed text-black/65">{children}</div>}</div>; }

function AccountRow({ label, value }: { label: string; value: string }) { return <button className="flex w-full items-center justify-between border-b border-black/10 pb-3 text-left"><span><span className="block font-bebas text-[14px] tracking-wide">{label}</span><span className="mt-1 block text-[11px] text-black/55">{value}</span></span><ChevronRight className="h-4 w-4" /></button>; }

function BenefitsBar() { return <div className="grid grid-cols-3 border-t border-black/10 bg-[#e5f3f5] py-4 text-center"><div className="border-r border-black/10 px-2"><span className="font-bebas text-[12px]">CURATED</span><p className="mt-1 font-mono text-[7px] text-black/60">SINCE 2013</p></div><div className="border-r border-black/10 px-2"><span className="font-bebas text-[12px]">30 DAYS</span><p className="mt-1 font-mono text-[7px] text-black/60">EASY RETURNS</p></div><div className="px-2"><span className="font-bebas text-[12px]">FAST SHIP</span><p className="mt-1 font-mono text-[7px] text-black/60">PAN INDIA</p></div></div>; }

function MenuDrawer({ categories, onClose, onNavigate, onOpenCollection, onLogout }: { categories: Category[]; onClose: () => void; onNavigate: (tab: Tab) => void; onOpenCollection: (category: string) => void; onLogout: () => void }) {
  return <div className="absolute inset-0 z-40 bg-black/40">
    <aside className="relative h-full w-[82%] bg-[#faf9f5] p-5 shadow-2xl">
      <div className="flex items-center justify-between"><img src="/ohman-logo.png" alt="OH MAN" className="h-8 w-20 object-contain" /><button onClick={onClose} aria-label="Close menu"><X className="h-6 w-6" /></button></div>
      <p className="mt-7 font-mono text-[8px] font-bold tracking-[0.17em] text-[#be4935]">SHOP DEPARTMENTS</p>
      <div className="mt-3 border-t border-black/10">{categories.map((category) => <button key={category.id} onClick={() => onOpenCollection(category.name)} className="flex w-full items-center justify-between border-b border-black/10 py-3 font-bebas text-[19px] tracking-wide">{category.name}<ArrowRight className="h-4 w-4" /></button>)}</div>
      <p className="mt-7 font-mono text-[8px] font-bold tracking-[0.17em] text-[#be4935]">OH MAN</p>
      <div className="mt-3 space-y-1"><button onClick={() => onNavigate('saved')} className="block font-bebas text-[16px] tracking-wide">SAVED PIECES</button><button onClick={() => onNavigate('account')} className="block font-bebas text-[16px] tracking-wide">MY ACCOUNT</button></div>

      <div className="absolute bottom-5 left-5 right-5 space-y-2">
        <button onClick={onLogout} className="flex w-full items-center justify-between border-2 border-black bg-[#191919] px-4 py-3 text-left text-white shadow-[3px_3px_0_#f1c441]">
          <span>
            <span className="block font-bebas text-[17px] tracking-wide">LOG OUT</span>
            <span className="mt-0.5 block font-mono text-[7px] tracking-[0.08em] text-white/50">RETURN TO MEMBER LOGIN</span>
          </span>
          <LogOut className="h-5 w-5 text-[#f1c441]" />
        </button>
        <div className="border border-black bg-[#f1c441] p-3"><p className="font-bebas text-[15px]">MAZGAON, MUMBAI</p><p className="mt-1 font-mono text-[8px]">70–72 SHETH MOTISHA • OPEN EVERY DAY</p></div>
      </div>
    </aside>
  </div>;
}

function BagDrawer({ products, offers, total, onClose, onRemove }: { products: Product[]; offers: Offer[]; total: number; onClose: () => void; onRemove: (id: string) => void }) { return <div className="absolute inset-0 z-40 flex justify-end bg-black/40"><aside className="flex h-full w-[86%] flex-col bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><div><p className="font-mono text-[8px] font-bold tracking-[0.17em] text-[#be4935]">YOUR BAG</p><h2 className="mt-1 font-bebas text-[25px] leading-none">READY TO MOVE.</h2></div><button onClick={onClose} aria-label="Close bag"><X className="h-6 w-6" /></button></div>{products.length ? <div className="mobile-scroll mt-6 min-h-0 flex-1 space-y-3 overflow-y-auto">{products.map((product, index) => { const offer = getProductOffer(product, offers); return <div key={`${product.id}-${index}`} className="flex gap-3 border-b border-black/10 pb-3"><img src={itemImage(product)} alt="" className="h-18 w-16 bg-[#ece9e1] object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-bebas text-[15px] tracking-wide">{product.name}</p><p className="mt-1 font-mono text-[10px] text-black/55">M / {product.category}</p><p className="mt-2 flex items-center gap-1.5"><b className="font-bebas text-[15px]">₹{discountedPrice(product, offer).toLocaleString()}</b>{offer && <s className="font-mono text-[8px] text-black/45">₹{product.price.toLocaleString()}</s>}</p></div><button onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`} className="self-start text-black/45"><Minus className="h-4 w-4" /></button></div>})}</div> : <div className="flex flex-1 flex-col items-center justify-center text-center"><ShoppingBag className="h-9 w-9 text-black/25" /><p className="mt-4 font-bebas text-xl">YOUR BAG IS EMPTY.</p><p className="mt-2 text-xs text-black/50">Find your next everyday essential.</p></div>}<div className="border-t border-black/10 pt-4"><div className="mb-4 flex items-center justify-between font-bebas text-[18px]"><span>SUBTOTAL</span><span>₹{total.toLocaleString()}</span></div><button disabled={!products.length} className="flex w-full items-center justify-center gap-2 bg-[#d25036] py-3 font-bebas text-[16px] tracking-wide text-white disabled:bg-black/20">CHECKOUT <ArrowRight className="h-4 w-4" /></button></div></aside></div>; }
