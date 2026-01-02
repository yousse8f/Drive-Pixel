'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, Loader2, Mail } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    image: '',
    slug: '',
    isPublished: false,
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [deletingSubscriberId, setDeletingSubscriberId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
    loadSubscribers();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getBlogPosts(true);
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubscribers = async () => {
    setLoadingSubscribers(true);
    try {
      const response = await fetch('/api/newsletter');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setSubscribers(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;
    try {
      setDeletingSubscriberId(id);
      const response = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        loadSubscribers();
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
    } finally {
      setDeletingSubscriberId(null);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (!formData.slug) {
        formData.slug = generateSlug(formData.title);
      }
      if (editingId) {
        await apiClient.updateBlogPost(editingId, formData);
      } else {
        await apiClient.createBlogPost(formData);
      }
      setEditingId(null);
      setShowForm(false);
      resetForm();
      loadPosts();
    } catch (error) {
      console.error('Failed to save blog post:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      setDeletingId(id);
      await apiClient.deleteBlogPost(id);
      loadPosts();
    } catch (error) {
      console.error('Failed to delete blog post:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content || '',
      image: post.image,
      slug: post.slug,
      isPublished: post.is_published,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '',
      image: '',
      slug: '',
      isPublished: false,
    });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading blog posts...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage blog posts</p>
        </div>
        <Button
          className="bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {showForm && (
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
                  }
                  placeholder="The Future of Cloud Computing"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="future-of-cloud-computing"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="technology, business..."
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Jane Editor"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-2 bg-white text-gray-900"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Excerpt</Label>
              <textarea
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short summary used in blog listings."
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Content</Label>
              <textarea
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full article content..."
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Image (emoji or URL)</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="🤖 or https://example.com/image.jpg"
                  className="mt-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="isPublished" className="text-sm font-semibold text-gray-700">
                  Published
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
          <CardTitle className="text-xl font-semibold text-gray-900">All Blog Posts</CardTitle>
          <p className="text-sm text-gray-500">Review, edit, or delete published and draft posts.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600">Title</TableHead>
                  <TableHead className="text-gray-600">Category</TableHead>
                  <TableHead className="text-gray-600">Author</TableHead>
                  <TableHead className="text-gray-600">Date</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-gray-500">
                      No blog posts yet. Click &ldquo;Add Blog Post&rdquo; to create your first article.
                    </TableCell>
                  </TableRow>
                )}
                {posts.map((post) => (
                  <TableRow key={post.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                    <TableCell className="font-semibold text-gray-900">{post.title}</TableCell>
                    <TableCell className="text-sm text-gray-700">{post.category}</TableCell>
                    <TableCell className="text-sm text-gray-700">{post.author}</TableCell>
                    <TableCell className="text-sm text-gray-700">{post.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          post.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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

      {/* Newsletter Subscribers Section */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl font-semibold text-gray-900">Newsletter Subscribers</CardTitle>
          </div>
          <p className="text-sm text-gray-500">
            {subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {loadingSubscribers ? (
            <div className="flex items-center justify-center py-16 text-gray-600">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
              Loading subscribers...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-600">Email</TableHead>
                    <TableHead className="text-gray-600">Source</TableHead>
                    <TableHead className="text-gray-600">Subscribed Date</TableHead>
                    <TableHead className="text-gray-600">Status</TableHead>
                    <TableHead className="text-gray-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-gray-500">
                        No newsletter subscribers yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                      <TableCell className="font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {subscriber.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {subscriber.source || 'blog-page'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {new Date(subscriber.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700">
                          Active
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          disabled={deletingSubscriberId === subscriber.id}
                        >
                          {deletingSubscriberId === subscriber.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

