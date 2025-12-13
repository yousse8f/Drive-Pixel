"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroText = exports.updateHeroText = exports.createHeroText = exports.getHeroTexts = exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getTestimonials = exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPost = exports.getBlogPosts = exports.deletePortfolio = exports.updatePortfolio = exports.createPortfolio = exports.getPortfolio = exports.deleteService = exports.updateService = exports.createService = exports.getServices = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
// Services
const getServices = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
        const result = await (0, database_1.query)(`SELECT id, title, description, icon, items, "order", is_active, created_at, updated_at 
       FROM services ${whereClause} ORDER BY "order" ASC, created_at DESC`, []);
        return res.json((0, apiResponse_1.successResponse)("Services retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getServices = getServices;
const createService = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, database_1.query)(`INSERT INTO services (title, description, icon, items, "order", is_active) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, title, description, icon, items, "order", is_active, created_at, updated_at`, [data.title, data.description, data.icon, data.items || [], data.order || 0, data.isActive !== false]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Service created successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating service", error.message));
    }
};
exports.createService = createService;
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (data.title !== undefined) {
            updateFields.push(`title = $${paramIndex++}`);
            updateValues.push(data.title);
        }
        if (data.description !== undefined) {
            updateFields.push(`description = $${paramIndex++}`);
            updateValues.push(data.description);
        }
        if (data.icon !== undefined) {
            updateFields.push(`icon = $${paramIndex++}`);
            updateValues.push(data.icon);
        }
        if (data.items !== undefined) {
            updateFields.push(`items = $${paramIndex++}`);
            updateValues.push(data.items);
        }
        if (data.order !== undefined) {
            updateFields.push(`"order" = $${paramIndex++}`);
            updateValues.push(data.order);
        }
        if (data.isActive !== undefined) {
            updateFields.push(`is_active = $${paramIndex++}`);
            updateValues.push(data.isActive);
        }
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE services SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, description, icon, items, "order", is_active, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Service not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Service updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM services WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Service not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Service deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteService = deleteService;
// Portfolio
const getPortfolio = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
        const result = await (0, database_1.query)(`SELECT id, title, category, description, tech_stack, results, image_url, "order", is_active, created_at, updated_at 
       FROM portfolio ${whereClause} ORDER BY "order" ASC, created_at DESC`, []);
        return res.json((0, apiResponse_1.successResponse)("Portfolio retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getPortfolio = getPortfolio;
const createPortfolio = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, database_1.query)(`INSERT INTO portfolio (title, category, description, tech_stack, results, image_url, "order", is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, title, category, description, tech_stack, results, image_url, "order", is_active, created_at, updated_at`, [data.title, data.category, data.description, data.techStack || [], data.results, data.imageUrl || null, data.order || 0, data.isActive !== false]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Portfolio item created successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating portfolio item", error.message));
    }
};
exports.createPortfolio = createPortfolio;
const updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                const dbKey = key === 'techStack' ? 'tech_stack' : key === 'imageUrl' ? 'image_url' : key === 'isActive' ? 'is_active' : key === 'order' ? '"order"' : key;
                updateFields.push(`${dbKey} = $${paramIndex++}`);
                updateValues.push(value);
            }
        });
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE portfolio SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, category, description, tech_stack, results, image_url, "order", is_active, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Portfolio item not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Portfolio item updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updatePortfolio = updatePortfolio;
const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM portfolio WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Portfolio item not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Portfolio item deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deletePortfolio = deletePortfolio;
// Blog Posts
const getBlogPosts = async (req, res) => {
    try {
        const { includeUnpublished } = req.query;
        const whereClause = includeUnpublished === 'true' ? '' : 'WHERE is_published = true';
        const result = await (0, database_1.query)(`SELECT id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at 
       FROM blog_posts ${whereClause} ORDER BY date DESC, created_at DESC`, []);
        return res.json((0, apiResponse_1.successResponse)("Blog posts retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getBlogPosts = getBlogPosts;
const getBlogPost = async (req, res) => {
    try {
        const { slug } = req.params;
        const result = await (0, database_1.query)(`SELECT id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at 
       FROM blog_posts WHERE slug = $1`, [slug]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Blog post not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Blog post retrieved successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getBlogPost = getBlogPost;
const createBlogPost = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, database_1.query)(`INSERT INTO blog_posts (title, category, author, date, excerpt, content, image, slug, is_published) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at`, [data.title, data.category, data.author, data.date, data.excerpt, data.content || null, data.image, data.slug, data.isPublished || false]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Blog post created successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating blog post", error.message));
    }
};
exports.createBlogPost = createBlogPost;
const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                const dbKey = key === 'isPublished' ? 'is_published' : key;
                updateFields.push(`${dbKey} = $${paramIndex++}`);
                updateValues.push(value);
            }
        });
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE blog_posts SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, category, author, date, excerpt, content, image, slug, is_published, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Blog post not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Blog post updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM blog_posts WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Blog post not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Blog post deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteBlogPost = deleteBlogPost;
// Testimonials
const getTestimonials = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
        const result = await (0, database_1.query)(`SELECT id, name, email, rating, text, "order", is_active, created_at, updated_at 
       FROM testimonials ${whereClause} ORDER BY "order" ASC, created_at DESC`, []);
        return res.json((0, apiResponse_1.successResponse)("Testimonials retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getTestimonials = getTestimonials;
const createTestimonial = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, database_1.query)(`INSERT INTO testimonials (name, email, rating, text, "order", is_active) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, rating, text, "order", is_active, created_at, updated_at`, [data.name, data.email, data.rating, data.text, data.order || 0, data.isActive !== false]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Testimonial created successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating testimonial", error.message));
    }
};
exports.createTestimonial = createTestimonial;
const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                const dbKey = key === 'isActive' ? 'is_active' : key === 'order' ? '"order"' : key;
                updateFields.push(`${dbKey} = $${paramIndex++}`);
                updateValues.push(value);
            }
        });
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE testimonials SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, name, email, rating, text, "order", is_active, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Testimonial not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Testimonial updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM testimonials WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Testimonial not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Testimonial deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteTestimonial = deleteTestimonial;
// Hero Texts
const getHeroTexts = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const whereClause = includeInactive === 'true' ? '' : 'WHERE is_active = true';
        const result = await (0, database_1.query)(`SELECT id, title, subtitle, "order", is_active, created_at, updated_at 
       FROM hero_texts ${whereClause} ORDER BY "order" ASC, created_at DESC`, []);
        return res.json((0, apiResponse_1.successResponse)("Hero texts retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getHeroTexts = getHeroTexts;
const createHeroText = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, database_1.query)(`INSERT INTO hero_texts (title, subtitle, "order", is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, title, subtitle, "order", is_active, created_at, updated_at`, [data.title, data.subtitle, data.order || 0, data.isActive !== false]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Hero text created successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating hero text", error.message));
    }
};
exports.createHeroText = createHeroText;
const updateHeroText = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                const dbKey = key === 'isActive' ? 'is_active' : key === 'order' ? '"order"' : key;
                updateFields.push(`${dbKey} = $${paramIndex++}`);
                updateValues.push(value);
            }
        });
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE hero_texts SET ${updateFields.join(", ")} WHERE id = $${paramIndex} 
       RETURNING id, title, subtitle, "order", is_active, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Hero text not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Hero text updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateHeroText = updateHeroText;
const deleteHeroText = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM hero_texts WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Hero text not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Hero text deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteHeroText = deleteHeroText;
