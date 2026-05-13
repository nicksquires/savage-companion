import type { Advance, CharacterDraft } from "../../types/CharacterBuilder";
import { Attribute, DieType, Rank } from "@prisma/client";
import { getDieValue } from "@/lib/utils/getDieValue";
import { ActiveModifiers } from "../../types/CharacterBuilder";
import { getUnmetRequirements } from "./rulesEngine";

export const CORE_SKILLS = ["athletics", "common-knowledge", "notice", "persuasion", "stealth"];
export const RANKS: Rank[] = [Rank.NOVICE, Rank.SEASONED, Rank.VETERAN, Rank.HEROIC, Rank.LEGENDARY];

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string[]>;
  tabStates: Record<string, "valid" | "invalid" | "warning">;
  attributePointsUsed: number;
  skillPointsUsed: number;
  hindrancePointsUsed: number;
  wealthSpent: number;
  maxWealth: number;
  remainingWealth: number;
};

export const calculateAttributePointsUsed = (
  attrs: Record<Attribute, DieType>): number => {
  return Object.values(attrs).reduce((total, die) => {
    const steps = getDieValue(die) / 2 - 2;
    return total + Math.max(0, steps);
  }, 0);
};

export const calculateSkillPointsUsed = (
  skills: Record<string, DieType>,
  attributes: Record<Attribute, DieType>,
  availableSkills: Array<{ slug: string; linkedAttribute: string }>
): number => {
  return Object.entries(skills).reduce((total, [skillSlug, die]) => {
    const skillDef = availableSkills.find((s) => s.slug === skillSlug);
    const linkedAttr = skillDef ? skillDef.linkedAttribute.toUpperCase() : "SMARTS"; 
    
    const attrValue = getDieValue(attributes[linkedAttr as Attribute] || "D4");
    const skillValue = getDieValue(die);

    let cost = 0;
    
    // RULE 1: If NOT a core skill, first D4 costs 1 point.
    const isCore = CORE_SKILLS.includes(skillSlug);
    
    if (!isCore && skillValue >= 4) { cost += 1; } // Cost to 'buy' the skill at D4

    // RULE 2: Leveling up: We start loop at 4 (D4). 
    // Each step up (+2) costs 1 or 2.
    for (let i = 4; i < skillValue; i += 2) {
      // If we are moving from D4 -> D6, the 'target' die is i + 2
      const targetDieValue = i + 2;
      cost += targetDieValue <= attrValue ? 1 : 2;
    }

    return total + cost;
  }, 0);
};

// Helper to determine Rank dynamically
export const calculateRank = (advancesEarned: number, advancesPerRank: number = 4) => {
  const rankIndex = Math.floor(advancesEarned / advancesPerRank);
  const clampedIndex = Math.min(rankIndex, RANKS.length - 1);  // Cap at Legendary (index 4)
  return {
    name: RANKS[clampedIndex],
    index: clampedIndex
  };
};

// Single Source of Truth for Rank calculations
export const getRankForAdvance = (advanceNumber: number, advancesPerRank: number = 4): Rank => {
  // 1,2,3 -> index 0 (NOVICE). 4,5,6,7 -> index 1 (SEASONED).
  const rankIndex = Math.floor(advanceNumber / advancesPerRank);
  const clampedIndex = Math.min(rankIndex, RANKS.length - 1);
  return RANKS[clampedIndex];
};

export const getNextAdvanceContext = (
  currentAdvancementLog: Advance[], 
  advancesPerRank: number = 4
): { advanceNumber: number; rankAtTime: Rank } => {
  const nextNumber = currentAdvancementLog.length + 1;
  return {
    advanceNumber: nextNumber,
    rankAtTime: getRankForAdvance(nextNumber, advancesPerRank)
  };
};

export const canIncreaseAttribute = (
  targetRank: Rank,
  targetAdvanceNumber: number,
  advancementLog: Advance[]
) => {
  if (targetRank === Rank.LEGENDARY) return true; 
  
  const alreadyRaisedInRank = advancementLog.some(
    advance => 
      advance.type === "ATTRIBUTE" && 
      advance.rankAtTime === targetRank && 
      advance.advanceNumber !== targetAdvanceNumber // Ignore the slot we are currently editing
  );
  
  return !alreadyRaisedInRank;
};

