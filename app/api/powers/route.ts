import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { powerSchema } from "./powerSchema";

export async function GET() {
  const powers = await prisma.power.findMany();
  return NextResponse.json(powers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = powerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newPower = await prisma.power.create({ data: body });
  return NextResponse.json(newPower, { status: 201 });
}