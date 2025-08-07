import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updatePowerSchema } from "../powerSchema";

// GET - get one power from the master list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const power = await prisma.power.findUnique({ 
      where: { id: params.id } 
      // Optional includes
    });

  if (!power) return NextResponse.json({ error: "Power not found" }, { status: 404 });
  
  return NextResponse.json(power);

   } catch (err) {
    return NextResponse.json({ error: "Failed to fetch power" }, { status: 500 });
  }
}

// PATCH - update one power in the master list
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

  const body = await request.json();
  const validation = updatePowerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedPower = await prisma.power.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updatedPower);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update power" }, { status: 500 });
  }
}

// DELETE - remove selected power from  the master list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const power = await prisma.power.findUnique({
    where: { id: params.id },
  });

  if (!power)
    return NextResponse.json({ error: "Power not found" }, { status: 404 });

  await prisma.power.delete({ where: { id: params.id } });

  return NextResponse.json({ status: 204 });
}