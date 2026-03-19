import { NextRequest, NextResponse } from "next/server";
import schema from "../../../../lib/schemas/api/register.schema";
import { prisma } from "@/prisma/client";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    // Validate request body
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // Check for user with same id
    const user = await prisma.user.findUnique({
      where: { id },
    });

    // If user does not exist, return error
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        // name: body.name,
        // email: body.email,
      },
    });

    //Return updated user
    return NextResponse.json(updatedUser, { status: 202 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update power", details: String(err) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  // Attempt fetch user
  const user = await prisma.user.findUnique({
    where: { id },
  });

  // If not exist, return error
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // If user exists, delete
  await prisma.user.delete({
    where: { id: user.id },
  });

  // If status provides complications or errors, change to 200 instead of 204
  return NextResponse.json({ status: 204 });
}
