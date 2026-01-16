'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Layers, 
  Component,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  Archive
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface CmsPage {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  template: string;
  section_count: number;
  created_at: string;
  updated_at: string;
  created_by_email: string;
}

interface CmsComponent {
  id: string;
  name: string;
  slug: string;
  component_type: string;
  is_active: boolean;
  updated_at: string;
}

const statusIcons: Record<string, any> = {
  draft: Clock,
  published: CheckCircle,
  archived: Archive,
};

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800',
};

export default function CMSPage() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [components, setComponents] = useState<CmsComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'pages' | 'components'>('pages');

  useEffect(() => {
    loadData();
  }, [search, statusFilter, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'pages') {
        const res = await apiClient.request('/admin/cms/pages', {
          method: 'GET',
          params: { search, status: statusFilter, limit: 50 },
        });
        if (res.success) {
          setPages(res.data || []);
        } else {
          console.error('Failed to load pages:', res.message);
        }
      } else {
        const res = await apiClient.request('/admin/cms/components', {
          method: 'GET',
          params: { search },
        });
        if (res.success) {
          setComponents(res.data || []);
        } else {
          console.error('Failed to load components:', res.message);
        }
      }
    } catch (error) {
      console.error('Error loading CMS data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await apiClient.request(`/admin/cms/pages/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const deleteComponent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this component?')) return;
    try {
      await apiClient.request(`/admin/cms/components/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting component:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CMS</h1>
          <p className="text-gray-600">Manage pages, sections, and reusable components</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'pages' ? (
            <Link href="/admin/cms/pages/new">
              <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Page
              </Button>
            </Link>
          ) : (
            <Link href="/admin/cms/components/new">
              <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Component
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pages</CardTitle>
            <FileText className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{pages.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {pages.filter(p => p.status === 'published').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Components</CardTitle>
            <Component className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{components.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'pages'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Pages
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'components'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Component className="h-4 w-4 inline mr-2" />
          Components
        </button>
      </div>

      {/* Content List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>{activeTab === 'pages' ? 'Pages' : 'Components'}</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              {activeTab === 'pages' && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : activeTab === 'pages' ? (
            pages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No pages found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Slug</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Sections</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Updated</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => {
                      const StatusIcon = statusIcons[page.status] || Clock;
                      return (
                        <tr key={page.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{page.title}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">/{page.slug}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[page.status]}`}>
                              <StatusIcon className="h-3 w-3" />
                              {page.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{page.section_count}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(page.updated_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/cms/pages/${page.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deletePage(page.id)}
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
          ) : (
            components.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No components found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className="p-4 rounded-lg border hover:border-[#10b981] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{component.name}</div>
                        <div className="text-sm text-gray-500">{component.slug}</div>
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            {component.component_type}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/admin/cms/components/${component.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteComponent(component.id)}
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
