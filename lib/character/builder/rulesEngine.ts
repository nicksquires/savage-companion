import { ActiveModifiers, Advance, EdgeRequirement, GenericTrait, ModifierData } from "@/lib/types/CharacterBuilder";
import { getDieValue } from "@/lib/utils/getDieValue";
import { DieType } from "@prisma/client";

export const defaultActiveModifiers: ActiveModifiers = {
  freeEdgeChoices: [],
  attributeDieSteps: {},
  skillDieSteps: {},
  skillBonuses: {},
  derivedStatBonuses: {},
  grantedAbilities: [],
  grantedHindrances: [],
  grantedPowers: 0,
  bonusPowerPoints: 0,
  bonusWealth: 0,
  wealthMultiplier: 1,
};

export function calculateActiveModifiers(abilities: GenericTrait[]): ActiveModifiers {
  const mods = JSON.parse(JSON.stringify(defaultActiveModifiers)) as ActiveModifiers;

  if (!abilities || !Array.isArray(abilities)) return mods;

  abilities.forEach((ability) => {
    let modsArray = ability.modifierData;
    
    // Fallback- i.e: if stringified JSON by accident
    if (typeof modsArray === 'string') {
      try { modsArray = JSON.parse(modsArray); } catch(e) { return; }
    }

    if (!Array.isArray(modsArray)) return;

    // "I guarantee this JSON array is structured as ModifierData"
    const typedModsArray = modsArray as unknown as ModifierData[];

    // "NOW IT IS SAFE TO ITERATE"
    typedModsArray.forEach((mod) => {
      
      // 1. EDGES 
      if (mod.target === "GRANT_EDGE" && mod.operation === "GRANT") {
        mods.freeEdgeChoices.push(String(mod.value));
      }

      // 2. DERIVED STATS
      if (mod.target === "DERIVED_STAT" && typeof mod.value === "number") {
        const statName = mod.condition?.targetHasTag || "unknown_stat";
        if (!mods.derivedStatBonuses[statName]) mods.derivedStatBonuses[statName] = 0;
        
        if (mod.operation === "ADD") mods.derivedStatBonuses[statName] += mod.value;
        if (mod.operation === "SUBTRACT") mods.derivedStatBonuses[statName] -= mod.value;
      }

      // 3. ATTRIBUTES
      if (mod.target === "ATTRIBUTE" && typeof mod.value === "number") {
        const attrTarget = mod.condition?.targetHasTag || "choice:attribute";
        if (!mods.attributeDieSteps[attrTarget]) mods.attributeDieSteps[attrTarget] = 0;

        if (mod.operation === "UPGRADE_DIE") mods.attributeDieSteps[attrTarget] += mod.value;
        if (mod.operation === "SUBTRACT") mods.attributeDieSteps[attrTarget] -= mod.value;
      }

      // 4. SKILLS
      if (mod.target === "SKILL" && typeof mod.value === "number") {
        const skillTarget = mod.condition?.targetHasTag || mod.condition?.rollType || "choice:skill";
        
        if (mod.operation === "UPGRADE_DIE") {
          if (!mods.skillDieSteps[skillTarget]) mods.skillDieSteps[skillTarget] = 0;
          mods.skillDieSteps[skillTarget] += mod.value;
        }
        
        if (mod.operation === "ADD" || mod.operation === "SUBTRACT") {
          if (!mods.skillBonuses[skillTarget]) mods.skillBonuses[skillTarget] = 0;
          mods.skillBonuses[skillTarget] += (mod.operation === "ADD" ? mod.value : -mod.value);
        }
      }

      // 5. PASSIVE ABILITIES / NATURAL WEAPONS
      if (mod.target === "GRANT_ABILITY" && mod.operation === "GRANT") {
        mods.grantedAbilities.push(String(mod.value));
      }

      // 6. HINDRANCES
      if (mod.target === "GRANT_HINDRANCE" && mod.operation === "GRANT") {
        mods.grantedHindrances.push(String(mod.value));
      }

      // 7. POWERS
      if (mod.target === "GRANT_POWER" && mod.operation === "ADD") {
        // Safely cast to number, default to 0 if something weird gets passed
        mods.grantedPowers += Number(mod.value) || 0; 
      }

      // 8. POWER POINTS
      if (mod.target === "POWER_POINTS" && mod.operation === "ADD") {
        mods.bonusPowerPoints += Number(mod.value) || 0;
      }

      // 9. STARTING WEALTH
      if (mod.target === "STARTING_WEALTH" && mod.operation === "ADD") {
        mods.bonusWealth += Number(mod.value) || 0;
      }
      if (mod.target === "STARTING_WEALTH" && mod.operation === "MULTIPLY") {
        // Use Math.max to prevent Rich and Filthy Rich from stacking to 15x
        // TODO: refactor when edges integrate 'improved' versions
        mods.wealthMultiplier = Math.max(mods.wealthMultiplier, Number(mod.value) || 1);
      }
    });
  });

  return mods;
}

export function getUnmetRequirements(edge: GenericTrait, draft: any): string[] {
  const unmet: string[] = [];
  let reqs = edge.requirements;

  if (typeof reqs === 'string') {
    try { reqs = JSON.parse(reqs); } catch (e) { return unmet; }
  }

  if (!Array.isArray(reqs)) return unmet;

  const typedReqs = reqs as EdgeRequirement[];

  typedReqs.forEach((req) => {
    // Check Attributes
    if (req.type === "ATTRIBUTE" && req.attribute && req.dieType) {
      const charDie = draft.attributes[req.attribute.toUpperCase()] || "D4";
      if (getDieValue(charDie as DieType) < getDieValue(req.dieType)) {
        unmet.push(`Requires ${req.attribute} ${req.dieType}`);
      }
    }
    
    // Check Skills
    if (req.type === "SKILL" && req.skill && req.dieType) {
      const charDie = draft.skills[req.skill.toLowerCase()] || "Untrained";
      if (charDie === "Untrained" || getDieValue(charDie as DieType) < getDieValue(req.dieType)) {
        unmet.push(`Requires ${req.skill} ${req.dieType}`);
      }
    }

    // Check Other Edges
    if (req.type === "EDGE" && req.edgeSlug) {
      const hasEdge = draft.edges.some((e: GenericTrait) => e.slug === req.edgeSlug);
      if (!hasEdge) unmet.push(`Requires Edge: ${req.edgeSlug}`);
    }

    // Check Rank (Assuming draft.rank exists, default to NOVICE)
    const rankValues: Record<string, number> = { NOVICE: 1, SEASONED: 2, VETERAN: 3, HEROIC: 4, LEGENDARY: 5 };
    if (req.type === "RANK" && req.rank) {
      const charRankVal = rankValues[draft.rank || "NOVICE"];
      const reqRankVal = rankValues[req.rank];
      if (charRankVal < reqRankVal) {
        unmet.push(`Requires ${req.rank} Rank`);
      }
    }
  });

  return unmet;
}