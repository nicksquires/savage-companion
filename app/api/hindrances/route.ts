import { prisma } from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { hindranceSchema } from "../../../lib/schemas/api/hindrance.schema";

// GET - get all hindrances from master list
export async function GET(req: NextRequest) {
  try {
    const hindrances = await prisma.hindrance.findMany({
      include: { source: true }, // OPTIONAL: include related data
      orderBy: { name: "asc" },
    });

    return NextResponse.json(hindrances);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch hindrances - internal server error." },
      { status: 500 }
    );
  }
}

// POST - add new hindrance to master list
export async function POST(request: NextRequest) {
  try {
  const body = await request.json();
  const validation = hindranceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newHindrance = await prisma.hindrance.create({ data: body });
  return NextResponse.json(newHindrance, { status: 201 });
    } catch (err) {
    return NextResponse.json(
      { error: "Failed to add hindrance" },
      { status: 500 }
    );
  }
}
