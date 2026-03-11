// // PSEUDOCODE DRAFT- NEEDS REVIEW

// // How It Works in Gameplay

// // Campaign Start → Load EffectDefinitions for items, edges, powers, creature abilities.
// // Apply PASSIVE → automatic bonuses (e.g., Armor Bonus, Quick Draw).
// // Register CONDITIONAL/TRIGGERED → in-memory triggers for events (e.g., Blessed → ON_DAMAGE).
// // Combat Loop → Each action/event calls processTrigger(entityType, entityId, trigger, context).
// // Temporary Effects / OVERRIDE → Add modifiers to EntityModifier table with expiry.
// // Cleanup → Regularly expire EntityModifiers based on expiresAt.

// import { EffectDefinition, EntityModifier, DurationType } from "../types/effects_old";
// import { prisma } from "../../prisma/client";

// // Apply all effects from a list of EffectDefinitions to an entity
// export async function applyEffectsToEntity(
//   entityType: "PLAYER" | "CREATURE",
//   entityId: string,
//   effects: EffectDefinition[]
// ) {
//   for (const effect of effects) {
//     switch (effect.type) {
//       case "PASSIVE":
//         await applyPassiveEffect(entityType, entityId, effect);
//         break;

//       case "CONDITIONAL":
//         // Registered in memory for triggers
//         registerConditionalEffect(entityType, entityId, effect);
//         break;

//       case "TRIGGERED":
//         registerTriggeredEffect(entityType, entityId, effect);
//         break;

//       case "OVERRIDE":
//         await applyOverrideEffect(entityType, entityId, effect);
//         break;

//       default:
//         console.warn("Unknown effect type", effect);
//     }
//   }
// }

// /**
//  * Apply a passive effect immediately
//  */
// async function applyPassiveEffect(
//   entityType: "PLAYER" | "CREATURE",
//   entityId: string,
//   effect: EffectDefinition
// ) {
//   await prisma.entityModifier.create({
//     data: {
//       entityType,
//       entityId,
//       name: effect.kind,
//       description: effect.description,
//       sourceType: "EFFECT",
//       sourceId: null,
//       data: effect,
//       durationType: "PERMANENT",
//       isActive: true,
//     },
//   });
// }

// /**
//  * Apply a temporary override effect (e.g., a Buff)
//  */
// async function applyOverrideEffect(
//   entityType: "PLAYER" | "CREATURE",
//   entityId: string,
//   effect: EffectDefinition
// ) {
//   const expiresAt = effect.duration
//     ? calculateExpiry(effect.duration)
//     : effect.expireAt
//     ? new Date(effect.expireAt)
//     : undefined;

//   await prisma.entityModifier.create({
//     data: {
//       entityType,
//       entityId,
//       name: effect.kind,
//       description: effect.description,
//       sourceType: "EFFECT",
//       sourceId: null,
//       data: effect,
//       durationType: effect.duration || "SESSION",
//       expiresAt,
//       isActive: true,
//     },
//   });
// }

// /**
//  * Conditional / Triggered effects are registered in memory
//  * to be evaluated on specific game events
//  */
// const triggerRegistry: Record<string, EffectDefinition[]> = {};

// function registerConditionalEffect(
//   entityType: string,
//   entityId: string,
//   effect: EffectDefinition
// ) {
//   const key = `${entityType}:${entityId}:${effect.trigger}`;
//   if (!triggerRegistry[key]) triggerRegistry[key] = [];
//   triggerRegistry[key].push(effect);
// }

// /**
//  * Called by combatEngine when an event occurs
//  */
// export async function processTrigger(
//   entityType: string,
//   entityId: string,
//   trigger: string,
//   context?: any
// ) {
//   const key = `${entityType}:${entityId}:${trigger}`;
//   const effects = triggerRegistry[key];
//   if (!effects) return;

//   for (const effect of effects) {
//     // Check conditions
//     if (effect.condition && !evaluateCondition(effect.condition, context)) continue;

//     // Apply success/failure effects
//     const payloads = effect.onSuccess || [];
//     for (const payload of Array.isArray(payloads) ? payloads : [payloads]) {
//       await applyOverrideEffect(entityType, entityId, payload);
//     }
//   }
// }

// /**
//  * Example: check if condition passes
//  */
// function evaluateCondition(condition: any, context: any): boolean {
//   if (!condition) return true;

//   if (condition.requiresRaise && !context.raise) return false;
//   if (condition.targetHasCategory && !context.target?.categories.includes(condition.targetHasCategory)) return false;
//   if (condition.userHasEdge && !context.userEdges.includes(condition.userHasEdge)) return false;

//   return true;
// }

// /**
//  * Calculates expiry based on duration type
//  */
// function calculateExpiry(duration: DurationType): Date {
//   const now = new Date();
//   switch (duration) {
//     case "TURN":
//       return new Date(now.getTime() + 6_000); // e.g., 6s per turn
//     case "SCENE":
//       return new Date(now.getTime() + 30 * 60_000); // 30 minutes per scene
//     case "SESSION":
//       return new Date(now.getTime() + 3 * 60 * 60_000); // 3 hours per session
//     case "PERMANENT":
//     default:
//       return new Date(now.getTime() + 100 * 365 * 24 * 60 * 60_000); // arbitrary "forever"
//   }
// }