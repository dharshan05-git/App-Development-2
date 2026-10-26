import React, { useState } from 'react';
import { X, Heart, Star, Sparkles, Shield, Scale, Award, Info, ChevronDown, Check, Video, PhoneCall, Truck } from 'lucide-react';
import { Product } from '../types/jewellery';

interface ProductDetailModalProps {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
  onOpenAR: () => void;
  onBookConsultation: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isWishlisted,
  onWishlistToggle,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenAR,
  onBookConsultation,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'breakdown' | 'shipping' | null>('specs');

  const monthlyEMI = Math.round(product.price / 6);

  const glossaryDetails: Record<string, { title: string; explanation: string }> = {
    'purity': {
      title: 'BIS 916 Hallmark (22 Karat Gold)',
      explanation: 'Indicates 91.6% pure gold alloyed with 8.4% precious metals for structural durability and jewel setting strength. Stamped with official BIS triangle, purity mark, and unique alphanumeric HUID (Hallmark Unique Identification Number).'
    },
    'weight': {
      title: 'Gross Weight vs Net Gold Weight',
      explanation: `Gross weight (${product.grossWeight}g) represents the total weight including gemstones. Net gold weight (${product.netGoldWeight}g) represents pure metal content upon which gold rate is calculated. You never pay gold price for gemstone weight.`
    },
    'certification': {
      title: `${product.certAgency} Authenticity Certification`,
      explanation: `This piece is verified by ${product.certAgency} (Gemological Laboratory). Every natural diamond and precious stone is individually tested for color, clarity, and zero synthetic substitution under laboratory spectrographic analysis.`
    },
    'making': {
      title: 'Artisanal Making Charges (V.A.)',
      explanation: 'Reflects the master craftsman bench hours required for hand-chiseled Kundan settings, delicate filigree jali, and stone bezel securing. Stored transparently as a distinct line item on your invoice.'
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-lg h-[94vh] sm:h-[88vh] bg-cream dark:bg-umber-dark rounded-t-3xl sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Floating App Bar */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-cream/90 via-cream/50 to-transparent dark:from-umber-dark/90 dark:via-umber-dark/50 pointer-events-auto">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-sand/80 dark:bg-umber-velvet/80 backdrop-blur-md border border-hairline dark:border-hairline-dark flex items-center justify-center text-umber dark:text-cream hover:scale-105 active:scale-95 transition-transform"
            aria-label="Back to listing"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onWishlistToggle}
              className="w-10 h-10 rounded-full bg-sand/80 dark:bg-umber-velvet/80 backdrop-blur-md border border-hairline dark:border-hairline-dark flex items-center justify-center text-umber dark:text-cream hover:scale-105 active:scale-95 transition-transform"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-maroon text-maroon dark:fill-maroon-dark dark:text-maroon-dark' : 'text-umber dark:text-cream'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scrollable PDP Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          
          {/* Hero Gallery with AR Trigger Pill */}
          <div className="relative aspect-[4/3] w-full bg-sand dark:bg-sand-dark overflow-hidden">
            <img
              src={product.images[activeImageIndex] || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* AR Virtual Mirror CTA (Overlaid bottom-left, Section 13) */}
            {product.tryOnSupported && (
              <button
                onClick={onOpenAR}
                className="absolute bottom-4 left-4 px-3.5 py-2 rounded-full bg-umber/90 dark:bg-cream/90 backdrop-blur-md text-cream dark:text-umber text-xs font-semibold flex items-center gap-1.5 border border-brass/50 shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-brass" />
                <span>Try On Live (AR)</span>
              </button>
            )}

            {/* Image Dots Indicator */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-1.5 bg-umber/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeImageIndex === idx ? 'bg-cream w-4' : 'bg-cream/50'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="p-5 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-brass uppercase">
                  {product.category} Collection · {product.purity}
                </span>
                {product.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-sand dark:bg-sand-dark text-[9px] font-bold tracking-wider text-maroon dark:text-brass-light border border-hairline dark:border-hairline-dark">
                    {product.badge}
                  </span>
                )}
              </div>

              <h2 className="font-serif text-2xl font-bold text-umber dark:text-cream mt-1 leading-snug">
                {product.name}
              </h2>

              {/* Rating & In-Stock */}
              <div className="flex items-center justify-between mt-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-brass">
                    <Star className="w-4 h-4 fill-brass" />
                  </div>
                  <span className="text-sm font-semibold text-umber dark:text-cream tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-xs text-umber/60 dark:text-cream/60">
                    ({product.reviewsCount} Verified Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock · Ships in {product.shipsInDays} days</span>
                </div>
              </div>
            </div>

            {/* Price Row & EMI */}
            <div className="p-4 rounded-xl bg-sand dark:bg-umber-velvet border border-hairline dark:border-hairline-dark space-y-1">
              <div className="flex items-baseline gap-2.5">
                <span className="font-sans font-bold text-2xl text-maroon dark:text-cream tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="text-sm text-brass line-through tabular-nums">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold ml-auto">
                  Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-umber/80 dark:text-cream/80">
                Inclusive of all taxes · Making charges ₹{product.makingCharges.toLocaleString('en-IN')} included
              </p>
              <div className="pt-2 mt-2 border-t border-hairline dark:border-hairline-dark flex items-center justify-between text-xs">
                <span className="text-umber/70 dark:text-cream/70">Flexible Payment:</span>
                <span className="font-semibold text-brass-light dark:text-brass">
                  EMI from ₹{monthlyEMI.toLocaleString('en-IN')}/mo with 0% interest
                </span>
              </div>
            </div>

            {/* Spec Chips Row (Clickable for Glossary Tooltip, Section 13) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-umber/70 dark:text-cream/70 uppercase tracking-wider">
                  Authenticity Specifications (Tap to learn)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveGlossaryTerm('purity')}
                  className="p-2.5 rounded-xl bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
                >
                  <div className="flex items-center justify-between text-brass mb-1">
                    <Shield className="w-4 h-4" />
                    <Info className="w-3 h-3 opacity-60" />
                  </div>
                  <span className="text-[10px] text-umber/60 dark:text-cream/60 block">Purity</span>
                  <span className="text-xs font-bold text-umber dark:text-cream block truncate">
                    {product.metal}
                  </span>
                </button>

                <button
                  onClick={() => setActiveGlossaryTerm('weight')}
                  className="p-2.5 rounded-xl bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
                >
                  <div className="flex items-center justify-between text-brass mb-1">
                    <Scale className="w-4 h-4" />
                    <Info className="w-3 h-3 opacity-60" />
                  </div>
                  <span className="text-[10px] text-umber/60 dark:text-cream/60 block">Weight</span>
                  <span className="text-xs font-bold text-umber dark:text-cream block tabular-nums">
                    {product.grossWeight}g Gross
                  </span>
                </button>

                <button
                  onClick={() => setActiveGlossaryTerm('certification')}
                  className="p-2.5 rounded-xl bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
                >
                  <div className="flex items-center justify-between text-brass mb-1">
                    <Award className="w-4 h-4" />
                    <Info className="w-3 h-3 opacity-60" />
                  </div>
                  <span className="text-[10px] text-umber/60 dark:text-cream/60 block">Cert</span>
                  <span className="text-xs font-bold text-umber dark:text-cream block truncate">
                    {product.certAgency} Lab
                  </span>
                </button>

                <button
                  onClick={() => setActiveGlossaryTerm('making')}
                  className="p-2.5 rounded-xl bg-sand/60 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark text-left hover:border-brass transition-colors"
                >
                  <div className="flex items-center justify-between text-brass mb-1">
                    <Award className="w-4 h-4" />
                    <Info className="w-3 h-3 opacity-60" />
                  </div>
                  <span className="text-[10px] text-umber/60 dark:text-cream/60 block">Craft</span>
                  <span className="text-xs font-bold text-umber dark:text-cream block truncate">
                    BIS Hallmark
                  </span>
                </button>
              </div>
            </div>

            {/* Glossary Explainer Sheet if active */}
            {activeGlossaryTerm && glossaryDetails[activeGlossaryTerm] && (
              <div className="p-4 rounded-xl bg-cream dark:bg-umber-velvet border-2 border-brass/50 text-xs space-y-2 animate-fade-in shadow-md">
                <div className="flex items-center justify-between text-brass">
                  <span className="font-bold uppercase tracking-wider text-[11px]">
                    Jeweller Guide: {glossaryDetails[activeGlossaryTerm].title}
                  </span>
                  <button
                    onClick={() => setActiveGlossaryTerm(null)}
                    className="text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-umber/90 dark:text-cream/90 leading-relaxed">
                  {glossaryDetails[activeGlossaryTerm].explanation}
                </p>
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="font-serif text-sm font-bold text-umber dark:text-cream">Curator Note</h4>
              <p className="text-xs text-umber/80 dark:text-cream/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* High-Value Virtual Consultation Trigger */}
            <div className="p-4 rounded-xl bg-sand/80 dark:bg-sand-dark/80 border border-hairline dark:border-hairline-dark flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-brass">Private Trousseau Service</span>
                <h5 className="font-serif text-xs font-bold text-umber dark:text-cream">Book Virtual Video Consultation</h5>
                <p className="text-[11px] text-umber/70 dark:text-cream/70">Inspect gems live with a senior gemologist on WebRTC video.</p>
              </div>
              <button
                onClick={onBookConsultation}
                className="px-3.5 py-2 rounded-lg bg-umber dark:bg-cream text-cream dark:text-umber text-xs font-semibold whitespace-nowrap hover:bg-brass transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5 text-brass" />
                <span>Book Call</span>
              </button>
            </div>

            {/* Expandable Accordions */}
            <div className="space-y-2 pt-2 border-t border-hairline dark:border-hairline-dark">
              {/* Specification Accordion */}
              <div className="border border-hairline dark:border-hairline-dark rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-umber dark:text-cream bg-sand/40 dark:bg-sand-dark/40"
                >
                  <span>Detailed Specifications & Dimensions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'specs' && (
                  <div className="p-4 text-xs space-y-2 border-t border-hairline dark:border-hairline-dark bg-cream dark:bg-umber-dark">
                    <div className="grid grid-cols-2 gap-2 text-umber/80 dark:text-cream/80">
                      <div><span className="opacity-60">Hallmark ID:</span> {product.hallmarkNumber}</div>
                      <div><span className="opacity-60">Certificate ID:</span> {product.certNumber}</div>
                      <div><span className="opacity-60">Net Gold:</span> {product.netGoldWeight}g (22K)</div>
                      <div><span className="opacity-60">Gross Weight:</span> {product.grossWeight}g</div>
                      {product.diamondWeight && <div><span className="opacity-60">Diamond Carat:</span> {product.diamondWeight} ct</div>}
                      {product.gemstones && <div className="col-span-2"><span className="opacity-60">Gems:</span> {product.gemstones}</div>}
                      {product.dimensions && <div className="col-span-2"><span className="opacity-60">Dimensions:</span> {product.dimensions}</div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery Guarantee Accordion */}
              <div className="border border-hairline dark:border-hairline-dark rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-umber dark:text-cream bg-sand/40 dark:bg-sand-dark/40"
                >
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-brass" />
                    <span>Insured Armored Delivery & 15-Day Return</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 text-xs space-y-2 border-t border-hairline dark:border-hairline-dark bg-cream dark:bg-umber-dark text-umber/80 dark:text-cream/80">
                    <p>Every shipment is packed in tamper-proof security seals and transported via private armored logistics with 100% transit insurance.</p>
                    <p>Enjoy our 15-day no-questions-asked refund policy and lifetime 100% gold purity exchange guarantee across all stores.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* STICKY ACTION BAR (PDP) — Fixed Bottom (Section 10 & 13) */}
        <div className="p-4 bg-cream/95 dark:bg-umber-velvet/95 backdrop-blur-md border-t border-hairline dark:border-hairline-dark flex items-center gap-3 z-30 shadow-lg">
          <div className="hidden sm:block">
            <span className="text-[10px] text-umber/60 dark:text-cream/60 uppercase block">Total Price</span>
            <span className="font-sans font-bold text-base text-maroon dark:text-cream tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => {
              onAddToCart(product, 1);
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-maroon dark:border-hairline-dark text-umber dark:text-cream hover:bg-sand dark:hover:bg-umber-dark font-semibold text-xs transition-colors text-center"
          >
            Add to Bag
          </button>

          {/* Solid Maroon Primary Buy CTA — reserved for highest intent (Section 13) */}
          <button
            onClick={() => {
              onBuyNow(product);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-maroon dark:bg-maroon-dark text-cream font-semibold text-xs hover:bg-maroon/90 transition-colors shadow-lg text-center"
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
};
