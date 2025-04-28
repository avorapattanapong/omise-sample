import { DISCOUNT_TYPES } from "./constants.js";

class Discount {
    constructor(name, type, value, maxValue) {
        this.name = name;
        this.type = type; // DISCOUNT_TYPES
        this.value = value; // e.g., 10 for 10% or $10
        this.maxValue = maxValue;
    }

    getDiscountedPrice(total) {
        let discountValue = 0
        if (this.type === DISCOUNT_TYPES.PERCENTAGE) {
            const rawDiscountedValue = total * (this.value / 100);
            if (this.maxValue) {
                discountValue = Math.min(rawDiscountedValue, this.maxValue);
            } else {
                discountValue = rawDiscountedValue;
            }
        } else if (this.type === DISCOUNT_TYPES.FIXED) {
            if (this.maxValue) {
                console.error("Max value is not applicable for fixed discount");
            } else {
                discountValue = this.value;
            }
        }
        return discountValue;
    }
}

export default Discount;
