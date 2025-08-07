import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateRaceSchema } from "../raceSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const race = await prisma.race.findUnique({ where: { id: params.id } });
  if (!race) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(race);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = updateRaceSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedRace = await prisma.race.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updatedRace);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.race.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}