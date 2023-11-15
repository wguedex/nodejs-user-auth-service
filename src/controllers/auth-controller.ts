/**
 * Authentication Controllers
 * 
 * This file contains controllers for handling user authentication within the application.
 * It includes controllers for standard email/password login and for login via Google's OAuth service.
 * These controllers are responsible for verifying user credentials, managing user sessions,
 * and generating JSON Web Tokens (JWT) for authenticated sessions.
 * 
 * Controllers:
 * - login: Authenticate users with email and password, generate a JWT upon successful login.
 * - googleSignIn: Authenticate users via Google ID token, create a new user if not existing,
 *   and generate a JWT for the authenticated session.
 * 
 * The controllers ensure that user authentication is handled securely, efficiently, and
 * in compliance with best practices for modern web applications.
 */


// Import the 'request' and 'response' objects from the 'express' library.
import { request, response } from "express";

// Import the 'User' model from '../models/user'.
import User from "../models/user-model";

// Import the 'bcryptjs' library for password hashing.
import bcryptjs from 'bcryptjs';

// Import a function to generate JSON Web Tokens (JWT).
import generateJWT from '../helpers/jwt-helper';
import  googleVerify from '../helpers/google-verify';

/**
 * Login Controller
 * 
 * Handles user authentication using email and password. This controller is responsible for
 * validating the user's credentials, checking their active status, and generating a JWT token
 * upon successful authentication.
 * 
 * @param {Request} req - The request object containing the user's email and password.
 * @param {Response} res - The response object used for sending back the JWT token or error messages.
 */
export const login = async (req = request, res = response) => {

    // Extract 'email' and 'password' from the request body.
    const { email, password } = req.body;

    try {
        // Find a user by their email in the database.
        const user = await User.findOne({ email });

        if (user && user.google) {
            return res.status(400).json({
                msg: "This user is registered through Google. Please use Google Sign-In."
            });
        }

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

/**
 * Google Sign-In Controller
 * 
 * Manages user authentication using Google ID token. This controller validates the ID token,
 * checks if a user already exists with the given email, and if not, creates a new user.
 * A JWT token is generated for the authenticated user.
 * 
 * @param {Request} req - The request object containing the Google ID token.
 * @param {Response} res - The response object used for sending back the JWT token or error messages.
 */
export const googleSignIn = async (req = request, res = response) => {
  
    const {id_token} = req.body; 

    try {
        let { email, name, img } = await googleVerify( id_token );
 
        console.log(email)
        console.log(name)
        console.log(img)

        let user = await User.findOne({ email });
 
        if ( !user ) {
            // I need to create a user  
            const data = {
                email,
                name,  
                role: 'USER_ROLE',
                img,
                google: true
            };

            user = new User( data );
            await user.save();
        }

        // If the user is in the database
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Speak with the administrator, user is blocked'
            });
        }
 
        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Google Token is not valid'
        })

    }
 
}
