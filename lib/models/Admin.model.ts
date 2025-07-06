// @/lib/models/Admin.model.ts

// Mongoose
import mongoose, { Document, Model, Schema } from "mongoose";

// BCrypt
import bcrypt from "bcrypt";

// Server Environment Variables
import { envServer } from "@/lib/env/env.server";

// JWT
import jwt from "jsonwebtoken";

const SALT_ROUNDS = envServer.SALT_ROUNDS;

// Define Admin document interface
export interface IAdmin extends Document {
  userName: string;
  password: string;
  setPassword(password: string): Promise<void>;
  verifyPassword(password: string): Promise<boolean>;
  generateJWTToken(): string;
}

// Define schema
const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method: Set and hash password
AdminSchema.methods.setPassword = async function (
  this: IAdmin,
  password: string
) {
  this.password = await bcrypt.hash(password, SALT_ROUNDS);
};

// Method: Compare password
AdminSchema.methods.verifyPassword = async function (
  this: IAdmin,
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

// Method: Generate JWT
AdminSchema.methods.generateJWTToken = function (this: IAdmin) {
  // @/ts-expect-error
  return jwt.sign({ id: this._id }, envServer.JWT_SECRET, {
    expiresIn: envServer.JWT_EXPIRES_IN,
  });
};

// Create and export model
export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
