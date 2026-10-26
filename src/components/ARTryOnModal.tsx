import React, { useState } from 'react';
import { X, Sparkles, Sliders, Camera, RotateCcw, Check, Eye } from 'lucide-react';
import { Product } from '../types/jewellery';

interface ARTryOnModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

export const ARTryOnModal: React.FC<ARTryOnModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [lighting, setLighting] = useState<'Warm Daylight' | 'Evening Salon' | 'Bridal Spotlight'>('Warm Daylight');
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-md h-full sm:h-[780px] bg-umber-dark rounded-none sm:rounded-3xl overflow-hidden flex flex-col border border-hairline-dark shadow-2xl">
        
        {/* Top Camera Controls */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-umber-dark/90 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-cream tracking-wide uppercase">
              Virtual Mirror · {product.tryOnType}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-umber/80 backdrop-blur-md text-cream flex items-center justify-center hover:bg-umber transition-colors"
            aria-label="Close AR Mirror"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Simulator Viewport */}
        <div className="relative flex-1 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center overflow-hidden">
          
          {/* Simulated Model Canvas / Ambient Lighting Background */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            lighting === 'Warm Daylight' ? 'opacity-85' : lighting === 'Evening Salon' ? 'opacity-70 saturate-125' : 'opacity-95 contrast-110'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
              alt="Live Portrait Simulator"
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>

          {/* AR Alignment Guide Grid */}
          <div className="absolute inset-0 pointer-events-none border border-brass/20 m-8 rounded-2xl flex flex-col items-center justify-between p-4">
            <span className="text-[10px] text-brass/80 tracking-widest uppercase">
              {product.tryOnType === 'necklace' ? 'Align Collarbone Landmark' : 'Align Ear / Jawline Landmark'}
            </span>
            <div className="w-16 h-16 rounded-full border border-dashed border-brass/40" />
            <span className="text-[9px] text-cream/60">Real-time AR depth calibration active</span>
          </div>

          {/* Overlay Jewel with Live Scale & Rotation */}
          <div
            className="relative z-20 pointer-events-none transition-transform duration-75"
            style={{
              transform: `scale(${scale / 100}) rotate(${rotation}deg)`,
              filter: lighting === 'Warm Daylight' ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' : 'drop-shadow(0 15px 25px rgba(166,124,61,0.3))'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-52 h-52 object-contain"
            />
          </div>

          {/* Snapshot feedback flash */}
          {snapshotTaken && (
            <div className="absolute inset-0 bg-white/40 z-30 pointer-events-none animate-ping" />
          )}
        </div>

        {/* AR Adjustment Controls (Bottom Sheet) */}
        <div className="bg-umber-velvet border-t border-hairline-dark p-5 space-y-4 z-30 text-cream">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm font-semibold truncate text-cream">
                {product.name}
              </span>
              <span className="text-xs font-bold text-brass-light tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-cream/70 mt-0.5">
              {product.purity} · {product.grossWeight}g
            </p>
          </div>

          {/* Sliders for Scale & Fine Tuning */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-cream/75">
                <span>Scale Size</span>
                <span className="tabular-nums">{scale}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="140"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-cream/75">
                <span>Angle Adjust</span>
                <span className="tabular-nums">{rotation}°</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
            </div>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-cream/75">Lighting:</span>
            <div className="flex gap-1.5">
              {(['Warm Daylight', 'Evening Salon', 'Bridal Spotlight'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLighting(mode)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-colors ${
                    lighting === mode
                      ? 'bg-brass text-umber-dark border-brass font-bold'
                      : 'border-hairline-dark text-cream/70 hover:border-cream/40'
                  }`}
                >
                  {mode.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setSnapshotTaken(true);
                setTimeout(() => setSnapshotTaken(false), 800);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl border border-brass text-brass-light hover:bg-brass/10 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Camera className="w-4 h-4" />
              <span>Snapshot Look</span>
            </button>

            <button
              onClick={() => {
                onAddToCart();
                onClose();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-maroon-dark text-cream hover:bg-maroon text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
