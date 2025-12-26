'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Activity, Loader2 } from 'lucide-react';

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    resource: '',
    action: '',
  });

  useEffect(() => {
    loadLogs();
  }, [page, filters]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 50 };
      if (filters.resource) params.resource = filters.resource;
      if (filters.action) params.action = filters.action;
      
      const response = await apiClient.getLogs(params);
      if (response.success && response.data) {
        setLogs(response.data.logs || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this log?')) return;
    try {
      await apiClient.deleteLog(id);
      loadLogs();
    } catch (error) {
      console.error('Failed to delete log:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading logs...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Logs</h1>
        <p className="text-gray-600">View system activity logs</p>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Filter by resource"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
              value={filters.resource}
              onChange={(e) => setFilters({ ...filters, resource: e.target.value })}
            />
            <input
              type="text"
              placeholder="Filter by action"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            />
            <Button onClick={loadLogs} className="bg-emerald-500 text-white hover:bg-emerald-600">
              Apply Filters
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600 font-semibold">Action</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Resource</TableHead>
                  <TableHead className="text-gray-600 font-semibold">User</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Details</TableHead>
                  <TableHead className="text-gray-600 font-semibold">IP Address</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Date</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-gray-500">
                      No logs found.
                    </TableCell>
                  </TableRow>
                )}
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-emerald-500" />
                        <span className="font-semibold text-gray-900">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{log.resource}</TableCell>
                    <TableCell className="text-sm text-gray-700">{log.user_email || 'System'}</TableCell>
                    <TableCell className="max-w-md text-sm text-gray-600 truncate">{log.details || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-gray-600">{log.ip_address || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-gray-600">{new Date(log.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(log.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
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

