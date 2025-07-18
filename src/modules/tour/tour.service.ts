import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async (payload: ITour) => {
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
