import { Request, Response } from "express";
import { query } from "../config/database";
import { createAuditLog } from "../utils/auditLogger";
import * as fs from 'fs';
import * as path from 'path';

// =====================================================
// SITE CONTENT MANAGEMENT
// =====================================================

export const getSitePages = async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT * FROM site_pages 
      ORDER BY category, title
    `);
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching site pages:", error);
    res.status(500).json({ success: false, message: "Failed to fetch site pages" });
  }
};

export const getSitePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await query(`
      SELECT * FROM site_pages 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    
    // Get content blocks for this page
    const contentResult = await query(`
      SELECT * FROM site_page_content 
      WHERE page_id = $1 
      ORDER BY section_order, block_order
    `, [id]);
    
    const page = result.rows[0];
    page.content_blocks = contentResult.rows;
    
    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching site page:", error);
    res.status(500).json({ success: false, message: "Failed to fetch site page" });
  }
};

export const updateSitePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, meta_title, meta_description, content_blocks, images } = req.body;
    const userId = (req as any).userId;
    
    // Update page metadata
    await query(`
      UPDATE site_pages 
      SET title = $1, meta_title = $2, meta_description = $3, updated_by = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
    `, [title, meta_title, meta_description, userId, id]);
    
    // Delete existing content blocks
    await query("DELETE FROM site_page_content WHERE page_id = $1", [id]);
    
    // Insert new content blocks
    if (content_blocks && Array.isArray(content_blocks)) {
      for (let i = 0; i < content_blocks.length; i++) {
        const block = content_blocks[i];
        await query(`
          INSERT INTO site_page_content 
          (page_id, section_name, block_type, content, section_order, block_order, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          id,
          block.section_name || 'main',
          block.block_type || 'text',
          JSON.stringify(block.content),
          block.section_order || 0,
          block.block_order || i,
          block.is_active !== false
        ]);
      }
    }
    
    // Handle image uploads
    if (images && Array.isArray(images)) {
      for (const image of images) {
        if (image.base64 && image.filename) {
          const imageDir = path.join(__dirname, '../../public/images/site-content');
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
          }
          
          const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, '');
          const imagePath = path.join(imageDir, image.filename);
          fs.writeFileSync(imagePath, base64Data, 'base64');
        }
      }
    }
    
    await createAuditLog(userId, "update", "site_page", id, null, { title }, req);
    
    res.json({ success: true, message: "Page updated successfully" });
  } catch (error) {
    console.error("Error updating site page:", error);
    res.status(500).json({ success: false, message: "Failed to update page" });
  }
};

export const getSitePageByPath = async (req: Request, res: Response) => {
  try {
    const { path } = req.params;
    
    const result = await query(`
      SELECT * FROM site_pages 
      WHERE path = $1
    `, [path]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    
    // Get content blocks for this page
    const contentResult = await query(`
      SELECT * FROM site_page_content 
      WHERE page_id = $1 AND is_active = true
      ORDER BY section_order, block_order
    `, [result.rows[0].id]);
    
    const page = result.rows[0];
    page.content_blocks = contentResult.rows;
    
    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching site page by path:", error);
    res.status(500).json({ success: false, message: "Failed to fetch site page" });
  }
};

export const uploadSiteImage = async (req: Request, res: Response) => {
  try {
    const { filename, base64 } = req.body;
    
    if (!filename || !base64) {
      return res.status(400).json({ success: false, message: "Filename and base64 data required" });
    }
    
    const imageDir = path.join(__dirname, '../../public/images/site-content');
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    const imagePath = path.join(imageDir, filename);
    fs.writeFileSync(imagePath, base64Data, 'base64');
    
    res.json({ 
      success: true, 
      data: { 
        url: `/images/site-content/${filename}`,
        filename 
      } 
    });
  } catch (error) {
    console.error("Error uploading site image:", error);
    res.status(500).json({ success: false, message: "Failed to upload image" });
  }
};

export const deleteSiteImage = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    
    const imagePath = path.join(__dirname, '../../public/images/site-content', filename);
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting site image:", error);
    res.status(500).json({ success: false, message: "Failed to delete image" });
  }
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export async function initializeSitePages() {
  try {
    const pages = [
      {
        title: 'Blog',
        path: '/blog',
        category: 'blog',
        meta_title: 'Blog - DrivePixel',
        meta_description: 'Latest insights and updates from DrivePixel',
        template: 'blog'
      },
      {
        title: 'Real Estate',
        path: '/real-estate',
        category: 'real-estate',
        meta_title: 'Real Estate Services - DrivePixel',
        meta_description: 'Comprehensive real estate solutions and services',
        template: 'real-estate'
      },
      {
        title: 'Services',
        path: '/services',
        category: 'services',
        meta_title: 'Services - DrivePixel',
        meta_description: 'Professional services and solutions',
        template: 'services'
      },
      {
        title: 'Freight & Logistics',
        path: '/logistics',
        category: 'logistics',
        meta_title: 'Freight & Logistics - DrivePixel',
        meta_description: 'Reliable freight and logistics solutions',
        template: 'logistics'
      }
    ];

    for (const page of pages) {
      const existing = await query("SELECT id FROM site_pages WHERE path = $1", [page.path]);
      
      if (existing.rows.length === 0) {
        await query(`
          INSERT INTO site_pages (title, path, category, meta_title, meta_description, template, created_by, updated_by)
          VALUES ($1, $2, $3, $4, $5, $6, 1, 1)
        `, [page.title, page.path, page.category, page.meta_title, page.meta_description, page.template]);
      }
    }
    
    console.log("✅ Site pages initialized successfully");
  } catch (error) {
    console.error("Error initializing site pages:", error);
  }
}
