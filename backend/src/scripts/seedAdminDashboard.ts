import { query } from "../config/database";
import bcrypt from "bcrypt";

/**
 * Comprehensive Admin Dashboard Seed Script
 * Populates CRM, CMS, Email, Import/Export, and Security modules with test data
 * All data is safe to edit and delete
 */

async function seedAdminDashboard() {
  console.log("🌱 Starting Admin Dashboard seed process...");

  try {
    // =====================================================
    // 1. SEED SECURITY & USERS
    // =====================================================
    console.log("\n📋 Seeding Security & Users...");
    
    // Create test users with different roles
    const hashedPassword = await bcrypt.hash("Test123!", 10);
    
    const adminUser = await query(
      `INSERT INTO users (email, password, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET first_name = EXCLUDED.first_name
       RETURNING id`,
      ["admin@test.com", hashedPassword, "Admin", "User", "admin"]
    );

    const editorUser = await query(
      `INSERT INTO users (email, password, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET first_name = EXCLUDED.first_name
       RETURNING id`,
      ["editor@test.com", hashedPassword, "Editor", "User", "user"]
    );

    const salesUser = await query(
      `INSERT INTO users (email, password, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET first_name = EXCLUDED.first_name
       RETURNING id`,
      ["sales@test.com", hashedPassword, "Sales", "User", "user"]
    );

    const adminUserId = adminUser.rows[0].id;
    const editorUserId = editorUser.rows[0].id;
    const salesUserId = salesUser.rows[0].id;

    // Assign roles
    const roles = await query("SELECT id, name FROM user_roles");
    const roleMap: any = {};
    roles.rows.forEach((r: any) => {
      roleMap[r.name] = r.id;
    });

    await query(
      `INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [adminUserId, roleMap.admin, adminUserId]
    );

    await query(
      `INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [editorUserId, roleMap.editor, adminUserId]
    );

    await query(
      `INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [salesUserId, roleMap.sales, adminUserId]
    );

    console.log("✅ Created 3 test users (admin@test.com, editor@test.com, sales@test.com)");
    console.log("   Password for all: Test123!");

    // =====================================================
    // 2. SEED CRM DATA
    // =====================================================
    console.log("\n📋 Seeding CRM Data...");

    // Get pipeline stages
    const stages = await query("SELECT id, slug FROM crm_pipeline_stages ORDER BY \"order\"");
    const stageIds = stages.rows.map((s: any) => s.id);

    // Create customers
    const customers = [
      { first_name: "John", last_name: "Smith", email: "john.smith@example.com", company: "Tech Corp", status: "new", source: "website", phone: "+1-555-0101" },
      { first_name: "Sarah", last_name: "Johnson", email: "sarah.j@example.com", company: "Design Studio", status: "contacted", source: "referral", phone: "+1-555-0102" },
      { first_name: "Michael", last_name: "Brown", email: "m.brown@example.com", company: "Marketing Inc", status: "qualified", source: "linkedin", phone: "+1-555-0103" },
      { first_name: "Emily", last_name: "Davis", email: "emily.davis@example.com", company: "Startup Labs", status: "converted", source: "email_campaign", phone: "+1-555-0104" },
      { first_name: "David", last_name: "Wilson", email: "d.wilson@example.com", company: "Enterprise Co", status: "new", source: "cold_call", phone: "+1-555-0105" },
      { first_name: "Lisa", last_name: "Anderson", email: "lisa.a@example.com", company: "Consulting Group", status: "contacted", source: "website", phone: "+1-555-0106" },
      { first_name: "James", last_name: "Taylor", email: "james.t@example.com", company: "Software Solutions", status: "qualified", source: "referral", phone: "+1-555-0107" },
      { first_name: "Jennifer", last_name: "Martinez", email: "j.martinez@example.com", company: "Digital Agency", status: "new", source: "social_media", phone: "+1-555-0108" },
    ];

    const customerIds: string[] = [];
    for (const customer of customers) {
      const result = await query(
        `INSERT INTO crm_customers (first_name, last_name, email, phone, company, status, source, assigned_to, tags)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id`,
        [customer.first_name, customer.last_name, customer.email, customer.phone, customer.company, customer.status, customer.source, salesUserId, ["test-data", "seed"]]
      );
      customerIds.push(result.rows[0].id);
    }

    console.log(`✅ Created ${customerIds.length} test customers`);

    // Create notes for customers
    for (let i = 0; i < customerIds.length; i++) {
      const customerId = customerIds[i];
      await query(
        `INSERT INTO crm_customer_notes (customer_id, user_id, note, is_private)
         VALUES ($1, $2, $3, $4)`,
        [customerId, salesUserId, `Initial contact made with ${customers[i].first_name}. Very interested in our services.`, false]
      );
      
      if (i % 2 === 0) {
        await query(
          `INSERT INTO crm_customer_notes (customer_id, user_id, note, is_private)
           VALUES ($1, $2, $3, $4)`,
          [customerId, salesUserId, "Follow-up scheduled for next week.", false]
        );
      }
    }

    console.log("✅ Created customer notes");

    // Create activities
    const activityTypes = ["email_sent", "call_made", "meeting_scheduled", "proposal_sent", "contract_signed"];
    for (let i = 0; i < customerIds.length; i++) {
      const customerId = customerIds[i];
      const activityType = activityTypes[i % activityTypes.length];
      
      await query(
        `INSERT INTO crm_activities (customer_id, user_id, activity_type, title, description)
         VALUES ($1, $2, $3, $4, $5)`,
        [customerId, salesUserId, activityType, `${activityType.replace(/_/g, " ").toUpperCase()}`, `Activity logged for ${customers[i].first_name} ${customers[i].last_name}`]
      );
    }

    console.log("✅ Created customer activities");

    // Create deals
    const dealTitles = [
      "Website Redesign Project",
      "Marketing Campaign Q1",
      "Software License Renewal",
      "Consulting Services Package",
      "Enterprise Support Contract",
      "Digital Transformation Initiative",
      "Cloud Migration Project",
      "Custom Development Work"
    ];

    for (let i = 0; i < customerIds.length; i++) {
      const customerId = customerIds[i];
      const stageId = stageIds[i % stageIds.length];
      const value = (i + 1) * 5000 + Math.random() * 10000;
      const probability = 30 + (i * 10) % 70;
      
      await query(
        `INSERT INTO crm_deals (customer_id, stage_id, title, value, probability, assigned_to, status, expected_close_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE + INTERVAL '30 days')`,
        [customerId, stageId, dealTitles[i], value.toFixed(2), probability, salesUserId, "open"]
      );
    }

    console.log("✅ Created deals");

    // =====================================================
    // 3. SEED CMS DATA
    // =====================================================
    console.log("\n📋 Seeding CMS Data...");

    // Create pages
    const pages = [
      { slug: "test-homepage", title: "Test Homepage", status: "published", template: "default" },
      { slug: "test-about", title: "Test About Us", status: "published", template: "default" },
      { slug: "test-services", title: "Test Services", status: "draft", template: "services" },
      { slug: "test-contact", title: "Test Contact", status: "published", template: "contact" },
      { slug: "test-blog", title: "Test Blog", status: "draft", template: "blog" },
    ];

    const pageIds: string[] = [];
    for (const page of pages) {
      const result = await query(
        `INSERT INTO cms_pages (slug, title, meta_title, meta_description, status, template, created_by, updated_by, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $7, $8)
         RETURNING id`,
        [
          page.slug,
          page.title,
          `${page.title} - Test Site`,
          `This is a test page for ${page.title}`,
          page.status,
          page.template,
          editorUserId,
          page.status === "published" ? new Date() : null
        ]
      );
      pageIds.push(result.rows[0].id);
    }

    console.log(`✅ Created ${pageIds.length} test pages`);

    // Create sections for pages
    for (let i = 0; i < pageIds.length; i++) {
      const pageId = pageIds[i];
      
      // Hero section
      const heroSection = await query(
        `INSERT INTO cms_sections (page_id, name, section_type, content, "order", is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          pageId,
          "Hero Section",
          "hero",
          JSON.stringify({ title: `Welcome to ${pages[i].title}`, subtitle: "This is a test section", backgroundImage: "/images/hero-bg.jpg" }),
          0,
          true
        ]
      );

      // Content section
      await query(
        `INSERT INTO cms_sections (page_id, name, section_type, content, "order", is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          pageId,
          "Main Content",
          "content",
          JSON.stringify({ html: `<h2>About ${pages[i].title}</h2><p>This is test content for the page.</p>` }),
          1,
          true
        ]
      );

      // Create content blocks for hero section
      await query(
        `INSERT INTO cms_content_blocks (section_id, block_type, content, "order", is_active)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          heroSection.rows[0].id,
          "text",
          JSON.stringify({ text: "Featured content block", style: "bold" }),
          0,
          true
        ]
      );
    }

    console.log("✅ Created sections and content blocks");

    // Create reusable components
    const components = [
      { name: "Test Header", slug: "test-header", type: "header", content: { logo: "/logo.png", navigation: ["Home", "About", "Services"] } },
      { name: "Test Footer", slug: "test-footer", type: "footer", content: { copyright: "© 2024 Test Site", links: ["Privacy", "Terms"] } },
      { name: "Test CTA Button", slug: "test-cta", type: "button", content: { text: "Get Started", url: "/contact", style: "primary" } },
    ];

    for (const component of components) {
      await query(
        `INSERT INTO cms_components (name, slug, component_type, content, is_active, created_by, updated_by)
         VALUES ($1, $2, $3, $4, $5, $6, $6)`,
        [component.name, component.slug, component.type, JSON.stringify(component.content), true, editorUserId]
      );
    }

    console.log("✅ Created reusable components");

    // =====================================================
    // 4. SEED EMAIL DATA
    // =====================================================
    console.log("\n📋 Seeding Email Data...");

    // Create email lists
    const lists = [
      { name: "Test Newsletter Subscribers", description: "Main newsletter list for testing", type: "manual" },
      { name: "Test VIP Customers", description: "High-value customers for testing", type: "crm_segment" },
      { name: "Test Product Updates", description: "Product announcement list for testing", type: "manual" },
    ];

    const listIds: string[] = [];
    for (const list of lists) {
      const result = await query(
        `INSERT INTO email_lists (name, description, type, is_active, created_by)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [list.name, list.description, list.type, true, adminUserId]
      );
      listIds.push(result.rows[0].id);
    }

    console.log(`✅ Created ${listIds.length} email lists`);

    // Add subscribers to lists
    const testEmails = [
      { email: "subscriber1@test.com", first_name: "Alice", last_name: "Cooper" },
      { email: "subscriber2@test.com", first_name: "Bob", last_name: "Dylan" },
      { email: "subscriber3@test.com", first_name: "Charlie", last_name: "Parker" },
      { email: "subscriber4@test.com", first_name: "Diana", last_name: "Ross" },
      { email: "subscriber5@test.com", first_name: "Elvis", last_name: "Presley" },
      { email: "subscriber6@test.com", first_name: "Freddie", last_name: "Mercury" },
      { email: "subscriber7@test.com", first_name: "Grace", last_name: "Jones" },
      { email: "subscriber8@test.com", first_name: "Harry", last_name: "Styles" },
    ];

    for (const listId of listIds) {
      for (const sub of testEmails) {
        await query(
          `INSERT INTO email_list_subscribers (list_id, email, first_name, last_name, status)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (list_id, email) DO NOTHING`,
          [listId, sub.email, sub.first_name, sub.last_name, "active"]
        );
      }
      
      // Update subscriber count
      await query(
        `UPDATE email_lists SET subscriber_count = (
          SELECT COUNT(*) FROM email_list_subscribers WHERE list_id = $1 AND status = 'active'
        ) WHERE id = $1`,
        [listId]
      );
    }

    console.log("✅ Added subscribers to lists");

    // Create email templates
    const templates = [
      {
        name: "Test Welcome Email",
        subject: "Welcome to Our Test Platform!",
        category: "welcome",
        html: "<h1>Welcome {{first_name}}!</h1><p>Thank you for joining us.</p>",
        text: "Welcome {{first_name}}! Thank you for joining us.",
        variables: ["first_name", "last_name"]
      },
      {
        name: "Test Newsletter Template",
        subject: "Your Monthly Test Newsletter",
        category: "newsletter",
        html: "<h1>Newsletter for {{first_name}}</h1><p>Here are the latest updates...</p>",
        text: "Newsletter for {{first_name}}. Here are the latest updates...",
        variables: ["first_name"]
      },
      {
        name: "Test Promotion Email",
        subject: "Special Test Offer Inside!",
        category: "promotion",
        html: "<h1>Hi {{first_name}}!</h1><p>Check out our special offer...</p>",
        text: "Hi {{first_name}}! Check out our special offer...",
        variables: ["first_name", "offer_code"]
      },
    ];

    const templateIds: string[] = [];
    for (const template of templates) {
      const result = await query(
        `INSERT INTO email_templates (name, subject, html_content, text_content, variables, category, is_active, created_by, updated_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8)
         RETURNING id`,
        [template.name, template.subject, template.html, template.text, template.variables, template.category, true, adminUserId]
      );
      templateIds.push(result.rows[0].id);
    }

    console.log(`✅ Created ${templateIds.length} email templates`);

    // Create email campaigns (draft only - no actual sending)
    const campaigns = [
      { name: "Test Welcome Campaign", subject: "Welcome to Test Platform", status: "draft" },
      { name: "Test Monthly Newsletter", subject: "Test Newsletter - January 2024", status: "draft" },
      { name: "Test Product Launch", subject: "New Test Product Available", status: "scheduled" },
    ];

    for (let i = 0; i < campaigns.length; i++) {
      const campaign = campaigns[i];
      const listId = listIds[i % listIds.length];
      const templateId = templateIds[i % templateIds.length];
      
      const subscriberCount = await query(
        "SELECT COUNT(*) FROM email_list_subscribers WHERE list_id = $1 AND status = 'active'",
        [listId]
      );

      await query(
        `INSERT INTO email_campaigns (name, subject, template_id, list_id, html_content, text_content, status, total_recipients, created_by, scheduled_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          campaign.name,
          campaign.subject,
          templateId,
          listId,
          `<h1>${campaign.subject}</h1><p>This is test campaign content.</p>`,
          `${campaign.subject}. This is test campaign content.`,
          campaign.status,
          parseInt(subscriberCount.rows[0].count),
          adminUserId,
          campaign.status === "scheduled" ? new Date(Date.now() + 86400000) : null
        ]
      );
    }

    console.log("✅ Created email campaigns (draft/scheduled only)");

    // =====================================================
    // 5. SEED IMPORT/EXPORT DATA
    // =====================================================
    console.log("\n📋 Seeding Import/Export Data...");

    // Create import jobs
    const importJobs = [
      { type: "crm_customers", file_name: "test_customers_import.csv", status: "completed", total: 50, success: 48, errors: 2 },
      { type: "email_subscribers", file_name: "test_subscribers_import.csv", status: "completed", total: 100, success: 100, errors: 0 },
      { type: "crm_customers", file_name: "test_customers_batch2.csv", status: "failed", total: 25, success: 0, errors: 25 },
    ];

    for (const job of importJobs) {
      await query(
        `INSERT INTO import_jobs (type, file_name, status, total_rows, processed_rows, success_count, error_count, errors, created_by, started_at, completed_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          job.type,
          job.file_name,
          job.status,
          job.total,
          job.total,
          job.success,
          job.errors,
          job.errors > 0 ? JSON.stringify([{ row: 1, error: "Invalid email format" }, { row: 15, error: "Missing required field" }]) : JSON.stringify([]),
          adminUserId,
          new Date(Date.now() - 3600000),
          job.status !== "pending" ? new Date() : null
        ]
      );
    }

    console.log("✅ Created import job history");

    // Create export jobs
    const exportJobs = [
      { type: "crm_customers", status: "completed", rows: 150 },
      { type: "email_subscribers", status: "completed", rows: 250 },
      { type: "crm_deals", status: "completed", rows: 75 },
    ];

    for (const job of exportJobs) {
      await query(
        `INSERT INTO export_jobs (type, filters, status, file_path, file_size, row_count, created_by, started_at, completed_at, expires_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          job.type,
          JSON.stringify({ date_range: "last_30_days" }),
          job.status,
          `/exports/${job.type}_${Date.now()}.csv`,
          Math.floor(Math.random() * 500000) + 10000,
          job.rows,
          adminUserId,
          new Date(Date.now() - 1800000),
          new Date(),
          new Date(Date.now() + 604800000) // 7 days
        ]
      );
    }

    console.log("✅ Created export job history");

    // =====================================================
    // 6. CREATE AUDIT LOGS
    // =====================================================
    console.log("\n📋 Creating audit logs...");

    const auditActions = [
      { action: "create", entity_type: "crm_customer", entity_id: customerIds[0] },
      { action: "update", entity_type: "cms_page", entity_id: pageIds[0] },
      { action: "delete", entity_type: "email_template", entity_id: templateIds[0] },
      { action: "create", entity_type: "email_campaign", entity_id: null },
    ];

    for (const audit of auditActions) {
      await query(
        `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          adminUserId,
          audit.action,
          audit.entity_type,
          audit.entity_id,
          audit.action === "delete" ? JSON.stringify({ deleted: true }) : null,
          audit.action !== "delete" ? JSON.stringify({ created: true }) : null,
          "127.0.0.1",
          "Test Seed Script"
        ]
      );
    }

    console.log("✅ Created audit logs");

    // =====================================================
    // SUMMARY
    // =====================================================
    console.log("\n" + "=".repeat(60));
    console.log("✅ ADMIN DASHBOARD SEED COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`   👥 Users: 3 (admin, editor, sales)`);
    console.log(`   🏢 CRM Customers: ${customerIds.length}`);
    console.log(`   💼 CRM Deals: ${customerIds.length}`);
    console.log(`   📝 CRM Notes: ${customerIds.length * 1.5} (approx)`);
    console.log(`   📄 CMS Pages: ${pageIds.length}`);
    console.log(`   🧩 CMS Components: 3`);
    console.log(`   📧 Email Lists: ${listIds.length}`);
    console.log(`   👤 Email Subscribers: ${testEmails.length * listIds.length}`);
    console.log(`   📨 Email Templates: ${templateIds.length}`);
    console.log(`   📮 Email Campaigns: 3 (draft/scheduled)`);
    console.log(`   📥 Import Jobs: 3`);
    console.log(`   📤 Export Jobs: 3`);
    console.log(`   📋 Audit Logs: 4+`);
    console.log("\n🔑 Test Credentials:");
    console.log("   Admin: admin@test.com / Test123!");
    console.log("   Editor: editor@test.com / Test123!");
    console.log("   Sales: sales@test.com / Test123!");
    console.log("\n⚠️  All data is tagged as 'test-data' and safe to delete");
    console.log("=".repeat(60) + "\n");

  } catch (error) {
    console.error("❌ Error seeding admin dashboard:", error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedAdminDashboard()
    .then(() => {
      console.log("✅ Seed completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seed failed:", error);
      process.exit(1);
    });
}

export default seedAdminDashboard;
