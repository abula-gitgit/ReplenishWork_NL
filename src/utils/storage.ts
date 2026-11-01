import { ConsumableItem } from '../types/consumable';
import { SAMPLE_ITEMS } from './sampleData';

const STORAGE_KEY = 'replenish_work_nl_items_v1';

export function loadItems(): ConsumableItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveItems(SAMPLE_ITEMS);
      return SAMPLE_ITEMS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : SAMPLE_ITEMS;
  } catch (error) {
    console.error('Fout bij laden van artikelen:', error);
    return SAMPLE_ITEMS;
  }
}

export function saveItems(items: ConsumableItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Fout bij opslaan van artikelen:', error);
  }
}

export function exportBackup(items: ConsumableItem[]) {
  const dataStr = JSON.stringify(items, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const now = new Date().toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `replenish_work_nl_backup_${now}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importBackup(file: File): Promise<ConsumableItem[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          resolve(parsed);
        } else {
          reject(new Error('Het bestand bevat geen geldige artikellijst.'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Fout bij lezen van bestand.'));
    reader.readAsText(file);
  });
}
