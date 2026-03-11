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
  "TEMPORARY_SET"    // For temporary bonuses i.e: Temporary skill for Jack-of-all-trades

] as const;

export type ModifierOperation = typeof MODIFIER_OPERATIONS[number];