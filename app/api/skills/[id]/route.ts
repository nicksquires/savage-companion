import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { skillSchema } from "../../../../lib/schemas/api/skill.schema";

// GET - get one skill from the master list
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const params = await context.params;

    const skill = await prisma.skill.findUnique({
      where: { id: params.id },
      // include: { source: true },
    });

    if (!skill) {
      return NextResponse.json(
        { error: "Skill not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch skill", details: String(err) }, 
      { status: 500 }
    );
  }
}

// PATCH - update one skill in the master list
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const body = await req.json();
  const validation = skillSchema.partial().safeParse(body);

  if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedSkill = await prisma.skill.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(updatedSkill);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update skill", details: String(err) }, 
      { status: 500 }
    );
  }
}

// DELETE - delete one skill from the master list
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  const skill = await prisma.skill.findUnique({
    where: { id: params.id },
  });

  if (!skill)
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });

  try {
    await prisma.skill.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Skill deleted" }, 
      { status: 204 }
    );
    
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete skill", details: String(err) }, 
      { status: 500 }
    );
  }
}