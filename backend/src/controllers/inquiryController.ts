import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const submitInquiry = async (req: Request, res: Response) => {
    try {
        const { serviceId, fullName, email, phone, message } = req.body;

        // Insert inquiry into the database
        const result = await query(
            `INSERT INTO inquiries (service_id, client_full_name, client_email, client_phone, message) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id`,
            [serviceId, fullName, email, phone, message]
        );

        const inquiryId = result.rows[0].id;

        // Logic to determine the appropriate department or freelancer
        // Example: Fetch department or freelancer based on serviceId

        return res.status(201).json(successResponse("Inquiry submitted successfully", { inquiryId }));
    } catch (error: any) {
        return res.status(500).json(errorResponse("Server error", error.message));
    }
};
