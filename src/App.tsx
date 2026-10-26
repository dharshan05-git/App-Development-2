/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem } from './types/jewellery';
import { INITIAL_PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { LiveGoldRateBar } from './components/LiveGoldRateBar';
import { BottomNavBar, NavTabId } from './components/BottomNavBar';
import { FloatingCartButton } from './components/FloatingCartButton';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ARTryOnModal } from './components/ARTryOnModal';
import { DigitalVaultModal } from './components/DigitalVaultModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ConsultationModal } from './components/ConsultationModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { StyleQuizModal } from './components/StyleQuizModal';

import { HomeView } from './views/HomeView';
import { CollectionsView } from './views/CollectionsView';
import { DiscoverView } from './views/DiscoverView';
import { WishlistView } from './views/WishlistView';
import { ProfileView } from './views/ProfileView';
import { Smartphone, Monitor, Moon, Sun, UserCheck } from 'lucide-react';

export default function App() {
  // Appearance & Viewport States
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'mobile-frame' | 'responsive'>('mobile-frame');

  // Persona State for testing journeys
  const [currentPersona, setCurrentPersona] = useState<'Aanya (Bridal)' | 'Rohan (Gifter)' | 'Meera (Everyday)' | 'Venkataraman (Heritage)'>('Aanya (Bridal)');

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  // E-Commerce Data States
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [wishlist, setWishlist] = useState<string[]>(['prod-bridal-01', 'prod-ring-01']);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      giftWrap: true,
      insurance: true,
    },
  ]);

  // Modal Dialog States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAROpen, setIsAROpen] = useState(false);
  const [arProduct, setArProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Live Gold Rate Micro-Fluctuation Ticker Simulation (Section 15.2)
  const [goldRate, setGoldRate] = useState<number>(7485);
  useEffect(() => {
    const interval = setInterval(() => {
      setGoldRate((prev) => {
        const delta = Math.random() > 0.48 ? 1 : -1;
        return prev + delta;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sync Dark Mode class with root document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, giftWrap: false, insurance: true }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleGiftWrap = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, giftWrap: !item.giftWrap } : item
      )
    );
  };

  const handleToggleInsurance = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, insurance: !item.insurance } : item
      )
    );
  };

  const handleBuyNow = (product: Product) => {
    // Direct sticky buy now path
    const existing = cart.find((i) => i.product.id === product.id);
    if (!existing) {
      setCart((prev) => [...prev, { product, quantity: 1, giftWrap: false, insurance: true }]);
    }
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOpenAR = (product: Product) => {
    setArProduct(product);
    setIsAROpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Persona switch handler
  const handleSwitchPersona = (persona: typeof currentPersona) => {
    setCurrentPersona(persona);
    if (persona.includes('Bridal')) {
      setSelectedCategory('Bridal');
      setActiveTab('home');
    } else if (persona.includes('Gifter')) {
      setSelectedCategory('Solitaires');
      setActiveTab('collections');
    } else if (persona.includes('Everyday')) {
      setActiveTab('wishlist');
    } else if (persona.includes('Heritage')) {
      setSelectedCategory('Temple');
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 transition-colors duration-300 font-sans">
      
      {/* TOP DESKTOP PROTOCOL & SIMULATION CONTROLS */}
      <div className="w-full max-w-4xl mb-3 hidden sm:flex items-center justify-between px-4 py-2 bg-stone-800/90 backdrop-blur-md rounded-2xl border border-stone-700/60 text-xs shadow-lg">
        
        {/* Brand identity badge */}
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-amber-300 tracking-wider">
            DS JEWELLERY
          </span>
          <span className="text-stone-400">· UX/UI Specification Mobile Prototype</span>
        </div>

        {/* Persona quick switch (Section 1) */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400 flex items-center gap-1 text-[11px]">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Persona:</span>
          </span>
          <select
            value={currentPersona}
            onChange={(e) => handleSwitchPersona(e.target.value as any)}
            className="bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-amber-200 focus:outline-none cursor-pointer"
          >
            <option value="Aanya (Bridal)">Persona A: Aanya (Bridal Milestone)</option>
            <option value="Rohan (Gifter)">Persona B: Rohan (Considered Gifter)</option>
            <option value="Meera (Everyday)">Persona C: Meera (Daily Adorner)</option>
            <option value="Venkataraman (Heritage)">Persona D: Venkataraman (Heritage Gold)</option>
          </select>
        </div>

        {/* Viewport & Dark Mode Toggles */}
        <div className="flex items-center gap-2">
          <div className="flex p-0.5 bg-stone-900 rounded-lg border border-stone-700">
            <button
              onClick={() => setViewportMode('mobile-frame')}
              className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
                viewportMode === 'mobile-frame'
                  ? 'bg-stone-700 text-amber-200'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Mobile Device Chassis"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[10px]">Mobile</span>
            </button>
            <button
              onClick={() => setViewportMode('responsive')}
              className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
                viewportMode === 'responsive'
                  ? 'bg-stone-700 text-amber-200'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Full Responsive Canvas"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[10px]">Fluid</span>
            </button>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg border border-stone-700 bg-stone-900 hover:bg-stone-700 text-amber-300 transition-colors flex items-center gap-1 text-[11px]"
            title="Toggle Evening Salon Dark Mode"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{darkMode ? 'Silk (Light)' : 'Salon (Dark)'}</span>
          </button>
        </div>
      </div>

      {/* MOBILE DEVICE CONTAINER SHELL */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          viewportMode === 'mobile-frame'
            ? 'max-w-md min-h-[860px] sm:max-h-[890px] sm:rounded-[44px] sm:border-[8px] sm:border-stone-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-amber-500/20'
            : 'max-w-4xl min-h-screen sm:rounded-2xl sm:border border-stone-800 overflow-hidden'
        } ${darkMode ? 'bg-umber-dark text-cream-soft' : 'bg-cream text-umber'}`}
      >
        
        {/* Mobile Device Status Bar (Time, Battery, Signal) */}
        <div className="bg-sand/60 dark:bg-umber-dark/90 px-6 pt-3 pb-1 flex justify-between items-center text-[11px] font-semibold tracking-wider text-umber/80 dark:text-cream/80 select-none z-30">
          <span>9:41 AM</span>
          
          {/* Dynamic Island Pill Simulator */}
          <div className="w-24 h-4 bg-umber/90 dark:bg-black rounded-full flex items-center justify-center gap-1 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-cream/70 font-mono tracking-tighter">DS LIVE</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <span>5G</span>
            <div className="w-4 h-2 border border-current rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-current rounded-2xs" />
            </div>
          </div>
        </div>

        {/* 1. Persistent Glanceable Live Gold Rate Strip */}
        <LiveGoldRateBar currentRate={goldRate} />

        {/* 2. Top Header */}
        <Header
          onOpenSearch={() => setActiveTab('discover')}
          onOpenVault={() => setIsVaultOpen(true)}
          onOpenStores={() => setIsStoresOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 3. Main Viewport Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {activeTab === 'home' && (
            <HomeView
              products={products}
              wishlist={wishlist}
              onWishlistToggle={handleToggleWishlist}
              onSelectProduct={setSelectedProduct}
              onQuickAdd={handleAddToCart}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('collections');
              }}
              onOpenAR={handleOpenAR}
              onOpenConsultation={() => setIsConsultationOpen(true)}
              onOpenVault={() => setIsVaultOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}

          {activeTab === 'collections' && (
            <CollectionsView
              products={products}
              wishlist={wishlist}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onWishlistToggle={handleToggleWishlist}
              onSelectProduct={setSelectedProduct}
              onQuickAdd={handleAddToCart}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoverView
              products={products}
              wishlist={wishlist}
              onWishlistToggle={handleToggleWishlist}
              onSelectProduct={setSelectedProduct}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistView
              wishlistProductIds={wishlist}
              allProducts={products}
              onWishlistToggle={handleToggleWishlist}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onOpenVault={() => setIsVaultOpen(true)}
              onOpenConsultation={() => setIsConsultationOpen(true)}
              onOpenStores={() => setIsStoresOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}
        </main>

        {/* 4. Persistent Floating Shopping Bag Button (Section 5) */}
        <FloatingCartButton
          itemCount={totalCartCount}
          onClick={() => setIsCartOpen(true)}
          visible={!isCartOpen && !isCheckoutOpen}
        />

        {/* 5. Bottom Navigation Bar (5 Tabs, 2px editorial underline, Section 5) */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          wishlistCount={wishlist.length}
        />

        {/* Mobile Chassis Home Indicator Bar */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-50">
          <div className="w-32 h-1 bg-umber/30 dark:bg-cream/30 rounded-full" />
        </div>

        {/* MODALS & DRAWERS */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onWishlistToggle={() => handleToggleWishlist(selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenAR={() => handleOpenAR(selectedProduct)}
            onBookConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {isAROpen && (
          <ARTryOnModal
            product={arProduct}
            onClose={() => setIsAROpen(false)}
            onAddToCart={() => handleAddToCart(arProduct)}
          />
        )}

        {isVaultOpen && (
          <DigitalVaultModal
            currentGoldRate={goldRate}
            onClose={() => setIsVaultOpen(false)}
          />
        )}

        <CartDrawer
          items={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onToggleGiftWrap={handleToggleGiftWrap}
          onToggleInsurance={handleToggleInsurance}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CheckoutModal
          items={cart}
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccessOrder={() => setCart([])}
        />

        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
        />

        <StoreLocatorModal
          isOpen={isStoresOpen}
          onClose={() => setIsStoresOpen(false)}
        />

        <StyleQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
          }}
          products={products}
        />

      </div>
    </div>
  );
}
