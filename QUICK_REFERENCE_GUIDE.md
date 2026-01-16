# دليل مرجعي سريع - Quick Reference Guide

## 🚀 الوصول السريع - Quick Access

### لوحات التحكم - Dashboards
- **لوحة التحكم الرئيسية**: `/admin`
- **لوحة CRM**: `/admin/crm`
- **لوحة CMS**: `/admin/cms`

### إدارة العملاء - Customer Management
- **قائمة العملاء**: `/admin/crm`
- **إضافة عميل جديد**: `/admin/crm/customers/new`
- **تفاصيل العميل**: `/admin/crm/customers/{id}`

### إدارة المحتوى - Content Management
- **قائمة الصفحات**: `/admin/cms` (تبويب Pages)
- **إنشاء صفحة جديدة**: `/admin/cms/pages/new`
- **تحرير صفحة**: `/admin/cms/pages/{id}`
- **قائمة المكونات**: `/admin/cms` (تبويب Components)
- **إنشاء مكون جديد**: `/admin/cms/components/new`

---

## 📡 نقاط النهاية API - API Endpoints

### CRM APIs
```
GET    /api/admin/crm/stats                    # إحصائيات CRM
GET    /api/admin/crm/customers                # قائمة العملاء
GET    /api/admin/crm/customers/:id            # تفاصيل عميل
POST   /api/admin/crm/customers                # إنشاء عميل
PUT    /api/admin/crm/customers/:id            # تحديث عميل
DELETE /api/admin/crm/customers/:id            # حذف عميل
POST   /api/admin/crm/notes                    # إضافة ملاحظة
GET    /api/admin/crm/activities               # الأنشطة
POST   /api/admin/crm/deals                    # إنشاء صفقة
GET    /api/admin/crm/pipeline/stages          # مراحل المبيعات
```

### CMS APIs
```
GET    /api/admin/cms/pages                    # قائمة الصفحات
GET    /api/admin/cms/pages/:id                # تفاصيل صفحة
POST   /api/admin/cms/pages                    # إنشاء صفحة
PUT    /api/admin/cms/pages/:id                # تحديث صفحة
DELETE /api/admin/cms/pages/:id                # حذف صفحة
GET    /api/admin/cms/sections                 # الأقسام
POST   /api/admin/cms/sections                 # إنشاء قسم
GET    /api/admin/cms/components               # المكونات
POST   /api/admin/cms/components               # إنشاء مكون
GET    /api/admin/cms/versions                 # الإصدارات
```

---

## 🎨 الألوان المستخدمة - Color Scheme

```css
/* الألوان الأساسية */
--primary: #10b981        /* أخضر */
--primary-dark: #059669   /* أخضر داكن */
--background: #f9fafb     /* رمادي فاتح */
--text: #111827           /* رمادي داكن */

/* ألوان الحالة */
--success: #10b981        /* نجاح */
--warning: #f59e0b        /* تحذير */
--error: #ef4444          /* خطأ */
--info: #3b82f6           /* معلومات */
```

---

## 📋 حالات العملاء - Customer Statuses

| الحالة | اللون | الوصف |
|--------|-------|--------|
| `new` | رمادي | عميل جديد |
| `contacted` | أزرق | تم التواصل |
| `qualified` | أخضر | مؤهل |
| `converted` | بنفسجي | تم التحويل |
| `archived` | أحمر | مؤرشف |

---

## 📄 حالات الصفحات - Page Statuses

| الحالة | اللون | الوصف |
|--------|-------|--------|
| `draft` | أصفر | مسودة |
| `published` | أخضر | منشور |
| `archived` | رمادي | مؤرشف |

---

## 🔧 الأوامر المفيدة - Useful Commands

### تشغيل الخادم الخلفي - Start Backend
```bash
cd backend
npm install
npm run dev
```

### تشغيل الواجهة الأمامية - Start Frontend
```bash
npm install
npm run dev
```

### اختبار APIs
```bash
# الحصول على رمز المصادقة
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@drivepixel.com","password":"your_password"}'

# اختبار CRM
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/crm/stats

# اختبار CMS
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/cms/pages
```

---

## 🗂️ هيكل الملفات - File Structure

