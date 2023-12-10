# Simple Authentication Application using Node.js and TypeScript with JWT

This guide will explain how to create a simple authentication application using Node.js, TypeScript, and JSON Web Tokens (JWT).

## Purpose

The main goal of this application is to enable users to register, log in, and access protected resources by verifying their identity using JSON Web Tokens (JWT).

## Key Components

1. **User Registration and Login:**
   - Users can register by providing necessary details (e.g., username, email, password).
   - Upon registration, passwords are securely hashed and stored in the database.
   - Registered users can then log in using their credentials.

2. **JWT Generation and Validation:**
   - Upon successful login, the server generates a JWT containing user identification information and a signature.
   - This token is sent back to the client and stored (usually in local storage or cookies) for subsequent authenticated requests.
   - For each request to access protected resources, the token is sent in the request header.
   - The server verifies the token's authenticity and validity using the secret key (or public key in asymmetric encryption).

3. **Authentication Middleware:**
   - Middleware functions intercept incoming requests to protected routes.
   - They check for the presence of the JWT in the request header and verify its validity before allowing access to the requested resource.

## Implementation

1. **Server Setup:**
   - Create an `app.ts` file to set up your Express server.
   - Define routes for user registration, login, and protected routes.

2. **User Model and Controller:**
   - Create a `user.ts` model with necessary user fields.
   - Implement methods in the `authController.ts` file for user authentication and authorization using JWT.

3. **Authentication Middleware:**
   - Implement middleware (`authenticationMiddleware.ts`) to check JWT tokens on protected routes.

4. **Handling JWT:**
   - Use the `jsonwebtoken` package to generate JWT tokens upon successful login and validate them for authorized routes.

5. **Password Hashing:**
   - Utilize `bcrypt` to securely hash and store user passwords in the database.

6. **Environment Variables:**
   - Store sensitive data like the JWT secret key in a `.env` file.

## Running the Application

You can start the application using `npm start` or `yarn start` to launch the application in development mode.

## Conclusion

You've created a basic authentication application using Node.js, TypeScript, and JWT! You can expand upon this basic setup to add more features and enhance your authentication system.
