import { model, Schema } from "mongoose";
import { ITour } from "./tour.interface";

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
<<<<<<< HEAD
    slug: { type: String, unique: true },
=======
    slug: { type: String, required: true, unique: true },
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
<<<<<<< HEAD
// Removed import of Tour to avoid merged declaration error

tourSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-") + "-tour";
    let slug = baseSlug;
    let counter = 1;

    while (await Tour.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }

  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ITour>;

  if (update?.title) {
    const baseSlug = update.title.toLowerCase().split(" ").join("-") + "-Tour";
    let slug = baseSlug;
    let counter = 1;

    while (await Tour.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    update.slug = slug;
    this.setUpdate(update); // Apply the modified update object
  }

  next();
});
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9

export const Tour = model<ITour>("Tour", tourSchema);
