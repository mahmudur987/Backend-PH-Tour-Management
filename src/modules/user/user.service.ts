import { IUSER } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (payload: IUSER) => {
  const result = await User.create(payload);
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
