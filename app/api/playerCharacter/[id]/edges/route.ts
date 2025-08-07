import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { addEdgeSchema } from "./addEdgeSchema";

// GET: Fetch all edges for a player character
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

// POST: Add an edge to the player character
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; eid: string } }
) {
  const { id: playerCharacterId, eid: edgeId } = params;

  const parsed = addEdgeSchema.safeParse({ edgeId });
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const created = await prisma.playerCharacterEdge.create({
      data: {
        playerCharacterId,
        edgeId,
      },
    });

    return NextResponse.json(created, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add edge to character" },
      { status: 500 }
    );
  }
}