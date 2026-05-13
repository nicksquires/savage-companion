import { z } from "zod";

export const DieTypeEnum = z.enum(["D4", "D6", "D8", "D10", "D12"]).default("D4");
export const RankEnum = z.enum(["NOVICE", "SEASONED", "VETERAN", "HEROIC", "LEGENDARY"]).default("NOVICE");

/** 1. Core persistent character data */
export const characterCoreSchema = z.object({
  name: z.string().min(1, "Name is required"),
  concept: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  
  userId: z.string().cuid(),
  raceId: z.string().cuid(),
  campaignId: z.string().cuid().optional(),
  isActive: z.boolean().default(true),

  rank: RankEnum,
  advancesSpent: z.number().int().nonnegative().default(0),
  advancesUnspent: z.number().int().nonnegative().default(0),
  experience: z.number().int().nonnegative().optional().default(0),

  // Attributes (scalars – correct)
  agility: DieTypeEnum,
  smarts: DieTypeEnum,
  spirit: DieTypeEnum,
  strength: DieTypeEnum,
  vigor: DieTypeEnum,

  armor: z.number().int().nonnegative().default(0),
  wealth: z.number().int().nonnegative().default(500),
});

/** 2. Builder-only transient state (saved as JSON) */
export const builderStateSchema = z.object({
  racialAbilities: z.array(z.string()),           // "racial-ability:construct", etc.
  skills: z.record(z.string(), DieTypeEnum),
  hindrances: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["MAJOR", "MINOR"]),
    points: z.number().int().positive(),
  })),
  edges: z.array(z.object({ id: z.string(), name: z.string() })),
  arcaneBackgroundId: z.string().cuid().optional(),
  powers: z.array(z.string()),
  gear: z.array(z.any()),

  // Point economy
  availableAttributePoints: z.number().int().nonnegative(),
  availableSkillPoints: z.number().int().nonnegative(),
  hindrancePointsUsed: z.number().int().nonnegative(),
  maxHindrancePoints: z.number().int().nonnegative().default(4),

  validationState: z.object({
    isValid: z.boolean(),
    errors: z.record(z.string(), z.array(z.string())),
    tabStates: z.record(z.string(), z.enum(["valid", "invalid", "warning"])),
  }),
});

/** 3. Full creation schema (used by saveCharacter) */
export const createCharacterSchema = characterCoreSchema.extend({
  builderState: builderStateSchema.optional(),   // only present during creation
});

export const playerCharacterResponseSchema = createCharacterSchema.extend({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});