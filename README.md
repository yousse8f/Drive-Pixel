# DrivePixel – Digital Services & Real Estate Platform

DrivePixel is an end-to-end platform that powers the public marketing site, e-commerce experience, real-estate IT offerings, chatbot, and a full admin back office. The frontend is built with Next.js 16 and Tailwind CSS, while the backend relies on an Express + PostgreSQL stack that exposes authenticated APIs, handles orders, payments, analytics, and system logs.

---

## 1. Highlights

1. **Dynamic marketing website** – Service pages, portfolios, testimonials, and blog articles are fetched from the backend so content can be managed centrally.
2. **Full e-commerce stack** – A global cart, order management, PayPal checkout, and confirmation emails cover the entire purchase lifecycle.
3. **Real Estate IT Solutions** – Subscription-style plans (monthly, 1-year, 3-year, 5-year) with automatic product mapping and strict database validation.
4. **Intelligent chatbot** – Client-side assistant connected to backend chat sessions, email workflows, and an admin review dashboard.
5. **Comprehensive admin panel** – Manage content, users, analytics, logs, and settings through protected routes backed by JWT authentication.
6. **Scalable backend services** – Typed REST API, background jobs (emails), centralized logging, and analytics endpoints.

---

## 2. System Architecture

| Layer        | Details                                                                                                   |
|--------------|-----------------------------------------------------------------------------------------------------------|
| Frontend     | Next.js 16, React 18, Tailwind CSS, Radix UI primitives, Framer Motion micro-interactions                  |
| Admin UI     | Next.js app directory under `app/admin`, same design system, gated routes, Radix components                |
| Backend API  | Express + TypeScript (`backend/`), PostgreSQL, Prisma/SQL scripts, Nodemailer, PayPal SDK integration      |
| Data Storage | PostgreSQL with dedicated tables for users, services, products, carts, orders, chats, logs, and settings   |
| Integrations | PayPal REST SDK, SMTP for transactional mail, Mapbox GL for mapping, Recharts for analytics visualization  |

---

## 3. Technology Stack

| Category     | Packages & Tools                                                                                 |
|--------------|--------------------------------------------------------------------------------------------------|
| Core         | `next`, `react`, `react-dom`, `typescript`                                                       |
| UI/UX        | `tailwindcss`, `@radix-ui/*`, `framer-motion`, `lucide-react`, `@heroicons/react`, `clsx`        |
| Maps & Data  | `mapbox-gl`, `react-map-gl`, `date-fns`, `recharts`                                              |
| Utilities    | `class-variance-authority`, `tailwind-merge`, `zod`                                              |
| Backend      | Express.js (TypeScript), PostgreSQL, Nodemailer, PayPal SDK, JWT auth                            |
| Tooling      | ESLint (`eslint-config-next`), PostCSS, Tailwind CLI, npm scripts                                |

---

## 4. Repository Structure

```
app/                 # Public-facing Next.js routes (home, shop, services, blog, etc.)
app/admin/           # Admin dashboard pages (users, analytics, content, settings, logs)
backend/             # Express API, controllers, services, DB migrations/seed scripts
components/          # Shared UI components (navigation, forms, buttons, cart UI, etc.)
lib/                 # Client utilities, hooks (CartContext), validators, helpers
public/              # Static assets (images, icons, fonts)
scripts/             # Operational or data scripts
documentation/*.md   # Deep-dive guides for admin, commerce, real estate, quick start
```

---

## 5. Prerequisites

- Node.js 18+ and npm
- PostgreSQL instance (default database: `drivepixel_db`)
- PayPal Developer account for sandbox credentials
- SMTP credentials for transactional emails (thank-you emails, order confirmations)

---

## 6. Environment Configuration

### Backend (`backend/.env`)

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://drivepixel_user:password123@127.0.0.1:5432/drivepixel_db
JWT_SECRET=your-super-secret-jwt-key

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox

# Frontend origin for CORS and redirects
FRONTEND_URL=http://localhost:3000

# SMTP (required for chatbot completion emails and order confirmations)
SMTP_HOST=...
SMTP_PORT=...
SMTP_SECURE=true|false
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM="DrivePixel <noreply@drivepixel.com>"
```

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-sandbox-client-id
```

Copy the provided examples (`cp backend/.env.example backend/.env` and `cp .env.example .env.local`) before updating values.

---

## 7. Setup & Run

