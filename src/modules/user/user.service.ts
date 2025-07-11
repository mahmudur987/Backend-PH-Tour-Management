import { IUSER } from "./user.interface";
import { User } from "./user.model";

export  const user = payload;
  const result = await User.create(user);
  return result;
};

 const getAllUsers = async () => {
  const result = await User.find({});
  return result;
};



export const useServices={
  createUser,
  getAllUsers
}


