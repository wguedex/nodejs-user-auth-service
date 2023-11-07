// Import the 'Router' class from the 'express' framework.
import { Router } from 'express';

// Import the 'getUsers' function from the 'users' controller.
const { getUsers, 
        getUserById, 
        createUser, 
        updateUser, 
        deleteUser } = require('../controllers/users');

import validateJWT from '../middlewares/validate-jwt';

const { validateFields,
        hasRole
    } = require('../middlewares');

import { isRoleValid, emailExists, userExistsById  } from '../helpers/db-validators';

const { check } = require('express-validator'); 

// Create a new instance of the 'Router' class.
const router = Router();

// Define a route to handle GET requests to the root path ('/').
// It uses the 'getUsers' function from the controller to handle the request.
router.get('/', getUsers);

// Define a route to handle GET requests to '/api/users/:id'.
// It uses the 'getUserById' function from the controller to handle the request.
router.get('/:id', [
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom(userExistsById),
        check('role').custom(isRoleValid),
        validateFields
    ], getUserById);
    
// Define a route to handle POST requests to '/api/users'.
// It uses the 'createUser' function from the controller to handle the request.
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        check('email', 'Email is not valid').isEmail(),
        check('email').custom(emailExists),
        check('role').custom(isRoleValid),
        validateFields
    ], createUser);
    
// Define a route to handle PUT requests to '/api/users/:id'.
// It uses the 'updateUser' function from the controller to handle the request.
router.put('/:id', 
[
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( userExistsById ),
        check('rol').custom( isRoleValid ), 
        validateFields
],
updateUser);

// Define a route to handle DELETE requests to '/api/users/:id'.
// It uses the 'deleteUser' function from the controller to handle the request.
router.delete('/:id', [
        validateJWT, 
        hasRole('ADMIN_ROLE', 'OTHER_ROLE'),
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( userExistsById ),
        validateFields
], deleteUser);

// Export the 'router' instance to make it available for use in other parts of the application.
module.exports = router;
