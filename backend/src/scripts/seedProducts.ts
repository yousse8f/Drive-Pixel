
import { query } from "../config/database";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const seedProducts = async () => {
    try {
        console.log("Seeding products...");

        // Ensure table exists
        await query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        category VARCHAR(100),
        availability INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Insert data
        const products = [
            {
                name: "Enterprise Web Development Package",
                description: "Complete custom website capability with React, Node.js, and scaling architecture. Includes SEO optimization and 3 months of support.",
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

        for (const p of products) {
            await query(
                `INSERT INTO products (name, description, price, category, availability, image_url) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
                [p.name, p.description, p.price, p.category, p.availability, p.image_url]
            );
        }

        console.log("Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedProducts();
