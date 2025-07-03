// @app/api/login/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";

// Environment
import { envServer } from "@/lib/env/env.server";

// Utility
import { parseJwtExpiry } from "@/lib/parseJwtExpiry";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

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

export async function GET(req: NextRequest) {
  // Connect to database
  await connectToDatabase();

  try {
    // Get token from cookie
    const oldToken = req.cookies.get("token")?.value;

    // If no token, return error
    if (!oldToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if token is already banned
    const bannedToken = await BanToken.findOne({ token: oldToken });
    console.log(bannedToken);

    // If token is banned, return error`
    if (bannedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ban the token
    await BanToken.create({ token: oldToken });

    // Verify token
    const verify = jwt.verify(oldToken, envServer.JWT_SECRET) as JwtPayload;

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
    console.error("JWT verification error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
