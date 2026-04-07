import Worker from "@/models/Worker";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const workers = await Worker.find();
  return NextResponse.json(workers);
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const requiredFields = ["name", "phone", "city", "location"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const worker = await Worker.create({
      name: body.name,
      phone: body.phone,
      email: body.email || "",
      skills: Array.isArray(body.skills)
        ? body.skills.map((s) => String(s).trim()).filter(Boolean)
        : [],
      experience: body.experience || "",
      city: body.city,
      location: body.location,
      availability: body.availability ?? true,
    });

    return NextResponse.json({ message: "Worker created", data: worker }, { status: 201 });
  } catch (error) {
    console.error("CREATE WORKER ERROR:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}