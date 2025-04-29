SELECT 
    p.name AS product_name,
    pv.color,
    pv.size,
    pv.stock_quantity
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
WHERE pv.stock_quantity < 25;
