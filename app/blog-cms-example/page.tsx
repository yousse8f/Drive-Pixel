'use client';

import DynamicPageContent from '@/components/DynamicPageContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/**
 * EXAMPLE: Blog page with CMS integration
 * This shows how to replace static content with CMS-managed content
 * 
 * To use this:
 * 1. Run the site content migration: npm run seed:site-content
 * 2. Access this page at /blog-cms-example
 * 3. Edit content in Admin Dashboard > Site Content > Blog
 */

export default function BlogCMSExamplePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* CMS-managed content for /blog path */}
      <DynamicPageContent 
        pagePath="/blog" 
        fallbackContent={
          // Fallback content if CMS is not available
          <div className="container-custom py-16">
            <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
            <p className="text-center text-gray-600">
              CMS content not available. Please run the site content seed script.
            </p>
            <div className="text-center mt-8">
              <code className="bg-gray-100 px-4 py-2 rounded">
                npm run seed:site-content
              </code>
            </div>
          </div>
        }
      />
      
      <Footer />
    </div>
  );
}
