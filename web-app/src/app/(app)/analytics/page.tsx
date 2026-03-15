'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminOverview } from '@/lib/admin-api';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [overview, setOverview] = useState<{
    totalUsers: number;
    totalProperties: number;
    openTickets: number;
    totalRevenue: number;
    totalProduction: number;
    totalConsumption: number;
    netOffsetPercent: number;
  } | null>(null);

  useEffect(() => {
    fetchAdminOverview()
      .then((data) => setOverview(data))
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to load analytics',
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      });
  }, []);

  const cards = overview
    ? [
        { label: 'Total Users', value: String(overview.totalUsers) },
        { label: 'Total Properties', value: String(overview.totalProperties) },
        { label: 'Open Tickets', value: String(overview.openTickets) },
        { label: 'Revenue', value: formatINR(overview.totalRevenue) },
        { label: 'Total Production', value: `${overview.totalProduction.toFixed(2)} kWh` },
        { label: 'Total Consumption', value: `${overview.totalConsumption.toFixed(2)} kWh` },
        { label: 'Net Offset', value: `${overview.netOffsetPercent}%` },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Analytics</h1>
        <p className="text-muted-foreground">Platform-level KPI snapshot from live backend data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>KPIs are computed from users, properties, bills, energy stats, and support tickets.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
