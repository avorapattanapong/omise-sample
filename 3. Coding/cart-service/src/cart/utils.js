import productsData from '../resources/products.json' with { type: 'json' };
import discounts from '../resources/discounts.json' with { type: 'json' };
import Product from './product.js';
import Discount from './discount.js';

export const createProductFromId = (productId) => {
    const product = productsData[productId];
    return new Product(product.name, product.price, productId);
}

export const createDiscountFromName = (discountName) => {
    const discount = discounts[discountName];
    return new Discount(discount.name, discount.type, discount.amount, discount.maxAmount);
}
