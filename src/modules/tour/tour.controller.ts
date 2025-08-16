/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsynch";
import { TourService } from "./tour.service";
import statusCode from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      ...JSON.parse(req.body.data),
      images: (req.files as Express.Multer.File[])?.map((file) => file.path),
    };

    const result = await TourService.createTour(payload);
    // const result = await TourService.createTour(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour created successfully",
      data: result,
    });
  }
);

const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const payload = {
      ...JSON.parse(req.body.data),
      images: (req.files as Express.Multer.File[])?.map((file) => file.path),
    };
    console.log(payload);
    const result = await TourService.updateTour(id as string, payload);
    // const result = await TourService.createTour(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "tour updated successfully",
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
      data: result.data,
      meta: result.meta,
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

export const tourController = {
  createTour,
  getAllTour,
  getTourById,
  updateTour,
};
