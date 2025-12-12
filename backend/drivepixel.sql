-- Drive Pixel Database Seed Data
-- This file contains CREATE TABLE and INSERT statements for all tables with realistic dummy data

-- Create Tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    benefits TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert Data

-- Users (1 admin, 4 editors)
INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at) VALUES
(1, 'admin_user', 'admin@drivepixel.com', '$2b$10$YourHashedPasswordHere1', 'admin', '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z'),
(2, 'sarah_editor', 'sarah.editor@drivepixel.com', '$2b$10$YourHashedPasswordHere2', 'editor', '2025-01-05T09:15:00Z', '2025-12-12T10:00:00Z'),
(3, 'john_editor', 'john.editor@drivepixel.com', '$2b$10$YourHashedPasswordHere3', 'editor', '2025-01-10T10:30:00Z', '2025-12-12T10:00:00Z'),
(4, 'emma_editor', 'emma.editor@drivepixel.com', '$2b$10$YourHashedPasswordHere4', 'editor', '2025-01-15T11:45:00Z', '2025-12-12T10:00:00Z'),
(5, 'michael_editor', 'michael.editor@drivepixel.com', '$2b$10$YourHashedPasswordHere5', 'editor', '2025-01-20T13:00:00Z', '2025-12-12T10:00:00Z');

-- Services (10 services)
INSERT INTO services (id, title, description, image_url, created_at, updated_at) VALUES
(1, 'Web Development', 'Custom web applications built with modern frameworks like React, Next.js, and Node.js for scalable solutions.', '/images/services/web-development.jpg', '2025-01-01T08:00:00Z', '2025-12-12T10:00:00Z'),
(2, 'Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android using Flutter and React Native.', '/images/services/mobile-development.jpg', '2025-01-01T08:15:00Z', '2025-12-12T10:00:00Z'),
(3, 'Cloud Infrastructure', 'AWS, Google Cloud, and Azure solutions for scalable, secure, and reliable cloud deployments.', '/images/services/cloud-infrastructure.jpg', '2025-01-01T08:30:00Z', '2025-12-12T10:00:00Z'),
(4, 'AI & Machine Learning', 'Intelligent automation and predictive analytics powered by machine learning and artificial intelligence.', '/images/services/ai-ml.jpg', '2025-01-01T08:45:00Z', '2025-12-12T10:00:00Z'),
(5, 'DevOps & CI/CD', 'Continuous integration and deployment pipelines with Docker, Kubernetes, and automated testing frameworks.', '/images/services/devops.jpg', '2025-01-01T09:00:00Z', '2025-12-12T10:00:00Z'),
(6, 'Database Design & Optimization', 'PostgreSQL, MongoDB, and Redis solutions optimized for performance and scalability.', '/images/services/database.jpg', '2025-01-01T09:15:00Z', '2025-12-12T10:00:00Z'),
(7, 'API Development', 'RESTful and GraphQL APIs with comprehensive documentation and security best practices.', '/images/services/api-development.jpg', '2025-01-01T09:30:00Z', '2025-12-12T10:00:00Z'),
(8, 'UI/UX Design', 'Beautiful, intuitive user interfaces with modern design principles and accessibility standards.', '/images/services/ui-ux-design.jpg', '2025-01-01T09:45:00Z', '2025-12-12T10:00:00Z'),
(9, 'Security & Compliance', 'End-to-end security audits, penetration testing, and compliance with GDPR, HIPAA, and SOC 2.', '/images/services/security.jpg', '2025-01-01T10:00:00Z', '2025-12-12T10:00:00Z'),
(10, 'Consulting & Strategy', 'Technology strategy, architecture design, and digital transformation consulting for enterprises.', '/images/services/consulting.jpg', '2025-01-01T10:15:00Z', '2025-12-12T10:00:00Z');

