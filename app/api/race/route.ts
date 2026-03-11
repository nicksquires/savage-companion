import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { raceSchema } from "../../../lib/schemas/api/race.schema";

// Get all races
export async function GET() {
  const races = await prisma.race.findMany();
  return NextResponse.json(races);
}

// Add new race to master list
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = raceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newRace = await prisma.race.create({ data: body });
  return NextResponse.json(newRace, { status: 201 });
}