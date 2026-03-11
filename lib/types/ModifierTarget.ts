// We use string literal unions instead of enums because they 
// serialize into JSON perfectly and play beautifully with Next.js/Zod.

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
  "FOLLOWER",         // Enable follower/sidekick
  "COMPANION",        // Create animal companion (so far only use?)
  "FAVOR"             // Grant favor from other NPC entity at beginning of session

] as const;

export type ModifierTarget = typeof MODIFIER_TARGETS[number];