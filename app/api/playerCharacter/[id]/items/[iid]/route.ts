import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { updatePlayerItemSchema } from "@/app/api/playerCharacter/[id]/items/playerItemSchema";

// GET: Retrieve a single player item (join record + item details)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; iid: string } }
) {
  const { id: playerCharacterId, iid: itemId } = params;

  try {
    const item = await prisma.playerCharacterItem.findUnique({
      where: {
        playerCharacterId_itemId: {
          playerCharacterId,
          itemId,
        },
      },
      include: { item: true },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching player item:", error);
    return NextResponse.json({ error: "Failed to retrieve item" }, { status: 500 });
  }
}

// PATCH: Update an item’s data (on the master item list)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; iid: string } }
) {
  const { id: playerCharacterId, iid: itemId } = params;
  const body = await request.json();

  const parsed = updatePlayerItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const updated = await prisma.playerCharacterItem.update({
      where: {
        playerCharacterId_itemId: {
          playerCharacterId,
          itemId,
        },
      },
      data: {
        quantity: parsed.data.quantity,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating player item quantity:", error);
    return NextResponse.json({ error: "Failed to update item quantity" }, { status: 500 });
  }
}

// DELETE: Remove the item from the player’s inventory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; iid: string } }
) {
  const { id: playerCharacterId, iid: itemId } = params;

  try {
    const existing = await prisma.playerCharacterItem.findUnique({
      where: {
        playerCharacterId_itemId: {
          playerCharacterId,
          itemId,
        },
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.playerCharacterItem.delete({
      where: {
        playerCharacterId_itemId: {
          playerCharacterId,
          itemId,
        },
      },
    });

    return NextResponse.json({ message: "Item removed" }, { status: 204 });
  } catch (error) {
    console.error("Error deleting player item:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}