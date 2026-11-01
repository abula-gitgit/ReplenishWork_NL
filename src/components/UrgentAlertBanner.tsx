import React from 'react';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';

interface UrgentAlertBannerProps {
  urgentItems: CalculatedItem[];
  onQuickReplace: (item: CalculatedItem) => void;
  onFilterUrgent: () => void;
}

export const UrgentAlertBanner: React.FC<UrgentAlertBannerProps> = ({
  urgentItems,
  onQuickReplace,
  onFilterUrgent,
}) => {
  if (urgentItems.length === 0) return null;

  const critical = urgentItems.filter((i) => i.urgency === 'critical');
  const warning = urgentItems.filter((i) => i.urgency === 'warning');

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-y border-amber-300/60 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-rose-500 text-white rounded-lg shadow-sm shrink-0">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-800 text-sm sm:text-base">
                Let op: Voorraad en vervangingsacties vereist!
              </span>
              {critical.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  Dringend: {critical.length}
                </span>
              )}
              {warning.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                  Binnenkort: {warning.length}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Er zijn artikelen die de uiterste vervangingsdatum hebben bereikt of onder de veiligheidsvoorraad zijn gezakt.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={onFilterUrgent}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            Alles bekijken
          </button>
          {critical.length > 0 && (
            <button
              onClick={() => onQuickReplace(critical[0])}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Vervangen: {critical[0].name.slice(0, 14)}...</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
