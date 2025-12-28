import { connectDB } from "@/lib/mongodb";
import Pg from "@/models/Pg";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } = await context.params;

  await connectDB();
  const pg = await Pg.findById(id);

  if (!pg) {
    return NextResponse.json({ message: "PG not found" }, { status: 404 });
  }

  return NextResponse.json(pg);
}
