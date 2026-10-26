import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, RefreshCw, Truck, Heart, Star } from 'lucide-react';
import { Product, Category } from '../types/jewellery';
import { ProductCard } from '../components/ProductCard';
import { ARTISAN_CRAFT_IMG } from '../data/mockData';

interface HomeViewProps {
  products: Product[];
  wishlist: string[];
  onWishlistToggle: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectCategory: (category: Category) => void;
  onOpenAR: (product: Product) => void;
  onOpenConsultation: () => void;
  onOpenVault: () => void;
  onOpenQuiz: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  wishlist,
  onWishlistToggle,
  onSelectProduct,
  onQuickAdd,
  onSelectCategory,
  onOpenAR,
  onOpenConsultation,
  onOpenVault,
  onOpenQuiz,
}) => {
  const heroProduct = products[0]; // The Royal Mayura Necklace

  return (
    <div className="space-y-7 pb-6 animate-fade-in">
      
      {/* 1. EDITORIAL HERO BANNER (Section 12 & 13) */}
      <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden group">
        <img
          src={heroProduct.image}
          alt={heroProduct.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Measured Scrim Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-umber via-umber/40 to-transparent flex flex-col justify-end p-5 sm:p-8 text-cream">
          <span className="text-[11px] font-bold tracking-[0.2em] text-brass uppercase mb-1">
            Bridal Masterpiece 2026
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-snug mb-2 max-w-sm">
            {heroProduct.name}
          </h2>
          <p className="text-xs text-cream/80 mb-4 line-clamp-2 max-w-sm">
            Handcrafted in 22K gold foil with natural uncut Polki diamonds and teardrop Zambian emerald cascades.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectProduct(heroProduct)}
              className="px-5 py-2.5 bg-cream text-umber text-xs font-semibold rounded-xl hover:bg-brass hover:text-cream transition-colors shadow-lg active:scale-95"
            >
              Explore Piece · ₹{heroProduct.price.toLocaleString('en-IN')}
            </button>

            <button
              onClick={() => onOpenAR(heroProduct)}
              className="px-4 py-2.5 bg-umber/80 backdrop-blur-md text-cream text-xs font-medium rounded-xl border border-brass/40 flex items-center gap-1.5 hover:bg-umber transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span>Try On (AR)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY PILL CAROUSEL */}
      <div className="px-4">
        <div className="flex justify-between items-baseline mb-3">
          <h3 className="font-serif text-lg font-bold text-umber dark:text-cream">
            Signature Portfolios
          </h3>
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs font-semibold text-brass hover:underline flex items-center gap-0.5"
          >
            <span>All Jewels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {(['Bridal', 'Gold', 'Diamond', 'Temple', 'Solitaires'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="px-4 py-2.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark text-xs font-semibold text-umber dark:text-cream hover:border-brass/70 transition-all flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-maroon dark:bg-brass" />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. NEW ARRIVALS GRID (2-Up Grid, Section 11 & 13) */}
      <div className="px-4 space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
              Heirloom Craft
            </span>
            <h3 className="font-serif text-xl font-bold text-umber dark:text-cream">
              New Arrivals
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onWishlistToggle={() => onWishlistToggle(product.id)}
              onClick={() => onSelectProduct(product)}
              onQuickAdd={() => onQuickAdd(product)}
            />
          ))}
        </div>
      </div>

      {/* 4. PERSONA SHORTCUTS / PERSONALIZED RECOMMENDATIONS (Section 1) */}
      <div className="mx-4 p-5 rounded-2xl bg-sand dark:bg-umber-velvet border border-hairline dark:border-hairline-dark space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
            Tailored Experiences
          </span>
          <h4 className="font-serif text-base font-bold text-umber dark:text-cream">
            Curated by Occasion
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onSelectCategory('Bridal')}
            className="p-3 rounded-xl bg-cream dark:bg-umber-dark border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
          >
            <span className="font-serif font-bold text-umber dark:text-cream block">The Bridal Trousseau</span>
            <span className="text-[10px] text-umber/60 dark:text-cream/60 mt-0.5 block">For Wedding Milestones</span>
          </button>

          <button
            onClick={() => onSelectCategory('Solitaires')}
            className="p-3 rounded-xl bg-cream dark:bg-umber-dark border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
          >
            <span className="font-serif font-bold text-umber dark:text-cream block">Anniversary Gifts</span>
            <span className="text-[10px] text-brass font-medium mt-0.5 block">Ships in 2 Days · Gift Wrapped</span>
          </button>

          <button
            onClick={() => onSelectCategory('Gold')}
            className="p-3 rounded-xl bg-cream dark:bg-umber-dark border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
          >
            <span className="font-serif font-bold text-umber dark:text-cream block">Daily Adornment</span>
            <span className="text-[10px] text-umber/60 dark:text-cream/60 mt-0.5 block">Lightweight 22K Essentials</span>
          </button>

          <button
            onClick={() => onSelectCategory('Temple')}
            className="p-3 rounded-xl bg-cream dark:bg-umber-dark border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
          >
            <span className="font-serif font-bold text-umber dark:text-cream block">Temple Gold Heritage</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5 block">100% Purity Hallmarked</span>
          </button>
        </div>
      </div>

      {/* 5. CRAFTSMANSHIP EDITORIAL FEATURE (Section 13) */}
      <div className="mx-4 rounded-2xl overflow-hidden bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark">
        <div className="relative aspect-[16/9] w-full">
          <img
            src={ARTISAN_CRAFT_IMG}
            alt="Master Goldsmith at Bench"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-umber/80 to-transparent flex items-end p-4">
            <span className="px-2.5 py-1 rounded bg-cream/90 text-umber text-[9px] font-bold tracking-widest uppercase">
              Artisan Bench Notes
            </span>
          </div>
        </div>

        <div className="p-5 space-y-2">
          <h4 className="font-serif text-lg font-bold text-umber dark:text-cream">
            The Alchemy of 22K Cold-Pressed Kundan
          </h4>
          <p className="text-xs text-umber/80 dark:text-cream/80 leading-relaxed">
            In our Jaipur atelier, 24K pure gold ribbons are manually compressed at room temperature around uncut stones without chemical adhesives. The result is pure, eternal brilliance.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onOpenConsultation}
              className="text-xs font-semibold text-maroon dark:text-brass-light hover:underline flex items-center gap-1"
            >
              <span>Speak with a Master Jeweller</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenQuiz}
              className="text-xs text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
            >
              Style Quiz
            </button>
          </div>
        </div>
      </div>

      {/* 6. 100% CERTIFIED PURITY & LIFETIME BUYBACK BANNER (Section 13) */}
      <div className="mx-4 p-5 rounded-2xl bg-cream dark:bg-umber-dark border border-brass/40 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brass/15 flex items-center justify-center text-brass shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
              Govt. of India Registered
            </span>
            <h4 className="font-serif text-base font-bold text-umber dark:text-cream">
              The DS Jewellery Promise
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1 border-t border-hairline dark:border-hairline-dark">
          <div className="space-y-0.5">
            <span className="font-bold text-umber dark:text-cream block">BIS 916 Hallmark</span>
            <span className="text-[10px] text-umber/60 dark:text-cream/60">Every gold item Laser-stamped</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-umber dark:text-cream block">IGI & GIA Diamonds</span>
            <span className="text-[10px] text-umber/60 dark:text-cream/60">100% Conflict-free Solitaires</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-umber dark:text-cream block">Lifetime Buyback</span>
            <span className="text-[10px] text-umber/60 dark:text-cream/60">100% Value on Live Gold Rate</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-umber dark:text-cream block">Armored Delivery</span>
            <span className="text-[10px] text-umber/60 dark:text-cream/60">100% Transit Insured Courier</span>
          </div>
        </div>

        <div className="pt-1 text-center">
          <button
            onClick={onOpenVault}
            className="text-xs font-semibold text-brass hover:underline"
          >
            Inspect Digital Authenticity Vault & Purity Passports →
          </button>
        </div>
      </div>

    </div>
  );
};
