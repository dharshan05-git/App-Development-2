import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
  visible: boolean;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  itemCount,
  onClick,
  visible,
}) => {
  if (!visible || itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 sm:right-8 z-40 w-14 h-14 rounded-full bg-umber dark:bg-cream text-cream dark:text-umber shadow-2xl flex items-center justify-center border border-brass/50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      aria-label={`Shopping Bag with ${itemCount} items`}
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
        <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full bg-maroon dark:bg-maroon-dark text-cream text-[10px] font-bold min-w-[18px] text-center shadow-sm">
          {itemCount}
        </span>
      </div>
    </button>
  );
};
