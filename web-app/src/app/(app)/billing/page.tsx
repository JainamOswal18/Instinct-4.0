
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getSurveyResults, type SurveyResult } from '@/lib/notifications';
import {
  Download, CheckCircle, Zap, Wrench,
  ArrowRight, Sparkles, ShieldCheck, Clock, Cpu,
  IndianRupee, TrendingDown, CalendarClock, Loader2,
  AlertCircle, RefreshCw
} from 'lucide-react';

type GeminiBillingPlan = {
  planName: string;
  summary: string;
  installationCost: number;
  monthlyServiceCharge: number;
  maintenanceFee: number;
  totalMonthly: number;
  estimatedMonthlySavings: number;
  paybackPeriodMonths: number;
  features: string[];
  specifications: {
    systemCapacity: string;
    expectedGeneration: string;
    warrantyPeriod: string;
    equipmentDetails: string;
  };
  rationale: string;
};

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
// AI-GENERATED BILLING SECTION
// ============================================
function AiBillingSection({ surveyResult }: { surveyResult: SurveyResult }) {
  const [plan, setPlan] = useState<GeminiBillingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: surveyResult.serviceTitle,
          serviceId: surveyResult.serviceId,
          consumption: surveyResult.consumption,
          areaDescription: surveyResult.areaDescription,
          fileNames: surveyResult.fileNames,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate billing plan');
      }

      const data = await response.json();
      setPlan(data.plan);
    } catch (err: any) {
      console.error('Billing generation error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generatePlan();
  }, [surveyResult.requestId]);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-lg font-semibold">Generating Your Custom Plan...</h3>
              <p className="text-sm text-muted-foreground">
                Our AI is analyzing your {surveyResult.serviceTitle} survey data, area specifications, and uploaded documents to create a personalized billing plan.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="text-lg font-medium text-muted-foreground">Analyzing your requirements...</p>
                <p className="text-sm text-muted-foreground/70 max-w-md">
                  Gemini AI is calculating optimal pricing based on your {surveyResult.consumption} kWh consumption, area details, and service type.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h3 className="text-lg font-semibold">Failed to Generate Plan</h3>
          <p className="text-sm text-muted-foreground max-w-md">{error}</p>
          <Button onClick={generatePlan} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!plan) return null;

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Survey completion banner */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-lg font-semibold flex items-center gap-2">
              AI-Generated Custom Plan
              <Badge variant="outline" className="text-[10px] font-normal gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                Powered by Gemini
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">
              {plan.summary}
            </p>
          </div>
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
              Custom plan based on your {surveyResult.serviceTitle} survey — {surveyResult.consumption} kWh consumption
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
                    <Cpu className="h-3 w-3" />
                    Capacity
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.systemCapacity}</p>
                </div>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    Expected Generation
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.expectedGeneration}</p>
                </div>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" />
                    Warranty
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.warrantyPeriod}</p>
                </div>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Wrench className="h-3 w-3" />
                    Equipment
                  </div>
                  <p className="text-sm font-medium">{plan.specifications.equipmentDetails}</p>
                </div>
              </div>
            </div>

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

            <Button className="w-full h-12 text-lg font-semibold gap-2">
              Subscribe to This Plan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              Cost Breakdown
            </CardTitle>
            <CardDescription>AI-calculated pricing for your setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
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
              <Separator />
              <div className="flex items-center justify-between py-3 rounded-lg bg-primary/5 px-3 -mx-3">
                <span className="text-sm font-semibold">Total Monthly</span>
                <span className="text-xl font-bold text-primary">{formatINR(plan.totalMonthly)}/mo</span>
              </div>
            </div>

            <Separator />

            {/* Savings highlight */}
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold text-green-500">Estimated Savings</span>
              </div>
              <p className="text-2xl font-bold text-green-500">{formatINR(plan.estimatedMonthlySavings)}<span className="text-sm font-normal">/month</span></p>
              <p className="text-xs text-muted-foreground">
                Investment recovery in approx. <strong>{plan.paybackPeriodMonths} months</strong>
              </p>
            </div>

            <div className="pt-2">
              <Button onClick={generatePlan} variant="ghost" size="sm" className="w-full gap-2 text-xs text-muted-foreground">
                <RefreshCw className="h-3 w-3" />
                Regenerate Plan
              </Button>
            </div>
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
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSurveyResults(getSurveyResults());
    setIsLoaded(true);
  }, []);

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

  const latestSurvey = surveyResults.length > 0 ? surveyResults[surveyResults.length - 1] : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Billing</h1>
        <p className="text-muted-foreground">
          {latestSurvey
            ? 'Your AI-generated custom plan is ready based on the completed survey.'
            : 'Manage your invoices and payment methods.'}
        </p>
      </div>

      {/* AI-generated billing section — only shown after survey */}
      {latestSurvey && <AiBillingSection surveyResult={latestSurvey} />}

      {/* Payment methods & past plan */}
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
            <CardTitle>{latestSurvey ? 'Previous Plan' : 'Current Plan'}</CardTitle>
            <CardDescription>
              {latestSurvey
                ? <>You previously subscribed to a standard energy plan.</>
                : <>You are on a standard energy plan.</>
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{latestSurvey ? 'That plan included:' : 'Your plan includes:'}</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>Real-time energy monitoring</li>
                <li>AI-powered fault detection</li>
                <li>Advanced analytics & ROI</li>
                <li>Priority chat support</li>
              </ul>
            </div>
            {!latestSurvey && (
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
    </div>
  );
}
