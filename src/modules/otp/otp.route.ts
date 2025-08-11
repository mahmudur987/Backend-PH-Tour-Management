// src/modules/otp/otp.routes.ts
import express, { Request, Response, NextFunction } from "express";
import { OTPController } from "./otp.controller";

const router = express.Router();

router.post("/send", (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required" });
  }
  OTPController.sendOTP(req, res, next);
});
router.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and otp are required" });
  }
  OTPController.verifyOTP(req, res, next);
});

export const OtpRoutes = router;
