import { Router } from 'express';
import { check } from 'express-validator';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user-controller';

import validateJWT from '../middlewares/validate-jwt';
import validateFields from '../middlewares/validate-fields';
import { hasRole } from '../middlewares/validate-roles';
import { isRoleValid, emailExists, userExistsById } from '../helpers/db-validators';

const router = Router();

/**
 * Route to get a list of users.
 * GET /api/users
 */
router.get('/', getUsers);

/**
 * Route to get a user by ID.
 * GET /api/users/:id
 * - Validates that the ID is a valid MongoDB ID.
 * - Checks if the user exists by ID.
 */
router.get('/:id', [
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(userExistsById),
  validateFields,
], getUserById);

/**
 * Route to create a new user.
 * POST /api/users
 * - Validates user data including name, password, email, and role.
 * - Checks if the email already exists.
 * - Validates the role.
 */
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(emailExists),
  check('role').custom(isRoleValid),
  validateFields,
], createUser);

/**
 * Route to update a user by ID.
 * PUT /api/users/:id
 * - Validates that the ID is a valid MongoDB ID.
 * - Checks if the user exists by ID.
 * - Validates the role.
 */
router.put('/:id', [
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(userExistsById),
  check('role').custom(isRoleValid),
  validateFields,
], updateUser);

/**
 * Route to delete a user by ID.
 * DELETE /api/users/:id
 * - Requires JWT authentication.
 * - Checks user roles to ensure access.
 * - Validates that the ID is a valid MongoDB ID.
 * - Checks if the user exists by ID.
 */
router.delete('/:id', [
  validateJWT,
  hasRole('ADMIN_ROLE', 'OTHER_ROLE'),
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(userExistsById),
  validateFields,
], deleteUser);

// Export the 'router' instance to make it available for use in other parts of the application.
module.exports = router;
