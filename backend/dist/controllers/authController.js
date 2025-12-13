"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const validation_1 = require("../utils/validation");
const apiResponse_1 = require("../utils/apiResponse");
const authUtils_1 = require("../utils/authUtils");
const database_1 = require("../config/database");
const signup = async (req, res) => {
    try {
        const validatedData = validation_1.userSignupSchema.parse(req.body);
        // Check if user already exists
        const existingUserResult = await (0, database_1.query)("SELECT id FROM users WHERE email = $1", [validatedData.email]);
        if (existingUserResult.rows.length > 0) {
            return res
                .status(400)
                .json((0, apiResponse_1.errorResponse)("User already exists", "Email already registered"));
        }
        // Hash password
        const hashedPassword = await (0, authUtils_1.hashPassword)(validatedData.password);
        // Create user in database
        const result = await (0, database_1.query)("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at", [validatedData.email, hashedPassword, validatedData.firstName, validatedData.lastName]);
        const newUser = result.rows[0];
        // Generate token
        const token = (0, authUtils_1.generateToken)(newUser.id);
        return res.status(201).json((0, apiResponse_1.successResponse)("User created successfully", {
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.first_name,
                lastName: newUser.last_name,
                role: 'user',
            },
            token,
        }));
    }
    catch (error) {
        return res
            .status(400)
            .json((0, apiResponse_1.errorResponse)("Validation error", error.message));
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const validatedData = validation_1.userLoginSchema.parse(req.body);
        // Find user in database
        const userResult = await (0, database_1.query)("SELECT id, password, first_name, last_name FROM users WHERE email = $1", [validatedData.email]);
        if (userResult.rows.length === 0) {
            return res
                .status(401)
                .json((0, apiResponse_1.errorResponse)("Invalid credentials", "User not found"));
        }
        const user = userResult.rows[0];
        // Compare password
        const isPasswordValid = await (0, authUtils_1.comparePassword)(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json((0, apiResponse_1.errorResponse)("Invalid credentials", "Wrong password"));
        }
        // Generate token
        const token = (0, authUtils_1.generateToken)(user.id);
        // Get user role
        const userWithRole = await (0, database_1.query)("SELECT role FROM users WHERE id = $1", [user.id]);
        return res.json((0, apiResponse_1.successResponse)("Login successful", {
            user: {
                id: user.id,
                email: validatedData.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: userWithRole.rows[0]?.role || 'user',
            },
            token,
        }));
    }
    catch (error) {
        return res
            .status(400)
            .json((0, apiResponse_1.errorResponse)("Validation error", error.message));
    }
};
exports.login = login;
