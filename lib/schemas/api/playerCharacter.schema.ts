import { z } from "zod";

export const DieTypeEnum = z.enum(["D4", "D6", "D8", "D10", "D12"]).default("D4");
export const RankEnum = z.enum(["NOVICE", "SEASONED", "VETERAN", "HEROIC", "LEGENDARY"]).default("NOVICE");

/**
 * 1. CORE CHARACTER DEFINITION (The "Template")
 * These are slow-changing stats that define the character's sheet.
 * Used when leveling up, changing attributes, or editing bio.
 */
export const characterCoreSchema = z.object({
  name: z.string().min(1, "Name is required"),
  concept: z.string().optional(),
  description: z.string().optional(), // Replaced 'notes' to match Prisma
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  userId: z.string().cuid(),
  raceId: z.string().cuid(),
  campaignId: z.string().cuid().optional(),
  isActive: z.boolean().default(true),

  // Advancement
  rank: RankEnum.default("NOVICE"),
  advancesSpent: z.number().int().nonnegative().default(0),
  advancesUnspent: z.number().int().nonnegative().default(0),
  experience: z.number().int().nonnegative().optional().default(0),

  // Attributes
  agility: DieTypeEnum.default("D4"),
  smarts: DieTypeEnum.default("D4"),
  spirit: DieTypeEnum.default("D4"),
  strength: DieTypeEnum.default("D4"),
  vigor: DieTypeEnum.default("D4"),

  // Derived Stats (Usually calculated, but stored here if manually overridden)
  pace: z.number().int().positive().default(6),
  parry: z.number().int().nonnegative().default(0),
  toughness: z.number().int().nonnegative(),
  armor: z.number().int().nonnegative().default(0),

  // Baseline Transient Config (Campaign specific defaults go here)
  startingBennies: z.number().int().nonnegative().default(3),
});

/**
 * 2. VOLATILE SESSION STATE (The "Instance")
 * These change constantly during a 3-hour game session.
 * WebSockets or highly-frequent PATCH routes will use this.
 */
export const characterStateSchema = z.object({
  bennies: z.number().int().nonnegative(),
  wounds: z.number().int().nonnegative().max(4), // Savage Worlds standard max
  fatigue: z.number().int().nonnegative().max(2),
  wealth: z.number().int().nonnegative(),
});

/**
 * 3. INITIAL CREATION SCHEMA
 * Merges the core and state, ensuring we set up the character's 
 * initial snapshot correctly when they are first born.
 */
export const createCharacterSchema = characterCoreSchema.merge(
  z.object({
    // We make these optional on creation because we will auto-fill them 
    // based on Campaign settings in the API route if not provided.
    bennies: z.number().int().nonnegative().optional(),
    wounds: z.number().int().nonnegative().default(0),
    fatigue: z.number().int().nonnegative().default(0),
    wealth: z.number().int().nonnegative().optional(),
  })
);

// Optional: Export a full schema for reading/typing full DB responses
export const playerCharacterResponseSchema = createCharacterSchema.extend({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});