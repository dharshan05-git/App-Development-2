import React, { useState } from 'react';
import { X, ShieldCheck, Download, ExternalLink, RefreshCw, Award, ArrowUpRight } from 'lucide-react';
import { USER_CERTIFICATES } from '../data/mockData';

interface DigitalVaultModalProps {
  currentGoldRate: number;
  onClose: () => void;
}

export const DigitalVaultModal: React.FC<DigitalVaultModalProps> = ({
  currentGoldRate,
  onClose,
}) => {
  const [selectedCert, setSelectedCert] = useState(USER_CERTIFICATES[0]);
  const [valuationUpdated, setValuationUpdated] = useState(false);

  // Calculate live resale valuation based on current live gold rate
  const liveMeltValue = Math.round(selectedCert.certifiedWeight * (currentGoldRate * 0.916));
  const estimatedMarketValue = Math.max(selectedCert.originalValue, liveMeltValue + 45000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-cream dark:bg-umber-velvet rounded-none sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-hairline dark:border-hairline-dark flex items-center justify-between bg-sand/60 dark:bg-sand-dark/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-brass/15 flex items-center justify-center text-brass">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brass uppercase">
                BIS & GIA Blockchain Secured
              </span>
              <h3 className="font-serif text-lg font-bold text-umber dark:text-cream">
                Digital Authenticity Vault
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Certificate Selector Tabs */}
          <div>
            <span className="text-xs font-semibold text-umber/70 dark:text-cream/70 mb-2 block">
              Registered Pieces in Your Vault ({USER_CERTIFICATES.length})
            </span>
            <div className="flex gap-2">
              {USER_CERTIFICATES.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex-1 ${
                    selectedCert.id === cert.id
                      ? 'bg-sand dark:bg-sand-dark border-brass shadow-sm'
                      : 'border-hairline dark:border-hairline-dark text-umber/70 dark:text-cream/70 hover:border-brass/40'
                  }`}
                >
                  <span className="font-serif font-bold text-umber dark:text-cream block truncate">
                    {cert.productName}
                  </span>
                  <span className="text-[10px] text-brass font-medium block mt-0.5">
                    {cert.certAgency} · {cert.purityKarat.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Certificate Card (Official Passport Styling) */}
          <div className="p-5 rounded-2xl bg-cream dark:bg-umber-dark border-2 border-brass/40 shadow-inner relative space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-brass block">
                  Government of India Certified
                </span>
                <h4 className="font-serif text-base font-bold text-umber dark:text-cream">
                  {selectedCert.productName}
                </h4>
                <p className="text-xs text-umber/60 dark:text-cream/60 mt-0.5">
                  Invoice #{selectedCert.invoiceNumber} · Acquired {selectedCert.purchaseDate}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-brass/50 flex flex-col items-center justify-center p-1 text-center bg-sand/50 dark:bg-sand-dark/50">
                <Award className="w-4 h-4 text-brass" />
                <span className="text-[8px] font-bold text-brass uppercase leading-none mt-0.5">BIS 916</span>
              </div>
            </div>

            {/* Spec Table */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-hairline dark:border-hairline-dark">
              <div>
                <span className="text-umber/60 dark:text-cream/60 text-[10px] uppercase block">BIS Hallmark ID</span>
                <span className="font-mono font-bold text-umber dark:text-cream text-[11px]">{selectedCert.hallmarkId}</span>
              </div>
              <div>
                <span className="text-umber/60 dark:text-cream/60 text-[10px] uppercase block">Certifying Body</span>
                <span className="font-semibold text-umber dark:text-cream">{selectedCert.certAgency}</span>
              </div>
              <div>
                <span className="text-umber/60 dark:text-cream/60 text-[10px] uppercase block">Certified Weight</span>
                <span className="font-bold text-umber dark:text-cream tabular-nums">{selectedCert.certifiedWeight} Grams</span>
              </div>
              <div>
                <span className="text-umber/60 dark:text-cream/60 text-[10px] uppercase block">Purity Grade</span>
                <span className="font-bold text-maroon dark:text-brass-light">{selectedCert.purityKarat}</span>
              </div>
            </div>

            {/* Live Re-sell & Trade-In Estimate (Section 15.4) */}
            <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-umber/80 dark:text-cream/80 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-brass" />
                  <span>Real-Time Buyback / Trade Valuation</span>
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">▲ +{(Math.round((estimatedMarketValue - selectedCert.originalValue) / selectedCert.originalValue * 100))}% since purchase</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-maroon dark:text-cream tabular-nums">
                  ₹{estimatedMarketValue.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-umber/60 dark:text-cream/60 line-through tabular-nums">
                  Original: ₹{selectedCert.originalValue.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-umber/60 dark:text-cream/60">
                Calculated on live 24K IBJA rate of ₹{currentGoldRate}/g with 100% gold purity buyback guarantee at all DS Jewellery boutiques.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => alert(`Certificate ${selectedCert.hallmarkId} downloaded as verified cryptographically signed PDF.`)}
              className="py-2.5 px-3 rounded-xl border border-hairline dark:border-hairline-dark hover:border-brass text-umber dark:text-cream font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-brass" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => alert(`Digital Passport ${selectedCert.hallmarkId} added to Apple Wallet / Google Wallet.`)}
              className="py-2.5 px-3 rounded-xl bg-umber dark:bg-cream text-cream dark:text-umber font-semibold flex items-center justify-center gap-1.5 hover:bg-umber/90 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4 text-brass" />
              <span>Export to Wallet</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-sand/60 dark:bg-sand-dark/40 border-t border-hairline dark:border-hairline-dark flex justify-between items-center text-xs">
          <span className="text-umber/60 dark:text-cream/60">
            Backed by Bureau of Indian Standards (BIS)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-maroon text-cream font-semibold rounded-lg hover:bg-maroon-dark transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
