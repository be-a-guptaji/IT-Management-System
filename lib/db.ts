// @lib/db.ts

import mongoose from "mongoose";
import { env } from "@/lib/enviormentVariables";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${env.MONGODB_URI}${env.DB_NAME}` as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
