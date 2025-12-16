'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, FileText, MessageSquare, TrendingUp, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await apiClient.getDashboardStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.counts?.users || 0,
      icon: Users,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
    },
    {
      title: 'Total Leads',
      value: stats?.counts?.leads || 0,
      icon: TrendingUp,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
    },
    {
      title: 'Services',
      value: stats?.counts?.services || 0,
      icon: Briefcase,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
    },
    {
      title: 'Portfolio Items',
      value: stats?.counts?.portfolio || 0,
      icon: FileText,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
    },
    {
      title: 'Blog Posts',
      value: stats?.counts?.blogPosts || 0,
      icon: FileText,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
    },
    {
      title: 'Testimonials',
      value: stats?.counts?.testimonials || 0,
      icon: MessageSquare,
      color: 'text-slate-900',
      bgColor: 'bg-slate-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads (7 days)</CardTitle>
            <CardDescription>New leads in the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary-900">
              {stats?.recentLeads || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Content</CardTitle>
            <CardDescription>Currently published content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Services</span>
                <span className="font-semibold">{stats?.activeContent?.active_services || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Portfolio</span>
                <span className="font-semibold">{stats?.activeContent?.active_portfolio || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published Blogs</span>
                <span className="font-semibold">{stats?.activeContent?.published_blogs || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Testimonials</span>
                <span className="font-semibold">{stats?.activeContent?.active_testimonials || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentActivity.slice(0, 5).map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Activity className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500">
                      {activity.resource} {activity.resource_id ? `#${activity.resource_id.slice(0, 8)}` : ''}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(activity.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

