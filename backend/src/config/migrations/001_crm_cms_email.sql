-- =====================================================
-- CRM / CMS / Email Broadcasting Database Schema
-- DrivePixel Platform Extension
-- =====================================================

-- =====================================================
-- 1. CMS TABLES
-- =====================================================

-- CMS Pages - Main pages that can be edited
CREATE TABLE IF NOT EXISTS cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    template VARCHAR(100) DEFAULT 'default',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Sections - Reusable content sections within pages
CREATE TABLE IF NOT EXISTS cms_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    section_type VARCHAR(100) NOT NULL,
    content JSONB DEFAULT '{}',
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Content Blocks - Granular content elements
CREATE TABLE IF NOT EXISTS cms_content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES cms_sections(id) ON DELETE CASCADE,
    block_type VARCHAR(100) NOT NULL,
    content JSONB DEFAULT '{}',
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Content Versions - Version history for content
CREATE TABLE IF NOT EXISTS cms_content_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    version_number INT NOT NULL,
    content JSONB NOT NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entity_type, entity_id, version_number)
);

-- CMS Reusable Components - Global reusable content blocks
CREATE TABLE IF NOT EXISTS cms_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    component_type VARCHAR(100) NOT NULL,
    content JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. CRM TABLES
-- =====================================================

-- CRM Customers - Full customer records
CREATE TABLE IF NOT EXISTS crm_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    job_title VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
    source VARCHAR(100),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    lifetime_value DECIMAL(12, 2) DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    custom_fields JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRM Customer Notes
