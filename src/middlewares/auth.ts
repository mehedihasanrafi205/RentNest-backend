import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { UserRole } from "../generated/prisma/enums";


declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: UserRole;
      };
    }
  }
}

export const auth = (...requiredRole: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("You are not login please login to access this resource");
    }

    const verifiedToken = jwtUtils.verifiedToken(
      token,
      config.jwt_access_secret,
    );

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { email, name, id, role } = verifiedToken.data as JwtPayload;

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error(
        "Forbidden! you don't have permission to access this resource",
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found. please login again");
    }

    if (user.isBanned) {
      throw new Error(" You account has been blocked. please contact support");
    }

    req.user = {
      email,
      name,
      id,
      role,
    };

    next();
  });
};
