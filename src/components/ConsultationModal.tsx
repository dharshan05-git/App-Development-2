import React, { useState } from 'react';
import { X, Calendar, Video, Clock, Globe, Check, Shield } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 27 Oct');
  const [selectedTime, setSelectedTime] = useState('04:30 PM');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [interestArea, setInterestArea] = useState('Bridal Trousseau & Heritage Necklaces');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-umber/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-md h-full sm:h-auto sm:max-h-[88vh] bg-cream dark:bg-umber-velvet rounded-none sm:rounded-2xl border border-hairline dark:border-hairline-dark shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-hairline dark:border-hairline-dark flex items-center justify-between bg-sand/60 dark:bg-sand-dark/40">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-brass" />
            <h3 className="font-serif text-base font-bold text-umber dark:text-cream">
              Virtual Jewellery Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {isBooked ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl font-bold text-umber dark:text-cream">
              Appointment Confirmed
            </h4>
            <p className="text-xs text-umber/70 dark:text-cream/70 max-w-xs mx-auto">
              A private HD WebRTC video room link has been dispatched to your email and WhatsApp (+91 98450 12890) for {selectedDate} at {selectedTime} with senior gemologist.
            </p>
            <div className="p-3 bg-sand dark:bg-sand-dark rounded-xl text-xs space-y-1 text-left">
              <div><span className="opacity-60">Consultant:</span> Devraj Singh (Master Jeweller)</div>
              <div><span className="opacity-60">Language:</span> {selectedLanguage}</div>
              <div><span className="opacity-60">Focus:</span> {interestArea}</div>
            </div>
            <button
              onClick={onClose}
              className="mt-2 w-full py-2.5 bg-maroon text-cream font-semibold text-xs rounded-xl hover:bg-maroon-dark transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-5 overflow-y-auto no-scrollbar space-y-4 text-xs flex-1">
            <div className="p-3 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark flex items-center gap-2 text-umber/80 dark:text-cream/80">
              <Shield className="w-4 h-4 text-brass shrink-0" />
              <span>Free 1-on-1 private video session with live macro gem camera view</span>
            </div>

            {/* Date Selection */}
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[10px]">
                Select Appointment Date
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['Today, 26 Oct', 'Tomorrow, 27 Oct', 'Wed, 28 Oct'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedDate === d
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-bold text-umber dark:text-cream'
                        : 'border-hairline dark:border-hairline-dark text-umber/60 dark:text-cream/60'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[10px]">
                Select Preferred Time Slot
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '08:30 PM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      selectedTime === t
                        ? 'bg-sand dark:bg-sand-dark border-maroon dark:border-brass-light font-bold text-umber dark:text-cream'
                        : 'border-hairline dark:border-hairline-dark text-umber/60 dark:text-cream/60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[10px]">
                Consultant Language
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {['English', 'Hindi', 'Tamil', 'Telugu'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLanguage(l)}
                    className={`py-1.5 rounded-lg border text-center text-[11px] ${
                      selectedLanguage === l
                        ? 'bg-sand dark:bg-sand-dark border-brass font-bold text-umber dark:text-cream'
                        : 'border-hairline dark:border-hairline-dark text-umber/60 dark:text-cream/60'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Topic */}
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-umber/70 dark:text-cream/70 text-[10px]">
                Area of Interest
              </span>
              <select
                value={interestArea}
                onChange={(e) => setInterestArea(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-sand dark:bg-sand-dark border border-hairline dark:border-hairline-dark text-xs text-umber dark:text-cream"
              >
                <option>Bridal Trousseau & Heritage Necklaces</option>
                <option>Solitaire Diamond Engagement Rings (4Cs Education)</option>
                <option>Traditional Temple Jewellery & Investment Gold</option>
                <option>Bespoke Custom Jewel Blueprinting</option>
              </select>
            </div>

            <button
              onClick={() => setIsBooked(true)}
              className="mt-4 w-full py-3 bg-maroon text-cream font-semibold text-xs rounded-xl hover:bg-maroon-dark transition-colors shadow-lg"
            >
              Confirm Consultation Appointment
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
