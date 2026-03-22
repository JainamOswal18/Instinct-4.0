'use client';

import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { mockEnergyData } from '@/lib/mock-data';
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  consumption: {
    label: "Consumption (kWh)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function EnergyChart() {
  const [data, setData] = useState(mockEnergyData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const lastTime = currentData[currentData.length - 1].time;
        const [hours, minutes] = lastTime.split(':').map(Number);
        const nextDate = new Date();
        nextDate.setHours(hours);
        nextDate.setMinutes(minutes + 5);
        
        const newDataPoint = {
          time: nextDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          consumption: Number((Math.random() * 5 + 2).toFixed(1)),
        };
        const updatedData = [...currentData.slice(1), newDataPoint];
        return updatedData;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Energy Consumption</CardTitle>
        <CardDescription>Live usage data from your smart meter (updated every 5s)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
           <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-consumption)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-consumption)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
              <YAxis unit="kWh" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
              <Tooltip
                cursor={{ stroke: "hsl(var(--accent))", strokeWidth: 1, strokeDasharray: "3 3" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area type="monotone" dataKey="consumption" stroke="var(--color-consumption)" fill="url(#colorConsumption)" />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
