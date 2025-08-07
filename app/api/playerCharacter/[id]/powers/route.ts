import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { addPowerSchema } from "./addPowerSchema";

// GET: Fetch all powers for a player character
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: playerCharacterId } = params;

  try {
    const powers = await prisma.playerCharacterPower.findMany({
      where: { playerCharacterId },
      include: { power: true },
    });

    return NextResponse.json(powers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve powers" },
      { status: 500 }
    );
  }
}

// POST: Add a power to the player character
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; pid: string } }
) {
  const { id: playerCharacterId, pid: powerId } = params;

  const parsed = addPowerSchema.safeParse({ powerId });
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const created = await prisma.playerCharacterPower.create({
      data: {
        playerCharacterId,
        powerId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add power to character" },
      { status: 500 }
    );
  }
}