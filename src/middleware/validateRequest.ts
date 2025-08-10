import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        zodSchema.parseAsync(JSON.parse(req.body.data));
      } else if (req.body) {
        zodSchema.parseAsync(req.body);
      }
      // req.body = await zodSchema.parseAsync(
      //   req.body.data ? JSON.parse(req.body.data) : req.body
      // );
      next();
    } catch (error) {
      next(error);
    }
  };
