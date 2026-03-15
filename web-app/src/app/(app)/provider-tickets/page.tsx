'use client';

import { useState, useEffect } from 'react';
import {
  getTickets,
  getTicketStats,
  updateTicketStatus,
  seedProviderMockData,
  type SupportTicket,
  type TicketStatus,
  type TicketApprovalAction,
} from '@/lib/provider-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { useToast } from '@/hooks/use-toast';
import { Ticket, AlertTriangle, Clock, CheckCircle, XCircle, User, MailOpen } from 'lucide-react';

const statusConfig: Record<TicketStatus, { label: string; variant: 'default' | 'destructive' | 'outline' | 'secondary' }> = {
  'open': { label: 'Open', variant: 'destructive' },
  'awaiting-approval': { label: 'Awaiting Approval', variant: 'secondary' },
  'in-progress': { label: 'In Progress', variant: 'default' },
  'resolved': { label: 'Resolved', variant: 'outline' },
  'closed': { label: 'Closed', variant: 'outline' },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: 'High', color: 'text-red-500 bg-red-500/10 border-red-500/30' },
  medium: { label: 'Medium', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  low: { label: 'Low', color: 'text-green-500 bg-green-500/10 border-green-500/30' },
};

export default function ProviderTicketsPage() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalAction, setApprovalAction] = useState<TicketApprovalAction>('none');
  const [providerNotes, setProviderNotes] = useState('');

  const loadData = () => {
    seedProviderMockData();
    setTickets(getTickets());
    setStats(getTicketStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (ticket: SupportTicket, newStatus: TicketStatus) => {
    if (newStatus === 'resolved') {
      setSelectedTicket(ticket);
      setShowApprovalDialog(true);
      return;
    }
    updateTicketStatus(ticket.id, newStatus);
    loadData();
    toast({ title: 'Ticket Updated', description: `Status changed to ${statusConfig[newStatus].label}.` });
  };

  const handleApproval = () => {
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, 'resolved', {
      approvalAction,
      providerNotes,
    });
    loadData();
    setShowApprovalDialog(false);
    setSelectedTicket(null);
    setApprovalAction('none');
    setProviderNotes('');
    toast({ title: 'Ticket Resolved', description: 'The ticket has been resolved and the customer will be notified.' });
  };

  const handleApproveAction = (ticket: SupportTicket, action: TicketApprovalAction) => {
    updateTicketStatus(ticket.id, 'in-progress', {
      approvalAction: action,
      providerNotes: `Approved: ${action.replace('-', ' ')}`,
    });
    loadData();
    toast({ title: 'Action Approved', description: `Approved: ${action.replace('-', ' ')}` });
  };

  const getSlaStatus = (ticket: SupportTicket) => {
    if (ticket.status === 'resolved' || ticket.status === 'closed') return 'met';
    const now = new Date();
    const deadline = new Date(ticket.slaDeadline);
    const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursLeft < 0) return 'breached';
    if (hoursLeft < 6) return 'at-risk';
    return 'ok';
  };

  const filtered = filterStatus === 'all'
    ? tickets
    : tickets.filter((t) => t.status === filterStatus);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Support Tickets</h1>
        <p className="text-muted-foreground">Manage customer support tickets and approval workflows.</p>
      </div>

      {/* Ticket Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {([
          { key: 'open', label: 'Open', icon: MailOpen, color: 'text-red-500' },
          { key: 'awaiting-approval', label: 'Awaiting Approval', icon: Clock, color: 'text-amber-500' },
          { key: 'in-progress', label: 'In Progress', icon: Ticket, color: 'text-blue-500' },
          { key: 'resolved', label: 'Resolved', icon: CheckCircle, color: 'text-green-500' },
          { key: 'closed', label: 'Closed', icon: XCircle, color: 'text-muted-foreground' },
        ] as const).map((item) => (
          <Card
            key={item.key}
            className={`cursor-pointer hover:shadow-md transition-shadow ${filterStatus === item.key ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFilterStatus(filterStatus === item.key ? 'all' : item.key)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${item.color}`}>{stats[item.key] || 0}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filterStatus !== 'all' && (
        <Button variant="ghost" size="sm" className="w-fit" onClick={() => setFilterStatus('all')}>
          Clear Filter ×
        </Button>
      )}

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets ({filtered.length})</CardTitle>
          <CardDescription>Click on a ticket to view details and take action.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ticket) => {
                const sla = getSlaStatus(ticket);
                const pConfig = priorityConfig[ticket.priority];
                return (
                  <TableRow key={ticket.id} className={sla === 'breached' ? 'bg-red-500/5' : sla === 'at-risk' ? 'bg-amber-500/5' : ''}>
                    <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{ticket.customerName}</p>
                        <p className="text-xs text-muted-foreground">{ticket.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] capitalize">{ticket.category.replace('-', ' ')}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${pConfig.color}`}>{pConfig.label}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[ticket.status].variant}>{statusConfig[ticket.status].label}</Badge>
                    </TableCell>
                    <TableCell>
                      {sla === 'breached' && <Badge variant="destructive" className="text-[10px] gap-1"><AlertTriangle className="h-3 w-3" /> Breached</Badge>}
                      {sla === 'at-risk' && <Badge variant="secondary" className="text-[10px] text-amber-500 gap-1"><Clock className="h-3 w-3" /> At Risk</Badge>}
                      {sla === 'ok' && <Badge variant="outline" className="text-[10px] text-green-500">On Track</Badge>}
                      {sla === 'met' && <Badge variant="outline" className="text-[10px]">Met</Badge>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{timeAgo(ticket.createdAt)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      {ticket.status === 'open' && (
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(ticket, 'in-progress')}>Start</Button>
                      )}
                      {ticket.status === 'awaiting-approval' && (
                        <div className="flex gap-1 justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleApproveAction(ticket, 'credit')}>Credit</Button>
                          <Button size="sm" variant="outline" onClick={() => handleApproveAction(ticket, 'refund')}>Refund</Button>
                          <Button size="sm" onClick={() => handleApproveAction(ticket, 'dispatch-tech')}>Dispatch</Button>
                        </div>
                      )}
                      {ticket.status === 'in-progress' && (
                        <Button size="sm" onClick={() => handleStatusChange(ticket, 'resolved')}>Resolve</Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resolve Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Resolve Ticket
            </DialogTitle>
            <DialogDescription>
              {selectedTicket && `Resolving: "${selectedTicket.subject}" for ${selectedTicket.customerName}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Resolution Action</Label>
              <Select value={approvalAction} onValueChange={(v) => setApprovalAction(v as TicketApprovalAction)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No special action</SelectItem>
                  <SelectItem value="credit">Issue Credit</SelectItem>
                  <SelectItem value="refund">Process Refund</SelectItem>
                  <SelectItem value="dispatch-tech">Dispatch Technician</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Resolution Notes</Label>
              <Textarea
                placeholder="Describe the resolution..."
                value={providerNotes}
                onChange={(e) => setProviderNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Cancel</Button>
            <Button onClick={handleApproval}>Resolve Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
