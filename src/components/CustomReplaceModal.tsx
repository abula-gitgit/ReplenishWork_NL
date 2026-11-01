import React, { useState } from 'react';
import { X, Check, Calendar, Euro, FileText } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';

interface CustomReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CalculatedItem | null;
  onConfirm: (
    itemId: string,
    replacedDate: string,
    cost?: number,
    note?: string
  ) => void;
}

export const CustomReplaceModal: React.FC<CustomReplaceModalProps> = ({
  isOpen,
  onClose,
  item,
  onConfirm,
}) => {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cost, setCost] = useState<string>('');
  const [note, setNote] = useState<string>('');

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(
      item.id,
      date,
      cost ? parseFloat(cost) : undefined,
      note ? note.trim() : undefined
    );
    setCost('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Vervanging registreren
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Calendar className="mr-2 h-4 w-4 text-emerald-600" />
              Datum van vervanging
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Euro className="mr-2 h-4 w-4 text-blue-600" />
              Kosten (€, optioneel)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FileText className="mr-2 h-4 w-4 text-gray-600" />
              Notitie / Memo (optioneel)
            </label>
            <textarea
              rows={2}
              placeholder="Bijv. Vervangen volgens schema, serienummer #102..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              <Check className="mr-1.5 h-4 w-4" />
              Vervanging opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