### Backend API
```bash
cd backend
npm install
cp .env.example .env   # then edit credentials
npm run dev            # starts Express on http://localhost:5000
```

### Frontend & Admin
```bash
cd ..
npm install            # installs app dependencies
cp .env.example .env.local   # set API URL + PayPal client ID
npm run dev            # starts Next.js on http://localhost:3000
```

### Database Prep
1. Ensure PostgreSQL is running and accessible via `DATABASE_URL`.
2. Apply schema migrations/SQL scripts (tables for users, services, products, carts, orders, chats, logs, etc.).
3. Seed critical data:
   - Run `backend/add_real_estate_services.sql` to create the 5 × 4 subscription products used by the Real Estate IT Solutions page.
   - Insert starter services, portfolio entries, testimonials, and hero texts if you want the marketing pages populated on first load.

### Available npm Scripts (root)

| Command           | Description                                  |
|-------------------|----------------------------------------------|
| `npm run dev`     | Next.js development server                   |
| `npm run build`   | Production build                             |
| `npm run start`   | Start production build                       |
| `npm run lint`    | Lint codebase with ESLint                    |

Run equivalent scripts inside `backend/` to manage the API service.

---

## 8. Feature Breakdown

### 8.1 Public Marketing Website
- **Dynamic hero + services**: Content originates from backend services, allowing editors to reorder, activate/deactivate, and update icons/text.
- **Portfolio showcase**: Category-filtered case studies with tech stack arrays and result summaries.
- **Testimonials & blog**: User-facing trust builders with publication controls.
- **Real Estate navigation**: Dedicated section with 8 property-type subpages driven by a unified design system and placeholder replacement guide.

### 8.2 E-commerce & PayPal Checkout
- **Global cart context**: `lib/context/CartContext.tsx` keeps client state, syncs with backend cart endpoints, and exposes `addItem`, `updateItem`, `removeItem`.
- **Reusable add-to-cart button**: Works across shop listings and service detail pages with loading/disabled states.
- **Cart page**: Quantity controls, customer info form, validation, and a staged checkout where the PayPal smart button appears after form completion.
- **Order pipeline**: Backend controllers convert carts into orders, capture PayPal payments, persist order items, and mark payment status.
- **Email confirmations**: Triggered post-payment to keep customers informed.

### 8.3 Real Estate IT Solutions
- **Pricing matrix**: Five core services with four subscription lengths each (monthly, 1-year, 3-year, 5-year).
- **Product lookup logic**: Frontend triggers an API search for `"Service Name - Term"` variants, ensuring the selected plan exists in the products table before checkout.
- **Database seeding script**: Guarantees all 20 combinations exist so add-to-cart never fails with “Service is not available as a product yet”.
- **Post-purchase handling**: Orders store the subscription type, enabling dashboards to show expiry, renewal, and activation flows.

### 8.4 Chatbot Experience
- **Frontend assistant**: Client-only widget that walks users through greeting → service selection → optional name/email → context capture.
- **Session tracking**: Backend records chat sessions/messages, IP, user agent, and last activity timestamps.
- **Email follow-up**: When `sessionComplete` arrives with an email, a background job queues a thank-you email; status is logged (`chat_email_logs` table).
- **Admin visibility**: `/admin/chatbot` allows staff to search sessions, inspect conversation history, and review delivery status.

### 8.5 Admin Dashboard
- **Dashboard overview**: KPIs for users, leads, services, portfolio, blog, testimonials; recent leads and activity log.
- **User management**: CRUD on users with role controls.
- **Content modules**: Services, portfolio, blog, testimonials, hero texts — each with order, activation, and structured fields.
- **Settings editor**: Key-value store with data types (string/number/boolean/JSON) to control site-wide toggles.
- **Analytics**: Dedicated endpoints and Recharts visualizations for leads, content performance, and system health.
- **Logs**: Filterable audit trail that captures action, resource, user, IP, and more.

### 8.6 Backend APIs & Services
- **Authentication**: `/api/auth/signup` & `/api/auth/login` return JWT tokens; admin endpoints require `Authorization: Bearer <token>`.
- **Public endpoints**: `/api/public/services`, `/api/public/portfolio`, `/api/public/blog`, `/api/public/testimonials`, `/api/public/hero-texts`.
- **Commerce endpoints**: Cart CRUD, PayPal order creation/capture, product management, order retrieval.
- **Admin content APIs**: CRUD routes under `/api/admin/content/*` for every managed entity.
- **Settings, analytics, logs**: Namespaced routes for configuration and monitoring.

