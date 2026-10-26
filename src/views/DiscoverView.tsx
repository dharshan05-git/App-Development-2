import React, { useState } from 'react';
import { Search, Mic, Camera, Sparkles, BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { Product, EditorialStory } from '../types/jewellery';
import { EDITORIAL_STORIES } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

interface DiscoverViewProps {
  products: Product[];
  wishlist: string[];
  onWishlistToggle: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenQuiz: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  products,
  wishlist,
  onWishlistToggle,
  onSelectProduct,
  onOpenQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<EditorialStory | null>(null);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  // Search filter
  const searchResults = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSimulateVoice = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setSearchQuery('Diamond Solitaire');
      setIsVoiceListening(false);
    }, 1400);
  };

  const handleSimulateImageSearch = () => {
    setSearchQuery('Bridal Choker');
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
          Editorial & Search
        </span>
        <h2 className="font-serif text-2xl font-bold text-umber dark:text-cream">
          Discover & The Journal
        </h2>
      </div>

      {/* Smart Search Bar (Section 3 & 4) */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-brass" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isVoiceListening ? 'Listening for jewellery search...' : 'Search Polki, Solitaires, Temple Gold, Kundan...'}
            className="w-full pl-10 pr-20 py-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark text-xs text-umber dark:text-cream focus:outline-none focus:border-maroon shadow-sm"
          />

          <div className="absolute right-2.5 flex items-center gap-1 text-umber/60 dark:text-cream/60">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:text-umber"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleSimulateVoice}
                  className={`p-1.5 rounded-lg hover:text-maroon transition-colors ${isVoiceListening ? 'text-maroon animate-pulse' : ''}`}
                  title="Voice Search"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSimulateImageSearch}
                  className="p-1.5 rounded-lg hover:text-maroon transition-colors"
                  title="Visual Lens Search"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick Search Tags */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          {['Uncut Polki', 'Rose Gold Ring', 'Temple Kasu Mala', 'Emerald Jhumkas'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark text-umber/80 dark:text-cream/80 hover:border-brass shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* If Search Active: Show Results */}
      {searchQuery.trim() !== '' && (
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-umber dark:text-cream">
              Results for &quot;{searchQuery}&quot; ({searchResults.length})
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-brass hover:underline"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-xs text-umber/70 dark:text-cream/70">
                No matching jewellery piece for &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-maroon dark:text-brass-light hover:underline"
              >
                Explore All Collections
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onWishlistToggle={() => onWishlistToggle(product.id)}
                  onClick={() => onSelectProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Style Quiz Promo Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sand to-sand/40 dark:from-umber-velvet dark:to-sand-dark border border-brass/30 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-brass uppercase">
            30-Second Concierge
          </span>
          <h4 className="font-serif text-sm font-bold text-umber dark:text-cream">
            Find Your Milestone Piece
          </h4>
          <p className="text-[11px] text-umber/70 dark:text-cream/70">
            Tell us your celebration, preferred karat, and budget for tailored curations.
          </p>
        </div>
        <button
          onClick={onOpenQuiz}
          className="px-4 py-2.5 bg-maroon text-cream text-xs font-semibold rounded-xl hover:bg-maroon-dark transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Take Quiz</span>
        </button>
      </div>

      {/* Editorial Journal Articles (Magazine-Style Rhythm) */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
              Curator Stories
            </span>
            <h3 className="font-serif text-lg font-bold text-umber dark:text-cream">
              The Jewellery Journal
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {EDITORIAL_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="rounded-2xl overflow-hidden bg-sand/70 dark:bg-sand-dark/70 border border-hairline dark:border-hairline-dark hover:border-brass/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-umber/80 backdrop-blur-md text-cream text-[9px] font-bold tracking-widest uppercase">
                  {story.category}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] text-umber/50 dark:text-cream/50">
                  <span>{story.author}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{story.readTime}</span>
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-umber dark:text-cream group-hover:text-maroon dark:group-hover:text-brass-light transition-colors">
                  {story.title}
                </h4>

                <p className="text-xs text-umber/70 dark:text-cream/70 line-clamp-2 leading-relaxed">
                  {story.subtitle}
                </p>

                <div className="pt-2 text-xs font-semibold text-brass flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Story Modal Reader */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-lg max-h-[85vh] bg-cream dark:bg-umber-velvet rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl overflow-y-auto no-scrollbar p-6 space-y-4">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded bg-sand dark:bg-sand-dark text-[9px] font-bold tracking-widest text-brass uppercase">
                {selectedStory.category}
              </span>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-1 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif text-xl font-bold text-umber dark:text-cream">
              {selectedStory.title}
            </h3>

            <div className="text-xs text-umber/60 dark:text-cream/60 flex items-center gap-2">
              <span>{selectedStory.author}</span>
              <span>·</span>
              <span>{selectedStory.date}</span>
            </div>

            <img
              src={selectedStory.image}
              alt={selectedStory.title}
              referrerPolicy="no-referrer"
              className="w-full h-48 object-cover rounded-xl"
            />

            <p className="text-xs text-umber/90 dark:text-cream/90 leading-relaxed font-serif text-base">
              {selectedStory.content}
            </p>

            <button
              onClick={() => setSelectedStory(null)}
              className="w-full py-2.5 bg-maroon text-cream font-semibold text-xs rounded-xl hover:bg-maroon-dark transition-colors"
            >
              Close Journal Reader
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
