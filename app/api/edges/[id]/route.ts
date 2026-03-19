import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "../../../../lib/schemas/api/edge.schema";

// GET - get one edge from the master list
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
    try {
      const params = await context.params;

      const edge = await prisma.edge.findUnique({
        where: { id: params.id },
        // include: { source: true },
      });

      if (!edge) {
        return NextResponse.json(
          { error: "Edge not found" }, 
          { status: 404 }
        );
      }

      return NextResponse.json(edge);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to fetch edge", details: String(err) }, 
        { status: 500 }
      );
    }
}

// PATCH - update one edge in the master list
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const body = await req.json();
  const validation = edgeSchema.partial().safeParse(body);

  if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedEdge = await prisma.edge.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedEdge);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update edge", details: String(err) }, 
      { status: 500 }
    );
  }
}

// DELETE - delete one edge from the master list
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  const edge = await prisma.edge.findUnique({
    where: { id: params.id },
  });

  if (!edge)
    return NextResponse.json({ error: "Edge not found" }, { status: 404 });

  try {
    await prisma.edge.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Edge deleted" }, 
      { status: 204 }
    );
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete edge", details: String(err) }, 
      { status: 500 }
    );
  }
}