'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, Loader2 } from 'lucide-react';

export default function HeroTextsPage() {
  const [heroTexts, setHeroTexts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    loadHeroTexts();
  }, []);

  const loadHeroTexts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getHeroTexts(true);
      if (response.success && response.data) {
        setHeroTexts(response.data);
      }
    } catch (error) {
      console.error('Failed to load hero texts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await apiClient.updateHeroText(editingId, formData);
      } else {
        await apiClient.createHeroText(formData);
      }
      setEditingId(null);
      setShowForm(false);
      resetForm();
      loadHeroTexts();
    } catch (error) {
      console.error('Failed to save hero text:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero text?')) return;
    try {
      await apiClient.deleteHeroText(id);
      loadHeroTexts();
    } catch (error) {
      console.error('Failed to delete hero text:', error);
    }
  };

  const handleEdit = (heroText: any) => {
    setEditingId(heroText.id);
    setFormData({
      title: heroText.title,
      subtitle: heroText.subtitle,
      order: heroText.order || 0,
      isActive: heroText.is_active,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      order: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading hero texts...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Texts</h1>
          <p className="text-gray-600">Manage homepage hero section texts</p>
        </div>
        <Button
          className="bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Hero Text
        </Button>
      </div>

      {showForm && (
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {editingId ? 'Edit Hero Text' : 'Add New Hero Text'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Powerful headline"
                className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Subtitle</Label>
              <textarea
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                rows={3}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Supporting copy with key benefits."
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="mt-2 bg-white text-gray-900"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                  Active
                </Label>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">All Hero Texts</CardTitle>
          <p className="text-sm text-gray-500">Track every headline used on the homepage hero section.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600">Title</TableHead>
                  <TableHead className="text-gray-600">Subtitle</TableHead>
                  <TableHead className="text-gray-600">Order</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroTexts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-gray-500">
                      No hero texts yet. Click &ldquo;Add Hero Text&rdquo; to create one.
                    </TableCell>
                  </TableRow>
                )}
                {heroTexts.map((heroText) => (
                  <TableRow key={heroText.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                    <TableCell className="font-semibold text-gray-900">{heroText.title}</TableCell>
                    <TableCell className="max-w-md text-sm text-gray-700">{heroText.subtitle}</TableCell>
                    <TableCell className="text-sm font-semibold text-gray-900">{heroText.order}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          heroText.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {heroText.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleEdit(heroText)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(heroText.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

