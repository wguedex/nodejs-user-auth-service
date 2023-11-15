import Role from '../models/role-model';
import User from '../models/user-model';

/**
 * Check if Role is Valid
 * 
 * Validates whether the given role exists in the database. This function is used to ensure
 * that only valid roles are assigned to users.
 * 
 * @param {String} role - The role to be validated.
 * @throws {Error} Throws an error if the role does not exist in the database.
 */
const isRoleValid = async (role : String) => {

    const existingRole = await Role.findOne({ role });
    if (!existingRole) {
        throw new Error(`The role ${role} is not registered in the database`);
    }

}

/**
 * Check if Email Already Exists
 * 
 * Validates whether the given email is already registered in the database. This is
 * crucial for avoiding duplicate user registrations and maintaining unique user identities.
 * 
 * @param {String} email - The email to be checked.
 * @throws {Error} - Throws an error if the email is already registered.
 */
const emailExists = async ( email : String ) => {

    // Check if the email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new Error(`The email: ${email} is already registered`);
    }

}

/**
 * Check if User Exists by ID
 * 
 * Validates whether a user with the given ID exists in the database. This function
 * is used to verify the existence of a user before performing operations that require
 * a valid user reference.
 * 
 * @param {String} id - The ID of the user to be checked.
 * @throws {Error} - Throws an error if no user exists with the given ID.
 */
const userExistsById = async ( id: String ) => {

    // Check if a user with the provided ID exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
        throw new Error(`The ID does not exist: ${id}`);
    }

}

export { isRoleValid, emailExists, userExistsById };
