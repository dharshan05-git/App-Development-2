import React from 'react';
import { Home, Layers, Compass, Heart, User } from 'lucide-react';

export type NavTabId = 'home' | 'collections' | 'discover' | 'wishlist' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  wishlistCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  wishlistCount,
}) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'collections' as const, label: 'Collections', icon: Layers },
    { id: 'discover' as const, label: 'Discover', icon: Compass },
    { id: 'wishlist' as const, label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 dark:bg-umber-dark/95 backdrop-blur-md border-t border-hairline dark:border-hairline-dark px-2 safe-bottom transition-colors duration-200">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center relative transition-colors duration-150 ${
                isActive
                  ? 'text-maroon dark:text-maroon-dark font-semibold'
                  : 'text-umber/60 dark:text-cream/60 hover:text-umber dark:hover:text-cream'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  className="w-5 h-5 transition-transform duration-150 active:scale-95"
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 rounded-full bg-maroon text-cream text-[9px] font-bold flex items-center justify-center leading-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>

              {/* 2px editorial underline indicator (Section 5) */}
              {isActive && (
                <span className="absolute bottom-1 w-6 h-[2px] bg-maroon dark:bg-maroon-dark rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
