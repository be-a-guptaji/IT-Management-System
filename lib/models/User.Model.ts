// @lib/models/User.Model.ts

// Mongoose
import mongoose, { Schema, Document, Model, model } from "mongoose";

// Define User document interface
export interface IUser extends Document {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  designation: string;
  para: number;
  deleted: boolean;
}

// Define schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    para: {
      type: Number,
      required: true,
      min: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export model
export const User: Model<IUser> =
  mongoose.models.User || model<IUser>("User", UserSchema);
