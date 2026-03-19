import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { raceSchema } from "../../../../lib/schemas/api/race.schema";

// GET - get one race from the master list
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const params = await context.params;

    const race = await prisma.race.findUnique({
      where: { id: params.id },
      // include: { source: true },
    });

    if (!race) {
      return NextResponse.json(
        { error: "Race not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(race);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch race", details: String(err) }, 
      { status: 500 }
    );
  }
}

// PATCH - update one race in the master list
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const body = await req.json();
  const validation = raceSchema.partial().safeParse(body);

  if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedRace = await prisma.race.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedRace);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update race", details: String(err) }, 
      { status: 500 }
    );
  }
}

// DELETE - delete one race from the master list
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  const race = await prisma.race.findUnique({
    where: { id: params.id },
  });

  if (!race)
    return NextResponse.json({ error: "Race not found" }, { status: 404 });

  try {
    await prisma.race.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Race deleted" }, 
      { status: 204 }
    );
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete race", details: String(err) }, 
      { status: 500 }
    );
  }
}