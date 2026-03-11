import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { skillSchema } from "@/lib/schemas/api/skill.schema";

// GET - get all skills belonging to player [id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const skills = await prisma.playerCharacterSkill.findMany({
    where: { playerCharacterId: params.id },
    include: { skill: true },
  });
  return NextResponse.json(skills);
}

// POST - grant new skill to player [id]
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = skillSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newSkill = await prisma.playerCharacterSkill.create({
    data: {
      ...body,
      playerCharacterId: params.id,
    },
  });
  return NextResponse.json(newSkill, { status: 201 });
}
