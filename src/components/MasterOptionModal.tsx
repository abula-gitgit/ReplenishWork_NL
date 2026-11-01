import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { MasterOptions } from '../utils/masterOptions';

interface MasterOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: MasterOptions;
  onSave: (options: MasterOptions) => void;
}

export const MasterOptionModal: React.FC<MasterOptionModalProps> = ({
  isOpen,
  onClose,
  options,
  onSave,
}) => {
  const [locations, setLocations] = useState<string[]>(options.locations);
  const [units, setUnits] = useState<string[]>(options.units);

  const [newLocation, setNewLocation] = useState<string>('');
  const [newUnit, setNewUnit] = useState<string>('');

  if (!isOpen) return null;

  const handleAddLocation = () => {
    const val = newLocation.trim();
    if (val && !locations.includes(val)) {
      setLocations([...locations, val]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (val: string) => {
    setLocations(locations.filter((l) => l !== val));
  };

  const handleAddUnit = () => {
    const val = newUnit.trim();
    if (val && !units.includes(val)) {
      setUnits([...units, val]);
      setNewUnit('');
    }
  };

  const handleRemoveUnit = (val: string) => {
    setUnits(units.filter((u) => u !== val));
  };

  const handleSave = () => {
    onSave({ locations, units });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Opties beheren
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto py-4">
          <div>
            <h3 className="text-sm font-bold text-gray-700">Opslaglocaties</h3>
            <p className="text-xs text-gray-500">
              Voeg veelgebruikte opslaglocaties toe aan de selectielijst.
            </p>
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Nieuwe locatie toevoegen..."
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLocation())}
              />
              <button
                type="button"
                onClick={handleAddLocation}
                className="flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  {loc}
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    className="ml-1.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-700">Eenheden</h3>
            <p className="text-xs text-gray-500">
              Voeg maateenheden toe voor uw voorraad.
            </p>
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="Nieuwe eenheid toevoegen..."
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUnit())}
              />
              <button
                type="button"
                onClick={handleAddUnit}
                className="flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {units.map((u) => (
                <span
                  key={u}
                  className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  {u}
                  <button
                    type="button"
                    onClick={() => handleRemoveUnit(u)}
                    className="ml-1.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-4 text-right">
          <button
            onClick={handleSave}
            className="flex items-center justify-center ml-auto rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            <Check className="mr-1.5 h-4 w-4" />
            Opslaan & Toepassen
          </button>
        </div>
      </div>
    </div>
  );
};
