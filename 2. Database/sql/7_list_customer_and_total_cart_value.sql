SELECT 
    c.name AS customer_name,
    SUM(ci.quantity * COALESCE(pv.price_override, p.base_price)) AS cart_total
FROM cart_items ci
JOIN customers c ON ci.customer_id = c.id
JOIN product_variants pv ON ci.variant_id = pv.id
JOIN products p ON pv.product_id = p.id
GROUP BY c.id;
