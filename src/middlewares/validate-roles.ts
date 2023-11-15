import { response } from "express";
import { Request, Response, NextFunction } from "express";

const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.params;

  if (!user) {
    return res.status(500).json({
      msg: "Trying to verify the role without validating the token first",
    });
  }

  const { role, name } = req.params;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not an administrator - Cannot do this`,
    });
  }

  next();
};

const hasRole = (...roles: string[]) => {
  return (req: Request, res: Response = response, next: NextFunction) => {
    const user = req.params;

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
