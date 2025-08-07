import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all hindrances for a player character
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: playerCharacterId } = params;

  try {
    const edges = await prisma.playerCharacterEdge.findMany({
      where: { playerCharacterId },
      include: { edge: true },
    });

    return NextResponse.json(edges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve edges" },
      { status: 500 }
    );
  }
}

// POST – Assign a hindrance to a character
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; hid: string } }
) {
  const { id: playerCharacterId, hid: hindranceId } = params;

  try {
    const created = await prisma.playerCharacterHindrance.create({
      data: {
        playerCharacterId,
        hindranceId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error assigning hindrance:", error);
    return NextResponse.json(
      { error: "Failed to assign hindrance" },
      { status: 500 }
    );
  }
}