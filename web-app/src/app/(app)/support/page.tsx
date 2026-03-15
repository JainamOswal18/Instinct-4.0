'use client';

import { useState, useEffect } from 'react';
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  escalateTicket,
  addTicketResponse,
  CATEGORIES,
  PRIORITIES,
  type SupportTicket,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from '@/lib/support-tickets';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Trash2,
  Edit3,
  ArrowUpRight,
  LifeBuoy,
  MessageSquare,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  ChevronRight,
} from 'lucide-react';

const faqItems = [
  {
    question: "How do I read my energy bill?",
    answer: "Your bill details your consumption in kWh, charges per unit, and any fixed fees. You can find a detailed breakdown in the Billing section."
  },
  {
    question: "What does 'peak hours' mean?",
    answer: "Peak hours are times of high electricity demand, usually in the evening. Energy might cost more during these times. Check your plan details for specifics."
  },
  {
    question: "My smart device is offline. What should I do?",
    answer: "First, check if the device has power and is connected to your Wi-Fi. You can also try restarting it. If the problem persists, create a support ticket."
  },
  {
    question: "How can I lower my monthly bill?",
    answer: "Try reducing consumption during peak hours, using energy-efficient appliances, and checking for any faults reported by our AI."
  }
];

function getStatusConfig(status: TicketStatus) {
  switch (status) {
    case 'open':
      return { label: 'Open', class: 'bg-blue-500/15 text-blue-500 border-blue-500/30', icon: Clock };
    case 'in-progress':
      return { label: 'In Progress', class: 'bg-amber-500/15 text-amber-500 border-amber-500/30', icon: Clock };
    case 'resolved':
      return { label: 'Resolved', class: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: CheckCircle2 };
    case 'closed':
      return { label: 'Closed', class: 'bg-gray-500/15 text-gray-500 border-gray-500/30', icon: XCircle };
    case 'escalated':
      return { label: 'Escalated', class: 'bg-red-500/15 text-red-500 border-red-500/30', icon: ArrowUpRight };
    default:
      return { label: status, class: '', icon: Clock };
  }
}

function getPriorityBadge(priority: TicketPriority) {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive" className="text-xs">High</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/30 text-xs hover:bg-amber-500/25">Medium</Badge>;
    case 'low':
      return <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 text-xs hover:bg-emerald-500/25">Low</Badge>;
  }
}

