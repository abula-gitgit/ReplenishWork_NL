import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { ConsumableItem, Category } from '../types/consumable';
import { CATEGORIES } from '../utils/categoryColors';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<ConsumableItem>) => void;
  initialItem?: ConsumableItem | null;
  locations: string[];
  units: string[];
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
  locations,
  units,
}) => {
  const [formData, setFormData] = useState<Partial<ConsumableItem>>({
    name: '',
    category: 'Kantoor & Schrijfwaren',
    location: locations[0] || 'Kantoor / Werkplek',
    cycleDays: 30,
    lastReplacedDate: new Date().toISOString().split('T')[0],
    quantity: 1,
    unit: units[0] || 'stuks',
    minQuantity: 1,
    cost: 0,
    supplier: '',
    itemUrl: '',
    orderLeadDays: 3,
    memo: '',
  });

  useEffect(() => {
    if (initialItem) {
      setFormData(initialItem);
    } else {
      setFormData({
        name: '',
        category: 'Kantoor & Schrijfwaren',
        location: locations[0] || 'Kantoor / Werkplek',
        cycleDays: 30,
        lastReplacedDate: new Date().toISOString().split('T')[0],
        quantity: 1,
        unit: units[0] || 'stuks',
        minQuantity: 1,
        cost: 0,
        supplier: '',
        itemUrl: '',
        orderLeadDays: 3,
        memo: '',
      });
    }
  }, [initialItem, isOpen, locations, units]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Vul a.u.b. de naam van het artikel in.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden my-8">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {initialItem ? 'Artikel bewerken' : 'Nieuw artikel registreren'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          {/* Name */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Artikelnaam <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="bijv. Kopieerpapier A4, Koffiebonen, Handschoenen..."
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Categorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Locatie
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cycle Days & Last Replaced Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Vervangingscyclus (dagen)
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.cycleDays || ''}
                onChange={(e) => setFormData({ ...formData, cycleDays: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Datum laatste vervanging
              </label>
              <input
                type="date"
                required
                value={formData.lastReplacedDate || ''}
                onChange={(e) => setFormData({ ...formData, lastReplacedDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Quantity & Unit & Min Quantity */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Huidige voorraad
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity ?? ''}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Eenheid
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Min. voorraad
              </label>
              <input
                type="number"
                min="0"
                value={formData.minQuantity ?? ''}
                onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Cost & Lead time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kosten per eenheid (€)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.cost ?? ''}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Bestelvoorlooptijd (dagen)
              </label>
              <input
                type="number"
                min="0"
                value={formData.orderLeadDays ?? ''}
                onChange={(e) => setFormData({ ...formData, orderLeadDays: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Supplier & URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Leverancier / Groothandel
              </label>
              <input
                type="text"
                placeholder="bijv. Kantoorvakhandel, Leverancier..."
                value={formData.supplier || ''}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Product-URL (bestellink)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.itemUrl || ''}
                onChange={(e) => setFormData({ ...formData, itemUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Memo */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Notities en specificaties
            </label>
            <textarea
              rows={2}
              placeholder="Vervangingsinstructies, artikelnummer, precieze opbergplek..."
              value={formData.memo || ''}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg font-medium transition"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Opslaan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
