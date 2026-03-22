'use client';

import { useState, useEffect } from 'react';
import {
  fetchProviderAlerts,
  dismissProviderAlert,
  dismissAllProviderAlerts,
  type ProviderAlert,
  type ProviderAlertSeverity,
  type ProviderAlertType,
} from '@/lib/provider-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Zap,
  CreditCard,
  Cpu,
  Clock,
  FileText,
  RefreshCcw,
} from 'lucide-react';

const severityConfig: Record<ProviderAlertSeverity, { icon: typeof AlertTriangle; color: string; bg: string }> = {
  critical: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/30' },
  info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/30' },
};

const typeConfig: Record<ProviderAlertType, { icon: typeof Zap; label: string; color: string }> = {
  'new-request': { icon: Zap, label: 'New Request', color: 'text-blue-500' },
  'payment-overdue': { icon: CreditCard, label: 'Payment Overdue', color: 'text-orange-500' },
  'equipment-failure': { icon: Cpu, label: 'Equipment', color: 'text-red-500' },
  'sla-breach': { icon: Clock, label: 'SLA Breach', color: 'text-red-500' },
  'contract-renewal': { icon: RefreshCcw, label: 'Contract', color: 'text-amber-500' },
  'ticket': { icon: FileText, label: 'Ticket', color: 'text-purple-500' },
};

export default function ProviderAlertsPage() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<ProviderAlert[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const loadData = async () => {
    try {
      const [active, dismissed] = await Promise.all([
        fetchProviderAlerts({ dismissed: false }),
        fetchProviderAlerts({ dismissed: true }),
      ]);
      setAlerts([...active.alerts, ...dismissed.alerts]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load alerts',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, []);

  const handleDismiss = async (id: string) => {
    try {
      await dismissProviderAlert(id);
      await loadData();
      toast({ title: 'Alert Dismissed' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to dismiss alert',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const handleDismissAll = async (severity?: ProviderAlertSeverity) => {
    try {
      await dismissAllProviderAlerts(severity);
      await loadData();
      toast({ title: 'Alerts Dismissed', description: severity ? `All ${severity} alerts dismissed.` : 'All alerts dismissed.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to dismiss alerts',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const undismissed = alerts.filter((a) => !a.dismissed);
  const criticalCount = undismissed.filter((a) => a.severity === 'critical').length;
  const warningCount = undismissed.filter((a) => a.severity === 'warning').length;
  const infoCount = undismissed.filter((a) => a.severity === 'info').length;

  const filteredAlerts = activeTab === 'all'
    ? undismissed
    : undismissed.filter((a) => a.severity === activeTab);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Alerts Center</h1>
          <p className="text-muted-foreground">All notifications and alerts requiring your attention.</p>
        </div>
        {undismissed.length > 0 && (
          <Button variant="outline" onClick={() => handleDismissAll()} className="gap-2">
            <X className="h-4 w-4" />
            Dismiss All ({undismissed.length})
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={`cursor-pointer transition-shadow hover:shadow-md ${activeTab === 'critical' ? 'ring-2 ring-red-500' : ''}`}
              onClick={() => setActiveTab(activeTab === 'critical' ? 'all' : 'critical')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">Requires immediate action</p>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-shadow hover:shadow-md ${activeTab === 'warning' ? 'ring-2 ring-amber-500' : ''}`}
              onClick={() => setActiveTab(activeTab === 'warning' ? 'all' : 'warning')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{warningCount}</div>
            <p className="text-xs text-muted-foreground">Needs attention soon</p>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-shadow hover:shadow-md ${activeTab === 'info' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveTab(activeTab === 'info' ? 'all' : 'info')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Informational</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{infoCount}</div>
            <p className="text-xs text-muted-foreground">For your awareness</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {activeTab === 'all' ? 'All Alerts' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Alerts`}
              {' '}({filteredAlerts.length})
            </CardTitle>
            <CardDescription>Active alerts sorted by most recent.</CardDescription>
          </div>
          {activeTab !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('all')}>
              Show All
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-medium">No active alerts</p>
              <p className="text-sm text-muted-foreground/70">All clear! Check back later.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((alert) => {
                  const sConfig = severityConfig[alert.severity];
                  const tConfig = typeConfig[alert.type];
                  const SeverityIcon = sConfig.icon;
                  const TypeIcon = tConfig.icon;

                  return (
                    <div
                      key={alert.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 transition-all ${sConfig.bg}`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ${sConfig.color}`}>
                        <SeverityIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold">{alert.title}</p>
                          <Badge variant="outline" className={`text-[10px] gap-1 ${tConfig.color}`}>
                            <TypeIcon className="h-3 w-3" />
                            {tConfig.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{timeAgo(alert.createdAt)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleDismiss(alert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dismissed Alerts */}
      {alerts.filter((a) => a.dismissed).length > 0 && (
        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Dismissed ({alerts.filter((a) => a.dismissed).length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts
                .filter((a) => a.dismissed)
                .slice(0, 5)
                .map((alert) => (
                  <div key={alert.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="line-through">{alert.title}</span>
                    <span className="text-xs">— {timeAgo(alert.createdAt)}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
