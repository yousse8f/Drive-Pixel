import { Request, Response } from "express";
import { query } from "../config/database";
import { successResponse, errorResponse } from "../utils/apiResponse";

const mapProductRow = (row: any) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  price: Number(row.price),
  imageUrl: row.image_url,
  category: row.category,
  availability: row.availability,
  isActive: row.is_active,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const getPublicProducts = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const filters: string[] = ["is_active = true"];
    const params: any[] = [];

    if (category) {
      params.push(category);
      filters.push(`LOWER(category) = LOWER($${params.length})`);
    }

    if (search) {
      params.push(`%${search}%`);
      filters.push(
        `(LOWER(name) LIKE LOWER($${params.length}) OR LOWER(description) LIKE LOWER($${params.length}))`
      );
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const result = await query(
      `SELECT * FROM products ${whereClause} ORDER BY created_at DESC`,
      params
    );
    return res.json(
      successResponse(
        "Products retrieved successfully",
        result.rows.map(mapProductRow)
      )
    );
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};

export const getPublicProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query(
      "SELECT * FROM products WHERE id = $1 AND is_active = true",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Product not found"));
    }
    return res.json(
      successResponse("Product retrieved successfully", mapProductRow(result.rows[0]))
    );
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Product not found"));
    }
    return res.json(
      successResponse("Product retrieved successfully", mapProductRow(result.rows[0]))
    );
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    const whereClause = includeInactive === "true" ? "" : "WHERE is_active = true";
    const result = await query(
      `SELECT * FROM products ${whereClause} ORDER BY created_at DESC`
    );
    return res.json(
      successResponse(
        "Products retrieved successfully",
        result.rows.map(mapProductRow)
      )
    );
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl, category, availability, isActive } =
      req.body;

    if (!name || price === undefined) {
      return res.status(400).json(errorResponse("Name and price are required"));
    }

    const result = await query(
      `INSERT INTO products (name, description, price, image_url, category, availability, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        name,
        description || "",
        Number(price),
        imageUrl || null,
        category || null,
        availability !== undefined ? Number(availability) : 0,
        isActive !== false,
      ]
    );

    return res
      .status(201)
      .json(successResponse("Product created successfully", mapProductRow(result.rows[0])));
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category, availability, isActive } =
      req.body;

    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramIndex++}`);
      updateValues.push(name);
    }
    if (description !== undefined) {
      updateFields.push(`description = $${paramIndex++}`);
      updateValues.push(description);
    }
    if (price !== undefined) {
      updateFields.push(`price = $${paramIndex++}`);
      updateValues.push(Number(price));
    }
    if (imageUrl !== undefined) {
      updateFields.push(`image_url = $${paramIndex++}`);
      updateValues.push(imageUrl);
    }
    if (category !== undefined) {
      updateFields.push(`category = $${paramIndex++}`);
      updateValues.push(category);
    }
    if (availability !== undefined) {
      updateFields.push(`availability = $${paramIndex++}`);
      updateValues.push(Number(availability));
    }
    if (isActive !== undefined) {
      updateFields.push(`is_active = $${paramIndex++}`);
      updateValues.push(Boolean(isActive));
    }

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE products SET ${updateFields.join(", ")} WHERE id = $${paramIndex
      } RETURNING *`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Product not found"));
    }

    return res.json(
      successResponse("Product updated successfully", mapProductRow(result.rows[0]))
    );
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM products WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Product not found"));
    }
    return res.json(successResponse("Product deleted successfully"));
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Server error", error.message || "Error"));
  }
};
