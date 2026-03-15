'use client';

import { useState, useEffect } from 'react';
import {
  getEquipmentList,
  updateEquipmentStatus,
  updateEquipmentMaintenance,
  seedProviderMockData,
  type Equipment,
  type EquipmentStatus,
} from '@/lib/provider-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Cpu, Wifi, WifiOff, AlertTriangle, ShieldCheck, Wrench, Calendar } from 'lucide-react';

const statusConfig: Record<EquipmentStatus, { label: string; variant: 'default' | 'destructive' | 'outline' | 'secondary'; icon: typeof Wifi }> = {
  online: { label: 'Online', variant: 'default', icon: Wifi },
  offline: { label: 'Offline', variant: 'destructive', icon: WifiOff },
  'needs-attention': { label: 'Needs Attention', variant: 'secondary', icon: AlertTriangle },
};

export default function EquipmentPage() {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [maintenanceDate, setMaintenanceDate] = useState('');

  const loadData = () => {
    seedProviderMockData();
    setEquipment(getEquipmentList());
  };

  useEffect(() => {
    loadData();
  }, []);

  const onlineCount = equipment.filter((e) => e.status === 'online').length;
  const offlineCount = equipment.filter((e) => e.status === 'offline').length;
  const needsAttentionCount = equipment.filter((e) => e.status === 'needs-attention').length;
  const avgHealth = equipment.length > 0
    ? Math.round(equipment.reduce((sum, e) => sum + e.healthScore, 0) / equipment.length)
    : 0;

  const handleStatusChange = (id: string, newStatus: EquipmentStatus) => {
    const healthScore = newStatus === 'online' ? 95 : newStatus === 'offline' ? 0 : 60;
    updateEquipmentStatus(id, newStatus, healthScore);
    loadData();
    toast({ title: 'Status Updated', description: `Equipment status changed to ${statusConfig[newStatus].label}.` });
  };

  const handleScheduleMaintenance = () => {
    if (!selectedEquipment || !maintenanceDate) return;
    updateEquipmentMaintenance(selectedEquipment.id, maintenanceDate);
    loadData();
    setShowMaintenanceDialog(false);
    setSelectedEquipment(null);
    setMaintenanceDate('');
    toast({ title: 'Maintenance Scheduled', description: `Next maintenance set for ${maintenanceDate}.` });
  };

  const isWarrantyValid = (expiry: string) => new Date(expiry) > new Date();

  const filtered = filterStatus === 'all'
    ? equipment
    : equipment.filter((e) => e.status === filterStatus);

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Equipment</h1>
        <p className="text-muted-foreground">Monitor device health, warranty, and maintenance schedules.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus(filterStatus === 'online' ? 'all' : 'online')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <Wifi className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{onlineCount}</div>
            <p className="text-xs text-muted-foreground">Healthy & operating</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus(filterStatus === 'offline' ? 'all' : 'offline')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <WifiOff className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{offlineCount}</div>
            <p className="text-xs text-muted-foreground">Not responding</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus(filterStatus === 'needs-attention' ? 'all' : 'needs-attention')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{needsAttentionCount}</div>
            <p className="text-xs text-muted-foreground">Degraded performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Health Score</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(avgHealth)}`}>{avgHealth}%</div>
            <Progress value={avgHealth} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {filterStatus !== 'all' && (
        <Button variant="ghost" size="sm" className="w-fit" onClick={() => setFilterStatus('all')}>
          Clear Filter ×
        </Button>
      )}

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Device Inventory ({filtered.length})</CardTitle>
          <CardDescription>All deployed equipment across customer installations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Serial #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Warranty</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((eq) => {
                const config = statusConfig[eq.status];
                const StatusIcon = config.icon;
                const warrantyOk = isWarrantyValid(eq.warrantyExpiry);
                return (
                  <TableRow key={eq.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${eq.status === 'online' ? 'text-green-500' : eq.status === 'offline' ? 'text-red-500' : 'text-amber-500'}`} />
                        {eq.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[140px] truncate">{eq.model}</TableCell>
                    <TableCell className="font-mono text-xs">{eq.serialNumber}</TableCell>
                    <TableCell>{eq.customerName}</TableCell>
                    <TableCell>
                      <Select value={eq.status} onValueChange={(v) => handleStatusChange(eq.id, v as EquipmentStatus)}>
                        <SelectTrigger className="h-8 w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">🟢 Online</SelectItem>
                          <SelectItem value="offline">🔴 Offline</SelectItem>
                          <SelectItem value="needs-attention">🟡 Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Progress value={eq.healthScore} className="h-2 flex-1" />
                        <span className={`text-xs font-medium ${getHealthColor(eq.healthScore)}`}>{eq.healthScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={warrantyOk ? 'outline' : 'destructive'} className="text-[10px]">
                        {warrantyOk ? (
                          <><ShieldCheck className="h-3 w-3 mr-1" /> Valid</>
                        ) : (
                          'Expired'
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {eq.nextMaintenanceDate || <span className="text-muted-foreground italic">Not set</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => {
                          setSelectedEquipment(eq);
                          setMaintenanceDate(eq.nextMaintenanceDate || '');
                          setShowMaintenanceDialog(true);
                        }}
                      >
                        <Calendar className="h-3 w-3" />
                        Schedule
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Maintenance Scheduling Dialog */}
      <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Schedule Maintenance
            </DialogTitle>
            <DialogDescription>
              {selectedEquipment && `Set the next maintenance date for ${selectedEquipment.name} (${selectedEquipment.customerName}).`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="maintenance-date">Next Maintenance Date</Label>
              <Input
                id="maintenance-date"
                type="date"
                value={maintenanceDate}
                onChange={(e) => setMaintenanceDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {selectedEquipment?.lastMaintenanceDate && (
              <p className="text-sm text-muted-foreground">
                Last maintenance: <strong>{selectedEquipment.lastMaintenanceDate}</strong>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMaintenanceDialog(false)}>Cancel</Button>
            <Button onClick={handleScheduleMaintenance} disabled={!maintenanceDate}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
