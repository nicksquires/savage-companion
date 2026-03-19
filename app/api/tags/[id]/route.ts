import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { tagSchema } from "../../../../lib/schemas/api/tag.schema";

// GET - get one tag from the master list
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const params = await context.params;

    const tag = await prisma.tag.findUnique({
      where: { id: params.id },
      // include: { source: true },
    });

    if (!tag) {
      return NextResponse.json(
        { error: "Tag not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(tag);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch tag", details: String(err) }, 
      { status: 500 }
    );
  }
}

// PATCH - update one tag in the master list
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const body = await req.json();
  const validation = tagSchema.partial().safeParse(body);

  if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedTag = await prisma.tag.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedTag);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update tag", details: String(err) }, 
      { status: 500 }
    );
  }
}

// DELETE - delete one tag from the master list
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  const tag = await prisma.tag.findUnique({
    where: { id: params.id },
  });

  if (!tag)
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });

  try {
    await prisma.tag.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Tag deleted" }, 
      { status: 204 }
    );
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete tag", details: String(err) }, 
      { status: 500 }
    );
  }
}