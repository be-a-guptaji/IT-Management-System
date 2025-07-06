// @/lib/models/Device.Model.ts

// Mongoose
import mongoose, { Schema, Document, model } from "mongoose";

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
  }
);

// Create and export model
export default mongoose.models.User || model<IDevice>("Device", DeviceSchema);
