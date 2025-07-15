import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";

import AppError from "../errorHandler/AppError";
import jwt from "jsonwebtoken";
import { jwtSecrete } from "../modules/auth/auth.service";
import { IsActive, Role } from "../modules/user/user.interface";
import statusCode from "http-status-codes";
import { User } from "../modules/user/user.model";
export const verifyAdmin =
  (...authRole: String[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
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

      const isUserExist = await User.findOne({ email: tokenVerify.email });

      if (!isUserExist) {
        throw new AppError(statusCode.BAD_REQUEST, "Email not exist");
      }
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(statusCode.BAD_REQUEST, "user blocked");
      }
      if (isUserExist.isDeleted) {
        throw new AppError(statusCode.BAD_REQUEST, "user deleted");
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
