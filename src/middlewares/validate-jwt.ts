import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user-model';
import config from '../config/config'; // Import the configuration object

interface CustomJwtPayload extends JwtPayload {
    uid: string; // Add the 'uid' property to the JWT payload
}

/**
 * JWT Validation Middleware
 *
 * This middleware is responsible for validating JSON Web Tokens included in the request headers.
 * It ensures that the token is valid, corresponds to an existing user, and that the user is active.
 * If the validation fails, it responds with a 401 Unauthorized error.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware to be executed.
 */
const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(token, config.PRIVATEKEYSECRET as string) as CustomJwtPayload;

        // Retrieve the user corresponding to the uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user does not exist in the DB'
            });
        }

        // Check if the user ID in the request parameters matches the authenticated user's ID
        if (req.params.id !== uid) {
            return res.status(401).json({
                msg: 'Unauthorized - You are not allowed to perform this operation'
            });
        }

        // Verify if the user's status is true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - user with status: false'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
};

export default validateJWT ;
