import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pg from "@/models/Pg";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // 1. Strict Validation
    const requiredFields = ["pgName", "city", "location", "ownerPhone"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // 2. Data Sanitization & Type Conversion
    // We filter out empty strings from arrays and convert prices to Numbers
    const pgData = {
      ...body,
      // Ensure numeric values are actually numbers
      area: body.area ? Number(body.area) : 0,
      pricing: {
        monthlyRent: Number(body.pricing?.monthlyRent) || 0,
        securityDeposit: Number(body.pricing?.securityDeposit) || 0,
        totalInitialPayment: Number(body.pricing?.totalInitialPayment) || 0,
      },
      // Clean up arrays (remove empty strings if the user added a field but didn't type anything)
      images: (body.images || []).filter(img => img.trim() !== ""),
      amenities: (body.amenities || []).filter(a => a.trim() !== ""),
      propertyFeatures: (body.propertyFeatures || []).filter(f => f.trim() !== ""),
      houseRules: (body.houseRules || []).filter(r => r.trim() !== ""),
      // Filter nearby places that don't have a name
      nearbyPlaces: (body.nearbyPlaces || []).filter(p => p.name.trim() !== ""),
      
      // Defaults for fields not in the form
      status: body.status || "Available Now",
      rating: 0,
      totalReviews: 0,
    };

    const pg = await Pg.create(pgData);

    return NextResponse.json(
      { message: "PG added successfully", data: pg }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("ADD PG ERROR:", error);
    
    // Handle Mongoose Duplicate Key Error (e.g., same phone or email if unique)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A PG with these details already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error. Please try again." },
      { status: 500 }
    );
  }
}