import React, { useState } from 'react';
import { X, Layers, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';
import { INDUSTRY_TEMPLATES } from '../data/industryTemplates';
import { ConsumableItem } from '../types/consumable';

interface IndustryTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (
    items: Omit<ConsumableItem, 'id' | 'history' | 'lastReplacedDate'>[],
    mode: 'append' | 'replace'
  ) => void;
}

export const IndustryTemplateModal: React.FC<IndustryTemplateModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [selectedId, setSelectedId] = useState<string>(INDUSTRY_TEMPLATES[0].id);
  const [mode, setMode] = useState<'append' | 'replace'>('append');

  if (!isOpen) return null;

  const currentTemplate =
    INDUSTRY_TEMPLATES.find((t) => t.id === selectedId) || INDUSTRY_TEMPLATES[0];

  const handleApply = () => {
    onApply(currentTemplate.items, mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Branche-sjablonen
              </h2>
              <p className="text-xs text-gray-500">
                Laad kant-en-klare lijsten met verbruiksartikelen voor uw sector
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 overflow-hidden py-4 md:grid-cols-3">
          <div className="space-y-1.5 overflow-y-auto border-r pr-2">
            {INDUSTRY_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedId(tmpl.id)}
                className={`flex w-full items-center space-x-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  selectedId === tmpl.id
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tmpl.icon}</span>
                <span className="truncate">{tmpl.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-between overflow-y-auto md:col-span-2">
            <div>
              <div className="mb-3">
                <h3 className="text-base font-bold text-gray-800">
                  {currentTemplate.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {currentTemplate.description}
                </p>
              </div>

              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Inbegrepen artikelen ({currentTemplate.items.length})
                </span>
                <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {currentTemplate.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-medium text-gray-700">
                          {it.name}
                        </span>
                      </div>
                      <span className="text-gray-400">
                        elke {it.cycleDays} dgn ({it.location})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-3">
                <label className="text-xs font-semibold text-gray-700">
                  Toepassingsmodus:
                </label>
                <div className="mt-2 flex space-x-4">
                  <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="append"
                      checked={mode === 'append'}
                      onChange={() => setMode('append')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Toevoegen aan huidige lijst</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="replace"
                      checked={mode === 'replace'}
                      onChange={() => setMode('replace')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Huidige lijst overschrijven</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuleren
          </button>
          <button
            onClick={handleApply}
            className="flex items-center rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            {mode === 'append' ? (
              <Plus className="mr-1.5 h-4 w-4" />
            ) : (
              <RefreshCw className="mr-1.5 h-4 w-4" />
            )}
            Sjabloon toepassen
          </button>
        </div>
      </div>
    </div>
  );
};
