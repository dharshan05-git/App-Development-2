import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Gift, ShieldCheck, Tag, ArrowRight, Check } from 'lucide-react';
import { CartItem } from '../types/jewellery';

interface CartDrawerProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onToggleGiftWrap: (productId: string) => void;
  onToggleInsurance: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onToggleGiftWrap,
  onToggleInsurance,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const makingChargesTotal = items.reduce((sum, item) => sum + (item.product.makingCharges * item.quantity), 0);
  const hasGiftWrap = items.some(item => item.giftWrap);
  const giftWrapFee = hasGiftWrap ? 499 : 0;
  const hasInsurance = items.some(item => item.insurance);
  const insuranceFee = hasInsurance ? 499 : 0;

  // Coupon discount: DSROYAL gives 5% off subtotal
  const discountAmount = appliedCoupon === 'DSROYAL' ? Math.round(subtotal * 0.05) : 0;
  const grandTotal = subtotal + giftWrapFee + insuranceFee - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DSROYAL') {
      setAppliedCoupon('DSROYAL');
      setCouponError(null);
    } else {
      setCouponError('Invalid code. Try "DSROYAL" for 5% royal privilege savings.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-umber/70 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md h-[92vh] sm:h-[86vh] bg-cream dark:bg-umber-velvet rounded-t-3xl sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl flex flex-col overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-hairline dark:border-hairline-dark flex items-center justify-between bg-sand/60 dark:bg-sand-dark/40">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-brass uppercase">
              Shopping Bag
            </span>
            <h3 className="font-serif text-lg font-bold text-umber dark:text-cream">
              Your Curated Jewels ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-sand dark:bg-sand-dark flex items-center justify-center text-brass">
                <Gift className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-bold text-umber dark:text-cream">
                Your bag is presently empty
              </h4>
              <p className="text-xs text-umber/70 dark:text-cream/70 max-w-xs mx-auto">
                Explore our handcrafted bridal trousseau and diamond solitaire collections.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-maroon text-cream text-xs font-semibold rounded-xl hover:bg-maroon-dark transition-colors"
              >
                Browse Jewellery
              </button>
            </div>
          ) : (
            <>
              {/* Product Rows */}
              <div className="space-y-3">
                {items.map(({ product, quantity, giftWrap, insurance }) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-sand/80 dark:bg-sand-dark/80 border border-hairline dark:border-hairline-dark flex gap-3 relative"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-24 rounded-xl object-cover bg-cream dark:bg-umber-dark shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-xs font-semibold text-umber dark:text-cream line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="text-umber/40 hover:text-rose-600 dark:text-cream/40 p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-brass font-medium">
                          {product.metal} · {product.grossWeight}g
                        </span>
                        <p className="text-xs font-bold text-maroon dark:text-cream mt-0.5 tabular-nums">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Stepper & Options */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-hairline dark:border-hairline-dark rounded-lg bg-cream dark:bg-umber-dark">
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="p-1 hover:text-maroon text-umber dark:text-cream min-w-[28px] min-h-[28px] flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-umber dark:text-cream">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="p-1 hover:text-maroon text-umber dark:text-cream min-w-[28px] min-h-[28px] flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Gift Wrap Toggle */}
                        <button
                          onClick={() => onToggleGiftWrap(product.id)}
                          className={`text-[10px] px-2 py-1 rounded flex items-center gap-1 border transition-colors ${
                            giftWrap
                              ? 'bg-brass text-cream border-brass font-medium'
                              : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70 hover:border-brass'
                          }`}
                        >
                          <Gift className="w-3 h-3" />
                          <span>{giftWrap ? 'Gift Wrapped' : '+ Gift Wrap'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Insurance Opt-in Row (Section 13) */}
              <div className="p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-brass shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-umber dark:text-cream block">
                      Armored Transit Insurance (₹499)
                    </span>
                    <p className="text-[10px] text-umber/70 dark:text-cream/70">
                      100% full replacement cover against theft or transit damage.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasInsurance}
                  onChange={() => items.length > 0 && onToggleInsurance(items[0].product.id)}
                  className="w-4 h-4 accent-maroon rounded cursor-pointer shrink-0"
                />
              </div>

              {/* Coupon Code Section */}
              <div className="p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark space-y-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-brass" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. DSROYAL)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-cream dark:bg-umber-dark border border-hairline dark:border-hairline-dark text-xs uppercase focus:outline-none focus:border-maroon"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-umber dark:bg-cream text-cream dark:text-umber text-xs font-semibold rounded-lg hover:bg-brass transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>Coupon &apos;{appliedCoupon}&apos; applied (5% Privilege Savings)</span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-rose-600 text-[11px] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark space-y-2 text-xs">
                <div className="flex justify-between text-umber/80 dark:text-cream/80">
                  <span>Jewellery Subtotal</span>
                  <span className="tabular-nums font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-umber/60 dark:text-cream/60 text-[11px]">
                  <span>Estimated Making Charges</span>
                  <span className="tabular-nums">₹{makingChargesTotal.toLocaleString('en-IN')}</span>
                </div>
                {hasGiftWrap && (
                  <div className="flex justify-between text-umber/80 dark:text-cream/80">
                    <span>Luxury Velvet Packaging & Seal</span>
                    <span className="tabular-nums font-semibold">₹{giftWrapFee}</span>
                  </div>
                )}
                {hasInsurance && (
                  <div className="flex justify-between text-umber/80 dark:text-cream/80">
                    <span>Armored Transit Insurance</span>
                    <span className="tabular-nums font-semibold">₹{insuranceFee}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>Royal Privilege Discount</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Armored Courier Delivery</span>
                  <span>FREE</span>
                </div>
                <div className="pt-2 border-t border-hairline dark:border-hairline-dark flex justify-between text-sm font-bold text-maroon dark:text-cream">
                  <span>Grand Total</span>
                  <span className="tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Proceed Action */}
        {items.length > 0 && (
          <div className="p-4 bg-cream/95 dark:bg-umber-velvet/95 border-t border-hairline dark:border-hairline-dark flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-umber/60 dark:text-cream/60 uppercase block">Total Payable</span>
              <span className="font-sans font-bold text-lg text-maroon dark:text-cream tabular-nums">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="py-3 px-5 rounded-xl bg-maroon text-cream font-semibold text-xs hover:bg-maroon-dark transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
