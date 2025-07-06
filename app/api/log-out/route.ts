// @/app/api/log-out/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

// Database
import { connectToDatabase } from "@/lib/db";

// Models
import { BanToken } from "@/lib/models/BanToken.model";

// Utility
import { parseJwtExpiry } from "@/lib/parseJwtExpiry";

// Server Environment Variables
import { envServer } from "@/lib/env/env.server";

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

    // Ban the token
    await BanToken.create({
      token,
      expiresAt: new Date(
        Date.now() + parseJwtExpiry(envServer.JWT_EXPIRES_IN) * 1000
      ),
    });
    // Clear cookie
    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.delete("token");
    return response;
  } catch {
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
