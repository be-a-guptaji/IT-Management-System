// @/app/api/settings/change-password/route.ts

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

export async function POST(req: NextRequest) {
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

    // If token is banned, return error
    if (bannedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    let verify: JwtPayload;
    try {
      verify = jwt.verify(token, envServer.JWT_SECRET) as JwtPayload;
    } catch {
      // If token is invalid, return error
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract oldPassword, newPassword, and confirmPassword from request body
    const { oldPassword, newPassword, confirmPassword } = await req.json();

    // Check if the data is present in the request body
    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirm password do not match" },
        { status: 400 }
      );
    }

    // If token is valid, find admin
    const admin = await Admin.findById(verify.id);

    // If admin is not found, return error
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify current password
    const isMatch = await admin.verifyPassword(oldPassword);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update password
    await admin.setPassword(newPassword); // ensure setPassword is awaited
    await admin.save();

    // Return success message
    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    // If error, return 500
    return NextResponse.json(
      {
        message: "Error while updating password",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
