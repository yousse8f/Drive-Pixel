## Chatbot additions (backend + admin + frontend)

### Data flow
1) Frontend chatbot (client-only) sends messages to `/api/chat/message` with optional `name`, `email`, and `sessionComplete`.
2) Backend stores/creates `chat_sessions` and `chat_messages`, captures IP/user-agent on the server, and updates `last_activity`.
3) When `sessionComplete` is true and an email is present, a background email job is enqueued; status tracked in `chat_sessions.email_sent_status` and `chat_email_logs`.
4) Admin can view sessions/messages via `/api/admin/chat` routes and the `/admin/chatbot` UI page.

### Email trigger logic
- Triggered only when `sessionComplete` is sent with a valid email.
- Queue: `enqueueThankYouEmail` (nodemailer). It checks `email_sent_status`; skips if already `sent`.
- On success: `email_sent_status = sent`, `email_sent_at` set, log row in `chat_email_logs`.
- On failure: `email_sent_status = failed`, error stored, log row with error.
- SMTP envs needed: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` (true/false), `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.

### IP handling
- IP captured on backend using `x-forwarded-for` (first value) or socket IP.
- Stored in `chat_sessions.ip_address`. Not shown to end-users; visible in admin list.

### Admin chatbot module
- Routes: `/api/admin/chat/sessions` (with filters: email, dateFrom, dateTo, pagination) and `/api/admin/chat/sessions/:id/messages`.
- UI: `/admin/chatbot` shows sessions table (name, email, IP, last message, created date) with filters and pagination, plus a read-only conversation viewer.

### Frontend chatbot flow
- Steps: greeting -> service selection -> (optional) name -> (optional) email -> context -> completion.
- Sends `sessionComplete` with name/email on context step to trigger email queue once per session.
- Lazy-loaded client component; no SSR impact.

### DB changes (idempotent)
- `chat_sessions`: page_url, ip_address, user_agent, name, email, email_sent_status, email_sent_at, email_error, timestamps, last_activity.
- `chat_messages`: session_id, sender, message, page_url, created_at.
- `chat_email_logs`: session_id, status, error, created_at.
# Admin Dashboard Documentation

## Overview

