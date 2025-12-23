# Shopping Cart & PayPal Payment System Documentation

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Setup Instructions](#setup-instructions)
4. [How to Add Products](#how-to-add-products)
5. [Cart Functionality](#cart-functionality)
6. [PayPal Integration](#paypal-integration)
7. [Order Management](#order-management)
8. [Testing Guide](#testing-guide)
9. [Troubleshooting](#troubleshooting)
10. [API Reference](#api-reference)

---

## Overview

The Drive Pixel shopping cart and payment system is a fully integrated e-commerce solution featuring:

- **Global Cart System**: Accessible from any page with real-time updates
- **Backend Synchronization**: All cart actions persist to PostgreSQL database
- **PayPal Integration**: Secure payment processing with sandbox and production modes
- **Order Management**: Complete order tracking with confirmation emails
- **Responsive Design**: Mobile-first, accessible UI/UX
- **Real-time Updates**: Cart count and totals update instantly

---

## System Architecture

### Frontend Components

#### Cart Context (`lib/context/CartContext.tsx`)
- Manages global cart state
- Handles session-based cart persistence
- Provides cart operations (add, update, remove)
- Syncs with backend API

#### Cart Icon (`components/ui/CartIcon.tsx`)
- Displays cart item count in navbar
- Links to cart page
- Real-time badge updates

#### Add to Cart Button (`components/ui/AddToCartButton.tsx`)
- Reusable component for product pages
- Loading states and error handling
- One-click add to cart functionality

#### Cart Page (`app/cart/page.tsx`)
- Full cart view with item management
- Customer information form
- PayPal checkout integration
- Responsive layout

#### Order Success Page (`app/order/success/page.tsx`)
- Order confirmation and receipt
- Printable invoice
- Order details and customer information

### Backend Components

#### Cart Controller (`backend/src/controllers/cartController.ts`)
- Session-based cart management
- CRUD operations for cart items
- Order creation from cart

#### PayPal Controller (`backend/src/controllers/paypalController.ts`)
- PayPal order creation
- Payment capture
- Order details retrieval

#### PayPal Configuration (`backend/src/config/paypal.ts`)
- PayPal SDK initialization
- Environment configuration (sandbox/production)

### Database Schema

**Tables Used:**
- `carts`: Stores cart sessions
- `cart_items`: Individual items in carts
- `orders`: Completed orders
- `order_items`: Items in orders
- `products`: Product catalog

---

## Setup Instructions

### 1. PayPal Account Setup

#### Create PayPal Developer Account
1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Sign in or create a developer account
3. Navigate to **Dashboard** → **Apps & Credentials**

#### Create a Sandbox App
1. Click **Create App**
2. Enter app name (e.g., "Drive Pixel Shop")
3. Select **Sandbox** for testing
4. Click **Create App**
5. Copy your **Client ID** and **Secret**

#### Create Sandbox Test Accounts
1. Go to **Sandbox** → **Accounts**
2. Create a **Personal** account (buyer)
3. Create a **Business** account (seller)
4. Note the login credentials for testing

### 2. Backend Configuration

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create or update `backend/.env`:

```env
# Database
DATABASE_URL=postgresql://drivepixel_user:password123@127.0.0.1:5432/drivepixel_db

# PayPal Configuration
PAYPAL_CLIENT_ID=your-sandbox-client-id
PAYPAL_CLIENT_SECRET=your-sandbox-secret
PAYPAL_MODE=sandbox

# Frontend URL for redirects
FRONTEND_URL=http://localhost:3000

# Server
PORT=5000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
```

#### Start Backend Server
```bash
npm run dev
```

### 3. Frontend Configuration

#### Install Dependencies
```bash
cd ..
npm install
```

#### Configure Environment Variables
Create or update `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-sandbox-client-id
```

#### Start Frontend Server
```bash
npm run dev
```

### 4. Database Setup

Ensure your PostgreSQL database has the required tables. The schema should include:

```sql
-- Carts table
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price_each DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id),
    user_id UUID REFERENCES users(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    customer_address TEXT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    payment_provider VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_reference VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    subscription_type VARCHAR(50),
    confirmation_email_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_each DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## How to Add Products

### Method 1: Using Admin Dashboard

1. Navigate to `/admin/products`
2. Click **Add New Product**
3. Fill in product details:
   - **Name**: Product name
   - **Description**: Product description
   - **Price**: Product price (USD)
   - **Category**: Product category
   - **Image URL**: Product image URL
   - **Availability**: Stock quantity
   - **Is Active**: Enable/disable product
4. Click **Save**

### Method 2: Direct Database Insert

```sql
INSERT INTO products (name, description, price, category, image_url, availability, is_active)
VALUES (
    'Premium Website Package',
    'Complete website solution with hosting and support',
    299.99,
    'services',
    '/images/website-package.jpg',
    100,
    true
);
```

### Method 3: Using API

```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Premium Website Package",
    "description": "Complete website solution",
    "price": 299.99,
    "category": "services",
    "imageUrl": "/images/website-package.jpg",
    "availability": 100,
    "isActive": true
  }'
```

### Adding Products to Existing Pages

#### Shop Page
Products added to the database automatically appear on the shop page (`/shop`).

#### Real Estate IT Solutions Page
To add products to the Real Estate page:

1. Add product to database with matching name
2. Update pricing plans in `app/services/real-estate/page.tsx`:

```typescript
const pricingPlans = [
  {
    service: 'Your Service Name',
    monthly: '$99',
    oneYear: '$89',
    threeYear: '$79',
    fiveYear: '$69'
  }
];
```

3. The `findProductIdForService` function will match the service name to the product

#### Custom Service Pages
To add cart functionality to any page:

```tsx
import AddToCartButton from '@/components/ui/AddToCartButton';

// In your component
<AddToCartButton 
  productId="product-uuid-here"
  variant="primary"
  className="w-full"
/>
```

---

## Cart Functionality

### Adding Items to Cart

**From Shop Page:**
- Click "Add to Cart" button on any product
- Item is added with quantity 1
- Cart count updates immediately

**From Real Estate Page:**
- Select subscription period (Monthly, 1-Year, 3-Year, 5-Year)
- Click "Add to Cart" button
- Product variant is added to cart

**Programmatically:**
```typescript
import { useCart } from '@/lib/hooks/useCart';

const { addItem } = useCart();

// Add item
await addItem('product-id', 1);
```

### Viewing Cart

**Cart Icon:**
- Located in navbar
- Shows item count badge
- Click to navigate to cart page

**Cart Page (`/cart`):**
- View all items
- Update quantities
- Remove items
- Proceed to checkout

### Updating Quantities

**In Cart Page:**
1. Change quantity in input field
2. Updates automatically on blur/enter
3. Total recalculates instantly

**Programmatically:**
```typescript
const { updateItem } = useCart();

await updateItem('cart-item-id', 5);
```

### Removing Items

**In Cart Page:**
- Click X button next to item
- Item removed immediately
- Total updates

**Programmatically:**
```typescript
const { removeItem } = useCart();

await removeItem('cart-item-id');
```

---

## PayPal Integration

### Checkout Flow

1. **Customer fills form** on cart page:
   - Full Name
   - Email Address
   - Phone (optional)
   - Shipping Address

2. **Validation** occurs on "Proceed to Payment"

3. **PayPal button appears** with secure checkout

4. **Customer clicks PayPal button**:
   - Backend creates PayPal order
   - Order saved to database
   - PayPal popup opens

5. **Customer logs into PayPal**:
   - Uses sandbox test account
   - Reviews order details
   - Confirms payment

6. **Payment captured**:
   - Backend captures payment
   - Order marked as paid
   - Cart cleared

7. **Redirect to success page**:
   - Order confirmation displayed
   - Receipt available
   - Confirmation email sent

### Security Features

- **Session-based carts**: No user login required
- **Server-side validation**: All prices verified on backend
- **PayPal SDK**: Official PayPal integration
- **HTTPS required**: For production
- **Order verification**: Double-check before capture

### Sandbox Testing

**Test Buyer Account:**
- Email: Use PayPal sandbox buyer account
- Password: From PayPal developer portal

**Test Cards:**
PayPal provides test credit cards in sandbox mode.

**Test Flow:**
1. Add items to cart
2. Fill checkout form
3. Click PayPal button
4. Login with sandbox buyer account
5. Confirm payment
6. Verify order success page

---

## Order Management

### Viewing Orders

**Admin Dashboard:**
- Navigate to `/admin/orders`
- View all orders
- Filter by status, date, customer

**Customer View:**
- Order success page after purchase
- Email confirmation with details

### Order Statuses

- **pending**: Order created, payment not completed
- **completed**: Payment successful
- **cancelled**: Order cancelled
- **refunded**: Payment refunded

### Payment Statuses

- **pending**: Awaiting payment
- **paid**: Payment successful
- **failed**: Payment failed
- **refunded**: Payment refunded

### Order Details API

```typescript
// Fetch order details
const response = await fetch(`${API_URL}/paypal/order/${orderId}`);
const data = await response.json();

// Returns:
{
  success: true,
  data: {
    id: "order-uuid",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    total: 299.99,
    paymentStatus: "paid",
    status: "completed",
    items: [...],
    createdAt: "2024-01-01T00:00:00Z"
  }
}
```

---

## Testing Guide

### Local Testing Checklist

#### Cart Functionality
- [ ] Add product from shop page
- [ ] Add product from real estate page
- [ ] Update quantity in cart
- [ ] Remove item from cart
- [ ] Cart count updates in navbar
- [ ] Cart persists on page refresh
- [ ] Empty cart shows appropriate message

#### Checkout Process
- [ ] Form validation works
- [ ] PayPal button appears after form validation
- [ ] PayPal popup opens correctly
- [ ] Can complete payment in sandbox
- [ ] Redirects to success page
- [ ] Order details display correctly
- [ ] Receipt is printable

#### Responsive Design
- [ ] Cart works on mobile
- [ ] Checkout form is mobile-friendly
- [ ] PayPal button works on mobile
- [ ] Success page is responsive

#### Error Handling
- [ ] Invalid product ID shows error
- [ ] Network errors handled gracefully
- [ ] Payment cancellation handled
- [ ] Out of stock products handled

### Production Testing

Before going live:

1. **Update PayPal credentials** to production:
   ```env
   PAYPAL_CLIENT_ID=production-client-id
   PAYPAL_CLIENT_SECRET=production-secret
   PAYPAL_MODE=production
   ```

2. **Test with real PayPal account**

3. **Verify HTTPS** is enabled

4. **Test email confirmations**

5. **Monitor first transactions** closely

---

## Troubleshooting

### Cart Not Loading

**Issue**: Cart shows loading indefinitely

**Solutions:**
1. Check backend is running: `http://localhost:5000/api/health`
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for errors
4. Verify database connection

### PayPal Button Not Showing

**Issue**: PayPal button doesn't appear

**Solutions:**
1. Verify `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
2. Check browser console for PayPal SDK errors
3. Ensure form validation passes
4. Check network tab for API errors

### Payment Not Capturing

**Issue**: Payment approved but not captured

**Solutions:**
1. Check backend logs for errors
2. Verify PayPal credentials are correct
3. Ensure order ID is passed correctly
4. Check database for order status

### Mixed Content Errors

**Issue**: HTTPS site can't load HTTP API

**Solutions:**
1. Use HTTPS for API in production
2. Update `NEXT_PUBLIC_API_URL` to use HTTPS
3. Configure SSL certificate on backend

### Session Lost on Refresh

**Issue**: Cart empties on page refresh

**Solutions:**
1. Check localStorage is enabled
2. Verify session ID is stored
3. Check backend session handling
4. Clear browser cache and retry

---

## API Reference

### Cart Endpoints

#### Get Cart
```
GET /api/cart
Headers: x-session-id: <session-id>
Response: { success: true, data: { sessionId, items, total } }
```

#### Add to Cart
```
POST /api/cart/add
Headers: x-session-id: <session-id>
Body: { productId: string, quantity: number }
Response: { success: true, data: { sessionId, items, total } }
```

#### Update Cart Item
```
PUT /api/cart/item/:itemId
Headers: x-session-id: <session-id>
Body: { quantity: number }
Response: { success: true, data: { items, total } }
```

#### Remove Cart Item
```
DELETE /api/cart/item/:itemId
Headers: x-session-id: <session-id>
Response: { success: true, data: { items, total } }
```

### PayPal Endpoints

#### Create PayPal Order
```
POST /api/paypal/create-order
Headers: x-session-id: <session-id>
Body: {
  customerName: string,
  customerEmail: string,
  customerPhone?: string,
  customerAddress: string
}
Response: {
  success: true,
  data: {
    orderId: string,
    paypalOrderId: string,
    approvalUrl: string
  }
}
```

#### Capture PayPal Payment
```
POST /api/paypal/capture-order
Body: {
  paypalOrderId: string,
  orderId: string
}
Response: {
  success: true,
  data: {
    orderId: string,
    paypalOrderId: string,
    status: "completed"
  }
}
```

#### Get Order Details
```
GET /api/paypal/order/:orderId
Response: {
  success: true,
  data: {
    id: string,
    customerName: string,
    customerEmail: string,
    total: number,
    paymentStatus: string,
    status: string,
    items: Array<OrderItem>
  }
}
```

### Product Endpoints

#### Get Products (Public)
```
GET /api/public/products
Response: {
  success: true,
  data: Array<Product>
}
```

---

## Maintenance Guide

### Adding New Payment Methods

To add additional payment methods (Stripe, etc.):

1. Install payment SDK
2. Create controller in `backend/src/controllers/`
3. Create routes in `backend/src/routes/`
4. Add to `server.ts`
5. Update cart page with new payment option
6. Test thoroughly

### Updating Product Catalog

**Bulk Import:**
```sql
COPY products(name, description, price, category, image_url, availability, is_active)
FROM '/path/to/products.csv'
DELIMITER ','
CSV HEADER;
```

**Bulk Update Prices:**
```sql
UPDATE products
SET price = price * 1.1
WHERE category = 'services';
```

### Database Backups

```bash
# Backup
pg_dump -U drivepixel_user drivepixel_db > backup.sql

# Restore
psql -U drivepixel_user drivepixel_db < backup.sql
```

### Monitoring

**Key Metrics to Monitor:**
- Cart abandonment rate
- Checkout completion rate
- Payment success rate
- Average order value
- Error rates

**Logging:**
- Backend logs all requests
- PayPal transactions logged
- Order creation logged
- Payment captures logged

---

## Support & Resources

### PayPal Resources
- [PayPal Developer Docs](https://developer.paypal.com/docs/)
- [PayPal SDK Reference](https://github.com/paypal/Checkout-NodeJS-SDK)
- [PayPal Support](https://www.paypal.com/us/smarthelp/contact-us)

### Internal Resources
- Backend API: `http://localhost:5000/api`
- Admin Dashboard: `/admin`
- Database: PostgreSQL on localhost:5432

### Common Issues
- Check `backend/src/server.ts` logs
- Verify environment variables
- Test with PayPal sandbox first
- Monitor database connections

---

## Version History

**v1.0.0** - Initial Release
- Global cart system
- PayPal integration
- Order management
- Responsive design
- Email confirmations

---

## License & Credits

Built for Drive Pixel by the development team.
PayPal integration uses official PayPal SDK.
All rights reserved.
