import { prisma } from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { skillSchema } from "./skillSchema";

export async function GET() {
  const skills = await prisma.skill.findMany();
  return NextResponse.json(skills);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = skillSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newSkill = await prisma.skill.create({ data: body });
  return NextResponse.json(newSkill, { status: 201 });
}
