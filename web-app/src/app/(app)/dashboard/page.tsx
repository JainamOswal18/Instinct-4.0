
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { fetchServices } from '@/lib/customer-api';
import {
  getServiceRequests,
  getProviderNotifications,
  dismissProviderNotification,
  updateServiceRequestStatus,
  completeSurvey,
  addUserNotification,
  getUserNotifications,
  dismissUserNotification,
  saveBillingDraft,
  getBillingDrafts,
  approveBillingDraft,
  type ProviderNotification,
  type UserNotification,
  type ServiceRequest,
  type BillingPlan,
} from '@/lib/notifications';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { getSession } from '@/lib/auth';
import { fetchAdminOverview } from '@/lib/admin-api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Info, Bell, CheckCircle, ClipboardCheck, FileText, MapPin, Zap, ArrowRight, X,
  IndianRupee, Wrench, Send, Plus, Trash2, Cpu, ShieldCheck, TrendingDown,
} from 'lucide-react';

type ServiceCatalogItem = {
  id: string;
  title: string;
  description: string;
  imageId: string;
};

// ========================================
// USER DASHBOARD
// ========================================
function UserDashboard() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<UserNotification | null>(null);
  // Track which notification IDs have already been shown as popups to prevent re-triggering
  const shownPopupIds = useState<Set<string>>(() => new Set())[0];
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);

  const checkNotifications = useCallback(() => {
    const allNotifications = getUserNotifications();
    const pending = allNotifications.filter(n => !n.dismissed);
    setNotifications(pending);

    // Only show popup for NEW notifications we haven't shown yet
    const unseen = pending.filter(n => !shownPopupIds.has(n.id));
    if (unseen.length > 0 && !showNotificationDialog) {
      shownPopupIds.add(unseen[0].id);
      setCurrentNotification(unseen[0]);
      setShowNotificationDialog(true);
    }
  }, [shownPopupIds, showNotificationDialog]);

  useEffect(() => {
    checkNotifications();

    // Poll for new notifications every 5 seconds (only updates banner, popup only for new)
    const interval = setInterval(checkNotifications, 5000);
    return () => clearInterval(interval);
  }, [checkNotifications]);

  useEffect(() => {
    fetchServices()
      .then((result) => setServices(result.services))
      .catch(() => {
        setServices([]);
      });
  }, []);

  const handleDismissNotification = (id: string) => {
    dismissUserNotification(id);
    setShowNotificationDialog(false);
    setCurrentNotification(null);

    // Update the banner list
    const remaining = getUserNotifications().filter(n => !n.dismissed);
    setNotifications(remaining);
  };

  return (
    <div className="space-y-8">
      {/* Notification banner */}
      {notifications.length > 0 && (
        <Alert className="border-primary/50 bg-primary/5">
          <Bell className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">
            You have {notifications.length} new notification{notifications.length > 1 ? 's' : ''}
          </AlertTitle>
          <AlertDescription>
            {notifications[0].message}
            {notifications[0].type === 'survey-complete' && (
              <Button asChild variant="link" className="ml-2 p-0 h-auto text-primary font-semibold">
                <Link href="/billing">Go to Billing →</Link>
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Notification Popup Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              {currentNotification?.type === 'survey-complete' ? (
                <CheckCircle className="h-7 w-7 text-primary" />
              ) : (
                <Bell className="h-7 w-7 text-primary" />
              )}
            </div>
            <DialogTitle className="text-center font-headline text-xl">
              {currentNotification?.type === 'survey-complete' ? 'Survey Complete!' : 'Notification'}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {currentNotification?.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            {currentNotification?.type === 'survey-complete' && (
              <Button asChild className="w-full gap-2">
                <Link href="/billing" onClick={() => {
                  if (currentNotification) handleDismissNotification(currentNotification.id);
                }}>
                  <FileText className="h-4 w-4" />
                  Check Billing Section
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (currentNotification) handleDismissNotification(currentNotification.id);
              }}
            >
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const image = PlaceHolderImages.find(img => img.id === service.imageId);
          return (
            <Card key={service.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={image?.imageUrl || ''}
                  alt={service.title}
                  fill
                  className="object-cover"
                  data-ai-hint={image?.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/request-service/${service.id}`}>UPLOAD AND PROCEED</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ========================================
// PROVIDER DASHBOARD (Overview Hub)
// ========================================
function ProviderDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [notifications, setNotifications] = useState<ProviderNotification[]>([]);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<ProviderNotification | null>(null);

  // Billing form state
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [billingRequest, setBillingRequest] = useState<ServiceRequest | null>(null);
  const [billingCustomerName, setBillingCustomerName] = useState('');
  const [billingPlan, setBillingPlan] = useState<BillingPlan>({
    planName: '', summary: '', installationCost: 0, monthlyServiceCharge: 0,
    maintenanceFee: 0, totalMonthly: 0, estimatedMonthlySavings: 0,
    paybackPeriodMonths: 0, features: [], specifications: {
      systemCapacity: '', expectedGeneration: '', warrantyPeriod: '', equipmentDetails: '',
    }, rationale: '', customCharges: [],
  });

  // Provider data
  const [pipeline, setPipeline] = useState<Record<string, number>>({});
  const [openTickets, setOpenTickets] = useState(0);
  const [equipmentAlerts, setEquipmentAlerts] = useState(0);
  const [recentAlerts, setRecentAlerts] = useState<import('@/lib/provider-data').ProviderAlert[]>([]);
  const [revenue, setRevenue] = useState({ totalMRR: 0, overdueCount: 0, totalPaid: 0, totalOutstanding: 0, paidCount: 0, collectionRate: 0 });
  const [pendingBills, setPendingBills] = useState(0);

  const loadData = useCallback(() => {
    setRequests(getServiceRequests());
  }, []);

  const loadProviderData = useCallback(() => {
    const { seedProviderMockData, getInstallationPipeline, getTicketStats, getEquipmentList, getProviderAlerts: getProvAlerts, getRevenueOverview } = require('@/lib/provider-data');
    seedProviderMockData();
    setPipeline(getInstallationPipeline());
    const tStats = getTicketStats();
    setOpenTickets(tStats['open'] + tStats['awaiting-approval'] + tStats['in-progress']);
    const eq = getEquipmentList();
    setEquipmentAlerts(eq.filter((e: any) => e.status !== 'online').length);
    const alerts = getProvAlerts().filter((a: any) => !a.dismissed);
    setRecentAlerts(alerts.slice(0, 3));
    setRevenue(getRevenueOverview());
    setPendingBills(getBillingDrafts().filter(d => d.status === 'draft').length);
  }, []);

  const checkNotifications = useCallback(() => {
    const allNotifications = getProviderNotifications();
    const pending = allNotifications.filter(n => !n.dismissed);
    setNotifications(pending);

    if (pending.length > 0 && !currentNotification) {
      setCurrentNotification(pending[0]);
      setShowNotificationDialog(true);
    }
  }, [currentNotification]);

  useEffect(() => {
    loadData();
    loadProviderData();
    checkNotifications();

    const interval = setInterval(() => {
      loadData();
      checkNotifications();
    }, 2000);
    return () => clearInterval(interval);
  }, [loadData, loadProviderData, checkNotifications]);

  const handleStartSurvey = (notification: ProviderNotification) => {
    updateServiceRequestStatus(notification.requestId, 'in-progress');
    dismissProviderNotification(notification.id);
    setShowNotificationDialog(false);
    setCurrentNotification(null);
    loadData();

    toast({
      title: "Survey Started",
      description: `Survey for ${notification.serviceTitle} is now in progress.`,
    });

    const remaining = getProviderNotifications().filter(n => !n.dismissed);
    if (remaining.length > 0) {
      setTimeout(() => {
        setCurrentNotification(remaining[0]);
        setShowNotificationDialog(true);
      }, 500);
    }
    setNotifications(remaining);
  };

  // Opens the billing form pre-filled based on the request data
  const openBillingForm = (request: ServiceRequest, customerName: string) => {
    const consumption = parseInt(request.consumption) || 500;
    const isHighConsumption = consumption > 800;
    // Pre-fill billing fields based on service type and consumption
    const defaults: Record<string, Partial<BillingPlan>> = {
      'Solar Energy': {
        planName: `Solar Rooftop ${isHighConsumption ? 'Premium' : 'Starter'}`,
        installationCost: isHighConsumption ? 350000 : 175000,
        monthlyServiceCharge: isHighConsumption ? 4500 : 2500,
        maintenanceFee: isHighConsumption ? 800 : 500,
        estimatedMonthlySavings: isHighConsumption ? 6000 : 3000,
        paybackPeriodMonths: isHighConsumption ? 48 : 60,
        features: ['Solar panel array installation', 'Grid-tied inverter setup', 'Net metering configuration', 'Real-time generation monitoring', 'Annual panel cleaning (2x)', '10-year performance warranty'],
        specifications: { systemCapacity: `${isHighConsumption ? 8 : 5}kW`, expectedGeneration: `${isHighConsumption ? 960 : 600} kWh/month`, warrantyPeriod: '25 years (panels), 10 years (inverter)', equipmentDetails: `${isHighConsumption ? 'Waaree 8kW Bifacial' : 'Loom Solar 5kW Mono PERC'} panels + Growatt inverter` },
      },
      'EV Charging': {
        planName: 'EV Smart Charge',
        installationCost: 85000,
        monthlyServiceCharge: 1500,
        maintenanceFee: 300,
        estimatedMonthlySavings: 2000,
        paybackPeriodMonths: 36,
        features: ['7.4kW AC charger installation', 'Smart scheduling & load balancing', 'Mobile app control', 'Usage analytics dashboard', 'Quarterly maintenance', '5-year hardware warranty'],
        specifications: { systemCapacity: '7.4kW AC', expectedGeneration: 'N/A — Charging station', warrantyPeriod: '5 years', equipmentDetails: 'Tata EZ Charge 7.4kW Level 2 AC Charger' },
      },
      'Battery Backup': {
        planName: 'PowerGuard Plus',
        installationCost: 280000,
        monthlyServiceCharge: 3500,
        maintenanceFee: 600,
        estimatedMonthlySavings: 2500,
        paybackPeriodMonths: 54,
        features: ['10kWh lithium-ion battery', 'Automatic switchover', 'Peak-shaving capability', 'Backup duration ~8 hours', 'Battery health monitoring', '10-year cell warranty'],
        specifications: { systemCapacity: '10kWh', expectedGeneration: 'N/A — Storage system', warrantyPeriod: '10 years (cells), 5 years (inverter)', equipmentDetails: 'Luminous 10kWh Li-ion Battery Pack' },
      },
    };
    const d = defaults[request.serviceTitle] || defaults['Solar Energy']!;
    setBillingPlan({
      planName: d.planName || `${request.serviceTitle} Plan`,
      summary: `Custom plan for ${customerName} based on ${consumption} kWh monthly consumption and on-site survey of ${request.areaDescription?.slice(0, 80) || 'the property'}.`,
      installationCost: d.installationCost || 150000,
      monthlyServiceCharge: d.monthlyServiceCharge || 2500,
      maintenanceFee: d.maintenanceFee || 500,
      totalMonthly: (d.monthlyServiceCharge || 2500) + (d.maintenanceFee || 500),
      estimatedMonthlySavings: d.estimatedMonthlySavings || 3000,
      paybackPeriodMonths: d.paybackPeriodMonths || 48,
      features: d.features || ['Standard installation', '24/7 monitoring', 'Quarterly maintenance', 'Hardware warranty'],
      specifications: d.specifications || { systemCapacity: '', expectedGeneration: '', warrantyPeriod: '', equipmentDetails: '' },
      rationale: `Based on the customer's ${consumption} kWh consumption, area survey, and uploaded documents.`,
      customCharges: [],
    });
    setBillingRequest(request);
    setBillingCustomerName(customerName);
    setShowBillingForm(true);
  };

  // Approve and send billing to user
  const approveBillingForm = () => {
    if (!billingRequest) return;
    const finalPlan = {
      ...billingPlan,
      totalMonthly: billingPlan.monthlyServiceCharge + billingPlan.maintenanceFee +
        (billingPlan.customCharges || []).filter(c => c.recurring).reduce((s, c) => s + c.amount, 0),
    };
    saveBillingDraft({
      requestId: billingRequest.id,
      serviceTitle: billingRequest.serviceTitle,
      consumption: billingRequest.consumption,
      areaDescription: billingRequest.areaDescription,
      fileNames: billingRequest.fileNames,
      customerName: billingCustomerName,
      generatedPlan: finalPlan,
    });
    // Immediately mark as provider-approved
    const drafts = getBillingDrafts();
    const latest = drafts[drafts.length - 1];
    if (latest) {
      approveBillingDraft(latest.id, finalPlan);
    }
    addUserNotification(
      `Great news! Your custom billing plan for "${billingRequest.serviceTitle}" is ready. Visit the Billing section to review and accept your plan.`,
      'billing-ready'
    );
    setShowBillingForm(false);
    setBillingRequest(null);
    loadData();
    loadProviderData();
    toast({ title: 'Bill Approved & Sent', description: `${billingCustomerName} has been notified about their billing plan.` });
  };

  const handleCompleteSurvey = (notification: ProviderNotification) => {
    const request = getServiceRequests().find(r => r.id === notification.requestId);
    if (request) {
      updateServiceRequestStatus(notification.requestId, 'completed');
      completeSurvey(request);
      // Open billing form instead of calling Gemini
      openBillingForm(request, notification.userName);
    }

    dismissProviderNotification(notification.id);
    setShowNotificationDialog(false);
    setCurrentNotification(null);
    loadData();
    loadProviderData();

    const remaining = getProviderNotifications().filter(n => !n.dismissed);
    if (remaining.length > 0) {
      setTimeout(() => {
        setCurrentNotification(remaining[0]);
        setShowNotificationDialog(true);
      }, 500);
    }
    setNotifications(remaining);
  };

  const handleTableStatusChange = (id: string, newStatus: string) => {
    if (newStatus === 'completed') {
      const request = getServiceRequests().find(r => r.id === id);
      if (request) {
        updateServiceRequestStatus(id, 'completed');
        completeSurvey(request);
        openBillingForm(request, 'Customer');
      }
    } else {
      updateServiceRequestStatus(id, newStatus as ServiceRequest['status']);
      toast({
        title: "Status Updated",
        description: `Survey status changed to ${newStatus}.`,
      });
    }
    loadData();
    loadProviderData();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary' as const;
      case 'in-progress': return 'default' as const;
      default: return 'outline' as const;
    }
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const pipelineStages = [
    { key: 'survey', label: 'Survey', color: 'bg-amber-500' },
    { key: 'approval', label: 'Approval', color: 'bg-orange-500' },
    { key: 'procurement', label: 'Procurement', color: 'bg-blue-500' },
    { key: 'installation', label: 'Installation', color: 'bg-indigo-500' },
    { key: 'testing', label: 'Testing', color: 'bg-purple-500' },
    { key: 'live', label: 'Live', color: 'bg-green-500' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10';
      case 'warning': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  const totalInstallations = Object.values(pipeline).reduce((a, b) => a + b, 0);
  const liveInstallations = pipeline['live'] || 0;

  return (
    <div className="space-y-6">
      {/* Notification banner */}
      {notifications.length > 0 && (
        <Alert className="border-primary/50 bg-primary/5">
          <Bell className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">
            {notifications.length} new service request{notifications.length > 1 ? 's' : ''}
          </AlertTitle>
          <AlertDescription>
            A customer has submitted a new energy service request. Click to review.
            <Button
              variant="link"
              className="ml-2 p-0 h-auto text-primary font-semibold"
              onClick={() => {
                if (notifications.length > 0) {
                  setCurrentNotification(notifications[0]);
                  setShowNotificationDialog(true);
                }
              }}
            >
              Review Request →
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Provider Notification Popup (unchanged) */}
      <Dialog open={showNotificationDialog} onOpenChange={(open) => {
        if (!open) {
          setShowNotificationDialog(false);
        }
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <ClipboardCheck className="h-7 w-7 text-primary" />
            </div>
            <DialogTitle className="text-center font-headline text-xl">
              New Service Request
            </DialogTitle>
            <DialogDescription className="text-center">
              A customer requires an on-site survey
            </DialogDescription>
          </DialogHeader>

          {currentNotification && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</p>
                  <p className="text-sm font-semibold">{currentNotification.userName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</p>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    {currentNotification.serviceTitle}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Consumption</p>
                  <p className="text-sm font-semibold">{currentNotification.consumption} kWh</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Submitted</p>
                  <p className="text-sm font-semibold">{currentNotification.date}</p>
                </div>
              </div>

              {currentNotification.areaDescription && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Area Description
                  </p>
                  <p className="text-sm rounded-md bg-muted/50 p-3 leading-relaxed">
                    {currentNotification.areaDescription}
                  </p>
                </div>
              )}

              {currentNotification.fileNames.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Uploaded Documents ({currentNotification.fileNames.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentNotification.fileNames.map((name, i) => (
                      <Badge key={i} variant="outline" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => currentNotification && handleStartSurvey(currentNotification)}
            >
              <ClipboardCheck className="h-4 w-4" />
              Start Survey
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={() => currentNotification && handleCompleteSurvey(currentNotification)}
            >
              <CheckCircle className="h-4 w-4" />
              Completed Survey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ====== KPI Stats Cards ====== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Installations</CardTitle>
            <Zap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveInstallations}</div>
            <p className="text-xs text-muted-foreground">{totalInstallations} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Surveys</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter(r => r.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">{requests.length} total requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Alerts</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipmentAlerts}</div>
            <p className="text-xs text-muted-foreground">Offline or degraded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <ArrowRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatINR(revenue.totalMRR)}</div>
            <p className="text-xs text-muted-foreground">{revenue.collectionRate}% collected</p>
          </CardContent>
        </Card>
        <Card className={pendingBills > 0 ? 'border-primary/50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingBills}</div>
            <Link href="/provider-billing" className="text-xs text-primary hover:underline">
              Review drafts →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* ====== Installation Pipeline & Alerts ====== */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Installation Pipeline */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Installation Pipeline</CardTitle>
              <CardDescription>Current status of all installations across stages</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/installations">View All →</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {pipelineStages.map((stage, i) => {
                const count = pipeline[stage.key] || 0;
                const percent = totalInstallations > 0 ? (count / totalInstallations) * 100 : 0;
                return (
                  <div key={stage.key} className="flex-1 text-center">
                    <div className="relative mb-2">
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                          style={{ width: `${Math.max(percent, count > 0 ? 20 : 0)}%` }}
                        />
                      </div>
                      {i < pipelineStages.length - 1 && (
                        <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-[11px] text-muted-foreground">{stage.label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/provider-alerts">View All →</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No active alerts 🎉</p>
            ) : (
              recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getSeverityColor(alert.severity)}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{alert.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.message}</p>
                  </div>
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : 'outline'} className="shrink-0 text-[10px]">
                    {alert.severity}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* ====== Recent Survey Requests ====== */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Survey Requests</CardTitle>
          <CardDescription>Manage onsite surveys for new energy service requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardCheck className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No service requests yet.</p>
              <p className="text-sm text-muted-foreground/70">New requests from users will appear here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Consumption</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.slice(0, 5).map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">Alex Doe</TableCell>
                    <TableCell>{req.serviceTitle}</TableCell>
                    <TableCell>{req.consumption} kWh</TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(req.status)}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {req.status !== 'completed' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTableStatusChange(req.id, 'in-progress')}
                            disabled={req.status === 'in-progress'}
                          >
                            In Progress
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleTableStatusChange(req.id, 'completed')}
                          >
                            Mark Completed
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ====== Billing Form Dialog ====== */}
      <Dialog open={showBillingForm} onOpenChange={setShowBillingForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              Create Billing Plan
            </DialogTitle>
            <DialogDescription>
              {billingRequest && <>
                Preparing billing for <strong>{billingCustomerName}</strong> — {billingRequest.serviceTitle} ({billingRequest.consumption} kWh consumption).
                All fields are editable.
              </>}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Plan Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input value={billingPlan.planName} onChange={e => setBillingPlan(p => ({ ...p, planName: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Summary</Label>
                <Input value={billingPlan.summary} onChange={e => setBillingPlan(p => ({ ...p, summary: e.target.value }))} />
              </div>
            </div>

            <Separator />

            {/* Pricing Breakdown */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <IndianRupee className="h-4 w-4" /> Cost Breakdown
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Wrench className="h-3 w-3" /> Hardware / Installation Cost</Label>
                  <Input type="number" value={billingPlan.installationCost} onChange={e => setBillingPlan(p => ({ ...p, installationCost: parseFloat(e.target.value) || 0 }))} />
                  <p className="text-[10px] text-muted-foreground">One-time setup &amp; equipment</p>
                </div>
                <div className="space-y-2">
                  <Label>Monthly Service Charge</Label>
                  <Input type="number" value={billingPlan.monthlyServiceCharge} onChange={e => setBillingPlan(p => ({ ...p, monthlyServiceCharge: parseFloat(e.target.value) || 0 }))} />
                  <p className="text-[10px] text-muted-foreground">Recurring monthly</p>
                </div>
                <div className="space-y-2">
                  <Label>Maintenance Fee</Label>
                  <Input type="number" value={billingPlan.maintenanceFee} onChange={e => setBillingPlan(p => ({ ...p, maintenanceFee: parseFloat(e.target.value) || 0 }))} />
                  <p className="text-[10px] text-muted-foreground">Recurring monthly</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3 mt-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-green-500" /> Estimated Monthly Savings</Label>
                  <Input type="number" value={billingPlan.estimatedMonthlySavings} onChange={e => setBillingPlan(p => ({ ...p, estimatedMonthlySavings: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div className="space-y-2">
                  <Label>Payback Period (months)</Label>
                  <Input type="number" value={billingPlan.paybackPeriodMonths} onChange={e => setBillingPlan(p => ({ ...p, paybackPeriodMonths: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="space-y-2">
                  <Label>Calculated Total Monthly</Label>
                  <div className="rounded-md border bg-muted/30 p-2 text-lg font-bold text-primary">
                    ₹{((billingPlan.monthlyServiceCharge || 0) + (billingPlan.maintenanceFee || 0) + ((billingPlan.customCharges || []).filter(c => c.recurring).reduce((s, c) => s + c.amount, 0))).toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Custom Charges */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4" /> Additional Charges
              </h3>
              {(billingPlan.customCharges || []).map((charge, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <Input value={charge.label} className="flex-1" onChange={e => {
                    const charges = [...(billingPlan.customCharges || [])];
                    charges[i] = { ...charges[i], label: e.target.value };
                    setBillingPlan(p => ({ ...p, customCharges: charges }));
                  }} />
                  <Input type="number" value={charge.amount} className="w-28" onChange={e => {
                    const charges = [...(billingPlan.customCharges || [])];
                    charges[i] = { ...charges[i], amount: parseFloat(e.target.value) || 0 };
                    setBillingPlan(p => ({ ...p, customCharges: charges }));
                  }} />
                  <Badge variant={charge.recurring ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => {
                    const charges = [...(billingPlan.customCharges || [])];
                    charges[i] = { ...charges[i], recurring: !charges[i].recurring };
                    setBillingPlan(p => ({ ...p, customCharges: charges }));
                  }}>{charge.recurring ? 'Monthly' : 'One-time'}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => {
                    const charges = (billingPlan.customCharges || []).filter((_, idx) => idx !== i);
                    setBillingPlan(p => ({ ...p, customCharges: charges }));
                  }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <Input placeholder="Charge label (e.g. Wire extension)" className="flex-1" id="new-charge-label" />
                <Input type="number" placeholder="₹ Amount" className="w-28" id="new-charge-amount" />
                <Button variant="outline" size="sm" onClick={() => {
                  const label = (document.getElementById('new-charge-label') as HTMLInputElement)?.value;
                  const amount = parseFloat((document.getElementById('new-charge-amount') as HTMLInputElement)?.value) || 0;
                  if (label && amount) {
                    setBillingPlan(p => ({ ...p, customCharges: [...(p.customCharges || []), { label, amount, recurring: true }] }));
                    (document.getElementById('new-charge-label') as HTMLInputElement).value = '';
                    (document.getElementById('new-charge-amount') as HTMLInputElement).value = '';
                  }
                }}>
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              </div>
            </div>

            <Separator />

            {/* System Specifications */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4" /> System Specifications
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>System Capacity</Label>
                  <Input value={billingPlan.specifications.systemCapacity} onChange={e => setBillingPlan(p => ({ ...p, specifications: { ...p.specifications, systemCapacity: e.target.value } }))} />
                </div>
                <div className="space-y-2">
                  <Label>Expected Generation</Label>
                  <Input value={billingPlan.specifications.expectedGeneration} onChange={e => setBillingPlan(p => ({ ...p, specifications: { ...p.specifications, expectedGeneration: e.target.value } }))} />
                </div>
                <div className="space-y-2">
                  <Label>Warranty Period</Label>
                  <Input value={billingPlan.specifications.warrantyPeriod} onChange={e => setBillingPlan(p => ({ ...p, specifications: { ...p.specifications, warrantyPeriod: e.target.value } }))} />
                </div>
                <div className="space-y-2">
                  <Label>Equipment Details</Label>
                  <Input value={billingPlan.specifications.equipmentDetails} onChange={e => setBillingPlan(p => ({ ...p, specifications: { ...p.specifications, equipmentDetails: e.target.value } }))} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Included Features
              </h3>
              {billingPlan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <Input value={feature} onChange={e => {
                    const features = [...billingPlan.features];
                    features[i] = e.target.value;
                    setBillingPlan(p => ({ ...p, features }));
                  }} className="flex-1" />
                  <Button variant="ghost" size="icon" onClick={() => {
                    const features = billingPlan.features.filter((_, idx) => idx !== i);
                    setBillingPlan(p => ({ ...p, features }));
                  }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="gap-2 mt-1" onClick={() => {
                setBillingPlan(p => ({ ...p, features: [...p.features, 'New feature'] }));
              }}>
                <Plus className="h-3 w-3" /> Add Feature
              </Button>
            </div>

            <Separator />

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes / Rationale</Label>
              <Input value={billingPlan.rationale} onChange={e => setBillingPlan(p => ({ ...p, rationale: e.target.value }))} placeholder="Why this plan fits the customer..." />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setShowBillingForm(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={approveBillingForm} className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" /> Approve & Send to Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ========================================
// ADMIN DASHBOARD
// ========================================
function AdminDashboard() {
  const [overview, setOverview] = useState<{
    totalUsers: number;
    totalProperties: number;
    openTickets: number;
    totalRevenue: number;
  } | null>(null);
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingOverview(true);
    setOverviewError(null);
    fetchAdminOverview()
      .then((data) => {
        setOverview({
          totalUsers: data.totalUsers,
          totalProperties: data.totalProperties,
          openTickets: data.openTickets,
          totalRevenue: data.totalRevenue,
        });
      })
      .catch((error) => {
        setOverview(null);
        setOverviewError(error instanceof Error ? error.message : 'Failed to load overview');
      })
      .finally(() => {
        setIsLoadingOverview(false);
      });
  }, []);

  const formatINR = (amount: number) => {
    const value = Number(amount);
    if (!Number.isFinite(value)) return '₹0.00';
    return `₹${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)}`;
  };

  return (
    <div className="space-y-6">
      {isLoadingOverview ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-24 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : overview ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Total Users</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{overview.totalUsers}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Total Properties</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{overview.totalProperties}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Open Tickets</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{overview.openTickets}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Revenue</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{formatINR(overview.totalRevenue)}</div></CardContent>
          </Card>
        </div>
      ) : (
        <Alert variant="destructive">
          <AlertTitle>Unable to load admin overview</AlertTitle>
          <AlertDescription>{overviewError || 'Please try again in a moment.'}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Administrative controls and platform-wide monitoring.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Welcome to the Admin Panel. Here you can monitor energy distributions, user growth, and provider efficiency.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ========================================
// DASHBOARD PAGE (Role Router)
// ========================================
export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session?.role) {
      setRole(session.role);
    }
  }, []);

  const renderDashboard = () => {
    switch (role) {
      case 'CITIZEN':
        return <UserDashboard />;
      case 'ADMIN':
      case 'EXECUTIVE':
        return <AdminDashboard />;
      default:
        return <p className="p-8 text-center text-muted-foreground">Authenticating session...</p>;
    }
  };

  const roleDisplayNames: { [key: string]: string } = {
    CITIZEN: 'Your Energy Portal',
    ADMIN: 'EaaS Nexus Command',
    EXECUTIVE: 'Executive Command View',
  };

  const title = role ? roleDisplayNames[role] : "Welcome";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">{title}</h1>
        <p className="text-muted-foreground">Manage your energy footprint and requests here.</p>
      </div>
      {renderDashboard()}
    </div>
  );
}
