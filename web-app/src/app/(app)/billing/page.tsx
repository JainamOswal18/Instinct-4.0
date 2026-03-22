
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  type ApiDraft,
  fetchMyBillingDrafts,
  acceptBillingDraft,
  disputeBillingDraft,
} from '@/lib/customer-api';
import {
  Download, CheckCircle, Zap, ShieldCheck,
  IndianRupee, CalendarClock, CreditCard,
  MessageSquare, ThumbsUp, Clock, Sparkles,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// APPROVED BILL CARD
// ──────────────────────────────────────────────────────────────
function ApprovedBillCard({ bill, onRespond }: { bill: ApiDraft; onRespond: () => void }) {
  const [selectedDuration, setSelectedDuration] = useState<12 | 24 | 36>(12);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const totalMonthly = bill.charges
    ? (bill.charges.subscriptionFee || 0) + (bill.charges.usageCharge || 0) + (bill.charges.taxes || 0)
    : bill.totalAmount;

  const getAdjustedPricing = (duration: 12 | 24 | 36) => {
    const discounts: Record<number, number> = { 12: 0, 24: 0.05, 36: 0.10 };
    const discount = discounts[duration];
    const adjustedMonthly = Math.floor(totalMonthly * (1 - discount));
    const totalAmount = adjustedMonthly * duration;
    return { monthlyFee: adjustedMonthly, totalAmount, discount: discount * 100, baseMonthly: totalMonthly };
  };

  const pricing = getAdjustedPricing(selectedDuration);

  const getStatusBadge = () => {
    switch (bill.status) {
      case 'sent':
        return <Badge className="bg-blue-500/20 text-blue-400 gap-1"><Clock className="h-3 w-3" /> Awaiting Your Response</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500/20 text-green-400 gap-1"><CheckCircle className="h-3 w-3" /> Accepted</Badge>;
      case 'disputed':
        return <Badge variant="destructive" className="gap-1"><MessageSquare className="h-3 w-3" /> Concern Raised</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Provider approval banner */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-lg font-semibold flex items-center gap-2">
              Provider-Approved Custom Plan
              <Badge variant="outline" className="text-[10px] font-normal gap-1">
                <Sparkles className="h-2.5 w-2.5" /> Provider Reviewed
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">
              {bill.description || bill.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Sent on {bill.sentAt ? new Date(bill.sentAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
            </p>
          </div>
          {getStatusBadge()}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Main Plan Card */}
        <Card className="lg:col-span-3 relative overflow-hidden">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              {bill.title}
            </CardTitle>
            <CardDescription>
              Custom billing plan &mdash; Due {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-IN') : 'N/A'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pricing */}
            <div className="rounded-lg border p-5 bg-muted/30">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-headline">{formatINR(totalMonthly)}</span>
                <span className="text-lg text-muted-foreground">/month</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarClock className="h-4 w-4" />
                  <span>Due {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-IN') : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Charge Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Charge Breakdown</h4>
              <div className="space-y-2">
                {bill.charges?.subscriptionFee > 0 && (
                  <div className="flex items-center justify-between py-1 text-sm">
                    <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-muted-foreground" /> Subscription Fee</div>
                    <span className="font-medium">{formatINR(bill.charges.subscriptionFee)}/mo</span>
                  </div>
                )}
                {bill.charges?.usageCharge > 0 && (
                  <div className="flex items-center justify-between py-1 text-sm">
                    <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-muted-foreground" /> Usage Charge</div>
                    <span className="font-medium">{formatINR(bill.charges.usageCharge)}</span>
                  </div>
                )}
                {bill.charges?.taxes > 0 && (
                  <div className="flex items-center justify-between py-1 text-sm">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-muted-foreground" /> Taxes</div>
                    <span className="font-medium">{formatINR(bill.charges.taxes)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Line items if any */}
            {bill.lineItems && bill.lineItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Line Items</h4>
                {bill.lineItems.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 text-sm">
                    <span>{item.label || item.description || `Item ${i + 1}`}</span>
                    {item.amount != null && <span className="font-medium">{formatINR(Number(item.amount))}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {bill.status === 'sent' && (
              <div className="flex gap-3">
                <Button className="flex-1 h-12 text-lg font-semibold gap-2 bg-green-600 hover:bg-green-700" onClick={onRespond}>
                  <ThumbsUp className="h-5 w-5" /> Accept &amp; Proceed to Payment
                </Button>
              </div>
            )}

            {bill.status === 'accepted' && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-500">Plan Accepted</p>
                  <p className="text-sm text-muted-foreground">Payment processing will begin shortly. You&apos;ll receive a confirmation.</p>
                </div>
              </div>
            )}

            {bill.status === 'disputed' && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-destructive" />
                <div>
                  <p className="font-semibold text-destructive">Concern Raised</p>
                  <p className="text-sm text-muted-foreground">A support ticket has been created. Your provider will review your concern.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              Cost Breakdown
            </CardTitle>
            <CardDescription>Provider-approved pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Duration Selector */}
            <div className="flex bg-muted/50 p-1 rounded-lg mt-2">
              {([12, 24, 36] as const).map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedDuration(months)}
                  className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-all ${selectedDuration === months
                    ? 'bg-background shadow-sm text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {months} Mon {months > 12 && <span className="text-[10px] text-green-600 font-bold ml-1">-{months === 24 ? 5 : 10}%</span>}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="space-y-1 py-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Base Monthly</span>
                  <span className={pricing.discount > 0 ? 'line-through text-muted-foreground' : 'font-medium'}>
                    {formatINR(pricing.baseMonthly)}/mo
                  </span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex items-center justify-between text-sm font-medium text-green-500">
                    <span>Duration Discount ({pricing.discount}%)</span>
                    <span>-{formatINR(pricing.baseMonthly - pricing.monthlyFee)}/mo</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between py-3 rounded-lg bg-primary/10 px-3 -mx-3 border border-primary/20">
                <span className="text-sm font-semibold">Net Monthly</span>
                <span className="text-xl font-bold text-primary">{formatINR(pricing.monthlyFee)}<span className="text-sm font-normal">/mo</span></span>
              </div>
              <div className="text-xs text-center text-muted-foreground mt-1">
                Total Contract: <strong>{formatINR(pricing.totalAmount)}</strong> over {selectedDuration} mos
              </div>
            </div>

            <Separator />

            {/* Total amount highlight */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-1">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Total Billed Amount</span>
              </div>
              <p className="text-2xl font-bold">{formatINR(bill.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">Due {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-IN') : 'N/A'}</p>
            </div>

            {/* Raise concern button */}
            {bill.status === 'sent' && (
              <Button variant="outline" className="w-full gap-2 text-muted-foreground" onClick={onRespond}>
                <MessageSquare className="h-4 w-4" /> Have a concern? Raise a ticket
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// MAIN BILLING PAGE
// ──────────────────────────────────────────────────────────────

const paymentMethods = [
  { type: 'Visa', last4: '4242', expiry: '12/24', isPrimary: true },
  { type: 'Mastercard', last4: '5555', expiry: '06/25', isPrimary: false },
];

const pastInvoices = [
  { id: 'INV001', date: '2023-10-01', amount: '₹1,500.00', status: 'Paid' },
  { id: 'INV002', date: '2023-09-01', amount: '₹1,450.00', status: 'Paid' },
  { id: 'INV003', date: '2023-08-01', amount: '₹1,600.00', status: 'Paid' },
  { id: 'INV004', date: '2023-07-01', amount: '₹1,300.00', status: 'Paid' },
];

export default function BillingPage() {
  const { toast } = useToast();
  const [bills, setBills] = useState<ApiDraft[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState<ApiDraft | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  const loadDrafts = useCallback(async () => {
    try {
      const result = await fetchMyBillingDrafts();
      setBills(result.drafts || []);
    } catch {
      setBills([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadDrafts();
    const interval = setInterval(loadDrafts, 15000);
    return () => clearInterval(interval);
  }, [loadDrafts]);

  const handleRespond = (bill: ApiDraft) => {
    setSelectedBill(bill);
    setShowResponseDialog(true);
  };

  const handleAccept = async () => {
    if (!selectedBill || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await acceptBillingDraft(selectedBill.draftId);
      setShowResponseDialog(false);
      setSelectedBill(null);
      await loadDrafts();
      toast({ title: 'Plan Accepted!', description: 'Your billing plan has been confirmed. Payment processing will begin.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message || 'Could not accept plan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDispute = async () => {
    if (!selectedBill || !disputeReason.trim()) {
      toast({ variant: 'destructive', title: 'Please describe your concern', description: 'Enter a reason before submitting.' });
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await disputeBillingDraft(selectedBill.draftId, disputeReason);
      setShowResponseDialog(false);
      setSelectedBill(null);
      setDisputeReason('');
      await loadDrafts();
      toast({ title: 'Concern Raised', description: 'A support ticket has been created. Your provider will review it.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message || 'Could not submit concern.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Billing</h1>
          <p className="text-muted-foreground">Loading your billing information...</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                  <div className="h-20 bg-muted animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const pendingBill = bills.find(b => b.status === 'sent');
  const respondedBills = bills.filter(b => b.status === 'accepted' || b.status === 'disputed');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Billing</h1>
        <p className="text-muted-foreground">
          {pendingBill
            ? 'Your energy provider has approved a custom plan for you. Review it below.'
            : respondedBills.length > 0
              ? 'Your billing plans and payment history.'
              : 'Your billing plan will appear here once your energy provider reviews and approves it after the survey.'}
        </p>
      </div>

      {/* Waiting state */}
      {bills.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">No Billing Plans Yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mt-2">
                Once you submit a service request and your energy provider completes the survey, they will prepare a custom billing plan for you. You&apos;ll be notified when it&apos;s ready.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending bill awaiting user response */}
      {pendingBill && (
        <ApprovedBillCard bill={pendingBill} onRespond={() => handleRespond(pendingBill)} />
      )}

      {/* Already responded bills */}
      {respondedBills.map(bill => (
        <ApprovedBillCard key={bill.draftId} bill={bill} onRespond={() => { }} />
      ))}

      {/* Payment methods & Plan Status */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Your saved payment options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map(method => (
              <div key={method.last4} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <span className="font-medium">{method.type}</span> ending in {method.last4}
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
                {method.isPrimary && <Badge>Primary</Badge>}
              </div>
            ))}
            <Button variant="outline">Add New Payment Method</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{bills.length > 0 ? 'Plan Status' : 'Current Plan'}</CardTitle>
            <CardDescription>
              {bills.length > 0 ? 'Overview of your billing plan status.' : 'You are on a standard energy plan.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{bills.length > 0 ? 'Your plan includes:' : 'Standard plan includes:'}</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Real-time energy monitoring</li>
                <li>AI-powered fault detection</li>
                <li>Advanced analytics &amp; ROI</li>
                <li>Priority chat support</li>
              </ul>
            </div>
            {bills.length === 0 && <Button className="mt-4">Upgrade Plan</Button>}
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Review and download your past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Billing Plan</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Choose how you&apos;d like to proceed with <strong>{selectedBill?.title}</strong>.
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Button
              className="w-full h-14 text-lg gap-2 bg-green-600 hover:bg-green-700"
              onClick={handleAccept}
              disabled={isSubmitting}
            >
              <ThumbsUp className="h-5 w-5" /> Accept &amp; Proceed to Payment
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or raise a concern</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Describe your concern</Label>
              <Input
                placeholder="e.g., I think the installation cost seems high for my area..."
                value={disputeReason}
                onChange={e => setDisputeReason(e.target.value)}
                disabled={isSubmitting}
              />
              <Button variant="outline" className="w-full gap-2" onClick={handleDispute} disabled={isSubmitting}>
                <MessageSquare className="h-4 w-4" /> Submit Concern &amp; Raise Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
