// @lib/models/BanToken.model.ts

// Mongoose
import mongoose, { Document, Schema, Model } from "mongoose";

// Document interface
export interface IBanToken extends Document {
  token: string;
  expiresAt: Date;
}

// Schema definition
const BanTokenSchema = new Schema<IBanToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index on 'expiresAt'
BanTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Export model
export const BanToken: Model<IBanToken> =
  mongoose.models.BanToken ||
  mongoose.model<IBanToken>("BanToken", BanTokenSchema);
