import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { Product, Category } from '../types/jewellery';
import { ProductCard } from '../components/ProductCard';

interface CollectionsViewProps {
  products: Product[];
  wishlist: string[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  onWishlistToggle: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  products,
  wishlist,
  selectedCategory,
  onSelectCategory,
  onWishlistToggle,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories: Category[] = ['All', 'Bridal', 'Gold', 'Diamond', 'Temple', 'Solitaires'];

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    if (product.price > maxPrice) {
      return false;
    }
    if (onlyInStock && !product.inStock) {
      return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="p-4 space-y-4 animate-fade-in pb-12">
      {/* Title & Stats */}
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brass block">
            Catalogue Portfolio
          </span>
          <h2 className="font-serif text-2xl font-bold text-umber dark:text-cream">
            {selectedCategory === 'All' ? 'Fine Jewellery Collections' : `${selectedCategory} Collection`}
          </h2>
        </div>
        <span className="text-xs font-semibold text-brass tabular-nums">
          {sortedProducts.length} Pieces
        </span>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-maroon text-cream font-semibold shadow-sm'
                : 'bg-sand dark:bg-sand-dark text-umber dark:text-cream border border-hairline dark:border-hairline-dark hover:border-brass/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort & Filter Action Bar */}
      <div className="flex items-center justify-between text-xs pt-1 pb-1 border-y border-hairline dark:border-hairline-dark">
        <div className="flex items-center gap-1.5 text-umber/70 dark:text-cream/70">
          <ArrowUpDown className="w-3.5 h-3.5 text-brass" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent font-medium text-umber dark:text-cream focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated & Certified</option>
          </select>
        </div>

        <button
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
            showFilterDrawer
              ? 'bg-maroon text-cream border-maroon'
              : 'border-hairline dark:border-hairline-dark text-umber dark:text-cream hover:border-brass'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Inline Filter Controls Drawer */}
      {showFilterDrawer && (
        <div className="p-4 rounded-xl bg-sand/80 dark:bg-sand-dark/80 border border-hairline dark:border-hairline-dark space-y-3 text-xs animate-fade-in">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-umber/70 dark:text-cream/70">Price Ceiling:</span>
              <span className="font-bold text-maroon dark:text-cream tabular-nums">
                Up to ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="600000"
              step="25000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-maroon cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-umber dark:text-cream">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 accent-maroon rounded"
              />
              <span>In-Stock Ready for Armored Dispatch</span>
            </label>

            <button
              onClick={() => {
                setMaxPrice(600000);
                setOnlyInStock(false);
              }}
              className="text-brass hover:underline text-[11px]"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Product Listing 2-Up Grid (Section 11) */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <h4 className="font-serif text-base font-bold text-umber dark:text-cream">
            No matching pieces found
          </h4>
          <p className="text-xs text-umber/70 dark:text-cream/70 max-w-xs mx-auto">
            Adjust your price filter or select &apos;All&apos; to view our full collection of certified jewellery.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              setMaxPrice(600000);
            }}
            className="px-4 py-2 bg-maroon text-cream text-xs font-semibold rounded-lg"
          >
            Show All Pieces
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {sortedProducts.map((product) => (
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
      )}
    </div>
  );
};
