-- =====================================================
-- SITE CONTENT MANAGEMENT MIGRATION
-- Controls existing site pages like Blog, Real Estate, Services, etc.
-- =====================================================

-- Site Pages Table
CREATE TABLE IF NOT EXISTS site_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    path VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    template VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Page Content Blocks Table
CREATE TABLE IF NOT EXISTS site_page_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES site_pages(id) ON DELETE CASCADE,
    section_name VARCHAR(100) NOT NULL,
    block_type VARCHAR(50) NOT NULL,
    content JSONB NOT NULL,
    section_order INTEGER DEFAULT 0,
    block_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_pages_path ON site_pages(path);
CREATE INDEX IF NOT EXISTS idx_site_pages_category ON site_pages(category);
CREATE INDEX IF NOT EXISTS idx_site_pages_active ON site_pages(is_active);
CREATE INDEX IF NOT EXISTS idx_site_page_content_page_id ON site_page_content(page_id);
CREATE INDEX IF NOT EXISTS idx_site_page_content_section ON site_page_content(section_name);
CREATE INDEX IF NOT EXISTS idx_site_page_content_active ON site_page_content(is_active);
CREATE INDEX IF NOT EXISTS idx_site_page_content_order ON site_page_content(section_order, block_order);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER site_pages_updated_at BEFORE UPDATE ON site_pages
    FOR EACH ROW EXECUTE FUNCTION update_site_pages_updated_at();

CREATE OR REPLACE FUNCTION update_site_page_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER site_page_content_updated_at BEFORE UPDATE ON site_page_content
    FOR EACH ROW EXECUTE FUNCTION update_site_page_content_updated_at();

-- Insert initial site pages
INSERT INTO site_pages (id, title, path, meta_title, meta_description, template, is_active, created_by, updated_by) VALUES
('blog-page', 'Blog', '/blog', 'DrivePixel Blog | Insights and Updates', 'Latest insights, tutorials, and case studies from our team of experts.', 'default', true, 'system', 'system'),
('services-page', 'Services', '/services', 'Our Services | Professional Solutions', 'Professional services and solutions tailored to your needs.', 'default', true, 'system', 'system'),
('real-estate-page', 'Real Estate', '/real-estate', 'Real Estate Services | DrivePixel', 'Comprehensive real estate solutions and services for agents and investors.', 'default', true, 'system', 'system'),
('real-estate-agent-commission', 'Agent 100% Commission', '/real-estate/agent-commission', 'Agent 100% Commission | DrivePixel', 'Keep more of your hard-earned money with our revolutionary commission structure.', 'default', true, 'system', 'system'),
('real-estate-why-onedrive', 'Why OneDrive Realty', '/real-estate/why-onedrive', 'Why OneDrive Realty | DrivePixel', 'Discover the advantages of partnering with OneDrive Realty for your real estate career.', 'default', true, 'system', 'system'),
('real-estate-build-dream-home', 'Build Your Dream Home', '/real-estate/build-dream-home', 'Build Your Dream Home | DrivePixel', 'Turn your vision into reality with our comprehensive home building services.', 'default', true, 'system', 'system'),
('real-estate-list-property', 'List Your Property', '/real-estate/list-property', 'List Your Property | DrivePixel', 'Maximum exposure and expert marketing to sell your property quickly and for the best price.', 'default', true, 'system', 'system'),
('real-estate-api-leads', 'API Leads Generation', '/real-estate/api-leads', 'API Leads Generation | DrivePixel', 'Advanced lead generation system to connect you with qualified real estate prospects.', 'default', true, 'system', 'system'),
('real-estate-exchange-1031', '1031 Exchange', '/real-estate/exchange-1031', '1031 Exchange | DrivePixel', 'Tax-deferred property exchange strategies to maximize your investment potential.', 'default', true, 'system', 'system'),
('real-estate-halal-financing', 'Halal Financing', '/real-estate/halal-financing', 'Halal Financing | DrivePixel', 'Sharia-compliant real estate financing solutions for Muslim investors and homebuyers.', 'default', true, 'system', 'system'),
('real-estate-cap-ror-reo', 'Cap Rate & REO', '/real-estate/cap-ror-reo', 'Cap Rate & REO | DrivePixel', 'Expert analysis and opportunities in capitalization rates and REO properties.', 'default', true, 'system', 'system'),
('logistics-page', 'Freight & Logistics', '/logistics', 'Freight & Logistics | DrivePixel', 'Reliable freight and logistics solutions for your business needs.', 'default', true, 'system', 'system'); DO NOTHING;

-- Create content types constraint
ALTER TABLE site_page_content 
ADD CONSTRAINT check_block_type 
CHECK (block_type IN ('text', 'html', 'image', 'video', 'hero', 'features', 'testimonials', 'cta', 'gallery', 'stats', 'team', 'faq', 'pricing', 'contact'));

-- Create section names constraint
ALTER TABLE site_page_content 
ADD CONSTRAINT check_section_name 
CHECK (section_name IN ('hero', 'main', 'features', 'about', 'services', 'testimonials', 'cta', 'gallery', 'stats', 'team', 'faq', 'pricing', 'contact', 'footer', 'header'));

-- Create category constraint
ALTER TABLE site_pages 
ADD CONSTRAINT check_category 
CHECK (category IN ('blog', 'real-estate', 'services', 'logistics', 'about', 'contact', 'careers', 'portfolio'));

-- Create template constraint
ALTER TABLE site_pages 
ADD CONSTRAINT check_template 
CHECK (template IN ('blog', 'real-estate', 'services', 'logistics', 'default', 'about', 'contact', 'careers', 'portfolio'));

COMMENT ON TABLE site_pages IS 'Main site pages that can be managed through CMS';
COMMENT ON TABLE site_page_content IS 'Content blocks for site pages';
COMMENT ON COLUMN site_page_content.content IS 'JSON content for the block (text, html, image URLs, etc.)';
COMMENT ON COLUMN site_page_content.section_name IS 'Section where this block appears (hero, main, features, etc.)';
COMMENT ON COLUMN site_page_content.block_type IS 'Type of content block (text, html, image, video, etc.)';
