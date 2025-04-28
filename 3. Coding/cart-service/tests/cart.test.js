import Cart from '../src/cart/cart.js';

// Mock your utils (createProductFromId, createDiscountFromName)
jest.mock('../src/cart/utils.js', () => ({
    createProductFromId: (id) => ({ id, price: 100 }),
    createDiscountFromName: (name) => ({
        getDiscountedPrice: (total) => 10,
    }),
}));

describe('Cart Basic Functionality', () => {
    test('should add a new product', () => {
        const cart = new Cart();
        cart.addProduct(1, 2);
        expect(cart.isProductInCart(1)).toBe(true);
        expect(cart.getTotalItemCount()).toBe(2);
    });

    test('should update product quantity', () => {
        const cart = new Cart();
        cart.addProduct(1, 2);
        cart.updateProduct(1, 5);
        expect(cart.getTotalItemCount()).toBe(5);
    });

    test('should remove product', () => {
        const cart = new Cart();
        cart.addProduct(1, 2);
        cart.removeProduct(1);
        expect(cart.isProductInCart(1)).toBe(false);
    });
});

describe('Cart Freebie Functionality', () => {
    // You'd mock freebie rules too and test freebie logic
});

describe('Cart Discount Handling', () => {
    // Mock discounts and test calculation
});
