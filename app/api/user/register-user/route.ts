// @/app/api/register-user/route.ts

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

// Types
import type { IDevice } from "@/lib/models/Device.model";

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

    // Check if the data is present in the request body
    const { name, designation, para, devices } = await req.json();

    // If data is not present, return error
    if (!name.firstName || !designation || para < 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
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

    // Create user
    const user = await User.create({
      name: {
        firstName: name.firstName,
        middleName: name?.middleName,
        lastName: name?.lastName,
      },
      designation,
      para,
    });

    // Check If devices are present
    if (devices.length > 0) {
      // Add devices to user
      await Promise.all(
        devices.map(async (device: IDevice) => {
          await Device.create({
            user: user._id,
            deviceName: device.deviceName,
            macAddress: device.macAddress,
            ipAddress: device.ipAddress,
            serialNumber: device.serialNumber,
          });
        })
      );
    }

    // Return the success message
    return NextResponse.json({ message: "User registered successfully" });
  } catch {
    // If error, return 500
    return NextResponse.json(
      { message: "Error while registering users" },
      { status: 500 }
    );
  }
}