This documentation covers the complete admin dashboard system for the DrivePixel website. The system includes a full backend API and a modern admin dashboard interface for managing all website content.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Database Structure](#database-structure)
3. [API Endpoints](#api-endpoints)
4. [Admin Dashboard Features](#admin-dashboard-features)
5. [Setup & Installation](#setup--installation)
6. [Usage Guide](#usage-guide)
7. [Adding New Features](#adding-new-features)

## System Architecture

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **Location**: `backend/` directory

### Frontend
- **Framework**: Next.js 16 with React
- **UI Components**: Radix UI + Tailwind CSS
- **Location**: `app/admin/` directory

### Public Website
- **Framework**: Next.js 16
- **Content Source**: Dynamic API endpoints
- **Location**: `app/` directory (public pages)

## Database Structure

### Core Tables

#### Users
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `role` (VARCHAR, Default: 'user', Options: 'user', 'admin')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Services
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `description` (TEXT)
- `icon` (VARCHAR, Emoji)
- `items` (TEXT[], Array of service items)
- `order` (INT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Portfolio
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `category` (VARCHAR)
- `description` (TEXT)
- `tech_stack` (TEXT[], Array of technologies)
- `results` (VARCHAR)
- `image_url` (VARCHAR, Optional)
- `order` (INT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Blog Posts
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `category` (VARCHAR)
- `author` (VARCHAR)
- `date` (VARCHAR)
- `excerpt` (TEXT)
- `content` (TEXT, Optional)
- `image` (VARCHAR, Emoji)
- `slug` (VARCHAR, Unique)
- `is_published` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Testimonials
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `rating` (INT, 1-5)
- `text` (TEXT)
- `order` (INT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Hero Texts
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `subtitle` (TEXT)
- `order` (INT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Settings
- `id` (UUID, Primary Key)
- `key` (VARCHAR, Unique)
- `value` (TEXT)
- `type` (VARCHAR, 'string', 'number', 'boolean', 'json')
- `description` (TEXT, Optional)
- `updated_at` (TIMESTAMP)

#### Logs
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to Users, Optional)
- `action` (VARCHAR)
- `resource` (VARCHAR)
- `resource_id` (UUID, Optional)
- `details` (TEXT, Optional)
- `ip_address` (VARCHAR, Optional)
- `user_agent` (TEXT, Optional)
- `created_at` (TIMESTAMP)

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "jwt-token"
  }
}
```

#### POST `/api/auth/login`
Login and get authentication token.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin"
    },
    "token": "jwt-token"
  }
}
```

### Public Content Endpoints (No Authentication Required)

#### GET `/api/public/services`
Get all active services.

#### GET `/api/public/portfolio`
Get all active portfolio items.

#### GET `/api/public/blog`
Get all published blog posts.

#### GET `/api/public/blog/:slug`
Get a specific blog post by slug.

#### GET `/api/public/testimonials`
Get all active testimonials.

#### GET `/api/public/hero-texts`
Get all active hero texts.

### Admin Content Management Endpoints (Admin Authentication Required)

All admin endpoints require the `Authorization: Bearer <token>` header.

#### Services
- `GET /api/admin/content/services?includeInactive=true` - Get all services
- `POST /api/admin/content/services` - Create service
- `PUT /api/admin/content/services/:id` - Update service
- `DELETE /api/admin/content/services/:id` - Delete service

#### Portfolio
- `GET /api/admin/content/portfolio?includeInactive=true` - Get all portfolio items
- `POST /api/admin/content/portfolio` - Create portfolio item
- `PUT /api/admin/content/portfolio/:id` - Update portfolio item
- `DELETE /api/admin/content/portfolio/:id` - Delete portfolio item

#### Blog Posts
- `GET /api/admin/content/blog?includeUnpublished=true` - Get all blog posts
- `GET /api/admin/content/blog/:slug` - Get blog post by slug
- `POST /api/admin/content/blog` - Create blog post
- `PUT /api/admin/content/blog/:id` - Update blog post
- `DELETE /api/admin/content/blog/:id` - Delete blog post

#### Testimonials
- `GET /api/admin/content/testimonials?includeInactive=true` - Get all testimonials
- `POST /api/admin/content/testimonials` - Create testimonial
- `PUT /api/admin/content/testimonials/:id` - Update testimonial
- `DELETE /api/admin/content/testimonials/:id` - Delete testimonial

#### Hero Texts
- `GET /api/admin/content/hero-texts?includeInactive=true` - Get all hero texts
- `POST /api/admin/content/hero-texts` - Create hero text
- `PUT /api/admin/content/hero-texts/:id` - Update hero text
- `DELETE /api/admin/content/hero-texts/:id` - Delete hero text

### Settings Endpoints (Admin Only)

- `GET /api/admin/settings` - Get all settings
- `GET /api/admin/settings?key=setting_key` - Get specific setting
- `POST /api/admin/settings` - Create setting
- `PUT /api/admin/settings/:key` - Update setting
- `DELETE /api/admin/settings/:key` - Delete setting

### Analytics Endpoints (Admin Only)

- `GET /api/admin/analytics/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics/leads?period=30` - Get leads analytics
- `GET /api/admin/analytics/content` - Get content analytics

### Logs Endpoints (Admin Only)

- `GET /api/admin/logs?page=1&limit=50&resource=services&action=create` - Get logs with filters
- `GET /api/admin/logs/:id` - Get specific log
- `DELETE /api/admin/logs/:id` - Delete log

### User Management Endpoints (Authenticated)

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user (Admin can update roles)
- `DELETE /api/users/:id` - Delete user (Admin only)

## Admin Dashboard Features

### 1. Dashboard Overview
- **Location**: `/admin`
- **Features**:
  - Total counts (users, leads, services, portfolio, blog, testimonials)
  - Recent leads (last 7 days)
  - Active content statistics
  - Recent activity log

### 2. User Management
- **Location**: `/admin/users`
- **Features**:
  - View all users
  - View user roles
  - Delete users
  - Update user information

### 3. Analytics
- **Location**: `/admin/analytics`
- **Features**:
  - Dashboard statistics
  - Leads analytics with charts
  - Content statistics
  - Visual charts using Recharts

### 4. Content Management

#### Services (`/admin/content/services`)
- Create, edit, delete services
- Manage service items (array)
- Set order and active status
- Icon support (emoji)

#### Portfolio (`/admin/content/portfolio`)
- Create, edit, delete portfolio items
- Manage tech stack (array)
- Set order and active status
- Image URL support

#### Blog (`/admin/content/blog`)
- Create, edit, delete blog posts
- Slug generation
- Publish/unpublish posts
- Rich content support

#### Testimonials (`/admin/content/testimonials`)
- Create, edit, delete testimonials
- Star rating (1-5)
- Set order and active status

#### Hero Texts (`/admin/content/hero-texts`)
- Create, edit, delete hero texts
- Set order and active status
- Multiple hero texts for rotation

### 5. Settings
- **Location**: `/admin/settings`
- **Features**:
  - Key-value settings
  - Support for string, number, boolean, JSON types
  - Description field for documentation

### 6. Logs & Monitoring
- **Location**: `/admin/logs`
- **Features**:
  - View all system activity
  - Filter by resource, action, user
  - Pagination support
  - Delete logs

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://www.drivepixel.com/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Creating Admin User

1. Sign up a new user via `/api/auth/signup`
2. Update the user's role to 'admin' in the database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

Or use the admin dashboard to update user roles (if you have admin access).

## Usage Guide

### Accessing the Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. You'll be redirected to the dashboard

### Managing Content

1. **Services**: Go to `/admin/content/services`
   - Click "Add Service" to create new service
   - Fill in title, description, icon (emoji)
   - Add service items one by one
   - Set order and active status
   - Click "Save"

2. **Portfolio**: Go to `/admin/content/portfolio`
   - Click "Add Portfolio Item"
   - Fill in all required fields
   - Add technologies to tech stack
   - Set order and active status

3. **Blog Posts**: Go to `/admin/content/blog`
   - Click "Add Blog Post"
   - Title automatically generates slug
   - Toggle "Published" to make it visible on website
   - Add content in the content field

4. **Testimonials**: Go to `/admin/content/testimonials`
   - Click "Add Testimonial"
   - Set rating using star selector
   - Fill in testimonial text
   - Set order for display sequence

5. **Hero Texts**: Go to `/admin/content/hero-texts`
   - Click "Add Hero Text"
   - Add title and subtitle
   - Set order for rotation sequence

### Viewing Analytics

1. Go to `/admin/analytics`
2. View dashboard statistics
3. Check leads analytics with charts
4. Review content statistics

### Managing Settings

1. Go to `/admin/settings`
2. Add new settings with key-value pairs
3. Choose appropriate type (string, number, boolean, JSON)
4. Settings can be accessed via API for website configuration

### Monitoring Logs

1. Go to `/admin/logs`
2. View all system activities
3. Filter by resource, action, or user
4. Use pagination to navigate through logs

## Adding New Features

### Adding a New Content Type

1. **Create Database Model** (`backend/src/models/`)
   - Define TypeScript interfaces
   - Add to database initialization

2. **Create Controller** (`backend/src/controllers/`)
   - Implement CRUD operations
   - Add validation

3. **Create Routes** (`backend/src/routes/`)
   - Define admin routes
   - Add to public routes if needed

4. **Update Server** (`backend/src/server.ts`)
   - Register new routes

5. **Create Admin Page** (`app/admin/content/`)
   - Create new page component
   - Add to admin layout navigation

6. **Update Public API Client** (`lib/public-api-client.ts`)
   - Add methods for fetching content

7. **Update Website Pages** (`app/`)
   - Fetch and display new content

### Example: Adding FAQ Management

1. Create `backend/src/models/faqModel.ts`
2. Create `backend/src/controllers/faqController.ts`
3. Create `backend/src/routes/faqRoutes.ts`
4. Add routes to server
5. Create `app/admin/content/faq/page.tsx`
6. Add FAQ to navigation
7. Update public API and website pages

## Security Considerations

1. **JWT Tokens**: Tokens expire after 24 hours
2. **Password Hashing**: Uses bcrypt with 10 salt rounds
3. **Admin Middleware**: All admin routes require admin role
4. **CORS**: Configure allowed origins in backend
5. **Environment Variables**: Never commit `.env` files

## Deployment

### Backend Deployment

1. Build the TypeScript code:
```bash
cd backend
npm run build
```

2. Set environment variables on your hosting platform
3. Start the server:
```bash
npm start
```

### Frontend Deployment

1. Build the Next.js application:
```bash
npm run build
```

2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Start the production server:
```bash
npm start
```

Or deploy to Vercel/Netlify with environment variables configured.

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running
- Verify database exists

### Authentication Issues
- Check JWT_SECRET is set
- Verify token is being sent in headers
- Check user role is 'admin'

### CORS Issues
- Update `CORS_ORIGIN` in backend `.env`
- Verify frontend URL matches

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check backend is running
- Verify API endpoint paths

## Support

For issues or questions:
1. Check the logs in `/admin/logs`
2. Review error messages in browser console
3. Check backend server logs
4. Verify database connection and schema

---

**Last Updated**: December 2024
**Version**: 1.0.0

