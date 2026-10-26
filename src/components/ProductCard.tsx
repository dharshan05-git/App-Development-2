import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';
import { Product } from '../types/jewellery';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (e: React.MouseEvent) => void;
  onClick: () => void;
  onQuickAdd?: (e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onWishlistToggle,
  onClick,
  onQuickAdd,
}) => {
  // Approximate 6-month EMI
  const monthlyEMI = Math.round(product.price / 6);

  return (
    <div
      onClick={onClick}
      className="group rounded-2xl overflow-hidden bg-sand/70 dark:bg-umber-velvet border border-hairline dark:border-hairline-dark hover:border-brass/50 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none shadow-sm hover:shadow-md"
    >
      {/* 3:4 Media Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand dark:bg-sand-dark">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overline Badge (top-left) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-full bg-cream/90 dark:bg-umber/90 backdrop-blur-md text-umber dark:text-cream text-[9px] font-bold tracking-widest uppercase border border-hairline/60">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick Wishlist Heart (top-right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(e);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-cream/80 dark:bg-umber/80 backdrop-blur-md flex items-center justify-center text-umber dark:text-cream hover:scale-110 active:scale-90 transition-transform shadow-sm min-w-[36px] min-h-[36px]"
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-maroon text-maroon dark:fill-maroon-dark dark:text-maroon-dark'
                : 'text-umber/80 dark:text-cream/80'
            }`}
          />
        </button>

        {/* AR Badge indicator if supported */}
        {product.tryOnSupported && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-umber/80 backdrop-blur-sm text-cream text-[9px] font-medium border border-brass/30">
            <Sparkles className="w-2.5 h-2.5 text-brass" />
            <span>Try On</span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          {/* Metal & Weight Caption */}
          <div className="flex items-center gap-1.5 text-[11px] text-brass dark:text-brass-light font-medium uppercase tracking-wider">
            <span>{product.metal}</span>
            <span aria-hidden="true">·</span>
            <span>{product.grossWeight}g</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm font-semibold text-umber dark:text-cream mt-1 line-clamp-1 group-hover:text-maroon dark:group-hover:text-brass-light transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center text-brass">
              <Star className="w-3 h-3 fill-brass" />
            </div>
            <span className="text-xs font-semibold text-umber/80 dark:text-cream/80 tabular-nums">
              {product.rating}
            </span>
            <span className="text-[10px] text-umber/50 dark:text-cream/50">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price Row */}
        <div className="mt-2.5 pt-2 border-t border-hairline/60 dark:border-hairline-dark/60">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-bold text-base text-maroon dark:text-cream tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-brass line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <p className="text-[10px] text-umber/60 dark:text-cream/60 mt-0.5">
            EMI from ₹{monthlyEMI.toLocaleString('en-IN')}/mo
          </p>

          {/* Quick Add Button */}
          {onQuickAdd && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(e);
              }}
              className="mt-2.5 w-full py-1.5 px-2 rounded-lg border border-hairline dark:border-hairline-dark text-[11px] font-semibold text-umber dark:text-cream hover:bg-maroon hover:text-cream hover:border-maroon transition-colors text-center"
            >
              + Quick Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
