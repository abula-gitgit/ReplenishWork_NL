import { Category } from '../types/consumable';

export const CATEGORIES: Category[] = [
  'Kantoor & Schrijfwaren',
  'Hygiëne & Schoonmaak',
  'Keuken & Kantine',
  'Medisch & Zorg',
  'Schoonheid & Wellness',
  'Werkplaats & Onderhoud',
  'Horeca & Hotel',
  'Overig & Speciaal',
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string; accent: string }> = {
  'Kantoor & Schrijfwaren': {
    bg: 'bg-blue-50 text-blue-700',
    text: 'text-blue-700',
    border: 'border-blue-200',
    accent: '#2563eb',
  },
  'Hygiëne & Schoonmaak': {
    bg: 'bg-emerald-50 text-emerald-700',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    accent: '#059669',
  },
  'Keuken & Kantine': {
    bg: 'bg-amber-50 text-amber-700',
    text: 'text-amber-700',
    border: 'border-amber-200',
    accent: '#d97706',
  },
  'Medisch & Zorg': {
    bg: 'bg-cyan-50 text-cyan-700',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
    accent: '#0891b2',
  },
  'Schoonheid & Wellness': {
    bg: 'bg-rose-50 text-rose-700',
    text: 'text-rose-700',
    border: 'border-rose-200',
    accent: '#e11d48',
  },
  'Werkplaats & Onderhoud': {
    bg: 'bg-orange-50 text-orange-700',
    text: 'text-orange-700',
    border: 'border-orange-200',
    accent: '#ea580c',
  },
  'Horeca & Hotel': {
    bg: 'bg-indigo-50 text-indigo-700',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    accent: '#4f46e5',
  },
  'Overig & Speciaal': {
    bg: 'bg-purple-50 text-purple-700',
    text: 'text-purple-700',
    border: 'border-purple-200',
    accent: '#7c3aed',
  },
};
