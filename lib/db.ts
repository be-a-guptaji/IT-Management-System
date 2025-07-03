// @lib/db.ts

import mongoose from "mongoose";
import { envServer } from "@/lib/env/env.server";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `${envServer.MONGODB_URI}${envServer.DB_NAME}` as string
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
