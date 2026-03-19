import { z } from "zod";

export const addItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
});

// This is for validating quantity only (you could also import it from a shared file)
export const updatePlayerItemSchema = z.object({
  quantity: z.number().int().nonnegative(),
});