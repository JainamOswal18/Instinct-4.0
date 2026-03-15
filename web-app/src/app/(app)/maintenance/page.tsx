'use client';

import { useState, useEffect } from 'react';
import {
  getMaintenanceSchedules,
  addMaintenanceSchedule,
  cancelMaintenanceSchedule,
  deleteMaintenanceSchedule,
  TIME_SLOTS,
  getSubscribedEnergies,
  type MaintenanceSchedule,
} from '@/lib/maintenance-data';
import type { SubscribedEnergy } from '@/lib/monitor-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Calendar,
  Clock,
  Wrench,
  Plus,
  Trash2,
  XCircle,
  Sun,
  Battery,
  Lightbulb,
  Snowflake,
  Car,
  Droplets,
  Zap,
  CalendarCheck,
  AlertCircle,
} from 'lucide-react';

const serviceIcons: Record<string, React.ElementType> = {
  solar: Sun,
  battery: Battery,
  lighting: Lightbulb,
  cooling: Snowflake,
  'ev-charging': Car,
  'water-heating': Droplets,
};

export default function MaintenancePage() {
  const { toast } = useToast();
  const [subscribed, setSubscribed] = useState<SubscribedEnergy[]>([]);
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [editingSchedule, setEditingSchedule] = useState<MaintenanceSchedule | null>(null);

  const reload = () => {
    setSubscribed(getSubscribedEnergies());
    setSchedules(getMaintenanceSchedules());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleSchedule = (serviceId: string) => {
    const energy = subscribed.find(e => e.serviceId === serviceId);
    if (!energy) return;
    setSelectedService(serviceId);
    setSelectedDate('');
    setSelectedSlot('');
    setNotes('');
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedService || !selectedDate || !selectedSlot) {
      toast({ title: 'Missing fields', description: 'Please fill in date and time slot.', variant: 'destructive' });
      return;
    }
    const energy = subscribed.find(e => e.serviceId === selectedService);
    addMaintenanceSchedule({
      serviceId: selectedService,
      serviceTitle: energy?.serviceTitle || selectedService,
      scheduledDate: selectedDate,
      timeSlot: selectedSlot,
      notes,
    });
    toast({ title: 'Maintenance Scheduled', description: `Maintenance for ${energy?.serviceTitle} scheduled on ${selectedDate}.` });
    setDialogOpen(false);
    reload();
  };

  const handleCancel = (id: string) => {
    cancelMaintenanceSchedule(id);
    toast({ title: 'Cancelled', description: 'Maintenance schedule cancelled.' });
    reload();
  };

  const handleDelete = (id: string) => {
    deleteMaintenanceSchedule(id);
    toast({ title: 'Deleted', description: 'Schedule removed.' });
    reload();
  };

  const openEdit = (schedule: MaintenanceSchedule) => {
    setEditingSchedule(schedule);
    setSelectedService(schedule.serviceId);
    setSelectedDate(schedule.scheduledDate);
    setSelectedSlot(schedule.timeSlot);
    setNotes(schedule.notes);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingSchedule || !selectedDate || !selectedSlot) return;
    const { updateMaintenanceSchedule } = require('@/lib/maintenance-data');
    updateMaintenanceSchedule(editingSchedule.id, {
      scheduledDate: selectedDate,
      timeSlot: selectedSlot,
      notes,
    });
    toast({ title: 'Updated', description: 'Maintenance schedule updated.' });
    setEditDialogOpen(false);
    setEditingSchedule(null);
    reload();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500/15 text-blue-500 border-blue-500/30 hover:bg-blue-500/25">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-500/15 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/25">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/15 text-red-500 border-red-500/30 hover:bg-red-500/25">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Maintenance</h1>
        <p className="text-muted-foreground">Schedule and manage maintenance for your subscribed energies.</p>
      </div>

      {/* Subscribed Services Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          Your Subscribed Services
        </h2>
        {subscribed.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground font-medium">No subscribed energies</p>
            <p className="text-sm text-muted-foreground/70">Complete a service request to schedule maintenance.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscribed.map(energy => {
              const Icon = serviceIcons[energy.serviceId] || Zap;
              const existingSchedules = schedules.filter(
                s => s.serviceId === energy.serviceId && s.status === 'scheduled'
              );
              return (
                <Card key={energy.serviceId} className="transition-all hover:border-primary/30">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{energy.serviceTitle}</CardTitle>
                      <CardDescription>
                        {existingSchedules.length > 0
                          ? `${existingSchedules.length} upcoming`
                          : 'No upcoming maintenance'}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full gap-2"
                      onClick={() => handleSchedule(energy.serviceId)}
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule Maintenance
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Schedules Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Maintenance Schedules
              </CardTitle>
              <CardDescription>All your scheduled, completed, and cancelled maintenance.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No maintenance schedules yet.</p>
              <p className="text-sm text-muted-foreground/70">Click &quot;Schedule Maintenance&quot; on any service above.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map(schedule => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.serviceTitle}</TableCell>
                    <TableCell>{schedule.scheduledDate}</TableCell>
                    <TableCell>{schedule.timeSlot}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{schedule.notes || '—'}</TableCell>
                    <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      {schedule.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(schedule)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(schedule.id)}
                            className="text-amber-500 hover:text-amber-600"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(schedule.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Schedule Maintenance
            </DialogTitle>
            <DialogDescription>
              Set a date and time for{' '}
              {subscribed.find(e => e.serviceId === selectedService)?.serviceTitle || 'your service'}{' '}
              maintenance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="maint-date">Date</Label>
              <Input
                id="maint-date"
                type="date"
                min={today}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map(slot => (
                    <SelectItem key={slot} value={slot}>
                      <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        {slot}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maint-notes">Notes (optional)</Label>
              <Textarea
                id="maint-notes"
                placeholder="Any special instructions..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="gap-2">
              <CalendarCheck className="h-4 w-4" />
              Confirm Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline">Edit Schedule</DialogTitle>
            <DialogDescription>Update the maintenance schedule details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                min={today}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map(slot => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
