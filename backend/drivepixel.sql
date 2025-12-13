-- ============================================================================
-- DRIVE PIXEL DATABASE SCHEMA
-- Production-ready consolidated database for all website and backend data
-- ============================================================================
-- This file contains all CREATE TABLE, indexes, and seed data for the project
-- All data used across the website is sourced exclusively from this file
-- ============================================================================

 -- Required for gen_random_uuid()
 CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Users table: Admin and editor accounts for content management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table: Core services offered by the company
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

-- Portfolio table: Showcase of completed projects
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

-- Blog Posts table: Articles and insights published on the blog
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

-- Testimonials table: Client testimonials and reviews
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

-- Hero Texts table: Dynamic hero section content on homepage
CREATE TABLE IF NOT EXISTS hero_texts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    subtitle TEXT NOT NULL,
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table: Stores client inquiries and routes them to appropriate departments
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

-- ============================================================================
-- USER-GENERATED DATA TABLES
-- ============================================================================

-- Leads table: Contact form submissions and lead tracking
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

-- Properties table: Real estate or product listings (user-specific)
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

-- ============================================================================
-- ADMINISTRATIVE TABLES
-- ============================================================================

-- Jobs table: Job openings and career opportunities
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

-- Contact Info table: Company contact information
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL UNIQUE,
    value VARCHAR(255) NOT NULL,
    label VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table: Global application settings
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logs table: Activity and audit logs
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

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio("order");
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials("order");
CREATE INDEX IF NOT EXISTS idx_hero_texts_active ON hero_texts(is_active);
CREATE INDEX IF NOT EXISTS idx_hero_texts_order ON hero_texts("order");
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_order ON jobs("order");
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_resource ON logs(resource);

-- ============================================================================
-- SEED DATA - USERS
-- ============================================================================

