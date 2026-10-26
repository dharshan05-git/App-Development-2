import React, { useState } from 'react';
import { ShieldCheck, Video, MapPin, Truck, ChevronRight, Moon, Sun, Globe, Phone, Award, LogOut, Check } from 'lucide-react';

interface ProfileViewProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenVault: () => void;
  onOpenConsultation: () => void;
  onOpenStores: () => void;
  onOpenQuiz: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenVault,
  onOpenConsultation,
  onOpenStores,
  onOpenQuiz,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Tamil' | 'Hindi'>('English');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  return (
    <div className="p-4 space-y-5 animate-fade-in pb-12 text-xs">
      
      {/* 1. PROFILE HEADER CARD (Section 12 & 13) */}
      <div className="p-5 rounded-2xl bg-sand dark:bg-umber-velvet border border-hairline dark:border-hairline-dark space-y-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-maroon dark:bg-maroon-dark text-cream flex items-center justify-center font-serif text-xl font-bold shadow-md shrink-0">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-umber dark:text-cream">
                Aanya Sharma
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brass/20 text-brass font-bold uppercase tracking-wider">
                Royal Crest
              </span>
            </div>
            <p className="text-umber/60 dark:text-cream/60 text-[11px] mt-0.5">
              +91 98450 12890 · Member since 2024
            </p>
          </div>
        </div>

        {/* Loyalty Tier Progress Bar (Thin gold band filling in, Section 13) */}
        <div className="pt-3 border-t border-hairline dark:border-hairline-dark space-y-1.5">
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-xs font-semibold text-umber dark:text-cream">
              Tier Progress: Gold Crest → Imperial Platinum
            </span>
            <span className="font-mono font-bold text-brass dark:text-brass-light tabular-nums">
              1,450 / 2,000 Pts
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-cream dark:bg-umber-dark overflow-hidden p-0.5 border border-brass/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brass to-brass-light transition-all duration-700"
              style={{ width: '72.5%' }}
            />
          </div>
          <p className="text-[10px] text-umber/50 dark:text-cream/50">
            Earn 550 more points by November to unlock private boutique after-hours access and complimentary annual gem polishing.
          </p>
        </div>
      </div>

      {/* 2. ACTIVE ARMORED SHIPMENT TRACKER (Section 1 & 17) */}
      <div className="p-4 rounded-xl bg-sand/70 dark:bg-sand-dark/70 border border-hairline dark:border-hairline-dark space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-umber dark:text-cream flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-brass" />
            <span>Active Armored Transit</span>
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
            ON SCHEDULE
          </span>
        </div>

        <div className="space-y-1 text-xs">
          <p className="font-serif font-bold text-umber dark:text-cream">
            The Royal Mayura Choker (#DS-2026-8819)
          </p>
          <p className="text-[11px] text-umber/60 dark:text-cream/60">
            Destination: Palm Meadows Villa 14, Bengaluru · OTP delivery verification required
          </p>
        </div>

        {/* 4-Step Milestone Progress */}
        <div className="grid grid-cols-4 gap-1 pt-1 text-[9px] text-center font-medium">
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-maroon dark:bg-brass" />
            <span className="text-maroon dark:text-brass-light">Vault Pack</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-maroon dark:bg-brass" />
            <span className="text-maroon dark:text-brass-light">BIS Stamped</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-maroon dark:bg-brass" />
            <span className="text-maroon dark:text-brass-light">Armored Van</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-hairline dark:bg-hairline-dark" />
            <span className="text-umber/40 dark:text-cream/40">Delivered</span>
          </div>
        </div>
      </div>

      {/* 3. CORE SERVICES MENU LIST (Section 12) */}
      <div className="space-y-2">
        <span className="font-semibold uppercase tracking-wider text-umber/60 dark:text-cream/60 text-[10px] px-1">
          Bespoke Services
        </span>

        <button
          onClick={onOpenVault}
          className="w-full p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center justify-between hover:border-brass transition-colors"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center text-brass">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-umber dark:text-cream block">Digital Authenticity Vault</span>
              <span className="text-[10px] text-umber/60 dark:text-cream/60">BIS hallmark certificates & live trade-in valuation</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-brass" />
        </button>

        <button
          onClick={onOpenConsultation}
          className="w-full p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center justify-between hover:border-brass transition-colors"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center text-brass">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-umber dark:text-cream block">Virtual Gem Consultation</span>
              <span className="text-[10px] text-umber/60 dark:text-cream/60">Schedule HD 1-on-1 session with master jeweller</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-brass" />
        </button>

        <button
          onClick={onOpenStores}
          className="w-full p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center justify-between hover:border-brass transition-colors"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center text-brass">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-umber dark:text-cream block">DS Flagship Boutiques</span>
              <span className="text-[10px] text-umber/60 dark:text-cream/60">Bengaluru, Chennai, Coimbatore, Mumbai</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-brass" />
        </button>

        <button
          onClick={onOpenQuiz}
          className="w-full p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center justify-between hover:border-brass transition-colors"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center text-brass">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-umber dark:text-cream block">Retake Style Recommendation Quiz</span>
              <span className="text-[10px] text-umber/60 dark:text-cream/60">Update your wedding timeline and aesthetic preferences</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-brass" />
        </button>
      </div>

      {/* 4. APP PREFERENCES (Language & Evening Salon Dark Mode, Section 16 & 19) */}
      <div className="space-y-2 pt-2 border-t border-hairline dark:border-hairline-dark">
        <span className="font-semibold uppercase tracking-wider text-umber/60 dark:text-cream/60 text-[10px] px-1">
          Preferences & Aesthetics
        </span>

        <div className="p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center text-brass">
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-semibold text-umber dark:text-cream block">
                Evening Salon Aesthetic (Dark Mode)
              </span>
              <span className="text-[10px] text-umber/60 dark:text-cream/60">
                Velvet #1A0E0E aesthetic inspired by private viewing salons
              </span>
            </div>
          </div>

          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              darkMode ? 'bg-maroon-dark justify-end' : 'bg-hairline justify-start'
            }`}
            aria-label="Toggle dark mode"
          >
            <div className="w-5 h-5 rounded-full bg-cream shadow-sm" />
          </button>
        </div>

        {/* Vernacular Language Selector (Section 16.3) */}
        <div className="p-3.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center text-brass">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-umber dark:text-cream block">
                  Regional Language
                </span>
                <span className="text-[10px] text-umber/60 dark:text-cream/60">
                  Current: {selectedLanguage}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowLanguagePicker(!showLanguagePicker)}
              className="text-xs font-semibold text-brass hover:underline"
            >
              {showLanguagePicker ? 'Done' : 'Change'}
            </button>
          </div>

          {showLanguagePicker && (
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-hairline dark:border-hairline-dark">
              {[
                { id: 'English' as const, label: 'English' },
                { id: 'Tamil' as const, label: 'தமிழ் (Tamil)' },
                { id: 'Hindi' as const, label: 'हिंदी (Hindi)' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`py-1.5 px-2 rounded-lg text-center text-xs font-medium border transition-colors ${
                    selectedLanguage === lang.id
                      ? 'bg-maroon text-cream border-maroon'
                      : 'border-hairline dark:border-hairline-dark text-umber dark:text-cream'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Concierge Hotline */}
      <div className="p-4 rounded-xl bg-sand/60 dark:bg-sand-dark/60 text-center space-y-1.5">
        <p className="text-xs font-semibold text-umber dark:text-cream">
          DS Private Client Services
        </p>
        <p className="text-[11px] text-umber/60 dark:text-cream/60">
          Toll-Free Concierge: 1800 425 8899 · concierge@dsjewellery.com
        </p>
      </div>

    </div>
  );
};
