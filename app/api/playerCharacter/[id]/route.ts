import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { characterCoreSchema, builderStateSchema } from "@/lib/schemas/api/playerCharacter.schema";

// PATCH accepts partial core fields + optional builderState
const updateCharacterSchema = characterCoreSchema
  .partial()
  .extend({
    builderState: builderStateSchema.optional(),
  });

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const character = await prisma.playerCharacter.findUnique({
      where: { id },
      include: {
        inventory: { include: { item: true } },
        edges: true,
        hindrances: true,
        skills: true,
        powers: true,
        arcaneBackgrounds: true,
      },
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    return NextResponse.json(character);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch character", details: String(err) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parsed = updateCharacterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    const updatedCharacter = await prisma.playerCharacter.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updatedCharacter);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update character", details: String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const archivedCharacter = await prisma.playerCharacter.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(
      { message: "Character archived successfully", character: archivedCharacter },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete character", details: String(err) },
      { status: 500 }
    );
  }
}