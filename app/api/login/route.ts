// @/app/api/login/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";

// Environment
import { envServer } from "@/lib/env/env.server";

// Utility
import { parseJwtExpiry } from "@/lib/parseJwtExpiry";

export async function POST(req: NextRequest) {
  // Connect to database
  await connectToDatabase();

  try {
    // Parse credentials from request body
    const { userName, password } = await req.json();

    // Validate credentials
    if (!userName || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Look up admin by username
    const admin = await Admin.findOne({ userName });

    // If admin not found, return error
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    // Verify password
    const isMatch = await admin.verifyPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = admin.generateJWTToken();

    // Set token in HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: parseJwtExpiry(envServer.JWT_EXPIRES_IN),
    });

    // Return response
    return response;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
