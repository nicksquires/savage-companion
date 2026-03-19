import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client"; // Import Prisma types for strict Prisma JSON typing
import { addInventoryItemSchema } from "@/lib/schemas/api/inventory.schema";

// GET: Fetch an inventory for a specific owner
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const characterId = searchParams.get("characterId");
  const creatureId = searchParams.get("creatureId");
  const containerId = searchParams.get("containerId");

  if (!characterId && !creatureId && !containerId) {
    return NextResponse.json(
      { error: "Must provide characterId, creatureId, or containerId" },
      { status: 400 }
    );
  }

  try {
    const inventory = await prisma.itemInstance.findMany({
      where: {
        characterId: characterId ?? undefined,
        creatureId: creatureId ?? undefined,
        containerId: containerId ?? undefined,
      },
      include: {
        item: true, // ALWAYS include the template so the frontend knows what this object is!
      },
      orderBy: { item: { name: 'asc' } } // Sort alphabetically by item name
    });

    return NextResponse.json(inventory);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch inventory", details: String(err) },
      { status: 500 }
    );
  }
}

// POST: Add a new item to an entity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = addInventoryItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    // Separate state from the rest of the data
    const { state, ...restOfData } = parsed.data;

    const newInstance = await prisma.itemInstance.create({
      data: {
        ...restOfData,
        // Cast Zod record to Prisma's strict JSON type
        state: state as Prisma.InputJsonValue,
      },
      include: { item: true }
    });

    return NextResponse.json(newInstance, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add item to inventory", details: String(err) },
      { status: 500 }
    );
  }
}