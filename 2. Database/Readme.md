# Database Design Document

## Introduction

This document presents the database design for an online store based on the given requirements.  
It includes both the initial approach and the evolved version after considering future scalability and flexibility.

---

## Initial Design

### Design Overview

The initial design focuses on satisfying the basic requirements with minimal complexity.

**Tables:**
- `customers`: Stores customer information (age, gender, location).
- `products`: Stores product details.
- `cart_items`: Stores items added to carts by customers.

### Reasoning

- **Simplicity**: Easy to implement and understand.
- **Fulfills basic needs**: Customers can add products to their cart.
- **Composite primary key** (`customer_id`, `product_id`) ensures one cart entry per customer-product pair.

### Limitations

- **Product Variations**: Cannot distinguish different versions (e.g., color, size) of the same product.
- **Many-to-Many Category Relation**: Products could belong to multiple categories, not handled here.
- **Scalability**: Difficult to extend for stock management, promotions, or more advanced features later.
- **Flexibility**: If a product has multiple sellable options, this structure struggles.

---

## Evolved Design

After deeper analysis, the design was enhanced to address the limitations of the initial version.

### Design Overview

**Additional Tables Introduced:**
- `categories`: To store product categories.
- `product_category`: Join table for products and categories.
- `product_variants`: To manage product variations like color and size.
- `cart_items`: Updated to link to `product_variants` instead of `products`.

### Assumptions
- **Product Variants**: Each product can have multiple variants (e.g., different colors or sizes).
- Products are based on clothing, which often have multiple variations.

### Things to improve
- **Product Variants**: when override_price is null, fallback to base_price should be enforced through a function.
- Add functions / views to create efficient queries for common operations (e.g., fetching all products in a category, checking stock levels).

**ER Diagram:**

![ER Diagram](ER%20Diagram.png)

## Final Thoughts

While the initial design is suitable for very simple stores without product variations, the evolved design is more appropriate for real-world use cases, offering better flexibility, scalability, and customer experience.

Thus, the **evolved design** is recommended for implementation.

---

# MySQL Schema

```sql
-- Set default database character set
CREATE DATABASE IF NOT EXISTS online_store
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE online_store;

-- Customers table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Product Variants table
CREATE TABLE product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    color VARCHAR(100),
    size VARCHAR(100),
    stock_quantity INT DEFAULT 0,
    price_override DECIMAL(10,2),
    sku VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Product Categories (Join table)
CREATE TABLE product_category (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Cart Items
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;
```

---

# ✅ Notes
- `ON DELETE CASCADE` ensures if a product/customer is deleted, related cart entries or variant entries are cleaned up automatically.
- `ENUM` type is used for gender for simplicity; could be normalized if desired.
- `price_override` is nullable — if NULL, fallback to `products.base_price`; should be enforced in a function.
- `location` in `customers` is a string representing a city or region; could be normalized into a separate table if needed.

---

# Testing

## Pre-requisites
- MySQL Workbench or any MySQL client.
- MySQL server running.

## Steps
1. Create the database with 1_create_db_schema.sql
2. Run 2_insert_sample_data.sql to populate the tables with sample data.
3. Run the rest of the scripts in order in the sql directory.

## Sample Data

2_insert_sample_data.sql

```sql
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
```

## Queries

### Selects all customers from the database.
3_current_queries.sql

```sql
SELECT * FROM customers;
```

### Lists a product with its variants.
4_list_a_product_variants.sql

```sql
SELECT 
    pv.id,
    p.name AS product_name,
    pv.color,
    pv.size,
    pv.stock_quantity,
    COALESCE(pv.price_override, p.base_price) AS effective_price
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
WHERE p.name = 'Basic T-Shirt';
```

### List all products in a customer's cart.
5_list_products_in_customer_cart.sql

```sql
SELECT 
    c.name AS customer_name,
    p.name AS product_name,
    pv.color,
    pv.size,
    ci.quantity,
    COALESCE(pv.price_override, p.base_price) AS price_per_unit,
    ci.quantity * COALESCE(pv.price_override, p.base_price) AS total_price
FROM cart_items ci
JOIN customers c ON ci.customer_id = c.id
JOIN product_variants pv ON ci.variant_id = pv.id
JOIN products p ON pv.product_id = p.id
WHERE c.name = 'Alice Smith';
```

### List product with a low stock
6_list_low_stock_product.sql

```sql
SELECT 
    p.name AS product_name,
    pv.color,
    pv.size,
    pv.stock_quantity
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
WHERE pv.stock_quantity < 25;
```

### List all customers and their cart value
7_list_customer_and_total_cart_value.sql

```sql
SELECT 
    c.name AS customer_name,
    SUM(ci.quantity * COALESCE(pv.price_override, p.base_price)) AS cart_total
FROM cart_items ci
JOIN customers c ON ci.customer_id = c.id
JOIN product_variants pv ON ci.variant_id = pv.id
JOIN products p ON pv.product_id = p.id
GROUP BY c.id;
```

### List all products in a category
8_list_products_by_category_name.sql

```sql
SELECT 
	p.name as product_name,
    c.name as category_name
FROM products p
JOIN product_category pc ON pc.product_id = p.id
JOIN categories c ON pc.category_id = c.id
WHERE c.name = "Clothing";
```
