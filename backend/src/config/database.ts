import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";
import { hashPassword } from "../utils/authUtils";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
});

export const getConnection = async (): Promise<PoolClient> => {
  return pool.connect();
};

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    return res;
  } catch (error) {
    console.error("Database query error", { text, error });
    throw error;
  }
};

export const initializeDatabase = async () => {
  try {

    await query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

    // Create users table
    await query(`
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

    // Seed admin user
    const adminCount = await query("SELECT count(*) FROM users WHERE email = 'admin@drivepixel.com'");
    if (parseInt(adminCount.rows[0].count) === 0) {
      const adminPassword = await hashPassword("admin123");
      await query(
        `INSERT INTO users (email, password, first_name, last_name, role) 
         VALUES ($1, $2, $3, $4, $5)`,
        ["admin@drivepixel.com", adminPassword, "Admin", "User", "admin"]
      );
    }

    // Create products table (e-commerce)
    await query(`
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

    // Seed products if empty
    const productCount = await query('SELECT count(*) FROM products');
    if (parseInt(productCount.rows[0].count) === 0) {
      const productsToSeed = [
        {
          name: "Enterprise Web Development Package",
          description: "Complete custom website capability with React, Next.js, and scaling architecture. Include SEO optimization and 3 months of support.",
          price: 2499.00,
          category: "Services",
          availability: 10,
          image_url: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "UI/UX Design Sprint",
          description: "One-week intensive design sprint to prototype your app idea. Delivered as high-fidelity Figma files and interactive prototypes.",
          price: 899.00,
          category: "Design",
          availability: 5,
          image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Cloud Infrastructure Audit",
          description: "Comprehensive security and performance review of your AWS/Azure infrastructure with actionable report.",
          price: 499.00,
          category: "Consulting",
          availability: 20,
          image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "E-Commerce Starter Kit",
          description: "Pre-built Next.js e-commerce template with Stripe integration, admin dashboard, and inventory management.",
          price: 199.00,
          category: "Software",
          availability: 100,
          image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "SEO Optimization Services",
          description: "Boost your search rankings with our comprehensive on-page and off-page SEO strategies.",
          price: 750.00,
          category: "Marketing",
          availability: 15,
          image_url: "https://images.unsplash.com/photo-1571721795195-ad25d6d4a853?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Mobile App MVP Development",
          description: "Rapid development of a Minimum Viable Product for iOS and Android using React Native.",
          price: 3500.00,
          category: "Development",
          availability: 3,
          image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
        }
      ];

      for (const p of productsToSeed) {
        await query(
          `INSERT INTO products (name, description, price, image_url, category, availability, is_active) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [p.name, p.description, p.price, p.image_url, p.category, p.availability, true]
        );
      }
    }

    // Carts and cart items
    await query(`
      CREATE TABLE IF NOT EXISTS carts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
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
    await query(`
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

    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id),
        quantity INT NOT NULL,
        price_each DECIMAL(12, 2) NOT NULL
      );
    `);

    // Create leads table
    await query(`
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
    await query(`
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
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);

    // Add role column to users table if it doesn't exist
    await query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
          ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
        END IF;
      END $$;
    `);

    // Create services table
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
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
    await query(`
      CREATE TABLE IF NOT EXISTS contact_info (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        type VARCHAR(50) NOT NULL UNIQUE,
        value VARCHAR(255) NOT NULL,
        label VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create additional indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");`);
    await query(`CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio(is_active);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_jobs_order ON jobs("order");`);
    await query(`CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_hero_texts_active ON hero_texts(is_active);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_logs_resource ON logs(resource);`);

  } catch (error) {
    console.error("Error initializing database", error);
    throw error;
  }
};

export default pool;
