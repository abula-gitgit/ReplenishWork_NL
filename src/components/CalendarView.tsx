import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check } from 'lucide-react';
import { CalculatedItem } from '../types/consumable';
import { getCalendarGrid, formatDateDutch } from '../utils/dateCalc';

interface CalendarViewProps {
  items: CalculatedItem[];
  onQuickReplace: (item: CalculatedItem) => void;
  onEdit: (item: CalculatedItem) => void;
}

const WEEKDAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'December',
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  items,
  onQuickReplace,
  onEdit,
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    today.toISOString().split('T')[0]
  );

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = getCalendarGrid(currentYear, currentMonth);

  const itemsMapByDate = React.useMemo(() => {
    const map = new Map<string, CalculatedItem[]>();
    items.forEach((item) => {
      const d = item.nextReplacementDate;
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(item);
    });
    return map;
  }, [items]);

  const selectedDateItems = itemsMapByDate.get(selectedDate) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between pb-4">
          <h2 className="flex items-center text-lg font-bold text-gray-800">
            <CalendarIcon className="mr-2 h-5 w-5 text-emerald-600" />
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={prevMonth}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
              title="Vorige maand"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setCurrentYear(today.getFullYear());
                setCurrentMonth(today.getMonth());
                setSelectedDate(today.toISOString().split('T')[0]);
              }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
            >
              Vandaag
            </button>
            <button
              onClick={nextMonth}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
              title="Volgende maand"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 py-2 border-b">
          {WEEKDAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {calendarDays.map((dayObj, index) => {
            const dateStr = dayObj.dateStr;
            const isSelected = dateStr === selectedDate;
            const isCurrentMonth = dayObj.isCurrentMonth;
            const dayItems = itemsMapByDate.get(dateStr) || [];
            const hasUrgent = dayItems.some(
              (i) => i.urgency === 'critical' || i.urgency === 'warning'
            );

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(dateStr)}
                className={`relative flex min-h-[70px] flex-col items-center rounded-xl p-1.5 text-xs transition ${
                  isSelected
                    ? 'bg-emerald-50 ring-2 ring-emerald-500'
                    : isCurrentMonth
                    ? 'hover:bg-gray-50'
                    : 'opacity-40 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-medium ${
                    dateStr === today.toISOString().split('T')[0]
                      ? 'bg-emerald-600 font-bold text-white'
                      : isSelected
                      ? 'text-emerald-700 font-bold'
                      : 'text-gray-700'
                  }`}
                >
                  {dayObj.day}
                </span>

                {dayItems.length > 0 && (
                  <div className="mt-1 flex flex-col items-center gap-0.5">
                    <span
                      className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                        hasUrgent
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {dayItems.length} {dayItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-base font-bold text-gray-800">
          Geplande vervangingen op {formatDateDutch(selectedDate)}
        </h3>

        {selectedDateItems.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            Geen verbruiksartikelen gepland voor vervanging op deze datum.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-gray-100">
            {selectedDateItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.category} • Locatie: {item.location} • Voorraad:{' '}
                    {item.quantity} {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onQuickReplace(item)}
                    className="flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                  >
                    <Check className="mr-1 h-3.5 w-3.5" />
                    Vervangen
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Bewerken
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