INSERT INTO users (email, password, first_name, last_name, role, created_at, updated_at) VALUES
('admin@drivepixel.com', '$2b$10$zHKXz6KYoEKFkPbhX/SUpeOxWsH4AzSE/L6Wz9VdOzyTpaIyhYGYq', 'Admin', 'User', 'admin', '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z'),
('sarah.editor@drivepixel.com', '$2b$10$TYgT7zHOPB/uZQk59hRq5.pmELgfocM0cDoN8Icw.fvsLjd.y1J4m', 'Sarah', 'Editor', 'editor', '2025-01-05T09:15:00Z', '2025-12-12T10:00:00Z'),
('john.editor@drivepixel.com', '$2b$10$TYgT7zHOPB/uZQk59hRq5.pmELgfocM0cDoN8Icw.fvsLjd.y1J4m', 'John', 'Editor', 'editor', '2025-01-10T10:30:00Z', '2025-12-12T10:00:00Z'),
('emma.editor@drivepixel.com', '$2b$10$TYgT7zHOPB/uZQk59hRq5.pmELgfocM0cDoN8Icw.fvsLjd.y1J4m', 'Emma', 'Editor', 'editor', '2025-01-15T11:45:00Z', '2025-12-12T10:00:00Z'),
('michael.editor@drivepixel.com', '$2b$10$TYgT7zHOPB/uZQk59hRq5.pmELgfocM0cDoN8Icw.fvsLjd.y1J4m', 'Michael', 'Editor', 'editor', '2025-01-20T13:00:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- SEED DATA - SERVICES
-- ============================================================================

INSERT INTO services (title, description, icon, items, "order", is_active, created_at, updated_at) VALUES
('Web Development', 'Custom web applications built with modern frameworks like React, Next.js, and Node.js for scalable solutions.', '💻', ARRAY['React & Next.js', 'Node.js & Express', 'Full-stack development', 'Responsive design'], 1, true, '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z'),
('Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android using Flutter and React Native.', '📱', ARRAY['iOS Development', 'Android Development', 'Cross-platform apps', 'App store deployment'], 2, true, '2025-01-01T08:15:00Z', '2025-12-12T10:00:00Z'),
('Cloud Infrastructure', 'AWS, Google Cloud, and Azure solutions for scalable, secure, and reliable cloud deployments.', '☁️', ARRAY['AWS & Azure', 'Cloud architecture', 'Serverless solutions', 'Infrastructure automation'], 3, true, '2025-01-01T08:30:00Z', '2025-12-12T10:00:00Z'),
('AI & Machine Learning', 'Intelligent automation and predictive analytics powered by machine learning and artificial intelligence.', '🤖', ARRAY['Machine learning models', 'Predictive analytics', 'NLP solutions', 'Computer vision'], 4, true, '2025-01-01T08:45:00Z', '2025-12-12T10:00:00Z'),
('DevOps & CI/CD', 'Continuous integration and deployment pipelines with Docker, Kubernetes, and automated testing frameworks.', '⚙️', ARRAY['Docker & Kubernetes', 'CI/CD pipelines', 'Infrastructure as code', 'Monitoring & logging'], 5, true, '2025-01-01T09:00:00Z', '2025-12-12T10:00:00Z'),
('Database Design & Optimization', 'PostgreSQL, MongoDB, and Redis solutions optimized for performance and scalability.', '🗄️', ARRAY['PostgreSQL', 'MongoDB', 'Redis caching', 'Query optimization'], 6, true, '2025-01-01T09:15:00Z', '2025-12-12T10:00:00Z'),
('API Development', 'RESTful and GraphQL APIs with comprehensive documentation and security best practices.', '🔌', ARRAY['REST APIs', 'GraphQL', 'API documentation', 'Security & authentication'], 7, true, '2025-01-01T09:30:00Z', '2025-12-12T10:00:00Z'),
('UI/UX Design', 'Beautiful, intuitive user interfaces with modern design principles and accessibility standards.', '🎨', ARRAY['UI Design', 'UX Research', 'Prototyping', 'Accessibility'], 8, true, '2025-01-01T09:45:00Z', '2025-12-12T10:00:00Z'),
('Security & Compliance', 'End-to-end security audits, penetration testing, and compliance with GDPR, HIPAA, and SOC 2.', '🔒', ARRAY['Security audits', 'Penetration testing', 'GDPR compliance', 'Data protection'], 9, true, '2025-01-01T10:00:00Z', '2025-12-12T10:00:00Z'),
('Consulting & Strategy', 'Technology strategy, architecture design, and digital transformation consulting for enterprises.', '📈', ARRAY['Tech strategy', 'Architecture design', 'Digital transformation', 'Business consulting'], 10, true, '2025-01-01T10:15:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- SEED DATA - PORTFOLIO
-- ============================================================================

INSERT INTO portfolio (title, category, description, tech_stack, results, "order", is_active, created_at, updated_at) VALUES
('E-Commerce Platform Redesign', 'SaaS', 'Complete redesign and modernization of a major e-commerce platform serving 100K+ users.', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], '40% increase in conversion rate', 1, true, '2025-01-05T10:00:00Z', '2025-12-12T10:00:00Z'),
('Enterprise Cloud Migration', 'Enterprise', 'Migrated legacy monolithic system to microservices architecture on AWS.', ARRAY['Kubernetes', 'Docker', 'AWS', 'Node.js'], '60% reduction in infrastructure costs', 2, true, '2025-01-06T10:00:00Z', '2025-12-12T10:00:00Z'),
('Healthcare Analytics Dashboard', 'Healthcare', 'Real-time analytics dashboard for healthcare provider with 500+ hospitals.', ARRAY['React', 'Python', 'TensorFlow', 'PostgreSQL'], '30% improvement in data insights', 3, true, '2025-01-07T10:00:00Z', '2025-12-12T10:00:00Z'),
('Retail Mobile App', 'Retail', 'Cross-platform mobile app for retail chain with 200+ stores nationwide.', ARRAY['React Native', 'Firebase', 'Node.js'], '50K+ downloads in first month', 4, true, '2025-01-08T10:00:00Z', '2025-12-12T10:00:00Z'),
('AI-Powered Chatbot System', 'SaaS', 'Intelligent chatbot system using NLP for customer support automation.', ARRAY['Python', 'TensorFlow', 'Node.js', 'MongoDB'], '70% reduction in support tickets', 5, true, '2025-01-09T10:00:00Z', '2025-12-12T10:00:00Z'),
('Financial Dashboard', 'Enterprise', 'Real-time financial reporting dashboard for investment firm.', ARRAY['React', 'D3.js', 'Node.js', 'PostgreSQL'], '99.9% uptime achieved', 6, true, '2025-01-10T10:00:00Z', '2025-12-12T10:00:00Z'),
('Supply Chain Optimization', 'Enterprise', 'IoT-enabled supply chain management system for logistics company.', ARRAY['Node.js', 'IoT', 'MongoDB', 'AWS'], '25% reduction in delivery time', 7, true, '2025-01-11T10:00:00Z', '2025-12-12T10:00:00Z'),
('SaaS Booking Platform', 'SaaS', 'Multi-tenant booking platform for service industry.', ARRAY['Next.js', 'PostgreSQL', 'Stripe', 'AWS'], '$2M ARR achieved', 8, true, '2025-01-12T10:00:00Z', '2025-12-12T10:00:00Z'),
('Educational Learning Platform', 'SaaS', 'Interactive learning platform with video streaming and progress tracking.', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], '50K+ active learners', 9, true, '2025-01-13T10:00:00Z', '2025-12-12T10:00:00Z'),
('Real Estate Management System', 'Enterprise', 'Comprehensive property management system for real estate portfolio.', ARRAY['React', 'Node.js', 'PostgreSQL', 'Maps API'], '500+ properties managed', 10, true, '2025-01-14T10:00:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- SEED DATA - BLOG POSTS
-- ============================================================================

INSERT INTO blog_posts (title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at) VALUES
('The Future of Cloud Computing in 2025', 'technology', 'Sarah Editor', '2025-12-10', 'Cloud computing continues to evolve with serverless architectures, edge computing, and AI integration becoming mainstream.', 'Cloud computing continues to evolve with serverless architectures, edge computing, and AI integration becoming mainstream. Organizations are leveraging multi-cloud strategies for flexibility and cost optimization. Discover how to prepare your infrastructure for the next generation of cloud technologies.', '☁️', 'future-cloud-computing-2025', true, '2025-12-10T09:00:00Z', '2025-12-10T10:00:00Z'),
('Building Scalable APIs with Node.js', 'development', 'John Editor', '2025-12-09', 'Learn best practices for designing and implementing scalable APIs using Node.js and Express.', 'Learn best practices for designing and implementing scalable APIs using Node.js and Express. This comprehensive guide covers authentication, rate limiting, caching strategies, and monitoring. Perfect for developers looking to build production-ready APIs.', '🔌', 'building-scalable-apis-nodejs', true, '2025-12-09T09:00:00Z', '2025-12-09T10:00:00Z'),
('AI-Powered Automation: Transforming Business Processes', 'innovation', 'Emma Editor', '2025-12-08', 'Artificial intelligence is revolutionizing how businesses operate. From customer service chatbots to predictive analytics.', 'Artificial intelligence is revolutionizing how businesses operate. From customer service chatbots to predictive analytics, AI automation is reducing costs and improving efficiency. Explore real-world case studies and implementation strategies.', '🤖', 'ai-powered-automation-business', true, '2025-12-08T09:00:00Z', '2025-12-08T10:00:00Z'),
('React Hooks: A Comprehensive Guide', 'development', 'Michael Editor', '2025-12-07', 'React Hooks have transformed how we write functional components. This in-depth guide covers useState, useEffect, useContext, and custom hooks.', 'React Hooks have transformed how we write functional components. This in-depth guide covers useState, useEffect, useContext, and custom hooks. Learn patterns and best practices for modern React development.', '⚛️', 'react-hooks-comprehensive-guide', true, '2025-12-07T09:00:00Z', '2025-12-07T10:00:00Z'),
('Cybersecurity Best Practices for 2025', 'security', 'Sarah Editor', '2025-12-06', 'With cyber threats evolving constantly, organizations must stay vigilant. This article covers zero-trust architecture, encryption strategies.', 'With cyber threats evolving constantly, organizations must stay vigilant. This article covers zero-trust architecture, encryption strategies, and incident response planning. Protect your digital assets with proven security measures.', '🔒', 'cybersecurity-best-practices-2025', true, '2025-12-06T09:00:00Z', '2025-12-06T10:00:00Z'),
('PostgreSQL Performance Tuning Tips', 'database', 'John Editor', '2025-12-05', 'Optimize your PostgreSQL database for maximum performance. Learn about indexing strategies, query optimization, connection pooling.', 'Optimize your PostgreSQL database for maximum performance. Learn about indexing strategies, query optimization, connection pooling, and monitoring tools. Improve your database efficiency with these practical tips.', '🗄️', 'postgresql-performance-tuning', true, '2025-12-05T09:00:00Z', '2025-12-05T10:00:00Z'),
('Microservices Architecture: Challenges and Solutions', 'architecture', 'Emma Editor', '2025-12-04', 'Microservices offer flexibility and scalability but come with complexity. Understand service discovery, API gateways, distributed tracing.', 'Microservices offer flexibility and scalability but come with complexity. Understand service discovery, API gateways, distributed tracing, and resilience patterns. Build robust microservices systems with confidence.', '🏗️', 'microservices-architecture-guide', true, '2025-12-04T09:00:00Z', '2025-12-04T10:00:00Z'),
('User Experience Design Principles', 'design', 'Michael Editor', '2025-12-03', 'Great UX design goes beyond aesthetics. Learn about user research, wireframing, prototyping, and usability testing.', 'Great UX design goes beyond aesthetics. Learn about user research, wireframing, prototyping, and usability testing. Create intuitive interfaces that delight your users and drive engagement.', '🎨', 'ux-design-principles', true, '2025-12-03T09:00:00Z', '2025-12-03T10:00:00Z'),
('Docker and Kubernetes: Container Orchestration Mastery', 'devops', 'Sarah Editor', '2025-12-02', 'Containerization has become essential for modern development. Master Docker fundamentals and Kubernetes orchestration.', 'Containerization has become essential for modern development. Master Docker fundamentals and Kubernetes orchestration. Learn deployment strategies, scaling, and monitoring for containerized applications.', '🐳', 'docker-kubernetes-orchestration', true, '2025-12-02T09:00:00Z', '2025-12-02T10:00:00Z'),
('Web Performance Optimization Strategies', 'performance', 'John Editor', '2025-12-01', 'Website speed directly impacts user experience and SEO rankings. Discover techniques for image optimization, code splitting, caching.', 'Website speed directly impacts user experience and SEO rankings. Discover techniques for image optimization, code splitting, caching strategies, and CDN usage. Boost your website performance and user satisfaction.', '⚡', 'web-performance-optimization', true, '2025-12-01T09:00:00Z', '2025-12-01T10:00:00Z');

-- ============================================================================
-- SEED DATA - TESTIMONIALS
-- ============================================================================

INSERT INTO testimonials (name, email, rating, text, "order", is_active, created_at, updated_at) VALUES
('CEO, Digital Venture', 'ceo@digitalventure.com', 5, '"DrivePixel delivered a flawless system that scaled our operations instantly. Their technical expertise and attention to detail made all the difference in our success."', 1, true, '2025-12-11T10:00:00Z', '2025-12-12T10:00:00Z'),
('CTO, TechStart Inc', 'cto@techstart.com', 5, '"Working with DrivePixel was transformative. They understood our complex requirements and delivered a solution that exceeded expectations."', 2, true, '2025-12-10T10:00:00Z', '2025-12-12T10:00:00Z'),
('Founder, CloudSolutions', 'founder@cloudsolutions.com', 5, '"The team at DrivePixel is exceptional. They brought innovation and expertise to every aspect of our project."', 3, true, '2025-12-09T10:00:00Z', '2025-12-12T10:00:00Z'),
('VP Product, RetailCorp', 'vp@retailcorp.com', 5, '"DrivePixel helped us modernize our infrastructure and improve performance by 40%. Highly recommended!"', 4, true, '2025-12-08T10:00:00Z', '2025-12-12T10:00:00Z'),
('Director, FinanceHub', 'director@financehub.com', 5, '"Outstanding service and support. DrivePixel is a trusted partner for our digital transformation journey."', 5, true, '2025-12-07T10:00:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- SEED DATA - HERO TEXTS
-- ============================================================================

INSERT INTO hero_texts (title, subtitle, "order", is_active, created_at, updated_at) VALUES
('Build Future-Ready Platforms', 'We create smart applications, AI-powered tools, and seamless cloud infrastructure that help brands grow faster.', 1, true, '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z'),
('Transform Your Digital Vision', 'From concept to deployment, we deliver world-class solutions that drive innovation and business growth.', 2, true, '2025-01-02T08:00:00Z', '2025-12-12T10:00:00Z'),
('Scale With Confidence', 'Enterprise-grade infrastructure and expert guidance to take your business to the next level.', 3, true, '2025-01-03T08:00:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- SEED DATA - JOBS
-- ============================================================================

INSERT INTO jobs (title, type, location, description, benefits, "order", is_active, created_at, updated_at) VALUES
('Senior Full-Stack Developer', 'full-time', 'New Delhi', 'We are looking for an experienced full-stack developer with expertise in React, Node.js, and PostgreSQL. You will work on building scalable web applications for our clients. Requirements: 5+ years experience, strong problem-solving skills, and experience with cloud platforms.', 'Competitive salary, health insurance, 401k, flexible work hours, remote options, professional development budget', 1, true, '2025-12-01T08:00:00Z', '2025-12-12T10:00:00Z'),
('DevOps Engineer', 'full-time', 'Remote', 'Join our infrastructure team to design and maintain cloud infrastructure using AWS and Kubernetes. You will work on CI/CD pipelines, infrastructure automation, and system reliability. Requirements: 3+ years DevOps experience, Kubernetes knowledge, and scripting skills.', 'Competitive salary, comprehensive health coverage, stock options, learning budget, flexible schedule', 2, true, '2025-12-02T08:00:00Z', '2025-12-12T10:00:00Z'),
('UI/UX Designer', 'full-time', 'New Delhi', 'We need a creative UI/UX designer to create beautiful and intuitive user interfaces. You will work with product and development teams to deliver exceptional user experiences. Requirements: 4+ years design experience, Figma proficiency, and portfolio.', 'Competitive salary, health insurance, creative freedom, collaborative environment, professional growth', 3, true, '2025-12-03T08:00:00Z', '2025-12-12T10:00:00Z'),
('Machine Learning Engineer', 'full-time', 'Remote', 'Help us build AI-powered solutions using Python, TensorFlow, and PyTorch. You will develop and deploy machine learning models for various applications. Requirements: 3+ years ML experience, strong Python skills, and ML frameworks knowledge.', 'Competitive salary, equity, health benefits, research opportunities, flexible work arrangement', 4, true, '2025-12-04T08:00:00Z', '2025-12-12T10:00:00Z'),
('Quality Assurance Engineer', 'full-time', 'New Delhi', 'Ensure product quality through comprehensive testing and automation. You will develop test strategies, create automated test suites, and work with development teams. Requirements: 2+ years QA experience, automation testing knowledge, and attention to detail.', 'Competitive salary, health insurance, career development, team bonding activities, flexible hours', 5, true, '2025-12-05T08:00:00Z', '2025-12-12T10:00:00Z'),
('Cloud Architect', 'full-time', 'Remote', 'Design and implement scalable cloud solutions for our enterprise clients. Requirements: 5+ years cloud architecture experience, AWS/Azure expertise, and enterprise solutions knowledge.', 'Competitive salary, stock options, health benefits, learning budget, remote flexibility', 6, true, '2025-12-06T08:00:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- SEED DATA - CONTACT INFO
-- ============================================================================

INSERT INTO contact_info (type, value, label, created_at, updated_at) VALUES
('email', 'Info@OneDriveRealty.com', 'Primary Email', '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z'),
('address', 'WA', 'Office Location', '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z');

-- ============================================================================
-- END OF CONSOLIDATED DATABASE SCHEMA
-- ============================================================================
-- All data is now centralized in drivepixel.sql
-- No hardcoded data should exist in the codebase
-- ============================================================================
