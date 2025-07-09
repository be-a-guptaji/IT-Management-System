// @/app/api/get-users/[name]/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";
import { User } from "../../../../../lib/models/User.model";
import { Device } from "@/lib/models/Device.model";

// Environment
import { envServer } from "@/lib/env/env.server";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
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

    // If token is valid, find admin
    const admin = await Admin.findById(verify.id);

    // If admin is not found, return error
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract name from params
    const { name } = await params;

    // Find users by name with fullName field and apply pagination
    const rawUsers = await User.aggregate([
      {
        $addFields: {
          fullName: {
            $trim: {
              input: {
                $reduce: {
                  input: [
                    "$name.firstName",
                    "$name.middleName",
                    "$name.lastName",
                  ],
                  initialValue: "",
                  in: {
                    $cond: [
                      { $eq: ["$$this", null] },
                      "$$value",
                      {
                        $cond: [
                          { $eq: ["$$value", ""] },
                          "$$this",
                          { $concat: ["$$value", " ", "$$this"] },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      {
        $match: {
          fullName: { $regex: name, $options: "i" },
          deleted: false,
        },
      },
      {
        $skip: (pageNumber - 1) * sizeOfPage,
      },
      {
        $limit: sizeOfPage,
      },
    ]);

    // Attach devices array to each user
    const usersWithDevices = await Promise.all(
      rawUsers.map(async (user) => {
        const devices = await Device.find({ user: user._id, deleted: false });
        return {
          ...user,
          devices: devices,
        };
      })
    );

    // Return success response
    return NextResponse.json({
      message: "Users fetched successfully",
      users: usersWithDevices,
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
