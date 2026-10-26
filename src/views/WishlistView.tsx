import React from 'react';
import { Heart, Trash2, ShoppingBag, TrendingDown, Sparkles } from 'lucide-react';
import { Product } from '../types/jewellery';

interface WishlistViewProps {
  wishlistProductIds: string[];
  allProducts: Product[];
  onWishlistToggle: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuiz: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProductIds,
  allProducts,
  onWishlistToggle,
  onSelectProduct,
  onAddToCart,
  onOpenQuiz,
}) => {
  const wishlistedProducts = allProducts.filter(p => wishlistProductIds.includes(p.id));

  return (
    <div className="p-4 space-y-4 animate-fade-in pb-12">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
            Saved Jewellery Box
          </span>
          <h2 className="font-serif text-2xl font-bold text-umber dark:text-cream">
            Your Wishlist
          </h2>
        </div>
        <span className="text-xs font-semibold text-brass tabular-nums">
          {wishlistedProducts.length} Saved Pieces
        </span>
      </div>

      {wishlistedProducts.length === 0 ? (
        /* Empty State (Section 17) */
        <div className="py-16 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-sand dark:bg-sand-dark flex items-center justify-center text-brass border border-hairline dark:border-hairline-dark">
            <Heart className="w-10 h-10 stroke-[1.25]" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-umber dark:text-cream">
              Your jewellery box is empty
            </h3>
            <p className="text-xs text-umber/70 dark:text-cream/70 max-w-xs mx-auto">
              Save your cherished bridal necklaces and solitaire rings here to receive real-time price drop notifications.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onOpenQuiz}
              className="px-4 py-2.5 bg-maroon text-cream text-xs font-semibold rounded-xl hover:bg-maroon-dark transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Take Style Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Price Drop Alert Trust Banner (Section 1 & 2) */}
          <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-emerald-600/30 flex items-center gap-2.5 text-xs">
            <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-umber/80 dark:text-cream/80">
              <strong className="text-emerald-700 dark:text-emerald-400">Price drop active:</strong> You are tracking {wishlistedProducts.length} items. We will alert you whenever bullion gold rates decline.
            </span>
          </div>

          {/* List of Wishlisted Items */}
          <div className="space-y-3">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl bg-sand/80 dark:bg-sand-dark/80 border border-hairline dark:border-hairline-dark flex gap-3 relative hover:border-brass/40 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onClick={() => onSelectProduct(product)}
                  className="w-24 h-28 rounded-xl object-cover bg-cream dark:bg-umber-dark shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
                    <span className="text-[10px] font-bold tracking-widest text-brass uppercase">
                      {product.metal} · {product.grossWeight}g
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-umber dark:text-cream line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-sm text-maroon dark:text-cream tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-brass line-through tabular-nums">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-maroon text-cream text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:bg-maroon-dark transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => onWishlistToggle(product.id)}
                      className="p-1.5 rounded-lg border border-hairline dark:border-hairline-dark text-umber/50 dark:text-cream/50 hover:text-rose-600 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
