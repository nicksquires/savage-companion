import { z } from "zod";

// POST: Giving an item to an entity
export const addInventoryItemSchema = z.object({
  itemId: z.string().cuid({ message: "Valid Item Template ID is required" }),
  
  // Ownership fields (all optional initially)
  characterId: z.string().cuid().optional(),
  creatureId: z.string().cuid().optional(),
  containerId: z.string().cuid().optional(),

  quantity: z.number().int().positive().default(1),
  notes: z.string().optional(),
  isEquipped: z.boolean().default(false),
  
  // The generic state object (starts empty or with defaults like { currentAmmo: 6 })
  state: z.record(z.unknown()).default({}), 
}).refine((data) => {
  // CRITICAL: Ensure exactly ONE owner is provided
  const owners = [data.characterId, data.creatureId, data.containerId].filter(Boolean);
  return owners.length === 1;
}, {
  message: "An item must belong to exactly one owner (character, creature, or container)",
  path: ["characterId"], // Attaches the error to the top of the form conceptually
});

// PATCH: Updating an existing item instance
export const updateInventoryItemSchema = z.object({
  quantity: z.number().int().nonnegative().optional(),
  notes: z.string().optional(),
  isEquipped: z.boolean().optional(),
  
  // This allows you to patch specific state fields (like ammo) without overwriting everything
  state: z.record(z.unknown()).optional(),
  
  // Allow moving the item to a new owner (e.g., looting a goblin)
  characterId: z.string().cuid().nullable().optional(),
  creatureId: z.string().cuid().nullable().optional(),
  containerId: z.string().cuid().nullable().optional(),
});