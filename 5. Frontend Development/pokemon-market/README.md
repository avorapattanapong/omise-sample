# Pokemon Market

A React + Vite application that allows users to search for Pokémon and view their details. The app uses the [Pokémon API](https://pokeapi.co/) to fetch data.
The app also includes a simple cart system to manage Pokémon items.

---

## Description

This project simulates a **Pokemon Trading Card Store** where:
- Users can **add, update, and remove** Pokemon Cards.
- The **home page** displays a list of available cards.
- The list of cards can be **paginated, filtered, and searched** by name and set name.
- Cards can be added to the cart, update quantity, and removed from the cart.
- The **cart** appears as a **side drawer** that can be opened and closed.
- The **cart** can be emptied

---

## Assumptions

- There are large number of **Sets** and so instead of loading all possible sets, we allow uers to search by set name.


---

## Project Features

| Feature                      | Description                                                                                         |
|:-----------------------------|:----------------------------------------------------------------------------------------------------|
| Browse Pokemon Cards         | Home page lists available cards up to max page size. Cards contain picture, pokemon name, and price |
| Search and Filter Cards      | Set search by name or set. Filter by rarity or type                                                 |
| Add cards to cart            | There is a button to add the selected card to the cart                                              |
| Change the quantity of cards | Once added to cart, cards can change quantity in the cart                                           |
| Remove cards from the cart   | When quantity is set to 0, the card is removed from the cart                                        |
| Paginate                     | Users can paginate through list of cards                                                            |
| Clear cart                   | Empty the cart                                                                                      |

---

## Things to Note

- The page supports responsive design and works well on smaller screens.
- Filter dropdowns perform search when the user clicks away from the dropdown.
- The cart is a side drawer that can be opened and closed.
- The react project is built using Vite, auto reload is fast and crisp.

---

## Prerequisites

- Nodejs v22+
- npm v10+

---

## How to Run

### 1. Clone the repository

```bash
git clone <top-level-repo-url>
cd "5. Frontend Development/pokemon-market"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm run dev
```
Access the app at [http://localhost:5173](http://localhost:5173)

---

## What Could Be Improved

- The UI is not complete in terms of styling. There are still bugs to be fixed like button alignments.
- The color scheme is added through theming the ant design library to reduce custom css on components. However, with the time limit, the theme is not fully implemented.
- Custom CSS can be removed through the use of third party library like Tailwind CSS.
- The mockup design is not fit for ant design libraries. In the future, the mockup should be based on a popular library and suggested in the assignment.
- A loader should be added to the card list when the user is searching for a card.
- The theme and redux store provider component can be factored out into a ConfigProvider component. Where all configurations lives.
- Linting should be added to the project to ensure code quality.
- The project is missing component unit tests. Jest or react-testing-library can be used to test the components.
- Internationalization (i18n) can be added to the project to support multiple languages.
- Some boilerplate code from vite project generation can be cleaned up.
