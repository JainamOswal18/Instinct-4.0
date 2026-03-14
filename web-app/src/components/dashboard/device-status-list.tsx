import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockDevices } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Server, PlugZap, AlertTriangle, PowerOff } from 'lucide-react';

const statusStyles: { [key: string]: { icon: React.ElementType, color: string, text: string } } = {
  Online: { icon: Server, color: 'bg-green-500', text: 'text-green-500' },
  'Needs Attention': { icon: AlertTriangle, color: 'bg-yellow-500', text: 'text-yellow-500' },
  Offline: { icon: PowerOff, color: 'bg-red-500', text: 'text-red-500' },
};

export default function DeviceStatusList() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Device Status</CardTitle>
        <CardDescription>Health and connectivity of your IoT devices.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockDevices.map((device) => {
            const statusInfo = statusStyles[device.status] || statusStyles.Offline;
            const StatusIcon = statusInfo.icon;

            return (
              <li key={device.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <PlugZap className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{device.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className={cn('h-2 w-2 rounded-full', statusInfo.color)} />
                    <span>{device.status}</span>
                  </div>
                </div>
                <div className="w-24 text-right">
                  <p className="text-sm font-medium">{device.health}% Health</p>
                  <Progress value={device.health} className="h-1.5 mt-1" />
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
