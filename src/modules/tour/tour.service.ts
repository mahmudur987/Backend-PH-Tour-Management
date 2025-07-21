import AppError from "../../errorHandler/AppError";
import { Division } from "../division/division.model";
import { TourType } from "../tourType/tourType.model";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async (payload: ITour) => {
  const divisionExists = await Division.findById(payload.division);
  const tourTypeExists = await TourType.findById(payload.tourType);

  if (!divisionExists || !tourTypeExists) {
    throw new AppError(400, "Invalid division or tourType ID");
  }
  const result = await Tour.create(payload);
  return result;
};

// getAllTour
const getAllTour = async () => {
  const result = await Tour.find({});
  return result;
};

// getTour By Id

const getTourById = async (id: string) => {
  const result = await Tour.findById(id);
  return result;
};

export const TourService = {
  createTour,
  getAllTour,
  getTourById,
};
