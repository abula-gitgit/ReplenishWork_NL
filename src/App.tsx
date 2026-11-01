import React, { useState, useEffect, useMemo } from 'react';
import { ConsumableItem, CalculatedItem, Category } from './types/consumable';
import { loadItems, saveItems } from './utils/storage';
import { calculateItemStatus } from './utils/dateCalc';
import { getMasterOptions, saveMasterOptions, MasterOptions } from './utils/masterOptions';

// Components
import { Header } from './components/Header';
import { UrgentAlertBanner } from './components/UrgentAlertBanner';
import { SummaryCards } from './components/SummaryCards';
import { FilterToolbar } from './components/FilterToolbar';
import { ItemCard } from './components/ItemCard';
import { ItemModal } from './components/ItemModal';
import { BackupModal } from './components/BackupModal';
import { CustomReplaceModal } from './components/CustomReplaceModal';
import { HistoryModal } from './components/HistoryModal';
import { IndustryTemplateModal } from './components/IndustryTemplateModal';
import { MasterOptionModal } from './components/MasterOptionModal';
import { NotificationModal } from './components/NotificationModal';
import { CalendarView } from './components/CalendarView';
import { HistoryTimelineView } from './components/HistoryTimelineView';
import { CycleGuideView } from './components/CycleGuideView';
import { InfoPagesView } from './components/InfoPagesView';
import { BottomNavBar, ActiveTab } from './components/BottomNavBar';
import { Toast, ToastMessage } from './components/Toast';
import { Plus, FolderPlus, Sparkles } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<ConsumableItem[]>([]);
  const [masterOptions, setMasterOptions] = useState<MasterOptions>(getMasterOptions());
  const [activeTab, setActiveTab] = useState<ActiveTab>('list');

  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'critical' | 'warning' | 'normal'>('all');
  const [sortBy, setSortBy] = useState<'urgency' | 'cycle' | 'name' | 'cost'>('urgency');

  // Modals
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ConsumableItem | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [customReplaceTarget, setCustomReplaceTarget] = useState<CalculatedItem | null>(null);
  const [historyTarget, setHistoryTarget] = useState<CalculatedItem | null>(null);

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const loaded = loadItems();
    setItems(loaded);
  }, []);

  const updateItems = (newItems: ConsumableItem[]) => {
    setItems(newItems);
    saveItems(newItems);
  };

  const calculatedItems = useMemo(() => {
    return items.map((it) => calculateItemStatus(it));
  }, [items]);

  const urgentItems = useMemo(() => {
    return calculatedItems.filter((i) => i.urgency === 'critical' || i.urgency === 'warning');
  }, [calculatedItems]);

  const displayItems = useMemo(() => {
    let result = calculatedItems;

    if (statusFilter !== 'all') {
      result = result.filter((it) => it.urgency === statusFilter);
    }

    if (selectedCategory !== 'all') {
      result = result.filter((it) => it.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      result = result.filter((it) => it.location === selectedLocation);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q) ||
          it.location.toLowerCase().includes(q) ||
          (it.memo && it.memo.toLowerCase().includes(q))
      );
    }

    const sorted = [...result];
    sorted.sort((a, b) => {
      if (sortBy === 'urgency') {
        const order = { critical: 0, warning: 1, normal: 2 };
        if (order[a.urgency] !== order[b.urgency]) {
          return order[a.urgency] - order[b.urgency];
        }
        return a.daysRemaining - b.daysRemaining;
      }
      if (sortBy === 'cycle') {
        return a.cycleDays - b.cycleDays;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'nl');
      }
      if (sortBy === 'cost') {
        return (b.cost || 0) - (a.cost || 0);
      }
      return 0;
    });

    return sorted;
  }, [calculatedItems, statusFilter, selectedCategory, selectedLocation, searchQuery, sortBy]);

  // Handlers
  const handleSaveItem = (itemData: Partial<ConsumableItem>) => {
    if (editingItem) {
      const updated = items.map((it) =>
        it.id === editingItem.id ? ({ ...it, ...itemData } as ConsumableItem) : it
      );
      updateItems(updated);
      addToast(`"${itemData.name || editingItem.name}" succesvol bijgewerkt.`, 'success');
    } else {
      const newItem: ConsumableItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: itemData.name || 'Nieuw artikel',
        category: itemData.category || 'Kantoor & Schrijfwaren',
        location: itemData.location || masterOptions.locations[0] || 'Kantoor',
        unit: itemData.unit || 'stuks',
        cycleDays: Number(itemData.cycleDays) || 30,
        lastReplacedDate: itemData.lastReplacedDate || new Date().toISOString().split('T')[0],
        quantity: Number(itemData.quantity) || 1,
        minQuantity: Number(itemData.minQuantity) || 1,
        cost: itemData.cost ? Number(itemData.cost) : undefined,
        supplier: itemData.supplier,
        itemUrl: itemData.itemUrl,
        memo: itemData.memo,
        history: [],
      };
      updateItems([newItem, ...items]);
      addToast(`"${newItem.name}" toegevoegd aan inventaris.`, 'success');
    }
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    const target = items.find((it) => it.id === id);
    const confirmMsg = target
      ? `Weet u zeker dat u "${target.name}" wilt verwijderen?`
      : 'Weet u zeker dat u dit artikel wilt verwijderen?';
    if (window.confirm(confirmMsg)) {
      const updated = items.filter((it) => it.id !== id);
      updateItems(updated);
      addToast('Artikel verwijderd.', 'info');
    }
  };

  const handleQuickReplace = (item: CalculatedItem) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      replacedAt: todayStr,
      note: 'Snelle vervanging uitgevoerd',
      cost: item.cost,
    };

    const updated = items.map((it) => {
      if (it.id === item.id) {
        return {
          ...it,
          lastReplacedDate: todayStr,
          history: [newHistoryEntry, ...(it.history || [])],
        };
      }
      return it;
    });

    updateItems(updated);
    addToast(`"${item.name}" als vervangen geregistreerd. Cyclus opnieuw gestart!`, 'success');
  };

  const handleCustomReplaceConfirm = (
    itemId: string,
    replacedDate: string,
    cost?: number,
    note?: string
  ) => {
    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      replacedAt: replacedDate,
      cost,
      note: note || 'Aangepaste vervanging geregistreerd',
    };

    const updated = items.map((it) => {
      if (it.id === itemId) {
        return {
          ...it,
          lastReplacedDate: replacedDate,
          history: [newHistoryEntry, ...(it.history || [])],
        };
      }
      return it;
    });

    updateItems(updated);
    addToast('Vervangingsregistratie opgeslagen in geschiedenis.', 'success');
  };

  const handleApplyTemplate = (
    templateItems: Omit<ConsumableItem, 'id' | 'history' | 'lastReplacedDate'>[],
    mode: 'append' | 'replace'
  ) => {
    const itemsToAdd: ConsumableItem[] = templateItems.map((ti) => ({
      ...ti,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      lastReplacedDate: new Date().toISOString().split('T')[0],
      history: [],
    }));

    if (mode === 'replace') {
      updateItems(itemsToAdd);
      addToast(
        `Inventaris vervangen door sjabloon (${itemsToAdd.length} artikelen).`,
        'success'
      );
    } else {
      updateItems([...itemsToAdd, ...items]);
      addToast(
        `${itemsToAdd.length} artikelen uit sjabloon toegevoegd.`,
        'success'
      );
    }
  };

  const handleAddGuideItem = (item: ConsumableItem) => {
    const newItem: ConsumableItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      lastReplacedDate: new Date().toISOString().split('T')[0],
      history: [],
    };
    updateItems([newItem, ...items]);
    addToast(`"${newItem.name}" toegevoegd uit gids.`, 'success');
  };

  const handleSaveMasterOptions = (newOptions: MasterOptions) => {
    setMasterOptions(newOptions);
    saveMasterOptions(newOptions);
    addToast('Opties succesvol bijgewerkt.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-24 md:pb-8">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenNewItem={() => {
          setEditingItem(null);
          setIsItemModalOpen(true);
        }}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onOpenMasterOptions={() => setIsMasterModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenNotification={() => setIsNotificationModalOpen(true)}
        urgentCount={urgentItems.length}
      />

      <div className="flex-1">
        <UrgentAlertBanner
          urgentItems={urgentItems}
          onQuickReplace={handleQuickReplace}
          onFilterUrgent={() => setStatusFilter('critical')}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'list' && (
            <div>
              <SummaryCards
                items={calculatedItems}
                onFilterChange={setStatusFilter}
                activeStatus={statusFilter}
              />

              <FilterToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                availableLocations={masterOptions.locations}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {displayItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    Geen artikelen gevonden
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    {searchQuery || selectedCategory !== 'all' || statusFilter !== 'all'
                      ? 'Er zijn geen artikelen die aan de geselecteerde filters voldoen.'
                      : 'Begin met het toevoegen van artikelen voor uw bedrijf of kies een branche-sjabloon.'}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
                    >
                      <FolderPlus className="w-4 h-4" />
                      <span>Branche-sjabloon laden</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setIsItemModalOpen(true);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nieuw artikel registreren</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onQuickReplace={handleQuickReplace}
                      onCustomReplace={(it) => setCustomReplaceTarget(it)}
                      onEdit={(it) => {
                        setEditingItem(it);
                        setIsItemModalOpen(true);
                      }}
                      onDelete={handleDeleteItem}
                      onOpenHistory={(it) => setHistoryTarget(it)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              items={calculatedItems}
              onQuickReplace={handleQuickReplace}
              onEdit={(it) => {
                setEditingItem(it);
                setIsItemModalOpen(true);
              }}
            />
          )}

          {activeTab === 'timeline' && (
            <HistoryTimelineView items={items} />
          )}

          {activeTab === 'guide' && (
            <CycleGuideView
              onAddGuideItem={handleAddGuideItem}
              onNavigateToList={() => setActiveTab('list')}
            />
          )}

          {activeTab === 'info' && (
            <InfoPagesView onNavigateToList={() => setActiveTab('list')} />
          )}
        </main>
      </div>

      <footer className="mt-12 py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Replenish for Work (Nederlandse editie)
          </p>
          <p className="text-[11px] text-slate-400">
            Slim beheer van verbruiksartikelen, inventaris en vervanging voor bedrijven en professionals.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2 text-[11px]">
            <button onClick={() => setActiveTab('info')} className="hover:text-emerald-600 transition">
              Over de app
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('info')} className="hover:text-emerald-600 transition">
              Privacybeleid
            </button>
            <span>·</span>
            <a href="https://rpw.easy-log.app/nl" className="hover:text-emerald-600 transition">
              Meertalig portaal
            </a>
          </div>
        </div>
      </footer>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        urgentCount={urgentItems.length}
      />

      <ItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialItem={editingItem}
        locations={masterOptions.locations}
        units={masterOptions.units}
      />

      <IndustryTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onApply={handleApplyTemplate}
      />

      <MasterOptionModal
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        options={masterOptions}
        onSave={handleSaveMasterOptions}
      />

      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        items={items}
        onRestore={(restored) => {
          updateItems(restored);
          addToast('Gegevens succesvol hersteld.', 'success');
        }}
      />

      <CustomReplaceModal
        isOpen={!!customReplaceTarget}
        onClose={() => setCustomReplaceTarget(null)}
        item={customReplaceTarget}
        onConfirm={handleCustomReplaceConfirm}
      />

      <HistoryModal
        isOpen={!!historyTarget}
        onClose={() => setHistoryTarget(null)}
        item={historyTarget}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        items={calculatedItems}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
