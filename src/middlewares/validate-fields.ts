// Import necessary modules and types from Express and express-validator.
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

/**
 * Field Validation Middleware
 *
 * This middleware is responsible for validating request fields using express-validator.
 * It checks for any validation errors and, if found, responds with a 400 Bad Request status,
 * providing details about the validation errors. If no errors are found, it allows
 * the request to proceed to the next middleware in the stack.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware to be executed.
 */
const validateFields = (req: Request, res: Response, next: NextFunction) => {
 
    // Use express-validator's 'validationResult' function to check for validation errors.
    const errors = validationResult(req);
 
    // If there are validation errors, send a response with a 400 (Bad Request) status
    // and an error message in JSON format.
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Bad Request' });
    }

    // If there are no validation errors, proceed to the next middleware.
    next();
};

// Export the 'validateFields' function for use in other parts of the application.
export default validateFields;
