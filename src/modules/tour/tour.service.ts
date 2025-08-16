import { excludeField } from "../../app/constants";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHandler/AppError";
import { QueryBuilder, tourSearchableFields } from "../../utils/QueryBuilder";
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
const getAllTour = async (query: Record<string, string>) => {
  console.log(query);
  const filter = query;
  const searchTerm = query.searchTerm || "";
  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  //field fitlering
  const fields = query.fields?.split(",").join(" ") || "";

  //old field => title,location
  //new fields => title location

  // delete filter["searchTerm"]
  // delete filter["sort"]

  for (const field of excludeField) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete filter[field];
  }

  console.log(filter);

  const searchQuery = {
    $or: tourSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  };

  const filterQuery = Tour.find(filter);

  const tours = filterQuery.find(searchQuery);

  const allTours = await tours
    .sort(sort)
    .select(fields)
    .skip(skip)
    .limit(limit);

  // location = Dhaka
  // search = Golf
  const totalTours = await Tour.countDocuments();
  // const totalPage = 21/10 = 2.1 => ciel(2.1) => 3
  const totalPage = Math.ceil(totalTours / limit);

  const meta = {
    page: page,
    limit: limit,
    total: totalTours,
    totalPage: totalPage,
  };
  return {
    data: allTours,
    meta: meta,
  };
};
// const getAllTour  = async (query: Record<string, string>) => {

//     const queryBuilder = new QueryBuilder(Tour.find(), query)

//     const tours = await queryBuilder
//         .search(tourSearchableFields)
//         .filter()
//         .sort()
//         .fields()
//         .paginate()

//     // const meta = await queryBuilder.getMeta()

//     const [data, meta] = await Promise.all([
//         tours.build(),
//         queryBuilder.getMeta()
//     ])

//     return {
//         data,
//         meta
//     }
// };
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
