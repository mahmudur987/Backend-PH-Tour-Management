import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHandler/AppError";
import updateImages from "../../utils/updateImages";
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
const updateTour = async (id: string, payload: ITour) => {
  const existingTour = await Tour.findById(id);
  if (!existingTour) {
    throw new AppError(404, "Tour not found");
  }
  payload.images = updateImages(
    existingTour?.images || [],
    payload?.images || [],
    payload.deleteImages || []
  );

  const result = await Tour.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCLoudinary(url))
    );
  }
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
  updateTour,
};