export default function SupportPage() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Create Dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<TicketCategory>('general');
  const [newPriority, setNewPriority] = useState<TicketPriority>('medium');

  // Detail Dialog
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState('');

  // Edit Dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editSubject, setEditSubject] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCategory, setEditCategory] = useState<TicketCategory>('general');
  const [editPriority, setEditPriority] = useState<TicketPriority>('medium');

  // Delete Confirm
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');

  // Escalate Confirm
  const [escalateOpen, setEscalateOpen] = useState(false);
  const [escalateId, setEscalateId] = useState<string>('');

  const reload = () => setTickets(getTickets());

  useEffect(() => { reload(); }, []);

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // CREATE
  const handleCreate = () => {
    if (!newSubject.trim() || !newDesc.trim()) {
      toast({ title: 'Missing fields', description: 'Subject and description are required.', variant: 'destructive' });
      return;
    }
    createTicket({ subject: newSubject, description: newDesc, category: newCategory, priority: newPriority });
    toast({ title: 'Ticket Created', description: `Ticket "${newSubject}" has been submitted.` });
    setCreateOpen(false);
    setNewSubject(''); setNewDesc(''); setNewCategory('general'); setNewPriority('medium');
    reload();
  };

  // VIEW DETAIL
  const openDetail = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setResponseText('');
    setDetailOpen(true);
  };

  // ADD RESPONSE
  const handleAddResponse = () => {
    if (!selectedTicket || !responseText.trim()) return;
    addTicketResponse(selectedTicket.id, responseText);
    setResponseText('');
    reload();
    const updated = getTickets().find(t => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
    toast({ title: 'Response Added' });
  };

  // EDIT
  const openEdit = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setEditSubject(ticket.subject);
    setEditDesc(ticket.description);
    setEditCategory(ticket.category);
    setEditPriority(ticket.priority);
    setEditOpen(true);
  };

  const handleEdit = () => {
    if (!selectedTicket) return;
    updateTicket(selectedTicket.id, { subject: editSubject, description: editDesc, category: editCategory, priority: editPriority });
    toast({ title: 'Ticket Updated' });
    setEditOpen(false);
    reload();
  };

  // DELETE
  const confirmDelete = (id: string) => { setDeleteId(id); setDeleteOpen(true); };
  const handleDelete = () => {
    deleteTicket(deleteId);
    toast({ title: 'Ticket Deleted' });
    setDeleteOpen(false);
    reload();
  };

  // ESCALATE
  const confirmEscalate = (id: string) => { setEscalateId(id); setEscalateOpen(true); };
  const handleEscalate = () => {
    escalateTicket(escalateId);
    toast({ title: 'Ticket Escalated', description: 'Your ticket has been escalated to the energy provider.' });
    setEscalateOpen(false);
    if (selectedTicket?.id === escalateId) {
      const updated = getTickets().find(t => t.id === escalateId);
      if (updated) setSelectedTicket(updated);
    }
    reload();
  };

  const openCount = tickets.filter(t => t.status === 'open').length;
  const escalatedCount = tickets.filter(t => t.status === 'escalated').length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Support Center</h1>
          <p className="text-muted-foreground">Create, manage, and escalate support tickets.</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">Total Tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-500">{openCount}</div>
            <p className="text-xs text-muted-foreground">Open</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-500">{escalatedCount}</div>
            <p className="text-xs text-muted-foreground">Escalated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-500">
              {tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}
            </div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                My Tickets
              </CardTitle>
              <CardDescription>View and manage all your support tickets.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <LifeBuoy className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground font-medium">
                {tickets.length === 0 ? 'No tickets yet' : 'No tickets match your filter'}
              </p>
              <p className="text-sm text-muted-foreground/70">
                {tickets.length === 0 ? 'Click "New Ticket" to create your first support ticket.' : 'Try adjusting your search or filter.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map(ticket => {
                  const statusCfg = getStatusConfig(ticket.status);
                  return (
                    <TableRow
                      key={ticket.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => openDetail(ticket)}
                    >
                      <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">{ticket.subject}</TableCell>
                      <TableCell className="capitalize">{ticket.category}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusCfg.class}>
                          {statusCfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEdit(ticket)}>
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                          {ticket.status !== 'escalated' && ticket.status !== 'closed' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-amber-500 hover:text-amber-600"
                              onClick={() => confirmEscalate(ticket.id)}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => confirmDelete(ticket.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find quick answers to common questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* === DIALOGS === */}

      {/* Create Ticket Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              New Support Ticket
            </DialogTitle>
            <DialogDescription>Describe your issue and we&apos;ll help you resolve it.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="ticket-subject">Subject</Label>
              <Input
                id="ticket-subject"
                placeholder="Brief summary of your issue"
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticket-desc">Description</Label>
              <Textarea
                id="ticket-desc"
                placeholder="Describe the issue in detail..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newCategory} onValueChange={(v) => setNewCategory(v as TicketCategory)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={newPriority} onValueChange={(v) => setNewPriority(v as TicketPriority)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} className="gap-2">
              <Send className="h-4 w-4" />
              Submit Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedTicket && (() => {
            const statusCfg = getStatusConfig(selectedTicket.status);
            return (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DialogTitle className="font-headline text-lg">{selectedTicket.subject}</DialogTitle>
                      <DialogDescription className="mt-1">
                        <span className="font-mono text-xs">{selectedTicket.id}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{selectedTicket.category}</span>
                        <span className="mx-2">•</span>
                        {new Date(selectedTicket.createdAt).toLocaleString()}
                      </DialogDescription>
                    </div>
                    <Badge variant="outline" className={statusCfg.class}>{statusCfg.label}</Badge>
                  </div>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm whitespace-pre-wrap">{selectedTicket.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Priority:</span>
                    {getPriorityBadge(selectedTicket.priority)}
                    {selectedTicket.escalatedTo && (
                      <>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-red-500 text-xs font-medium flex items-center gap-1">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          Escalated to {selectedTicket.escalatedTo}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Responses Thread */}
                  {selectedTicket.responses.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Conversation</h4>
                      {selectedTicket.responses.map(resp => (
                        <div
                          key={resp.id}
                          className={`p-3 rounded-lg text-sm ${
                            resp.author === 'user'
                              ? 'bg-primary/5 border border-primary/20 ml-4'
                              : 'bg-muted/50 mr-4'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium capitalize">{resp.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(resp.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap">{resp.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Response */}
                  {selectedTicket.status !== 'closed' && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a response..."
                        value={responseText}
                        onChange={e => setResponseText(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddResponse(); }}}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleAddResponse} disabled={!responseText.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" onClick={() => { setDetailOpen(false); openEdit(selectedTicket); }}>
                      <Edit3 className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    {selectedTicket.status !== 'escalated' && selectedTicket.status !== 'closed' && (
                      <Button size="sm" variant="outline" className="text-amber-600" onClick={() => { setDetailOpen(false); confirmEscalate(selectedTicket.id); }}>
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                        Escalate
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-red-500 ml-auto" onClick={() => { setDetailOpen(false); confirmDelete(selectedTicket.id); }}>
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline">Edit Ticket</DialogTitle>
            <DialogDescription>Update the ticket details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input value={editSubject} onChange={e => setEditSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={editCategory} onValueChange={(v) => setEditCategory(v as TicketCategory)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={editPriority} onValueChange={(v) => setEditPriority(v as TicketPriority)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Ticket?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The ticket and all its responses will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Escalate Confirmation */}
      <AlertDialog open={escalateOpen} onOpenChange={setEscalateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Escalate to Energy Provider?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will escalate your ticket directly to your energy provider for priority handling.
              The provider will be notified and will respond as soon as possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEscalate} className="bg-amber-500 text-white hover:bg-amber-600">
              Escalate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
