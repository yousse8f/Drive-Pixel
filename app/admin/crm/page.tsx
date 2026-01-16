'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Building,
  ChevronRight
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  source: string;
  created_at: string;
  notes_count: number;
  deals_count: number;
}

interface CrmStats {
  customersByStatus: { status: string; count: string }[];
  dealStats: {
    open_deals: string;
    won_deals: string;
    lost_deals: string;
    pipeline_value: string;
    won_value: string;
  };
  pipelineOverview: { name: string; color: string; deal_count: string; total_value: string }[];
  recentActivities: any[];
}

const statusColors: Record<string, string> = {
  new: 'bg-gray-100 text-gray-800',
  contacted: 'bg-blue-100 text-blue-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-purple-100 text-purple-800',
  archived: 'bg-red-100 text-red-800',
};

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CrmStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadData();
  }, [search, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [customersRes, statsRes] = await Promise.all([
        apiClient.request('/admin/crm/customers', {
          method: 'GET',
          params: { search, status: statusFilter, limit: 20 },
        }),
        apiClient.request('/admin/crm/stats', { method: 'GET' }),
      ]);

      if (customersRes.success) {
        setCustomers(customersRes.data || []);
      } else {
        console.error('Failed to load customers:', customersRes.message);
      }
      
      if (statsRes.success) {
        setStats(statsRes.data);
      } else {
        console.error('Failed to load stats:', statsRes.message);
      }
    } catch (error) {
      console.error('Error loading CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM</h1>
          <p className="text-gray-600">Manage customers, deals, and pipeline</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/crm/customers/new">
            <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats?.customersByStatus?.reduce((acc, s) => acc + parseInt(s.count), 0) || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Open Deals</CardTitle>
            <Target className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats?.dealStats?.open_deals || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pipeline Value</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(stats?.dealStats?.pipeline_value || 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Won Value</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(stats?.dealStats?.won_value || 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Overview */}
      {stats?.pipelineOverview && stats.pipelineOverview.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {stats.pipelineOverview.map((stage) => (
                <div
                  key={stage.name}
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: `${stage.color}20` }}
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: stage.color }}
                  />
                  <div className="text-sm font-medium text-gray-700">{stage.name}</div>
                  <div className="text-2xl font-bold text-gray-900">{stage.deal_count}</div>
                  <div className="text-xs text-gray-500">{formatCurrency(stage.total_value)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customers List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Customers</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No customers found</div>
          ) : (
            <div className="space-y-3">
              {customers.map((customer) => (
                <Link
                  key={customer.id}
                  href={`/admin/crm/customers/${customer.id}`}
                  className="block p-4 rounded-lg border hover:border-[#10b981] hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center text-white font-bold text-lg">
                        {customer.first_name?.[0]?.toUpperCase() || 'C'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {customer.first_name} {customer.last_name}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </span>
                          {customer.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </span>
                          )}
                          {customer.company && (
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {customer.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[customer.status] || 'bg-gray-100'}`}>
                        {customer.status}
                      </span>
                      <div className="text-sm text-gray-500">
                        {customer.deals_count} deals
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
