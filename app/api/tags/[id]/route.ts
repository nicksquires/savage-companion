import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { tagUpdateSchema } from "../../../../lib/schemas/api/tag.schema";

// GET - get one tag from the master list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await prisma.tag.findUnique({ 
      where: { id: params.id } 
      // Optional includes
    });

  if (!tag) return NextResponse.json({ error: "Tag not found" }, { status: 404 });
  
  return NextResponse.json(tag);

   } catch (err) {
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}

// PATCH - update one tag in the master list
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

  const body = await request.json();
  const validation = tagUpdateSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedTag = await prisma.tag.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updatedTag);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 });
  }
}

// DELETE - remove selected tag from  the master list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tag = await prisma.tag.findUnique({
    where: { id: params.id },
  });

  if (!tag)
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });

  await prisma.tag.delete({ where: { id: params.id } });

  return NextResponse.json({ status: 204 });
}