---

## 9. API Catalog

The platform exposes a typed REST API shared between the public site, commerce flows, chatbot, and admin dashboard. The tables below summarize every key endpoint plus its auth requirements.

### 9.1 Authentication

| Method | Path                | Auth | Purpose |
|--------|---------------------|------|---------|
| POST   | `/api/auth/signup`  | None | Register a new user and return JWT + profile payload.@ADMIN_DASHBOARD_DOCUMENTATION.md#158-191 |
| POST   | `/api/auth/login`   | None | Authenticate existing users/admins and return JWT.@ADMIN_DASHBOARD_DOCUMENTATION.md#193-220 |

### 9.2 Public Content

| Method | Path                          | Auth | Description |
|--------|-------------------------------|------|-------------|
| GET    | `/api/public/services`        | None | Fetch all active services in display order.@ADMIN_DASHBOARD_DOCUMENTATION.md#222-275 |
| GET    | `/api/public/portfolio`       | None | Retrieve portfolio items for the showcase.@ADMIN_DASHBOARD_DOCUMENTATION.md#222-275 |
| GET    | `/api/public/blog`            | None | List published blog posts.@ADMIN_DASHBOARD_DOCUMENTATION.md#222-275 |
| GET    | `/api/public/blog/:slug`      | None | Fetch details for a specific blog post.@ADMIN_DASHBOARD_DOCUMENTATION.md#222-275 |
| GET    | `/api/public/testimonials`    | None | Return all active testimonials.@ADMIN_DASHBOARD_DOCUMENTATION.md#222-275 |
| GET    | `/api/public/hero-texts`      | None | Deliver rotating hero headline content.@ADMIN_DASHBOARD_DOCUMENTATION.md#222-275 |
| GET    | `/api/public/products`        | None | Shop catalog used by the e-commerce UI.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#693-702 |

### 9.3 Commerce & Payments

| Method | Path                          | Auth | Description |
|--------|-------------------------------|------|-------------|
| GET    | `/api/cart`                   | Session header | Return cart session summary (`x-session-id`).@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#603-635 |
| POST   | `/api/cart/add`               | Session header | Add product to cart with quantity payload.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#603-635 |
| PUT    | `/api/cart/item/:itemId`      | Session header | Update quantity for a cart item.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#603-635 |
| DELETE | `/api/cart/item/:itemId`      | Session header | Remove a cart item and recalc totals.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#603-635 |
| POST   | `/api/paypal/create-order`    | Session header | Create PayPal order + backend order record.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#637-656 |
| POST   | `/api/paypal/capture-order`   | JWT optional | Capture payment and mark order completed.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#659-674 |
| GET    | `/api/paypal/order/:orderId`  | JWT optional | Retrieve order details for receipts/admin.@SHOPPING_CART_PAYMENT_DOCUMENTATION.md#676-691 |

### 9.4 Admin Content Management (JWT)

| Resource     | GET                                                          | POST                             | PUT                                  | DELETE                          |
|--------------|--------------------------------------------------------------|----------------------------------|--------------------------------------|---------------------------------|
| Services     | `/api/admin/content/services?includeInactive=true`           | `/api/admin/content/services`    | `/api/admin/content/services/:id`    | `/api/admin/content/services/:id` |
| Portfolio    | `/api/admin/content/portfolio?includeInactive=true`          | `/api/admin/content/portfolio`   | `/api/admin/content/portfolio/:id`   | `/api/admin/content/portfolio/:id` |
| Blog         | `/api/admin/content/blog?includeUnpublished=true`<br>`/api/admin/content/blog/:slug` | `/api/admin/content/blog` | `/api/admin/content/blog/:id`        | `/api/admin/content/blog/:id`   |
| Testimonials | `/api/admin/content/testimonials?includeInactive=true`       | `/api/admin/content/testimonials`| `/api/admin/content/testimonials/:id`| `/api/admin/content/testimonials/:id` |
| Hero Texts   | `/api/admin/content/hero-texts?includeInactive=true`        | `/api/admin/content/hero-texts`  | `/api/admin/content/hero-texts/:id`  | `/api/admin/content/hero-texts/:id` |

@ADMIN_DASHBOARD_DOCUMENTATION.md#242-276

### 9.5 Settings, Analytics & Logs (JWT)

