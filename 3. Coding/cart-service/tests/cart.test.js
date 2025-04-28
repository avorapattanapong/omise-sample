import Cart from '../src/cart/cart.js';
import Freebie from "../src/cart/freebie.js";

describe('Cart Basic Functionality', () => {
    it("Creates a new cart. Expected: Cart is empty", () => {
        const cart = new Cart();
        expect(cart.items.size).toBe(0);
        expect(cart.freebieRules.length).toBe(0);
        expect(cart.freebieItems.size).toBe(0);
        expect(cart.discounts.size).toBe(0);
    });

    it("Adds new product. Expected: Product is added with correct quantity", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        expect(cart.items.get(productId).quantity).toBe(2);
        expect(cart.items.get(productId).product.getName()).toBe("iPhone 14");
    });

    it("Add same product again. Expected: Quantity increases properly", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        cart.addProduct(productId, 3);
        expect(cart.items.get(productId).quantity).toBe(5);
        expect(cart.items.get(productId).product.getName()).toBe("iPhone 14");
    });

    it("Update existing product quantity. Expected: Quantity is replaced correctly", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        cart.updateProduct(productId, 5);
        expect(cart.items.get(productId).quantity).toBe(5);
    });

    it("Update product with quantity = 0. Expected: Product is removed from cart", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        cart.updateProduct(productId, 0);
        expect(cart.items.has(productId)).toBe(false);
    });

    it("Update product that doesn't exist. Expected: Should throw error", () => {
       const cart = new Cart();
         const productId = "1";
         expect(() => {
             cart.updateProduct(productId, 5);
         }).toThrowError(`Product with ID ${productId} not found in cart.`);
    });

    it("Removes product with correct quantity. Expected: Product is removed successfully", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        cart.removeProduct(productId);
        expect(cart.items.has(productId)).toBe(false);
    });

    it("Remove non-existing product. Expected: Should log error but not crash", () => {
        const cart = new Cart();
        const productId = "1";

        expect(() => {
            cart.removeProduct(productId);
        }).toThrow("Product with ID 1 not found in cart.");
    });

    it("Destroy cart. Expected: Cart is empty", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        cart.addDiscount("SUMMER_SALE");
        cart.addFreebieRule(new Freebie("1", "2"));

        cart.destroyCart();
        expect(cart.items.size).toBe(0);
        expect(cart.freebieRules.length).toBe(0);
        expect(cart.freebieItems.size).toBe(0);
        expect(cart.discounts.size).toBe(0);
    });

});

describe('Cart Utility Functions', () => {
    it("isProductInCart returns true if product exists", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        expect(cart.isProductInCart(productId)).toBe(true);
    });

    it("isProductInCart returns false if product does not exist", () => {
        const cart = new Cart();
        const productId = "1";
        expect(cart.isProductInCart(productId)).toBe(false);
    });

    it("isCartEmpty returns true when cart is empty", () => {
        const cart = new Cart();
        expect(cart.isCartEmpty()).toBe(true);
    });

    it("isCartEmpty returns false when cart has products", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);
        expect(cart.isCartEmpty()).toBe(false);
    });

    it("getItems returns merged list (cart items + freebies)", () => {
        const cart = new Cart([new Freebie("1", "2")]);
        const productId = "1";
        cart.addProduct(productId, 2);

        expect(cart.getItems().get(productId).quantity).toBe(2);
        expect(cart.getItems().get("2").quantity).toBe(2);

    });

    it("getUniqueItemCounts returns correct unique count of merged items", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);

        expect(cart.getUniqueItemCounts()).toBe(1);
    });

    it("getTotalItemCount returns total quantity of merged items", () => {
        const cart = new Cart();
        const productId = "1";
        cart.addProduct(productId, 2);

        expect(cart.getTotalItemCount()).toBe(2);
    });
});

