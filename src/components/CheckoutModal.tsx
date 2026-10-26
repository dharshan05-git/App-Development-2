import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Calendar, CreditCard, Sparkles, ChevronRight, Truck } from 'lucide-react';
import { CartItem } from '../types/jewellery';

interface CheckoutModalProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onSuccessOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  isOpen,
  onClose,
  onSuccessOrder,
}) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [deliverySlot, setDeliverySlot] = useState<'48h' | 'weekend' | 'store'>('48h');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'emi' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aanya@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('DS-2026-8819');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const insuranceFee = items.some(i => i.insurance) ? 499 : 0;
  const giftWrapFee = items.some(i => i.giftWrap) ? 499 : 0;
  const grandTotal = subtotal + insuranceFee + giftWrapFee;

  const addresses = [
    {
      name: 'Aanya Sharma',
      tag: 'Home · Bengaluru',
      address: 'Villa 14, Palm Meadows, Whitefield, Bengaluru, Karnataka 560066',
      phone: '+91 98450 12890'
    },
    {
      name: 'Aanya Sharma (Office)',
      tag: 'Office · Bengaluru',
      address: 'Prestige Tech Park, Marathahalli Outer Ring Road, Bengaluru 560103',
      phone: '+91 98450 12890'
    }
  ];

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onSuccessOrder();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] bg-cream dark:bg-umber-velvet rounded-none sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl flex flex-col overflow-hidden">
        
        {/* If Order Success Takeover (Section 13 & 14) */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5 my-auto">
            {/* Celebratory Stylized Jewel Ring SVG Animation */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brass/50 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="w-16 h-16 rounded-full bg-brass/15 flex items-center justify-center text-brass">
                <Sparkles className="w-8 h-8 text-brass" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-brass uppercase block">
                Order Confirmed & Insured
              </span>
              <h3 className="font-serif text-2xl font-bold text-umber dark:text-cream mt-1">
                Thank you, Aanya.
              </h3>
              <p className="text-xs text-umber/70 dark:text-cream/70 mt-1 max-w-xs mx-auto">
                Your heirloom masterpiece is being prepared in our climate-controlled vault with BIS hallmarking inspection.
              </p>
            </div>

            {/* Order Card */}
            <div className="w-full p-4 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-umber/60 dark:text-cream/60">Order Reference:</span>
                <span className="font-mono font-bold text-umber dark:text-cream">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-umber/60 dark:text-cream/60">Amount Paid:</span>
                <span className="font-bold text-maroon dark:text-cream">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-umber/60 dark:text-cream/60">Estimated Armored Delivery:</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Wednesday, 28 Oct (Secured OTP)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-umber/60 dark:text-cream/60">Digital Purity Passport:</span>
                <span className="font-semibold text-brass">Added to Digital Vault</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-maroon text-cream font-semibold text-xs hover:bg-maroon-dark transition-colors shadow-lg"
              >
                Track Armored Delivery
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-hairline dark:border-hairline-dark text-xs font-medium text-umber dark:text-cream hover:bg-sand dark:hover:bg-sand-dark"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-hairline dark:border-hairline-dark flex items-center justify-between bg-sand/60 dark:bg-sand-dark/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brass" />
                <h3 className="font-serif text-base font-bold text-umber dark:text-cream">
                  Secured Single-Page Checkout
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1 text-xs">
              
              {/* Step 1: Delivery Address */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brass" />
                    <span>Insured Delivery Address</span>
                  </span>
                  <button
                    onClick={() => setSelectedAddressIndex(selectedAddressIndex === 0 ? 1 : 0)}
                    className="text-brass font-medium text-[11px] hover:underline"
                  >
                    Switch Address
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-brass/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-umber dark:text-cream">{addresses[selectedAddressIndex].name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brass/15 text-brass font-semibold">
                      {addresses[selectedAddressIndex].tag}
                    </span>
                  </div>
                  <p className="text-umber/80 dark:text-cream/80 text-[11px] leading-relaxed">
                    {addresses[selectedAddressIndex].address}
                  </p>
                  <p className="text-umber/60 dark:text-cream/60 text-[10px]">
                    Phone: {addresses[selectedAddressIndex].phone}
                  </p>
                </div>
              </div>

              {/* Step 2: Delivery Slot */}
              <div className="space-y-2">
                <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[11px] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-brass" />
                  <span>Secured Transit Method</span>
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliverySlot('48h')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliverySlot === '48h'
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-semibold'
                        : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70'
                    }`}
                  >
                    <span className="block text-umber dark:text-cream">Express Armored</span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">Ships in 48 Hours · Free</span>
                  </button>

                  <button
                    onClick={() => setDeliverySlot('store')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliverySlot === 'store'
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-semibold'
                        : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70'
                    }`}
                  >
                    <span className="block text-umber dark:text-cream">Boutique VIP Pickup</span>
                    <span className="text-[10px] text-brass block mt-0.5">Indiranagar Flagship Lounge</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Payment Method Tabs */}
              <div className="space-y-2">
                <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[11px] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-brass" />
                  <span>Select Payment Mode</span>
                </span>

                <div className="flex p-1 bg-sand dark:bg-sand-dark rounded-xl border border-hairline dark:border-hairline-dark">
                  {(['upi', 'card', 'emi', 'netbanking'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg uppercase transition-all ${
                        paymentMethod === method
                          ? 'bg-cream dark:bg-umber-dark text-maroon dark:text-brass-light shadow-sm'
                          : 'text-umber/60 dark:text-cream/60 hover:text-umber'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* Payment Detail Form */}
                <div className="p-3.5 rounded-xl bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark space-y-2">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-umber/70 dark:text-cream/70">
                        Instant UPI Payment (Google Pay / PhonePe / Cred)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-cream dark:bg-umber-dark border border-hairline dark:border-hairline-dark text-xs font-mono"
                        placeholder="yourname@upi"
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number (4000 1234 5678 9010)"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full px-3 py-2 rounded-lg bg-cream dark:bg-umber-dark border border-hairline text-xs font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="08/29"
                          className="px-3 py-2 rounded-lg bg-cream dark:bg-umber-dark border border-hairline text-xs"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          defaultValue="•••"
                          className="px-3 py-2 rounded-lg bg-cream dark:bg-umber-dark border border-hairline text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'emi' && (
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-brass block">No Cost EMI Available</span>
                      <p className="text-umber/80 dark:text-cream/80 text-[11px]">
                        Pay ₹{Math.round(grandTotal / 6).toLocaleString('en-IN')}/month across 6 months on HDFC, ICICI, and Axis Bank cards.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-1 text-xs">
                      <select className="w-full px-3 py-2 rounded-lg bg-cream dark:bg-umber-dark border border-hairline text-xs">
                        <option>HDFC Bank NetBanking</option>
                        <option>ICICI Bank Corporate & Retail</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank Priority</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-3.5 rounded-xl bg-sand/40 dark:bg-sand-dark/40 border border-hairline dark:border-hairline-dark space-y-1">
                <div className="flex justify-between text-umber/80 dark:text-cream/80">
                  <span>Total Items ({items.length})</span>
                  <span className="tabular-nums font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {insuranceFee > 0 && (
                  <div className="flex justify-between text-umber/70 dark:text-cream/70">
                    <span>Armored Transit Insurance</span>
                    <span>₹{insuranceFee}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-maroon dark:text-cream pt-1 border-t border-hairline dark:border-hairline-dark">
                  <span>Grand Total</span>
                  <span className="tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 bg-cream/95 dark:bg-umber-velvet/95 border-t border-hairline dark:border-hairline-dark flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-umber/60 dark:text-cream/60 uppercase block">Amount Due</span>
                <span className="font-sans font-bold text-lg text-maroon dark:text-cream tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="py-3 px-6 rounded-xl bg-maroon text-cream font-semibold text-xs hover:bg-maroon-dark transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Transaction...</span>
                ) : (
                  <>
                    <span>Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