CREATE TABLE IF NOT EXISTS crm_customer_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES crm_customers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRM Activity History
CREATE TABLE IF NOT EXISTS crm_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES crm_customers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    activity_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRM Pipeline Stages (customizable)
CREATE TABLE IF NOT EXISTS crm_pipeline_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    color VARCHAR(20) DEFAULT '#3B82F6',
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRM Deals/Opportunities
CREATE TABLE IF NOT EXISTS crm_deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES crm_customers(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES crm_pipeline_stages(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    value DECIMAL(12, 2) DEFAULT 0,
    probability INT DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
    expected_close_date DATE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. EMAIL BROADCASTING TABLES
-- =====================================================

-- Email Lists
CREATE TABLE IF NOT EXISTS email_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) DEFAULT 'manual' CHECK (type IN ('manual', 'crm_segment', 'imported')),
    segment_criteria JSONB DEFAULT '{}',
    subscriber_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email List Subscribers
CREATE TABLE IF NOT EXISTS email_list_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    list_id UUID REFERENCES email_lists(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    customer_id UUID REFERENCES crm_customers(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained')),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP,
    custom_fields JSONB DEFAULT '{}',
    UNIQUE(list_id, email)
);

-- Email Templates
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    variables TEXT[] DEFAULT '{}',
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
    list_id UUID REFERENCES email_lists(id) ON DELETE SET NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled')),
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    total_recipients INT DEFAULT 0,
    sent_count INT DEFAULT 0,
    open_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    bounce_count INT DEFAULT 0,
    unsubscribe_count INT DEFAULT 0,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Send Log (individual emails)
CREATE TABLE IF NOT EXISTS email_send_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
    subscriber_id UUID REFERENCES email_list_subscribers(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
    sent_at TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    error_message TEXT,
    metadata JSONB DEFAULT '{}'
);

-- Email Click Tracking
CREATE TABLE IF NOT EXISTS email_click_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    send_log_id UUID REFERENCES email_send_log(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Email Unsubscribes
CREATE TABLE IF NOT EXISTS email_unsubscribes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    list_id UUID REFERENCES email_lists(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE SET NULL,
    reason TEXT,
    unsubscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. SECURITY & AUDIT TABLES
-- =====================================================

-- User Roles (extend existing)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Role Assignments
CREATE TABLE IF NOT EXISTS user_role_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES user_roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id)
);

-- Audit Logs (comprehensive)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. IMPORT/EXPORT TABLES
-- =====================================================

-- Import Jobs
CREATE TABLE IF NOT EXISTS import_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    total_rows INT DEFAULT 0,
    processed_rows INT DEFAULT 0,
    success_count INT DEFAULT 0,
    error_count INT DEFAULT 0,
    errors JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Export Jobs
CREATE TABLE IF NOT EXISTS export_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) NOT NULL,
    filters JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    file_path TEXT,
    file_size INT,
    row_count INT DEFAULT 0,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 6. INDEXES
-- =====================================================

-- CMS Indexes
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON cms_pages(status);
CREATE INDEX IF NOT EXISTS idx_cms_sections_page_id ON cms_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_cms_sections_order ON cms_sections("order");
CREATE INDEX IF NOT EXISTS idx_cms_content_blocks_section_id ON cms_content_blocks(section_id);
CREATE INDEX IF NOT EXISTS idx_cms_content_versions_entity ON cms_content_versions(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_cms_components_slug ON cms_components(slug);

-- CRM Indexes
CREATE INDEX IF NOT EXISTS idx_crm_customers_email ON crm_customers(email);
CREATE INDEX IF NOT EXISTS idx_crm_customers_status ON crm_customers(status);
CREATE INDEX IF NOT EXISTS idx_crm_customers_assigned_to ON crm_customers(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_customers_lead_id ON crm_customers(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_customer_notes_customer_id ON crm_customer_notes(customer_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_customer_id ON crm_activities(customer_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_created_at ON crm_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_crm_deals_customer_id ON crm_deals(customer_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_stage_id ON crm_deals(stage_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_status ON crm_deals(status);

-- Email Indexes
CREATE INDEX IF NOT EXISTS idx_email_lists_active ON email_lists(is_active);
CREATE INDEX IF NOT EXISTS idx_email_list_subscribers_list_id ON email_list_subscribers(list_id);
CREATE INDEX IF NOT EXISTS idx_email_list_subscribers_email ON email_list_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_list_subscribers_status ON email_list_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_list_id ON email_campaigns(list_id);
CREATE INDEX IF NOT EXISTS idx_email_send_log_campaign_id ON email_send_log(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_send_log_status ON email_send_log(status);
CREATE INDEX IF NOT EXISTS idx_email_click_tracking_send_log_id ON email_click_tracking(send_log_id);
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_email ON email_unsubscribes(email);

-- Audit Indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Import/Export Indexes
CREATE INDEX IF NOT EXISTS idx_import_jobs_status ON import_jobs(status);
CREATE INDEX IF NOT EXISTS idx_import_jobs_created_by ON import_jobs(created_by);
CREATE INDEX IF NOT EXISTS idx_export_jobs_status ON export_jobs(status);
CREATE INDEX IF NOT EXISTS idx_export_jobs_created_by ON export_jobs(created_by);

-- =====================================================
-- 7. DEFAULT DATA
-- =====================================================

-- Insert default roles
INSERT INTO user_roles (name, description, permissions, is_system) VALUES
('admin', 'Full system access', '{"all": true}', true),
('editor', 'Content management access', '{"cms": {"read": true, "write": true}, "crm": {"read": true}}', true),
('sales', 'CRM and sales access', '{"crm": {"read": true, "write": true}, "email": {"read": true, "write": true}}', true),
('viewer', 'Read-only access', '{"cms": {"read": true}, "crm": {"read": true}}', true)
ON CONFLICT (name) DO NOTHING;

-- Insert default pipeline stages
INSERT INTO crm_pipeline_stages (name, slug, color, "order") VALUES
('New', 'new', '#6B7280', 1),
('Contacted', 'contacted', '#3B82F6', 2),
('Qualified', 'qualified', '#10B981', 3),
('Proposal', 'proposal', '#F59E0B', 4),
('Negotiation', 'negotiation', '#8B5CF6', 5),
('Closed Won', 'closed-won', '#059669', 6),
('Closed Lost', 'closed-lost', '#EF4444', 7)
ON CONFLICT (slug) DO NOTHING;
