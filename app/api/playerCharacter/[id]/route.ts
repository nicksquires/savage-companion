import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { characterCoreSchema, characterStateSchema } from "@/lib/schemas/api/playerCharacter.schema";

// Create a generic update schema that accepts partials of either core or state stats
const updateCharacterSchema = characterCoreSchema
  .merge(characterStateSchema)
  .partial();

// GET_ONE: Fetch a single character and all their relational data
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const character = await prisma.playerCharacter.findUnique({
      where: { id },
      include: {
        inventory: {
          include: { item: true }, // Joins the item templates to the instances
        },
        edges: true,
        hindrances: true,
        skills: true,
        powers: true,
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

// PATCH: Update character stats (can handle both core leveling and volatile state)
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

// DELETE: Soft-delete a character by marking them inactive
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Best practice for RPGs: Don't hard-delete. Soft-delete instead so
    // campaign history and journals don't break due to missing foreign keys.
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