// @/app/api/user/edit/[id]/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { Admin } from "@/lib/models/Admin.model";
import { BanToken } from "@/lib/models/BanToken.model";
import { User } from "@/lib/models/User.model";
import { Device } from "@/lib/models/Device.model";

// Types
import { IDevice } from "@/lib/models/Device.model";

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

    // Extract id from params
    const { id } = await params;

    // If id is not present, return error
    if (!id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract the data from the body
    const data = await req.json();

    // If data is not present, return error
    if (!data) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update user
    const user = await User.findOneAndUpdate({ _id: id }, data);

    // If user is not found, return error
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if devices are present
    if (data.devices && data.devices.length > 0) {
      // Find all devices which are not present in the data
      const devices = await Device.find({ user: user._id, deleted: false });

      const toDeleteDevices = devices.filter((device: IDevice) =>
        data.devices.every((d: IDevice) => d.id !== String(device._id))
      );

      // If toDeleteDevices is not empty, delete them
      if (toDeleteDevices.length > 0) {
        await Promise.all(
          toDeleteDevices.map((device: IDevice) =>
            Device.updateOne({ _id: device._id }, { deleted: true })
          )
        );
      }
    }

    // Check if devices are present
    if (data.devices && data.devices.length > 0) {
      // Add new devices
      await Promise.all(
        data.devices
          .filter((device: IDevice) => !device.id)
          .map((device: IDevice) =>
            Device.create({
              user: user._id,
              deviceName: device.deviceName,
              macAddress: device.macAddress,
              ipAddress: device.ipAddress,
              serialNumber: device.serialNumber,
            })
          )
      );
    }

    // Return success message
    return NextResponse.json({
      message: "Users edited successfully",
    });
  } catch {
    // If error, return 500
    return NextResponse.json(
      { message: "Error while editing users" },
      { status: 500 }
    );
  }
}
