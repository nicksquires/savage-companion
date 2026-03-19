import { prisma } from "@/prisma/client";
import { hindranceSchema } from "../../../../lib/schemas/api/hindrance.schema";
import { NextRequest, NextResponse } from "next/server";

// GET - get one hindrance in the master list
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const params = await context.params;

    const hindrance = await prisma.hindrance.findUnique({ 
      where: { id: params.id },
      // include: { source: true },
    });

    if (!hindrance) 
      return NextResponse.json(
        { error: "Hindrance not found" }, 
        { status: 404 }
      );
  
    return NextResponse.json(hindrance);
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch hindrance", details: String(err) }, 
      { status: 500 }
    );
  }
}

// PATCH - update one hindrance in the master list
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const body = await req.json();
  const validation = hindranceSchema.partial().safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedHindrance = await prisma.hindrance.update({
      where: { id: params.id },
      data: body,
    });

  return NextResponse.json(updatedHindrance);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update hindrance", details: String(err) }, 
      { status: 500 }
    );
  }
}

// DELETE - remove selected hindrance from  the master list
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  const hindrance = await prisma.hindrance.findUnique({
    where: { id: params.id },
  });

  if (!hindrance)
    return NextResponse.json({ error: "Hindrance not found" }, { status: 404 });

  try {
    await prisma.hindrance.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Hindrance deleted" },
      { status: 204 }
    );
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete hindrance", details: String(err) }, 
      { status: 500 }
    );
  }
}