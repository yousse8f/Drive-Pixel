'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  MapPin,
  User,
  Calendar,
  DollarSign,
  Target,
  MessageSquare,
  Plus
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  status: string;
  source: string;
  assigned_to: string;
  lifetime_value: number;
  notes: any[];
  activities: any[];
  deals: any[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [formData, setFormData] = useState<Partial<Customer>>({});

  useEffect(() => {
    if (customerId && customerId !== 'new') {
      loadCustomer();
    } else {
      setLoading(false);
    }
  }, [customerId]);

  const loadCustomer = async () => {
    try {
      const res = await apiClient.request(`/admin/crm/customers/${customerId}`, {
        method: 'GET',
      });
      if (res.success && res.data) {
        setCustomer(res.data);
        setFormData(res.data);
      }
    } catch (error) {
      console.error('Error loading customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const endpoint = customerId === 'new' 
        ? '/admin/crm/customers' 
        : `/admin/crm/customers/${customerId}`;
      const method = customerId === 'new' ? 'POST' : 'PUT';
      
      const res = await apiClient.request(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (res.success) {
        if (customerId === 'new') {
          router.push(`/admin/crm/customers/${res.data.id}`);
        } else {
          loadCustomer();
        }
      }
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await apiClient.request('/admin/crm/notes', {
        method: 'POST',
        body: JSON.stringify({
          customer_id: customerId,
          note: newNote,
        }),
      });
      setNewNote('');
      loadCustomer();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await apiClient.request(`/admin/crm/customers/${customerId}`, {
        method: 'DELETE',
      });
      router.push('/admin/crm');
    } catch (error) {
      console.error('Error deleting customer:', error);
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
          <Button variant="ghost" onClick={() => router.push('/admin/crm')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {customerId === 'new' ? 'New Customer' : `${formData.first_name} ${formData.last_name}`}
          </h1>
        </div>
        <div className="flex gap-3">
          {customerId !== 'new' && (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    value={formData.first_name || ''}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    value={formData.last_name || ''}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input
                    value={formData.job_title || ''}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    placeholder="CEO"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <Input
                    value={formData.state || ''}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <Input
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="USA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <Input
                    value={formData.postal_code || ''}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status || 'new'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Source</label>
                  <Input
                    value={formData.source || ''}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="Website, Referral, etc."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {customerId !== 'new' && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    value={newNote}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    rows={3}
                  />
                  <Button onClick={handleAddNote} className="bg-[#10b981] hover:bg-[#059669]">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {customer?.notes?.map((note: any) => (
                    <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{note.note}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(note.created_at).toLocaleString()} by {note.first_name} {note.last_name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {customerId !== 'new' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lifetime Value</span>
                    <span className="font-bold text-green-600">
                      ${customer?.lifetime_value?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Deals</span>
                    <span className="font-bold">{customer?.deals?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Notes</span>
                    <span className="font-bold">{customer?.notes?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Activities</span>
                    <span className="font-bold">{customer?.activities?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customer?.activities?.slice(0, 5).map((activity: any) => (
                      <div key={activity.id} className="text-sm">
                        <div className="font-medium text-gray-900">{activity.title}</div>
                        <div className="text-gray-500">{activity.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(activity.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
