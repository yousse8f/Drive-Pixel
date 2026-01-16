import { Request, Response } from "express";
import { query } from "../config/database";
import { sanitizeHtml } from "../utils/sanitizer";
import { createAuditLog } from "../utils/auditLogger";

// =====================================================
// CMS PAGES
// =====================================================

export const getPages = async (req: Request, res: Response) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      whereClause += ` AND status = $${paramIndex++}`;
      params.push(status);
    }

    if (search) {
      whereClause += ` AND (title ILIKE $${paramIndex++} OR slug ILIKE $${paramIndex++})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM cms_pages ${whereClause}`,
      params
    );

    params.push(Number(limit), offset);
    const result = await query(
      `SELECT p.*, 
        u1.email as created_by_email,
        u2.email as updated_by_email,
        (SELECT COUNT(*) FROM cms_sections WHERE page_id = p.id) as section_count
       FROM cms_pages p
       LEFT JOIN users u1 ON p.created_by = u1.id
       LEFT JOIN users u2 ON p.updated_by = u2.id
       ${whereClause}
       ORDER BY p.updated_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ success: false, message: "Failed to fetch pages" });
  }
};

export const getPage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT p.*, 
        u1.email as created_by_email,
        u2.email as updated_by_email
       FROM cms_pages p
       LEFT JOIN users u1 ON p.created_by = u1.id
       LEFT JOIN users u2 ON p.updated_by = u2.id
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    // Get sections with content blocks
    const sectionsResult = await query(
      `SELECT s.*, 
        (SELECT json_agg(cb ORDER BY cb."order") 
         FROM cms_content_blocks cb 
         WHERE cb.section_id = s.id AND cb.is_active = true) as blocks
       FROM cms_sections s
       WHERE s.page_id = $1 AND s.is_active = true
       ORDER BY s."order"`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        sections: sectionsResult.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ success: false, message: "Failed to fetch page" });
  }
};

export const createPage = async (req: Request, res: Response) => {
  try {
    const { slug, title, meta_title, meta_description, status, template } = req.body;
    const userId = (req as any).userId;

    if (!slug || !title) {
      return res.status(400).json({ success: false, message: "Slug and title are required" });
    }

    // Check if slug exists
    const existing = await query("SELECT id FROM cms_pages WHERE slug = $1", [slug]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }

    const result = await query(
      `INSERT INTO cms_pages (slug, title, meta_title, meta_description, status, template, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7)
       RETURNING *`,
      [slug, title, meta_title, meta_description, status || "draft", template || "default", userId]
    );

    await createAuditLog(userId, "create", "cms_page", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ success: false, message: "Failed to create page" });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { slug, title, meta_title, meta_description, status, template } = req.body;
    const userId = (req as any).userId;

    // Get old values for audit
    const oldResult = await query("SELECT * FROM cms_pages WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    // Check if new slug conflicts
    if (slug && slug !== oldResult.rows[0].slug) {
      const existing = await query("SELECT id FROM cms_pages WHERE slug = $1 AND id != $2", [slug, id]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: "Slug already exists" });
      }
    }

    // Create version before update
    await createContentVersion("cms_page", id, oldResult.rows[0], userId);

    const publishedAt = status === "published" && oldResult.rows[0].status !== "published" 
      ? new Date() 
      : oldResult.rows[0].published_at;

    const result = await query(
      `UPDATE cms_pages 
       SET slug = COALESCE($1, slug),
           title = COALESCE($2, title),
           meta_title = COALESCE($3, meta_title),
           meta_description = COALESCE($4, meta_description),
           status = COALESCE($5, status),
           template = COALESCE($6, template),
           published_at = $7,
           updated_by = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [slug, title, meta_title, meta_description, status, template, publishedAt, userId, id]
    );

    await createAuditLog(userId, "update", "cms_page", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ success: false, message: "Failed to update page" });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_pages WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    await query("DELETE FROM cms_pages WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "cms_page", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ success: false, message: "Failed to delete page" });
  }
};

// =====================================================
// CMS SECTIONS
// =====================================================

