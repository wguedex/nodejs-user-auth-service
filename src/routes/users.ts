// Import the 'Router' class from the 'express' framework.
const { Router } = require('express'); 

// Import the 'getUsers' function from the 'users' controller.
const { getUsers, 
        getUserById, 
        createUser } = require('../controllers/users');

// Create a new instance of the 'Router' class.
const router = Router();

// Define a route to handle GET requests to the root path ('/').
// It uses the 'getUsers' function from the controller to handle the request.
router.get('/', getUsers);

// Define a route to handle GET requests to '/api/users/:id'.
// It uses the 'getUserById' function from the controller to handle the request.
router.get('/:id', getUserById);

// Define a route to handle POST requests to '/api/users'.
// It uses the 'createUser' function from the controller to handle the request.
router.post('/', createUser);

// Export the 'router' instance to make it available for use in other parts of the application.
module.exports = router;
