import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "./edgeSchema";

// GET - get all edges from master list
export async function GET(req: NextRequest) {
  try {
    const edges = await prisma.edge.findMany({
      include: { source: true }, // OPTIONAL: include related data
      orderBy: { name: "asc" },
    });

    return NextResponse.json(edges);

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

    // Validate input using zod
    const parsed = edgeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.errors, { status: 400 });
    }

    const edge = await prisma.edge.create({ data: body });

    return NextResponse.json(edge, { status: 201 });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add edge" },
      { status: 500 }
    );
  }
}