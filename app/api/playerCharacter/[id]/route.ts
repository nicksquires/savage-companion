import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { playerCharacterUpdateSchema } from "../playerCharacterSchema";

// GET - get one player character from master list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
  const character = await prisma.playerCharacter.findUnique({
    where: { id: params.id },
    include: {
      edges: true,
      powers: true,
      skills: true,
      hindrances: true,
    },
  });

  if (!character) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  return NextResponse.json(character);
} catch (error) {
  return NextResponse.json(
    { error: "Failed to retrieve player Character"},
    { status: 500}
  );
}
}

// PATCH - update one character in the master list
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = playerCharacterUpdateSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  }

  try {
    const updated = await prisma.playerCharacter.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating character:", error);
    return NextResponse.json({ error: "Failed to update character" }, { status: 500 });
  }
}

// DELETE - delete one character from the master list
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const existing = await prisma.playerCharacter.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  await prisma.playerCharacter.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Character deleted" });
}