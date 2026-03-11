import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { updatePowerSchema } from "@/lib/schemas/api/power.schema";

// PATCH: Update the player character power
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; pid: string } }
) {
  const { pid: powerId } = params;
  const body = await request.json();
  const parsed = updatePowerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  try {
    const updatedPower = await prisma.power.update({
      where: { id: powerId },
      data: parsed.data,
    });

    return NextResponse.json(updatedPower);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update power" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a power from the character
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; pid: string } }
) {
  const { id: playerCharacterId, pid: powerId } = params;

  try {
    await prisma.playerCharacterPower.delete({
      where: {
        playerCharacterId_powerId: {
          playerCharacterId,
          powerId,
        },
      },
    });

    return NextResponse.json({ message: "Power removed" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove power" },
      { status: 500 }
    );
  }
}