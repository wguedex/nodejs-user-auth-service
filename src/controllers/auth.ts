// Import the 'request' and 'response' objects from the 'express' library.
import { request, response } from "express";

// Import the 'User' model from '../models/user'.
import User from "../models/user";

// Import the 'bcryptjs' library for password hashing.
import bcryptjs from 'bcryptjs';

// Import a function to generate JSON Web Tokens (JWT).
import generateJWT from '../helpers/generate-JWT';

// Define a login route handler.
const login = async (req = request, res = response) => {

    // Extract 'email' and 'password' from the request body.
    const { email, password } = req.body;

    try {
        // Find a user by their email in the database.
        const user = await User.findOne({ email });

        // If no user is found with the provided email, respond with an error.
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            });
        }

        // Check if the user's status is active, if not, respond with an error.
        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct - status: false'
            });
        }

        // Verify the provided password against the stored hashed password.
        const validPassword = bcryptjs.compareSync(password, user.password);

        // If the password is invalid, respond with an error.
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        }

        // Generate a JSON Web Token (JWT) for the authenticated user.
        const token = await generateJWT(user.id);

        // Respond with the authenticated user and the generated token.
        res.json({
            user,
            token
        })

    } catch (error) {
        // Handle any unexpected errors and respond with a generic error message.
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator.'
        });
    }
}

// Export the 'login' route handler function for use in other parts of the application.
export default login; 
