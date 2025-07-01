// @app/api/login/route.ts

// Response
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  return new NextResponse("Login route called");
}
