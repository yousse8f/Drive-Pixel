"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.completeFirstLogin = exports.validateFirstLogin = exports.signup = void 0;
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
const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (!domain)
        return email;
    const maskedUser = user.length <= 2 ? `${user[0]}*` : `${user[0]}***${user[user.length - 1]}`;
    return `${maskedUser}@${domain}`;
};
const validateFirstLogin = async (req, res) => {
    try {
        const token = req.query.token || (req.body && req.body.token);
        if (!token)
            return res.status(400).json((0, apiResponse_1.errorResponse)("Token is required"));
        const linkResult = await (0, database_1.query)(`SELECT u.id, u.email, u.password_set, u.first_login_token, u.first_login_token_expires_at, u.first_login_consumed_at,
              l.used_at, l.expires_at
       FROM user_access_links l
       JOIN users u ON u.id = l.user_id
       WHERE l.token = $1`, [token]);
        if (linkResult.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Invalid token"));
        }
        const row = linkResult.rows[0];
        if (row.used_at)
            return res.status(410).json((0, apiResponse_1.errorResponse)("Token already used"));
        if (row.expires_at && new Date(row.expires_at) < new Date()) {
            return res.status(410).json((0, apiResponse_1.errorResponse)("Token expired"));
        }
        if (row.first_login_consumed_at || row.password_set === true) {
            return res.status(410).json((0, apiResponse_1.errorResponse)("Password already set"));
        }
        return res.json((0, apiResponse_1.successResponse)("Token valid", {
            email: maskEmail(row.email),
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.validateFirstLogin = validateFirstLogin;
const completeFirstLogin = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Token and password are required"));
        }
        const linkResult = await (0, database_1.query)(`SELECT u.id, u.email, u.first_login_token, u.password_set, l.used_at, l.expires_at
       FROM user_access_links l
       JOIN users u ON u.id = l.user_id
       WHERE l.token = $1`, [token]);
        if (linkResult.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Invalid token"));
        }
        const row = linkResult.rows[0];
        if (row.used_at)
            return res.status(410).json((0, apiResponse_1.errorResponse)("Token already used"));
        if (row.expires_at && new Date(row.expires_at) < new Date()) {
            return res.status(410).json((0, apiResponse_1.errorResponse)("Token expired"));
        }
        if (row.password_set === true) {
            return res.status(410).json((0, apiResponse_1.errorResponse)("Password already set"));
        }
        const hashed = await (0, authUtils_1.hashPassword)(password);
        await (0, database_1.query)(`UPDATE users
       SET password = $1,
           password_set = TRUE,
           first_login_consumed_at = CURRENT_TIMESTAMP,
           first_login_token = NULL,
           first_login_token_expires_at = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`, [hashed, row.id]);
        await (0, database_1.query)("UPDATE user_access_links SET used_at = CURRENT_TIMESTAMP WHERE token = $1", [token]);
        const jwt = (0, authUtils_1.generateToken)(row.id);
        return res.json((0, apiResponse_1.successResponse)("Password set successfully", {
            token: jwt,
            user: {
                id: row.id,
                email: row.email,
                role: "user",
            },
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.completeFirstLogin = completeFirstLogin;
const login = async (req, res) => {
    try {
        const validatedData = validation_1.userLoginSchema.parse(req.body);
        // Find user in database
        const userResult = await (0, database_1.query)("SELECT id, password, first_name, last_name, role, password_set FROM users WHERE email = $1", [validatedData.email]);
        if (userResult.rows.length === 0) {
            return res
                .status(401)
                .json((0, apiResponse_1.errorResponse)("Invalid credentials", "User not found"));
        }
        const user = userResult.rows[0];
        if (user.password_set === false) {
            return res
                .status(403)
                .json((0, apiResponse_1.errorResponse)("First login required", "Please use the first-login link sent to your email to set a password."));
        }
        // Compare password
        const isPasswordValid = await (0, authUtils_1.comparePassword)(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json((0, apiResponse_1.errorResponse)("Invalid credentials", "Wrong password"));
        }
        // Generate token
        const token = (0, authUtils_1.generateToken)(user.id);
        return res.json((0, apiResponse_1.successResponse)("Login successful", {
            user: {
                id: user.id,
                email: validatedData.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role || 'user',
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
