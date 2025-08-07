import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "../edgeSchema";

// GET - get one edge from the master list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const edge = await prisma.edge.findUnique({
      where: { id: params.id },
      // include: { source: true },
    });

    if (!edge) {
      return NextResponse.json({ error: "Edge not found" }, { status: 404 });
    }

    return NextResponse.json(edge);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch edge" }, { status: 500 });
  }
}

// PATCH - update one edge in the master list
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = edgeSchema.partial().safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const updatedEdge = await prisma.edge.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedEdge);

  } catch (err) {
    return NextResponse.json({ error: "Failed to update edge" }, { status: 500 });
  }
}

// DELETE - delete one edge from the master list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const edge = await prisma.edge.findUnique({
    where: { id: params.id },
  });

  if (!edge)
    return NextResponse.json({ error: "Edge not found" }, { status: 404 });

  try {
    await prisma.edge.delete({ where: { id: params.id } });
  
    return NextResponse.json({ message: "Edge deleted" }, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete edge" }, { status: 500 });
  }
}