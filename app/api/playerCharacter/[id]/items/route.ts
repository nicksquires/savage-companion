import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { addItemSchema } from "./playerItemSchema"; // You'll create this schema next

// GET: Fetch all items for a player character
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: playerCharacterId } = params;

  try {
    const items = await prisma.playerCharacterItem.findMany({
      where: { playerCharacterId },
      include: { item: true },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching player items:", error);
    return NextResponse.json(
      { error: "Failed to retrieve items" },
      { status: 500 }
    );
  }
}

// POST: Add an item to the player character
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; iid: string } }
) {
  const { id: playerCharacterId, iid: itemId } = params;

  const parsed = addItemSchema.safeParse({ itemId });
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const created = await prisma.playerCharacterItem.create({
      data: {
        playerCharacterId,
        itemId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json(
      { error: "Failed to add item to character" },
      { status: 500 }
    );
  }
}