import { Division } from "./division.model";
import { IDivision } from "./division.interface";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

export const createDivisions = async (division: IDivision) => {
  const result = await Division.create(division);
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

const updateDivision = async (id: string, payload: IDivision) => {
  const divisionExists = await Division.findById(id);
  if (!divisionExists) {
    throw new Error("Division not found");
  }

  if (payload.thumbnail && divisionExists.thumbnail) {
    await deleteImageFromCLoudinary(divisionExists.thumbnail as string);
  }

  const result = await Division.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDivision = async (id: string) => {
  const divisionExists = await Division.findById(id);
  if (!divisionExists) {
    throw new Error("Division not found");
  }

  const result = await Division.findByIdAndDelete(id);
  return result;
};

export const divisionServices = {
  createDivisions,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};
