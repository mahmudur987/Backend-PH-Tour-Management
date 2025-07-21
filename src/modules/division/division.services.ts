import { Division } from "./division.model";
import { IDivision } from "./division.interface";
import AppError from "../../errorHandler/AppError";

const createDivisions = async (division: IDivision) => {
  const result = await Division.create(division);
  return result;
};

const updateDivisions = async (id: string, division: IDivision) => {
  const isDivisionExist = await Division.findById(id);
  if (!isDivisionExist) {
    throw new AppError(400, "Division not exist");
  }

  const isNameExist = await Division.findOne({
    name: division.name,
    _id: { $ne: id },
  });
  if (isNameExist) {
    throw new AppError(400, "Name already Exist");
  }

  const result = await Division.findByIdAndUpdate(id, division, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllDivisions = async () => {
  const result = await Division.find({});
  return result;
};
const getDivisionById = async (id: string) => {
  const result = await Division.findById(id);
  return result;
};

export const divisionServices = {
  createDivisions,
  getAllDivisions,
  getDivisionById,
  updateDivisions,
};
