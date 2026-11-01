export type Category =
  | 'Kantoor & Schrijfwaren'
  | 'Hygiëne & Schoonmaak'
  | 'Keuken & Kantine'
  | 'Medisch & Zorg'
  | 'Schoonheid & Wellness'
  | 'Werkplaats & Onderhoud'
  | 'Horeca & Hotel'
  | 'Overig & Speciaal';

export interface ReplacementHistory {
  id: string;
  replacedAt: string; // ISO String
  cost?: number;
  note?: string;
  previousDaysUsed?: number;
}

export interface ConsumableItem {
  id: string;
  name: string;
  category: Category;
  location: string;
  cycleDays: number;
  lastReplacedDate: string; // YYYY-MM-DD
  quantity: number;
  unit: string;
  minQuantity: number;
  cost?: number;
  supplier?: string;
  itemUrl?: string;
  memo?: string;
  orderLeadDays?: number;
  history: ReplacementHistory[];
  isArchived?: boolean;
}

export interface CalculatedItem extends ConsumableItem {
  nextReplacementDate: string;
  daysRemaining: number;
  urgency: 'critical' | 'warning' | 'normal';
  cycleProgressPercent: number;
}

export interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: Omit<ConsumableItem, 'id' | 'history' | 'lastReplacedDate'>[];
}
