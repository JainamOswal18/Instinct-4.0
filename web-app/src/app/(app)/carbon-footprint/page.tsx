'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from "@/components/ui/chart";
import { Leaf, Award, Sun, Wind } from 'lucide-react';

const chartData = [
  { month: 'Jan', saved: 186, offset: 80 },
  { month: 'Feb', saved: 305, offset: 200 },
  { month: 'Mar', saved: 237, offset: 120 },
  { month: 'Apr', saved: 173, offset: 190 },
  { month: 'May', saved: 209, offset: 130 },
  { month: 'Jun', saved: 214, offset: 140 },
];

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

const impactStats = [
    {
        value: "1.2 Tonnes",
        label: "Total CO₂ Saved",
        icon: Leaf
    },
    {
        value: "82 Trees",
        label: "Equivalent Trees Planted",
        icon: Award
    },
    {
        value: "1,500 kWh",
        label: "Renewable Energy Used",
        icon: Sun
    },
    {
        value: "25%",
        label: "Reduction in Emissions",
        icon: Wind
    }
]

export default function CarbonFootprintPage() {
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
