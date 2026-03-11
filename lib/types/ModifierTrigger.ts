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