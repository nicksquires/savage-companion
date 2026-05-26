// // lib/mechanics/evaluator.ts
// // Savage Worlds VTT Modifier Evaluator Engine
// // Modern VTT pattern (Foundry SWADE style) - single source of truth for all mutations

// // import { z } from "zod";
// import type { Prisma } from "@prisma/client";
// import {
//   ModifierDataSchema,
//   ModifierContext,
//   ModifierOperation,
//   ModifierTarget,
//   ModifierTrigger,
//   type ModifierData,
// } from "./mechanics";

// // ===================================================================
// // TYPES FOR THE EVALUATOR
// // ===================================================================

// export interface RollContext {
//   /** What is being modified right now */
//   target: ModifierTarget;
//   /** Current base value before any modifiers (e.g. Fighting d8, Pace 6) */
//   baseValue: number | string;
//   /** Situational context (MELEE_ATTACK, SOAK_ROLL, etc.) */
//   contextType: ModifierContext;
//   /** When this modifier should fire */
//   trigger: ModifierTrigger;
//   /** Optional extra data for conditions */
//   tags?: string[]; // opponent tags, environment tags, etc.
//   statusEffects?: string[];
//   rollType?: string; // "attribute", "skill", "damage", etc.
// }

// export interface AppliedModifier {
//   name: string;
//   operation: ModifierOperation;
//   value: number | string;
//   finalContribution: number | string;
// }

// export interface EvaluationResult {
//   /** Final computed value after all modifiers */
//   finalValue: number | string;
//   /** For die-based targets (attributes, skills, wild die) */
//   effectiveDieType?: string;
//   /** List of every modifier that actually applied (great for UI tooltips) */
//   appliedModifiers: AppliedModifier[];
//   /** Special Savage Worlds flags */
//   extraInitiativeCards?: number;
//   extraActions?: number;
//   extraBennies?: number;
//   /** Any warnings (e.g. conflicting homebrew rules) */
//   warnings?: string[];
// }

// // ===================================================================
// // HELPER: Parse & Validate Modifier Data
// // ===================================================================

// function parseModifierData(raw: Prisma.JsonValue): ModifierData[] {
//   if (!raw) return [];

//   const data = raw as any;

//   // Support both single object and array (blueprint style)
//   const candidates = Array.isArray(data) ? data : [data];

//   return candidates
//     .map((item) => {
//       const result = ModifierDataSchema.safeParse(item);
//       if (!result.success) {
//         console.warn("Invalid modifier data skipped:", item, result.error);
//         return null;
//       }
//       return result.data;
//     })
//     .filter((m): m is ModifierData => m !== null);
// }

// // ===================================================================
// // CORE EVALUATOR
// // ===================================================================

// export async function evaluateModifiers(
//   modifiers: Array<{
//     id: string;
//     name: string;
//     data: Prisma.JsonValue;
//     condition?: Prisma.JsonValue; // future complex condition
//     priority?: number;
//   }>,
//   ctx: RollContext
// ): Promise<EvaluationResult> {
//   const result: EvaluationResult = {
//     finalValue: ctx.baseValue,
//     appliedModifiers: [],
//     warnings: [],
//   };

//   let numericBonus = 0;
//   let dieUpgrades: string[] = [];
//   let extraCards = 0;
//   let extraActions = 0;
//   let extraBennies = 0;

//   // 1. Parse & filter modifiers that actually apply
//   const applicable = modifiers
//     .map((mod) => ({
//       ...mod,
//       parsed: parseModifierData(mod.data),
//     }))
//     .filter((mod) => mod.parsed.length > 0);

//   // 2. Sort by priority (lower = applied first)
//   applicable.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

//   for (const mod of applicable) {
//     for (const data of mod.parsed) {
//       // === FILTERING ===
//       if (!matchesContextAndCondition(data, ctx, mod)) {
//         continue;
//       }

//       // === APPLY OPERATION ===
//       const contribution = applySingleModifier(data, ctx.baseValue, result.finalValue);

//       switch (data.operation) {
//         case "ADD":
//         case "SUBTRACT":
//           numericBonus += contribution as number;
//           break;

//         case "UPGRADE_DIE":
//         case "DOWNGRADE_DIE":
//           dieUpgrades.push(data.value as string);
//           break;

//         case "SET_VALUE":
//         case "SET_MINIMUM":
//         case "SET_MAXIMUM":
//           // These override previous calculations
//           result.finalValue = applySetOperation(data, result.finalValue);
//           break;

//         case "DRAW_EXTRA":
//           extraCards += data.value as number;
//           break;

//         case "MULTI_ACTION":
//           extraActions += data.value as number;
//           break;

//         case "GRANT":
//           if (data.target === "BENNIES") extraBennies += data.value as number;
//           break;

