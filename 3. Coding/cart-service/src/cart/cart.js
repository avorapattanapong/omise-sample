import {
    createDiscountFromName, createProductFromId
} from "./utils.js";

class Cart {
    constructor(freebieRules = []) {
        this.items = new Map(); // { productId: { product, quantity } }
        // Track freebie items separately
        this.freebieItems = new Map(); // { productId: { product, quantity } }

        this.discounts = new Map(); // { discountName: Discount }
        this.freebieRules = freebieRules; // array of Freebie rules
    }

    // Basic Functionality
    addProduct(productId, quantity = 1) {
        const product = createProductFromId(productId);
        // Apply Freebie rules
        this.applyFreebie(product);

        // Add product to cart
        if (this.items.has(productId)) {
            this.items.get(productId).quantity += quantity;
        } else {
            this.items.set(productId, { product, quantity });
        }
    }

    addFreebie(productId, quantity = 1) {
        // Add product to freebie items
        if (this.freebieItems.has(productId)) {
            this.freebieItems.get(productId).quantity += quantity;
        } else {
            const product = createProductFromId(productId);
            this.freebieItems.set(productId, { product, quantity });
        }
    }

    removeProduct(productId) {
        if (this.items.has(productId)) {
            const removedQuantity = this.items.get(productId).quantity;
            this.items.delete(productId);

            // Check if the product is a freebie
            for (const rule of this.freebieRules) {
                if (rule.triggerProductId === productId) {
                    if (this.freebieItems.get(rule.freeProductId).quantity -  removedQuantity <= 0) {
                        this.removeFreebie(rule.freeProductId);
                    } else {
                        this.freebieItems.get(rule.freeProductId).quantity -= removedQuantity;
                    }
                }
            }
        } else {
            console.error(`Product with ID ${productId} not found in cart.`);
        }
    }

    removeFreebie(productId) {
        if (this.freebieItems.has(productId)) {
            this.freebieItems.delete(productId);
        } else {
            console.error(`Freebie product with ID ${productId} not found in cart.`);
        }
    }

    updateProduct(productId, quantity) {
        if (this.items.has(productId)) {
            if (quantity > 0) {
                this.items.get(productId).quantity = quantity;
            } else {
                this.removeProduct(productId);
            }
        } else {
            console.error(`Product with ID ${productId} not found in cart.`);
        }
    }

    // Utilities
    isProductInCart(productId) {
        return this.items.has(productId);
    }

    isCartEmpty() {
        // No need to merge freebie items, you can't have freebie items without a paid item
        return this.items.size === 0;
    }

    getItems() {
        // Items to be paid for and freebie items are tracked separately
        // Here we combine them for the final cart view
        return this.mergeItemList();
    }

    getUniqueItemCounts() {
        return this.mergeItemList().size;
    }

    mergeItemList () {
        const allItems = new Map(this.items);
        for (const [productId, { product, quantity }] of this.freebieItems) {
            if (allItems.has(productId)) {
                allItems.get(productId).quantity += quantity;
            } else {
                allItems.set(productId, { product, quantity });
            }
        }
        return allItems;
    }

    getTotalItemCount() {
        const mergedItems = this.mergeItemList();
        let totalCount = 0;
        for (const { quantity } of mergedItems.values()) {
            totalCount += quantity;
        }
        return totalCount;
    }

    // Discounts
    addDiscount(discountName) {
        const discount = createDiscountFromName(discountName);
        if (this.discounts.has(discountName)) {
            console.error(`Discount with name ${discountName} already exists.`);
        } else {
            this.discounts.set(discountName, discount);
        }
    }

    removeDiscount(discountName) {
        if (this.discounts.has(discountName)) {
            this.discounts.delete(discountName);
        } else {
            console.error(`Discount with name ${discountName} not found.`);
        }
    }

    calculateCartTotal() {
        console.log("Cart total calculation started");
        let total = 0;
        for (const { product, quantity } of this.items.values()) {
            total += product.price * quantity;
        }

        let discountTotal = 0;
        // Apply discounts
        for (const discount of this.discounts.values()) {
            console.log("discount: ", discount);
            discountTotal += discount.getDiscountedPrice(total);
        }

        return total - discountTotal;
    }

    applyFreebie(addedProduct) {
        for (const rule of this.freebieRules) {
            if (rule.isEligible(addedProduct)) {
                this.addFreebie(rule.freeProductId);
            }
        }
    }

    addFreebieRule(freebieRule) {
        this.freebieRules.push(freebieRule);
    }
}

export default Cart;
