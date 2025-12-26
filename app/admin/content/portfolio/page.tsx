'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, X, Loader2 } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    techStack: [] as string[],
    results: '',
    imageUrl: '',
    order: 0,
    isActive: true,
  });
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getPortfolio(true);
      if (response.success && response.data) {
        setPortfolio(response.data);
      }
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await apiClient.updatePortfolio(editingId, formData);
      } else {
        await apiClient.createPortfolio(formData);
      }
      setEditingId(null);
      setShowForm(false);
      resetForm();
      loadPortfolio();
    } catch (error) {
      console.error('Failed to save portfolio item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      await apiClient.deletePortfolio(id);
      loadPortfolio();
    } catch (error) {
      console.error('Failed to delete portfolio item:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      techStack: item.tech_stack || [],
      results: item.results,
      imageUrl: item.image_url || '',
      order: item.order || 0,
      isActive: item.is_active,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      techStack: [],
      results: '',
      imageUrl: '',
      order: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  const addTech = () => {
    if (newTech.trim()) {
      setFormData({ ...formData, techStack: [...formData.techStack, newTech.trim()] });
      setNewTech('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600">Manage portfolio items</p>
        </div>
        <Button
          className="bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      {showForm && (
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="E-Commerce Platform Redesign"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="SaaS, Healthcare, Retail..."
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Description</Label>
              <textarea
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Summarize the project goals, timeline, or scope."
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Tech Stack</Label>
              <div className="mb-2 mt-2 flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  placeholder="React, Next.js, PostgreSQL..."
                  className="bg-white text-gray-900 placeholder:text-gray-400"
                />
                <Button type="button" onClick={addTech} disabled={!newTech.trim()}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
                  >
                    {tech}
                    <button
                      type="button"
                      className="text-emerald-600 hover:text-emerald-800"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          techStack: formData.techStack.filter((_, i) => i !== index),
                        })
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Results</Label>
                <Input
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  placeholder="e.g. 80% increase in conversion rate"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Image URL</Label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/project.jpg"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
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
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
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
          <CardTitle className="text-xl font-semibold text-gray-900">All Portfolio Items</CardTitle>
          <p className="text-sm text-gray-500">Review every showcase entry with its stack and results.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600">Title</TableHead>
                  <TableHead className="text-gray-600">Category</TableHead>
                  <TableHead className="text-gray-600">Tech Stack</TableHead>
                  <TableHead className="text-gray-600">Results</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolio.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-gray-500">
                      No portfolio items yet. Click &ldquo;Add Portfolio Item&rdquo; to create one.
                    </TableCell>
                  </TableRow>
                )}
                {portfolio.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                    <TableCell className="font-semibold text-gray-900">{item.title}</TableCell>
                    <TableCell className="text-sm text-gray-700">{item.category}</TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {item.tech_stack?.join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{item.results}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          item.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item.id)}
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

