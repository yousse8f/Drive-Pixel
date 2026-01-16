# API Connection Testing Guide

## Prerequisites
1. Backend server running on port 5000
2. Admin token obtained from login
3. Database properly initialized

## Getting Admin Token

```bash
# Login to get token
curl -X POST https://www.drivepixel.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@drivepixel.com","password":"your_password"}'

# Save the token from response
export TOKEN="your_token_here"
```

---

## CRM API Tests

### 1. Get CRM Statistics
```bash
curl -X GET "https://www.drivepixel.com/api/admin/crm/stats" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "customersByStatus": [...],
    "dealStats": {...},
    "recentActivities": [...],
    "pipelineOverview": [...]
  }
}
```

### 2. List Customers
```bash
curl -X GET "https://www.drivepixel.com/api/admin/crm/customers?limit=10&page=1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Create Customer
```bash
curl -X POST "https://www.drivepixel.com/api/admin/crm/customers" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "Customer",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "status": "new",
    "source": "website"
  }'
```

### 4. Get Customer Details
```bash
# Replace {customer_id} with actual ID
curl -X GET "https://www.drivepixel.com/api/admin/crm/customers/{customer_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Update Customer
```bash
curl -X PUT "https://www.drivepixel.com/api/admin/crm/customers/{customer_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "phone": "+9876543210"
  }'
```

### 6. Add Customer Note
```bash
curl -X POST "https://www.drivepixel.com/api/admin/crm/notes" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "{customer_id}",
    "note": "This is a test note",
    "is_private": false
  }'
```

### 7. Get Pipeline Stages
```bash
curl -X GET "https://www.drivepixel.com/api/admin/crm/pipeline/stages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### 8. Create Deal
```bash
curl -X POST "https://www.drivepixel.com/api/admin/crm/deals" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "{customer_id}",
    "title": "Test Deal",
    "value": 5000,
    "probability": 75,
    "stage_id": "{stage_id}"
  }'
```

### 9. Get Activities
```bash
curl -X GET "https://www.drivepixel.com/api/admin/crm/activities?customer_id={customer_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## CMS API Tests

### 1. List Pages
```bash
curl -X GET "https://www.drivepixel.com/api/admin/cms/pages?limit=20" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

### 2. Create Page
```bash
curl -X POST "https://www.drivepixel.com/api/admin/cms/pages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-page",
    "title": "Test Page",
    "meta_title": "Test Page - SEO Title",
    "meta_description": "This is a test page for CMS",
    "status": "draft",
    "template": "default"
  }'
```

### 3. Get Page Details
```bash
curl -X GET "https://www.drivepixel.com/api/admin/cms/pages/{page_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### 4. Update Page
```bash
curl -X PUT "https://www.drivepixel.com/api/admin/cms/pages/{page_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "published",
    "title": "Updated Test Page"
  }'
```

### 5. Create Section
```bash
curl -X POST "https://www.drivepixel.com/api/admin/cms/sections" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "page_id": "{page_id}",
    "name": "Hero Section",
    "section_type": "hero",
    "content": {
      "title": "Welcome",
      "subtitle": "This is a hero section"
    },
    "order": 0
  }'
```

### 6. Get Sections
```bash
curl -X GET "https://www.drivepixel.com/api/admin/cms/sections?page_id={page_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### 7. Create Content Block
```bash
curl -X POST "https://www.drivepixel.com/api/admin/cms/blocks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "section_id": "{section_id}",
    "block_type": "text",
    "content": {
      "text": "This is a text block"
    },
    "order": 0
  }'
```

### 8. List Components
```bash
curl -X GET "https://www.drivepixel.com/api/admin/cms/components" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### 9. Create Component
```bash
curl -X POST "https://www.drivepixel.com/api/admin/cms/components" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Component",
    "slug": "test-component",
    "component_type": "widget",
    "content": {
      "title": "Widget Title",
      "description": "Widget Description"
    }
  }'
```

### 10. Get Content Versions
```bash
curl -X GET "https://www.drivepixel.com/api/admin/cms/versions?entity_type=cms_page&entity_id={page_id}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## Frontend Connection Tests

### Test CRM Dashboard
1. Navigate to: `http://localhost:3000/admin/crm`
2. Verify:
   - Statistics cards display correctly
   - Customer list loads
   - Search functionality works
   - Filter by status works
   - Click on customer navigates to detail page

### Test CRM Customer Detail
1. Navigate to: `http://localhost:3000/admin/crm/customers/{id}`
2. Verify:
   - Customer information displays
   - Edit fields work
   - Save button updates customer
   - Notes can be added
   - Activities display
   - Delete button works

