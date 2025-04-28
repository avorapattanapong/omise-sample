class Product {
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        this.id = id;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
}

export default Product;
