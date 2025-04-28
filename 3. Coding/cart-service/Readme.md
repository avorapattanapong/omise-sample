# Cart Service

A Node.js project that implements a **shopping cart service**, built on **node 22+**.

The service supports basic cart operations, freebie rules, and discount application.  
It is fully covered by unit tests using **Jest**, with test coverage reports available.

---

## Description

This project simulates a **shopping cart system** where:
- Users can **add, update, and remove** products.
- **Freebie rules** are triggered when certain products are added.
- **Discounts** (fixed and percentage-based) can be applied.
- The cart **merges freebie and paid items** for a final view.
- The cart **calculates total cost** after applying all discounts.

---

## Assumptions

- **Products** and **Discounts** are loaded from static JSON files.
- **Freebie rules** are defined when initializing the cart.
- **Validation** (e.g., negative quantities, invalid IDs) is minimal and based on console logging.
- **No database or storage** is used; everything is in-memory.
- **Price fetching** is simplified — based on static sample data.
- **UpdateProduct** function is not allowed to create products. Updating missing product will throw error.
- **Class Variables** are accessible from outside the class. Users are expected to use functions instead of class variables directly.

---

## Project Features

| Feature               | Description                                                                                                |
|:----------------------|:-----------------------------------------------------------------------------------------------------------|
| Add Product           | Add a product to the cart by ID                                                                            |
| Update Product        | Update product quantity (absolute update)                                                                  |
| Remove Product        | Remove product from cart by ID                                                                             |
| Add Freebie           | Auto-add free product when trigger product is added                                                        |
| Remove Freebie        | Auto-remove freebie if trigger is removed                                                                  |
| Multi-Product Freebie | Same freebie product can be added from multiple product. When product is removed, Freebie is auto-adjusted |
| List Items            | Get a combined list of paid and freebie items                                                              |
| Apply Discounts       | Apply fixed or percentage-based discounts                                                                  |
| Remove Discounts      | Remove discount by name                                                                                    |
| Calculate Total       | Calculate total cart value after discounts                                                                 |
| Utilities             | Check cart emptiness, item counts                                                                          |
| Unit Tests            | Full coverage using Jest                                                                                   |
| Test Coverage         | Jest generates coverage report (HTML + text)                                                               

---

## Things to Note

- The **cart tracks paid products and freebies separately**, then merges when needed.
- **Discounts are cumulative** — multiple discounts can be applied at once.
- **Percentage discounts** have optional **maximum caps**.
- **Freebies do not affect the total price** — their quantity affects the item list only.
- Some functions log errors to console when operations fail (e.g., removing non-existing products).

---

## Prerequisites

- Nodejs v22+
- npm v10+

---

## How to Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd cart-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

Run the index.js to see cart service at a glance with common operations:

```bash
npm run app
```

### 4. Run tests with coverage
```bash
npm run test
```

---

## What Could Be Improved

- Validations such as names, IDs, and quantities.
- Persistence: Save cart state in a database or local file.
- Freebie Management: Allow more complex conditions (e.g., buy 2 get 1 free).
- Discount Prioritization: Support setting discount priorities or exclusivity.
- Per item discount
- Better Error Handling: Throw typed custom exceptions instead of console errors.
- When adding freebie rules, eligible items must be verified that they aren't already redeemed the freebie
