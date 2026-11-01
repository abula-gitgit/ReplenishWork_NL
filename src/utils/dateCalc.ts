import { ConsumableItem, CalculatedItem } from '../types/consumable';

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function getDaysDifference(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateItemStatus(item: ConsumableItem): CalculatedItem {
  const nextReplacementDate = addDays(item.lastReplacedDate, item.cycleDays);
  const todayStr = new Date().toISOString().split('T')[0];
  const daysRemaining = getDaysDifference(nextReplacementDate, todayStr);

  let urgency: 'critical' | 'warning' | 'normal' = 'normal';
  if (daysRemaining <= 0 || item.quantity <= item.minQuantity) {
    urgency = 'critical';
  } else if (daysRemaining <= (item.orderLeadDays || 3)) {
    urgency = 'warning';
  }

  const daysElapsed = item.cycleDays - daysRemaining;
  const cycleProgressPercent = Math.min(
    100,
    Math.max(0, Math.round((daysElapsed / item.cycleDays) * 100))
  );

  return {
    ...item,
    nextReplacementDate,
    daysRemaining,
    urgency,
    cycleProgressPercent,
  };
}

export function formatDateDutch(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}-${m}-${y}`;
}

export function formatRelativeDaysDutch(daysRemaining: number): string {
  if (daysRemaining < 0) {
    return `${Math.abs(daysRemaining)} dagen verlopen!`;
  }
  if (daysRemaining === 0) {
    return 'Vandaag vervangen!';
  }
  if (daysRemaining === 1) {
    return 'Morgen';
  }
  return `Over ${daysRemaining} dagen`;
}

export function getCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday is day 0, Sunday is day 6
  let startingDayOfWeek = firstDay.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const totalDays = lastDay.getDate();
  const days: { day: number; dateStr: string; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const prevDate = new Date(year, month - 1, d);
    days.push({
      day: d,
      dateStr: prevDate.toISOString().split('T')[0],
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const curDate = new Date(year, month, i);
    days.push({
      day: i,
      dateStr: curDate.toISOString().split('T')[0],
      isCurrentMonth: true,
    });
  }

  // Next month padding
  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      day: i,
      dateStr: nextDate.toISOString().split('T')[0],
      isCurrentMonth: false,
    });
  }

  return days;
}
