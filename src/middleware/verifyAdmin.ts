import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";

import AppError from "../errorHandler/AppError";
import jwt from "jsonwebtoken";
import { jwtSecrete } from "../modules/auth/auth.service";
import { Role } from "../modules/user/user.interface";

export const verifyAdmin =
  (...authRole) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, "Unauthenticated user");
      }

      const tokenVerify: jwt.JwtPayload = jwt.verify(
        token,
        jwtSecrete
      ) as jwt.JwtPayload;

      if (!tokenVerify) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Admin verification failed for token"
        );
      }
      if (!authRole.includes(tokenVerify.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Unauthenticated user");
      }
      req.user = tokenVerify;
      next();
    } catch (error) {
      next(error);
    }
  };
