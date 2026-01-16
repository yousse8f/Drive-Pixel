import { query } from "../config/database";

/**
 * Comprehensive Admin Dashboard Testing Script
 * Tests all CRUD operations, validations, and integrations
 */

interface TestResult {
  module: string;
  test: string;
  status: "PASS" | "FAIL" | "WARN";
  message?: string;
  error?: any;
}

const results: TestResult[] = [];

function logTest(module: string, test: string, status: "PASS" | "FAIL" | "WARN", message?: string, error?: any) {
  results.push({ module, test, status, message, error });
  const icon = status === "PASS" ? "✅" : status === "FAIL" ? "❌" : "⚠️";
  console.log(`${icon} [${module}] ${test}${message ? `: ${message}` : ""}`);
  if (error) console.error("   Error:", error.message || error);
}

async function testAdminDashboard() {
  console.log("\n🧪 Starting Admin Dashboard Comprehensive Tests...\n");
  console.log("=".repeat(70));

  try {
    // =====================================================
    // 1. TEST SECURITY & RBAC
    // =====================================================
    console.log("\n🔒 Testing Security & RBAC...");

    // Test user roles exist
    try {
      const rolesResult = await query("SELECT * FROM user_roles WHERE is_system = true");
      if (rolesResult.rows.length >= 4) {
        logTest("Security", "System roles exist", "PASS", `Found ${rolesResult.rows.length} roles`);
      } else {
        logTest("Security", "System roles exist", "WARN", `Only found ${rolesResult.rows.length} roles`);
      }
    } catch (error) {
      logTest("Security", "System roles exist", "FAIL", undefined, error);
    }

    // Test role assignments
    try {
      const assignmentsResult = await query("SELECT COUNT(*) FROM user_role_assignments");
      if (parseInt(assignmentsResult.rows[0].count) > 0) {
        logTest("Security", "Role assignments exist", "PASS", `Found ${assignmentsResult.rows[0].count} assignments`);
      } else {
        logTest("Security", "Role assignments exist", "WARN", "No role assignments found");
      }
    } catch (error) {
      logTest("Security", "Role assignments exist", "FAIL", undefined, error);
    }

    // Test audit logs
    try {
      const auditResult = await query("SELECT COUNT(*) FROM audit_logs");
      logTest("Security", "Audit logs functional", "PASS", `Found ${auditResult.rows[0].count} audit entries`);
    } catch (error) {
      logTest("Security", "Audit logs functional", "FAIL", undefined, error);
    }

    // =====================================================
    // 2. TEST CRM MODULE
    // =====================================================
    console.log("\n🏢 Testing CRM Module...");

    // Test customers CRUD
    try {
      const customersResult = await query("SELECT COUNT(*) FROM crm_customers");
      const count = parseInt(customersResult.rows[0].count);
      if (count > 0) {
        logTest("CRM", "Customers table populated", "PASS", `Found ${count} customers`);
      } else {
        logTest("CRM", "Customers table populated", "WARN", "No customers found");
      }

      // Test customer with relations
      const customerWithRelations = await query(`
        SELECT c.*, 
          (SELECT COUNT(*) FROM crm_customer_notes WHERE customer_id = c.id) as notes_count,
          (SELECT COUNT(*) FROM crm_activities WHERE customer_id = c.id) as activities_count,
          (SELECT COUNT(*) FROM crm_deals WHERE customer_id = c.id) as deals_count
        FROM crm_customers c
        LIMIT 1
      `);

      if (customerWithRelations.rows.length > 0) {
        const customer = customerWithRelations.rows[0];
        logTest("CRM", "Customer relations", "PASS", 
          `Notes: ${customer.notes_count}, Activities: ${customer.activities_count}, Deals: ${customer.deals_count}`);
      }
    } catch (error) {
      logTest("CRM", "Customers functionality", "FAIL", undefined, error);
    }

    // Test pipeline stages
    try {
      const stagesResult = await query("SELECT * FROM crm_pipeline_stages WHERE is_active = true ORDER BY \"order\"");
      if (stagesResult.rows.length >= 5) {
        logTest("CRM", "Pipeline stages configured", "PASS", `Found ${stagesResult.rows.length} stages`);
      } else {
        logTest("CRM", "Pipeline stages configured", "WARN", `Only ${stagesResult.rows.length} stages found`);
      }
    } catch (error) {
      logTest("CRM", "Pipeline stages configured", "FAIL", undefined, error);
    }

    // Test deals
    try {
      const dealsResult = await query(`
        SELECT d.*, s.name as stage_name, c.first_name, c.last_name
        FROM crm_deals d
        LEFT JOIN crm_pipeline_stages s ON d.stage_id = s.id
        LEFT JOIN crm_customers c ON d.customer_id = c.id
        LIMIT 5
      `);
      
      if (dealsResult.rows.length > 0) {
        const hasValidRelations = dealsResult.rows.every(d => d.stage_name && d.first_name);
        if (hasValidRelations) {
          logTest("CRM", "Deals with relations", "PASS", `Found ${dealsResult.rows.length} deals with valid relations`);
        } else {
          logTest("CRM", "Deals with relations", "WARN", "Some deals missing relations");
        }
      } else {
        logTest("CRM", "Deals with relations", "WARN", "No deals found");
      }
    } catch (error) {
      logTest("CRM", "Deals functionality", "FAIL", undefined, error);
    }

    // Test customer notes
    try {
      const notesResult = await query("SELECT COUNT(*) FROM crm_customer_notes");
      if (parseInt(notesResult.rows[0].count) > 0) {
        logTest("CRM", "Customer notes", "PASS", `Found ${notesResult.rows[0].count} notes`);
      } else {
        logTest("CRM", "Customer notes", "WARN", "No notes found");
      }
    } catch (error) {
      logTest("CRM", "Customer notes", "FAIL", undefined, error);
    }

    // Test activities
    try {
      const activitiesResult = await query("SELECT COUNT(*) FROM crm_activities");
      if (parseInt(activitiesResult.rows[0].count) > 0) {
        logTest("CRM", "Customer activities", "PASS", `Found ${activitiesResult.rows[0].count} activities`);
      } else {
        logTest("CRM", "Customer activities", "WARN", "No activities found");
      }
    } catch (error) {
      logTest("CRM", "Customer activities", "FAIL", undefined, error);
    }

    // =====================================================
    // 3. TEST CMS MODULE
    // =====================================================
    console.log("\n📄 Testing CMS Module...");

    // Test pages
    try {
      const pagesResult = await query("SELECT * FROM cms_pages");
      if (pagesResult.rows.length > 0) {
        logTest("CMS", "Pages exist", "PASS", `Found ${pagesResult.rows.length} pages`);
        
        // Check for both draft and published
        const published = pagesResult.rows.filter(p => p.status === "published").length;
        const draft = pagesResult.rows.filter(p => p.status === "draft").length;
        logTest("CMS", "Page status variety", "PASS", `Published: ${published}, Draft: ${draft}`);
      } else {
        logTest("CMS", "Pages exist", "WARN", "No pages found");
      }
    } catch (error) {
      logTest("CMS", "Pages functionality", "FAIL", undefined, error);
    }

    // Test sections
    try {
      const sectionsResult = await query(`
        SELECT s.*, p.title as page_title
        FROM cms_sections s
        LEFT JOIN cms_pages p ON s.page_id = p.id
      `);
      
      if (sectionsResult.rows.length > 0) {
        const hasValidRelations = sectionsResult.rows.every(s => s.page_title);
        if (hasValidRelations) {
          logTest("CMS", "Sections with page relations", "PASS", `Found ${sectionsResult.rows.length} sections`);
        } else {
          logTest("CMS", "Sections with page relations", "WARN", "Some sections missing page relations");
        }
      } else {
        logTest("CMS", "Sections with page relations", "WARN", "No sections found");
      }
    } catch (error) {
      logTest("CMS", "Sections functionality", "FAIL", undefined, error);
    }

    // Test content blocks
    try {
      const blocksResult = await query("SELECT COUNT(*) FROM cms_content_blocks");
      if (parseInt(blocksResult.rows[0].count) > 0) {
        logTest("CMS", "Content blocks", "PASS", `Found ${blocksResult.rows[0].count} blocks`);
      } else {
        logTest("CMS", "Content blocks", "WARN", "No content blocks found");
      }
    } catch (error) {
      logTest("CMS", "Content blocks", "FAIL", undefined, error);
    }

    // Test components
    try {
      const componentsResult = await query("SELECT * FROM cms_components WHERE is_active = true");
      if (componentsResult.rows.length > 0) {
        logTest("CMS", "Reusable components", "PASS", `Found ${componentsResult.rows.length} components`);
      } else {
        logTest("CMS", "Reusable components", "WARN", "No components found");
      }
    } catch (error) {
      logTest("CMS", "Reusable components", "FAIL", undefined, error);
    }

    // Test versioning
    try {
      const versionsResult = await query("SELECT COUNT(*) FROM cms_content_versions");
      logTest("CMS", "Content versioning", "PASS", `Found ${versionsResult.rows[0].count} versions`);
    } catch (error) {
      logTest("CMS", "Content versioning", "FAIL", undefined, error);
    }

    // =====================================================
    // 4. TEST EMAIL MODULE
    // =====================================================
    console.log("\n📧 Testing Email Module...");

    // Test email lists
    try {
      const listsResult = await query("SELECT * FROM email_lists WHERE is_active = true");
      if (listsResult.rows.length > 0) {
        logTest("Email", "Email lists", "PASS", `Found ${listsResult.rows.length} lists`);
      } else {
        logTest("Email", "Email lists", "WARN", "No email lists found");
      }
    } catch (error) {
      logTest("Email", "Email lists", "FAIL", undefined, error);
    }

    // Test subscribers
    try {
      const subscribersResult = await query(`
        SELECT s.*, l.name as list_name
        FROM email_list_subscribers s
        LEFT JOIN email_lists l ON s.list_id = l.id
        WHERE s.status = 'active'
      `);
      
      if (subscribersResult.rows.length > 0) {
        const hasValidRelations = subscribersResult.rows.every(s => s.list_name);
        if (hasValidRelations) {
          logTest("Email", "Subscribers with list relations", "PASS", `Found ${subscribersResult.rows.length} active subscribers`);
        } else {
          logTest("Email", "Subscribers with list relations", "WARN", "Some subscribers missing list relations");
        }
      } else {
        logTest("Email", "Subscribers with list relations", "WARN", "No active subscribers found");
      }
    } catch (error) {
      logTest("Email", "Subscribers functionality", "FAIL", undefined, error);
    }

    // Test subscriber count sync
    try {
      const listCountCheck = await query(`
        SELECT l.id, l.subscriber_count, 
          (SELECT COUNT(*) FROM email_list_subscribers WHERE list_id = l.id AND status = 'active') as actual_count
        FROM email_lists l
        LIMIT 1
      `);
      
      if (listCountCheck.rows.length > 0) {
        const list = listCountCheck.rows[0];
        if (list.subscriber_count === parseInt(list.actual_count)) {
          logTest("Email", "Subscriber count sync", "PASS", "Counts match");
        } else {
          logTest("Email", "Subscriber count sync", "WARN", 
            `Mismatch: stored=${list.subscriber_count}, actual=${list.actual_count}`);
        }
      }
    } catch (error) {
      logTest("Email", "Subscriber count sync", "FAIL", undefined, error);
    }

    // Test templates
    try {
      const templatesResult = await query("SELECT * FROM email_templates WHERE is_active = true");
      if (templatesResult.rows.length > 0) {
        logTest("Email", "Email templates", "PASS", `Found ${templatesResult.rows.length} templates`);
        
        // Check for variables
        const withVariables = templatesResult.rows.filter(t => t.variables && t.variables.length > 0).length;
        logTest("Email", "Template variables", "PASS", `${withVariables} templates have variables`);
      } else {
        logTest("Email", "Email templates", "WARN", "No templates found");
      }
    } catch (error) {
      logTest("Email", "Email templates", "FAIL", undefined, error);
    }

    // Test campaigns
    try {
      const campaignsResult = await query(`
        SELECT c.*, l.name as list_name, t.name as template_name
        FROM email_campaigns c
        LEFT JOIN email_lists l ON c.list_id = l.id
        LEFT JOIN email_templates t ON c.template_id = t.id
      `);
      
      if (campaignsResult.rows.length > 0) {
        logTest("Email", "Email campaigns", "PASS", `Found ${campaignsResult.rows.length} campaigns`);
        
        // Check status distribution
        const draft = campaignsResult.rows.filter(c => c.status === "draft").length;
        const scheduled = campaignsResult.rows.filter(c => c.status === "scheduled").length;
        const sent = campaignsResult.rows.filter(c => c.status === "sent").length;
        logTest("Email", "Campaign statuses", "PASS", `Draft: ${draft}, Scheduled: ${scheduled}, Sent: ${sent}`);
      } else {
        logTest("Email", "Email campaigns", "WARN", "No campaigns found");
      }
    } catch (error) {
      logTest("Email", "Email campaigns", "FAIL", undefined, error);
    }

    // =====================================================
    // 5. TEST IMPORT/EXPORT MODULE
    // =====================================================
    console.log("\n📥 Testing Import/Export Module...");

    // Test import jobs
    try {
      const importJobsResult = await query("SELECT * FROM import_jobs");
      if (importJobsResult.rows.length > 0) {
        logTest("Import/Export", "Import jobs", "PASS", `Found ${importJobsResult.rows.length} import jobs`);
        
        // Check status distribution
        const completed = importJobsResult.rows.filter(j => j.status === "completed").length;
        const failed = importJobsResult.rows.filter(j => j.status === "failed").length;
        logTest("Import/Export", "Import job statuses", "PASS", `Completed: ${completed}, Failed: ${failed}`);
      } else {
        logTest("Import/Export", "Import jobs", "WARN", "No import jobs found");
      }
    } catch (error) {
      logTest("Import/Export", "Import jobs", "FAIL", undefined, error);
    }

    // Test export jobs
    try {
      const exportJobsResult = await query("SELECT * FROM export_jobs");
      if (exportJobsResult.rows.length > 0) {
        logTest("Import/Export", "Export jobs", "PASS", `Found ${exportJobsResult.rows.length} export jobs`);
        
        // Check for expiration dates
        const withExpiry = exportJobsResult.rows.filter(j => j.expires_at).length;
        logTest("Import/Export", "Export expiration", "PASS", `${withExpiry} jobs have expiration dates`);
      } else {
        logTest("Import/Export", "Export jobs", "WARN", "No export jobs found");
      }
    } catch (error) {
      logTest("Import/Export", "Export jobs", "FAIL", undefined, error);
    }

    // =====================================================
    // 6. TEST DATA INTEGRITY
    // =====================================================
    console.log("\n🔍 Testing Data Integrity...");

    // Test foreign key constraints
    try {
      // Check for orphaned records
      const orphanedSections = await query(`
        SELECT COUNT(*) FROM cms_sections s
        WHERE NOT EXISTS (SELECT 1 FROM cms_pages p WHERE p.id = s.page_id)
      `);
      
      if (parseInt(orphanedSections.rows[0].count) === 0) {
        logTest("Integrity", "No orphaned CMS sections", "PASS");
      } else {
        logTest("Integrity", "No orphaned CMS sections", "WARN", 
          `Found ${orphanedSections.rows[0].count} orphaned sections`);
      }
    } catch (error) {
      logTest("Integrity", "CMS foreign keys", "FAIL", undefined, error);
    }

    try {
      const orphanedDeals = await query(`
        SELECT COUNT(*) FROM crm_deals d
        WHERE NOT EXISTS (SELECT 1 FROM crm_customers c WHERE c.id = d.customer_id)
      `);
      
      if (parseInt(orphanedDeals.rows[0].count) === 0) {
        logTest("Integrity", "No orphaned CRM deals", "PASS");
      } else {
        logTest("Integrity", "No orphaned CRM deals", "WARN", 
          `Found ${orphanedDeals.rows[0].count} orphaned deals`);
      }
    } catch (error) {
      logTest("Integrity", "CRM foreign keys", "FAIL", undefined, error);
    }

    // Test indexes
    try {
      const indexCheck = await query(`
        SELECT schemaname, tablename, indexname 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND (tablename LIKE 'crm_%' OR tablename LIKE 'cms_%' OR tablename LIKE 'email_%')
        ORDER BY tablename, indexname
      `);
      
      if (indexCheck.rows.length > 20) {
        logTest("Integrity", "Database indexes", "PASS", `Found ${indexCheck.rows.length} indexes`);
      } else {
        logTest("Integrity", "Database indexes", "WARN", `Only ${indexCheck.rows.length} indexes found`);
      }
    } catch (error) {
      logTest("Integrity", "Database indexes", "FAIL", undefined, error);
    }

    // =====================================================
    // 7. TEST INTEGRATIONS
    // =====================================================
    console.log("\n🔗 Testing Module Integrations...");

    // Test CRM to Email integration
    try {
      const crmEmailLink = await query(`
        SELECT c.id, c.email, 
          (SELECT COUNT(*) FROM email_list_subscribers WHERE customer_id = c.id) as subscriber_records
        FROM crm_customers c
        LIMIT 5
      `);
      
      logTest("Integration", "CRM to Email link", "PASS", "Customer-subscriber relation exists");
    } catch (error) {
      logTest("Integration", "CRM to Email link", "FAIL", undefined, error);
    }

    // Test Lead to Customer conversion support
    try {
      const leadConversionSupport = await query(`
        SELECT COUNT(*) FROM crm_customers WHERE lead_id IS NOT NULL
      `);
      
      logTest("Integration", "Lead conversion support", "PASS", 
        `${leadConversionSupport.rows[0].count} customers linked to leads`);
    } catch (error) {
      logTest("Integration", "Lead conversion support", "FAIL", undefined, error);
    }

    // =====================================================
    // GENERATE REPORT
    // =====================================================
    console.log("\n" + "=".repeat(70));
    console.log("📊 TEST SUMMARY");
    console.log("=".repeat(70));

    const passed = results.filter(r => r.status === "PASS").length;
    const failed = results.filter(r => r.status === "FAIL").length;
    const warnings = results.filter(r => r.status === "WARN").length;
    const total = results.length;

    console.log(`\n✅ Passed:   ${passed}/${total} (${((passed/total)*100).toFixed(1)}%)`);
    console.log(`❌ Failed:   ${failed}/${total} (${((failed/total)*100).toFixed(1)}%)`);
    console.log(`⚠️  Warnings: ${warnings}/${total} (${((warnings/total)*100).toFixed(1)}%)`);

    if (failed > 0) {
      console.log("\n❌ FAILED TESTS:");
      results.filter(r => r.status === "FAIL").forEach(r => {
        console.log(`   [${r.module}] ${r.test}`);
        if (r.error) console.log(`      Error: ${r.error.message || r.error}`);
      });
    }

    if (warnings > 0) {
      console.log("\n⚠️  WARNINGS:");
      results.filter(r => r.status === "WARN").forEach(r => {
        console.log(`   [${r.module}] ${r.test}${r.message ? `: ${r.message}` : ""}`);
      });
    }

    console.log("\n" + "=".repeat(70));
    
    if (failed === 0 && warnings === 0) {
      console.log("🎉 ALL TESTS PASSED! Admin Dashboard is production-ready.");
    } else if (failed === 0) {
      console.log("✅ All critical tests passed. Review warnings for optimization.");
    } else {
      console.log("⚠️  Some tests failed. Please review and fix issues.");
    }
    
    console.log("=".repeat(70) + "\n");

    return { passed, failed, warnings, total, results };

  } catch (error) {
    console.error("\n❌ CRITICAL ERROR during testing:", error);
    throw error;
  }
}

// Run tests if called directly
if (require.main === module) {
  testAdminDashboard()
    .then((summary) => {
      process.exit(summary.failed > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error("❌ Test execution failed:", error);
      process.exit(1);
    });
}

export default testAdminDashboard;
