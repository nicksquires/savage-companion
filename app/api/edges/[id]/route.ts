import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "../../../../lib/schemas/api/edge.schema";

// Next.js 15 requires typing params as a Promise
type Params = { params: Promise<{ id: string }> };

// GET - get one edge from the master list
export async function GET({ params }: Params) {
  try {
    // AWAIT the params before using them!
    const { id } = await params;

    const edge = await prisma.edge.findUnique({
      where: { id: id },
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
  { params }: Params
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = edgeSchema.partial().safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const updatedEdge = await prisma.edge.update({
      where: { id: id },
      data: body,
    });

    return NextResponse.json(updatedEdge);

  } catch (err) {
    return NextResponse.json({ error: "Failed to update edge" }, { status: 500 });
  }
}

// DELETE - delete one edge from the master list
export async function DELETE({ params }: Params) {
  const { id } = await params;

  const edge = await prisma.edge.findUnique({
    where: { id: id },
  });

  if (!edge)
    return NextResponse.json({ error: "Edge not found" }, { status: 404 });

  try {
    await prisma.edge.delete({ where: { id: id } });
  
    return NextResponse.json({ message: "Edge deleted" }, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete edge" }, { status: 500 });
  }
}