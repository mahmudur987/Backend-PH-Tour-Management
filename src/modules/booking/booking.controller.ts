/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsynch";
import { bookingService } from "./booking.service";

import statusCode from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { IUSER } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { _id } = req.user as JwtPayload;
    const result = await bookingService.createBooking(payload, _id);

    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "booking created successfully",
      data: result,
    });
  }
);
const getAllBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingService.getAllBooking();

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "booking retrieved successfully",
      data: result,
    });
  }
);

const getBookingById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await bookingService.getBookingById(id);

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "booking retrieved successfully",
      data: result,
    });
  }
);
const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await bookingService.updateBooking(id, payload);

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "booking updated successfully",
      data: result,
    });
  }
);

const getUserBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { _id }: any = req.user as IUSER;

    console.log(_id);

    const result = await bookingService.getUserBookings(_id);
    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "booking retrieved successfully",
      data: result,
    });
  }
);
const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await bookingService.deleteBooking(id);

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: "booking deleted successfully",
      data: result,
    });
  }
);
export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserBookings,
};
