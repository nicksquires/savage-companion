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