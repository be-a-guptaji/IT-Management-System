// @app/api/login/route.ts

// Response
import { NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";

export async function POST() {
  await connectToDatabase();

  const admin = new Admin({ userName: "admin" });
  await admin.setPassword("admin");
  await admin.save();

  return new NextResponse("Login route called");
}
