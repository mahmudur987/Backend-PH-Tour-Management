import { Division } from "./division.model";
import { IDivision } from "./division.interface";
<<<<<<< HEAD
import AppError from "../../errorHandler/AppError";

const createDivisions = async (division: IDivision) => {
=======

export const createDivisions = async (division: IDivision) => {
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9
  const result = await Division.create(division);
  return result;
};

const getAllDivisions = async () => {
  const result = await Division.find({});
  return result;
};
<<<<<<< HEAD
const getDivisionById = async (id: string) => {
=======
const getDivisionById = async (id) => {
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9
  const result = await Division.findById(id);
  return result;
};

export const divisionServices = {
  createDivisions,
  getAllDivisions,
  getDivisionById,
<<<<<<< HEAD
  updateDivisions,
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9
};