-- Properties (10 properties)
INSERT INTO properties (id, title, category, description, image_url, created_at, updated_at) VALUES
(1, 'Modern Downtown Loft', 'residential', 'Stunning 2-bedroom loft in the heart of downtown with floor-to-ceiling windows and exposed brick.', '/images/properties/downtown-loft.jpg', '2025-01-05T10:00:00Z', '2025-12-12T10:00:00Z'),
(2, 'Luxury Penthouse Suite', 'residential', 'Exclusive 4-bedroom penthouse with panoramic city views, private terrace, and smart home automation.', '/images/properties/penthouse.jpg', '2025-01-06T10:00:00Z', '2025-12-12T10:00:00Z'),
(3, 'Suburban Family Home', 'residential', '3-bedroom family home in quiet neighborhood with large backyard, garage, and modern amenities.', '/images/properties/family-home.jpg', '2025-01-07T10:00:00Z', '2025-12-12T10:00:00Z'),
(4, 'Tech Park Office Space', 'commercial', 'Premium office space in tech park with high-speed internet, meeting rooms, and collaborative workspace.', '/images/properties/tech-park.jpg', '2025-01-08T10:00:00Z', '2025-12-12T10:00:00Z'),
(5, 'Retail Shopping Center', 'commercial', 'High-traffic retail center with 20,000 sq ft of space, perfect for retail or restaurant concepts.', '/images/properties/shopping-center.jpg', '2025-01-09T10:00:00Z', '2025-12-12T10:00:00Z'),
(6, 'Industrial Warehouse', 'commercial', 'State-of-the-art warehouse facility with loading docks, climate control, and logistics infrastructure.', '/images/properties/warehouse.jpg', '2025-01-10T10:00:00Z', '2025-12-12T10:00:00Z'),
(7, 'Beachfront Villa', 'residential', 'Luxurious beachfront villa with 5 bedrooms, private beach access, and infinity pool overlooking the ocean.', '/images/properties/beachfront-villa.jpg', '2025-01-11T10:00:00Z', '2025-12-12T10:00:00Z'),
(8, 'Corporate Headquarters', 'commercial', 'Modern corporate headquarters with 50,000 sq ft, executive suites, and state-of-the-art facilities.', '/images/properties/headquarters.jpg', '2025-01-12T10:00:00Z', '2025-12-12T10:00:00Z'),
(9, 'Mountain Retreat', 'residential', 'Secluded mountain cabin with 3 bedrooms, fireplace, and stunning views of the surrounding peaks.', '/images/properties/mountain-retreat.jpg', '2025-01-13T10:00:00Z', '2025-12-12T10:00:00Z'),
(10, 'Mixed-Use Development', 'commercial', 'Integrated mixed-use development with retail, offices, and residential units in prime location.', '/images/properties/mixed-use.jpg', '2025-01-14T10:00:00Z', '2025-12-12T10:00:00Z');

-- Blog Posts (10 blog posts)
INSERT INTO blog_posts (id, title, content, category, author, published_at, created_at, updated_at) VALUES
(1, 'The Future of Cloud Computing in 2025', 'Cloud computing continues to evolve with serverless architectures, edge computing, and AI integration becoming mainstream. Organizations are leveraging multi-cloud strategies for flexibility and cost optimization. Discover how to prepare your infrastructure for the next generation of cloud technologies.', 'technology', 'Sarah Editor', '2025-12-10T10:00:00Z', '2025-12-10T09:00:00Z', '2025-12-10T10:00:00Z'),
(2, 'Building Scalable APIs with Node.js', 'Learn best practices for designing and implementing scalable APIs using Node.js and Express. This comprehensive guide covers authentication, rate limiting, caching strategies, and monitoring. Perfect for developers looking to build production-ready APIs.', 'development', 'John Editor', '2025-12-09T10:00:00Z', '2025-12-09T09:00:00Z', '2025-12-09T10:00:00Z'),
(3, 'AI-Powered Automation: Transforming Business Processes', 'Artificial intelligence is revolutionizing how businesses operate. From customer service chatbots to predictive analytics, AI automation is reducing costs and improving efficiency. Explore real-world case studies and implementation strategies.', 'innovation', 'Emma Editor', '2025-12-08T10:00:00Z', '2025-12-08T09:00:00Z', '2025-12-08T10:00:00Z'),
(4, 'React Hooks: A Comprehensive Guide', 'React Hooks have transformed how we write functional components. This in-depth guide covers useState, useEffect, useContext, and custom hooks. Learn patterns and best practices for modern React development.', 'development', 'Michael Editor', '2025-12-07T10:00:00Z', '2025-12-07T09:00:00Z', '2025-12-07T10:00:00Z'),
(5, 'Cybersecurity Best Practices for 2025', 'With cyber threats evolving constantly, organizations must stay vigilant. This article covers zero-trust architecture, encryption strategies, and incident response planning. Protect your digital assets with proven security measures.', 'security', 'Sarah Editor', '2025-12-06T10:00:00Z', '2025-12-06T09:00:00Z', '2025-12-06T10:00:00Z'),
(6, 'PostgreSQL Performance Tuning Tips', 'Optimize your PostgreSQL database for maximum performance. Learn about indexing strategies, query optimization, connection pooling, and monitoring tools. Improve your database efficiency with these practical tips.', 'database', 'John Editor', '2025-12-05T10:00:00Z', '2025-12-05T09:00:00Z', '2025-12-05T10:00:00Z'),
(7, 'Microservices Architecture: Challenges and Solutions', 'Microservices offer flexibility and scalability but come with complexity. Understand service discovery, API gateways, distributed tracing, and resilience patterns. Build robust microservices systems with confidence.', 'architecture', 'Emma Editor', '2025-12-04T10:00:00Z', '2025-12-04T09:00:00Z', '2025-12-04T10:00:00Z'),
(8, 'User Experience Design Principles', 'Great UX design goes beyond aesthetics. Learn about user research, wireframing, prototyping, and usability testing. Create intuitive interfaces that delight your users and drive engagement.', 'design', 'Michael Editor', '2025-12-03T10:00:00Z', '2025-12-03T09:00:00Z', '2025-12-03T10:00:00Z'),
(9, 'Docker and Kubernetes: Container Orchestration Mastery', 'Containerization has become essential for modern development. Master Docker fundamentals and Kubernetes orchestration. Learn deployment strategies, scaling, and monitoring for containerized applications.', 'devops', 'Sarah Editor', '2025-12-02T10:00:00Z', '2025-12-02T09:00:00Z', '2025-12-02T10:00:00Z'),
(10, 'Web Performance Optimization Strategies', 'Website speed directly impacts user experience and SEO rankings. Discover techniques for image optimization, code splitting, caching strategies, and CDN usage. Boost your website performance and user satisfaction.', 'performance', 'John Editor', '2025-12-01T10:00:00Z', '2025-12-01T09:00:00Z', '2025-12-01T10:00:00Z');

