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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Leads',
      value: stats?.counts?.leads || 0,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Services',
      value: stats?.counts?.services || 0,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Portfolio Items',
      value: stats?.counts?.portfolio || 0,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Blog Posts',
      value: stats?.counts?.blogPosts || 0,
      icon: FileText,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Testimonials',
      value: stats?.counts?.testimonials || 0,
      icon: MessageSquare,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#1a1f3a] to-[#2d3561] rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-200">Welcome to the admin dashboard - Monitor your system statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-gray-900">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-3 rounded-xl shadow-sm`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1 font-medium">Total count</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-gray-900 font-bold text-xl">Recent Leads</CardTitle>
            <CardDescription className="text-gray-700 font-medium">New leads in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold text-green-600">
              {stats?.recentLeads || 0}
            </div>
            <p className="text-sm text-gray-600 mt-2 font-medium">Active inquiries</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-gray-900 font-bold text-xl">Active Content</CardTitle>
            <CardDescription className="text-gray-700 font-medium">Currently published content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-900 font-semibold">Active Services</span>
                <span className="font-bold text-lg text-blue-600">{stats?.activeContent?.active_services || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-900 font-semibold">Active Portfolio</span>
                <span className="font-bold text-lg text-purple-600">{stats?.activeContent?.active_portfolio || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-900 font-semibold">Published Blogs</span>
                <span className="font-bold text-lg text-pink-600">{stats?.activeContent?.published_blogs || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-900 font-semibold">Active Testimonials</span>
                <span className="font-bold text-lg text-teal-600">{stats?.activeContent?.active_testimonials || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="text-gray-900 font-bold text-xl">Recent Activity</CardTitle>
            <CardDescription className="text-gray-700 font-medium">Latest system activities</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {stats.recentActivity.slice(0, 5).map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
                  <div className="bg-[#10b981] p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-700 font-medium mt-1">
                      {activity.resource} {activity.resource_id ? `#${activity.resource_id.slice(0, 8)}` : ''}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">
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

