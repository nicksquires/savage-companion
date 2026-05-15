import { DieType, Attribute, Rank } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export type CharacterDraft = {
  id?: string;
  userId: string;
  name: string;
  concept?: string;
  biography?: string;
  raceId: string;
  imageUrl?: string;
  campaignId?: string;

  attributes: Record<Attribute, DieType>;
  skills: Record<string, DieType>;
  hindrances: GenericTrait[];
  edges: GenericTrait[];
  arcaneBackgroundId: string | null;
  powers?: GenericTrait[];
  inventory: Array<{ 
    itemId: string, 
    quantity: number, 
    cost: number, 
    isEquipped?: boolean,
    item: any;
  }>;
  sources: string[];

  builderState?: any; 

  // Trait economy
  availableAttributePoints: number;
  availableSkillPoints: number;
  attributePointsUsed: number;
  skillPointsUsed: number;

  // Hindrance economy
  hindrancePointsUsed: number;
  maxHindrancePoints: number;
  hindranceAllocations?: HindranceAllocations;
  [key: string]: any;

  // Gear/wealth economy
  wealthSpent: number;
  startingWealth: number;
  maxWealth: number;
  remainingWealth: number;

  // Advancement economy
  advancementsEnabled?: boolean;
  advancesPerRank?: number;
  advancesEarned?: number;
  advancesUnspent?: number;

  validationState: {
    isValid: boolean;
    errors: Record<string, string[]>;
    tabStates: Record<string, "valid" | "invalid" | "warning">;
  };
};

export const initialDraft: CharacterDraft = {
  userId: "",
  name: "",
  biography: "",
  concept: "",
  raceId: "",
  attributes: { AGILITY: "D4", SMARTS: "D4", SPIRIT: "D4", STRENGTH: "D4", VIGOR: "D4" },
  skills: {},
  hindrances: [],
  edges: [],
  arcaneBackgroundId: null,
  powers: [],
  inventory: [],
  sources: [],
  availableAttributePoints: 5,
  availableSkillPoints: 12,
  attributePointsUsed: 0,
  skillPointsUsed: 0,
  hindrancePointsUsed: 0,
  maxHindrancePoints: 4,
  wealthSpent: 0,
  startingWealth: 500,
  maxWealth: 500,
  remainingWealth: 500,
  advancementsEnabled: false,
  advancesPerRank: 4,
  advancesEarned: 0,
  advancesUnspent: 0,
  validationState: { isValid: true, errors: {}, tabStates: {} },
};

type ExpandedAbility = {
  id: string;
  name: string;
  slug: string;
  value?: number;
  modifierData: any;
  _type: "ability" | "hindrance" | "edge";
};

export type RaceWithAbilities = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  expandedAbilities: ExpandedAbility[];
};

export type ModifierData = {
  target: string;
  operation: "GRANT" | "ADD" | "SUBTRACT" | "MULTIPLY" | "UPGRADE_DIE" | "DOWNGRADE_DIE" | "CHOICE" | "REVOKE";
  value: string | number;
  dieType?: string;
  trigger: "PASSIVE" | "ON_ROLL";
  condition?: any;
  stackingRule?: string;
};

export type ActiveModifiers = {
  freeEdgeChoices: string[]; // e.g., ["choice:edge:novice", "choice:edge:seasoned"]
  attributeDieSteps: Record<string, number>; // e.g., { "choice:attribute": 1, "agility": -1 }
  skillDieSteps: Record<string, number>;     // e.g., { "choice:skill": 1 }
  skillBonuses: Record<string, number>;      // Static roll bonuses (+1, -2)
  derivedStatBonuses: Record<string, number>;// e.g., { toughness: 1, pace: -1, parry: 1 }
  grantedAbilities: string[]; // e.g., ["aquatic", "low-light-vision", "flight-pace-6"]
  grantedHindrances: string[];// e.g., ["dependency", "cannot-speak"]
  grantedPowers: number; // e.g., 'New Powers' edge
  bonusPowerPoints: number; // e.g., 'Power Points' edge
  bonusWealth: number;     // e.g., 1 Hindrance point adds +1 'starting wealth' unit
  wealthMultiplier: number; // e.g., 3 for Rich edge
};

export type SkillDefinition = { 
  id: string; 
  name: string; 
  slug: string; 
  linkedAttribute: string;
};

// GENERIC TYPE catches RacialAbilities, Hindrances, Edges, and Powers
export type GenericTrait = {
  id?: string;
  name: string;
  slug: string;
  modifierData: JsonValue | ModifierData[]; // Accepts Prisma's JSON type
  linkedAttribute?: string;
  description?: string;
  summary?: string;
  severity?: "MAJOR" | "MINOR";
  rank?: Rank;
  powerPoints?: number;
  requirements?: JsonValue | EdgeRequirement[];
  _type?: string; // Optional metadata
  iconUrl?: string;
};

export type HindranceAllocations = {
  attribute: number; // +1 step per 2 pts
  edge: number;      // +1 edge per 2 pts
  skill: number;     // +1 pt per 1 pt
  wealth: number;    // +1 boost per 1 pt
};

export type EdgeRequirement = {
  type: "ATTRIBUTE" | "SKILL" | "EDGE" | "RANK";
  attribute?: string; // e.g., "AGILITY"
  skill?: string;     // e.g., "notice"
  edgeSlug?: string;  // e.g., "brawny"
  dieType?: DieType;  // e.g., "D8"
  rank?: Rank;        // e.g., "SEASONED"
};

export type Advance = {
  id?: string;
  advanceNumber: number;
  rankAtTime: Rank;
  type: "EDGE" | "ATTRIBUTE" | "SKILL" | "HINDRANCE_REMOVAL";
  payload?: any;
};