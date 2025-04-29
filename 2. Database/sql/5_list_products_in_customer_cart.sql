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
