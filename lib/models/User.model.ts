// @/lib/models/User.model.ts

import mongoose, {
  Schema,
  Document,
  Model,
  model,
  Types,
  HydratedDocument,
} from "mongoose";

// Define User document interface
export interface IUser extends Document {
  name: {
    firstName: string;
    middleName?: string;
    lastName?: string;
  };
  designation: string;
  para: number;
  deleted: boolean;
}

// Define schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      firstName: { type: String, required: true, trim: true },
      middleName: { type: String, trim: true },
      lastName: { type: String, trim: true },
    },
    designation: { type: String, required: true, trim: true },
    para: { type: Number, required: true, min: 1 },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (
        doc: HydratedDocument<IUser>,
        ret: Record<string, unknown>
      ) => {
        if (ret._id && typeof ret._id === "object" && "toString" in ret._id) {
          ret.id = (ret._id as Types.ObjectId).toString();
          delete ret._id;
        }
      },
    },
  }
);

// Create and export model
export const User: Model<IUser> =
  mongoose.models.User || model<IUser>("User", UserSchema);
