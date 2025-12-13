"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentAnalytics = exports.getLeadsAnalytics = exports.getDashboardStats = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const getDashboardStats = async (req, res) => {
    try {
        // Get total counts
        const [usersCount, leadsCount, servicesCount, portfolioCount, blogCount, testimonialsCount] = await Promise.all([
            (0, database_1.query)("SELECT COUNT(*) as count FROM users", []),
            (0, database_1.query)("SELECT COUNT(*) as count FROM leads", []),
            (0, database_1.query)("SELECT COUNT(*) as count FROM services", []),
            (0, database_1.query)("SELECT COUNT(*) as count FROM portfolio", []),
            (0, database_1.query)("SELECT COUNT(*) as count FROM blog_posts", []),
            (0, database_1.query)("SELECT COUNT(*) as count FROM testimonials", []),
        ]);
        // Get recent leads (last 7 days)
        const recentLeads = await (0, database_1.query)(`SELECT COUNT(*) as count FROM leads 
       WHERE created_at >= NOW() - INTERVAL '7 days'`, []);
        // Get leads by status
        const leadsByStatus = await (0, database_1.query)(`SELECT status, COUNT(*) as count 
       FROM leads 
       GROUP BY status 
       ORDER BY count DESC`, []);
        // Get recent activity (last 10 logs)
        const recentActivity = await (0, database_1.query)(`SELECT l.*, u.email as user_email 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       ORDER BY l.created_at DESC 
       LIMIT 10`, []);
        // Get content statistics
        const activeContent = await (0, database_1.query)(`SELECT 
        (SELECT COUNT(*) FROM services WHERE is_active = true) as active_services,
        (SELECT COUNT(*) FROM portfolio WHERE is_active = true) as active_portfolio,
        (SELECT COUNT(*) FROM blog_posts WHERE is_published = true) as published_blogs,
        (SELECT COUNT(*) FROM testimonials WHERE is_active = true) as active_testimonials`, []);
        return res.json((0, apiResponse_1.successResponse)("Dashboard statistics retrieved successfully", {
            counts: {
                users: parseInt(usersCount.rows[0].count),
                leads: parseInt(leadsCount.rows[0].count),
                services: parseInt(servicesCount.rows[0].count),
                portfolio: parseInt(portfolioCount.rows[0].count),
                blogPosts: parseInt(blogCount.rows[0].count),
                testimonials: parseInt(testimonialsCount.rows[0].count),
            },
            recentLeads: parseInt(recentLeads.rows[0].count),
            leadsByStatus: leadsByStatus.rows,
            activeContent: activeContent.rows[0],
            recentActivity: recentActivity.rows,
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getDashboardStats = getDashboardStats;
const getLeadsAnalytics = async (req, res) => {
    try {
        const { period = '30' } = req.query;
        const days = parseInt(period);
        // Leads over time
        const leadsOverTime = await (0, database_1.query)(`SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM leads 
       WHERE created_at >= NOW() - INTERVAL '${days} days'
       GROUP BY DATE(created_at) 
       ORDER BY date ASC`, []);
        // Leads by status
        const leadsByStatus = await (0, database_1.query)(`SELECT status, COUNT(*) as count 
       FROM leads 
       GROUP BY status 
       ORDER BY count DESC`, []);
        return res.json((0, apiResponse_1.successResponse)("Leads analytics retrieved successfully", {
            leadsOverTime: leadsOverTime.rows,
            leadsByStatus: leadsByStatus.rows,
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getLeadsAnalytics = getLeadsAnalytics;
const getContentAnalytics = async (req, res) => {
    try {
        const contentStats = await (0, database_1.query)(`SELECT 
        'services' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
       FROM services
       UNION ALL
       SELECT 
        'portfolio' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
       FROM portfolio
       UNION ALL
       SELECT 
        'blog_posts' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_published THEN 1 ELSE 0 END) as active
       FROM blog_posts
       UNION ALL
       SELECT 
        'testimonials' as type, COUNT(*) as total, 
        SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active
       FROM testimonials`, []);
        return res.json((0, apiResponse_1.successResponse)("Content analytics retrieved successfully", {
            contentStats: contentStats.rows,
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getContentAnalytics = getContentAnalytics;
