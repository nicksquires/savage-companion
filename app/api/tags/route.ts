import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { tagSchema } from "../../../lib/schemas/api/tag.schema";

// Get all tags
export async function GET() {
  const tags = await prisma.tag.findMany();
  return NextResponse.json(tags);
}

// Add new tag
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = tagSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newPower = await prisma.tag.create({ data: body });
  return NextResponse.json(newPower, { status: 201 });
}