describe('Cart Freebie Functionality', () => {
    it("Add product that triggers freebie. Expected: Freebie is automatically added when adding trigger product", () => {
        const cart = new Cart([new Freebie("1", "2")]);
        const productId = "1";
        cart.addProduct(productId, 2);

        expect(cart.freebieItems.get("2").quantity).toBe(2);
        expect(cart.freebieItems.get("2").product.getName()).toBe("Wireless Headphones");
        expect(cart.items.get(productId).quantity).toBe(2);
        expect(cart.items.get(productId).product.getName()).toBe("iPhone 14");
    });

    it("Add multiple trigger products. Expected: Freebie quantity stacks if multiple triggers", () => {
        const cart = new Cart([
            new Freebie("1", "2"),
            new Freebie("4", "3")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        const macbookProductId = "4";
        cart.addProduct(macbookProductId, 1);

        expect(cart.freebieItems.get("2").quantity).toBe(2);
        expect(cart.freebieItems.get("2").product.getName()).toBe("Wireless Headphones");
        expect(cart.items.get(iphoneProductId).quantity).toBe(2);
        expect(cart.items.get(iphoneProductId).product.getName()).toBe("iPhone 14");

        expect(cart.freebieItems.get("3").quantity).toBe(1);
        expect(cart.freebieItems.get("3").product.getName()).toBe("Charging Cable");
        expect(cart.items.get(macbookProductId).quantity).toBe(1);
        expect(cart.items.get(macbookProductId).product.getName()).toBe("MacBook Air");
    });

    it("Remove trigger product. Expected: Freebie quantity decreases accordingly or gets removed if no more triggers", () => {
        const cart = new Cart([
            new Freebie("1", "2"),
            new Freebie("4", "3")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        const macbookProductId = "4";
        cart.addProduct(macbookProductId, 1);

        cart.removeFreebieRule(cart.freebieRules[0]);
        expect(cart.freebieItems.has("2")).toBe(false);
    });

    it("Remove non-trigger product. Expected: Freebie should remain untouched", () => {
        const cart = new Cart([
            new Freebie("1", "2")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        const macbookProductId = "4";
        cart.addProduct(macbookProductId, 1);

        expect(cart.freebieItems.has("2")).toBe(true);

        cart.removeProduct(macbookProductId, 1);
        expect(cart.freebieItems.has("2")).toBe(true);
    });

    it("Remove freebie item manually. Expected: Freebie item is removed without affecting original cart items", () => {
        const cart = new Cart([
            new Freebie("1", "2")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        expect(cart.items.has(iphoneProductId)).toBe(true);
        expect(cart.freebieItems.has("2")).toBe(true);

        cart.removeFreebie("2");
        expect(cart.freebieItems.has("2")).toBe(false);
        expect(cart.items.has(iphoneProductId)).toBe(true);
    });

    it("Remove freebie that does not exist. Expected: Error is thrown", () => {
        const cart = new Cart([
            new Freebie("1", "2")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        expect(cart.items.has(iphoneProductId)).toBe(true);
        expect(cart.freebieItems.has("2")).toBe(true);

        expect(() => {
            cart.removeFreebie("3");
        }).toThrowError("Freebie product with ID 3 not found in cart.");
    });

    it("Add item with freebie to cart that already has that item. Expected: Additional freebie is added", () => {
        const cart = new Cart([
            new Freebie("1", "2")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 1);

        expect(cart.items.get(iphoneProductId).quantity).toBe(1);
        expect(cart.freebieItems.get("2").quantity).toBe(1);

        cart.addProduct(iphoneProductId, 1);
        expect(cart.items.get(iphoneProductId).quantity).toBe(2);
        expect(cart.freebieItems.get("2").quantity).toBe(2);
    });

    it("A cart with two products adding same freebie. Remove one of the product. Expected: Freebie quantity matching remaining product", () => {
        const cart = new Cart([
            new Freebie("1", "2"),
            new Freebie("4", "2")
        ]);
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 1);

        const macbookProductId = "4";
        cart.addProduct(macbookProductId, 1);

        expect(cart.items.get(iphoneProductId).quantity).toBe(1);
        expect(cart.items.get(macbookProductId).quantity).toBe(1);
        expect(cart.freebieItems.get("2").quantity).toBe(2);

        cart.removeProduct(macbookProductId, 1);
        expect(cart.items.get(iphoneProductId).quantity).toBe(1);
        expect(cart.items.has(macbookProductId)).toBe(false);
        expect(cart.freebieItems.get("2").quantity).toBe(1);
    });

});

describe('Cart Discount Handling', () => {
    it("Add a discount. Expected: Discount is added to the cart", () => {
        const cart = new Cart();
        cart.addDiscount("SUMMER_SALE");

        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        // 35000 * 2 = 70000.
        // After discount of 10% but max of 200, total should be 70000 - 200 = 69900
        expect(cart.calculateCartTotal()).toBe(69900);
    });

    it("Add duplicate discount. Expected: Error logged, duplicate prevented", () => {
        const cart = new Cart();
        cart.addDiscount("SUMMER_SALE");

        expect(() => {
            cart.addDiscount("SUMMER_SALE");
        }).toThrowError("Discount with name SUMMER_SALE already exists.");
    });

    it("Remove a discount. Expected: Discount is removed from cart", () => {
        const cart = new Cart();
        cart.addDiscount("SUMMER_SALE");

        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);

        // 35000 * 2 = 70000.
        // After discount of 10% but max of 100, total should be 70000 - 200 = 69900
        expect(cart.calculateCartTotal()).toBe(69900);

        cart.removeDiscount("SUMMER_SALE");

        // After removing discount, total should be 70000
        expect(cart.calculateCartTotal()).toBe(70000);
    });

    it("Remove non-existing discount. Expected: Should log error", () => {
        const cart = new Cart();
        expect(() => {
            cart.removeDiscount("SUMMER_SALE");
        }).toThrowError("Discount with name SUMMER_SALE not found.");
    });

    it("Calculate total without any discount. Expected: Total equals sum of products", () => {
        const cart = new Cart();
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);
        const macbookProductId = "4";
        cart.addProduct(macbookProductId, 1);

        // 35000 * 2 + 45000 = 115000
        expect(cart.calculateCartTotal()).toBe(115000);
    });

    it("Calculate total with fixed discount. Expected: Fixed amount is deducted correctly", () => {
        const cart = new Cart();
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);
        const macbookProductId = "4";
        cart.addProduct(macbookProductId, 1);

        // 35000 * 2 + 45000 = 115000
        expect(cart.calculateCartTotal()).toBe(115000);

        cart.addDiscount("WELCOME10");
        // 115000 - 200 = 114800
        expect(cart.calculateCartTotal()).toBe(114800);

    });

    it("Calculate total with percentage discount (within cap). Expected: Percentage discount applies", () => {
        const cart = new Cart();
        const iphoneProductId = "1";
        cart.addProduct(iphoneProductId, 2);
        cart.addDiscount("SUMMER_SALE");

        // 35000 * 2 = 70000.
        // After discount of 10% but max of 100, total should be 70000 - 100 = 69900
        expect(cart.calculateCartTotal()).toBe(69900);
    });

    it("Calculate total with percentage discount (over max cap). Expected: Discount capped at maximum", () => {
        const cart = new Cart();
        const chargingCableId = "3";
        cart.addProduct(chargingCableId, 2);
        cart.addDiscount("NEWYEAR2024");

        // 500 * 2 = 1000.
        // After discount of 50% but max of 2000, total should be 1000 - 500 = 500
        expect(cart.calculateCartTotal()).toBe(500);
    });

});
