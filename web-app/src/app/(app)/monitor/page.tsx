'use client';

import { useState, useEffect } from 'react';
import {
  getSubscribedEnergies,
  getHourlyConsumption,
  getWeeklyConsumption,
  type SubscribedEnergy,
  type ConsumptionReading,
  type DailyConsumption,
} from '@/lib/monitor-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Activity,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Sun,
  Battery,
  Lightbulb,
  Snowflake,
  Car,
  Droplets,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const serviceIcons: Record<string, React.ElementType> = {
  solar: Sun,
  battery: Battery,
  lighting: Lightbulb,
  cooling: Snowflake,
  'ev-charging': Car,
  'water-heating': Droplets,
};

const serviceColors: Record<string, string> = {
  solar: '#f59e0b',
  battery: '#8b5cf6',
  lighting: '#06b6d4',
  cooling: '#3b82f6',
  'ev-charging': '#10b981',
  'water-heating': '#ef4444',
};

export default function MonitorPage() {
  const [subscribed, setSubscribed] = useState<SubscribedEnergy[]>([]);
  const [selectedService, setSelectedService] = useState<SubscribedEnergy | null>(null);
  const [hourlyData, setHourlyData] = useState<ConsumptionReading[]>([]);
  const [weeklyData, setWeeklyData] = useState<DailyConsumption[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setSubscribed(getSubscribedEnergies());
  }, []);

  const openDetail = (energy: SubscribedEnergy) => {
    setSelectedService(energy);
    setHourlyData(getHourlyConsumption(energy.serviceId));
    setWeeklyData(getWeeklyConsumption(energy.serviceId));
    setDialogOpen(true);
  };

  const totalConsumption = subscribed.reduce((s, e) => s + e.currentUsage, 0);
  const avgDaily = subscribed.length > 0
    ? subscribed.reduce((s, e) => s + e.dailyAverage, 0) / subscribed.length
    : 0;
  const peakService = subscribed.length > 0
    ? subscribed.reduce((a, b) => (a.currentUsage > b.currentUsage ? a : b))
    : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30';
      case 'idle': return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
      case 'alert': return 'bg-red-500/15 text-red-500 border-red-500/30';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Energy Monitor</h1>
        <p className="text-muted-foreground">Track real-time consumption of your subscribed energies.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsumption.toFixed(1)} kWh</div>
            <p className="text-xs text-muted-foreground">Across all subscribed energies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribed.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">of {subscribed.length} subscribed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Daily Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDaily.toFixed(1)} kWh</div>
            <p className="text-xs text-muted-foreground">Per service average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Consumer</CardTitle>
            <BarChart3 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{peakService?.serviceTitle || '—'}</div>
            <p className="text-xs text-muted-foreground">{peakService ? `${peakService.currentUsage} kWh` : 'No data'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscribed Energy Cards */}
      {subscribed.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <Activity className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground font-medium">No subscribed energies yet</p>
          <p className="text-sm text-muted-foreground/70">Request a service from the dashboard to start monitoring.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscribed.map((energy) => {
            const Icon = serviceIcons[energy.serviceId] || Zap;
            const color = serviceColors[energy.serviceId] || '#8b5cf6';

            return (
              <Card
                key={energy.serviceId}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
                onClick={() => openDetail(energy)}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color + '20', color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{energy.serviceTitle}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Since {energy.subscribedDate}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(energy.status)}>
                    {energy.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Current</p>
                      <p className="text-lg font-bold" style={{ color }}>{energy.currentUsage}</p>
                      <p className="text-[10px] text-muted-foreground">kWh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Daily Avg</p>
                      <p className="text-lg font-bold">{energy.dailyAverage}</p>
                      <p className="text-[10px] text-muted-foreground">kWh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly</p>
                      <p className="text-lg font-bold">{energy.monthlyEstimate}</p>
                      <p className="text-[10px] text-muted-foreground">kWh est.</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Click for detailed view →
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = serviceIcons[selectedService.serviceId] || Zap;
                    const color = serviceColors[selectedService.serviceId] || '#8b5cf6';
                    return (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: color + '20', color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    );
                  })()}
                  <div>
                    <DialogTitle className="font-headline text-xl">
                      {selectedService.serviceTitle}
                    </DialogTitle>
                    <DialogDescription>
                      Detailed consumption analytics
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Hourly Chart */}
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Today&apos;s Hourly Consumption
                  </h3>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hourlyData}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={serviceColors[selectedService.serviceId] || '#8b5cf6'} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={serviceColors[selectedService.serviceId] || '#8b5cf6'} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="time" className="text-xs" tick={{ fontSize: 10 }} />
                        <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                          formatter={(value: number) => [`${value} kWh`, 'Usage']}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={serviceColors[selectedService.serviceId] || '#8b5cf6'}
                          fill="url(#colorVal)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Weekly Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    Weekly Consumption
                  </h3>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="day" className="text-xs" tick={{ fontSize: 11 }} />
                        <YAxis className="text-xs" tick={{ fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                          formatter={(value: number) => [`${value} kWh`, 'Usage']}
                        />
                        <Bar
                          dataKey="value"
                          fill={serviceColors[selectedService.serviceId] || '#8b5cf6'}
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Current Usage</p>
                    <p className="text-xl font-bold text-primary">{selectedService.currentUsage} kWh</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Daily Average</p>
                    <p className="text-xl font-bold">{selectedService.dailyAverage} kWh</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Monthly Est.</p>
                    <p className="text-xl font-bold">{selectedService.monthlyEstimate} kWh</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
