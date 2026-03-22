'use client';

import { useState, useEffect } from 'react';
import {
  fetchProviderInstallations,
  fetchProviderPipeline,
  updateProviderInstallationStatus,
  type ProviderInstallationStatus,
} from '@/lib/provider-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Wrench, ArrowRight, IndianRupee, Clock, User, Zap, ChevronRight, Package } from 'lucide-react';

type InstallationStatus = ProviderInstallationStatus;
type Installation = {
  id: string;
  propertyId: string;
  serviceTitle: string;
  customerName: string;
  machineName: string;
  machineCost: number;
  estimatedSetupDays: number;
  actualStartDate?: string;
  completedDate?: string;
  status: InstallationStatus;
  assignedTechnician: string;
  notes?: string;
  subscriptionPlanSummary?: {
    planName: string;
    totalMonthly: number;
  };
  createdAt: string;
};

const INSTALLATION_STAGES: InstallationStatus[] = [
  'survey',
  'approval',
  'procurement',
  'installation',
  'testing',
  'live',
];

const stageConfig: Record<InstallationStatus, { label: string; color: string; bgColor: string }> = {
  survey: { label: 'Survey', color: 'text-amber-500', bgColor: 'bg-amber-500' },
  approval: { label: 'Approval', color: 'text-orange-500', bgColor: 'bg-orange-500' },
  procurement: { label: 'Procurement', color: 'text-blue-500', bgColor: 'bg-blue-500' },
  installation: { label: 'Installation', color: 'text-indigo-500', bgColor: 'bg-indigo-500' },
  testing: { label: 'Testing', color: 'text-purple-500', bgColor: 'bg-purple-500' },
  live: { label: 'Live', color: 'text-green-500', bgColor: 'bg-green-500' },
};

