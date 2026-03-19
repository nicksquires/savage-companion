import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { raceSchema } from "../../../lib/schemas/api/race.schema";

// GET - get all races from master list
export async function GET(_req: NextRequest) {
  try {
    const races = await prisma.race.findMany({
      include: { 
        source: true,
       }, // OPTIONAL: include related data
      orderBy: { name: "asc" },
    });

    return NextResponse.json(races);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch edges - internal server error.", details: String(err) },
      { status: 500 }
    );
  }
}

// POST - add new edge to master list
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = raceSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(parsed.error.errors, { status: 400 });
    }

    const newRace = await prisma.race.create({ data: body });

    return NextResponse.json(newRace, { status: 201 });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add race", details: String(err) },
      { status: 500 }
    );
  }
}