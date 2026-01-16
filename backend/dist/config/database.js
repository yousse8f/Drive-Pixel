"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.query = exports.getConnection = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // Forced SSL disable
});
pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
});
const getConnection = async () => {
    return pool.connect();
};
exports.getConnection = getConnection;
const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    }
    catch (error) {
        console.error("Database query error", { text, error });
        throw error;
    }
};
exports.query = query;
const initializeDatabase = async () => {
    try {
        await (0, exports.query)(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
        // Create users table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create products table (e-commerce)
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(12, 2) NOT NULL,
        image_url TEXT,
        category VARCHAR(100),
        availability INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Carts and cart items
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS carts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id),
        quantity INT NOT NULL DEFAULT 1,
        price_each DECIMAL(12, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Orders and order items
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cart_id UUID REFERENCES carts(id) ON DELETE SET NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        customer_address TEXT NOT NULL,
        total DECIMAL(12, 2) NOT NULL,
        payment_provider VARCHAR(50),
        payment_status VARCHAR(50) DEFAULT 'pending',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id),
        quantity INT NOT NULL,
        price_each DECIMAL(12, 2) NOT NULL
      );
    `);
        // Idempotent columns for order linkage and confirmation metadata
        await (0, exports.query)(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='user_id') THEN
          ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE SET NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='payment_reference') THEN
          ALTER TABLE orders ADD COLUMN payment_reference VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='subscription_type') THEN
          ALTER TABLE orders ADD COLUMN subscription_type VARCHAR(50) DEFAULT 'one_time';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='confirmation_email_sent_at') THEN
          ALTER TABLE orders ADD COLUMN confirmation_email_sent_at TIMESTAMP;
        END IF;
      END $$;
    `);
        // Payment events table for webhook idempotency
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS payment_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        provider VARCHAR(50) NOT NULL,
        event_id VARCHAR(255) UNIQUE NOT NULL,
        order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
        status VARCHAR(50),
        payload JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // One-time access links for first login and dashboard entry
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS user_access_links (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
        token UUID UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create leads table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create properties table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS properties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(12, 2) NOT NULL,
        location VARCHAR(255) NOT NULL,
        bedrooms INT,
        bathrooms INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create indexes for better query performance
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
        // Add role column to users table if it doesn't exist
        await (0, exports.query)(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
          ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
        END IF;
      END $$;
    `);
        // Add client activation columns to users table (idempotent)
        await (0, exports.query)(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password_set') THEN
          ALTER TABLE users ADD COLUMN password_set BOOLEAN DEFAULT TRUE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='first_login_token') THEN
          ALTER TABLE users ADD COLUMN first_login_token UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='first_login_token_expires_at') THEN
          ALTER TABLE users ADD COLUMN first_login_token_expires_at TIMESTAMP;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='first_login_consumed_at') THEN
          ALTER TABLE users ADD COLUMN first_login_consumed_at TIMESTAMP;
        END IF;
      END $$;
    `);
        // Create services table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL,
        items TEXT[] DEFAULT '{}',
        "order" INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create inquiries table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        service_id UUID REFERENCES services(id),
        client_full_name VARCHAR(255) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        client_phone VARCHAR(20),
        message TEXT NOT NULL,
        freelancer_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create portfolio table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT[] DEFAULT '{}',
        results VARCHAR(255),
        image_url VARCHAR(500),
        "order" INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create blog_posts table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        author VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT,
        image VARCHAR(50),
        slug VARCHAR(255) UNIQUE NOT NULL,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create testimonials table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        text TEXT NOT NULL,
        "order" INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create hero_texts table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS hero_texts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        subtitle TEXT NOT NULL,
        "order" INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create settings table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'string',
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create logs table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        resource VARCHAR(100) NOT NULL,
        resource_id UUID,
        details TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create jobs table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        benefits TEXT,
        "order" INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create contact_info table
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS contact_info (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        type VARCHAR(50) NOT NULL UNIQUE,
        value VARCHAR(255) NOT NULL,
        label VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Chat sessions and messages
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        page_url TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        name VARCHAR(255),
        email VARCHAR(255),
        initial_email_sent BOOLEAN DEFAULT FALSE,
        email_sent_status VARCHAR(20) DEFAULT 'not_sent',
        email_sent_at TIMESTAMP,
        email_error TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
        sender VARCHAR(10) NOT NULL,
        message TEXT NOT NULL,
        page_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Ensure chat_sessions new columns exist (idempotent)
        await (0, exports.query)(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_sessions' AND column_name='name') THEN
          ALTER TABLE chat_sessions ADD COLUMN name VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_sessions' AND column_name='email') THEN
          ALTER TABLE chat_sessions ADD COLUMN email VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_sessions' AND column_name='initial_email_sent') THEN
          ALTER TABLE chat_sessions ADD COLUMN initial_email_sent BOOLEAN DEFAULT FALSE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_sessions' AND column_name='email_sent_status') THEN
          ALTER TABLE chat_sessions ADD COLUMN email_sent_status VARCHAR(20) DEFAULT 'not_sent';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_sessions' AND column_name='email_sent_at') THEN
          ALTER TABLE chat_sessions ADD COLUMN email_sent_at TIMESTAMP;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chat_sessions' AND column_name='email_error') THEN
          ALTER TABLE chat_sessions ADD COLUMN email_error TEXT;
        END IF;
      END $$;
    `);
        // Create additional indexes
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio(is_active);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_jobs_order ON jobs("order");`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_hero_texts_active ON hero_texts(is_active);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_logs_resource ON logs(resource);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_activity ON chat_sessions(last_activity);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_chat_sessions_email ON chat_sessions(email);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);`);
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS chat_email_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL,
        error TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_chat_email_logs_session_id ON chat_email_logs(session_id);`);
        // =====================================================
        // CMS TABLES
        // =====================================================
        // CMS Pages
        await (0, exports.query)(`
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
    `);
        // CMS Sections
        await (0, exports.query)(`
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
    `);
        // CMS Content Blocks
        await (0, exports.query)(`
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
    `);
        // CMS Content Versions
        await (0, exports.query)(`
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
    `);
        // CMS Reusable Components
        await (0, exports.query)(`
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
    `);
        // =====================================================
        // CRM TABLES
        // =====================================================
        // CRM Customers
        await (0, exports.query)(`
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
    `);
        // CRM Customer Notes
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS crm_customer_notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id UUID REFERENCES crm_customers(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        note TEXT NOT NULL,
        is_private BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // CRM Activities
        await (0, exports.query)(`
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
    `);
        // CRM Pipeline Stages
        await (0, exports.query)(`
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
    `);
        // CRM Deals
        await (0, exports.query)(`
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
    `);
        // =====================================================
        // EMAIL BROADCASTING TABLES
        // =====================================================
        // Email Lists
        await (0, exports.query)(`
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
    `);
        // Email List Subscribers
        await (0, exports.query)(`
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
    `);
        // Email Templates
        await (0, exports.query)(`
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
    `);
        // Email Campaigns
        await (0, exports.query)(`
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
    `);
        // Email Send Log
        await (0, exports.query)(`
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
    `);
        // Email Click Tracking
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS email_click_tracking (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        send_log_id UUID REFERENCES email_send_log(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT
      );
    `);
        // Email Unsubscribes
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS email_unsubscribes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL,
        list_id UUID REFERENCES email_lists(id) ON DELETE SET NULL,
        campaign_id UUID REFERENCES email_campaigns(id) ON DELETE SET NULL,
        reason TEXT,
        unsubscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // =====================================================
        // SECURITY & AUDIT TABLES
        // =====================================================
        // User Roles
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        permissions JSONB DEFAULT '{}',
        is_system BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // User Role Assignments
        await (0, exports.query)(`
      CREATE TABLE IF NOT EXISTS user_role_assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        role_id UUID REFERENCES user_roles(id) ON DELETE CASCADE,
        assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, role_id)
      );
    `);
        // Audit Logs
        await (0, exports.query)(`
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
    `);
        // =====================================================
        // IMPORT/EXPORT TABLES
        // =====================================================
        // Import Jobs
        await (0, exports.query)(`
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
    `);
        // Export Jobs
        await (0, exports.query)(`
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
    `);
        // =====================================================
        // CMS INDEXES
        // =====================================================
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON cms_pages(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_sections_page_id ON cms_sections(page_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_sections_order ON cms_sections("order");`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_content_blocks_section_id ON cms_content_blocks(section_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_content_versions_entity ON cms_content_versions(entity_type, entity_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_cms_components_slug ON cms_components(slug);`);
        // =====================================================
        // CRM INDEXES
        // =====================================================
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_customers_email ON crm_customers(email);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_customers_status ON crm_customers(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_customers_assigned_to ON crm_customers(assigned_to);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_customers_lead_id ON crm_customers(lead_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_customer_notes_customer_id ON crm_customer_notes(customer_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_activities_customer_id ON crm_activities(customer_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_activities_created_at ON crm_activities(created_at);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_deals_customer_id ON crm_deals(customer_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_deals_stage_id ON crm_deals(stage_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_crm_deals_status ON crm_deals(status);`);
        // =====================================================
        // EMAIL INDEXES
        // =====================================================
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_lists_active ON email_lists(is_active);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_list_subscribers_list_id ON email_list_subscribers(list_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_list_subscribers_email ON email_list_subscribers(email);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_list_subscribers_status ON email_list_subscribers(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_campaigns_list_id ON email_campaigns(list_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_send_log_campaign_id ON email_send_log(campaign_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_send_log_status ON email_send_log(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_click_tracking_send_log_id ON email_click_tracking(send_log_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_email ON email_unsubscribes(email);`);
        // =====================================================
        // AUDIT INDEXES
        // =====================================================
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);`);
        // =====================================================
        // IMPORT/EXPORT INDEXES
        // =====================================================
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_import_jobs_status ON import_jobs(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_import_jobs_created_by ON import_jobs(created_by);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_export_jobs_status ON export_jobs(status);`);
        await (0, exports.query)(`CREATE INDEX IF NOT EXISTS idx_export_jobs_created_by ON export_jobs(created_by);`);
        // =====================================================
        // DEFAULT DATA
        // =====================================================
        // Insert default roles
        await (0, exports.query)(`
      INSERT INTO user_roles (name, description, permissions, is_system) VALUES
      ('admin', 'Full system access', '{"all": true}', true),
      ('editor', 'Content management access', '{"cms": {"read": true, "write": true}, "crm": {"read": true}}', true),
      ('sales', 'CRM and sales access', '{"crm": {"read": true, "write": true}, "email": {"read": true, "write": true}}', true),
      ('viewer', 'Read-only access', '{"cms": {"read": true}, "crm": {"read": true}}', true)
      ON CONFLICT (name) DO NOTHING;
    `);
        // Insert default pipeline stages
        await (0, exports.query)(`
      INSERT INTO crm_pipeline_stages (name, slug, color, "order") VALUES
      ('New', 'new', '#6B7280', 1),
      ('Contacted', 'contacted', '#3B82F6', 2),
      ('Qualified', 'qualified', '#10B981', 3),
      ('Proposal', 'proposal', '#F59E0B', 4),
      ('Negotiation', 'negotiation', '#8B5CF6', 5),
      ('Closed Won', 'closed-won', '#059669', 6),
      ('Closed Lost', 'closed-lost', '#EF4444', 7)
      ON CONFLICT (slug) DO NOTHING;
    `);
        console.log("CRM, CMS, and Email Broadcasting tables initialized successfully");
    }
    catch (error) {
        console.error("Error initializing database", error);
        throw error;
    }
};
exports.initializeDatabase = initializeDatabase;
exports.default = pool;
