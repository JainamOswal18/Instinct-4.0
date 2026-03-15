'use client';

import { useEffect, useState, type ElementType } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Activity, TowerControl, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';
import { fetchCurrentUserProfile, fetchGridInsights, fetchUserProperties } from '@/lib/customer-api';
import { fetchAdminProperties } from '@/lib/admin-api';
import { getSession } from '@/lib/auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ChartConfig } from "@/components/ui/chart";

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
    const { toast } = useToast();
    const [gridStats, setGridStats] = useState<Array<{ label: string; value: string; status: string; icon: ElementType }>>([]);
    const [gridEvents, setGridEvents] = useState<Array<{ id: string; timestamp: string; description: string; severity: string }>>([]);
    const [demandData, setDemandData] = useState<Array<{ time: string; demand: number }>>([]);
    const [propertyOptions, setPropertyOptions] = useState<Array<{ id: string; name: string; address: string }>>([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
    const [isAdminView, setIsAdminView] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                const session = getSession();
                const adminRole = session?.role === 'ADMIN' || session?.role === 'EXECUTIVE';
                setIsAdminView(adminRole);

                if (adminRole) {
                    const result = await fetchAdminProperties();
                    const options = result.properties.map((property) => ({
                        id: property.id,
                        name: property.name,
                        address: property.address,
                    }));
                    setPropertyOptions(options);
                    setSelectedPropertyId(options[0]?.id ?? '');
                    if (options.length === 0) {
                        toast({
                            title: 'No properties available',
                            description: 'No customer properties found for admin view.',
                        });
                    }
                    return;
                }

                const profile = await fetchCurrentUserProfile();
                let propertyId = profile.currentPropertyId;

                if (!propertyId) {
                    const propertyResult = await fetchUserProperties();
                    const options = propertyResult.properties.map((property) => ({
                        id: property.id,
                        name: property.name,
                        address: property.address,
                    }));
                    setPropertyOptions(options);
                    propertyId = options[0]?.id ?? null;
                }

                setSelectedPropertyId(propertyId ?? '');
                if (!propertyId) {
                    toast({
                        title: 'No property found',
                        description: 'Add a property to view grid insights.',
                    });
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Failed to initialize grid insights',
                    description: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };

        initialize();
    }, []);

    useEffect(() => {
        const loadInsights = async () => {
            if (!selectedPropertyId) {
                setGridStats([]);
                setGridEvents([]);
                setDemandData([]);
                return;
            }

            try {
                const result = await fetchGridInsights(selectedPropertyId);
                setGridStats([
                    { label: 'Grid Frequency', value: `${result.stats.gridFrequency.toFixed(2)} Hz`, status: 'Stable', icon: Activity },
                    { label: 'Voltage Level', value: `${result.stats.voltageLevel.toFixed(1)} kV`, status: 'Normal', icon: TowerControl },
                    { label: 'Current Load', value: `${result.stats.currentLoad.toFixed(2)} GW`, status: 'Live', icon: AlertCircle },
                    { label: 'DISCOM Status', value: result.stats.discomStatus, status: 'Live', icon: CheckCircle },
                ]);
                setGridEvents(result.events);
                setDemandData(result.demandSeries);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Failed to load grid insights',
                    description: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };

        loadInsights();
    }, [selectedPropertyId]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Grid Status</h1>
        <p className="text-muted-foreground">View real-time grid information and DISCOM integration status.</p>
      </div>

            {isAdminView && propertyOptions.length > 0 && (
                <div className="max-w-md">
                    <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                            {propertyOptions.map((property) => (
                                <SelectItem key={property.id} value={property.id}>
                                    {property.name} · {property.address}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

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
                                        {new Date(event.timestamp).toLocaleString()}
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
