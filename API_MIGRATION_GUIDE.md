# 📋 دليل نقل API Endpoints إلى الباك إند

## ✅ ملخص التغييرات

تم نقل جميع API endpoints من Next.js إلى الباك إند (Express.js + PostgreSQL) لتحسين الأداء والأمان وإدارة البيانات بشكل مركزي.

---

## 🔄 الـ Endpoints المنقولة

### 1️⃣ Newsletter API
- **المسار**: `/api/newsletter`
- **الملفات الجديدة**:
  - `backend/src/controllers/newsletterController.ts`
  - `backend/src/routes/newsletterRoutes.ts`
- **Endpoints**:
  - `GET /api/newsletter` - جلب جميع المشتركين
  - `POST /api/newsletter` - إضافة مشترك جديد
  - `DELETE /api/newsletter?id=xxx` - حذف مشترك

### 2️⃣ Contact API
- **المسار**: `/api/contact`
- **الملفات الجديدة**:
  - `backend/src/controllers/contactController.ts`
  - `backend/src/routes/contactRoutes.ts`
- **Endpoints**:
  - `GET /api/contact` - جلب جميع الرسائل
  - `POST /api/contact` - إرسال رسالة جديدة
  - `DELETE /api/contact?id=xxx` - حذف رسالة
  - `PATCH /api/contact` - تحديث حالة الرسالة

### 3️⃣ Chat API
- **المسار**: `/api/chat/message`
- **الملف الموجود**: `backend/src/controllers/chatController.ts`
- **Endpoint**:
  - `POST /api/chat/message` - إرسال رسالة شات

---

## 🗄️ قاعدة البيانات

### الجداول الجديدة

تم إنشاء migration script في:
```
backend/migrations/create_newsletter_contact_tables.sql
```

**الجداول**:
1. `newsletter_subscribers` - تخزين بيانات المشتركين في النشرة الإخبارية
2. `contact_messages` - تخزين رسائل نموذج الاتصال

### تشغيل Migration

```bash
# الاتصال بقاعدة البيانات
psql -U your_username -d drivepixel

# تنفيذ migration
\i backend/migrations/create_newsletter_contact_tables.sql
```

---

## ⚙️ التغييرات في الملفات

### 1. Backend Server (`backend/src/server.ts`)
```typescript
// تم إضافة
import newsletterRoutes from "./routes/newsletterRoutes";
import contactRoutes from "./routes/contactRoutes";

// تم إضافة routes
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);
```

### 2. Next.js Config (`next.config.js`)
```javascript
// تم إضافة rewrites للـ endpoints الجديدة
{
    source: '/api/newsletter/:path*',
    destination: 'http://localhost:5000/api/newsletter/:path*',
},
{
    source: '/api/contact/:path*',
    destination: 'http://localhost:5000/api/contact/:path*',
},
{
    source: '/api/chat/:path*',
    destination: 'http://localhost:5000/api/chat/:path*',
}
```

### 3. حذف Next.js API Routes
تم حذف المجلدات التالية:
- ❌ `app/api/newsletter/`
- ❌ `app/api/contact/`
- ❌ `app/api/chat/message/`

---

## 🚀 خطوات التشغيل

### 1. تحديث قاعدة البيانات
```bash
cd backend
psql -U postgres -d drivepixel -f migrations/create_newsletter_contact_tables.sql
```

### 2. تثبيت Dependencies (إذا لزم الأمر)
```bash
cd backend
npm install
```

### 3. تشغيل الباك إند
```bash
cd backend
npm run dev
# أو
npm start
```

يجب أن يعمل على: `http://localhost:5000`

### 4. تشغيل Next.js
```bash
# في terminal منفصل
npm run dev
```

يجب أن يعمل على: `http://localhost:3000`

---

## 🧪 اختبار الـ Endpoints

### اختبار Newsletter API
```bash
# إضافة مشترك
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source": "blog-page"}'

# جلب المشتركين
curl http://localhost:5000/api/newsletter
```

### اختبار Contact API
```bash
# إرسال رسالة
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "service": "Web Development",
    "message": "I need a website"
  }'

# جلب الرسائل
curl http://localhost:5000/api/contact
```

### اختبار Chat API
```bash
# إرسال رسالة شات
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "user",
    "message": "Hello, I need help",
    "pageUrl": "/services"
  }'
```

---

## 📊 Response Format

جميع الـ responses تتبع نفس الهيكل:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

---

## ⚠️ ملاحظات مهمة

1. **يجب تشغيل الباك إند أولاً** على port 5000
2. **قاعدة البيانات PostgreSQL** يجب أن تكون تعمل
3. **ملف `.env`** في مجلد backend يجب أن يحتوي على:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=drivepixel
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```
4. **جميع البيانات** الآن تُخزن في PostgreSQL بدلاً من JSON files

---

## 🔍 استكشاف الأخطاء

### خطأ 404 في API
- تأكد من تشغيل الباك إند على port 5000
- تحقق من ملف `.env` في مجلد backend

### خطأ Database Connection
- تأكد من تشغيل PostgreSQL
- تحقق من بيانات الاتصال في `.env`
- نفذ migration script

### خطأ CORS
- الباك إند مُعد بالفعل للسماح بـ CORS
- تأكد من أن Next.js يعمل على port 3000

---

## ✨ الفوائد

1. ✅ **أداء أفضل** - قاعدة بيانات حقيقية بدلاً من JSON files
2. ✅ **أمان محسّن** - validation وrate limiting في الباك إند
3. ✅ **إدارة مركزية** - جميع البيانات في مكان واحد
4. ✅ **قابلية التوسع** - سهولة إضافة features جديدة
5. ✅ **Transactions** - دعم كامل لـ database transactions

---

## 📞 الدعم

إذا واجهت أي مشاكل، تحقق من:
1. Logs الباك إند في terminal
2. Network tab في Developer Tools
3. Database logs في PostgreSQL
