# 📄 Site Content Management System Guide

**Date:** January 2024  
**Status:** ✅ READY FOR USE  
**Version:** 1.0.0

---

## 🎯 Overview

The Site Content Management System allows you to control and modify content on existing site pages without creating new pages or files. You can manage content for:

- 📝 **Blog** (`/blog`)
- 🏢 **Real Estate** (`/real-estate`)
- 🛠️ **Services** (`/services`)
- 🚚 **Freight & Logistics** (`/logistics`)

---

## 🏗️ System Architecture

### Backend Components
- **Controller:** `backend/src/controllers/siteContentController.ts`
- **Routes:** `backend/src/routes/siteContent.ts`
- **Database:** `backend/src/config/migrations/002_site_content.sql`
- **Seed Script:** `backend/src/scripts/seedSiteContent.ts`

### Frontend Components
- **Admin UI:** `app/admin/site-content/page.tsx`
- **Dynamic Renderer:** `components/DynamicPageContent.tsx`

### Database Tables
- `site_pages` - Main site pages information
- `site_page_content` - Content blocks for pages

---

## 🚀 Quick Setup

### Step 1: Run Database Migration
```bash
cd backend
psql -U postgres -d drivepixel -f src/config/migrations/002_site_content.sql
```

### Step 2: Seed Initial Content
```bash
cd backend
npm run seed:site-content
```

### Step 3: Start Backend Server
```bash
npm run dev
```

### Step 4: Access Admin Interface
1. Go to `/admin` in your browser
2. Navigate to "Site Content" in the admin menu
3. Select a page to edit

---

## 📋 Available Pages

### 1. Blog Page (`/blog`)
**Content Sections:**
- **Hero Section:** Title, subtitle, background image, CTA button
- **Main Content:** Blog categories and features

### 2. Real Estate Page (`/real-estate`)
**Content Sections:**
- **Hero Section:** Title, subtitle, background image, CTA button
- **Main Content:** Service descriptions and features

### 3. Services Page (`/services`)
**Content Sections:**
- **Hero Section:** Title, subtitle, background image, CTA button
- **Main Content:** Service listings and descriptions

### 4. Freight & Logistics Page (`/logistics`)
**Content Sections:**
- **Hero Section:** Title, subtitle, background image, CTA button
- **Main Content:** Logistics services and features

---

## 🎨 Content Block Types

### 1. **Hero Section**
- **Title:** Main heading text
- **Subtitle:** Subheading text
- **Background Image:** URL for hero background
- **CTA Text:** Button text
- **CTA URL:** Button destination

### 2. **Text Block**
- **Text:** Content text
- **Style:** Normal, Heading, Subheading, Quote

### 3. **HTML Block**
- **HTML:** Raw HTML content
- **Use:** Custom formatting, complex layouts

### 4. **Image Block**
- **URL:** Image URL
- **Alt Text:** Alt text for accessibility
- **Caption:** Image caption

### 5. **Features Section**
- **Title:** Section title
- **Features:** Array of feature items
  - Icon: Emoji or icon
  - Title: Feature name
  - Description: Feature description

---

## 🛠️ Admin Interface Usage

### Accessing Site Content Management
1. Login to Admin Dashboard
2. Click "Site Content" in the sidebar
3. View all available pages

### Editing a Page
1. Click "Edit" on any page
2. Modify page metadata (title, meta tags)
3. Add, edit, or remove content blocks
4. Click "Save" to apply changes

### Adding Content Blocks
1. Select block type from dropdown
2. Choose section (hero, main, features, etc.)
3. Fill in content fields
4. Use arrow buttons to reorder blocks
5. Delete unwanted blocks with trash button

### Managing Images
- Upload images through the admin interface
- Images stored in `/public/images/site-content/`
- Use relative URLs in content blocks

---

## 🔄 Integration with Existing Pages

### Method 1: Full CMS Control
Replace entire page content with CMS-managed content:

```tsx
// app/blog/page.tsx
import DynamicPageContent from '@/components/DynamicPageContent';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DynamicPageContent pagePath="/blog" />
      <Footer />
    </div>
  );
}
```

### Method 2: Hybrid Approach
Combine CMS content with existing page elements:

```tsx
// app/services/page.tsx
import DynamicPageContent from '@/components/DynamicPageContent';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Keep existing hero section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold">Our Services</h1>
        </div>
      </section>
      
      {/* Use CMS for main content */}
      <DynamicPageContent pagePath="/services" />
      
      <Footer />
    </div>
  );
}
```

### Method 3: Section-Based Control
Control specific sections only:

