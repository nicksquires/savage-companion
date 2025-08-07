import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeUpdateSchema } from "@/app/api/edges/edgeSchema";


// PATCH: Update the edge details (name, requirements, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; eid: string } }
) {
  const { eid: edgeId } = params;
  const body = await request.json();
  const parsed = edgeUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const updatedEdge = await prisma.edge.update({
      where: { id: edgeId },
      data: parsed.data,
    });

    return NextResponse.json(updatedEdge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update edge" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an edge from the character
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; eid: string } }
) {
  const { id: playerCharacterId, eid: edgeId } = params;

  try {
    await prisma.playerCharacterEdge.delete({
      where: {
        playerCharacterId_edgeId: {
          playerCharacterId,
          edgeId,
        },
      },
    });

    return NextResponse.json({ message: "Edge removed" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove edge" },
      { status: 500 }
    );
  }
}