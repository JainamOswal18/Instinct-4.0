
'use client';

import { useState, useEffect } from 'react';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  getUserApprovedBills,
  respondToBill,
  addUserNotification,
  type BillingDraft,
} from '@/lib/notifications';
import {
  addTicket,
} from '@/lib/provider-data';
import {
  Download, CheckCircle, Zap, Wrench, ShieldCheck, Cpu,
  IndianRupee, TrendingDown, CalendarClock, CreditCard,
  MessageSquare, ThumbsUp, Clock, Sparkles, Send,
} from 'lucide-react';

const pastInvoices = [
  { id: 'INV-2024-005', date: '2024-05-01', amount: '₹10,450', status: 'Paid' },
  { id: 'INV-2024-004', date: '2024-04-01', amount: '₹11,000', status: 'Paid' },
  { id: 'INV-2024-003', date: '2024-03-01', amount: '₹9,895', status: 'Paid' },
  { id: 'INV-2024-002', date: '2024-02-01', amount: '₹11,680', status: 'Paid' },
];

const paymentMethods = [
  { type: 'Visa', last4: '4242', expiry: '12/26', isPrimary: true },
  { type: 'Mastercard', last4: '8989', expiry: '08/25', isPrimary: false },
];

// ============================================
// APPROVED BILL CARD
// ============================================
function ApprovedBillCard({ bill, onRespond }: { bill: BillingDraft; onRespond: () => void }) {
  const plan = bill.generatedPlan;
  const [selectedDuration, setSelectedDuration] = useState<12 | 24 | 36>(12);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const getAdjustedPricing = (duration: 12 | 24 | 36) => {
    const baseMonthly = plan.totalMonthly;
    const discounts = { 12: 0, 24: 0.05, 36: 0.10 };
    const discount = discounts[duration];
    const adjustedMonthly = Math.floor(baseMonthly * (1 - discount));
    const totalAmount = adjustedMonthly * duration;
    const totalSavings = (plan.estimatedMonthlySavings * duration) - totalAmount;

    return {
      monthlyFee: adjustedMonthly,
      totalAmount,
      totalSavings,
      discount: discount * 100,
      baseMonthly
    };
  };

  const pricing = getAdjustedPricing(selectedDuration);

  const getStatusBadge = () => {
    switch (bill.status) {
      case 'provider-approved':
        return <Badge className="bg-blue-500/20 text-blue-400 gap-1"><Clock className="h-3 w-3" /> Awaiting Your Response</Badge>;
      case 'user-accepted':
        return <Badge className="bg-green-500/20 text-green-400 gap-1"><CheckCircle className="h-3 w-3" /> Accepted</Badge>;
      case 'user-disputed':
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
                <Sparkles className="h-2.5 w-2.5" /> AI-Generated • Provider Reviewed
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">
              {plan.summary}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Approved on {bill.approvedAt ? new Date(bill.approvedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
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
              {plan.planName}
            </CardTitle>
            <CardDescription>
              Custom plan for {bill.serviceTitle} — {bill.consumption} kWh consumption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pricing */}
            <div className="rounded-lg border p-5 bg-muted/30">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-headline">{formatINR(plan.totalMonthly)}</span>
                <span className="text-lg text-muted-foreground">/month</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm text-green-500">
                  <TrendingDown className="h-4 w-4" />
                  <span>Save {formatINR(plan.estimatedMonthlySavings)}/month</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarClock className="h-4 w-4" />
                  <span>Payback in {plan.paybackPeriodMonths} months</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">What&apos;s Included</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Specifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">System Specifications</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Cpu className="h-3 w-3" /> Capacity
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.systemCapacity}</p>
                </div>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3" /> Expected Generation
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.expectedGeneration}</p>
                </div>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" /> Warranty
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.warrantyPeriod}</p>
                </div>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Wrench className="h-3 w-3" /> Equipment
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.equipmentDetails}</p>
                </div>
              </div>
            </div>

            {/* Custom Charges */}
            {plan.customCharges && plan.customCharges.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Additional Charges</h4>
                {plan.customCharges.map((charge, i) => (
                  <div key={i} className="flex items-center justify-between py-2 text-sm">
                    <span>{charge.label}</span>
                    <span className="font-medium">{formatINR(charge.amount)} {charge.recurring ? '/mo' : '(one-time)'}</span>
                  </div>
                ))}
              </div>
            )}

            {/* AI Rationale */}
            <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">AI Analysis</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.rationale}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons — only if awaiting response */}
            {bill.status === 'provider-approved' && (
              <div className="flex gap-3">
                <Button className="flex-1 h-12 text-lg font-semibold gap-2 bg-green-600 hover:bg-green-700" onClick={onRespond}>
                  <ThumbsUp className="h-5 w-5" /> Accept & Proceed to Payment
                </Button>
              </div>
            )}

            {bill.status === 'user-accepted' && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-500">Plan Accepted</p>
                  <p className="text-sm text-muted-foreground">Payment processing will begin shortly. You&apos;ll receive a confirmation.</p>
                </div>
              </div>
            )}

            {bill.status === 'user-disputed' && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-destructive" />
                <div>
                  <p className="font-semibold text-destructive">Concern Raised</p>
                  <p className="text-sm text-muted-foreground">A support ticket has been created. Your provider will review your concern.</p>
                  {bill.disputeReason && <p className="text-sm mt-1">&quot;{bill.disputeReason}&quot;</p>}
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
              {[12, 24, 36].map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedDuration(months as 12 | 24 | 36)}
                  className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-all ${
                    selectedDuration === months
                      ? 'bg-background shadow-sm text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {months} Mon {months > 12 && <span className="text-[10px] text-green-600 font-bold ml-1">-{months === 24 ? 5 : 10}%</span>}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Installation Cost</span>
                </div>
                <span className="font-semibold">{formatINR(plan.installationCost)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground -mt-1 pl-6">One-time setup fee</p>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Monthly Service</span>
                </div>
                <span className="font-semibold">{formatINR(plan.monthlyServiceCharge)}/mo</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Maintenance Fee</span>
                </div>
                <span className="font-semibold">{formatINR(plan.maintenanceFee)}/mo</span>
              </div>
              {plan.customCharges && plan.customCharges.length > 0 && (
                <>
                  <Separator />
                  {plan.customCharges.map((charge, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="text-sm text-muted-foreground">{charge.label}</span>
                      <span className="font-medium text-sm">{formatINR(charge.amount)}{charge.recurring ? '/mo' : ''}</span>
                    </div>
                  ))}
                </>
              )}
              
              <Separator className="my-4" />
              
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

            {/* Savings highlight */}
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">Net Estimated Savings</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-green-500">
                  {formatINR(Math.max(0, pricing.totalSavings))}
                </p>
                <p className="text-xs text-muted-foreground mb-1 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                  Over {selectedDuration} months
                </p>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Investment recovery in approx. <strong>{plan.paybackPeriodMonths} months</strong>
              </p>
            </div>

            {/* Raise concern button */}
            {bill.status === 'provider-approved' && (
              <Button variant="outline" className="w-full gap-2 text-muted-foreground" onClick={onRespond} data-action="dispute">
                <MessageSquare className="h-4 w-4" /> Have a concern? Raise a ticket
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// MAIN BILLING PAGE
// ============================================
export default function BillingPage() {
  const { toast } = useToast();
  const [bills, setBills] = useState<BillingDraft[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState<BillingDraft | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  useEffect(() => {
    setBills(getUserApprovedBills());
    setIsLoaded(true);

    // Poll for new approved bills every 3 seconds for dynamic updates
    const interval = setInterval(() => {
      const latest = getUserApprovedBills();
      setBills(prev => {
        if (JSON.stringify(prev.map(b => b.id + b.status)) !== JSON.stringify(latest.map(b => b.id + b.status))) {
          return latest;
        }
        return prev;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRespond = (bill: BillingDraft) => {
    setSelectedBill(bill);
    setShowResponseDialog(true);
  };

  const handleAccept = () => {
    if (!selectedBill) return;
    respondToBill(selectedBill.id, true);
    addUserNotification(
      `You've accepted the billing plan for ${selectedBill.serviceTitle}. Payment processing will begin.`,
      'info'
    );
    setShowResponseDialog(false);
    setSelectedBill(null);
    setBills(getUserApprovedBills());
    toast({
      title: 'Plan Accepted!',
      description: 'Your billing plan has been confirmed. Payment processing will begin.',
    });
  };

  const handleDispute = () => {
    if (!selectedBill || !disputeReason.trim()) {
      toast({ variant: 'destructive', title: 'Please describe your concern', description: 'Enter a reason before submitting.' });
      return;
    }
    respondToBill(selectedBill.id, false, disputeReason);
    // Create a support ticket
    addTicket({
      customerName: 'You',
      customerEmail: '',
      category: 'billing',
      priority: 'medium',
      subject: `Billing concern: ${selectedBill.serviceTitle}`,
      description: disputeReason,
      status: 'open',
    });
    addUserNotification(
      `Your concern about the ${selectedBill.serviceTitle} billing plan has been sent to your provider. They'll respond shortly.`,
      'info'
    );
    setShowResponseDialog(false);
    setSelectedBill(null);
    setDisputeReason('');
    setBills(getUserApprovedBills());
    toast({
      title: 'Concern Raised',
      description: 'A support ticket has been created. Your provider will review it.',
    });
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

  const pendingBill = bills.find(b => b.status === 'provider-approved');
  const respondedBills = bills.filter(b => b.status === 'user-accepted' || b.status === 'user-disputed');

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

      {/* Waiting state — no approved bill yet */}
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
        <ApprovedBillCard key={bill.id} bill={bill} onRespond={() => {}} />
      ))}

      {/* Payment methods & Invoice History */}
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
              {bills.length > 0
                ? 'Overview of your billing plan status.'
                : 'You are on a standard energy plan.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{bills.length > 0 ? 'Your plan includes:' : 'Standard plan includes:'}</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Real-time energy monitoring</li>
                <li>AI-powered fault detection</li>
                <li>Advanced analytics & ROI</li>
                <li>Priority chat support</li>
              </ul>
            </div>
            {bills.length === 0 && (
              <Button className="mt-4">Upgrade Plan</Button>
            )}
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
            <DialogDescription>
              Choose how you&apos;d like to proceed with the {selectedBill?.generatedPlan.planName} plan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Button className="w-full h-14 text-lg gap-2 bg-green-600 hover:bg-green-700" onClick={handleAccept}>
              <ThumbsUp className="h-5 w-5" /> Accept & Proceed to Payment
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
              />
              <Button variant="outline" className="w-full gap-2" onClick={handleDispute}>
                <MessageSquare className="h-4 w-4" /> Submit Concern & Raise Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
