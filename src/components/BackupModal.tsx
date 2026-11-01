import React, { useRef } from 'react';
import { X, Download, Upload, RefreshCw } from 'lucide-react';
import { ConsumableItem } from '../types/consumable';
import { exportBackup, importBackup } from '../utils/storage';
import { SAMPLE_ITEMS } from '../utils/sampleData';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ConsumableItem[];
  onRestore: (items: ConsumableItem[]) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  items,
  onRestore,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportBackup(items);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importBackup(file);
      if (
        window.confirm(
          `Er zijn ${imported.length} artikelen gevonden in de back-up. Wilt u deze herstellen? Huidige gegevens worden overschreven.`
        )
      ) {
        onRestore(imported);
        onClose();
      }
    } catch (err: any) {
      alert(err.message || 'Ongeldig back-upbestand.');
    }
  };

  const handleLoadSample = () => {
    if (
      window.confirm(
        'Wilt u de voorbeeldgegevens laden? Huidige gegevens worden overschreven.'
      )
    ) {
      onRestore(SAMPLE_ITEMS);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Gegevensbeheer & Back-up
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <h3 className="flex items-center text-sm font-semibold text-blue-900">
              <Download className="mr-2 h-4 w-4 text-blue-600" />
              Back-up exporteren
            </h3>
            <p className="mt-1 text-xs text-blue-700">
              Download uw verbruiksartikelen en vervangingsgeschiedenis als JSON-bestand.
            </p>
            <button
              onClick={handleExport}
              className="mt-3 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              JSON exporteren
            </button>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <h3 className="flex items-center text-sm font-semibold text-emerald-900">
              <Upload className="mr-2 h-4 w-4 text-emerald-600" />
              Back-up importeren
            </h3>
            <p className="mt-1 text-xs text-emerald-700">
              Herstel gegevens uit een eerder geëxporteerd JSON-bestand.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Bestand kiezen & Importeren
            </button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="flex items-center text-sm font-semibold text-gray-800">
              <RefreshCw className="mr-2 h-4 w-4 text-gray-500" />
              Voorbeeldgegevens herstellen
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Herinitialiseer de app met representatieve voorbeeldgegevens.
            </p>
            <button
              onClick={handleLoadSample}
              className="mt-3 flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Voorbeeldgegevens laden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
