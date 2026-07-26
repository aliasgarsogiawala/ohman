import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Grid, 
  Search, 
  PhoneCall, 
  User, 
  ArrowLeft, 
  ArrowUpRight, 
  Heart, 
  Share2, 
  MessageSquare, 
  Plus, 
  SlidersHorizontal,
  ChevronRight,
  MapPin,
  Mail,
  Globe,
  Tv
} from 'lucide-react';
import { Product, Category, BusinessSettings } from '../../types';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

interface MobileSimulatorProps {
  products: Product[];
  categories: Category[];
  businessSettings: BusinessSettings;
  activeProductId?: string;
  onProductSelect?: (id: string) => void;
}

type TabType = 'home' | 'categories' | 'search' | 'contact' | 'profile';

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  products,
  categories,
  businessSettings,
  activeProductId,
  onProductSelect
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(false);

  useEffect(() => {
    if (activeProductId) {
      const found = products.find(p => p.id === activeProductId);
      if (found) {
        setCurrentProduct(found);
      }
    }
  }, [activeProductId, products]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleProductClick = (product: Product) => {
    setCurrentProduct(product);
    if (onProductSelect) onProductSelect(product.id);
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'ALL' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex justify-center items-center py-4">
      {/* Mobile Smartphone Frame */}
      <div className="w-[375px] h-[780px] bg-black rounded-[48px] p-3 shadow-[0_0_50px_rgba(217,255,63,0.15)] border-4 border-[#262626] relative overflow-hidden flex flex-col">
        {/* Phone Speaker Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-[#222] rounded-full"></div>
          <div className="w-2 h-2 rounded-full bg-[#111] ml-2"></div>
        </div>

        {/* Top Status Bar */}
        <div className="pt-2 px-6 pb-2 flex justify-between items-center text-xs font-mono text-white/70 select-none z-40 bg-[#0B0B0B]">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2 border border-white/70 rounded-sm p-0.5">
              <div className="w-full h-full bg-white/90"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0B0B0B] overflow-y-auto relative scrollbar-none flex flex-col">
          
          {/* VIEW: PRODUCT DETAIL OVERLAY */}
          {currentProduct ? (
            <div className="flex-1 flex flex-col bg-[#0B0B0B] text-white z-30 pb-20">
              {/* Top Navigation */}
              <div className="sticky top-0 bg-[#0B0B0B]/90 backdrop-blur-md px-4 py-3 border-b border-[#262626] flex items-center justify-between z-20">
                <button 
                  onClick={() => setCurrentProduct(null)}
                  className="w-9 h-9 bg-[#171717] border border-[#333] flex items-center justify-center hover:bg-[#D9FF3F] hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-bebas text-lg tracking-wider truncate max-w-[180px]">
                  {currentProduct.category}
                </span>
                <button 
                  onClick={(e) => toggleWishlist(currentProduct.id, e)}
                  className={`w-9 h-9 border border-[#333] flex items-center justify-center transition-colors ${wishlist.includes(currentProduct.id) ? 'bg-[#FF4D6D] text-black border-[#FF4D6D]' : 'bg-[#171717] text-white'}`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              <div className="p-4 space-y-5 flex-1">
                {/* Large Product Gallery Header */}
                <div className="relative">
                  <ImagePlaceholder 
                    src={currentProduct.images[0]} 
                    alt={currentProduct.name}
                    aspectRatio="aspect-[4/5]"
                    label={currentProduct.name}
                    sublabel="HIGH RESOLUTION SPEC"
                  />
                  {currentProduct.tag && (
                    <div className="absolute top-3 left-3 bg-[#D9FF3F] text-black font-bebas px-2 py-1 text-xs border border-black shadow-[2px_2px_0px_#000]">
                      {currentProduct.tag}
                    </div>
                  )}
                </div>

                {/* Title & Price Header */}
                <div className="space-y-1">
                  <h1 className="font-bebas text-4xl leading-none text-white tracking-wide uppercase">
                    {currentProduct.name}
                  </h1>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-2xl font-bold text-[#D9FF3F]">
                      ₹{currentProduct.price.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono px-2 py-1 bg-[#171717] border border-[#333] text-accentSuccess">
                      {currentProduct.stockStatus}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-[#171717] p-3 border border-[#262626] space-y-1">
                  <span className="text-[10px] font-mono text-textGray uppercase tracking-wider">DESCRIPTION</span>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {currentProduct.description}
                  </p>
                </div>

                {/* Features Specs */}
                <div className="space-y-2">
                  <span className="text-xs font-bebas text-white tracking-wider uppercase">FEATURES</span>
                  <div className="space-y-1">
                    {currentProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-[#141414] border border-[#262626] p-2 text-xs font-mono">
                        <span className="text-[#D9FF3F] font-bold">+</span>
                        <span className="text-gray-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Actions */}
              <div className="fixed bottom-14 left-0 right-0 p-3 bg-[#0B0B0B] border-t-2 border-black flex space-x-2 z-40 max-w-[350px] mx-auto">
                <a
                  href={`tel:${businessSettings.phone}`}
                  className="flex-1 bg-[#D9FF3F] text-black font-bebas text-lg py-3 px-3 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center space-x-1"
                >
                  <span>ADD TO CONTACT</span>
                </a>
                <a
                  href={`https://wa.me/${businessSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Interested in ${encodeURIComponent(currentProduct.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#7C3AED] text-white p-3 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          ) : (
            /* TABBED VIEWS */
            <div className="flex-1 flex flex-col pb-16">
              {activeTab === 'home' && (
                <div className="p-4 space-y-6">
                  {/* Neobrutalist Hero Section */}
                  <div className="bg-[#171717] border-2 border-black p-5 relative overflow-hidden shadow-[4px_4px_0px_#D9FF3F]">
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <span className="text-xs text-[#444] font-mono">+</span>
                      <span className="text-xs text-[#444] font-mono">+</span>
                    </div>
                    <span className="text-xs font-mono bg-[#7C3AED] text-white px-2 py-0.5 font-bold uppercase border border-black">
                      FALL / WINTER '26
                    </span>
                    <h1 className="font-bebas text-5xl leading-none text-white tracking-wider mt-3 mb-2">
                      GEAR THAT<br /><span className="text-[#D9FF3F]">MOVES YOU.</span>
                    </h1>
                    <p className="text-xs text-textGray font-sans mb-4 max-w-[220px]">
                      Premium essentials. Built for adventure, designed for you.
                    </p>
                    <button 
                      onClick={() => setActiveTab('search')}
                      className="bg-[#D9FF3F] text-black font-bebas text-base px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-2 active:translate-x-0.5"
                    >
                      <span>EXPLORE NOW</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Bar Quick Access */}
                  <div 
                    onClick={() => setActiveTab('search')}
                    className="bg-[#141414] border border-[#262626] p-3 flex items-center justify-between cursor-pointer hover:border-[#D9FF3F] transition-colors"
                  >
                    <span className="text-xs font-mono text-textGray">SEARCH PRODUCTS...</span>
                    <div className="w-7 h-7 bg-[#D9FF3F] text-black border border-black flex items-center justify-center">
                      <Search className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Category Grid Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bebas text-2xl tracking-wide uppercase text-white">CATEGORIES</h2>
                      <button 
                        onClick={() => setActiveTab('categories')}
                        className="text-xs font-mono text-textGray hover:text-[#D9FF3F] flex items-center"
                      >
                        VIEW ALL <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <div 
                          key={cat.id} 
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setActiveTab('search');
                          }}
                          className="bg-[#171717] border border-[#262626] p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#D9FF3F] hover:bg-[#1f1f1f] transition-all group shadow-[2px_2px_0px_#000]"
                        >
                          <div className="w-10 h-10 bg-[#222] border border-[#333] group-hover:border-[#D9FF3F] mb-1 flex items-center justify-center">
                            <Grid className="w-5 h-5 text-textGray group-hover:text-[#D9FF3F]" />
                          </div>
                          <span className="font-bebas text-xs text-white uppercase tracking-wider truncate w-full">
                            {cat.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Products Horizontal Scroll */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bebas text-2xl tracking-wide uppercase text-white">FEATURED PRODUCTS</h2>
                      <button 
                        onClick={() => setActiveTab('search')}
                        className="text-xs font-mono text-textGray hover:text-[#D9FF3F] flex items-center"
                      >
                        VIEW ALL <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>

                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
                      {products.filter(p => p.featured).map((product) => (
                        <div 
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="min-w-[160px] max-w-[160px] bg-[#171717] border border-[#262626] p-2 flex flex-col cursor-pointer group hover:border-[#D9FF3F] transition-all"
                        >
                          <ImagePlaceholder 
                            src={product.images[0]} 
                            aspectRatio="aspect-square" 
                            label={product.name}
                          />
                          <div className="pt-2 flex-1 flex flex-col justify-between">
                            <h3 className="font-bebas text-sm text-white uppercase tracking-wide truncate group-hover:text-[#D9FF3F]">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between pt-1">
                              <span className="font-mono text-xs text-white font-bold">
                                ₹{product.price}
                              </span>
                              <div className="w-5 h-5 bg-[#D9FF3F] text-black border border-black flex items-center justify-center">
                                <Plus className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                    <h1 className="font-bebas text-3xl text-white tracking-wider uppercase">DISCOVER OUR RANGE</h1>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <div 
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setActiveTab('search');
                        }}
                        className="bg-[#171717] border border-[#262626] p-3 flex flex-col justify-between cursor-pointer hover:border-[#D9FF3F] transition-all group aspect-square shadow-[3px_3px_0px_#000]"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs text-[#666]">{cat.productCount} ITEMS</span>
                          <div className="w-7 h-7 bg-[#222] border border-[#333] group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bebas text-xl text-white uppercase tracking-wide group-hover:text-[#D9FF3F]">
                            {cat.name}
                          </h3>
                          <p className="text-[10px] text-textGray font-sans line-clamp-1">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'search' && (
                <div className="p-4 space-y-4">
                  {/* Category Pills Header */}
                  <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                    <button 
                      onClick={() => setSelectedCategory('ALL')}
                      className={`font-bebas px-3 py-1 text-sm border border-black ${selectedCategory === 'ALL' ? 'bg-[#D9FF3F] text-black font-bold' : 'bg-[#171717] text-white'}`}
                    >
                      ALL
                    </button>
                    {categories.map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`font-bebas px-3 py-1 text-sm whitespace-nowrap border border-black ${selectedCategory === cat.name ? 'bg-[#D9FF3F] text-black font-bold' : 'bg-[#171717] text-white'}`}
                      >
                        {cat.name.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Search Field */}
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="SEARCH PRODUCTS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#171717] border border-[#333] px-3 py-2 text-xs font-mono text-white placeholder-textGray focus:outline-none focus:border-[#D9FF3F]"
                    />
                    <Search className="w-4 h-4 text-textGray absolute right-3 top-2.5" />
                  </div>

                  {/* 2-Column Responsive Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="bg-[#171717] border border-[#262626] p-2 flex flex-col justify-between cursor-pointer group hover:border-[#D9FF3F] transition-all shadow-[2px_2px_0px_#000]"
                      >
                        <div className="relative">
                          <ImagePlaceholder 
                            src={product.images[0]} 
                            aspectRatio="aspect-square" 
                            label={product.name}
                          />
                          <button 
                            onClick={(e) => toggleWishlist(product.id, e)}
                            className="absolute top-2 right-2 w-7 h-7 bg-black/70 border border-[#333] flex items-center justify-center text-white"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''}`} />
                          </button>
                        </div>
                        <div className="pt-2 flex-1 flex flex-col justify-between space-y-1">
                          <h3 className="font-bebas text-sm text-white uppercase tracking-wide line-clamp-1 group-hover:text-[#D9FF3F]">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-white font-bold">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <div className="w-6 h-6 bg-[#D9FF3F] text-black border border-black flex items-center justify-center">
                              <Plus className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="p-4 space-y-4">
                  <div className="border-b border-[#262626] pb-3">
                    <h1 className="font-bebas text-3xl text-white tracking-wider uppercase">GET IN TOUCH</h1>
                    <p className="text-xs text-textGray">We're here to help.</p>
                  </div>

                  <div className="space-y-3">
                    <a 
                      href={`tel:${businessSettings.phone}`}
                      className="bg-[#171717] border border-[#262626] p-3 flex items-center justify-between hover:border-[#D9FF3F] group transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#222] border border-[#333] flex items-center justify-center text-[#D9FF3F]">
                          <PhoneCall className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-textGray uppercase block">PHONE</span>
                          <span className="font-mono text-xs text-white font-bold">{businessSettings.phone}</span>
                        </div>
                      </div>
                      <div className="w-7 h-7 bg-[#D9FF3F] text-black border border-black flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>

                    <a 
                      href={`https://wa.me/${businessSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#171717] border border-[#262626] p-3 flex items-center justify-between hover:border-[#D9FF3F] group transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#222] border border-[#333] flex items-center justify-center text-accentSuccess">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-textGray uppercase block">WHATSAPP</span>
                          <span className="font-mono text-xs text-white font-bold">{businessSettings.whatsapp}</span>
                        </div>
                      </div>
                      <div className="w-7 h-7 bg-[#D9FF3F] text-black border border-black flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>

                    <a 
                      href={`mailto:${businessSettings.email}`}
                      className="bg-[#171717] border border-[#262626] p-3 flex items-center justify-between hover:border-[#D9FF3F] group transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#222] border border-[#333] flex items-center justify-center text-[#7C3AED]">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-textGray uppercase block">EMAIL</span>
                          <span className="font-mono text-xs text-white font-bold">{businessSettings.email}</span>
                        </div>
                      </div>
                      <div className="w-7 h-7 bg-[#D9FF3F] text-black border border-black flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>

                    <div className="bg-[#171717] border border-[#262626] p-3 space-y-2">
                      <div className="flex items-center space-x-2 text-textGray">
                        <MapPin className="w-4 h-4 text-[#D9FF3F]" />
                        <span className="text-[10px] font-mono uppercase">ADDRESS</span>
                      </div>
                      <p className="font-sans text-xs text-gray-300">
                        {businessSettings.address}
                      </p>
                    </div>

                    {/* Social Handles */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-textGray uppercase tracking-wider block mb-2">FOLLOW US</span>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-[#171717] border border-[#262626] p-2 flex items-center justify-center space-x-1">
                          <Globe className="w-4 h-4 text-white" />
                          <span className="text-[10px] font-mono text-gray-300">{businessSettings.instagram}</span>
                        </div>
                        <div className="flex-1 bg-[#171717] border border-[#262626] p-2 flex items-center justify-center space-x-1">
                          <Tv className="w-4 h-4 text-[#FF4D6D]" />
                          <span className="text-[10px] font-mono text-gray-300">{businessSettings.youtube}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="p-4 space-y-4">
                  <div className="bg-[#171717] border-2 border-black p-4 flex items-center space-x-3 shadow-[4px_4px_0px_#D9FF3F]">
                    <div className="w-12 h-12 bg-[#D9FF3F] text-black font-bebas text-2xl border border-black flex items-center justify-center font-bold">
                      GZ
                    </div>
                    <div>
                      <h2 className="font-bebas text-2xl text-white">GUEST USER</h2>
                      <span className="text-[10px] font-mono text-[#7C3AED] bg-[#222] px-2 py-0.5 border border-[#333]">EXPLO VIP MEMBER</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bebas text-textGray">WISHLIST ({wishlist.length})</span>
                    {wishlist.length === 0 ? (
                      <div className="bg-[#141414] border border-[#262626] p-6 text-center text-xs font-mono text-textGray">
                        NO SAVED PRODUCTS YET
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {products.filter(p => wishlist.includes(p.id)).map(p => (
                          <div key={p.id} onClick={() => handleProductClick(p)} className="bg-[#171717] border border-[#262626] p-2 flex items-center justify-between cursor-pointer">
                            <span className="font-bebas text-sm text-white">{p.name}</span>
                            <span className="font-mono text-xs text-[#D9FF3F]">₹{p.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0B0B0B] border-t-2 border-[#262626] px-4 flex items-center justify-around z-40">
          <button 
            onClick={() => { setCurrentProduct(null); setActiveTab('home'); }}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'home' && !currentProduct ? 'text-[#D9FF3F]' : 'text-textGray'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-bebas tracking-widest">HOME</span>
          </button>
          <button 
            onClick={() => { setCurrentProduct(null); setActiveTab('categories'); }}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'categories' && !currentProduct ? 'text-[#D9FF3F]' : 'text-textGray'}`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[9px] font-bebas tracking-widest">CATEGORIES</span>
          </button>
          <button 
            onClick={() => { setCurrentProduct(null); setActiveTab('search'); }}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'search' && !currentProduct ? 'text-[#D9FF3F]' : 'text-textGray'}`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[9px] font-bebas tracking-widest">SEARCH</span>
          </button>
          <button 
            onClick={() => { setCurrentProduct(null); setActiveTab('contact'); }}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'contact' && !currentProduct ? 'text-[#D9FF3F]' : 'text-textGray'}`}
          >
            <PhoneCall className="w-5 h-5" />
            <span className="text-[9px] font-bebas tracking-widest">CONTACT</span>
          </button>
          <button 
            onClick={() => { setCurrentProduct(null); setActiveTab('profile'); }}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'profile' && !currentProduct ? 'text-[#D9FF3F]' : 'text-textGray'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bebas tracking-widest">PROFILE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
