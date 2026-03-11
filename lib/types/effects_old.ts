// // /app/types/effects.ts

// export type EffectDefinition =
//   | PassiveModifier
//   | ConditionalModifier
//   | TriggeredModifier
//   | OverrideModifier;

// export interface BaseModifier {
//   kind: string;           // e.g., "STAT_ADJUSTMENT", "DAMAGE_BONUS", "CONDITION_APPLY"
//   description?: string;    // Optional flavor text
//   value?: number | string; // Number for bonuses, string for condition names, etc.
//   context?: string;       // e.g., "TOUGHNESS_CALCULATION", "DRAW_WEAPON", "MELEE_ATTACK"
//   condition?: ConditionPayload; // Optional conditional requirements
// }

// export interface ConditionPayload {
//   requiresRaise?: boolean;
//   targetHasCategory?: string; // e.g., "UNHOLY", "FAE"
//   userHasEdge?: string;       // e.g., "IMPROVISED_WEAPON"
//   [key: string]: any;         // Flexible for narrative/edge-specific checks
// }

// // PASSIVE: always on when equipped / applied
// export interface PassiveModifier extends BaseModifier {
//   type: "PASSIVE";
// }

// // CONDITIONAL: applied only when a certain trigger occurs and conditions pass
// export interface ConditionalModifier extends BaseModifier {
//   type: "CONDITIONAL";
//   trigger: EffectTrigger; // e.g., "MELEE_ATTACK", "ON_DAMAGE"
//   onSuccess?: BaseModifier | BaseModifier[]; // What happens if condition passes
//   onFailure?: BaseModifier | BaseModifier[];
// }

// // TRIGGERED: occurs on specific game events, may require a roll
// export interface TriggeredModifier extends BaseModifier {
//   type: "TRIGGERED";
//   trigger: EffectTrigger;
//   roll?: RollPayload;      // Optional roll requirement
//   apply?: BaseModifier | BaseModifier[];
// }

// // OVERRIDE: temporary mutation of base stats or abilities
// export interface OverrideModifier extends BaseModifier {
//   type: "OVERRIDE";
//   duration?: DurationType;  // SESSION, SCENE, PERMANENT
//   expireAt?: string;        // ISO date for timed overrides
// }

// // Optional roll payload
// export interface RollPayload {
//   skill: string;             // e.g., "VIGOR", "STRENGTH"
//   targetNumber?: number;     // default 4 if not set
//   onSuccess?: BaseModifier | BaseModifier[];
//   onFailure?: BaseModifier | BaseModifier[];
// }

// // Enums (optional for stronger typing)
// export type EffectTrigger =
//   | "ON_HIT"
//   | "ON_DAMAGE"
//   | "ON_EQUIP"
//   | "ON_DRAW"
//   | "ON_MOVE"
//   | "MELEE_ATTACK"
//   | "RANGED_ATTACK"
//   | "PASSIVE"
//   | "ON_CAST";

// export type DurationType =
//   | "INSTANT"
//   | "TURN"
//   | "SCENE"
//   | "SESSION"
//   | "PERMANENT";