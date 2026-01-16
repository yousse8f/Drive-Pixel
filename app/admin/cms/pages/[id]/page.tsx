'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Plus,
  Eye,
  Layers
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface CmsPage {
  id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  status: 'draft' | 'published' | 'archived';
  template: string;
  sections: any[];
}

export default function CmsPageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;
  
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CmsPage>>({
    status: 'draft',
    template: 'default',
  });

  useEffect(() => {
    if (pageId && pageId !== 'new') {
      loadPage();
    } else {
      setLoading(false);
    }
  }, [pageId]);

  const loadPage = async () => {
    try {
      const res = await apiClient.request(`/admin/cms/pages/${pageId}`, {
        method: 'GET',
      });
      if (res.success && res.data) {
        setPage(res.data);
        setFormData(res.data);
      }
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const endpoint = pageId === 'new' 
        ? '/admin/cms/pages' 
        : `/admin/cms/pages/${pageId}`;
      const method = pageId === 'new' ? 'POST' : 'PUT';
      
      const res = await apiClient.request(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (res.success) {
        if (pageId === 'new') {
          router.push(`/admin/cms/pages/${res.data.id}`);
        } else {
          loadPage();
        }
      }
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await apiClient.request(`/admin/cms/pages/${pageId}`, {
        method: 'DELETE',
      });
      router.push('/admin/cms');
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleAddSection = async () => {
    try {
      const res = await apiClient.request('/admin/cms/sections', {
        method: 'POST',
        body: JSON.stringify({
          page_id: pageId,
          name: 'New Section',
          section_type: 'content',
          content: {},
          order: page?.sections?.length || 0,
        }),
      });
      if (res.success) {
        loadPage();
      }
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    try {
      await apiClient.request(`/admin/cms/sections/${sectionId}`, {
        method: 'DELETE',
      });
      loadPage();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/admin/cms')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {pageId === 'new' ? 'New Page' : formData.title}
          </h1>
        </div>
        <div className="flex gap-3">
          {pageId !== 'new' && (
            <>
              <Button variant="outline" onClick={() => window.open(`/${formData.slug}`, '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
          <Button onClick={handleSave} disabled={saving} className="bg-[#10b981] hover:bg-[#059669]">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Page Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <Input
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="page-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meta Title</label>
                <Input
                  value={formData.meta_title || ''}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="SEO Meta Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <Textarea
                  value={formData.meta_description || ''}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="SEO Meta Description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Template</label>
                  <select
                    value={formData.template || 'default'}
                    onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="default">Default</option>
                    <option value="landing">Landing Page</option>
                    <option value="blog">Blog</option>
                    <option value="service">Service</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          {pageId !== 'new' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Page Sections</CardTitle>
                <Button onClick={handleAddSection} size="sm" className="bg-[#10b981] hover:bg-[#059669]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {page?.sections?.map((section: any, index: number) => (
                    <div key={section.id} className="p-4 border rounded-lg hover:border-[#10b981] transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Layers className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{section.name}</div>
                            <div className="text-sm text-gray-500">{section.section_type}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSection(section.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!page?.sections || page.sections.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No sections yet. Click "Add Section" to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.status === 'published' ? 'bg-green-100 text-green-800' :
                  formData.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {formData.status}
                </span>
              </div>
              {pageId !== 'new' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sections</span>
                    <span className="font-bold">{page?.sections?.length || 0}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="text-xs text-gray-500">
                      Last updated: {page ? new Date(page.sections?.[0]?.updated_at || Date.now()).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-blue-600 text-lg font-medium">
                  {formData.meta_title || formData.title || 'Page Title'}
                </div>
                <div className="text-green-700 text-sm">
                  {typeof window !== 'undefined' && window.location.origin}/{formData.slug || 'page-slug'}
                </div>
                <div className="text-gray-600 text-sm">
                  {formData.meta_description || 'No meta description set'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
