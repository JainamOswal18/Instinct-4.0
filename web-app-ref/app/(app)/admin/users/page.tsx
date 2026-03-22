'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminUsers, updateAdminUserRole, updateAdminUserStatus } from '@/lib/admin-api';

type AdminUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: 'CITIZEN' | 'ADMIN' | 'EXECUTIVE';
  isActive: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAdminUsers();
      setUsers(result.users);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load users',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onToggleStatus = async (user: AdminUser) => {
    try {
      await updateAdminUserStatus(user.id, !user.isActive);
      await load();
      toast({ title: 'User status updated' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Status update failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const onRoleChange = async (userId: string, role: 'CITIZEN' | 'ADMIN' | 'EXECUTIVE') => {
    try {
      await updateAdminUserRole(userId, role);
      await load();
      toast({ title: 'User role updated' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Role update failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin · Users</h1>
        <p className="text-muted-foreground">Manage account roles and activation status.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>{isLoading ? 'Loading users…' : `${users.length} user(s)`}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.phone || '—'}</div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(value) => onRoleChange(user.id, value as 'CITIZEN' | 'ADMIN' | 'EXECUTIVE')}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CITIZEN">CITIZEN</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="EXECUTIVE">EXECUTIVE</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => onToggleStatus(user)}>
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
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
