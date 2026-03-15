'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { adjustAdminBill, fetchAdminBills } from '@/lib/admin-api';
import { API_BASE_URL } from '@/lib/api';
import { getAccessToken } from '@/lib/auth';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);

type AdminBill = {
  billId: string;
  propertyId: string;
  propertyName: string | null;
  propertyAddress: string | null;
  customerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  month: string;
  totalAmount: number;
  usageCharge: number;
  subscriptionFee: number;
  taxes: number;
  status: string;
  dueDate: string;
  paidDate: string | null;
  generatedAt: string;
  pdfUrl: string | null;
};

export default function AdminBillingPage() {
  const { toast } = useToast();
  const [bills, setBills] = useState<AdminBill[]>([]);
  const [billTaxes, setBillTaxes] = useState<Record<string, string>>({});

  const load = async () => {
    try {
      const result = await fetchAdminBills();
      setBills(result.bills);
      setBillTaxes(Object.fromEntries(result.bills.map((bill) => [bill.billId, String(bill.taxes)])));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load bills',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onStatusChange = async (billId: string, status: 'pending' | 'paid') => {
    try {
      await adjustAdminBill(billId, { status });
      await load();
      toast({ title: 'Bill status updated' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Bill status update failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const onTaxUpdate = async (bill: AdminBill) => {
    const taxes = Number(billTaxes[bill.billId]);
    if (Number.isNaN(taxes)) return;

    try {
      await adjustAdminBill(bill.billId, {
        usageCharge: bill.usageCharge,
        subscriptionFee: bill.subscriptionFee,
        taxes,
      });
      await load();
      toast({ title: 'Bill adjusted successfully' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Bill adjustment failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const onDownloadInvoice = async (billId: string) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_BASE_URL}/billing/download/${billId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${billId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({ title: 'Invoice download started' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to download invoice',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin · Billing Ops</h1>
        <p className="text-muted-foreground">Adjust taxes and update invoice status.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bills</CardTitle>
          <CardDescription>{bills.length} bill record(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Taxes</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.billId}>
                  <TableCell>
                    <div className="font-medium">{bill.billId}</div>
                    <div className="text-xs text-muted-foreground">{bill.month}</div>
                    <div className="text-xs text-muted-foreground">Generated: {new Date(bill.generatedAt).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
                    {bill.paidDate && <div className="text-xs text-muted-foreground">Paid: {new Date(bill.paidDate).toLocaleDateString()}</div>}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{bill.customerName || 'Unknown'}</div>
                    <div className="text-xs text-muted-foreground">{bill.customerEmail || bill.customerId || 'No email'}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{bill.propertyName || bill.propertyId}</div>
                    <div className="text-xs text-muted-foreground">{bill.propertyAddress || 'No address'}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatINR(bill.totalAmount)}</div>
                    <div className="text-xs text-muted-foreground">Usage: {formatINR(bill.usageCharge)}</div>
                    <div className="text-xs text-muted-foreground">Subscription: {formatINR(bill.subscriptionFee)}</div>
                    <div className="text-xs text-muted-foreground">Taxes: {formatINR(bill.taxes)}</div>
                  </TableCell>
                  <TableCell>
                    <Select value={bill.status} onValueChange={(value) => onStatusChange(bill.billId, value as 'pending' | 'paid')}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">pending</SelectItem>
                        <SelectItem value="paid">paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={billTaxes[bill.billId] ?? String(bill.taxes)}
                      onChange={(event) => setBillTaxes((prev) => ({ ...prev, [bill.billId]: event.target.value }))}
                      className="w-[120px]"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => onTaxUpdate(bill)}>
                        Save
                      </Button>
                      <Button variant="secondary" onClick={() => onDownloadInvoice(bill.billId)}>
                        View Invoice
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
