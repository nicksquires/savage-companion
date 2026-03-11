import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { updateHindranceSchema } from "@/lib/schemas/api/hindrance.schema";

// PATCH – Update optional data in join (if needed)
export async function PATCH( request: NextRequest,
  { params }: { params: { id: string; hid: string } }
    ) {
  const body = await request.json();
  const validation = updateHindranceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  }

  try {
    const updated = await prisma.playerCharacterHindrance.update({
      where: { id: params.hid },
      data: body,
    });

    return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update hindrance" },{ status: 500 });
    }
}

// DELETE – Remove hindrance from character
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; hid: string } }
) {
  try {
    // Check existence
    const existing = await prisma.playerCharacterHindrance.findUnique({
      where: { id: params.hid },
    });

    if (!existing) {
      return NextResponse.json({ error: "Hindrance not found" }, { status: 404 });
    }

    await prisma.playerCharacterHindrance.delete({ where: { id: params.hid } });

    return NextResponse.json({ message: "Hindrance removed" }, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove hindrance" }, { status: 500 });
  }
}