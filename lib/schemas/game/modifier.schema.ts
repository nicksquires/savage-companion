import { z } from "zod";

// 1. Constants
import { MODIFIER_TRIGGERS } from "@/lib/types/ModifierTrigger";
import { MODIFIER_CONTEXTS } from "@/lib/types/ModifierContext";
import { MODIFIER_TARGETS } from "@/lib/types/ModifierTarget";
import { MODIFIER_OPERATIONS } from "@/lib/types/ModifierOperation";

// 2. Zod Schema
export const ModifierSchema = z.object({
  target: z.enum(MODIFIER_TARGETS),
  
  // Which specific attribute, skill, or granted item? (e.g., "Fighting", "Vigor", "edge-slug")
  targetKey: z.string().optional(), 
  
  operation: z.enum(MODIFIER_OPERATIONS),
  
  // Can be a flat number (+2) or a string representing a die/slug ("d6")
  value: z.union([z.number(), z.string()]).optional(), 
  
  trigger: z.enum(MODIFIER_TRIGGERS).default("PASSIVE"),
  context: z.enum(MODIFIER_CONTEXTS).default("GLOBAL"),
  
  // For very specific requirements (e.g "Joker", "no movement", "animal companion")
  effect: z.object({
    type: z.enum(['reroll', 'drawCards', 'discardRedraw', 
        'grantResource', 'freeAction', 'groupApply', /* etc */]),
    params: z.record(z.unknown()).optional(), // flexible key-value
    condition: z.string().optional(),         // e.g. "actionCard === 'Joker'"
  }).optional(),

  // Optional narrative text for the UI or GM
  notes: z.string().optional(), 
});

// A Racial Ability (or item, or edge) holds an ARRAY of these modifiers
export const ModifierArraySchema = z.array(ModifierSchema);

// 3. Typescript Inference
// Zod magically generates your Typescript types from the schema! 
// You don't need to write `interface IModifier {...}` manually.
export type ModifierPayload = z.infer<typeof ModifierSchema>;
export type ModifierPayloadArray = z.infer<typeof ModifierArraySchema>;