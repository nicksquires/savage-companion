import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateItemSchema } from "@/lib/schemas/api/item.schema";

export async function GET(
 _req: NextRequest,
 context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

 try {
  const item = await prisma.item.findUnique({
   where: { id },
   include: { source: true },
  });

  if (!item) {
   return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
 } catch (err) {
  return NextResponse.json(
    { error: "Failed to fetch item", details: String(err) }, 
    { status: 500 }
  );
 }
}

export async function PATCH(
 req: NextRequest,
 context: { params: Promise<{ id: string }> } 
) {
 const { id } = await context.params;

 const body = await req.json();
 const parsed = updateItemSchema.safeParse(body);

 if (!parsed.success) {
  return NextResponse.json(parsed.error.errors, { status: 400 });
 }

 try {
  const updated = await prisma.item.update({
   where: { id },
   data: parsed.data,
  });
  return NextResponse.json(updated);
 } catch (err) {
  return NextResponse.json(
    { error: "Failed to update item", details: String(err) }, 
    { status: 500 }
  );
 }
}

export async function DELETE(
 _req: NextRequest,
 context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

  try {
    const existing = await prisma.item.findUnique(
      { where: { id } }
    );

    if (!existing) {
      return NextResponse.json(
        { error: "Item not found" }, 
        { status: 404 });
    }

    await prisma.item.delete(
      { where: { id } }
    );

    return NextResponse.json(
      { message: "Item deleted" }, 
      { status: 204 });

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete item", details: String(err) }, 
      { status: 500 }
    );
  }
}
