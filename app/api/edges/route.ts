import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "../../../lib/schemas/api/edge.schema";
import { Rank } from "@prisma/client";

// GET - get all edges from master list
export async function GET(req: NextRequest) {
  // 1. Extract the searchParams from the request URL
  const { searchParams } = new URL(req.url);
  
  // 2. Grab the specific filters you care about
  const category = searchParams.get("category");          // e.g., "COMBAT", "WEIRD"
  const rank = searchParams.get("rank") as Rank | null;   // e.g., "NOVICE"
  const search = searchParams.get("search");              // e.g., "frenzy"

  try {
    const edges = await prisma.edge.findMany({
      where: {
        category: category ?? undefined,
        rank: rank ?? undefined,
        name: search ? { contains: search } : undefined,
      },
      // OPTIONAL: include related data
      include: { 
        tags: { include: { tag:true }, },
      },

      orderBy: 
      { name: "asc" },
    });

    // Shape edges to structure edgeTag join table
    const shapedEdges = edges.map(edge => ({
      ...edge,
      tags: edge.tags.map(et => et.tag),
    }));

    return NextResponse.json(shapedEdges);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch edges - internal server error.", details: String(err) },
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
      { error: "Failed to add edge", details: String(err) },
      { status: 500 }
    );
  }
}