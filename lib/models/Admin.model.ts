// @lib/models/Admin.model.ts

// models/Admin.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Define Admin document interface
export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  setPassword(password: string): Promise<void>;
  verifyPassword(password: string): Promise<boolean>;
}

// Define schema
const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

// Method: Set and hash password
AdminSchema.methods.setPassword = async function (this: IAdmin, password: string) {
  this.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
};

// Method: Compare password
AdminSchema.methods.verifyPassword = async function (this: IAdmin, password: string) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Create and export model
export const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
