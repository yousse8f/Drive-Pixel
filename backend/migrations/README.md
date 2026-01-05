# Database Migration Guide

## تشغيل Migration للـ Newsletter و Contact Tables

### الخطوة 1: الاتصال بقاعدة البيانات

```bash
# استخدم psql أو أي أداة PostgreSQL
psql -U your_username -d your_database_name
```

### الخطوة 2: تنفيذ Migration Script

```bash
psql -U your_username -d your_database_name -f backend/migrations/create_newsletter_contact_tables.sql
```

أو من داخل psql:

```sql
\i backend/migrations/create_newsletter_contact_tables.sql
```

### الخطوة 3: التحقق من إنشاء الجداول

```sql
-- التحقق من جدول newsletter_subscribers
SELECT * FROM newsletter_subscribers LIMIT 5;

-- التحقق من جدول contact_messages
SELECT * FROM contact_messages LIMIT 5;

-- عرض هيكل الجداول
\d newsletter_subscribers
\d contact_messages
```

## الجداول المنشأة

### 1. newsletter_subscribers
- `id`: معرف فريد (SERIAL PRIMARY KEY)
- `email`: البريد الإلكتروني (UNIQUE)
- `source`: مصدر الاشتراك (مثل: blog-page)
- `created_at`: تاريخ الإنشاء

### 2. contact_messages
- `id`: معرف فريد (SERIAL PRIMARY KEY)
- `full_name`: الاسم الكامل
- `email`: البريد الإلكتروني
- `service`: الخدمة المطلوبة
- `message`: نص الرسالة
- `status`: حالة الرسالة (unread, read, replied, archived)
- `created_at`: تاريخ الإنشاء

## ملاحظات مهمة

- جميع الجداول تحتوي على indexes للأداء الأفضل
- البريد الإلكتروني يتم التحقق منه باستخدام regex constraint
- جدول chat_sessions و chat_messages موجود بالفعل في الباك إند
