import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateSkillSchema } from "@/lib/schemas/api/skill.schema";

// PATCH – Update optional data in join (if needed)
export async function PATCH( request: NextRequest,
  { params }: { params: { id: string; sid: string } }
) {
  const body = await request.json();
  const validation = updateSkillSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
  const updated = await prisma.playerCharacterSkill.update({
    where: { id: params.sid },
    data: body,
  });
  return NextResponse.json(updated);
} catch(error) {
  return NextResponse.json({ error: "Failed to update skill"}, {status: 500 });
}
}

// DELETE – Remove skill from player character [id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; sid: string } }
) {
  try {
    // Check existence
    const existing = await prisma.playerCharacterSkill.findUnique({
      where: { id: params.sid },
    });

    if (!existing) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await prisma.playerCharacterSkill.delete({ where: { id: params.sid } });

    return NextResponse.json({ message: "Skill removed" }, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove skill" }, { status: 500 });
  }
}