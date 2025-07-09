// @/app/api/get-users/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";
import { User } from "../../../../lib/models/User.model";
import { Device } from "@/lib/models/Device.model";

// Environment
import { envServer } from "@/lib/env/env.server";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    // Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check for banned token
    const bannedToken = await BanToken.findOne({ token });
    if (bannedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    let verify: JwtPayload;
    try {
      verify = jwt.verify(token, envServer.JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const { page, pageSize } = await req.json();
    const pageNumber = Number(page);
    let sizeOfPage = Number(pageSize);

    // Validate page and pageSize
    if (!pageNumber || pageNumber < 1 || !sizeOfPage || sizeOfPage < 1) {
      return NextResponse.json({ message: "Invalid page" }, { status: 400 });
    }

    // Cap page size to prevent abuse
    const MAX_PAGE_SIZE = 100;
    sizeOfPage = Math.min(sizeOfPage, MAX_PAGE_SIZE);

    // Validate admin
    const admin = await Admin.findById(verify.id);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get total count of users
    const totalCount = await User.countDocuments({ deleted: false });

    // Fetch paginated users
    const rawUsers = await User.find({ deleted: false })
      .skip((pageNumber - 1) * sizeOfPage)
      .limit(sizeOfPage);

    // Attach devices
    const usersWithDeviceCount = await Promise.all(
      rawUsers.map(async (user) => {
        const devices = await Device.find({ user: user._id, deleted: false });
        return {
          ...user.toObject(),
          devices: [...devices],
        };
      })
    );

    return NextResponse.json({
      message: "Users fetched successfully",
      users: usersWithDeviceCount,
      totalCount,
    });
  } catch (err) {
    console.error("Error while fetching users:", err);
    return NextResponse.json(
      { message: "Error while fetching users" },
      { status: 500 }
    );
  }
}
