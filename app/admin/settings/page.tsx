'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    type: 'string' as 'string' | 'number' | 'boolean' | 'json',
    description: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingKey) {
        await apiClient.updateSetting(editingKey, formData);
      } else {
        await apiClient.createSetting(formData);
      }
      setEditingKey(null);
      setShowForm(false);
      resetForm();
      loadSettings();
    } catch (error) {
      console.error('Failed to save setting:', error);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;
    try {
      await apiClient.deleteSetting(key);
      loadSettings();
    } catch (error) {
      console.error('Failed to delete setting:', error);
    }
  };

  const handleEdit = (setting: any) => {
    setEditingKey(setting.key);
    setFormData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
      description: setting.description || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      key: '',
      value: '',
      type: 'string',
      description: '',
    });
    setEditingKey(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage system settings</p>
        </div>
        <Button
          className="bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>

      {showForm && (
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {editingKey ? 'Edit Setting' : 'Add New Setting'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Key</Label>
                <Input
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  disabled={!!editingKey}
                  placeholder="setting_key"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Type</Label>
                <select
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Value</Label>
              <textarea
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                rows={3}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="Setting value"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this setting"
                className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
              />
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
          <CardTitle className="text-xl font-semibold text-gray-900">All Settings</CardTitle>
          <p className="text-sm text-gray-500">Configure system-wide parameters and options.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600 font-semibold">Key</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Value</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Type</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Description</TableHead>
                  <TableHead className="text-gray-600 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-gray-500">
                      No settings found. Click &ldquo;Add Setting&rdquo; to create one.
                    </TableCell>
                  </TableRow>
                )}
                {settings.map((setting) => (
                  <TableRow key={setting.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                    <TableCell className="font-semibold text-gray-900">{setting.key}</TableCell>
                    <TableCell className="max-w-md text-sm text-gray-700 truncate">{setting.value}</TableCell>
                    <TableCell className="text-sm text-gray-700">{setting.type}</TableCell>
                    <TableCell className="text-sm text-gray-600">{setting.description || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleEdit(setting)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(setting.key)}
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

