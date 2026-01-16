'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface CmsComponent {
  id: string;
  name: string;
  slug: string;
  component_type: string;
  content: any;
  is_active: boolean;
}

export default function CmsComponentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const componentId = params.id as string;
  
  const [component, setComponent] = useState<CmsComponent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CmsComponent>>({
    is_active: true,
    component_type: 'general',
    content: {},
  });

  useEffect(() => {
    if (componentId && componentId !== 'new') {
      loadComponent();
    } else {
      setLoading(false);
    }
  }, [componentId]);

  const loadComponent = async () => {
    try {
      const res = await apiClient.request(`/admin/cms/components/${componentId}`, {
        method: 'GET',
      });
      if (res.success && res.data) {
        setComponent(res.data);
        setFormData(res.data);
      }
    } catch (error) {
      console.error('Error loading component:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const endpoint = componentId === 'new' 
        ? '/admin/cms/components' 
        : `/admin/cms/components/${componentId}`;
      const method = componentId === 'new' ? 'POST' : 'PUT';
      
      const res = await apiClient.request(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (res.success) {
        if (componentId === 'new') {
          router.push(`/admin/cms/components/${res.data.id}`);
        } else {
          loadComponent();
        }
      }
    } catch (error) {
      console.error('Error saving component:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this component?')) return;
    try {
      await apiClient.request(`/admin/cms/components/${componentId}`, {
        method: 'DELETE',
      });
      router.push('/admin/cms');
    } catch (error) {
      console.error('Error deleting component:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/admin/cms')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {componentId === 'new' ? 'New Component' : formData.name}
          </h1>
        </div>
        <div className="flex gap-3">
          {componentId !== 'new' && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving} className="bg-[#10b981] hover:bg-[#059669]">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Component Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <Input
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              placeholder="component-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Component Type</label>
            <select
              value={formData.component_type || 'general'}
              onChange={(e) => setFormData({ ...formData, component_type: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="general">General</option>
              <option value="header">Header</option>
              <option value="footer">Footer</option>
              <option value="sidebar">Sidebar</option>
              <option value="widget">Widget</option>
              <option value="banner">Banner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content (JSON)</label>
            <Textarea
              value={JSON.stringify(formData.content || {}, null, 2)}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setFormData({ ...formData, content: parsed });
                } catch (err) {
                  // Invalid JSON, keep as is
                }
              }}
              placeholder='{"key": "value"}'
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active || false}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="is_active" className="text-sm font-medium">
              Active
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
