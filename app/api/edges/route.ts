import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "../../../lib/schemas/api/edge.schema";

// GET - get all edges from master list
export async function GET(req: NextRequest) {
  try {
    const edges = await prisma.edge.findMany({
      include: { 
        source: true,
        tags: {
          include: {
            tag:true
          },
        },
       }, // OPTIONAL: include related data
      orderBy: { name: "asc" },
    });

    // Shape edges to structure edgeTag join table
    const shapedEdges = edges.map(edge => ({...edge,
      tags: edge.tags.map(et => et.tag),
    }));

    return NextResponse.json(shapedEdges);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch edges - internal server error." },
      { status: 500 }
    );
  }
}

// POST - add new edge to master list
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = edgeSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(parsed.error.errors, { status: 400 });
    }

    const newEdge = await prisma.edge.create({ data: body });

    return NextResponse.json(newEdge, { status: 201 });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add edge" },
      { status: 500 }
    );
  }
}