import React, { useState } from 'react';
import { X, Bell, BellRing } from 'lucide-react';
import { requestNotificationPermission, notifyUrgentItems } from '../utils/notifications';
import { CalculatedItem } from '../types/consumable';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CalculatedItem[];
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  if (!isOpen) return null;

  const handleRequest = async () => {
    const granted = await requestNotificationPermission();
    setPermission(granted ? 'granted' : 'denied');
    if (granted) {
      notifyUrgentItems(items);
    }
  };

  const handleTest = () => {
    notifyUrgentItems(items);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Meldingsinstellingen
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-800">
              Browsernotificaties
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Ontvang meldingen over artikelen waarvan de vervaldatum nadert of die direct vervangen moeten worden.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Status:{' '}
                <span
                  className={
                    permission === 'granted'
                      ? 'font-bold text-emerald-600'
                      : permission === 'denied'
                      ? 'font-bold text-red-600'
                      : 'font-bold text-amber-600'
                  }
                >
                  {permission === 'granted'
                    ? 'Ingeschakeld'
                    : permission === 'denied'
                    ? 'Geweigerd'
                    : 'Niet geconfigureerd'}
                </span>
              </span>
              {permission !== 'granted' && (
                <button
                  onClick={handleRequest}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  Toestemming vragen
                </button>
              )}
            </div>
          </div>

          {permission === 'granted' && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <h3 className="flex items-center text-sm font-semibold text-emerald-900">
                <BellRing className="mr-2 h-4 w-4 text-emerald-600" />
                Melding testen
              </h3>
              <p className="mt-1 text-xs text-emerald-700">
                Stuur direct een testmelding voor urgente artikelen.
              </p>
              <button
                onClick={handleTest}
                className="mt-3 w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
              >
                Testmelding verzenden
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 border-t pt-4 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
