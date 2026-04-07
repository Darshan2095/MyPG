import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import Worker from "@/models/Worker";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.workerId || !body.applicantName || !body.applicantPhone) {
      return NextResponse.json(
        { message: "workerId, applicantName and applicantPhone are required" },
        { status: 400 }
      );
    }

    const workerExists = await Worker.findById(body.workerId);
    if (!workerExists) {
      return NextResponse.json({ message: "Worker not found" }, { status: 404 });
    }

    const application = await Application.create({
      targetType: "WORKER",
      targetId: body.workerId,
      applicantName: body.applicantName,
      applicantPhone: body.applicantPhone,
      applicantEmail: body.applicantEmail || "",
      message: body.message || "",
    });

    return NextResponse.json(
      { message: "Worker request submitted", data: application },
      { status: 201 }
    );
  } catch (error) {
    console.error("WORKER APPLY ERROR:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
