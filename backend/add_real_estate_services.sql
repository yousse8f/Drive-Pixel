-- إضافة خدمات Real Estate IT Solutions كمنتجات في قاعدة البيانات
-- يجب تشغيل هذا السكريبت مرة واحدة فقط

-- 100% Sponsorship Plans
INSERT INTO products (name, description, price, category, is_active, availability)
VALUES 
('100% Sponsorship - Monthly', 'Full brand visibility and recognition with monthly subscription', 176.00, 'real-estate-services', true, 999),
('100% Sponsorship - 1-Year', 'Full brand visibility and recognition with 1-year subscription', 149.60, 'real-estate-services', true, 999),
('100% Sponsorship - 3-Year', 'Full brand visibility and recognition with 3-year subscription', 140.80, 'real-estate-services', true, 999),
('100% Sponsorship - 5-Year', 'Full brand visibility and recognition with 5-year subscription', 132.00, 'real-estate-services', true, 999);

-- IDX-DLFX Plans
INSERT INTO products (name, description, price, category, is_active, availability)
VALUES 
('IDX-DLFX - Monthly', 'Advanced property search functionality with monthly subscription', 90.00, 'real-estate-services', true, 999),
('IDX-DLFX - 1-Year', 'Advanced property search functionality with 1-year subscription', 82.00, 'real-estate-services', true, 999),
('IDX-DLFX - 3-Year', 'Advanced property search functionality with 3-year subscription', 76.50, 'real-estate-services', true, 999),
('IDX-DLFX - 5-Year', 'Advanced property search functionality with 5-year subscription', 72.00, 'real-estate-services', true, 999);

-- Website + E-Mail Plans
INSERT INTO products (name, description, price, category, is_active, availability)
VALUES 
('Website + E-Mail - Monthly', 'Professional website design and email hosting with monthly subscription', 160.00, 'real-estate-services', true, 999),
('Website + E-Mail - 1-Year', 'Professional website design and email hosting with 1-year subscription', 144.00, 'real-estate-services', true, 999),
('Website + E-Mail - 3-Year', 'Professional website design and email hosting with 3-year subscription', 136.00, 'real-estate-services', true, 999),
('Website + E-Mail - 5-Year', 'Professional website design and email hosting with 5-year subscription', 128.00, 'real-estate-services', true, 999);

-- 1 Creative Yard Post Sign Unit Plans
INSERT INTO products (name, description, price, category, is_active, availability)
VALUES 
('1 Creative Yard Post Sign Unit - Monthly', 'High-quality yard sign design with monthly subscription', 190.00, 'real-estate-services', true, 999),
('1 Creative Yard Post Sign Unit - 1-Year', 'High-quality yard sign design with 1-year subscription', 171.00, 'real-estate-services', true, 999),
('1 Creative Yard Post Sign Unit - 3-Year', 'High-quality yard sign design with 3-year subscription', 161.50, 'real-estate-services', true, 999),
('1 Creative Yard Post Sign Unit - 5-Year', 'High-quality yard sign design with 5-year subscription', 152.00, 'real-estate-services', true, 999);

-- 5 Creative Yard Post Sign Units Plans
INSERT INTO products (name, description, price, category, is_active, availability)
VALUES 
('5 Creative Yard Post Sign Units - Monthly', 'Bulk pricing for 5 yard signs with monthly subscription', 950.00, 'real-estate-services', true, 999),
('5 Creative Yard Post Sign Units - 1-Year', 'Bulk pricing for 5 yard signs with 1-year subscription', 855.00, 'real-estate-services', true, 999),
('5 Creative Yard Post Sign Units - 3-Year', 'Bulk pricing for 5 yard signs with 3-year subscription', 807.50, 'real-estate-services', true, 999),
('5 Creative Yard Post Sign Units - 5-Year', 'Bulk pricing for 5 yard signs with 5-year subscription', 760.00, 'real-estate-services', true, 999);

-- التحقق من إضافة المنتجات
SELECT name, price, category FROM products WHERE category = 'real-estate-services' ORDER BY name;
