/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import statusCode from "http-status-codes";
import { useServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await useServices.createUser(req.body);
    res
      .status(statusCode.CREATED)
      .json({ message: "user created", data: result });
  } catch (error: any) {
    console.error(error);
    // res.status(200).json({ message: error.message, data: null });
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await useServices.getAllUsers();
    res
      .status(statusCode.CREATED)
      .json({ message: "user created", data: result });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  getAllUsers,
};
