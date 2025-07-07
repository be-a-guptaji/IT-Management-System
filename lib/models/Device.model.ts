// @/lib/models/Device.Model.ts

// Mongoose
import mongoose, { Schema, Document, model, Model } from "mongoose";

// Define User document interface
export interface IDevice extends Document {
  user: Schema.Types.ObjectId;
  deviceName: string;
  macAddress: string;
  ipAddress: string;
  serialNumber: string;
  deleted: boolean;
}

// Define schema
const DeviceSchema: Schema<IDevice> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
      trim: true,
    },
    macAddress: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    serialNumber: {
      type: String,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

// Create and export model
export const Device: Model<IDevice> =
  mongoose.models.Device || model<IDevice>("Device", DeviceSchema);
