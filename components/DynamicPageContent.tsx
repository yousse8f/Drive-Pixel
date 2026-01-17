'use client';

import { useEffect, useState } from 'react';
import { publicApiClient } from '@/lib/public-api-client';

interface ContentBlock {
  id: string;
  section_name: string;
  block_type: string;
  content: any;
  section_order: number;
  block_order: number;
}

interface SitePageContent {
  id: string;
  title: string;
  path: string;
  meta_title: string;
  meta_description: string;
  content_blocks: ContentBlock[];
}

interface DynamicPageContentProps {
  pagePath: string;
  fallbackContent?: React.ReactNode;
}

export default function DynamicPageContent({ pagePath, fallbackContent }: DynamicPageContentProps) {
  const [pageContent, setPageContent] = useState<SitePageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPageContent();
  }, [pagePath]);

  const loadPageContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/site-content/page/${pagePath}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPageContent(data.data);
          setError(null);
        }
      } else {
        // If CMS content not found, use fallback
        setError('CMS content not found');
      }
    } catch (err) {
      console.error('Failed to load page content:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const renderContentBlock = (block: ContentBlock) => {
    const content = block.content || {};
    
    switch (block.block_type) {
      case 'text':
        const TextComponent = () => {
          const style = content.style || 'normal';
          const text = content.text || '';
          
          switch (style) {
            case 'heading':
              return <h2 className="text-3xl font-bold mb-4">{text}</h2>;
            case 'subheading':
              return <h3 className="text-2xl font-semibold mb-3">{text}</h3>;
            case 'quote':
              return <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">{text}</blockquote>;
            default:
              return <p className="text-gray-700 mb-4">{text}</p>;
          }
        };
        
        return <TextComponent />;
        
      case 'html':
        return (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.html || '' }}
          />
        );
        
      case 'image':
        return (
          <div className="my-6">
            <img 
              src={content.url || ''} 
              alt={content.alt || ''}
              className="w-full rounded-lg shadow-md"
            />
            {content.caption && (
              <p className="text-center text-gray-600 mt-2 text-sm">{content.caption}</p>
            )}
          </div>
        );
        
      case 'hero':
        return (
          <section className="relative py-32 text-white">
            {content.background_image && (
              <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url(${content.background_image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
              </div>
            )}
            <div className="container-custom text-center relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{content.title || ''}</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">{content.subtitle || ''}</p>
              {content.cta_text && content.cta_url && (
                <a 
                  href={content.cta_url}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {content.cta_text}
                </a>
              )}
            </div>
          </section>
        );
        
      case 'features':
        return (
          <section className="py-16">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-center mb-12">{content.title || ''}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(content.features || []).map((feature: any, index: number) => (
                  <div key={index} className="text-center">
                    {feature.icon && (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
        
      default:
        return (
          <div className="text-gray-500 p-4 border border-gray-200 rounded">
            Unsupported block type: {block.block_type}
          </div>
        );
    }
  };

  const renderSection = (sectionName: string, blocks: ContentBlock[]) => {
    return (
      <div key={sectionName} className="space-y-6">
        {blocks.map((block) => (
          <div key={block.id}>
            {renderContentBlock(block)}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !pageContent) {
    return fallbackContent || null;
  }

  // Group content blocks by section
  const sections: { [key: string]: ContentBlock[] } = {};
  pageContent.content_blocks.forEach(block => {
    if (!sections[block.section_name]) {
      sections[block.section_name] = [];
    }
    sections[block.section_name].push(block);
  });

  // Sort blocks within each section
  Object.keys(sections).forEach(sectionName => {
    sections[sectionName].sort((a, b) => a.block_order - b.block_order);
  });

  // Sort sections by order
  const sortedSections = Object.keys(sections).sort((a, b) => {
    const aOrder = sections[a][0]?.section_order || 0;
    const bOrder = sections[b][0]?.section_order || 0;
    return aOrder - bOrder;
  });

  return (
    <div>
      {/* Update page meta */}
      {typeof window !== 'undefined' && (
        <>
          <title>{pageContent.meta_title || pageContent.title}</title>
          <meta name="description" content={pageContent.meta_description || ''} />
        </>
      )}
      
      {/* Render content sections */}
      {sortedSections.map(sectionName => renderSection(sectionName, sections[sectionName]))}
    </div>
  );
}
