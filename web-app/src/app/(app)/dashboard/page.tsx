
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { energyServices } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  getServiceRequests,
  getProviderNotifications,
  dismissProviderNotification,
  updateServiceRequestStatus,
  completeSurvey,
  addUserNotification,
  getUserNotifications,
  dismissUserNotification,
  type ProviderNotification,
  type UserNotification,
  type ServiceRequest,
} from '@/lib/notifications';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import StatsCards from '@/components/dashboard/stats-cards';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Info, Bell, CheckCircle, ClipboardCheck, FileText, MapPin, Zap, ArrowRight, X } from 'lucide-react';

// ========================================
// USER DASHBOARD
// ========================================
function UserDashboard() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<UserNotification | null>(null);

  const checkNotifications = useCallback(() => {
    const allNotifications = getUserNotifications();
    const pending = allNotifications.filter(n => !n.dismissed);
    setNotifications(pending);

    // Show the latest undismissed notification as a popup
    if (pending.length > 0 && !currentNotification) {
      setCurrentNotification(pending[0]);
      setShowNotificationDialog(true);
    }
  }, [currentNotification]);

  useEffect(() => {
    checkNotifications();

    // Poll for new notifications every 2 seconds
    const interval = setInterval(checkNotifications, 2000);
    return () => clearInterval(interval);
  }, [checkNotifications]);

  const handleDismissNotification = (id: string) => {
    dismissUserNotification(id);
    setShowNotificationDialog(false);
    setCurrentNotification(null);

    // Check remaining
    const remaining = getUserNotifications().filter(n => !n.dismissed);
    setNotifications(remaining);
    if (remaining.length > 0) {
      setTimeout(() => {
        setCurrentNotification(remaining[0]);
        setShowNotificationDialog(true);
      }, 500);
    }
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
        {energyServices.map((service) => {
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
// PROVIDER DASHBOARD
// ========================================
function ProviderDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [notifications, setNotifications] = useState<ProviderNotification[]>([]);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<ProviderNotification | null>(null);

  const loadData = useCallback(() => {
    setRequests(getServiceRequests());
  }, []);

  const checkNotifications = useCallback(() => {
    const allNotifications = getProviderNotifications();
    const pending = allNotifications.filter(n => !n.dismissed);
    setNotifications(pending);

    // Show popup for latest undismissed notification
    if (pending.length > 0 && !currentNotification) {
      setCurrentNotification(pending[0]);
      setShowNotificationDialog(true);
    }
  }, [currentNotification]);

  useEffect(() => {
    loadData();
    checkNotifications();

    const interval = setInterval(() => {
      loadData();
      checkNotifications();
    }, 2000);
    return () => clearInterval(interval);
  }, [loadData, checkNotifications]);

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

    // Show next notification if any
    const remaining = getProviderNotifications().filter(n => !n.dismissed);
    if (remaining.length > 0) {
      setTimeout(() => {
        setCurrentNotification(remaining[0]);
        setShowNotificationDialog(true);
      }, 500);
    }
    setNotifications(remaining);
  };

  const handleCompleteSurvey = (notification: ProviderNotification) => {
    // Find the request
    const request = getServiceRequests().find(r => r.id === notification.requestId);
    if (request) {
      updateServiceRequestStatus(notification.requestId, 'completed');
      completeSurvey(request);
      addUserNotification(
        `Great news! The survey for your ${request.serviceTitle} request is complete. Check the billing section for your customized subscription model based on the survey of your area.`,
        'survey-complete'
      );
    }

    dismissProviderNotification(notification.id);
    setShowNotificationDialog(false);
    setCurrentNotification(null);
    loadData();

    toast({
      title: "Survey Completed",
      description: "User has been notified to check their billing section.",
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

  const handleTableStatusChange = (id: string, newStatus: string) => {
    if (newStatus === 'completed') {
      const request = getServiceRequests().find(r => r.id === id);
      if (request) {
        updateServiceRequestStatus(id, 'completed');
        completeSurvey(request);
        addUserNotification(
          `Great news! The survey for your ${request.serviceTitle} request is complete. Check the billing section for your customized subscription model based on the survey of your area.`,
          'survey-complete'
        );
        toast({
          title: "Survey Completed",
          description: "User has been notified to check their billing section.",
        });
      }
    } else {
      updateServiceRequestStatus(id, newStatus as ServiceRequest['status']);
      toast({
        title: "Status Updated",
        description: `Survey status changed to ${newStatus}.`,
      });
    }
    loadData();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary' as const;
      case 'in-progress': return 'default' as const;
      default: return 'outline' as const;
    }
  };

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

      {/* Provider Notification Popup */}
      <Dialog open={showNotificationDialog} onOpenChange={(open) => {
        if (!open) {
          setShowNotificationDialog(false);
          // Don't auto-dismiss, just close the dialog
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

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Incoming Survey Requests</CardTitle>
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
                {requests.map((req) => (
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
    </div>
  );
}

// ========================================
// ADMIN DASHBOARD
// ========================================
function AdminDashboard() {
  return (
    <div className="space-y-6">
      <StatsCards />
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
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const renderDashboard = () => {
    switch (role) {
      case 'user':
        return <UserDashboard />;
      case 'provider':
        return <ProviderDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <p className="p-8 text-center text-muted-foreground">Authenticating session...</p>;
    }
  };
  
  const roleDisplayNames: { [key: string]: string } = {
    user: 'Your Energy Portal',
    provider: 'Provider Control Hub',
    admin: 'EaaS Nexus Command',
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
