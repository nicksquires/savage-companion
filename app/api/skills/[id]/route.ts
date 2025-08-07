import { prisma } from "@/prisma/client";
import { skillSchema } from "../skillSchema";
import { NextRequest, NextResponse } from "next/server";

// GET - get one skill from the master list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skill = await prisma.skill.findUnique({ 
      where: { id: params.id } 
      // Optional includes
    });

    if (!skill) return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    
    return NextResponse.json(skill);

  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 });
  }
}

// PATCH - update one skill in the master list
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
  const body = await request.json();
  const validation = skillSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedSkill = await prisma.skill.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updatedSkill);

  } catch (err) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// DELETE - remove selected skill from  the master list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const skill = await prisma.skill.findUnique({
    where: { id: params.id },
  });

  if (!skill)
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });

  await prisma.skill.delete({ where: { id: params.id } });

  return NextResponse.json({ status: 204 });
}