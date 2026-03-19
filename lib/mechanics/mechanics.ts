import { z } from "zod";

export const MODIFIER_CONTEXTS = [
  "GLOBAL",          // Applies to everything under the Target
  
  // Action Contexts
  "MELEE_ATTACK",    // Only applies if the action is Melee
  "RANGED_ATTACK",   // Only applies if the action is Ranged
  "SPELLCASTING",    // Only applies to Arcane Background skill rolls
  "SOAK_ROLL",       // Only applies to Vigor rolls made to Soak
  "RECOVERY_ROLL",   // Natural healing rolls
  
  // Situational Contexts
  "OPPONENT_TYPE",   // Requires checking the target's tags (e.g., Undead, Evil)
  "ENVIRONMENTAL",   // Requires checking the scene (e.g., Dim Light, Underwater)
  "STATUS_EFFECT",   // Only applies if the user is Shaken, Stunned, etc.
] as const;

export type ModifierContext = typeof MODIFIER_CONTEXTS[number];

export const MODIFIER_OPERATIONS = [
  // Flat Math
  "ADD",             // +1, +2, etc.
  "SUBTRACT",        // -1, -2, etc.
  "MULTIPLY",        // E.g., Double range
  "DIVIDE",          // E.g., Half movement
  
  // Die Manipulation
  "UPGRADE_DIE",     // Move from d4 -> d6 -> d8
  "DOWNGRADE_DIE",   // Move from d12 -> d10 -> d8
  "REROLL",          // Reroll last roll
  
  // Absolute Values
  "SET_VALUE",       // Overrides current value (e.g., "Pace is exactly 4")
  "SET_MINIMUM",     // E.g., "Strength cannot be lower than d8"
  "SET_MAXIMUM",     // E.g., "Cannot roll higher than d6"
  
  // Booleans / Grants
  "GRANT",           // Used in conjunction with GRANT_EDGE, etc.
  "REVOKE",          // Temporarily removes an ability/edge
  "TRANSFER",        // 'TRANSFER' for Bennies
  "DRAW_EXTRA",      // Additional card on combat round start
  "MULTI_ACTION",    // Additional action
  "TEMPORARY_SET",   // For temporary bonuses i.e: Temporary skill for Jack-of-all-trades
  "CHOICE"           // For dynamic selection at cast time (Warrior's Gift, etc.)

] as const;

export type ModifierOperation = typeof MODIFIER_OPERATIONS[number];

// We use string literal unions instead of enums because they 
// serialize into JSON perfectly and play nice with Next.js/Zod.
export const MODIFIER_TARGETS = [
  // Core Character Stats
  "ATTRIBUTE",         // Agility, Smarts, Spirit, Strength, Vigor
  "SKILL",             // Fighting, Notice, Shooting, etc.
  "DERIVED_STAT",      // Pace, Parry, Toughness, Size, Scale
  
  // Game Resources
  "RESOURCE",          // Bennies, Power Points, Wounds, Fatigue
  
  // Dice & Mechanics
  "WILD_DIE",          // E.g., +1 to the Wild Die specifically
  "RUN_DIE",           // E.g., d8 instead of d6 for running
  "ARMOR_PIERCING",    // Explicit AP values
  "MULTI_ACTION",      // Offsetting MAP (Multi-Action Penalty)
  "WOUND_PENALTY",     // Offsetting wound penalties (e.g., Nerves of Steel)
  "FATIGUE_PENALTY",   // Offsetting fatigue penalties
  "BENNIES",           // E.g., Extra bennie for Elan, soak bennie for Ace
  "POWER_POINTS",      // 
  "INITIATIVE", 

  // Entity Grants
  "GRANT_EDGE",        // Gives the character an Edge
  "GRANT_HINDRANCE",   // Gives the character a Hindrance
  "GRANT_POWER",       // Gives the character a spell/power
  "GRANT_ABILITY",     // Gives a special/racial ability
  
  // Special/Narrative targets
  "FOLLOWER",              // Enable follower/sidekick
  "COMPANION",             // Create animal companion (so far only use?)
  "ADDITIONAL_RECIPIENTS", // Almost every support/buff power uses this
  "FAVOR"                  // Grant favor from other NPC entity at beginning of session

] as const;

export type ModifierTarget = typeof MODIFIER_TARGETS[number];

export const MODIFIER_TRIGGERS = [
  "PASSIVE",         // Always active (e.g., Brawny Edge)
  
  // Action Phase
  "ON_ROLL",            // Fires right before dice are thrown
  "ON_HIT",             // Fires after a successful attack roll
  "ON_MISS",            // Fires after a failed roll
  "ON_RAISE",           // Fires specifically if the roll was a Raise (+4)
  "ON_CRITICAL",        // Fires on Snake Eyes / Critical Failure
  "ON_INITIATIVE_DRAW", // Fires on drawing initiative card
  "ON_ROUND_START",     // Fires at beginning of combat round
  "ON_SESSION",         // Fires at beginning of new session

  // Combat Flow
  "ON_DAMAGE_DEALT", // Calculating damage outgoing
  "ON_DAMAGE_TAKEN", // Calculating damage incoming (Soak rolls)
  "ON_TURN_START",   // Upkeep phase
  "ON_TURN_END",     // Expiration phase
  
  // State changes
  "ON_EQUIP",               // Fires when an item is put on
  "ON_FREE_ACTION_TRIGGER", // Fires when free action is granted (for counter/first strike)
] as const;

export type ModifierTrigger = typeof MODIFIER_TRIGGERS[number];

// ===========================
// === CORE PAYLOAD SCHEMA ===
// ===========================
export const ModifierDataSchema = z.object({
  target: z.enum(MODIFIER_TARGETS),
  operation: z.enum(MODIFIER_OPERATIONS),
  value: z.union([z.number(), z.string()]), // +2 or "d8" or "extra card"

  // Optional filters
  context: z.enum(MODIFIER_CONTEXTS).optional(),
  trigger: z.enum(MODIFIER_TRIGGERS).optional(),

  // Complex conditions (homebrew-minded)
  condition: z
    .object({
      targetHasTag: z.string().optional(),   // "UNDEAD", "EVIL"
      userHasStatus: z.string().optional(),  // "SHAKEN", "STUNNED"
      rollType: z.string().optional(),
      // add more as game grows
    })
    .optional(),

  // SWADE-specific
  dieType: z.string().optional(),            // "d8", "d10"
  stackingRule: z.enum(["STACK", "NO_STACK", "TAKE_HIGHEST"]).optional(),
});

export type ModifierData = z.infer<typeof ModifierDataSchema>;

// For blueprints on Edge / Race / Power / Item / RacialAbility
export const ModifierBlueprintSchema = z.array(ModifierDataSchema);
export type ModifierBlueprint = z.infer<typeof ModifierBlueprintSchema>;