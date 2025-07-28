import AppError from "../../errorHandler/AppError";
import { IAuthProvider, IsActive, IUSER } from "../user/user.interface";
import { User } from "../user/user.model";
import statusCode from "http-status-codes";
import bcrypt from "bcryptjs";

import { createUserToken } from "../../utils/createUserToken";
import { JwtPayload, verify } from "jsonwebtoken";
import { envVariables } from "../../config/env.config";

export const jwtSecrete = "Ph-tour-Management Backend";
const credentialLogin = async (payload: Partial<IUSER>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(statusCode.BAD_REQUEST, "Email not exist");
  }
  if (!password) {
    throw new AppError(statusCode.BAD_REQUEST, "provide your password");
  }
  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(statusCode.BAD_REQUEST, "Incorrect password");
  }
  const jwtPayload = {
    name: isUserExist.name,
    email: isUserExist.email,
    _id: isUserExist._id,
    phone: isUserExist.phone,
    role: isUserExist.role,
  };

  const Token = createUserToken(jwtPayload);

  return {
    accessToken: Token.accessToken,
    refreshToken: Token.refreshToken,
    user: isUserExist,
  };
};
const getNewAccessToken = async (refreshToken: string) => {
  const verifyRefreshToken = verify(
    refreshToken,
    envVariables.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  console.log(verifyRefreshToken, refreshToken);

  if (!verifyRefreshToken) {
    throw new AppError(500, "Refresh token not exist");
  }
  const isUserExist = await User.findOne({ email: verifyRefreshToken.email });

  if (!isUserExist) {
    throw new AppError(statusCode.BAD_REQUEST, "Email not exist");
  }
  if (
    isUserExist.isActive === IsActive.BLOCKED ||
    isUserExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(statusCode.BAD_REQUEST, "user bloked");
  }
  if (isUserExist.isDeleted) {
    throw new AppError(statusCode.BAD_REQUEST, "user deleted");
  }

  const jwtPayload = {
    name: isUserExist.name,
    email: isUserExist.email,
    _id: isUserExist._id,
    phone: isUserExist.phone,
    role: isUserExist.role,
  };

  const Token = createUserToken(jwtPayload);

  return {
    accessToken: Token.accessToken,
  };
};
export const setPassword = async (userId: string, plainPassword: string) => {
  // Step 1: Find user by decoded token ID
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(statusCode.NOT_FOUND, "User not found.");
  }
  if (
    user.password &&
    user.auths?.some((providerObject) => providerObject.provider === "google")
  ) {
    throw new AppError(
      statusCode.BAD_REQUEST,
      "you should login by google and set password for credential."
    );
  }

  // Step 4: Hash new password and update user
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const auths = [
    ...(user.auths as IAuthProvider[]),
    { provider: "credential", providerId: user.email as string },
  ];

  user.password = hashedPassword;
  user.auths = auths;
  await user.save();

  return {
    message: "Password has been set successfully.",
  };
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  // Step 1: Find user by decoded token ID
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new AppError(statusCode.NOT_FOUND, "User not found.");
  }

  // Step 2: Compare old password
  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(statusCode.UNAUTHORIZED, "Old password is incorrect.");
  }

  // Step 3: Check if new password is same as old password
  const isSameAsOld = await bcrypt.compare(
    newPassword,
    user.password as string
  );
  if (isSameAsOld) {
    throw new AppError(
      statusCode.BAD_REQUEST,
      "New password must be different from the old password."
    );
  }

  // Step 4: Hash new password and update user
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return {
    message: "Password has been reset successfully.",
  };
};
export const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  // Step 1: Find user by decoded token ID
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new AppError(statusCode.NOT_FOUND, "User not found.");
  }

  // Step 2: Compare old password
  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(statusCode.UNAUTHORIZED, "Old password is incorrect.");
  }

  // Step 3: Check if new password is same as old password
  const isSameAsOld = await bcrypt.compare(
    newPassword,
    user.password as string
  );
  if (isSameAsOld) {
    throw new AppError(
      statusCode.BAD_REQUEST,
      "New password must be different from the old password."
    );
  }

  // Step 4: Hash new password and update user
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return {
    message: "Password has been reset successfully.",
  };
};
export const authServices = {
  credentialLogin,
  getNewAccessToken,
  resetPassword,
  changePassword,
  setPassword,
};
