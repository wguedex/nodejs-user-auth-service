// Import the 'Router' class from the 'express' framework.
const { Router } = require('express'); 

// Import the 'getUsers' function from the 'users' controller.
const { getUsers } = require('../controllers/users');

// Create a new instance of the 'Router' class.
const router = Router();

// Define a route to handle GET requests to the root path ('/').
// It uses the 'getUsers' function from the controller to handle the request.
router.get('/', getUsers);

// Export the 'router' instance to make it available for use in other parts of the application.
module.exports = router;
