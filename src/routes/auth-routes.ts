/**
 * Authentication Routes
 * 
 * This file contains the routes for user authentication in the application.
 * It includes routes for handling traditional email/password login as well
 * as login via Google's authentication service.
 * 
 * Routes:
 * - POST /api/auth/login: Authenticates a user using their email and password.
 *   Validates the input fields and then utilizes the 'login' controller.
 * - POST /api/auth/google: Authenticates a user using a Google ID token.
 *   Validates the ID token and then utilizes the 'googleSignIn' controller.
 * 
 * Each route uses express-validator for validating request fields and a 
 * custom middleware 'validateFields' to handle any validation errors,
 * ensuring the integrity and security of the authentication process.
 */


import { Router } from 'express';
import { check }  from 'express-validator'; 
import {login, googleSignIn} from '../controllers/auth-controller';
import validateFields  from '../middlewares/validate-fields';

const router = Router();

/**
 * POST /api/auth/login
 * Route for user login using email and password.
 * Validates the email and password fields before calling the login controller.
 */
router.post('/login', [
  // Check if the 'email' field is mandatory and should be an email
  check('email', 'Email is required').isEmail(),

  // Check if the 'password' field is mandatory and should not be empty
  check('password', 'Password is required').not().isEmpty(),

  // Validate fields (assuming there's a 'validateFields' function)
  validateFields,
], login);
 
/**
 * POST /api/auth/google
 * Route for user login using Google authentication.
 * Validates the presence of an ID token before calling the googleSignIn controller.
 */
router.post('/google', [
  // Check if the 'email' field is mandatory and should be an email
  check('id_token', 'ID token is required').not().isEmpty(),
 
  // Validate fields (assuming there's a 'validateFields' function)
  validateFields,
], googleSignIn);
 
module.exports = router; // Export the router for use in other parts of your application
 