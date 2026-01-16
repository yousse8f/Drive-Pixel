'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Users, 
  FileText, 
  Send,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface EmailList {
  id: string;
  name: string;
  description: string;
  type: string;
  subscriber_count: number;
  active_subscribers: number;
  is_active: boolean;
  created_at: string;
}

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  list_name: string;
  total_recipients: number;
  sent_count: number;
  open_count: number;
  click_count: number;
  sent_at: string;
  created_at: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  is_active: boolean;
  updated_at: string;
}

interface EmailStats {
  overview: {
    total_lists: string;
    total_subscribers: string;
    total_templates: string;
    total_campaigns: string;
    sent_campaigns: string;
  };
  recentCampaigns: any[];
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  sending: 'bg-yellow-100 text-yellow-800',
  sent: 'bg-green-100 text-green-800',
  paused: 'bg-orange-100 text-orange-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusIcons: Record<string, any> = {
  draft: Clock,
  scheduled: Clock,
  sending: Send,
  sent: CheckCircle,
  paused: Pause,
  cancelled: XCircle,
};

export default function EmailPage() {
  const [lists, setLists] = useState<EmailList[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'lists' | 'templates'>('campaigns');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const statsRes = await apiClient.request('/admin/email/stats', { method: 'GET' });
      if (statsRes.success) {
        setStats(statsRes.data);
      }

      if (activeTab === 'campaigns') {
        const res = await apiClient.request('/admin/email/campaigns', { method: 'GET', params: { limit: 50 } });
        if (res.success) setCampaigns(res.data || []);
      } else if (activeTab === 'lists') {
        const res = await apiClient.request('/admin/email/lists', { method: 'GET', params: { limit: 50 } });
        if (res.success) setLists(res.data || []);
      } else {
        const res = await apiClient.request('/admin/email/templates', { method: 'GET' });
        if (res.success) setTemplates(res.data || []);
      }
    } catch (error) {
      console.error('Error loading email data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await apiClient.request(`/admin/email/campaigns/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const deleteList = async (id: string) => {
    if (!confirm('Are you sure you want to delete this list?')) return;
    try {
      await apiClient.request(`/admin/email/lists/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const deleteTemplate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;
    try {
      await apiClient.request(`/admin/email/templates/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const sendCampaign = async (id: string) => {
    if (!confirm('Are you sure you want to send this campaign now?')) return;
    try {
      await apiClient.request(`/admin/email/campaigns/${id}/send`, { method: 'POST' });
      loadData();
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Broadcasting</h1>
          <p className="text-gray-600">Manage email lists, templates, and campaigns</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'campaigns' && (
            <Link href="/admin/email/campaigns/new">
              <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          )}
          {activeTab === 'lists' && (
            <Link href="/admin/email/lists/new">
              <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
                <Plus className="h-4 w-4 mr-2" />
                New List
              </Button>
            </Link>
          )}
          {activeTab === 'templates' && (
            <Link href="/admin/email/templates/new">
              <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lists</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.overview?.total_lists || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Subscribers</CardTitle>
            <Mail className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.overview?.total_subscribers || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Templates</CardTitle>
            <FileText className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.overview?.total_templates || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Campaigns</CardTitle>
            <Send className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.overview?.total_campaigns || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sent</CardTitle>
            <CheckCircle className="h-5 w-5 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.overview?.sent_campaigns || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'campaigns'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Send className="h-4 w-4 inline mr-2" />
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('lists')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'lists'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Lists
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'templates'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Templates
        </button>
      </div>

      {/* Content */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : activeTab === 'campaigns' ? (
            campaigns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No campaigns found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">List</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Recipients</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Opens</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Clicks</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => {
                      const StatusIcon = statusIcons[campaign.status] || Clock;
                      const openRate = campaign.sent_count > 0 
                        ? ((campaign.open_count / campaign.sent_count) * 100).toFixed(1) 
                        : '0';
                      const clickRate = campaign.sent_count > 0 
                        ? ((campaign.click_count / campaign.sent_count) * 100).toFixed(1) 
                        : '0';
                      return (
                        <tr key={campaign.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.subject}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                              <StatusIcon className="h-3 w-3" />
                              {campaign.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{campaign.list_name}</td>
                          <td className="py-3 px-4 text-gray-600">{campaign.total_recipients}</td>
                          <td className="py-3 px-4 text-gray-600">{campaign.open_count} ({openRate}%)</td>
                          <td className="py-3 px-4 text-gray-600">{campaign.click_count} ({clickRate}%)</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              {campaign.status === 'draft' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => sendCampaign(campaign.id)}
                                  className="text-green-500 hover:text-green-700"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              <Link href={`/admin/email/campaigns/${campaign.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteCampaign(campaign.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : activeTab === 'lists' ? (
            lists.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No lists found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lists.map((list) => (
                  <div
                    key={list.id}
                    className="p-4 rounded-lg border hover:border-[#10b981] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{list.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{list.description}</div>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="text-2xl font-bold text-[#10b981]">{list.active_subscribers || list.subscriber_count}</span>
                          <span className="text-sm text-gray-500">subscribers</span>
                        </div>
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {list.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/admin/email/lists/${list.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteList(list.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            templates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No templates found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 rounded-lg border hover:border-[#10b981] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{template.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{template.subject}</div>
                        <div className="mt-2">
                          {template.category && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                              {template.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/admin/email/templates/${template.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTemplate(template.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
