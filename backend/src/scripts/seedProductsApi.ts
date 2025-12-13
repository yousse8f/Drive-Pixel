
const API_URL = "http://localhost:5000/api/products";

const products = [
    {
        name: "Enterprise Web Development Package",
        description: "Complete custom website capability with React, Next.js, and scaling architecture. Includes SEO optimization and 3 months of support.",
        price: 2499.00,
        category: "Services",
        availability: 10,
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
        isActive: true
    },
    {
        name: "UI/UX Design Sprint",
        description: "One-week intensive design sprint to prototype your app idea. Delivered as high-fidelity Figma files and interactive prototypes.",
        price: 899.00,
        category: "Design",
        availability: 5,
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
        isActive: true
    },
    {
        name: "Cloud Infrastructure Audit",
        description: "Comprehensive security and performance review of your AWS/Azure infrastructure with actionable report.",
        price: 499.00,
        category: "Consulting",
        availability: 20,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        isActive: true
    },
    {
        name: "E-Commerce Starter Kit",
        description: "Pre-built Next.js e-commerce template with Stripe integration, admin dashboard, and inventory management.",
        price: 199.00,
        category: "Software",
        availability: 100,
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
        isActive: true
    },
    {
        name: "SEO Optimization Services",
        description: "Boost your search rankings with our comprehensive on-page and off-page SEO strategies.",
        price: 750.00,
        category: "Marketing",
        availability: 15,
        imageUrl: "https://images.unsplash.com/photo-1571721795195-ad25d6d4a853?auto=format&fit=crop&w=800&q=80",
        isActive: true
    },
    {
        name: "Mobile App MVP Development",
        description: "Rapid development of a Minimum Viable Product for iOS and Android using React Native.",
        price: 3500.00,
        category: "Development",
        availability: 3,
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        isActive: true
    }
];

const seed = async () => {
    console.log("Seeding products via API...");
    let successCount = 0;

    for (const product of products) {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
            const data = await res.json();

            if (res.ok && data.success) {
                console.log(`Created: ${product.name}`);
                successCount++;
            } else {
                console.error(`Failed to create ${product.name}:`, data.message || "Unknown error");
            }
        } catch (err) {
            console.error(`Error connecting to API for ${product.name}:`, err);
        }
    }

    console.log(`Seeding complete. Successfully created ${successCount} of ${products.length} products.`);
};

seed();
