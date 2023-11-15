import { response } from "express";
import { Request, Response, NextFunction } from "express";
   
/**
 * Admin Role Middleware
 *
 * This middleware checks if the authenticated user has an 'ADMIN_ROLE'.
 * It should be used in routes where administrative privileges are required.
 * Responds with a 401 Unauthorized error if the user does not have the admin role.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware to be executed.
 */
const isAdminRole = (req: Request, res: Response, next: NextFunction) => {

  const user = req.user as { role: string, name: string };
 
  if (!user) {
    return res.status(500).json({
      msg: "Trying to verify the role without validating the token first",
    });
  }
 
  if (user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${user.name} is not an administrator - Cannot do this`,
    });
  }

  next();
};

/**
 * Role-Based Access Middleware
 *
 * This middleware function checks if the authenticated user has any of the specified roles.
 * It is a flexible way to handle authorization for different user roles across various routes.
 * The middleware takes a list of roles and verifies if the authenticated user's role is included in this list.
 * If the user does not have the required role, it responds with a 401 Unauthorized error.
 * 
 * Usage:
 * - This middleware should be used in routes where specific role-based access is required.
 * - It can be customized by passing the required roles as arguments.
 * 
 * @param {...string[]} roles - An array of strings representing the roles allowed to access the route.
 * @returns Middleware function that can be used in route definitions.
 */
const hasRole = (...roles: string[]) => {
  return (req: Request, res: Response = response, next: NextFunction) => {
     
    const user = req.user as { role: string };

    if (!req.user) {
      return res.status(500).json({
        msg: "Trying to verify the role without validating the token first",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        msg: `The service requires one of these roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
};

export { isAdminRole, hasRole };
