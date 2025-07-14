import AppError from "../../errorHandler/AppError";
import { IAuthProvider, IUSER } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
export const createUser = async (payload: IUSER) => {
  const { email, password, ...rest } = payload;
  const hashedPassword = await bcrypt.hash(password as string, 8);
  const alreadyExist = await User.findOne({ email });

  if (alreadyExist) {
    throw new AppError(500, "user already exist");
  }
  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };

  const sendData = {
    ...rest,
    email,
    auths: [authProvider],
    password: hashedPassword,
  };

  const result = await User.create(sendData);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find({});
  return result;
};

export const useServices = {
  createUser,
  getAllUsers,
};
