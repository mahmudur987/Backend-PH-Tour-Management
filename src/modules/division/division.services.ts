import { Division } from "./division.model";
import { IDivision } from "./division.interface";

export const createDivisions = async (division: IDivision) => {
  const result = await Division.create(division);
  return result;
};

const getAllDivisions = async () => {
  const result = await Division.find({});
  return result;
};
const getDivisionById = async (id) => {
  const result = await Division.findById(id);
  return result;
};

export const divisionServices = {
  createDivisions,
  getAllDivisions,
  getDivisionById,
};
