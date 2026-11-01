import React from 'react';
import {
  RotateCcw,
  MapPin,
  MoreVertical,
  ExternalLink,
  Edit2,
  Trash2,
  History,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Package,
} from 'lucide-react';
import { CalculatedItem } from '../types/consumable';
import { CATEGORY_COLORS } from '../utils/categoryColors';
import { formatDateDutch, formatRelativeDaysDutch } from '../utils/dateCalc';

interface ItemCardProps {
  item: CalculatedItem;
  onQuickReplace: (item: CalculatedItem) => void;
  onCustomReplace: (item: CalculatedItem) => void;
  onEdit: (item: CalculatedItem) => void;
  onDelete: (id: string) => void;
  onOpenHistory: (item: CalculatedItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onQuickReplace,
  onCustomReplace,
  onEdit,
  onDelete,
  onOpenHistory,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const colorStyle = CATEGORY_COLORS[item.category] || {
    bg: 'bg-slate-100 text-slate-700',
    border: 'border-slate-200',
    accent: '#64748b',
  };

  const isCritical = item.urgency === 'critical';
  const isWarning = item.urgency === 'warning';

  return (
    <div
      className={`bg-white rounded-xl border transition shadow-sm hover:shadow-md relative flex flex-col justify-between ${
        isCritical
          ? 'border-rose-300 ring-1 ring-rose-200'
          : isWarning
          ? 'border-amber-300 ring-1 ring-amber-200'
          : 'border-slate-200'
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Top badge and actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${colorStyle.bg} ${colorStyle.border}`}
            >
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <MapPin className="w-3 h-3 text-slate-400" />
              {item.location}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-7 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 text-xs">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit(item);
                    }}
                    className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                    Details bewerken
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onCustomReplace(item);
                    }}
                    className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    Vervanging met kosten/datum
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenHistory(item);
                    }}
                    className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <History className="w-3.5 h-3.5 text-slate-500" />
                    Historie ({item.history?.length || 0})
                  </button>
                  {item.itemUrl && (
                    <a
                      href={item.itemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 py-2 text-left text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Bestellink
                    </a>
                  )}
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      if (confirm(`Wilt u "${item.name}" verwijderen?`)) {
                        onDelete(item.id);
                      }
                    }}
                    className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    Artikel verwijderen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
          {item.name}
        </h3>

        {item.memo && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {item.memo}
          </p>
        )}

        {/* Urgency and stock */}
        <div className="my-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {isCritical ? (
              <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                <AlertCircle className="w-3.5 h-3.5" />
                {formatRelativeDaysDutch(item.daysRemaining)}
              </span>
            ) : isWarning ? (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                {formatRelativeDaysDutch(item.daysRemaining)}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {formatRelativeDaysDutch(item.daysRemaining)}
              </span>
            )}
          </div>

          <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-slate-400" />
            <span>Voorraad:</span>
            <span
              className={`font-bold ${
                item.quantity <= item.minQuantity ? 'text-rose-600' : 'text-slate-800'
              }`}
            >
              {item.quantity} {item.unit}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Cyclus: {item.cycleDays} dagen</span>
            <span>{item.cycleProgressPercent}% verstreken</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${item.cycleProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div>
            <span className="block text-slate-400">Laatst vervangen:</span>
            <span className="font-semibold text-slate-700">
              {formatDateDutch(item.lastReplacedDate)}
            </span>
          </div>
          <div>
            <span className="block text-slate-400">Volgende vervanging:</span>
            <span
              className={`font-semibold ${
                isCritical ? 'text-rose-600' : 'text-slate-700'
              }`}
            >
              {formatDateDutch(item.nextReplacementDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenHistory(item)}
          className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-200/60 transition"
        >
          Historie ({item.history?.length || 0})
        </button>

        <button
          onClick={() => onQuickReplace(item)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-1.5 ${
            isCritical
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Vandaag vervangen!</span>
        </button>
      </div>
    </div>
  );
};
