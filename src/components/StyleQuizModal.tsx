import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewellery';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  products,
}) => {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('Bridal Wedding');
  const [metal, setMetal] = useState('22K Gold & Polki');
  const [budget, setBudget] = useState('₹2,00,000 – ₹5,00,000');

  if (!isOpen) return null;

  const handleComplete = () => {
    // Recommend best match based on quiz
    let match = products[0];
    if (occasion.includes('Everyday') || metal.includes('Rose Gold')) {
      match = products.find(p => p.id === 'prod-ring-01') || products[0];
    } else if (occasion.includes('Heritage')) {
      match = products.find(p => p.id === 'prod-temple-01') || products[0];
    } else if (metal.includes('Emerald')) {
      match = products.find(p => p.id === 'prod-earring-01') || products[0];
    }
    onSelectProduct(match);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-cream dark:bg-umber-velvet rounded-none sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-hairline dark:border-hairline-dark flex items-center justify-between bg-sand/60 dark:bg-sand-dark/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brass" />
            <span className="font-serif text-sm font-bold text-umber dark:text-cream">
              Personalized Style Quiz
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6 space-y-5 text-xs">
          
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-brass uppercase block">Step 1 of 3</span>
                <h4 className="font-serif text-lg font-bold text-umber dark:text-cream mt-0.5">
                  What celebration or milestone inspires you today?
                </h4>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'Bridal Wedding', label: 'Bridal Wedding Trousseau', sub: 'Imperial chokers, necklaces, and matching earrings' },
                  { id: 'Anniversary Gift', label: 'Considered Milestone Gift', sub: 'Solitaire rings, diamond bracelets, anniversary bands' },
                  { id: 'Everyday Adornment', label: 'Everyday Daily Wear', sub: 'Lightweight gold chains, delicate studs, bangles' },
                  { id: 'Heritage Investment', label: 'Family Heritage & Temple Gold', sub: '22K antique gold, Kasu malas, deity medallions' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setOccasion(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                      occasion === opt.id
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-semibold shadow-sm'
                        : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70 hover:border-brass/50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-umber dark:text-cream">
                      <span>{opt.label}</span>
                      {occasion === opt.id && <Check className="w-4 h-4 text-maroon dark:text-brass-light" />}
                    </div>
                    <span className="text-[10px] text-umber/60 dark:text-cream/60 block mt-0.5">
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-maroon text-cream font-semibold rounded-xl hover:bg-maroon-dark transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-brass uppercase block">Step 2 of 3</span>
                <h4 className="font-serif text-lg font-bold text-umber dark:text-cream mt-0.5">
                  Which metal and gemstone setting speaks to your heart?
                </h4>
              </div>

              <div className="space-y-2">
                {[
                  { id: '22K Gold & Polki', label: '22K Yellow Gold & Uncut Polki Diamonds' },
                  { id: '18K Rose Gold', label: '18K Rose Gold & Certified Solitaires' },
                  { id: 'Antique Temple Gold', label: 'Antique Matte Temple Gold with Rubies' },
                  { id: 'Emerald & Pearls', label: 'Zambian Emerald Drops & Seed Pearls' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMetal(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                      metal === opt.id
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-semibold shadow-sm'
                        : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70 hover:border-brass/50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-umber dark:text-cream">
                      <span>{opt.label}</span>
                      {metal === opt.id && <Check className="w-4 h-4 text-maroon dark:text-brass-light" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-4 border border-hairline dark:border-hairline-dark rounded-xl text-umber dark:text-cream font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-maroon text-cream font-semibold rounded-xl hover:bg-maroon-dark transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-brass uppercase block">Step 3 of 3</span>
                <h4 className="font-serif text-lg font-bold text-umber dark:text-cream mt-0.5">
                  What is your anticipated investment range?
                </h4>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'Under ₹1,50,000', label: 'Under ₹1,50,000' },
                  { id: '₹1,50,000 – ₹3,50,000', label: '₹1,50,000 – ₹3,50,000' },
                  { id: '₹3,50,000 – ₹6,00,000', label: '₹3,50,000 – ₹6,00,000' },
                  { id: 'Imperial Above ₹6,00,000', label: 'Imperial Collection (₹6,00,000+)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBudget(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                      budget === opt.id
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-semibold shadow-sm'
                        : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70 hover:border-brass/50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-umber dark:text-cream">
                      <span>{opt.label}</span>
                      {budget === opt.id && <Check className="w-4 h-4 text-maroon dark:text-brass-light" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="py-3 px-4 border border-hairline dark:border-hairline-dark rounded-xl text-umber dark:text-cream font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 bg-maroon text-cream font-semibold rounded-xl hover:bg-maroon-dark transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal Curated Match</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
