import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import Pg from "@/models/Pg";

export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();

    if (!body.applicantName || !body.applicantPhone) {
      return NextResponse.json(
        { message: "applicantName and applicantPhone are required" },
        { status: 400 }
      );
    }

    const pgExists = await Pg.findById(id);
    if (!pgExists) {
      return NextResponse.json({ message: "PG not found" }, { status: 404 });
    }

    const application = await Application.create({
      targetType: "PG",
      targetId: id,
      applicantName: body.applicantName,
      applicantPhone: body.applicantPhone,
      applicantEmail: body.applicantEmail || "",
      message: body.message || "",
    });

    return NextResponse.json({ message: "PG application submitted", data: application }, { status: 201 });
  } catch (error) {
    console.error("PG APPLY ERROR:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
