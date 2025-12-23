# Quick Start Guide - Shopping Cart & PayPal Integration

## 🚀 Quick Setup (5 Minutes)

### 1. Get PayPal Credentials

1. Visit [PayPal Developer Portal](https://developer.paypal.com/)
2. Create a Sandbox App
3. Copy **Client ID** and **Secret**

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PAYPAL_CLIENT_ID=your-sandbox-client-id
PAYPAL_CLIENT_SECRET=your-sandbox-secret
PAYPAL_MODE=sandbox
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm install
npm run dev
```

### 3. Configure Frontend

```bash
cd ..
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-sandbox-client-id
```

Start frontend:
```bash
npm install
npm run dev
```

### 4. Test the System

1. Open `http://localhost:3000/shop`
2. Add a product to cart
3. Click cart icon in navbar
4. Fill checkout form
5. Click "Proceed to Payment"
6. Complete PayPal sandbox payment
7. View order confirmation

---

## 📦 Adding Products

### Via Admin Dashboard
1. Go to `/admin/products`
2. Click "Add New Product"
3. Fill in details and save

### Via Database
```sql
INSERT INTO products (name, description, price, category, is_active)
VALUES ('Test Product', 'Description', 99.99, 'services', true);
```

---

## 🛒 Cart Features

### Where Cart Works
- ✅ Shop page (`/shop`)
- ✅ Real Estate IT Solutions (`/services/real-estate`)
- ✅ Any page with `AddToCartButton` component

### Cart Operations
- **Add**: Click "Add to Cart" button
- **Update**: Change quantity in cart page
- **Remove**: Click X button in cart
- **Checkout**: Fill form → PayPal payment

---

## 💳 PayPal Testing

### Sandbox Test Accounts
Create in PayPal Developer Portal:
- **Buyer Account**: For testing purchases
- **Seller Account**: For receiving payments

### Test Flow
1. Add items to cart
2. Proceed to checkout
3. Use sandbox buyer credentials
4. Complete payment
5. Verify order success page

---

## 🔧 Common Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend
npm run dev

# Build for production
npm run build

# Database backup
pg_dump drivepixel_db > backup.sql
```

---

## 📱 Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| Shop | `/shop` | Browse products |
| Cart | `/cart` | View cart & checkout |
| Order Success | `/order/success` | Order confirmation |
| Real Estate | `/services/real-estate` | Service packages |
| Admin Products | `/admin/products` | Manage products |

---

## 🐛 Quick Troubleshooting

### Cart not loading?
- Check backend is running: `http://localhost:5000/api/health`
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### PayPal button not showing?
- Verify `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
- Check form validation passed
- Open browser console for errors

### Payment not capturing?
- Check backend logs
- Verify PayPal credentials
- Ensure sandbox mode is enabled

---

## 📚 Full Documentation

See `SHOPPING_CART_PAYMENT_DOCUMENTATION.md` for:
- Complete API reference
- Database schema
- Security best practices
- Production deployment guide
- Advanced troubleshooting

---

## 🎯 Production Checklist

Before going live:

- [ ] Update PayPal credentials to production
- [ ] Set `PAYPAL_MODE=production`
- [ ] Enable HTTPS
- [ ] Test with real PayPal account
- [ ] Configure email notifications
- [ ] Set up database backups
- [ ] Monitor error logs
- [ ] Test on mobile devices

---

## 💡 Tips

- **Development**: Always use sandbox mode
- **Testing**: Create multiple test buyer accounts
- **Products**: Match service names exactly for Real Estate page
- **Cart**: Session-based, no login required
- **Security**: All prices verified server-side

---

## 🆘 Need Help?

1. Check browser console for errors
2. Check backend logs
3. Review full documentation
4. Test with PayPal sandbox first
5. Verify environment variables

---

**Built with ❤️ for Drive Pixel**
