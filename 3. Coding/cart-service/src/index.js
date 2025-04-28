import Cart from "./cart/cart.js";
import Freebie from "./cart/freebie.js";
import { createProductFromId } from "./cart/utils.js";

const iphoneProduct = createProductFromId("1");
const wirelessHeadPhonesProduct = createProductFromId("2");
const chargingCableProduct = createProductFromId("3");
const macbookProduct = createProductFromId("4");

const freebieRules = [
    new Freebie("1", "2"), // Buy iPhone, get Wireless Headphones
    new Freebie("4", "3")  // Buy Macbook, get Charging Cable
];

const cart = new Cart(freebieRules);
cart.addProduct(iphoneProduct.getId(), 3);
cart.addProduct(macbookProduct.getId(), 1);


// Cart Content: 3 Iphones, 3 wireless headphones, 1 Macbook, 1 charging cable
console.log("Cart Items:");
cart.getItems().forEach((item) => {
    console.log(item);
    console.log(`Product: ${item.product.getName()}, Quantity: ${item.quantity}`);
});

console.log("Is Cart Empty:", cart.isCartEmpty());
console.log("Is iphone in Cart:", cart.isProductInCart(iphoneProduct.getId()));

console.log("Unique Products in Cart:", cart.getUniqueItemCounts());

// 3 Iphones, 3 wireless headphones, 1 Macbook, 1 charging cable = 150,000
console.log("Total Price before discount:", cart.calculateCartTotal());

// Apply discount
cart.addDiscount("SUMMER_SALE");

// 150,000 - 10% (max of 100) = 149,900
console.log("Total Price after discount:", cart.calculateCartTotal());

cart.addDiscount("WELCOME10");
// 149,900 - 200 = 149,700
console.log("Total Price after second discount:", cart.calculateCartTotal());

// update cart
cart.updateProduct(iphoneProduct.getId(), 1);

// Cart Content: 1 Iphones, 1 wireless headphones, 1 Macbook, 1 charging cable
console.log("Updated Cart Items:");
cart.getItems().forEach((item) => {
    console.log(`Product: ${item.product.getName()}, Quantity: ${item.quantity}`);
});

cart.removeProduct(iphoneProduct.getId());

// Cart Content: 1 Macbook, 1 charging cable
console.log("Cart Items after removing iPhone:");
cart.getItems().forEach((item) => {
    console.log(`Product: ${item.product.getName()}, Quantity: ${item.quantity}`);
});
