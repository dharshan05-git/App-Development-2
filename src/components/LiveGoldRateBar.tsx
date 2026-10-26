import React, { useState } from 'react';
import { TrendingUp, X, Bell, Lock, ChevronRight, Check } from 'lucide-react';
import { GOLD_RATE_HISTORY_30D } from '../data/mockData';

interface LiveGoldRateBarProps {
  currentRate: number;
}

export const LiveGoldRateBar: React.FC<LiveGoldRateBarProps> = ({ currentRate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7D' | '30D' | '1Y'>('30D');
  const [lockGrams, setLockGrams] = useState<number>(20);
  const [lockedSuccess, setLockedSuccess] = useState(false);
  const [alertSet, setAlertSet] = useState(false);

  // Derived rates
  const rate22K = Math.round(currentRate * (22 / 24));
  const rate18K = Math.round(currentRate * (18 / 24));
  const silverRate = 96.5;

  // Gold Lock Calculations
  const totalValue = lockGrams * currentRate;
  const deposit10Percent = Math.round(totalValue * 0.1);

  // SVG Chart points calculation for 30D
  const chartHeight = 120;
  const chartWidth = 320;
  const minRate = 7300;
  const maxRate = 7520;

  const points = GOLD_RATE_HISTORY_30D.map((item, index) => {
    const x = (index / (GOLD_RATE_HISTORY_30D.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - ((item.rate - minRate) / (maxRate - minRate)) * (chartHeight - 40) - 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <>
      {/* Persistent Glanceable Strip (Section 13) */}
      <div
        onClick={() => setIsOpen(true)}
        className="h-10 bg-sand dark:bg-sand-dark border-b border-hairline dark:border-hairline-dark px-4 flex items-center justify-between text-xs cursor-pointer select-none hover:bg-hairline/50 dark:hover:bg-umber-velvet transition-colors duration-150"
        role="button"
        tabIndex={0}
        aria-label="View live gold rate trends and rate lock"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 shrink-0" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-semibold text-umber dark:text-cream">24K Gold:</span>
            <span className="font-bold text-maroon dark:text-maroon-dark tabular-nums">
              ₹{currentRate.toLocaleString('en-IN')}/g
            </span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              +0.4%
            </span>
            <span className="hidden sm:inline text-umber/40 dark:text-cream/40">·</span>
            <span className="hidden sm:inline text-umber/80 dark:text-cream/80">
              22K: ₹{rate22K.toLocaleString('en-IN')}/g
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-brass dark:text-brass-light font-medium text-[11px] shrink-0">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Rate Lock</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Interactive Sheet / Modal (Section 15.2) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-umber/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg bg-cream dark:bg-umber-velvet rounded-t-3xl sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-umber/20 dark:bg-cream/20 rounded-full mx-auto mt-3 mb-2 sm:hidden" />

            {/* Header */}
            <div className="p-5 border-b border-hairline dark:border-hairline-dark flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brass">
                  Live Metal Ticker
                </span>
                <h3 className="font-serif text-xl font-bold text-umber dark:text-cream mt-0.5">
                  Precious Metals & Rate Lock
                </h3>
                <p className="text-xs text-umber/70 dark:text-cream/70 mt-0.5">
                  Official Indian Bullion & Jewellers Association (IBJA) benchmark
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream hover:bg-sand dark:hover:bg-sand-dark"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rates Grid */}
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark">
                  <span className="text-[11px] font-medium text-umber/60 dark:text-cream/60">24K 999 Gold</span>
                  <p className="text-base font-bold text-maroon dark:text-maroon-dark tabular-nums mt-0.5">
                    ₹{currentRate.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">▲ +₹35 today</span>
                </div>

                <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark">
                  <span className="text-[11px] font-medium text-umber/60 dark:text-cream/60">22K 916 Hallmark</span>
                  <p className="text-base font-bold text-umber dark:text-cream tabular-nums mt-0.5">
                    ₹{rate22K.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">▲ +₹32 today</span>
                </div>

                <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark">
                  <span className="text-[11px] font-medium text-umber/60 dark:text-cream/60">18K 750 Diamond</span>
                  <p className="text-base font-bold text-umber dark:text-cream tabular-nums mt-0.5">
                    ₹{rate18K.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">▲ +₹26 today</span>
                </div>

                <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark">
                  <span className="text-[11px] font-medium text-umber/60 dark:text-cream/60">925 Fine Silver</span>
                  <p className="text-base font-bold text-umber dark:text-cream tabular-nums mt-0.5">
                    ₹{silverRate.toFixed(1)}
                  </p>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">▲ +₹0.8 today</span>
                </div>
              </div>

              {/* Historical Trend Chart */}
              <div className="p-4 rounded-xl bg-sand/70 dark:bg-sand-dark/60 border border-hairline dark:border-hairline-dark space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-umber dark:text-cream">24K Historical Trend</span>
                  <div className="flex gap-1 p-0.5 bg-cream dark:bg-umber-dark rounded-lg border border-hairline dark:border-hairline-dark">
                    {(['7D', '30D', '1Y'] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setSelectedTimeframe(tf)}
                        className={`px-2.5 py-0.5 text-[10px] font-medium rounded ${
                          selectedTimeframe === tf
                            ? 'bg-maroon text-cream'
                            : 'text-umber/70 dark:text-cream/70 hover:text-umber'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vector SVG Chart */}
                <div className="w-full overflow-hidden">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-28 stroke-maroon dark:stroke-brass-light fill-none">
                    {/* Horizontal grid lines */}
                    <line x1="10" y1="20" x2={chartWidth - 10} y2="20" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                    <line x1="10" y1="60" x2={chartWidth - 10} y2="60" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                    <line x1="10" y1="100" x2={chartWidth - 10} y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                    
                    {/* Trend Line */}
                    <polyline
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />

                    {/* End point marker */}
                    <circle cx={chartWidth - 20} cy={20} r="4" fill="#6E1423" stroke="#FBF3E7" strokeWidth="2" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-umber/60 dark:text-cream/60 px-2 mt-1">
                    <span>1 Month Ago: ₹7,320/g</span>
                    <span>Peak: ₹7,495/g</span>
                    <span className="font-medium text-maroon dark:text-maroon-dark">Today: ₹{currentRate}/g</span>
                  </div>
                </div>
              </div>

              {/* Gold Rate Lock Feature (Section 15.2) */}
              <div className="p-4 rounded-xl bg-sand dark:bg-sand-dark border border-brass/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brass" />
                  <h4 className="font-serif text-sm font-bold text-umber dark:text-cream">
                    30-Day Gold Rate Lock Facility
                  </h4>
                </div>
                <p className="text-xs text-umber/80 dark:text-cream/80 leading-relaxed">
                  Protect against upcoming price surges for your wedding or festival purchase. Pay a 10% refundable advance to fix today&apos;s gold rate for 30 days. If the rate drops, you pay the lower rate!
                </p>

                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-umber/70 dark:text-cream/70">Quantity to Lock:</span>
                    <span className="font-bold text-umber dark:text-cream tabular-nums">{lockGrams} Grams (~₹{(lockGrams * currentRate).toLocaleString('en-IN')})</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={lockGrams}
                    onChange={(e) => setLockGrams(Number(e.target.value))}
                    className="w-full accent-maroon cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-umber/50 dark:text-cream/50">
                    <span>10g</span>
                    <span>50g</span>
                    <span>100g</span>
                  </div>
                </div>

                <div className="p-3 bg-cream dark:bg-umber-dark rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="text-umber/70 dark:text-cream/70 text-[11px]">10% Advance Deposit:</span>
                    <p className="text-sm font-bold text-maroon dark:text-brass-light tabular-nums">
                      ₹{deposit10Percent.toLocaleString('en-IN')}
                    </p>
                  </div>
                  {lockedSuccess ? (
                    <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium text-xs">
                      <Check className="w-4 h-4" />
                      <span>Rate Locked for 30D</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setLockedSuccess(true)}
                      className="px-4 py-2 bg-maroon text-cream text-xs font-semibold rounded-lg hover:bg-maroon-dark transition-colors shadow-sm"
                    >
                      Lock Rate Now
                    </button>
                  )}
                </div>
              </div>

              {/* Price Alert Action */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setAlertSet(!alertSet)}
                  className={`text-xs font-medium flex items-center gap-1.5 py-1 px-3 rounded-lg border transition-colors ${
                    alertSet
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                      : 'border-hairline dark:border-hairline-dark text-umber dark:text-cream hover:border-brass'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{alertSet ? 'Alert Active: Notify if gold drops below ₹7,400' : 'Set Price Drop Alert'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-umber dark:text-cream hover:underline"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
