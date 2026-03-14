// mock/alerts.ts
import { Alert } from '@/types';

export function getAlerts(): Alert[] {
  return [
    {
      id: 'alert_1',
      title: 'High Energy Usage',
      message: 'Your energy consumption is 23% higher than usual today.',
      severity: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: 'alert_2',
      title: 'Solar Peak Detected',
      message: 'Solar generation is at peak. Good time to run heavy appliances.',
      severity: 'info',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    },
    {
      id: 'alert_3',
      title: 'Battery Low',
      message: 'Battery charge below 20%. Consider grid backup.',
      severity: 'critical',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min ago
    },
  ];
}