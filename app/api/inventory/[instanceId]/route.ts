import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client"; // Import Prisma types for strict Prisma JSON typing
import { updateInventoryItemSchema } from "@/lib/schemas/api/inventory.schema";

// PATCH: Update an item's state (ammo, quantity, equipped status, or move it to a new owner)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const { instanceId } = await context.params;
    const body = await request.json();
    
    const parsed = updateInventoryItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    const { state: incomingState, ...restOfData } = parsed.data;
    
    // 1. Type the object strictly using Prisma's generated Update type
    const dataToUpdate: Prisma.ItemInstanceUpdateInput = { ...restOfData };

    // 2. Handle the JSON Merge if 'state' was included in the PATCH request
    if (incomingState) {
      const currentItem = await prisma.itemInstance.findUnique({
        where: { id: instanceId },
        select: { state: true }
      });

      if (currentItem) {
        // Treat Prisma's JsonValue as a standard JS object, fallback to empty
        const currentState = (currentItem.state as Record<string, unknown>) || {};
        
        // Shallow merge the existing state with the incoming state updates
        const mergedState = { ...currentState, ...incomingState };
        
        // Cast the final merged object back to Prisma's JSON type
        dataToUpdate.state = mergedState as Prisma.InputJsonValue;
      }
    }

    // 3. Perform the update
    const updatedInstance = await prisma.itemInstance.update({
      where: { id: instanceId },
      data: dataToUpdate,
      include: { item: true }
    });

    return NextResponse.json(updatedInstance);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update item instance", details: String(err) },
      { status: 500 }
    );
  }
}

// DELETE: Drop, consume, or destroy an item
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const { instanceId } = await context.params;

    await prisma.itemInstance.delete({
      where: { id: instanceId },
    });

    return NextResponse.json(
      { message: "Item removed from inventory" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete item", details: String(err) },
      { status: 500 }
    );
  }
}