export default function InstallationsPage() {
  const { toast } = useToast();
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [pipeline, setPipeline] = useState<Record<string, number>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | null>(null);

  const loadData = async () => {
    try {
      const [installationData, pipelineData] = await Promise.all([
        fetchProviderInstallations(),
        fetchProviderPipeline(),
      ]);
      setInstallations(installationData.installations as Installation[]);
      setPipeline(pipelineData.pipeline);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load installations',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, []);

  const handleAdvanceStatus = async (id: string, currentStatus: InstallationStatus) => {
    const currentIndex = INSTALLATION_STAGES.indexOf(currentStatus);
    if (currentIndex < INSTALLATION_STAGES.length - 1) {
      const nextStatus = INSTALLATION_STAGES[currentIndex + 1];
      const extra: Partial<Installation> = {};
      if (nextStatus === 'installation') extra.actualStartDate = new Date().toISOString().split('T')[0];
      if (nextStatus === 'live') extra.completedDate = new Date().toISOString().split('T')[0];
      try {
        await updateProviderInstallationStatus(id, nextStatus, {
          assignedTechnician: extra.assignedTechnician,
          notes: extra.notes,
        });
        await loadData();
        toast({ title: 'Status Updated', description: `Installation moved to ${stageConfig[nextStatus].label}.` });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to update installation',
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const filtered = filterStatus === 'all'
    ? installations
    : installations.filter((i) => i.status === filterStatus);

  const totalInstallations = installations.length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Installations</h1>
        <p className="text-muted-foreground">Manage all installation projects across their lifecycle.</p>
      </div>

      {/* Pipeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Pipeline Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1">
            {INSTALLATION_STAGES.map((stage, i) => {
              const count = pipeline[stage] || 0;
              const config = stageConfig[stage];
              return (
                <div key={stage} className="flex-1 flex items-center">
                  <button
                    onClick={() => setFilterStatus(filterStatus === stage ? 'all' : stage)}
                    className={`w-full rounded-lg border-2 p-3 text-center transition-all hover:shadow-md cursor-pointer ${
                      filterStatus === stage ? 'border-primary shadow-md' : 'border-border'
                    }`}
                  >
                    <div className={`text-3xl font-bold ${config.color}`}>{count}</div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">{config.label}</div>
                    <div className={`h-1.5 rounded-full mt-2 ${config.bgColor}`} />
                  </button>
                  {i < INSTALLATION_STAGES.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 mx-0.5" />
                  )}
                </div>
              );
            })}
          </div>
          {filterStatus !== 'all' && (
            <Button variant="ghost" size="sm" className="mt-3" onClick={() => setFilterStatus('all')}>
              Clear Filter ×
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Installations Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Installations ({filtered.length})</CardTitle>
            <CardDescription>
              {filterStatus === 'all' ? 'Showing all installations' : `Filtered: ${stageConfig[filterStatus as InstallationStatus]?.label}`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Setup (days)</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inst) => {
                const config = stageConfig[inst.status];
                const canAdvance = inst.status !== 'live';
                return (
                  <TableRow key={inst.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedInstallation(inst)}>
                    <TableCell className="font-medium">{inst.customerName}</TableCell>
                    <TableCell>{inst.serviceTitle}</TableCell>
                    <TableCell className="max-w-[180px] truncate" title={inst.machineName}>{inst.machineName}</TableCell>
                    <TableCell>{formatINR(inst.machineCost)}</TableCell>
                    <TableCell>{inst.estimatedSetupDays}d</TableCell>
                    <TableCell>{inst.assignedTechnician || <span className="text-muted-foreground italic">Unassigned</span>}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${config.color} border-current`}>{config.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      {canAdvance && (
                        <Button size="sm" onClick={() => handleAdvanceStatus(inst.id, inst.status)} className="gap-1">
                          Next <ArrowRight className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedInstallation} onOpenChange={(open) => !open && setSelectedInstallation(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline text-xl flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Installation Details
            </DialogTitle>
            <DialogDescription>Full details for this installation project.</DialogDescription>
          </DialogHeader>
          {selectedInstallation && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Customer</p>
                  <p className="text-sm font-semibold flex items-center gap-1"><User className="h-3.5 w-3.5" /> {selectedInstallation.customerName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Service</p>
                  <p className="text-sm font-semibold flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /> {selectedInstallation.serviceTitle}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Machine</p>
                  <p className="text-sm font-semibold">{selectedInstallation.machineName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Cost</p>
                  <p className="text-sm font-semibold flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> {formatINR(selectedInstallation.machineCost)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Est. Setup Time</p>
                  <p className="text-sm font-semibold flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedInstallation.estimatedSetupDays} days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Technician</p>
                  <p className="text-sm font-semibold">{selectedInstallation.assignedTechnician || 'Unassigned'}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase">Progress</p>
                <div className="flex items-center gap-1">
                  {INSTALLATION_STAGES.map((stage, i) => {
                    const currentIdx = INSTALLATION_STAGES.indexOf(selectedInstallation.status);
                    const isComplete = i <= currentIdx;
                    const config = stageConfig[stage];
                    return (
                      <div key={stage} className="flex-1 flex items-center">
                        <div className={`h-2 rounded-full w-full ${isComplete ? config.bgColor : 'bg-muted'}`} />
                        {i < INSTALLATION_STAGES.length - 1 && <div className="w-1" />}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  {INSTALLATION_STAGES.map((s) => <span key={s}>{stageConfig[s].label}</span>)}
                </div>
              </div>

              {selectedInstallation.subscriptionPlanSummary && (
                <div className="rounded-lg border p-3 bg-muted/30">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Subscription Plan Proposed</p>
                  <p className="text-sm font-semibold">{selectedInstallation.subscriptionPlanSummary.planName}</p>
                  <p className="text-sm text-primary font-bold">{formatINR(selectedInstallation.subscriptionPlanSummary.totalMonthly)}/month</p>
                </div>
              )}

              {selectedInstallation.notes && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Notes</p>
                  <p className="text-sm bg-muted/50 rounded-md p-3">{selectedInstallation.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
