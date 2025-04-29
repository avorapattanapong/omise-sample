SELECT 
	p.name as product_name,
    c.name as category_name
FROM products p
JOIN product_category pc ON pc.product_id = p.id
JOIN categories c ON pc.category_id = c.id
WHERE c.name = "Clothing";