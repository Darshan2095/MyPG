import { connectDB } from "@/lib/mongodb";
import Pg from "@/models/Pg";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { city } = await context.params;

  await connectDB();

  const pgs = await Pg.find({
    city: new RegExp(`^${city}$`, "i"),
  });

  return NextResponse.json(pgs);
}
