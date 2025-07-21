import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsynch";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponce";
import statusCode from "http-status-codes";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await bookingService.createBooking(payload);

    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "booking created successfully",
      data: result,
    });
  }
);

export const bookingController = {
  createBooking,
};
