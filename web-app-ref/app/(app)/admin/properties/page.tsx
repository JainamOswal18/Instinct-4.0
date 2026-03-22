'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminProperties } from '@/lib/admin-api';

type AdminProperty = {
  id: string;
  userId: string;
  name: string;
  address: string;
  type: string;
  subscriptionStatus: string;
  createdAt: string;
};

export default function AdminPropertiesPage() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<AdminProperty[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchAdminProperties();
        setProperties(result.properties);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to load properties',
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin · Properties</h1>
        <p className="text-muted-foreground">Platform-wide property overview and subscription states.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
          <CardDescription>{properties.length} property record(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="font-medium">{property.name}</div>
                    <div className="text-xs text-muted-foreground">User ID: {property.userId}</div>
                  </TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell className="uppercase">{property.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{property.subscriptionStatus}</Badge>
                  </TableCell>
                  <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
