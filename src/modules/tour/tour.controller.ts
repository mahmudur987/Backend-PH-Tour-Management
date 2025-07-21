/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsynch";
import { TourService } from "./tour.service";
import statusCode from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.createTour(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour created successfully",
      data: result,
    });
  }
);
const getAllTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.getAllTour(
      req.query as Record<string, string>
    );
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour retrieve successfully",
      data: result,
    });
  }
);
const getTourById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.getTourById(req.params.id);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour retrieve successfully",
      data: result,
    });
  }
);
const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.updateTour(req.params.id, req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour update successfully",
      data: result,
    });
  }
);
const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.updateTour(req.params.id, req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour Delete successfully",
      data: result,
    });
  }
);

export const tourController = {
  createTour,
  getAllTour,
  getTourById,
  updateTour,
  deleteTour,
};
