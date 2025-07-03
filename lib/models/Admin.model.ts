// @lib/models/Admin.model.ts

// models/Admin.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { envServer } from "@/lib/env/env.server";

const SALT_ROUNDS = envServer.SALT_ROUNDS;

// Define Admin document interface
export interface IAdmin extends Document {
  userName: string;
  password: string;
  setPassword(password: string): Promise<void>;
  verifyPassword(password: string): Promise<boolean>;
}

// Define schema
const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

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

// Create and export model
export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