-- Contact Submissions (5 contact submissions)
INSERT INTO contact_submissions (id, name, email, subject, message, user_id, created_at) VALUES
(1, 'Alice Johnson', 'alice.johnson@company.com', 'Web Development Inquiry', 'We are interested in building a custom web application for our e-commerce platform. Could you provide a quote and timeline?', 2, '2025-12-11T14:30:00Z'),
(2, 'Robert Chen', 'robert.chen@startup.io', 'Cloud Migration Project', 'We need to migrate our legacy system to AWS. What is your experience with cloud migrations and what would be the estimated cost?', 3, '2025-12-10T11:15:00Z'),
(3, 'Maria Garcia', 'maria.garcia@enterprise.com', 'AI Implementation', 'We want to implement AI-powered analytics in our business intelligence platform. Can you help us with this?', 4, '2025-12-09T16:45:00Z'),
(4, 'David Thompson', 'david.thompson@tech.com', 'Mobile App Development', 'Looking to develop a cross-platform mobile app for iOS and Android. What technologies do you recommend?', 5, '2025-12-08T09:20:00Z'),
(5, 'Lisa Anderson', 'lisa.anderson@finance.co', 'Security Audit', 'We need a comprehensive security audit of our infrastructure. Please provide details about your security assessment services.', 2, '2025-12-07T13:50:00Z');

-- Jobs (5 job openings)
INSERT INTO jobs (id, title, type, description, benefits, created_at, updated_at) VALUES
(1, 'Senior Full-Stack Developer', 'full-time', 'We are looking for an experienced full-stack developer with expertise in React, Node.js, and PostgreSQL. You will work on building scalable web applications for our clients. Requirements: 5+ years experience, strong problem-solving skills, and experience with cloud platforms.', 'Competitive salary, health insurance, 401k, flexible work hours, remote options, professional development budget', '2025-12-01T08:00:00Z', '2025-12-12T10:00:00Z'),
(2, 'DevOps Engineer', 'full-time', 'Join our infrastructure team to design and maintain cloud infrastructure using AWS and Kubernetes. You will work on CI/CD pipelines, infrastructure automation, and system reliability. Requirements: 3+ years DevOps experience, Kubernetes knowledge, and scripting skills.', 'Competitive salary, comprehensive health coverage, stock options, learning budget, flexible schedule', '2025-12-02T08:00:00Z', '2025-12-12T10:00:00Z'),
(3, 'UI/UX Designer', 'full-time', 'We need a creative UI/UX designer to create beautiful and intuitive user interfaces. You will work with product and development teams to deliver exceptional user experiences. Requirements: 4+ years design experience, Figma proficiency, and portfolio.', 'Competitive salary, health insurance, creative freedom, collaborative environment, professional growth', '2025-12-03T08:00:00Z', '2025-12-12T10:00:00Z'),
(4, 'Machine Learning Engineer', 'full-time', 'Help us build AI-powered solutions using Python, TensorFlow, and PyTorch. You will develop and deploy machine learning models for various applications. Requirements: 3+ years ML experience, strong Python skills, and ML frameworks knowledge.', 'Competitive salary, equity, health benefits, research opportunities, flexible work arrangement', '2025-12-04T08:00:00Z', '2025-12-12T10:00:00Z'),
(5, 'Quality Assurance Engineer', 'full-time', 'Ensure product quality through comprehensive testing and automation. You will develop test strategies, create automated test suites, and work with development teams. Requirements: 2+ years QA experience, automation testing knowledge, and attention to detail.', 'Competitive salary, health insurance, career development, team bonding activities, flexible hours', '2025-12-05T08:00:00Z', '2025-12-12T10:00:00Z');
