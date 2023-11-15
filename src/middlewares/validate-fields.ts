// Import necessary modules and types from Express and express-validator.
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

// Define a middleware function called 'validateFields' that takes
// Request, Response, and NextFunction as arguments.
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
