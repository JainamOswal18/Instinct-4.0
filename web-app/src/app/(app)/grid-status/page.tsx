'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Activity, TowerControl, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from "@/components/ui/chart";

const gridStats = [
    {
        label: "Grid Frequency",
        value: "49.98 Hz",
        status: "Stable",
        icon: Activity,
    },
    {
        label: "Voltage Level",
        value: "230.5 kV",
        status: "Normal",
        icon: TowerControl,
    },
    {
        label: "Current Load",
        value: "1.2 GW",
        status: "High",
        icon: AlertCircle,
    },
    {
        label: "DISCOM Status",
        value: "Connected",
        status: "Good",
        icon: CheckCircle,
    }
];

const gridEvents = [
    {
        id: "EVT-001",
        timestamp: "2024-07-28 14:35:10",
        description: "Voltage dip detected in Sub-grid B",
        severity: "Medium"
    },
    {
        id: "EVT-002",
        timestamp: "2024-07-28 14:30:02",
        description: "Load exceeded 1.1 GW threshold",
        severity: "High"
    },
    {
        id: "EVT-003",
        timestamp: "2024-07-28 13:55:45",
        description: "Frequency stabilized at 49.98 Hz",
        severity: "Low"
    },
    {
        id: "EVT-004",
        timestamp: "2024-07-28 12:10:18",
        description: "Scheduled maintenance on Transformer T-04 complete",
        severity: "Info"
    }
]

const demandData = [
  { time: '08:00', demand: 850 },
  { time: '09:00', demand: 950 },
  { time: '10:00', demand: 1050 },
  { time: '11:00', demand: 1100 },
  { time: '12:00', demand: 1150 },
  { time: '13:00', demand: 1200 },
  { time: '14:00', demand: 1180 },
];

const chartConfig = {
  demand: {
    label: 'Demand (MW)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const getSeverityBadge = (severity: string) => {
    switch(severity.toLowerCase()) {
        case 'high': return 'destructive';
        case 'medium': return 'secondary';
        case 'low': return 'default';
        default: return 'outline';
    }
}

export default function GridStatusPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Grid Status</h1>
        <p className="text-muted-foreground">View real-time grid information and DISCOM integration status.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {gridStats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.status}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
        
        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Hourly Grid Demand</CardTitle>
                    <CardDescription>Demand on the grid over the past few hours.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                        <BarChart data={demandData} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="time"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis unit="MW" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="demand" fill="var(--color-demand)" radius={4} />
                        </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                <CardTitle>Recent Grid Events</CardTitle>
                <CardDescription>A log of notable events on the grid.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Severity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {gridEvents.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>
                                    <div className="font-medium">{event.description}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {event.timestamp}
                                    </div>

                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={getSeverityBadge(event.severity)}>
                                        {event.severity}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
