import React from 'react';
import { X, Calendar, FileText, Clock } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';
import { formatDateDutch } from '../utils/dateCalc';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CalculatedItem | null;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen || !item) return null;

  const history = item.history || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Vervangingsgeschiedenis
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">{item.name}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Clock className="h-10 w-10 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">
                Nog geen vervangingsgeschiedenis vastgelegd voor dit artikel.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs font-semibold text-gray-800">
                      <Calendar className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                      {formatDateDutch(record.replacedAt)}
                    </span>
                    {record.cost !== undefined && (
                      <span className="text-xs font-bold text-gray-700">
                        €{record.cost.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {record.note && (
                    <div className="mt-2 flex items-start text-xs text-gray-600">
                      <FileText className="mr-1.5 mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                      <span>{record.note}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-4 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
