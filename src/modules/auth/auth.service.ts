import AppError from "../../errorHandler/AppError";
import { IUSER } from "../user/user.interface";
import { User } from "../user/user.model";
import statusCode from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const jwtSecrete = "Ph-tour-Management Backend";
const credentialLogin = async (payload: Partial<IUSER>) => {
  const { email, password } = payload;

  const isEmailExist = await User.findOne({ email });

  if (!isEmailExist) {
    throw new AppError(statusCode.BAD_REQUEST, "Email not exist");
  }
  if (!password) {
    throw new AppError(statusCode.BAD_REQUEST, "provide your password");
  }
  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isEmailExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(statusCode.BAD_REQUEST, "Incorrect password");
  }
  const jwtPayload = {
    name: isEmailExist.name,
    email: isEmailExist.email,
    _id: isEmailExist._id,
    phone: isEmailExist.phone,
    role: isEmailExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, jwtSecrete, {
    expiresIn: "1d",
  });
  return {
    accessToken,
    isEmailExist,
  };
};

export const authServices = {
  credentialLogin,
};
