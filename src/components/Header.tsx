import React from 'react';
import {
  RotateCcw,
  Plus,
  FolderPlus,
  SlidersHorizontal,
  HardDriveDownload,
  Bell,
  Globe,
} from 'lucide-react';
import { ActiveTab } from './BottomNavBar';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenNewItem: () => void;
  onOpenTemplates: () => void;
  onOpenMasterOptions: () => void;
  onOpenBackup: () => void;
  onOpenNotification: () => void;
  urgentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenNewItem,
  onOpenTemplates,
  onOpenMasterOptions,
  onOpenBackup,
  onOpenNotification,
  urgentCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl">
                  Replenish <span className="text-blue-600 font-semibold text-sm sm:text-base">for Work</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  NL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Slim voorraad- en vervangingsbeheer voor bedrijven
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onTabChange('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Lijst</span>
              {urgentCount > 0 && (
                <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold">
                  {urgentCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onTabChange('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'calendar'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kalender
            </button>
            <button
              onClick={() => onTabChange('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'timeline'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Historie
            </button>
            <button
              onClick={() => onTabChange('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cyclusgids
            </button>
            <button
              onClick={() => onTabChange('info')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'info'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Informatie
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="https://rpw.easy-log.app/nl"
              title="Taalportaal"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              <Globe className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenTemplates}
              title="Branchesjablonen"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition hidden sm:inline-flex"
            >
              <FolderPlus className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenMasterOptions}
              title="Stamgegevens (locaties, eenheden)"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition hidden sm:inline-flex"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNotification}
              title="Meldingen instellen"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBackup}
              title="Back-up en herstel"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <HardDriveDownload className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewItem}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Nieuw artikel</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
