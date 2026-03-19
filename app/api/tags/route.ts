import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { tagSchema } from "../../../lib/schemas/api/tag.schema";

// GET - get all tags from master list
export async function GET(_req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(tags);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch tags - internal server error.", details: String(err) },
      { status: 500 }
    );
  }
}

// POST - add new tag to master list
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = tagSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(parsed.error.errors, { status: 400 });
    }

    const newTag = await prisma.tag.create({ data: body });

    return NextResponse.json(newTag, { status: 201 });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add tag", details: String(err) },
      { status: 500 }
    );
  }
}