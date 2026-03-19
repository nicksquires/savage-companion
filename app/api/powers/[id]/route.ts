import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { powerUpdateSchema } from "../../../../lib/schemas/api/power.schema";

// GET - get one power from the master list
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

  try {
    const power = await prisma.power.findUnique({ 
      where: { id } 
      // Optional includes
    });

  if (!power) return NextResponse.json(
    { error: "Power not found" }, 
    { status: 404 });
  
  return NextResponse.json(power);

   } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch power", details: String(err) }, 
      { status: 500 });
  }
}

// PATCH - update one power in the master list
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const validation = powerUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const updatedPower = await prisma.power.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json(updatedPower);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update power", details: String(err) }, 
      { status: 500 });
  }
}

// DELETE - remove selected power from  the master list
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

  const power = await prisma.power.findUnique({
    where: { id },
  });

  if (!power)
    return NextResponse.json(
      { error: "Power not found" }, 
      { status: 404 }
    );

  await prisma.power.delete({ where: { id } });

  return NextResponse.json({ status: 204 });
}