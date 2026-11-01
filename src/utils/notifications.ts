import { CalculatedItem } from '../types/consumable';

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    alert('Deze browser ondersteunt geen desktopmeldingen.');
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export function notifyUrgentItems(items: CalculatedItem[]) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const criticalItems = items.filter((i) => i.urgency === 'critical');
  const warningItems = items.filter((i) => i.urgency === 'warning');

  if (criticalItems.length > 0) {
    new Notification('Let op: Verbruiksartikelen direct vervangen!', {
      body: `${criticalItems.length} artikelen vereisen directe vervanging of nabestelling (bijv. ${criticalItems[0].name}).`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
    });
  } else if (warningItems.length > 0) {
    new Notification('Herinnering: Vervangingsdatum nadert', {
      body: `${warningItems.length} artikelen naderen de vervangingsdatum (bijv. ${warningItems[0].name}).`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
    });
  }
}
