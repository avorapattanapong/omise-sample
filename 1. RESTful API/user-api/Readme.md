# User API – Omise Sample Project

This project is a RESTful API designed to manage user data, developed as part of an interview assignment. It demonstrates backend development skills, including API design, validation, and testing, using modern JavaScript technologies.

## Features

- **User Management**: Create, retrieve, update, and delete user records.
- **Validation**: Implements input validation to ensure data integrity.
- **Modular Architecture**: Organized codebase with separation of concerns across middleware, models, services, and routes.
- **Testing**: Includes a Postman collection for API testing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/avorapattanapong/omise-sample.git
   cd omise-sample/1. RESTful API/user-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run app
   ```

The API will be accessible at `http://localhost:3000`.

4. Import the Postman collection located in the `test` folder to test the API endpoints.

5. Create an environment in PostMan and add the following variables:

   - `baseUrl`: `http://localhost:3000/api`


## Limitations

- **Linting**: Linting is not currently configured.
- **Error Handling**: Error messages can be improved for better UI integration.
- **Testing**: Lacks unit tests; only a Postman collection is available for manual testing.
- **Authentication**: Uses a custom implementation for token exchange and validation; integrating a third-party library is recommended.
- **Postman Collection**: Can be enhanced to automate tests with prerequisite setups.
- **Validation**: Email uniqueness is not enforced during user creation.
- **Versioning**: API versioning is not implemented.