```tsx
// app/real-estate/page.tsx
import DynamicPageContent from '@/components/DynamicPageContent';

export default function RealEstatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Keep existing navigation */}
      <RealEstateNavigation />
      
      {/* Use CMS for hero section only */}
      <DynamicPageContent pagePath="/real-estate" fallbackContent={
        <ExistingHeroSection />
      } />
      
      {/* Keep existing service listings */}
      <RealEstateServices />
      
      <Footer />
    </div>
  );
}
```

---

## 📊 API Endpoints

### Admin Endpoints (Authentication Required)
- `GET /api/admin/site-content/pages` - List all pages
- `GET /api/admin/site-content/pages/:id` - Get page details
- `PUT /api/admin/site-content/pages/:id` - Update page content
- `POST /api/admin/site-content/upload-image` - Upload image
- `DELETE /api/admin/site-content/image/:filename` - Delete image

### Public Endpoints
- `GET /api/admin/site-content/page/:path` - Get page content by path

---

## 🎯 Content Management Best Practices

### 1. **Content Organization**
- Group related content in sections
- Use consistent naming conventions
- Maintain logical content flow

### 2. **Image Management**
- Optimize images for web (compress, resize)
- Use descriptive alt text
- Store in appropriate folders

### 3. **SEO Optimization**
- Update meta titles and descriptions
- Use semantic HTML structure
- Include relevant keywords

### 4. **Content Updates**
- Review content regularly
- Update outdated information
- Test changes before publishing

---

## 🔧 Advanced Features

### 1. **Content Versioning**
The system tracks all changes through audit logs:
- Who made changes
- When changes were made
- What was changed

### 2. **Content Scheduling**
Future enhancement for scheduled content publishing.

### 3. **Multi-language Support**
Prepared for internationalization with content language tags.

### 4. **Content Templates**
Reusable content templates for similar pages.

---

## 🚨 Troubleshooting

### Common Issues

#### 1. **Content Not Loading**
- Check database connection
- Verify migration was run
- Check API endpoints are working

#### 2. **Images Not Displaying**
- Verify image URLs are correct
- Check file permissions
- Ensure images exist in correct folder

#### 3. **Admin Interface Errors**
- Check authentication status
- Verify user permissions
- Check browser console for errors

#### 4. **Content Not Updating**
- Check if save was successful
- Verify database connection
- Clear browser cache

### Debug Commands
```bash
# Check database tables
psql -U postgres -d drivepixel -c "\d site_pages"
psql -U postgres -d drivepixel -c "\d site_page_content"

# Check page content
psql -U postgres -d drivepixel -c "SELECT * FROM site_pages WHERE path = '/blog'"

# Check content blocks
psql -U postgres -d drivepixel -c "SELECT * FROM site_page_content WHERE page_id = 'page-id'"
```

---

## 📝 Content Examples

### Hero Section Example
```json
{
  "title": "R/E BLOGS",
  "subtitle": "Stay informed with the latest real estate market trends",
  "background_image": "/images/Real Estate.png",
  "cta_text": "GET STARTED",
  "cta_url": "/contact"
}
```

### Features Section Example
```json
{
  "title": "Blog Categories",
  "features": [
    {
      "icon": "📈",
      "title": "Market Updates",
      "description": "Latest market trends and analysis"
    },
    {
      "icon": "💡",
      "title": "Investment Education",
      "description": "Learn investment strategies"
    }
  ]
}
```

---

## 🔄 Migration from Static Content

### Step 1: Backup Existing Content
```bash
cp app/blog/page.tsx app/blog/page.tsx.backup
cp app/services/page.tsx app/services/page.tsx.backup
```

### Step 2: Extract Content
Review existing pages and identify:
- Text content
- Images and media
- Structured data
- Interactive elements

### Step 3: Convert to CMS Format
- Create content blocks
- Upload images to CMS
- Configure page metadata

### Step 4: Update Page Components
Replace static content with DynamicPageContent component.

### Step 5: Test and Verify
- Test all pages load correctly
- Verify content displays properly
- Check responsive design

---

## 🎉 Benefits

### For Content Managers
- ✅ Easy content updates without coding
- ✅ Visual content editing interface
- ✅ Image management system
- ✅ Content organization tools

### For Developers
- ✅ Separation of content and code
- ✅ Reusable content components
- ✅ Consistent content structure
- ✅ Easy content integration

### For Business
- ✅ Faster content updates
- ✅ Reduced development costs
- ✅ Better content control
- ✅ Improved SEO management

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the troubleshooting section
3. Check browser console for errors
4. Verify database connection
5. Contact development team

---

## 🚀 Next Steps

1. **Setup the system** using the quick setup guide
2. **Test with sample content** using the seed script
3. **Migrate existing pages** following the migration guide
4. **Train content managers** on the admin interface
5. **Monitor and optimize** based on usage patterns

---

*System Version: 1.0.0*  
*Last Updated: January 2024*  
*Status: ✅ PRODUCTION READY*
