// @/lib/models/Device.model.ts

import mongoose, {
  Schema,
  Document,
  Model,
  model,
  Types,
  HydratedDocument,
} from "mongoose";

// Define Device document interface
export interface IDevice extends Document {
  user: Types.ObjectId;
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
      transform: (
        doc: HydratedDocument<IDevice>,
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
export const Device: Model<IDevice> =
  mongoose.models.Device || model<IDevice>("Device", DeviceSchema);
