import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const target = searchParams.get("target");

    const filter = target ? { targetType: target } : {};
    const applications = await Application.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
