'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { broadcastAdminNotification, fetchAdminAuditLogs } from '@/lib/admin-api';

export default function AdminNotificationsPage() {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<Array<{
    id: string;
    actorUserId: string;
    action: string;
    entityType: string;
    entityId: string | null;
    createdAt: string;
  }>>([]);

  const loadLogs = async () => {
    try {
      const result = await fetchAdminAuditLogs();
      setLogs(result.logs);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load audit logs',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const onBroadcast = async () => {
    if (!title || !message) {
      toast({ variant: 'destructive', title: 'Title and message are required' });
      return;
    }

    try {
      const result = await broadcastAdminNotification({ title, message });
      setTitle('');
      setMessage('');
      await loadLogs();
      toast({ title: `Broadcast sent to ${result.recipientCount} user(s)` });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Broadcast failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin · Broadcasts & Audit</h1>
        <p className="text-muted-foreground">Send platform-wide notifications and review admin audit history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Broadcast Notification</CardTitle>
          <CardDescription>Send a global message to all users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Message" rows={4} />
          <Button onClick={onBroadcast}>Send Broadcast</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Logs</CardTitle>
          <CardDescription>{logs.length} log entry(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Actor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.entityType}{log.entityId ? `:${log.entityId}` : ''}</TableCell>
                  <TableCell>{log.actorUserId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
