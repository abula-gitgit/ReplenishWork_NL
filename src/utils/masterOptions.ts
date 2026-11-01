export interface MasterOptions {
  locations: string[];
  units: string[];
}

const STORAGE_KEY = 'replenish_work_nl_master_options_v1';

export const DEFAULT_LOCATIONS = [
  'Hoofdmagazijn',
  'Kantoor / Werkplek',
  'Keuken / Kantine',
  'Rustruimte',
  'Toilet / Wasruimte',
  'Balie / Receptie',
  'Werkplaats / Technische dienst',
  'Behandelkamer / Praktijkruimte',
];

export const DEFAULT_UNITS = [
  'stuks',
  'pakken',
  'flessen',
  'dozen',
  'rollen',
  'liters',
  'kg',
  'sets',
];

export function getMasterOptions(): MasterOptions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        locations: Array.isArray(parsed.locations) && parsed.locations.length > 0 ? parsed.locations : DEFAULT_LOCATIONS,
        units: Array.isArray(parsed.units) && parsed.units.length > 0 ? parsed.units : DEFAULT_UNITS,
      };
    }
  } catch (e) {
    console.error('Fout bij laden van stamgegevens', e);
  }
  return { locations: DEFAULT_LOCATIONS, units: DEFAULT_UNITS };
}

export function saveMasterOptions(options: MasterOptions): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
  } catch (e) {
    console.error('Fout bij opslaan van stamgegevens', e);
  }
}
