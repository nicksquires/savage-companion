import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { playerCharacterSchema } from "../../../lib/schemas/api/playerCharacter.schema";

// GET - get all player characters from the master list
export async function GET() {
  const characters = await prisma.playerCharacter.findMany({
    include: {
      edges: true,
      powers: true,
      skills: true,
      hindrances: true,
    },
  });
  return NextResponse.json(characters);
}

// POST - add one character to the master list
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = playerCharacterSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  }

  try {
    const newCharacter = await prisma.playerCharacter.create({
      data: validation.data,
    });

    return NextResponse.json(newCharacter, { status: 201 });
  } catch (error) {
    console.error("Error creating character:", error);
    return NextResponse.json({ error: "Failed to create character" }, { status: 500 });
  }
}