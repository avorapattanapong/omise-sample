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
