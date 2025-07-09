// @/app/api/user/get-user-by-id/[id]/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";
import { User } from "@/lib/models/User.model";
import { Device } from "@/lib/models/Device.model";

// Environment
import { envServer } from "@/lib/env/env.server";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // If token is valid, find admin
    const admin = await Admin.findById(verify.id);

    // If admin is not found, return error
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract id from params
    const { id } = await params;

    // Find users by name with fullName field for matching
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Attach devices array to each user
    const devices = await Device.find({ user: id, deleted: false });

    const usersWithDevices = {
      ...user.toJSON(),
      devices: [...devices],
    };

    // Return success response
    return NextResponse.json({
      message: "Users fetched successfully",
      user: usersWithDevices,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    // Return internal server error
    return NextResponse.json(
      { message: "Error while fetching users" },
      { status: 500 }
    );
  }
}
