import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Search,
  X,
  Plus,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { REPLACEMENT_GUIDES, ReplacementGuideItem, mapGuideToPreset } from '../data/replacementGuides';
import { ConsumableItem } from '../types/consumable';
import { GuideIllustration } from './GuideIllustrations';

interface CycleGuideViewProps {
  onAddGuideItem: (item: ConsumableItem) => void;
  onNavigateToList: () => void;
}

const CATEGORY_TABS: { id: string; label: string }[] = [
  { id: 'all', label: 'Alle handleidingen' },
  { id: 'office', label: 'Kantoor & Documenten' },
  { id: 'it', label: 'IT & Randapparatuur' },
  { id: 'sanitary', label: 'Hygiëne & Keuken' },
  { id: 'hvac', label: 'Klimaatbeheersing & Filters' },
  { id: 'safety', label: 'Veiligheid & Noodvoorziening' },
  { id: 'facility', label: 'Verlichting & Faciliteiten' },
  { id: 'maintenance', label: 'Onderhoud & Gereedschap' },
];

export const CycleGuideView: React.FC<CycleGuideViewProps> = ({
  onAddGuideItem,
  onNavigateToList,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeItem, setActiveItem] = useState<ReplacementGuideItem | null>(null);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const filteredGuides = useMemo(() => {
    return REPLACEMENT_GUIDES.filter((item) => {
      const matchCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cycleDisplay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hygieneReason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleAdd = (item: ReplacementGuideItem) => {
    const newItem = mapGuideToPreset(item);
    onAddGuideItem(newItem);
    setAddedItemName(item.title);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center space-x-3">
          <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Vervangingscycli Gids
            </h2>
            <p className="text-xs text-gray-500">
              Aanbevolen cycli, slijtage-indicatoren en onderhoudstips voor 30 zakelijke artikelen
            </p>
          </div>
        </div>

        <div className="relative mt-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Zoek in gids (bijv. toner, filter, batterij, zeep)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {addedItemName && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-3 text-white shadow-md transition">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-xs font-medium">
              "{addedItemName}" succesvol toegevoegd aan uw inventaris!
            </span>
          </div>
          <button
            onClick={onNavigateToList}
            className="flex items-center text-xs font-bold underline hover:opacity-80"
          >
            Bekijken in lijst <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setActiveItem(guide)}
            className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-105 transition-transform overflow-hidden">
                    <GuideIllustration
                      guideId={guide.id}
                      title={guide.title}
                      categoryLabel={guide.categoryLabel}
                    />
                  </div>
                  <div>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                      {guide.categoryLabel}
                    </span>
                    <h3 className="mt-1 font-bold text-gray-800 text-sm group-hover:text-emerald-700">
                      {guide.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold">
                <Clock className="h-3.5 w-3.5" />
                <span>Cyclus: {guide.cycleDisplay}</span>
              </div>

              <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                {guide.hygieneReason}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-xs font-semibold text-emerald-600 group-hover:underline">
                Details bekijken
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(guide);
                }}
                className="flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Toevoegen
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 overflow-hidden">
                  <GuideIllustration
                    guideId={activeItem.id}
                    title={activeItem.title}
                    categoryLabel={activeItem.categoryLabel}
                  />
                </div>
                <div>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {activeItem.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">
                    {activeItem.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5">
                <span className="flex items-center text-xs font-bold text-emerald-900">
                  <Clock className="mr-1.5 h-4 w-4 text-emerald-600" />
                  Aanbevolen vervangingscyclus
                </span>
                <p className="mt-1 text-sm font-semibold text-emerald-800">
                  {activeItem.cycleDisplay} ({activeItem.cycleDays} dagen)
                </p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3.5">
                <span className="flex items-center text-xs font-bold text-amber-900">
                  <AlertTriangle className="mr-1.5 h-4 w-4 text-amber-600" />
                  Tekenen van slijtage & noodzaak tot vervanging
                </span>
                <ul className="mt-1.5 list-disc pl-4 text-xs text-amber-900 space-y-1">
                  {activeItem.signsOfDegradation.map((sign, idx) => (
                    <li key={idx}>{sign}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5">
                <span className="flex items-center text-xs font-bold text-blue-900">
                  <Lightbulb className="mr-1.5 h-4 w-4 text-blue-600" />
                  Onderhoudsadvies & Beste praktijken
                </span>
                <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                  {activeItem.proTips}
                </p>
              </div>
            </div>

            <div className="flex justify-between border-t pt-4">
              <button
                onClick={() => setActiveItem(null)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Sluiten
              </button>
              <button
                onClick={() => {
                  handleAdd(activeItem);
                  setActiveItem(null);
                }}
                className="flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Toevoegen aan voorraad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
