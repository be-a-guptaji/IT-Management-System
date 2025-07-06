// @/app/api/get-users/route.ts

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

// Types
import { IUser } from "@/lib/models/User.model";

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

    // If token is banned, return error`
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

    // Get all the Users
    const rawUsers = await User.find({ deleted: false });

    // Attach device count to each user
    const usersWithDeviceCount = await Promise.all(
      rawUsers.map(async (user) => {
        const devices = await Device.find({ user: user._id });
        return {
          ...user.toObject(),
          devices: [...devices],
        };
      })
    );

    // Return success message
    return NextResponse.json({
      message: "Users fetched successfully",
      users: usersWithDeviceCount,
    });
  } catch {
    // If error, return 500
    return NextResponse.json(
      { message: "Error while fetching users" },
      { status: 500 }
    );
  }
}
