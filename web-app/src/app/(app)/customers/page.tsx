'use client';

import { useState, useEffect } from 'react';
import {
  fetchProviderConsumptionAggregate,
  fetchProviderCustomers,
  fetchProviderPayments,
  fetchProviderRevenueOverview,
} from '@/lib/provider-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Zap, IndianRupee, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';

type CustomerConsumption = {
  customerName: string;
  propertyId: string;
  serviceTitle: string;
  planName: string;
  planThreshold: number;
  monthlyConsumption: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  lastPaymentDate: string;
};

type CustomerPayment = {
  id: string;
  customerName: string;
  serviceTitle: string;
  planName: string;
  monthlyAmount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate: string;
  month: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerConsumption[]>([]);
  const [payments, setPayments] = useState<CustomerPayment[]>([]);
  const [revenue, setRevenue] = useState({ totalMRR: 0, totalPaid: 0, totalOutstanding: 0, overdueCount: 0, paidCount: 0, collectionRate: 0 });
  const [totals, setTotals] = useState({ totalKwhServed: 0, customersExceedingThreshold: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [customerData, paymentData, revenueData, aggregate] = await Promise.all([
          fetchProviderCustomers(),
          fetchProviderPayments(),
          fetchProviderRevenueOverview(),
          fetchProviderConsumptionAggregate(),
        ]);

        setCustomers(
          customerData.customers.map((item) => ({
            customerName: item.name,
            propertyId: item.propertyId,
            serviceTitle: item.serviceTitle,
            planName: item.planName,
            planThreshold: item.planThreshold,
            monthlyConsumption: item.monthlyConsumption,
            paymentStatus: item.paymentStatus,
            lastPaymentDate: item.lastPaymentDate || '',
          })),
        );

        setPayments(
          paymentData.payments.map((item) => ({
            id: item.billId,
            customerName: item.customerName,
            serviceTitle: 'Energy Service',
            planName: 'Active Plan',
            monthlyAmount: item.amount,
            status: item.status,
            dueDate: item.dueDate,
            paidDate: item.paidDate || '',
            month: item.month,
          })),
        );

        setRevenue({
          totalMRR: revenueData.totalMRR,
          totalPaid: revenueData.paidThisMonth,
          totalOutstanding: revenueData.totalOutstanding,
          overdueCount: revenueData.overdueCount,
          paidCount: paymentData.payments.filter((item) => item.status === 'paid').length,
          collectionRate: revenueData.collectionRate,
        });

        setTotals({
          totalKwhServed: aggregate.totalKwhServed,
          customersExceedingThreshold: aggregate.customersExceedingThreshold,
        });
      } catch {
        setCustomers([]);
        setPayments([]);
      }
    };

    loadData().catch(() => undefined);
  }, []);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const totalKwh = totals.totalKwhServed;
  const exceedingThreshold = totals.customersExceedingThreshold;

  const paymentBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge variant="outline" className="text-green-500 border-green-500">Paid</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Customers</h1>
        <p className="text-muted-foreground">Monitor consumption and payment status for all active customers.</p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total kWh Served</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKwh.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month (est.)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatINR(revenue.totalMRR)}</div>
            <p className="text-xs text-muted-foreground">{revenue.collectionRate}% collected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{formatINR(revenue.totalOutstanding)}</div>
            <p className="text-xs text-muted-foreground">{revenue.overdueCount} overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exceeding Threshold</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{exceedingThreshold}</div>
            <p className="text-xs text-muted-foreground">Over plan limit</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="consumption" className="w-full">
        <TabsList>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="payments">Payments & Revenue</TabsTrigger>
        </TabsList>

        {/* Tab: Consumption */}
        <TabsContent value="consumption" className="space-y-4 mt-4">
          {customers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No active customers with live installations yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {customers.map((cust) => {
                const usagePercent = Math.round((cust.monthlyConsumption / cust.planThreshold) * 100);
                const exceeds = cust.monthlyConsumption > cust.planThreshold;
                return (
                  <Card key={cust.customerName} className={exceeds ? 'border-red-500/50' : ''}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{cust.customerName}</CardTitle>
                        {exceeds && <Badge variant="destructive" className="text-[10px]">Over Limit</Badge>}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Zap className="h-3 w-3" /> {cust.serviceTitle} — {cust.planName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Usage</span>
                        <span className="font-semibold">{cust.monthlyConsumption} <span className="text-muted-foreground font-normal">/ {cust.planThreshold} kWh</span></span>
                      </div>
                      <Progress value={Math.min(usagePercent, 100)} className={`h-2 ${exceeds ? '[&>div]:bg-red-500' : ''}`} />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{usagePercent}% of plan</span>
                        {paymentBadge(cust.paymentStatus)}
                      </div>

                      <div className="pt-2 border-t text-xs text-muted-foreground">
                        Last payment: {cust.lastPaymentDate || 'N/A'}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Tab: Payments & Revenue */}
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>Monthly payment collection status for all customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id} className={p.status === 'overdue' ? 'bg-red-500/5' : ''}>
                      <TableCell className="font-medium">{p.customerName}</TableCell>
                      <TableCell>{p.serviceTitle}</TableCell>
                      <TableCell>{p.planName}</TableCell>
                      <TableCell className="font-semibold">{formatINR(p.monthlyAmount)}</TableCell>
                      <TableCell>{p.month}</TableCell>
                      <TableCell>{p.dueDate}</TableCell>
                      <TableCell>{p.paidDate || <span className="text-muted-foreground">—</span>}</TableCell>
                      <TableCell>{paymentBadge(p.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
