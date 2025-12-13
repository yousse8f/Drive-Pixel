"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitInquiry = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const submitInquiry = async (req, res) => {
    try {
        const { serviceId, fullName, email, phone, message } = req.body;
        // Insert inquiry into the database
        const result = await (0, database_1.query)(`INSERT INTO inquiries (service_id, client_full_name, client_email, client_phone, message) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id`, [serviceId, fullName, email, phone, message]);
        const inquiryId = result.rows[0].id;
        // Logic to determine the appropriate department or freelancer
        // Example: Fetch department or freelancer based on serviceId
        return res.status(201).json((0, apiResponse_1.successResponse)("Inquiry submitted successfully", { inquiryId }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.submitInquiry = submitInquiry;
