'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UsersPage() {
  type Role = 'admin' | 'user';

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [roleStatus, setRoleStatus] = useState<Record<string, 'saving' | 'success' | 'error' | undefined>>({});
  const roleOptions: Role[] = ['admin', 'user'];

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getUsers(page, 50);
      if (response.success && response.data) {
        setUsers(response.data.users || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: Role) => {
    setRoleStatus((prev) => ({ ...prev, [userId]: 'saving' }));
    try {
      const response = await apiClient.updateUser(userId, { role: newRole });
      if (response.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setRoleStatus((prev) => ({ ...prev, [userId]: 'success' }));
        setTimeout(() => setRoleStatus((prev) => ({ ...prev, [userId]: undefined })), 2000);
      } else {
        setRoleStatus((prev) => ({ ...prev, [userId]: 'error' }));
      }
    } catch (error) {
      console.error('Failed to update role:', error);
      setRoleStatus((prev) => ({ ...prev, [userId]: 'error' }));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await apiClient.deleteUser(id);
      if (response.success) {
        loadUsers();
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-sm text-slate-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Users</h1>
        <p className="text-slate-600">Manage system users and permissions</p>
      </div>

      <Card className="border border-gray-100 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg text-slate-900">All Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-slate-600">Email</TableHead>
                <TableHead className="text-slate-600">Name</TableHead>
                <TableHead className="text-slate-600">Role</TableHead>
                <TableHead className="text-slate-600">Created</TableHead>
                <TableHead className="text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="text-slate-900">{user.email}</TableCell>
                  <TableCell className="text-slate-800">{user.firstName} {user.lastName}</TableCell>
                  <TableCell className="text-slate-800">
                    <Select value={(user.role as Role) || 'user'} onValueChange={(newRole) => handleRoleChange(user.id, newRole as Role)}>
                      <SelectTrigger className="w-[150px] text-xs border-gray-200 shadow-sm focus:ring-2 focus:ring-slate-200">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role === 'admin' ? 'Admin' : 'User'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {roleStatus[user.id] && (
                      <div
                        className={`mt-1 text-xs ${
                          roleStatus[user.id] === 'success'
                            ? 'text-emerald-600'
                            : roleStatus[user.id] === 'saving'
                            ? 'text-slate-500'
                            : 'text-red-600'
                        }`}
                      >
                        {roleStatus[user.id] === 'saving' && 'Saving...'}
                        {roleStatus[user.id] === 'success' && 'Updated'}
                        {roleStatus[user.id] === 'error' && 'Error updating role'}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-700">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="border-gray-200 text-slate-700 hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-4 border-t border-gray-100 bg-gray-50">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-gray-200 text-slate-700 hover:bg-gray-100"
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="border-gray-200 text-slate-700 hover:bg-gray-100"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

