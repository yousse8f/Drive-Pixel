'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Edit, 
  Eye, 
  Save, 
  X, 
  Plus,
  Image,
  Type,
  Code,
  Layout,
  Trash2,
  MoveUp,
  MoveDown,
  FileText
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface SitePage {
  id: string;
  title: string;
  path: string;
  category: string;
  meta_title: string;
  meta_description: string;
  template: string;
  is_active: boolean;
  content_blocks?: ContentBlock[];
}

interface ContentBlock {
  id?: string;
  section_name: string;
  block_type: string;
  content: any;
  section_order: number;
  block_order: number;
  is_active: boolean;
}

export default function SiteContentPage() {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [selectedPage, setSelectedPage] = useState<SitePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<SitePage>>({});

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const response = await apiClient.getSitePages();
      if (response.success && response.data) {
        setPages(response.data);
      }
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPageDetails = async (pageId: string) => {
    try {
      const response = await apiClient.getSitePage(pageId);
      if (response.success) {
        setSelectedPage(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Failed to load page details:', error);
    }
  };

  const handleEdit = (page: SitePage) => {
    loadPageDetails(page.id);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    
    setSaving(true);
    try {
      const response = await apiClient.updateSitePage(selectedPage.id, formData);
      if (response.success) {
        await loadPageDetails(selectedPage.id);
        await loadPages();
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to save page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedPage(null);
    setFormData({});
  };

  const addContentBlock = (sectionName: string, blockType: string) => {
    if (!selectedPage) return;
    
    const newBlock: ContentBlock = {
      section_name: sectionName,
      block_type: blockType,
      content: getDefaultContent(blockType),
      section_order: 0,
      block_order: (selectedPage.content_blocks?.length || 0),
      is_active: true
    };
    
    setFormData(prev => ({
      ...prev,
      content_blocks: [...(prev.content_blocks || []), newBlock]
    }));
  };

  const updateContentBlock = (index: number, updates: Partial<ContentBlock>) => {
    setFormData(prev => ({
      ...prev,
      content_blocks: prev.content_blocks?.map((block, i) => 
        i === index ? { ...block, ...updates } : block
      )
    }));
  };

  const removeContentBlock = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content_blocks: prev.content_blocks?.filter((_, i) => i !== index)
    }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const blocks = [...(formData.content_blocks || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < blocks.length) {
      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      
      // Update block_order
      blocks.forEach((block, i) => {
        block.block_order = i;
      });
      
      setFormData(prev => ({ ...prev, content_blocks: blocks }));
    }
  };

  const getDefaultContent = (blockType: string) => {
    switch (blockType) {
      case 'text':
        return { text: '', style: 'normal' };
      case 'html':
        return { html: '' };
      case 'image':
        return { url: '', alt: '', caption: '' };
      case 'hero':
        return { title: '', subtitle: '', background_image: '', cta_text: '', cta_url: '' };
      case 'features':
        return { title: '', features: [] };
      default:
        return {};
    }
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    const blockContent = block.content || {};
    
    switch (block.block_type) {
      case 'text':
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Enter text content..."
              value={blockContent.text || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, text: e.target.value } 
              })}
              rows={4}
            />
            <select
              value={blockContent.style || 'normal'}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, style: e.target.value } 
              })}
              className="w-full p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="heading">Heading</option>
              <option value="subheading">Subheading</option>
              <option value="quote">Quote</option>
            </select>
          </div>
        );
        
      case 'html':
        return (
          <Textarea
            placeholder="Enter HTML content..."
            value={blockContent.html || ''}
            onChange={(e) => updateContentBlock(index, { 
              content: { ...blockContent, html: e.target.value } 
            })}
            rows={8}
            className="font-mono text-sm"
          />
        );
        
      case 'image':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Image URL"
              value={blockContent.url || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, url: e.target.value } 
              })}
            />
            <Input
              placeholder="Alt text"
              value={blockContent.alt || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, alt: e.target.value } 
              })}
            />
            <Input
              placeholder="Caption"
              value={blockContent.caption || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, caption: e.target.value } 
              })}
            />
          </div>
        );
        
      case 'hero':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Hero Title"
              value={blockContent.title || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, title: e.target.value } 
              })}
            />
            <Textarea
              placeholder="Hero Subtitle"
              value={blockContent.subtitle || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, subtitle: e.target.value } 
              })}
              rows={2}
            />
            <Input
              placeholder="Background Image URL"
              value={blockContent.background_image || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, background_image: e.target.value } 
              })}
            />
            <Input
              placeholder="CTA Button Text"
              value={blockContent.cta_text || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, cta_text: e.target.value } 
              })}
            />
            <Input
              placeholder="CTA Button URL"
              value={blockContent.cta_url || ''}
              onChange={(e) => updateContentBlock(index, { 
                content: { ...blockContent, cta_url: e.target.value } 
              })}
            />
          </div>
        );
        
      default:
        return (
          <div className="text-gray-500">
            Unsupported block type: {block.block_type}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Site Content Management</h1>
        <p className="text-gray-600 mt-2">Manage content for existing site pages</p>
      </div>

      {!editing ? (
        <div className="grid gap-6">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {page.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{page.path}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {page.category}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {page.template}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(page.path, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(page)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit: {selectedPage?.title}</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-1" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <Input
                  value={formData.meta_title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <Textarea
                  value={formData.meta_description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Content Blocks</CardTitle>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-1 border rounded text-sm"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        const [section, type] = e.target.value.split(':');
                        addContentBlock(section, type);
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Add Block...</option>
                    <option value="hero:text">Hero Section</option>
                    <option value="main:text">Text Block</option>
                    <option value="main:html">HTML Block</option>
                    <option value="main:image">Image Block</option>
                    <option value="features:text">Features Section</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.content_blocks?.map((block, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {block.block_type === 'text' && <Type className="w-4 h-4" />}
                      {block.block_type === 'html' && <Code className="w-4 h-4" />}
                      {block.block_type === 'image' && <Image className="w-4 h-4" />}
                      {block.block_type === 'hero' && <Layout className="w-4 h-4" />}
                      <span className="font-medium capitalize">
                        {block.block_type} - {block.section_name}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveBlock(index, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveBlock(index, 'down')}
                        disabled={index === (formData.content_blocks?.length || 0) - 1}
                      >
                        <MoveDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeContentBlock(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {renderContentBlock(block, index)}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
