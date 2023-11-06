const Role = require('../models/role');
const User = require('../models/user');

// Check if the provided role is valid
const isRoleValid = async (role : String) => {

    const existingRole = await Role.findOne({ role });
    if (!existingRole) {
        throw new Error(`The role ${role} is not registered in the database`);
    }

}

// Check if the provided email already exists
const emailExists = async ( email : String ) => {

    // Check if the email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new Error(`The email: ${email} is already registered`);
    }

}

// Check if a user with the provided ID exists
const userExistsById = async ( id: String ) => {

    // Check if a user with the provided ID exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
        throw new Error(`The ID does not exist: ${id}`);
    }

}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById
}