export const validateCharacter = (
  draft: CharacterDraft, 
  activeModifiers: ActiveModifiers,
  availableSkills: Array<{ slug: string; linkedAttribute: string }>,
  availableArcaneBackgrounds: any[]
): ValidationResult => {
  const errors: Record<string, string[]> = {};
  const tabStates: Record<string, "valid" | "invalid" | "warning"> = {};

  const attributePointsUsed = calculateAttributePointsUsed(draft.attributes);
  const skillPointsUsed = calculateSkillPointsUsed(draft.skills, draft.attributes, availableSkills);

  ////////////////////////////
  //  ADVANCEMENT VALIDATION
  ////////////////////////////
  const advAlloc = { attribute: 0, edge: 0, skill: 0, hindrance: 0 };

if (draft.advancementsEnabled && draft.advancementLog) {
  draft.advancementLog.forEach((adv: Advance) => {
    if (adv.type === "ATTRIBUTE") advAlloc.attribute += 1;
    if (adv.type === "EDGE") advAlloc.edge += 1;
    if (adv.type === "SKILL") advAlloc.skill += 1; 
    // if (adv.type === "HINDRANCE") advAlloc.hindrance += 1;
  });
}

  ////////////////////////////
  //  HINDRANCES VALIDATION
  ////////////////////////////

  const hindrancePointsUsed = draft.hindrances.reduce((sum, h) => sum + (h.severity === "MAJOR" ? 2 : 1), 0);

  // Calculate points SPENT on Hindrance point allocations
  const allocations = draft.builderState?.hindranceAllocations || { attribute: 0, skill: 0, edge: 0, wealth: 0 };
  const allocAttr = allocations.attribute || 0;
  const allocEdge = allocations.edge || 0;
  const allocSkill = allocations.skill || 0;
  const allocWealth = allocations.wealth || 0;
  
  const allocatedCost = (allocAttr * 2) + (allocEdge * 2) + allocSkill + allocWealth;

  // Validate allocation economy explicitly
  let hindrancesInvalid = false;
  if (allocatedCost > hindrancePointsUsed) {
    errors.hindrances = [`Over-allocated reward points! Spent ${allocatedCost} but only earned ${hindrancePointsUsed}.`];
    hindrancesInvalid = true;
  }
  if (hindrancePointsUsed > draft.maxHindrancePoints) {
    errors.hindrances = [`Exceeded ${draft.maxHindrancePoints} point maximum`];
    hindrancesInvalid = true;
  }
  // EXPLICITLY SET VALID
  tabStates.hindrances = hindrancesInvalid ? "invalid" : "valid";

  ////////////////////////////
  //    TRAITS VALIDATION
  ////////////////////////////

  // Apply allocations to effective maximums & Validate Traits
  let traitsInvalid = false;
  const bonusAttributePoints = activeModifiers?.attributeDieSteps?.["choice:attribute"] || 0;
  const effectiveMaxAttributePoints = draft.availableAttributePoints + bonusAttributePoints + allocAttr + advAlloc.attribute;
  const effectiveMaxSkillPoints = draft.availableSkillPoints + allocSkill + (advAlloc.skill * 2); 

  if (attributePointsUsed > effectiveMaxAttributePoints) {
    errors.attributes = [`Used ${attributePointsUsed} of ${effectiveMaxAttributePoints}`];
    traitsInvalid = true;
  }
  if (skillPointsUsed > effectiveMaxSkillPoints) {
    errors.skills = [`Used ${skillPointsUsed} of ${effectiveMaxSkillPoints}`];
    traitsInvalid = true;
  }
  // EXPLICITLY SET VALID
  tabStates.traits = traitsInvalid ? "invalid" : "valid";

  ////////////////////////////
  //  EDGES VALIDATION
  ////////////////////////////

  // Count free edges granted by active modifiers (e.g., Human "Free Edge" racial ability)
  const freeEdgesGranted = activeModifiers.freeEdgeChoices?.length || 0;

  // Add edges bought with hindrance points
  const maxAllowedEdges = freeEdgesGranted + allocEdge + advAlloc.edge;
  const currentEdgeCount = draft.edges?.length || 0;

  if (currentEdgeCount > maxAllowedEdges) {
    errors.edges = [`Over edge limit! You have ${currentEdgeCount} but are only allowed ${maxAllowedEdges}.`];
    tabStates.edges = "invalid";
  } else {
    tabStates.edges = "valid";
  }

  // PREREQUISITE VALIDATION 
  if (draft.edges && Array.isArray(draft.edges)) {
    draft.edges.forEach((edge: any) => {
      const unmet = getUnmetRequirements(edge, draft);
      if (unmet.length > 0) {
        if (!errors.edgeRequirements) errors.edgeRequirements = [];
        errors.edgeRequirements.push(`${edge.name} requirements not met: ${unmet.join(", ")}`);
        tabStates.edges = "invalid"; // Flag the tab if they broke a prerequisite
      }
    });
  }

  ////////////////////////////
  //  POWERS VALIDATION
  ////////////////////////////
  const hasArcaneEdge = draft.edges.some((e: any) => e.slug.includes("arcane-background"));
  
  if (hasArcaneEdge) {
    if (!draft.arcaneBackgroundId) {
      errors.powers = ["You must select an Arcane Background type."];
      tabStates.powers = "invalid";
    } else {
      const selectedAB = availableArcaneBackgrounds.find(ab => ab.id === draft.arcaneBackgroundId);
      
      // Calculate base capacity + bonus capacity from Edges
      const basePowers = selectedAB ? selectedAB.startingPowers : 0;
      const maxPowers = basePowers + (activeModifiers?.grantedPowers || 0); 
      
      const currentPowers = draft.powers?.length || 0;

      if (currentPowers > maxPowers) {
        errors.powers = [`Too many powers selected. Maximum allowed: ${maxPowers}.`];
        tabStates.powers = "invalid";
      } else if (currentPowers < maxPowers) {
        tabStates.powers = "warning"; // TODO: Flag as warning if they haven't spent all their powers
      } else {
        tabStates.powers = "valid";
      }
    }
  } else {
    // If they don't have the edge, but somehow have powers/AB set, flag it
    if ((draft.powers && draft.powers.length > 0) || draft.arcaneBackgroundId) {
        errors.powers = ["Powers selected without Arcane Background Edge."];
        tabStates.powers = "invalid";
    }
  }

  ////////////////////////////
  //  GEAR & WEALTH VALIDATION
  ////////////////////////////
    
  // Calculate the bonus cash from allocations (1 pt = 1 unit of starting wealth)
  // E.g., 1 pt * 500 = +$500
  const allocatedWealthBonus = allocWealth * draft.startingWealth;

  // Combine Base + Hindrance Allocations + Any flat Edge bonuses, then apply the Multiplier
  const maxWealth = (
    draft.startingWealth + 
    allocatedWealthBonus + 
    (activeModifiers?.bonusWealth || 0)
  ) * (activeModifiers?.wealthMultiplier || 1);
  
  // Calculate the cart total
  const wealthSpent = draft.inventory?.reduce((total, instance) => {
    return total + (instance.cost * instance.quantity);
  }, 0) || 0;

  const remainingWealth = maxWealth - wealthSpent;

  if (remainingWealth < 0) {
    errors.gear = [`Over budget by $${Math.abs(remainingWealth)}.`];
    tabStates.gear = "invalid";
  } else {
    tabStates.gear = "valid";
  }

  ////////////////////////////
  //  SOURCES VALIDATION
  ////////////////////////////

  if (!draft.sources || draft.sources.length === 0) {
    errors.sources = ["Please select at least one core rulebook or source material."];
    tabStates.concept = "warning";
  } else {
    tabStates.concept = "valid";
  }

  ////////////////////////////
  //  SUMMARY VALIDATION
  ////////////////////////////
  if (draft.advancementsEnabled) {
    const spentAdvances = draft.advancementLog?.length || 0;
    if (draft.advancesEarned !== undefined && spentAdvances > draft.advancesEarned) {
      if (!errors.summary) errors.summary = [];
      errors.summary.push(`You have spent ${spentAdvances} advances, but only have ${draft.advancesEarned} available!`);
    }
  }

  const isValid = Object.keys(errors).length === 0;
  tabStates.summary = isValid ? "valid" : "invalid";

  return {
    isValid,
    errors,
    tabStates,
    attributePointsUsed,
    skillPointsUsed,
    hindrancePointsUsed,
    wealthSpent,
    maxWealth,
    remainingWealth
  };
};