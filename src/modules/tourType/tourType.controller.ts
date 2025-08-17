/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import statusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { tourTypeServices } from "./tourType.services";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeServices.createTourType(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Tour type created successfully",
      data: result,
    });
  }
);

const getAllTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeServices.getAllTourType(
      req.query as Record<string, string>
    );
    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Tour type fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);
const getTourTypeById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await tourTypeServices.getTourTypeById(id);
    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Tour type fetched successfully",
      data: result,
    });
  }
);

const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await tourTypeServices.updateTourTypeById(id, payload);
    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Tour type updated successfully",
      data: result,
    });
  }
);

const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await tourTypeServices.deleteTourTypeById(id);
    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "Tour type deleted successfully",
      data: result,
    });
  }
);

export const tourTypeController = {
  createTourType,
  getAllTourType,
  getTourTypeById,
  updateTourType,
  deleteTourType,
};
