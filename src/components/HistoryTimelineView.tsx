import React from 'react';
import { History, FileText, Clock, Tag } from 'lucide-react';
import { ConsumableItem } from '../types/consumable';
import { formatDateDutch } from '../utils/dateCalc';

interface HistoryTimelineViewProps {
  items: ConsumableItem[];
}

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  items,
}) => {
  const allEvents = items.flatMap((item) =>
    (item.history || []).map((h) => ({
      ...h,
      itemId: item.id,
      itemName: item.name,
      itemCategory: item.category,
      itemLocation: item.location,
    }))
  );

  allEvents.sort(
    (a, b) => new Date(b.replacedAt).getTime() - new Date(a.replacedAt).getTime()
  );

  const totalCost = allEvents.reduce((acc, ev) => acc + (ev.cost || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="flex items-center text-lg font-bold text-gray-800">
            <History className="mr-2 h-5 w-5 text-emerald-600" />
            Vervangingstijdlijn
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Volledig chronologisch logboek van alle uitgevoerde vervangingen en kosten.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-center">
            <span className="block text-xs font-medium text-gray-500">
              Totaal registraties
            </span>
            <span className="text-base font-bold text-gray-800">
              {allEvents.length}
            </span>
          </div>
          <div className="rounded-xl border border-gray-100 bg-emerald-50/50 px-4 py-2 text-center">
            <span className="block text-xs font-medium text-emerald-700">
              Totale uitgaven
            </span>
            <span className="text-base font-bold text-emerald-800">
              €{totalCost.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        {allEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="h-12 w-12 text-gray-300" />
            <h3 className="mt-3 text-base font-bold text-gray-700">
              Geen geschiedenis gevonden
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Registreer vervangingen bij uw artikelen om hier een interactieve tijdlijn te bekijken.
            </p>
          </div>
        ) : (
          <div className="relative border-l-2 border-emerald-200 ml-4 space-y-6 my-2">
            {allEvents.map((ev) => (
              <div key={ev.id} className="relative pl-6">
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-emerald-600 ring-4 ring-emerald-100" />
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 transition hover:bg-white hover:shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-gray-800">
                        {ev.itemName}
                      </h4>
                      <span className="inline-flex items-center rounded-md bg-emerald-100/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        <Tag className="mr-1 h-3 w-3" />
                        {ev.itemCategory}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      {formatDateDutch(ev.replacedAt)}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    <span>Locatie: {ev.itemLocation}</span>
                    {ev.cost !== undefined && (
                      <span className="font-semibold text-gray-800">
                        Kosten: €{ev.cost.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {ev.note && (
                    <div className="mt-2.5 flex items-start rounded-lg bg-white p-2.5 text-xs text-gray-700 border border-gray-100">
                      <FileText className="mr-1.5 mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                      <span>{ev.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
