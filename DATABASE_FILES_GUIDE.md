# 🗄️ ملفات الداتا الموجودة في مشروع DrivePixel

## 📋 قائمة ملفات الداتا والميجرشن

### 🎯 الملف الرئيسي (الأهم)
**`backend/drivepixel.sql`** - 319 سطر
- **الوصف:** قاعدة البيانات الكاملة والموحدة للمشروع
- **المحتوى:** جميع الجداول الأساسية + بيانات أولية
- **الأهمية:** ⭐⭐⭐⭐⭐ (ملف واحد يحتوي كل شيء)

---

### 📂 مجلد الميجرشن الرئيسي
**`backend/src/config/migrations/`**

#### 1️⃣ `001_crm_cms_email.sql` - 17,295 سطر
- **الوصف:** نظام CRM/CMS/Email Broadcasting كامل
- **المحتوى:**
  - CMS Tables (pages, sections, content blocks)
  - CRM Tables (customers, deals, activities)
  - Email Tables (lists, templates, campaigns)
  - Import/Export Tables
  - Analytics Tables
  - Audit Logs
- **الأهمية:** ⭐⭐⭐⭐

#### 2️⃣ `002_site_content.sql` - 6,990 سطر
- **الوصف:** إدارة محتوى الموقع الحالي
- **المحتوى:**
  - site_pages (Blog, Real Estate, Services)
  - site_page_content (محتوى الصفحات)
  - Indexes و Triggers
- **الأهمية:** ⭐⭐⭐

---

### 📂 مجلد الميجرشن الإضافي
**`backend/migrations/`**

#### 3️⃣ `create_newsletter_contact_tables.sql` - 1,614 سطر
- **الوصف:** جداول Newsletter و Contact Forms
- **المحتوى:**
  - newsletter_subscribers
  - contact_messages
  - Indexes و Constraints
- **الأهمية:** ⭐⭐

#### 4️⃣ `README.md` - 1,830 بايت
- **الوصف:** دليل تشغيل الميجرشن
- **الأهمية:** ⭐ (معلومات فقط)

---

## 🚀 خطوات التهيئة على السيرفر

### الطريقة 1: (موصى بها) استخدام الملف الموحد
```bash
# 1. الاتصال بقاعدة البيانات
psql -U username -d database_name -h host

# 2. تشغيل الملف الرئيسي (يحتوي كل شيء)
\i backend/drivepixel.sql
```

### الطريقة 2: تشغيل الميجرشن بالترتيب
```bash
# 1. الملف الأساسي
\i backend/drivepixel.sql

# 2. نظام CRM/CMS/Email
\i backend/src/config/migrations/001_crm_cms_email.sql

# 3. إدارة محتوى الموقع
\i backend/src/config/migrations/002_site_content.sql

# 4. Newsletter و Contact
\i backend/migrations/create_newsletter_contact_tables.sql
```

---

## 📊 ملخص الجداول المنشأة

### 🏢 الجداول الأساسية (drivepixel.sql)
- `users` - مستخدمي النظام
- `services` - خدمات الشركة
- `portfolio` - معارف الأعمال
- `blog_posts` - مقالات المدونة
- `testimonials` - آراء العملاء
- `hero_texts` - نصوص الرئيسية
- `settings` - إعدادات النظام
- `chat_sessions` - جلوسات الدردشة
- `chat_messages` - رسائل الدردشة
- `orders` - الطلبات
- `products` - المنتجات
- `leads` - العملاء المحتملين

### 📈 جداول CRM/CMS/Email (001_crm_cms_email.sql)
- `cms_pages`, `cms_sections`, `cms_content_blocks`
- `crm_customers`, `crm_deals`, `crm_activities`
- `email_lists`, `email_templates`, `email_campaigns`
- `import_jobs`, `export_jobs`
- `audit_logs`

### 🌐 جداول المحتوى (002_site_content.sql)
- `site_pages` - صفحات الموقع
- `site_page_content` - محتوى الصفحات

### 📧 جداول Newsletter/Contact (create_newsletter_contact_tables.sql)
- `newsletter_subscribers` - مشتركي النشرة البريدية
- `contact_messages` - رسائل التواصل

---

## ⚡ التوصيات

### ✅ للسيرفر الجديد:
استخدم **الملف الموحد** `drivepixel.sql` فقط - يكفي لكل شيء!

### ✅ للتحديثات المستقبلية:
استخدم الميجرشن الفردية حسب الحاجة.

### ✅ للنسخ الاحتياطي:
- احتفظ بنسخة من `drivepixel.sql`
- احتفظ بملف الـ README للمعلومات

---

## 🔗 روابط سريعة

- **الملف الرئيسي:** `backend/drivepixel.sql`
- **دليل التشغيل:** `backend/migrations/README.md`
- **نظام CRM/CMS:** `backend/src/config/migrations/001_crm_cms_email.sql`

**ملاحظة:** الملف الرئيسي `drivepixel.sql` يحتوي على كل الجداول والبيانات اللازمة لتشغيل الموقع بالكامل! 🎯
