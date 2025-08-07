import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { itemSchema } from "./itemSchema";

export async function GET() {
  const items = await prisma.item.findMany({ include: { source: true } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = itemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.errors, { status: 400 });
  }

  try {
    const newItem = await prisma.item.create({ data: parsed.data });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}