### Test CRM Customer Creation
1. Navigate to: `http://localhost:3000/admin/crm/customers/new`
2. Verify:
   - Form displays correctly
   - All fields are editable
   - Save creates new customer
   - Redirects to detail page after creation

### Test CMS Dashboard
1. Navigate to: `http://localhost:3000/admin/cms`
2. Verify:
   - Pages tab displays pages
   - Components tab displays components
   - Search functionality works
   - Filter by status works (pages)
   - Edit and delete buttons work

### Test CMS Page Editor
1. Navigate to: `http://localhost:3000/admin/cms/pages/{id}`
2. Verify:
   - Page information displays
   - All fields are editable
   - Status dropdown works
   - Template dropdown works
   - Sections list displays
   - Add section button works
   - Delete section works
   - Save button updates page
   - SEO preview updates

### Test CMS Page Creation
1. Navigate to: `http://localhost:3000/admin/cms/pages/new`
2. Verify:
   - Form displays correctly
   - All fields are editable
   - Save creates new page
   - Redirects to editor after creation

### Test CMS Component Editor
1. Navigate to: `http://localhost:3000/admin/cms/components/{id}`
2. Verify:
   - Component information displays
   - JSON editor works
   - Save button updates component
   - Delete button works

---

## Automated Testing Script

Create a file `test-apis.sh`:

```bash
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get token
echo "Getting admin token..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@drivepixel.com","password":"admin123"}')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token')

if [ "$TOKEN" == "null" ]; then
  echo -e "${RED}Failed to get token${NC}"
  exit 1
fi

echo -e "${GREEN}Token obtained${NC}"

# Test CRM Stats
echo -e "\nTesting CRM Stats..."
STATS_RESPONSE=$(curl -s -X GET "http://localhost:5000/api/admin/crm/stats" \
  -H "Authorization: Bearer $TOKEN")

if echo $STATS_RESPONSE | jq -e '.success' > /dev/null; then
  echo -e "${GREEN}✓ CRM Stats API working${NC}"
else
  echo -e "${RED}✗ CRM Stats API failed${NC}"
fi

# Test CRM Customers List
echo -e "\nTesting CRM Customers List..."
CUSTOMERS_RESPONSE=$(curl -s -X GET "http://localhost:5000/api/admin/crm/customers?limit=5" \
  -H "Authorization: Bearer $TOKEN")

if echo $CUSTOMERS_RESPONSE | jq -e '.success' > /dev/null; then
  echo -e "${GREEN}✓ CRM Customers List API working${NC}"
else
  echo -e "${RED}✗ CRM Customers List API failed${NC}"
fi

# Test CMS Pages List
echo -e "\nTesting CMS Pages List..."
PAGES_RESPONSE=$(curl -s -X GET "http://localhost:5000/api/admin/cms/pages?limit=5" \
  -H "Authorization: Bearer $TOKEN")

if echo $PAGES_RESPONSE | jq -e '.success' > /dev/null; then
  echo -e "${GREEN}✓ CMS Pages List API working${NC}"
else
  echo -e "${RED}✗ CMS Pages List API failed${NC}"
fi

# Test CMS Components List
echo -e "\nTesting CMS Components List..."
COMPONENTS_RESPONSE=$(curl -s -X GET "http://localhost:5000/api/admin/cms/components" \
  -H "Authorization: Bearer $TOKEN")

if echo $COMPONENTS_RESPONSE | jq -e '.success' > /dev/null; then
  echo -e "${GREEN}✓ CMS Components List API working${NC}"
else
  echo -e "${RED}✗ CMS Components List API failed${NC}"
fi

echo -e "\n${GREEN}All tests completed!${NC}"
```

Make it executable:
```bash
chmod +x test-apis.sh
./test-apis.sh
```

---

## Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution**: Token expired or invalid. Login again to get a new token.

### Issue: 404 Not Found
**Solution**: Check if the route is properly registered in server.ts and the ID exists in database.

### Issue: 500 Internal Server Error
**Solution**: Check backend logs for detailed error. Usually database connection or query issues.

### Issue: CORS Error
**Solution**: Ensure CORS is properly configured in backend server.ts.

### Issue: Network Error
**Solution**: Verify backend server is running and accessible.

---

## Success Criteria

All APIs should return:
- ✅ HTTP 200 status code
- ✅ JSON response with `success: true`
- ✅ Proper data structure
- ✅ No console errors in frontend
- ✅ UI updates reflect API changes

---

**Last Updated**: ${new Date().toLocaleString()}
