import { connectDB } from "@/lib/mongodb";
import Pg from "@/models/Pg";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getToken({ req });

  if (!token || token.role !== "PG_OWNER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const pgs = await Pg.find({ ownerId: token.sub }).sort({ createdAt: -1 });

  return NextResponse.json(pgs);
}
