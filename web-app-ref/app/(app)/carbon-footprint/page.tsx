'use client';

import { useEffect, useState, type ElementType } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from "@/components/ui/chart";
import { Leaf, Award, Sun, Wind } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchCarbonInsights, fetchCurrentUserProfile } from '@/lib/customer-api';

const chartConfig = {
  saved: {
    label: 'CO₂ Saved (kg)',
    color: 'hsl(var(--chart-1))',
  },
  offset: {
    label: 'CO₂ Offset (kg)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function CarbonFootprintPage() {
  const { toast } = useToast();
  const [chartData, setChartData] = useState<Array<{ month: string; saved: number; offset: number }>>([]);
  const [impactStats, setImpactStats] = useState<Array<{ value: string; label: string; icon: ElementType }>>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await fetchCurrentUserProfile();
        if (!profile.currentPropertyId) {
          setChartData([]);
          setImpactStats([]);
          return;
        }

        const result = await fetchCarbonInsights(profile.currentPropertyId);
        setChartData(result.monthly);
        const reduction = result.stats.totalOffsetKg > 0
          ? Math.round((result.stats.totalSavedKg / result.stats.totalOffsetKg) * 100)
          : 0;

        setImpactStats([
          { value: `${(result.stats.totalSavedKg / 1000).toFixed(2)} Tonnes`, label: 'Total CO₂ Saved', icon: Leaf },
          { value: `${result.stats.equivalentTrees} Trees`, label: 'Equivalent Trees Planted', icon: Award },
          { value: `${Math.round(result.stats.renewableKwh)} kWh`, label: 'Renewable Energy Used', icon: Sun },
          { value: `${reduction}%`, label: 'Reduction in Emissions', icon: Wind },
        ]);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to load carbon insights',
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    load();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Carbon Footprint</h1>
        <p className="text-muted-foreground">Track your environmental impact and savings.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">Since last year</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly CO₂ Savings & Offsets</CardTitle>
          <CardDescription>Your progress in reducing your carbon footprint over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                 <YAxis unit="kg" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="saved" fill="var(--color-saved)" radius={4} />
                <Bar dataKey="offset" fill="var(--color-offset)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
