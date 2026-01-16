"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateSecureToken = generateSecureToken;
exports.hashData = hashData;
exports.maskEmail = maskEmail;
exports.maskPhone = maskPhone;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
/**
 * Get encryption key from environment
 */
function getEncryptionKey() {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    // If key is hex string, convert to buffer
    if (key.length === 64) {
        return Buffer.from(key, 'hex');
    }
    // Otherwise, hash the key to get 32 bytes
    return crypto_1.default.createHash('sha256').update(key).digest();
}
/**
 * Encrypt sensitive data
 */
function encrypt(text) {
    if (!text)
        return '';
    try {
        const key = getEncryptionKey();
        const iv = crypto_1.default.randomBytes(IV_LENGTH);
        const cipher = crypto_1.default.createCipheriv(ALGORITHM, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        // Format: iv:authTag:encryptedData
        return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    }
    catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
}
/**
 * Decrypt sensitive data
 */
function decrypt(encryptedText) {
    if (!encryptedText)
        return '';
    try {
        const key = getEncryptionKey();
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted data format');
        }
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encrypted = parts[2];
        const decipher = crypto_1.default.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
}
/**
 * Hash a password using bcrypt-compatible method
 */
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}
/**
 * Verify a password against a hash
 */
function verifyPassword(password, storedHash) {
    const [salt, hash] = storedHash.split(':');
    const verifyHash = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}
/**
 * Generate a secure random token
 */
function generateSecureToken(length = 32) {
    return crypto_1.default.randomBytes(length).toString('hex');
}
/**
 * Hash data for comparison (non-reversible)
 */
function hashData(data) {
    return crypto_1.default.createHash('sha256').update(data).digest('hex');
}
/**
 * Mask sensitive data for display (e.g., email, phone)
 */
function maskEmail(email) {
    if (!email)
        return '';
    const [local, domain] = email.split('@');
    if (!domain)
        return email;
    const maskedLocal = local.length > 2
        ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}`
        : local;
    return `${maskedLocal}@${domain}`;
}
function maskPhone(phone) {
    if (!phone)
        return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 4)
        return phone;
    return `${'*'.repeat(cleaned.length - 4)}${cleaned.slice(-4)}`;
}
