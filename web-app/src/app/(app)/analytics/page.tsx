'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from "@/components/ui/chart";
import { DollarSign, Zap, TrendingUp, Target } from 'lucide-react';

const costSavingData = [
  { month: 'Jan', savings: 400 },
  { month: 'Feb', savings: 300 },
  { month: 'Mar', savings: 500 },
  { month: 'Apr', savings: 450 },
  { month: 'May', savings: 600 },
  { month: 'Jun', savings: 550 },
];

const costSavingChartConfig = {
  savings: {
    label: 'Cost Savings ($)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const consumptionBreakdownData = [
  { name: 'HVAC', value: 45, fill: 'var(--color-hvac)' },
  { name: 'Lighting', value: 25, fill: 'var(--color-lighting)' },
  { name: 'Appliances', value: 20, fill: 'var(--color-appliances)' },
  { name: 'Other', value: 10, fill: 'var(--color-other)' },
];

const consumptionBreakdownChartConfig = {
    hvac: { label: 'HVAC', color: 'hsl(var(--chart-1))' },
    lighting: { label: 'Lighting', color: 'hsl(var(--chart-2))' },
    appliances: { label: 'Appliances', color: 'hsl(var(--chart-3))' },
    other: { label: 'Other', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

const analyticsStats = [
    {
        label: "Total Savings YTD",
        value: "$2,800",
        icon: DollarSign
    },
    {
        label: "Peak Demand Reduction",
        value: "15%",
        icon: Zap
    },
    {
        label: "Energy Efficiency",
        value: "85%",
        icon: TrendingUp
    },
    {
        label: "ROI on Upgrades",
        value: "18%",
        icon: Target
    }
]


export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your energy consumption data.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {analyticsStats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">Compared to last year</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Monthly Cost Savings</CardTitle>
                    <CardDescription>Track the effectiveness of energy-saving measures.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ChartContainer config={costSavingChartConfig} className="h-full w-full">
                            <BarChart data={costSavingData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <YAxis unit="$" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))' }}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Consumption Breakdown</CardTitle>
                    <CardDescription>Energy usage by category this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ChartContainer config={consumptionBreakdownChartConfig} className="h-full w-full">
                            <PieChart>
                                <Tooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie data={consumptionBreakdownData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {consumptionBreakdownData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
