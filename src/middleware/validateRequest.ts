import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    try {
      if (req.body.data) {
        req.body = await zodSchema.parseAsync(JSON.parse(req.body.data));
      } else if (req.body) {
        req.body = await zodSchema.parseAsync(req.body);
      }
      // req.body = await zodSchema.parseAsync(
      //   req.body.data ? JSON.parse(req.body.data) : req.body
      // );
      console.log(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
