class Freebie {
    constructor(triggerProductId, freeProductId) {
        this.triggerProductId = triggerProductId; // Product ID that triggers the freebie
        this.freeProductId = freeProductId; // Product ID of the freebie
    }

    isEligible(product) {
        return product.getId() === this.triggerProductId;
    }
}

export default Freebie;