| Method | Path                                      | Description |
|--------|-------------------------------------------|-------------|
| GET    | `/api/admin/settings`                     | Fetch all key-value settings (filterable by `key`). |
| POST   | `/api/admin/settings`                     | Create a new setting entry. |
| PUT    | `/api/admin/settings/:key`                | Update value/type for an existing setting. |
| DELETE | `/api/admin/settings/:key`                | Remove configuration by key. |
| GET    | `/api/admin/analytics/dashboard`          | Summary KPIs for admin dashboard widgets. |
| GET    | `/api/admin/analytics/leads?period=30`    | Leads analytics over a specified period. |
| GET    | `/api/admin/analytics/content`            | Content performance metrics. |
| GET    | `/api/admin/logs` (with filters)          | Paginated audit log search (resource/action/user). |
| GET    | `/api/admin/logs/:id`                     | Inspect a single log entry. |
| DELETE | `/api/admin/logs/:id`                     | Remove a log entry if necessary. |

@ADMIN_DASHBOARD_DOCUMENTATION.md#277-296

### 9.6 User Management (JWT)

| Method | Path             | Description |
|--------|------------------|-------------|
| GET    | `/api/users`     | List users (admin-only). |
| GET    | `/api/users/:id` | Retrieve a specific user profile. |
| PUT    | `/api/users/:id` | Update user fields/roles. |
| DELETE | `/api/users/:id` | Remove a user (admin-only). |

@ADMIN_DASHBOARD_DOCUMENTATION.md#297-303

### 9.7 Chatbot & Engagement

| Method | Path                                | Auth | Description |
|--------|-------------------------------------|------|-------------|
| POST   | `/api/chat/message`                 | None | Send chatbot messages from the frontend widget, optionally including name/email and `sessionComplete` flags.@ADMIN_DASHBOARD_DOCUMENTATION.md#1-28 |
| GET    | `/api/admin/chat/sessions`          | JWT  | Paginated session list with filters (email/date).@ADMIN_DASHBOARD_DOCUMENTATION.md#20-27 |
| GET    | `/api/admin/chat/sessions/:id/messages` | JWT | Retrieve message history for a given session.@ADMIN_DASHBOARD_DOCUMENTATION.md#20-27 |

---

## 9. Testing & Troubleshooting

| Scenario                                      | Steps                                                                                         |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------|
| Cart item fails to add                        | Confirm the product exists (name + term), verify backend is running, inspect browser console. |
| Real Estate plan not found                    | Re-run `add_real_estate_services.sql`, ensure naming matches (“Service - Term”).              |
| PayPal payment not completing                 | Check sandbox credentials, backend PayPal logs, and confirm `FRONTEND_URL` matches origin.    |
| Chatbot email not sent                        | Inspect `chat_email_logs`, verify SMTP credentials, review worker logs for errors.            |
| Orders stuck in pending                       | Validate PayPal webhook/capture flow, inspect `paypalController` logs, confirm DB updates.    |

Use browser DevTools (Console + Network) alongside backend logs to diagnose issues quickly.

---

## 10. Documentation Library

- **`QUICK_START_GUIDE.md`** – 5-minute setup for PayPal + full shop smoke test.
- **`SHOPPING_CART_PAYMENT_DOCUMENTATION.md`** – Deep dive into cart architecture, API contracts, PayPal integration, and troubleshooting.
- **`REAL_ESTATE_SERVICES_SETUP.md`** – How to seed/verify real-estate subscription products and understand the matching logic.
- **`REAL_ESTATE_CONTENT_GUIDE.md`** – Exact instructions for replacing placeholder text on the eight Real Estate pages.
- **`ADMIN_DASHBOARD_DOCUMENTATION.md`** – End-to-end reference for system architecture, database schema, endpoints, and admin features.
- **`DATABASE_VERIFICATION_CHECKLIST.md` & `ppp.txt`** – Additional operational checklists and notes (review when deploying).

---

## 11. Contribution Workflow & Next Steps

1. Create feature branches and keep changes scoped (frontend, admin, backend).
2. Update relevant documentation whenever a feature or API changes.
3. Add seeds/migrations for new products or service offerings.
4. Extend analytics/logs to cover new user flows so the admin team keeps complete visibility.
5. When launching to production, point `NEXT_PUBLIC_API_URL` and PayPal credentials to live services, secure JWT secrets, and configure HTTPS.

DrivePixel consolidates every operational workflow — marketing, commerce, real-estate IT, and customer support — into a single, well-documented codebase. Use this README as the central map, and dive into the specialized markdown files for module-level detail.
