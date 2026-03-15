'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminProperties, updateAdminPropertySubscriptionStatus } from '@/lib/admin-api';

type AdminProperty = {
  id: string;
  name: string;
  subscriptionStatus: string;
};

const statusOptions = [
  'NONE',
  'SURVEY_PENDING',
  'SURVEY_SUBMITTED',
  'PLAN_PROPOSED',
  'PAYMENT_PENDING',
  'PENDING_INSTALLATION',
  'ACTIVE',
] as const;

export default function AdminSubscriptionsPage() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<AdminProperty[]>([]);

  const load = async () => {
    try {
      const result = await fetchAdminProperties();
      setProperties(result.properties.map((property) => ({
        id: property.id,
        name: property.name,
        subscriptionStatus: property.subscriptionStatus,
      })));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load subscriptions',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onStatusChange = async (propertyId: string, subscriptionStatus: string) => {
    try {
      await updateAdminPropertySubscriptionStatus(propertyId, subscriptionStatus);
      await load();
      toast({ title: 'Subscription status updated' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Status update failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin · Subscriptions</h1>
        <p className="text-muted-foreground">Manually review and update subscription lifecycle states.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription States</CardTitle>
          <CardDescription>{properties.length} property subscription(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Current Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>
                    <Select value={property.subscriptionStatus} onValueChange={(value) => onStatusChange(property.id, value)}>
                      <SelectTrigger className="w-[260px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
