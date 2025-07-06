// @/app/api/auth/verify/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";

// Server Environment Variables
import { envServer } from "@/lib/env/env.server";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

// Utility
import { parseJwtExpiry } from "@/lib/parseJwtExpiry";

export async function POST(req: NextRequest) {
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

    // If token is banned, return error`
    if (bannedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ban the token
    await BanToken.create({
      token: oldToken,
      expiresAt: new Date(
        Date.now() + parseJwtExpiry(envServer.JWT_EXPIRES_IN) * 1000
      ),
    });

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
    const response = NextResponse.json({
      message: "Login successful",
      admin: admin.userName,
    });
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
