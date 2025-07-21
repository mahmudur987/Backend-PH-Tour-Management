import { model, Schema } from "mongoose";
import { ITour } from "./tour.interface";

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
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

export const Tour = model<ITour>("Tour", tourSchema);
