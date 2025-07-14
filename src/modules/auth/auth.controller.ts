/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import statusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsynch";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponce";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.credentialLogin(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Login successfully",
      data: result,
    });
  }
);

export const authController = {
  credentialLogin,
};
