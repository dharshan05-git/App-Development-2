import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/mockData';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [filterCity, setFilterCity] = useState<string>('All');

  if (!isOpen) return null;

  const filteredStores = filterCity === 'All'
    ? STORE_LOCATIONS
    : STORE_LOCATIONS.filter(s => s.city.toLowerCase() === filterCity.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-lg h-full sm:h-auto sm:max-h-[88vh] bg-cream dark:bg-umber-velvet rounded-none sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-hairline dark:border-hairline-dark flex items-center justify-between bg-sand/60 dark:bg-sand-dark/40">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brass" />
            <h3 className="font-serif text-base font-bold text-umber dark:text-cream">
              DS Jewellery Flagship Boutiques
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Filter Tabs */}
        <div className="p-3 border-b border-hairline dark:border-hairline-dark flex gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Bengaluru', 'Chennai', 'Coimbatore', 'Mumbai'].map(city => (
            <button
              key={city}
              onClick={() => setFilterCity(city)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filterCity === city
                  ? 'bg-maroon text-cream'
                  : 'bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark text-umber dark:text-cream'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Store List */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-3 flex-1 text-xs">
          {filteredStores.map(store => (
            <div
              key={store.id}
              className="p-4 rounded-xl bg-sand/80 dark:bg-sand-dark/80 border border-hairline dark:border-hairline-dark space-y-2 hover:border-brass transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-brass uppercase block">
                    {store.city} · {store.distance}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-umber dark:text-cream">
                    {store.name}
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
                  {store.inStockPieces}+ In-Stock Pieces
                </span>
              </div>

              <p className="text-umber/80 dark:text-cream/80 text-[11px] leading-relaxed">
                {store.address}
              </p>

              <div className="pt-2 border-t border-hairline dark:border-hairline-dark flex flex-wrap items-center justify-between gap-2 text-[11px] text-umber/70 dark:text-cream/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brass" />
                  <span>{store.hours}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-brass" />
                  <span>{store.phone}</span>
                </span>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => alert(`Opening navigation directions to ${store.name}`)}
                  className="flex-1 py-2 px-3 rounded-lg bg-umber dark:bg-cream text-cream dark:text-umber text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-brass transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => alert(`Calling boutique at ${store.phone}`)}
                  className="py-2 px-3 rounded-lg border border-hairline dark:border-hairline-dark text-umber dark:text-cream text-xs font-semibold hover:border-brass transition-colors"
                >
                  Call Store
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
