# Node.js User Authentication Service

This repository contains a Node.js-based authentication service designed to handle user authentication with JWT (JSON Web Tokens). It is built with Express.js and uses MongoDB as the data store through Mongoose.

## Features

- User registration and authentication.
- Password encryption with bcryptjs.
- JWT-based user session management.
- Middleware for route protection based on JWT.
- Express Validator for input validation.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/nodejs-user-auth.git](https://github.com/wguedex/nodejs-user-auth-service.git)https://github.com/wguedex/nodejs-user-auth-service.git
cd nodejs-user-auth-service
npm install

## Configuration
Create a .env file in the root directory and add the following environment-specific variables:
```bash
MONGODB_URI=<uri>/<db>
MONGODB_USER= 
MONGODB_PASSWORD= 
PRIVATEKEYSECRET= 