```
DRIVE PIXEL/
├── app/
│   └── admin/
│       ├── crm/
│       │   ├── page.tsx                    # لوحة CRM
│       │   └── customers/
│       │       ├── [id]/page.tsx           # تفاصيل العميل
│       │       └── new/page.tsx            # عميل جديد
│       ├── cms/
│       │   ├── page.tsx                    # لوحة CMS
│       │   ├── pages/
│       │   │   ├── [id]/page.tsx           # محرر الصفحة
│       │   │   └── new/page.tsx            # صفحة جديدة
│       │   └── components/
│       │       ├── [id]/page.tsx           # محرر المكون
│       │       └── new/page.tsx            # مكون جديد
│       ├── layout.tsx                      # تخطيط الإدارة
│       └── page.tsx                        # لوحة التحكم الرئيسية
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── crmController.ts            # منطق CRM
│       │   └── cmsController.ts            # منطق CMS
│       ├── routes/
│       │   ├── crmRoutes.ts                # مسارات CRM
│       │   └── cmsRoutes.ts                # مسارات CMS
│       └── server.ts                       # الخادم الرئيسي
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
└── lib/
    └── api-client.ts                       # عميل API
```

---

## 🔐 المصادقة - Authentication

### تسجيل الدخول
```typescript
import { apiClient } from '@/lib/api-client';

const login = async () => {
  const response = await apiClient.login(email, password);
  if (response.success) {
    // تم تخزين الرمز تلقائياً
    router.push('/admin');
  }
};
```

### استخدام API
```typescript
// يتم إضافة الرمز تلقائياً
const response = await apiClient.request('/admin/crm/customers', {
  method: 'GET',
  params: { limit: 10 }
});
```

---

## 📊 أمثلة الاستخدام - Usage Examples

### إنشاء عميل جديد
```typescript
const createCustomer = async () => {
  const response = await apiClient.request('/admin/crm/customers', {
    method: 'POST',
    body: JSON.stringify({
      first_name: 'أحمد',
      last_name: 'محمد',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      company: 'شركة مثال',
      status: 'new'
    })
  });
};
```

### إنشاء صفحة جديدة
```typescript
const createPage = async () => {
  const response = await apiClient.request('/admin/cms/pages', {
    method: 'POST',
    body: JSON.stringify({
      slug: 'about-us',
      title: 'من نحن',
      meta_title: 'من نحن - Drive Pixel',
      meta_description: 'تعرف على Drive Pixel',
      status: 'draft',
      template: 'default'
    })
  });
};
```

### إضافة ملاحظة لعميل
```typescript
const addNote = async (customerId: string) => {
  const response = await apiClient.request('/admin/crm/notes', {
    method: 'POST',
    body: JSON.stringify({
      customer_id: customerId,
      note: 'تم التواصل مع العميل بنجاح',
      is_private: false
    })
  });
};
```

---

## 🐛 استكشاف الأخطاء - Troubleshooting

### المشكلة: 401 Unauthorized
**الحل**: انتهت صلاحية الرمز. سجل الدخول مرة أخرى.

### المشكلة: 404 Not Found
**الحل**: تحقق من المسار والمعرف في قاعدة البيانات.

### المشكلة: 500 Internal Server Error
**الحل**: تحقق من سجلات الخادم الخلفي للحصول على تفاصيل الخطأ.

### المشكلة: البيانات لا تظهر
**الحل**: 
1. تحقق من اتصال قاعدة البيانات
2. تحقق من تشغيل الخادم الخلفي
3. افتح أدوات المطور وتحقق من Network tab

---

## 📚 الوثائق الإضافية - Additional Documentation

- `CRM_CMS_VERIFICATION_REPORT.md` - تقرير التحقق الشامل
- `TEST_API_CONNECTIONS.md` - دليل اختبار API
- `IMPLEMENTATION_SUMMARY.md` - ملخص التنفيذ

---

## ✅ قائمة التحقق السريعة - Quick Checklist

قبل البدء:
- [ ] الخادم الخلفي يعمل على المنفذ 5000
- [ ] الواجهة الأمامية تعمل على المنفذ 3000
- [ ] قاعدة البيانات متصلة ومهيأة
- [ ] لديك حساب مسؤول للدخول

للتحقق من عمل النظام:
- [ ] يمكنك تسجيل الدخول إلى `/admin/login`
- [ ] لوحة CRM تعرض الإحصائيات
- [ ] يمكنك إنشاء عميل جديد
- [ ] لوحة CMS تعرض الصفحات
- [ ] يمكنك إنشاء صفحة جديدة

---

**آخر تحديث**: ${new Date().toLocaleString()}
**الحالة**: جميع الأنظمة تعمل ✅
