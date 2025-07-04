import { NextRequest, NextResponse } from "next/server";
import schema from "../../register/schema";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // fetch data from db
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  // if not found, return 404 data
  // else return data
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate request body
  const body = await request.json();
  const validation = schema.safeParse(body);

  // If invalid, return 400 error
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check for user with same id
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  // If user does not exist, return error
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  // Update user
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  // if (params.id > 10)
  //   return NextResponse.json({ error: "User not found" }, { status: 404 });

  //Return updated user
  return NextResponse.json(updatedUser, { status: 202 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Attempt fetch user
  const user = await prisma.user.findUnique({
    where: { id: params.id },
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
