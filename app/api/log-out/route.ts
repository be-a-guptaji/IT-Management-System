// @app/api/log-out/route.ts

// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Clear cookie
    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.delete("token");
    return response;
  } catch {
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
