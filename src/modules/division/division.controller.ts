/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsynch";
import { divisionServices } from "./division.services";
import sendResponse from "../../utils/sendResponse";
import statusCode from "http-status-codes";
const createDivisions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.createDivisions(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Division created successfully",
      data: result,
    });
  }
);
const getAllDivisions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.getAllDivisions();
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Division created successfully",
      data: result,
    });
  }
);
const getDivisionById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await divisionServices.getDivisionById(id);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Division created successfully",
      data: result,
    });
  }
);
<<<<<<< HEAD
const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const division = req.body;
    const result = await divisionServices.updateDivisions(id, division);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Division updated successfully",
      data: result,
    });
  }
);
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9

export const divisionController = {
  createDivisions,
  getAllDivisions,
  getDivisionById,
<<<<<<< HEAD
  updateDivision,
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9
};
