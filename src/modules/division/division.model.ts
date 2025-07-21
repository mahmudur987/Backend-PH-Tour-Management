import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

divisionSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const baseSlug = this.name.toLowerCase().split(" ").join("-") + "-division";
    let slug = baseSlug;
    let counter = 1;

    // Avoid infinite loop by checking from a clean baseSlug each time
    while (await Division.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }

  next();
});
divisionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IDivision>;

  if (update?.name) {
    const baseSlug =
      update.name.toLowerCase().split(" ").join("-") + "-division";
    let slug = baseSlug;
    let counter = 1;

    while (await Division.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    update.slug = slug;
    this.setUpdate(update); // Apply the modified update object
  }

  next();
});

export const Division = model<IDivision>("Division", divisionSchema);