//         // REROLL, TRANSFER, etc. are handled at roll time, not here
//         default:
//           // Most complex ops are applied at the actual roll moment
//           break;
//       }

//       // Record what was applied
//       result.appliedModifiers.push({
//         name: mod.name,
//         operation: data.operation,
//         value: data.value,
//         finalContribution: contribution,
//       });
//     }
//   }

//   // 3. Apply final numeric changes
//   if (typeof result.finalValue === "number") {
//     result.finalValue = (result.finalValue as number) + numericBonus;
//   }

//   // 4. Apply die upgrades (SWADE style: step up/down)
//   if (dieUpgrades.length > 0 && typeof ctx.baseValue === "string" && ctx.baseValue.startsWith("d")) {
//     result.effectiveDieType = applyDieSteps(ctx.baseValue, dieUpgrades);
//   }

//   // 5. Special flags
//   result.extraInitiativeCards = extraCards;
//   result.extraActions = extraActions;
//   result.extraBennies = extraBennies;

//   return result;
// }

// // ===================================================================
// // INTERNAL HELPERS
// // ===================================================================

// function matchesContextAndCondition(
//   data: ModifierData,
//   ctx: RollContext,
//   mod: any
// ): boolean {
//   // Context match
//   if (data.context && data.context !== ctx.contextType && data.context !== "GLOBAL") {
//     return false;
//   }

//   // Trigger match
//   if (data.trigger && data.trigger !== ctx.trigger) {
//     return false;
//   }

//   // Simple condition check (expandable later)
//   if (data.condition) {
//     const cond = data.condition as any;
//     if (cond.targetHasTag && !ctx.tags?.includes(cond.targetHasTag)) return false;
//     if (cond.userHasStatus && !ctx.statusEffects?.includes(cond.userHasStatus)) return false;
//   }

//   return true;
// }

// function applySingleModifier(
//   data: ModifierData,
//   _baseValue: number | string,
//   currentValue: number | string
// ): number | string {
//   switch (data.operation) {
//     case "ADD":
//       return (data.value as number) || 0;
//     case "SUBTRACT":
//       return -(data.value as number) || 0;
//     case "MULTIPLY":
//       return (typeof currentValue === "number" ? currentValue : 0) * (data.value as number);
//     case "SET_VALUE":
//       return data.value;
//     case "SET_MINIMUM":
//       return Math.max(typeof currentValue === "number" ? currentValue : 0, data.value as number);
//     case "SET_MAXIMUM":
//       return Math.min(typeof currentValue === "number" ? currentValue : 0, data.value as number);
//     default:
//       return 0; // most special ops return 0 here (they are flags)
//   }
// }

// function applySetOperation(data: ModifierData, current: number | string): number | string {
//   if (data.operation === "SET_VALUE") return data.value;
//   if (data.operation === "SET_MINIMUM" && typeof current === "number") {
//     return Math.max(current, data.value as number);
//   }
//   if (data.operation === "SET_MAXIMUM" && typeof current === "number") {
//     return Math.min(current, data.value as number);
//   }
//   return current;
// }

// function applyDieSteps(baseDie: string, upgrades: string[]): string {
//   const dieOrder = ["d4", "d6", "d8", "d10", "d12"];
//   let currentIndex = dieOrder.indexOf(baseDie);

//   for (const step of upgrades) {
//     if (step === "UPGRADE_DIE") {
//       currentIndex = Math.min(currentIndex + 1, dieOrder.length - 1);
//     } else if (step === "DOWNGRADE_DIE") {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }
//   }

//   return dieOrder[currentIndex];
// }

// // ===================================================================
// // CONVENIENCE WRAPPERS (use these in the route handlers / roll logic)
// // ===================================================================

// export async function getEffectivePace(_characterId: string, modifiers: any[]) {
//   const ctx: RollContext = {
//     target: "DERIVED_STAT",
//     baseValue: 6, // default Pace
//     contextType: "GLOBAL",
//     trigger: "PASSIVE",
//   };
//   const result = await evaluateModifiers(modifiers, ctx);
//   return result.finalValue as number;
// }

// export async function getEffectiveSkillDie(_skillName: string, baseDie: string, modifiers: any[]) {
//   const ctx: RollContext = {
//     target: "SKILL",
//     baseValue: baseDie,
//     contextType: "GLOBAL",
//     trigger: "ON_ROLL",
//   };
//   const result = await evaluateModifiers(modifiers, ctx);
//   return {
//     die: result.effectiveDieType || baseDie,
//     bonus: typeof result.finalValue === "number" ? result.finalValue : 0,
//   };
// }

// // ... add more helpers for Initiative, Toughness, Soak, etc. as needed