export const getSections = async (req: Request, res: Response) => {
  try {
    const { page_id } = req.query;

    let whereClause = "WHERE 1=1";
    const params: any[] = [];

    if (page_id) {
      whereClause += " AND page_id = $1";
      params.push(page_id);
    }

    const result = await query(
      `SELECT s.*, 
        (SELECT COUNT(*) FROM cms_content_blocks WHERE section_id = s.id) as block_count
       FROM cms_sections s
       ${whereClause}
       ORDER BY s."order"`,
      params
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ success: false, message: "Failed to fetch sections" });
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    const { page_id, name, section_type, content, order } = req.body;
    const userId = (req as any).userId;

    if (!page_id || !name || !section_type) {
      return res.status(400).json({ success: false, message: "page_id, name, and section_type are required" });
    }

    // Sanitize HTML content if present
    const sanitizedContent = content ? sanitizeHtmlContent(content) : {};

    const result = await query(
      `INSERT INTO cms_sections (page_id, name, section_type, content, "order")
       VALUES ($1, $2, $3, $4, COALESCE($5, 0))
       RETURNING *`,
      [page_id, name, section_type, JSON.stringify(sanitizedContent), order]
    );

    await createAuditLog(userId, "create", "cms_section", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating section:", error);
    res.status(500).json({ success: false, message: "Failed to create section" });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, section_type, content, order, is_active } = req.body;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_sections WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    await createContentVersion("cms_section", id, oldResult.rows[0], userId);

    const sanitizedContent = content ? sanitizeHtmlContent(content) : oldResult.rows[0].content;

    const result = await query(
      `UPDATE cms_sections 
       SET name = COALESCE($1, name),
           section_type = COALESCE($2, section_type),
           content = COALESCE($3, content),
           "order" = COALESCE($4, "order"),
           is_active = COALESCE($5, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, section_type, JSON.stringify(sanitizedContent), order, is_active, id]
    );

    await createAuditLog(userId, "update", "cms_section", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ success: false, message: "Failed to update section" });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_sections WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    await query("DELETE FROM cms_sections WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "cms_section", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ success: false, message: "Failed to delete section" });
  }
};

// =====================================================
// CMS CONTENT BLOCKS
// =====================================================

export const getContentBlocks = async (req: Request, res: Response) => {
  try {
    const { section_id } = req.query;

    let whereClause = "WHERE 1=1";
    const params: any[] = [];

    if (section_id) {
      whereClause += " AND section_id = $1";
      params.push(section_id);
    }

    const result = await query(
      `SELECT * FROM cms_content_blocks ${whereClause} ORDER BY "order"`,
      params
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching content blocks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch content blocks" });
  }
};

export const createContentBlock = async (req: Request, res: Response) => {
  try {
    const { section_id, block_type, content, order } = req.body;
    const userId = (req as any).userId;

    if (!section_id || !block_type) {
      return res.status(400).json({ success: false, message: "section_id and block_type are required" });
    }

    const sanitizedContent = content ? sanitizeHtmlContent(content) : {};

    const result = await query(
      `INSERT INTO cms_content_blocks (section_id, block_type, content, "order")
       VALUES ($1, $2, $3, COALESCE($4, 0))
       RETURNING *`,
      [section_id, block_type, JSON.stringify(sanitizedContent), order]
    );

    await createAuditLog(userId, "create", "cms_content_block", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating content block:", error);
    res.status(500).json({ success: false, message: "Failed to create content block" });
  }
};

export const updateContentBlock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { block_type, content, order, is_active } = req.body;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_content_blocks WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Content block not found" });
    }

    await createContentVersion("cms_content_block", id, oldResult.rows[0], userId);

    const sanitizedContent = content ? sanitizeHtmlContent(content) : oldResult.rows[0].content;

    const result = await query(
      `UPDATE cms_content_blocks 
       SET block_type = COALESCE($1, block_type),
           content = COALESCE($2, content),
           "order" = COALESCE($3, "order"),
           is_active = COALESCE($4, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [block_type, JSON.stringify(sanitizedContent), order, is_active, id]
    );

    await createAuditLog(userId, "update", "cms_content_block", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating content block:", error);
    res.status(500).json({ success: false, message: "Failed to update content block" });
  }
};

export const deleteContentBlock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_content_blocks WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Content block not found" });
    }

    await query("DELETE FROM cms_content_blocks WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "cms_content_block", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Content block deleted successfully" });
  } catch (error) {
    console.error("Error deleting content block:", error);
    res.status(500).json({ success: false, message: "Failed to delete content block" });
  }
};

// =====================================================
// CMS COMPONENTS (Reusable)
// =====================================================

export const getComponents = async (req: Request, res: Response) => {
  try {
    const { type, search } = req.query;

    let whereClause = "WHERE is_active = true";
    const params: any[] = [];
    let paramIndex = 1;

    if (type) {
      whereClause += ` AND component_type = $${paramIndex++}`;
      params.push(type);
    }

    if (search) {
      whereClause += ` AND (name ILIKE $${paramIndex++} OR slug ILIKE $${paramIndex++})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    const result = await query(
      `SELECT c.*, 
        u1.email as created_by_email,
        u2.email as updated_by_email
       FROM cms_components c
       LEFT JOIN users u1 ON c.created_by = u1.id
       LEFT JOIN users u2 ON c.updated_by = u2.id
       ${whereClause}
       ORDER BY c.name`,
      params
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching components:", error);
    res.status(500).json({ success: false, message: "Failed to fetch components" });
  }
};

export const createComponent = async (req: Request, res: Response) => {
  try {
    const { name, slug, component_type, content } = req.body;
    const userId = (req as any).userId;

    if (!name || !slug || !component_type) {
      return res.status(400).json({ success: false, message: "name, slug, and component_type are required" });
    }

    const existing = await query("SELECT id FROM cms_components WHERE slug = $1", [slug]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }

    const sanitizedContent = content ? sanitizeHtmlContent(content) : {};

    const result = await query(
      `INSERT INTO cms_components (name, slug, component_type, content, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $5)
       RETURNING *`,
      [name, slug, component_type, JSON.stringify(sanitizedContent), userId]
    );

    await createAuditLog(userId, "create", "cms_component", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating component:", error);
    res.status(500).json({ success: false, message: "Failed to create component" });
  }
};

export const updateComponent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, component_type, content, is_active } = req.body;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_components WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }

    if (slug && slug !== oldResult.rows[0].slug) {
      const existing = await query("SELECT id FROM cms_components WHERE slug = $1 AND id != $2", [slug, id]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: "Slug already exists" });
      }
    }

    await createContentVersion("cms_component", id, oldResult.rows[0], userId);

    const sanitizedContent = content ? sanitizeHtmlContent(content) : oldResult.rows[0].content;

    const result = await query(
      `UPDATE cms_components 
       SET name = COALESCE($1, name),
           slug = COALESCE($2, slug),
           component_type = COALESCE($3, component_type),
           content = COALESCE($4, content),
           is_active = COALESCE($5, is_active),
           updated_by = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, slug, component_type, JSON.stringify(sanitizedContent), is_active, userId, id]
    );

    await createAuditLog(userId, "update", "cms_component", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating component:", error);
    res.status(500).json({ success: false, message: "Failed to update component" });
  }
};

