import { ITourType } from "./tourType.interface";
import { TourType } from "./tourType.model";

const createTourType = async (payload: ITourType) => {
  const result = await TourType.create(payload);
  return result;
};

const getAllTourType = async () => {
  const result = await TourType.find({});
  return result;
};

const updateTourTypeById = async (id: string, payload: Partial<ITourType>) => {
  const result = await TourType.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTourTypeById = async (id: string) => {
  const result = await TourType.findByIdAndDelete(id);
  return result;
};

const getTourTypeById = async (id: string) => {
  const result = await TourType.findById(id);
  return result;
};
export const tourTypeServices = {
  createTourType,
  getAllTourType,
  updateTourTypeById,
  deleteTourTypeById,
  getTourTypeById,
};
