import { Router } from 'express'; // Import the Router from 'express'

const validateFields = require('../middlewares/validate-fields');
const { check } = require('express-validator');
const login = require('../controllers/auth');

const router = Router(); // Create an instance of the Express Router

// Define a POST route for user login
router.post('/login', [
  // Check if the 'email' field is mandatory and should be an email
  check('email', 'Email is required').isEmail(),

  // Check if the 'password' field is mandatory and should not be empty
  check('password', 'Password is required').not().isEmpty(),

  // Validate fields (assuming there's a 'validateFields' function)
  validateFields,
], login);

module.exports = router; // Export the router for use in other parts of your application