export const deleteComponent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM cms_components WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }

    await query("DELETE FROM cms_components WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "cms_component", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Component deleted successfully" });
  } catch (error) {
    console.error("Error deleting component:", error);
    res.status(500).json({ success: false, message: "Failed to delete component" });
  }
};

// =====================================================
// CMS VERSIONING
// =====================================================

export const getContentVersions = async (req: Request, res: Response) => {
  try {
    const { entity_type, entity_id } = req.query;

    if (!entity_type || !entity_id) {
      return res.status(400).json({ success: false, message: "entity_type and entity_id are required" });
    }

    const result = await query(
      `SELECT v.*, u.email as created_by_email
       FROM cms_content_versions v
       LEFT JOIN users u ON v.created_by = u.id
       WHERE v.entity_type = $1 AND v.entity_id = $2
       ORDER BY v.version_number DESC`,
      [entity_type, entity_id]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching content versions:", error);
    res.status(500).json({ success: false, message: "Failed to fetch content versions" });
  }
};

export const restoreContentVersion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const versionResult = await query("SELECT * FROM cms_content_versions WHERE id = $1", [id]);
    if (versionResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Version not found" });
    }

    const version = versionResult.rows[0];
    const { entity_type, entity_id, content } = version;

    let tableName: string;
    switch (entity_type) {
      case "cms_page":
        tableName = "cms_pages";
        break;
      case "cms_section":
        tableName = "cms_sections";
        break;
      case "cms_content_block":
        tableName = "cms_content_blocks";
        break;
      case "cms_component":
        tableName = "cms_components";
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid entity type" });
    }

    // Get current state for audit
    const currentResult = await query(`SELECT * FROM ${tableName} WHERE id = $1`, [entity_id]);
    if (currentResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Entity not found" });
    }

    // Create version of current state before restore
    await createContentVersion(entity_type, entity_id, currentResult.rows[0], userId);

    // Restore content
    const contentObj = typeof content === "string" ? JSON.parse(content) : content;
    
    // Build update query dynamically based on content keys
    const updateFields = Object.keys(contentObj)
      .filter(key => !["id", "created_at", "created_by"].includes(key))
      .map((key, idx) => `"${key}" = $${idx + 1}`)
      .join(", ");
    
    const updateValues = Object.keys(contentObj)
      .filter(key => !["id", "created_at", "created_by"].includes(key))
      .map(key => contentObj[key]);

    await query(
      `UPDATE ${tableName} SET ${updateFields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${updateValues.length + 1}`,
      [...updateValues, entity_id]
    );

    await createAuditLog(userId, "restore", entity_type, entity_id, currentResult.rows[0], contentObj, req);

    res.json({ success: true, message: "Version restored successfully" });
  } catch (error) {
    console.error("Error restoring version:", error);
    res.status(500).json({ success: false, message: "Failed to restore version" });
  }
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

async function createContentVersion(entityType: string, entityId: string, content: any, userId: string) {
  try {
    // Get next version number
    const versionResult = await query(
      `SELECT COALESCE(MAX(version_number), 0) + 1 as next_version
       FROM cms_content_versions
       WHERE entity_type = $1 AND entity_id = $2`,
      [entityType, entityId]
    );

    const nextVersion = versionResult.rows[0].next_version;

    await query(
      `INSERT INTO cms_content_versions (entity_type, entity_id, version_number, content, created_by)
       VALUES ($1, $2, $3, $4, $5)`,
      [entityType, entityId, nextVersion, JSON.stringify(content), userId]
    );
  } catch (error) {
    console.error("Error creating content version:", error);
  }
}

function sanitizeHtmlContent(content: any): any {
  if (typeof content === "string") {
    return sanitizeHtml(content);
  }
  
  if (typeof content === "object" && content !== null) {
    const sanitized: any = Array.isArray(content) ? [] : {};
    for (const key in content) {
      if (Object.prototype.hasOwnProperty.call(content, key)) {
        sanitized[key] = sanitizeHtmlContent(content[key]);
      }
    }
    return sanitized;
  }
  
  return content;
}
