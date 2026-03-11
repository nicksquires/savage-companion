import { prisma } from "@/prisma/client";
import { hindranceSchema } from "../../../../lib/schemas/api/hindrance.schema";
import { NextRequest, NextResponse } from "next/server";

// Next.js 15 requires typing params as a Promise
type Params = { params: Promise<{ slug: string }> };

// GET - get one hindrance in the master list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const hindrance = await prisma.hindrance.findUnique({ where: { id: params.id } });
  if (!hindrance) return NextResponse.json({ error: "Hindrance not found" }, { status: 404 });
  return NextResponse.json(hindrance);
}

// PATCH - update one hindrance in the master list
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = hindranceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedHindrance = await prisma.hindrance.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updatedHindrance);
}

// DELETE - remove selected hindrance from  the master list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const hindrance = await prisma.hindrance.findUnique({
    where: { id: params.id },
  });

  if (!hindrance)
    return NextResponse.json({ error: "Hindrance not found" }, { status: 404 });

  await prisma.hindrance.delete({ where: { id: params.id } });

  return NextResponse.json({ status: 204 });
}

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await prisma.hindrance.delete({ where: { id: params.id } });
//   return NextResponse.json({ message: "Deleted" });
// }
