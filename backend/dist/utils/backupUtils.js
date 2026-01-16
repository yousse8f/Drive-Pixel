"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBackup = createBackup;
exports.restoreBackup = restoreBackup;
exports.listBackups = listBackups;
exports.getBackupInfo = getBackupInfo;
exports.scheduleAutomaticBackups = scheduleAutomaticBackups;
exports.exportUserData = exportUserData;
exports.deleteUserData = deleteUserData;
const database_1 = require("../config/database");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DEFAULT_CONFIG = {
    tables: [
        'users',
        'crm_customers',
        'crm_customer_notes',
        'crm_activities',
        'crm_deals',
        'crm_pipeline_stages',
        'cms_pages',
        'cms_sections',
        'cms_content_blocks',
        'cms_components',
        'cms_content_versions',
        'email_lists',
        'email_list_subscribers',
        'email_templates',
        'email_campaigns',
        'leads',
        'products',
        'orders',
        'order_items',
        'services',
        'portfolio',
        'blog_posts',
        'testimonials',
        'settings',
    ],
    outputDir: path.join(__dirname, '../../backups'),
    maxBackups: 10,
};
/**
 * Create a JSON backup of specified tables
 */
async function createBackup(config = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    // Ensure backup directory exists
    if (!fs.existsSync(finalConfig.outputDir)) {
        fs.mkdirSync(finalConfig.outputDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup_${timestamp}.json`;
    const backupPath = path.join(finalConfig.outputDir, backupFileName);
    const backupData = {};
    const metadata = {
        timestamp: new Date().toISOString(),
        tables: [],
        rowCounts: {},
    };
    for (const table of finalConfig.tables) {
        try {
            const result = await (0, database_1.query)(`SELECT * FROM ${table}`);
            backupData[table] = result.rows;
            metadata.tables.push(table);
            metadata.rowCounts[table] = result.rows.length;
        }
        catch (error) {
            console.error(`Error backing up table ${table}:`, error);
        }
    }
    const backup = {
        metadata,
        data: backupData,
    };
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
    // Clean up old backups
    await cleanupOldBackups(finalConfig.outputDir, finalConfig.maxBackups);
    return backupPath;
}
/**
 * Restore from a JSON backup
 */
async function restoreBackup(backupPath, tables) {
    const restored = [];
    const errors = [];
    try {
        const backupContent = fs.readFileSync(backupPath, 'utf8');
        const backup = JSON.parse(backupContent);
        const tablesToRestore = tables || Object.keys(backup.data);
        for (const table of tablesToRestore) {
            if (!backup.data[table]) {
                errors.push(`Table ${table} not found in backup`);
                continue;
            }
            try {
                // Delete existing data
                await (0, database_1.query)(`DELETE FROM ${table}`);
                // Insert backup data
                const rows = backup.data[table];
                for (const row of rows) {
                    const columns = Object.keys(row);
                    const values = Object.values(row);
                    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
                    const columnNames = columns.map(c => `"${c}"`).join(', ');
                    await (0, database_1.query)(`INSERT INTO ${table} (${columnNames}) VALUES (${placeholders})`, values);
                }
                restored.push(table);
            }
            catch (error) {
                errors.push(`Error restoring ${table}: ${error.message}`);
            }
        }
        return { success: errors.length === 0, restored, errors };
    }
    catch (error) {
        return { success: false, restored, errors: [`Failed to read backup: ${error.message}`] };
    }
}
/**
 * List available backups
 */
function listBackups(outputDir = DEFAULT_CONFIG.outputDir) {
    if (!fs.existsSync(outputDir)) {
        return [];
    }
    const files = fs.readdirSync(outputDir)
        .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
        .map(f => {
        const filePath = path.join(outputDir, f);
        const stats = fs.statSync(filePath);
        return {
            name: f,
            date: stats.mtime,
            size: stats.size,
        };
    })
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    return files;
}
/**
 * Clean up old backups, keeping only the most recent ones
 */
async function cleanupOldBackups(outputDir, maxBackups) {
    const backups = listBackups(outputDir);
    if (backups.length > maxBackups) {
        const toDelete = backups.slice(maxBackups);
        for (const backup of toDelete) {
            const filePath = path.join(outputDir, backup.name);
            fs.unlinkSync(filePath);
        }
    }
}
/**
 * Get backup info
 */
function getBackupInfo(backupPath) {
    try {
        const content = fs.readFileSync(backupPath, 'utf8');
        const backup = JSON.parse(content);
        const totalRows = Object.values(backup.metadata.rowCounts)
            .reduce((sum, count) => sum + count, 0);
        return {
            metadata: backup.metadata,
            tableCount: backup.metadata.tables.length,
            totalRows,
        };
    }
    catch (error) {
        return null;
    }
}
/**
 * Schedule automatic backups (call this on server start)
 */
function scheduleAutomaticBackups(intervalHours = 24) {
    const intervalMs = intervalHours * 60 * 60 * 1000;
    return setInterval(async () => {
        try {
            console.log('Starting scheduled backup...');
            const backupPath = await createBackup();
            console.log(`Scheduled backup completed: ${backupPath}`);
        }
        catch (error) {
            console.error('Scheduled backup failed:', error);
        }
    }, intervalMs);
}
/**
 * Export specific data for compliance/GDPR
 */
async function exportUserData(userId) {
    const userData = {};
    try {
        // User info
        const userResult = await (0, database_1.query)("SELECT * FROM users WHERE id = $1", [userId]);
        if (userResult.rows.length > 0) {
            const user = { ...userResult.rows[0] };
            delete user.password;
            userData.user = user;
        }
        // Customer data
        const customerResult = await (0, database_1.query)("SELECT * FROM crm_customers WHERE user_id = $1", [userId]);
        userData.customers = customerResult.rows;
        // Leads
        const leadsResult = await (0, database_1.query)("SELECT * FROM leads WHERE user_id = $1", [userId]);
        userData.leads = leadsResult.rows;
        // Orders
        const ordersResult = await (0, database_1.query)("SELECT * FROM orders WHERE user_id = $1", [userId]);
        userData.orders = ordersResult.rows;
        // Activity logs
        const logsResult = await (0, database_1.query)("SELECT * FROM logs WHERE user_id = $1", [userId]);
        userData.activityLogs = logsResult.rows;
        // Audit logs
        const auditResult = await (0, database_1.query)("SELECT * FROM audit_logs WHERE user_id = $1", [userId]);
        userData.auditLogs = auditResult.rows;
        return userData;
    }
    catch (error) {
        console.error('Error exporting user data:', error);
        throw error;
    }
}
/**
 * Delete user data for GDPR compliance
 */
async function deleteUserData(userId) {
    const deletedFrom = [];
    try {
        // Delete from various tables
        const tables = [
            'audit_logs',
            'logs',
            'crm_activities',
            'crm_customer_notes',
            'crm_deals',
            'orders',
            'leads',
            'crm_customers',
            'user_role_assignments',
        ];
        for (const table of tables) {
            try {
                const result = await (0, database_1.query)(`DELETE FROM ${table} WHERE user_id = $1`, [userId]);
                if (result.rowCount && result.rowCount > 0) {
                    deletedFrom.push(table);
                }
            }
            catch (error) {
                // Table might not have user_id column, skip
            }
        }
        // Finally delete the user
        await (0, database_1.query)("DELETE FROM users WHERE id = $1", [userId]);
        deletedFrom.push('users');
        return { success: true, deletedFrom };
    }
    catch (error) {
        console.error('Error deleting user data:', error);
        return { success: false, deletedFrom };
    }
}
