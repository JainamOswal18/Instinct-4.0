'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminTicketDetail, fetchAdminTickets, replyToAdminTicket, updateAdminTicket } from '@/lib/admin-api';

type AdminTicket = {
  id: string;
  userId: string;
  propertyId: string;
  propertyName: string | null;
  propertyAddress: string | null;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  updatedAt: string;
  raisedBy: {
    id: string;
    name: string;
    email: string | null;
  };
  answeredBy: {
    id: string;
    name: string;
    email: string | null;
    repliedAt: string | null;
  } | null;
  messageCount: number;
};

type TicketMessage = {
  id: string;
  message: string;
  messageType: 'customer' | 'admin_reply' | 'system';
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string | null;
  };
};

export default function AdminSupportPage() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSendingReply, setIsSendingReply] = useState(false);

  const load = async () => {
    try {
      const result = await fetchAdminTickets();
      setTickets(result.tickets);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load support tickets',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onFieldUpdate = async (
    ticketId: string,
    patch: { status?: 'open' | 'in_progress' | 'resolved' | 'closed'; priority?: 'low' | 'medium' | 'high' },
  ) => {
    try {
      await updateAdminTicket(ticketId, patch);
      await load();
      toast({ title: 'Ticket updated' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ticket update failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const openTicketDetail = async (ticket: AdminTicket) => {
    try {
      const detail = await fetchAdminTicketDetail(ticket.id);
      setSelectedTicket(ticket);
      setMessages(detail.messages);
      setReplyText('');
      setIsDetailOpen(true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load ticket details',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const sendReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;

    try {
      setIsSendingReply(true);
      await replyToAdminTicket(selectedTicket.id, replyText.trim());
      const detail = await fetchAdminTicketDetail(selectedTicket.id);
      setMessages(detail.messages);
      setReplyText('');
      await load();
      toast({ title: 'Reply sent' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to send reply',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSendingReply(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin · Support Ops</h1>
        <p className="text-muted-foreground">Manage support queue priority and status.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>{tickets.length} ticket(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Raised By</TableHead>
                <TableHead>Last Answered By</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-xs text-muted-foreground">{ticket.propertyName || ticket.propertyId}</div>
                    <div className="text-xs text-muted-foreground">Updated: {new Date(ticket.updatedAt).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Messages: {ticket.messageCount}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{ticket.raisedBy.name}</div>
                    <div className="text-xs text-muted-foreground">{ticket.raisedBy.email || 'No email'}</div>
                  </TableCell>
                  <TableCell>
                    {ticket.answeredBy ? (
                      <>
                        <div className="font-medium">{ticket.answeredBy.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {ticket.answeredBy.repliedAt ? new Date(ticket.answeredBy.repliedAt).toLocaleString() : 'Recent'}
                        </div>
                      </>
                    ) : (
                      <Badge variant="outline">No reply yet</Badge>
                    )}
                  </TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <Select value={ticket.status} onValueChange={(value) => onFieldUpdate(ticket.id, { status: value as AdminTicket['status'] })}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">open</SelectItem>
                        <SelectItem value="in_progress">in_progress</SelectItem>
                        <SelectItem value="resolved">resolved</SelectItem>
                        <SelectItem value="closed">closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select value={ticket.priority} onValueChange={(value) => onFieldUpdate(ticket.id, { priority: value as AdminTicket['priority'] })}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">low</SelectItem>
                        <SelectItem value="medium">medium</SelectItem>
                        <SelectItem value="high">high</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => openTicketDetail(ticket)}>
                      View Thread
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.title || 'Ticket Details'}</DialogTitle>
            <DialogDescription>
              Raised by {selectedTicket?.raisedBy.name || '-'} · {selectedTicket?.propertyName || selectedTicket?.propertyId || '-'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {messages.map((message) => (
              <div key={message.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">{message.author.name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{message.author.email || 'No email'} · {message.messageType}</div>
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              </div>
            ))}
            {messages.length === 0 && <div className="text-sm text-muted-foreground">No messages yet.</div>}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Write a response to this ticket..."
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              rows={4}
            />
            <div className="flex justify-end">
              <Button onClick={sendReply} disabled={isSendingReply || !replyText.trim()}>
                {isSendingReply ? 'Sending...' : 'Send Reply'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
