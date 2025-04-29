-- Insert customers
INSERT INTO customers (name, email, age, gender, location)
VALUES 
('Alice Smith', 'alice@example.com', 28, 'Female', 'New York'),
('Bob Johnson', 'bob@example.com', 35, 'Male', 'Los Angeles');

-- Insert categories
INSERT INTO categories (name)
VALUES 
('Clothing'),
('Shoes'),
('Accessories');

-- Insert products
INSERT INTO products (name, description, base_price)
VALUES 
('Basic T-Shirt', 'Comfortable cotton T-shirt', 20.00),
('Running Shoes', 'Lightweight running shoes', 80.00);

-- Link products to categories
INSERT INTO product_category (product_id, category_id)
VALUES 
(1, 1), -- Basic T-Shirt -> Clothing
(2, 2); -- Running Shoes -> Shoes

-- Insert product variants
INSERT INTO product_variants (product_id, color, size, stock_quantity, price_override, sku)
VALUES 
(1, 'Red', 'M', 100, NULL, 'TSHIRT-RED-M'),
(1, 'Blue', 'L', 50, NULL, 'TSHIRT-BLUE-L'),
(2, 'Black', '9', 30, NULL, 'SHOES-BLK-9'),
(2, 'White', '10', 20, 85.00, 'SHOES-WHT-10'); -- Overridden price

-- Insert cart items
INSERT INTO cart_items (customer_id, variant_id, quantity)
VALUES 
(1, 1, 2),  -- Alice: 2 Red Medium T-shirts
(1, 3, 1),  -- Alice: 1 pair Black Shoes size 9
(2, 4, 1);  -- Bob: 1 pair White Shoes size 10
