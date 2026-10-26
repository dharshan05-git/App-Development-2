import React from 'react';
import { Search, ShieldCheck, Bell, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenVault: () => void;
  onOpenStores: () => void;
  onOpenQuiz: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenVault,
  onOpenStores,
  onOpenQuiz,
  unreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-cream/95 dark:bg-umber-dark/95 backdrop-blur-md border-b border-hairline dark:border-hairline-dark px-4 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left Action: Stores & Style Quiz */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenStores}
            className="p-2 rounded-lg text-umber/80 dark:text-cream/80 hover:text-maroon dark:hover:text-brass-light hover:bg-sand/60 dark:hover:bg-umber-velvet transition-colors flex items-center gap-1"
            title="Store Locator & Boutiques"
            aria-label="Stores"
          >
            <MapPin className="w-4 h-4 text-brass" />
            <span className="hidden sm:inline text-[11px] font-medium tracking-wide">Boutiques</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="px-2 py-1.5 rounded-lg text-[11px] font-medium text-brass hover:text-maroon dark:hover:text-cream hover:bg-sand/60 dark:hover:bg-umber-velvet transition-colors flex items-center gap-1"
            title="Style Recommendation Quiz"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Style Quiz</span>
          </button>
        </div>

        {/* Center: Brand Identity (Editorial Wordmark) */}
        <div className="text-center cursor-pointer select-none">
          <h1 className="font-serif text-lg sm:text-xl font-bold tracking-[0.12em] text-maroon dark:text-maroon-dark uppercase leading-tight">
            DS Jewellery
          </h1>
          <p className="text-[9px] uppercase tracking-[0.24em] text-brass dark:text-brass-light font-medium">
            Fine Jewels · Est. 1984
          </p>
        </div>

        {/* Right Actions: Search & Digital Vault */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-umber/80 dark:text-cream/80 hover:text-maroon dark:hover:text-brass-light hover:bg-sand/60 dark:hover:bg-umber-velvet transition-colors"
            title="Search Catalogue & Stories"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenVault}
            className="p-2 rounded-lg text-umber/80 dark:text-cream/80 hover:text-maroon dark:hover:text-brass-light hover:bg-sand/60 dark:hover:bg-umber-velvet transition-colors relative"
            title="Digital Authenticity Vault"
            aria-label="Digital Vault"
          >
            <ShieldCheck className="w-4 h-4 text-brass" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-maroon ring-1 ring-cream dark:ring-umber-dark" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
