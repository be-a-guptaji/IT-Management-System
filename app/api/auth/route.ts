// @app/api/auth/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";

// Environment
import { envServer } from "@/lib/env/env.server";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // Connect to database
  await connectToDatabase();

  try {
    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    // If no token, return error
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if token is already banned
    const bannedToken = await BanToken.findOne({ token });

    // If token is banned, return error`
    if (bannedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const verify = jwt.verify(token, envServer.JWT_SECRET) as JwtPayload;

    // If token is invalid, return error
    if (!verify) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // If token is valid, find admin
    const admin = await Admin.findById(verify.id);

    // If admin is not found, return error
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Return success message
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
