import { connectDB } from "@/lib/mongodb";
import Pg from "@/models/Pg";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const pgs = await Pg.find()
    .sort({ createdAt: -1 })
    .limit(6);

  return NextResponse.json(pgs);
}
