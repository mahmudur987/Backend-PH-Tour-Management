/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsynch";
import { divisionServices } from "./division.services";
import sendResponse from "../../utils/sendResponse";
import statusCode from "http-status-codes";
import { IDivision } from "./division.interface";
const createDivisions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path,
    };

    const result = await divisionServices.createDivisions(payload);
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

export const divisionController = {
  createDivisions,
  getAllDivisions,
  getDivisionById,
};
