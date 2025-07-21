import { string } from "zod";
import AppError from "../../errorHandler/AppError";
import { Division } from "../division/division.model";
import { TourType } from "../tourType/tourType.model";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createTour = async (payload: ITour) => {
  const divisionExists = await Division.findById(payload.division);
  const tourTypeExists = await TourType.findById(payload.tourType);

  if (!divisionExists || !tourTypeExists) {
    throw new AppError(400, "Invalid division or tourType ID");
  }
  const result = await Tour.create(payload);
  return result;
};

// // getAllTour
// const getAllTour = async (query: Record<string, string>) => {
//   const {
//     searchTerm,
//     sort,
//     fields,
//     page = 1,
//     limit = 10,
//     ...rest
//   } = query ? query : {};
//   const skip = (Number(page) - 1) * Number(limit);
//   const searchableFields = [
//     "title",
//     "description",
//     "location",
//     "division",
//     "tourType",
//   ];

//   const searchQuery: object = {
//     $or: searchableFields.map((field) => ({
//       [field]: {
//         $regex: searchTerm,
//         $options: "i",
//       },
//     })),
//   } as object;
//   const total = await Tour.countDocuments();
//   const meta = {
//     page: 1,
//     limit: 10,
//     total,
//   };
//   const result = await Tour.find(searchQuery)
//     .find(rest)
//     .sort(sort)
//     .select(fields)
//     .skip(Number(skip) as number)
//     .limit(Number(limit) as number);

//   return {
//     data: result,

//     meta,
//   };
// };
// getAllTour
const getAllTour = async (query: Record<string, string>) => {
  console.log(query);
  const queryBuilder = new QueryBuilder(Tour.find(), query);
  const tourSearchableFields = ["title", "description", "location"];
  const tours = queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  // const meta = await queryBuilder.getMeta()

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    meta,
    data,
  };
};

// getTour By Id

const getTourById = async (id: string) => {
  const result = await Tour.findById(id);
  return result;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const isTourExist = await Tour.findById(id);
  if (!isTourExist) {
    throw new AppError(400, "Tour not exist");
  }

  const result = await Tour.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id);
  return result;
};

export const TourService = {
  createTour,
  getAllTour,
  getTourById,
  updateTour,
  deleteTour,
};
