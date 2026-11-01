import React from 'react';
import { ListFilter, Calendar, History, BookOpen, Info } from 'lucide-react';

export type ActiveTab = 'list' | 'calendar' | 'timeline' | 'guide' | 'info';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  urgentCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  urgentCount,
}) => {
  const tabs = [
    { id: 'list' as ActiveTab, label: 'Lijst', icon: ListFilter, badge: urgentCount },
    { id: 'calendar' as ActiveTab, label: 'Kalender', icon: Calendar },
    { id: 'timeline' as ActiveTab, label: 'Historie', icon: History },
    { id: 'guide' as ActiveTab, label: 'Gids', icon: BookOpen },
    { id: 'info' as ActiveTab, label: 'Info', icon: Info },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-lg md:hidden">
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center relative transition ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
