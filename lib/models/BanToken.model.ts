// @lib/models/BanToken.model.ts

// Mongoose
import mongoose, { Document, Schema, Model } from "mongoose";

// Utility
import { parseJwtExpiry } from "@/lib/parseJwtExpiry";

// Server Environment Variables
import { envServer } from "@/lib/env/env.server";

// Document interface
export interface IBanToken extends Document {
  token: string;
}

// Schema definition
const BanTokenSchema = new Schema<IBanToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Auto-remove expired tokens using MongoDB TTL index
BanTokenSchema.index(
  { token: 1 },
  { expireAfterSeconds: parseJwtExpiry(envServer.JWT_EXPIRES_IN) }
);

// Export model
export const BanToken: Model<IBanToken> =
  mongoose.models.BanToken ||
  mongoose.model<IBanToken>("BanToken", BanTokenSchema);
