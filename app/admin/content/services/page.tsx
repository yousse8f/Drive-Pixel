'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, X, Loader2, ImagePlus, Type } from 'lucide-react';

const isImageIcon = (value: string) => !!value && (value.startsWith('data:') || value.startsWith('http'));

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    items: [] as string[],
    order: 0,
    isActive: true,
  });
  const [newItem, setNewItem] = useState('');
  const [iconMode, setIconMode] = useState<'emoji' | 'image'>('emoji');
  const [iconError, setIconError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getServices(true);
      if (response.success && response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (iconMode === 'image' && !isImageIcon(formData.icon)) {
      setIconError('Upload an image or paste an image URL for the icon.');
      return;
    }
    if (!formData.title.trim()) {
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...formData,
        icon: iconMode === 'emoji' ? formData.icon || '🌐' : formData.icon,
      };

      if (editingId) {
        await apiClient.updateService(editingId, payload);
      } else {
        await apiClient.createService(payload);
      }
      setEditingId(null);
      setShowForm(false);
      resetForm();
      loadServices();
    } catch (error) {
      console.error('Failed to save service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      setDeletingId(id);
      await apiClient.deleteService(id);
      loadServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      items: service.items || [],
      order: service.order || 0,
      isActive: service.is_active,
    });
    setIconMode(isImageIcon(service.icon) ? 'image' : 'emoji');
    setIconError(null);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      items: [],
      order: 0,
      isActive: true,
    });
    setEditingId(null);
    setIconMode('emoji');
    setIconError(null);
  };

  const addItem = () => {
    if (newItem.trim()) {
      setFormData({ ...formData, items: [...formData.items, newItem.trim()] });
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleIconModeChange = (mode: 'emoji' | 'image') => {
    setIconMode(mode);
    if (mode === 'emoji' && isImageIcon(formData.icon)) {
      setFormData((prev) => ({ ...prev, icon: '' }));
    }
    setIconError(null);
  };

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 250 * 1024) {
      setIconError('Please choose an icon smaller than 250KB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, icon: reader.result as string }));
        setIconError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading services...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Manage website services</p>
        </div>
        <Button
          className="bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {showForm && (
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Web Development"
                  className="bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Icon style</Label>
                <div className="mt-2 flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => handleIconModeChange('emoji')}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2 transition ${
                      iconMode === 'emoji' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <Type className="h-4 w-4" />
                    Emoji
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIconModeChange('image')}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2 transition ${
                      iconMode === 'image' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <ImagePlus className="h-4 w-4" />
                    Image
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4">
              {iconMode === 'emoji' ? (
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Emoji icon</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🌐"
                    className="mt-2 max-w-xs bg-white text-gray-900 placeholder:text-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-500">Use any emoji or short text (max 2 characters).</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Upload or paste an image</Label>
                  <Input
                    type="text"
                    placeholder="https://example.com/icon.png"
                    value={
                      isImageIcon(formData.icon) && !formData.icon.startsWith('data:')
                        ? formData.icon
                        : ''
                    }
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="bg-white text-gray-900 placeholder:text-gray-400"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="icon-upload"
                      className="cursor-pointer rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
                    >
                      Upload image
                    </label>
                    <input
                      id="icon-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      className="hidden"
                      onChange={handleIconUpload}
                    />
                    {isImageIcon(formData.icon) && (
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.icon}
                          alt="Service icon preview"
                          className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData((prev) => ({ ...prev, icon: '' }))}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                  {iconError && <p className="text-sm text-red-500">{iconError}</p>}
                  <p className="text-xs text-gray-500">PNG, JPG, or SVG up to 250KB.</p>
                </div>
              )}
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Description</Label>
              <textarea
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Items</Label>
              <div className="mb-2 flex gap-2">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                  placeholder="Add item"
                  className="bg-white text-gray-900 placeholder:text-gray-400"
                />
                <Button type="button" onClick={addItem} disabled={!newItem.trim()}>
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                    <span className="text-gray-700">{item}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="bg-white text-gray-900"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
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
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {saving ? 'Saving...' : 'Save'}
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
          <CardTitle className="text-xl font-semibold text-gray-900">All Services</CardTitle>
          <p className="text-sm text-gray-500">Track every service, manage order, status, and content.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600">Icon</TableHead>
                  <TableHead className="text-gray-600">Title</TableHead>
                  <TableHead className="text-gray-600">Items</TableHead>
                  <TableHead className="text-gray-600">Order</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-gray-500">
                      No services found. Click &ldquo;Add Service&rdquo; to create your first entry.
                    </TableCell>
                  </TableRow>
                )}
                {services.map((service) => {
                  const imageIcon = isImageIcon(service.icon);
                  return (
                    <TableRow key={service.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                      <TableCell className="text-lg font-semibold">
                        {imageIcon ? (
                          <img
                            src={service.icon}
                            alt={`${service.title} icon`}
                            className="h-10 w-10 rounded-lg border border-gray-200 object-cover"
                          />
                        ) : (
                          <span className="text-2xl">{service.icon || '🌐'}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-gray-900">{service.title}</div>
                        <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {(service.items?.length || 0).toString()} items
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-gray-900">{service.order}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            service.is_active
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {service.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(service.id)}
                            disabled={deletingId === service.id}
                          >
                            {deletingId === service.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

