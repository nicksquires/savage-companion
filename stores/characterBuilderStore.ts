import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ActiveModifiers, Advance, CharacterDraft, GenericTrait, HindranceAllocations, SkillDefinition } from "@/lib/types/CharacterBuilder";
import { initialDraft } from "@/lib/types/CharacterBuilder";
import { getNextAdvanceContext, validateCharacter } from "@/lib/character/builder/validation";
import { calculateActiveModifiers, defaultActiveModifiers } from "@/lib/character/builder/rulesEngine";
import { DieType } from "@prisma/client";

export const useCharacterBuilder = create<
  CharacterDraft & {
    activeModifiers: ActiveModifiers;

    availableSkills: SkillDefinition[];
    availableHindrances: GenericTrait[];
    availableEdges: GenericTrait[];
    availableArcaneBackgrounds: any[];
    availablePowers: GenericTrait[];
    availableItems: any[];
    inventory: any[];

    advancementsEnabled: boolean;
    advancesEarned: number;
    advancesUnspent: number;
    advancementLog: Advance[];

    setRace: (raceId: string, expandedAbilities: GenericTrait[]) => void;
    setAvailableSkills: (skills: SkillDefinition[]) => void;
    setAvailableHindrances: (hindrances: any[]) => void;
    setAvailableEdges: (edges: GenericTrait[]) => void;
    setAvailableArcaneBackgrounds: (abs: any[]) => void;
    setAvailablePowers: (powers: any[]) => void;

    addSkill: (skillSlug: string) => void;
    removeSkill: (skillSlug: string) => void;
    
    addHindrance: (slug: string) => void;
    removeHindrance: (slug: string) => void;
    setHindranceAllocation: (type: keyof HindranceAllocations, amount: number) => void;

    addEdge: (slug: string) => void;
    removeEdge: (slug: string) => void;

    setArcaneBackground: (id: string | null) => void;

    addPower: (power: any) => void;
    removePower: (slug: string) => void;

    setAvailableItems: (items: any[]) => void;
    buyItem: (item: any) => void;
    sellItem: (itemId: string) => void;
    updateItemQuantity: (itemId: string, delta: number) => void;
    toggleEquipped: (itemId: string) => void;

    toggleAdvancementEnabled: () => void;
    addAdvance: (advancePayload: Advance) => void;
    removeAdvance: (advanceId: string) => void;
    updateAdvancesEarned: (total: number) => void;

    setDraft: (updater: Partial<CharacterDraft> | ((draft: CharacterDraft) => CharacterDraft)) => void;
    initializeDraft: (serverData: any) => void;
    validate: () => void;
    reset: () => void;
  }
>()(
  devtools((set, get) => ({
    ...initialDraft,
    activeModifiers: defaultActiveModifiers,
    availableSkills: [],
    availableHindrances: [],
    availableEdges: [],
    availableArcaneBackgrounds: [],
    availablePowers: [],
    advancementsEnabled: false,
    advancesEarned: 0,
    advancesUnspent: 0,
    advancementLog: [],

    initializeDraft: (serverData) => {
      set((state) => {

        // Hydrate Skills Dictionary
        const hydratedSkills: Record<string, DieType> = {};
        if (serverData.skills && Array.isArray(serverData.skills)) {
          serverData.skills.forEach((item: any) => {
            if (item.skill?.slug && item.dieType) hydratedSkills[item.skill.slug] = item.dieType as DieType;
          });
        } else if (serverData.skills && typeof serverData.skills === "object") {
          Object.assign(hydratedSkills, serverData.skills);
        }

        // Hydrate Hindrances Array (extract full objects so we have modifierData)
        const hydratedHindrances: GenericTrait[] = [];
        if (serverData.hindrances && Array.isArray(serverData.hindrances)) {
            serverData.hindrances.forEach((item: any) => {
                if (item.hindrance) {
                  hydratedHindrances.push({
                    ...item.hindrance,
                    _type: item.hindrance.severity
                  });
                }
            });
        }

        // Hydrate Edges array
        const hydratedEdges: GenericTrait[] = [];
        if (serverData.edges && Array.isArray(serverData.edges)) {
          serverData.edges.forEach((item: any) => {
            if (item.edge) hydratedEdges.push(item.edge);
        });
        }

        // Hydrate Powers as full objects
        const hydratedPowers: GenericTrait[] = [];
        if (serverData.powers && Array.isArray(serverData.powers)) {
          serverData.powers.forEach((item: any) => {
            if (item.power) hydratedPowers.push(item.power);
        });
        }

        // Hydrate AB        
        const fetchedAB = serverData.arcaneBackgrounds?.[0]?.arcaneBackground;
        const hydratedABId = fetchedAB?.id || null;

        // Seed the available list so the validator has the 'startingPowers' data on load!
        const availableABsForValidation = state.availableArcaneBackgrounds.length > 0 
          ? state.availableArcaneBackgrounds 
          : (fetchedAB ? [fetchedAB] : []);

        const newInventory = serverData.inventory || [];
        const startingWealth = serverData.builderState?.startingWealth ?? 500;

        // Extract advancementLog from Prisma
        const hydratedAdvancements: Advance[] = (serverData.advancementLog || [])
          .map((log: any) => ({
            id: log.id,
            advanceNumber: log.advanceNumber,
            rankAtTime: log.rankAtTime, 
            type: log.type as Advance["type"], 
            payload: log.payload
          }))
          .sort((a: Advance, b: Advance) => a.advanceNumber - b.advanceNumber);

        const mappedDraft = {
          ...state,
          name: serverData.name || "",
          concept: serverData.concept || "",
          raceId: serverData.raceId || "",
          imageUrl: serverData.imageUrl || "",
          campaignId: serverData.campaignId || "",
          sources: serverData.sources || [],
          builderState: serverData.builderState || {},
          skills: Object.keys(hydratedSkills).length > 0 ? hydratedSkills : state.skills,
          hindrances: hydratedHindrances.length > 0 ? hydratedHindrances : state.hindrances,
          edges: hydratedEdges.length > 0 ? hydratedEdges : state.edges,
          powers: hydratedPowers.length > 0 ? hydratedPowers : state.powers,
          arcaneBackgroundId: hydratedABId || state.arcaneBackgroundId,
          inventory: newInventory,
          startingWealth: startingWealth,
          attributes: {
            AGILITY: serverData.agility || "D4",
            SMARTS: serverData.smarts || "D4",
            SPIRIT: serverData.spirit || "D4",
            STRENGTH: serverData.strength || "D4",
            VIGOR: serverData.vigor || "D4",
          },
          advancementsEnabled: serverData.advancementsEnabled ?? false,
          advancesEarned: serverData.advancesEarned ?? 0,
          advancesUnspent: serverData.advancesUnspent ?? 0,
          advancementLog: hydratedAdvancements,
        };

        // Combine Racial Abilities + Active Hindrances + Advancement Edges to hydrate the Rules Engine
        const raceAbilities = mappedDraft.builderState?.racialAbilities || [];

        const advancedEdges = hydratedAdvancements
          .filter(a => a.type === "EDGE")
          .map(a => state.availableEdges.find(e => e.slug === a.payload.edgeSlug))
          .filter(Boolean);

        const allActiveTraits = [...raceAbilities, ...mappedDraft.hindrances, ...mappedDraft.edges, ...advancedEdges];
        const activeMods = calculateActiveModifiers(allActiveTraits);
        
        // Calculate hindrance points used (Major = 2, Minor = 1)
        const hindrancePts = mappedDraft.hindrances.reduce((sum, h: any) => sum + (h.severity === "MAJOR" ? 2 : 1), 0);

        const validation = validateCharacter(
          mappedDraft, 
          activeMods, 
          mappedDraft.availableSkills, 
          availableABsForValidation
        );

        return {
          ...mappedDraft,
          availableArcaneBackgrounds: availableABsForValidation,
          activeModifiers: activeMods,
          hindrancePointsUsed: hindrancePts,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          validationState: {
            isValid: validation.isValid,
            errors: validation.errors,
            tabStates: validation.tabStates,
          },
        };
      });
    },

    setDraft: (updater) => {
      set((state) => {
        const newState = typeof updater === "function" ? updater(state) : { ...state, ...updater };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);

        return {
          ...newState,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          validationState: {
            isValid: validation.isValid,
            errors: validation.errors,
            tabStates: validation.tabStates,
          },
        };
      });
    },

    setRace: (raceId, expandedAbilities) => {
      set((state) => {
        const currentBuilderState = typeof state.builderState === 'object' && state.builderState !== null ? state.builderState : {};
        const updatedBuilderState = { ...currentBuilderState, racialAbilities: expandedAbilities };
        
        // Re-calculate combining NEW race abilities with EXISTING hindrances
        const allActiveTraits = [...expandedAbilities, ...state.hindrances];
        const activeMods = calculateActiveModifiers(allActiveTraits);

        const tempState = { ...state, raceId, builderState: updatedBuilderState };
        const validation = validateCharacter(tempState, activeMods, tempState.availableSkills, tempState.availableArcaneBackgrounds);

        return {
          ...tempState,
          activeModifiers: activeMods,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          validationState: {
            isValid: validation.isValid,
            errors: validation.errors,
            tabStates: validation.tabStates,
          },
        };
      });
    },

    setAvailableSkills: (skills) => set({ availableSkills: skills }),

    addSkill: (skillSlug) => {
      set((state) => {
        const newSkills: Record<string, DieType> = { ...state.skills, [skillSlug]: "D4" as DieType };
        const newState = { ...state, skills: newSkills };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
    
        return { 
          ...newState, 
          skillPointsUsed: validation.skillPointsUsed,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates }
        };
      });
    },

    removeSkill: (skillSlug) => {
      set((state) => {
        const newSkills: Record<string, DieType> = { ...state.skills };
        delete newSkills[skillSlug];
        const newState = { ...state, skills: newSkills };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
        
        return { 
          ...newState, 
          skillPointsUsed: validation.skillPointsUsed,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates }
        };
      });
    },

    setAvailableHindrances: (hindrances) => set({ availableHindrances: hindrances }),

    addHindrance: (slug) => {
        set((state) => {
            // Find full object to grab modifierData & severity
            const hindranceObj = state.availableHindrances.find(h => h.slug === slug);
            if (!hindranceObj) return state;

            const newHindrances = [...state.hindrances, hindranceObj];
            
            // Re-run rules engine with added hindrance
            const raceAbilities = state.builderState?.racialAbilities || [];
            const activeMods = calculateActiveModifiers([...raceAbilities, ...newHindrances]);

            const newState = { ...state, hindrances: newHindrances };
            const hindrancePts = newHindrances.reduce((sum, h: any) => sum + (h.severity === "MAJOR" ? 2 : 1), 0);
            const validation = validateCharacter(newState, activeMods, state.availableSkills, state.availableArcaneBackgrounds);

            return {
                ...newState,
                activeModifiers: activeMods,
                hindrancePointsUsed: hindrancePts,
                attributePointsUsed: validation.attributePointsUsed,
                skillPointsUsed: validation.skillPointsUsed,
                wealthSpent: validation.wealthSpent,
                maxWealth: validation.maxWealth,
                remainingWealth: validation.remainingWealth,
                validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates }
            }
        });
    },

    removeHindrance: (slug) => {
        set((state) => {
            const newHindrances = state.hindrances.filter((h: any) => h.slug !== slug);
            
            // Re-run rules engine with removed hindrance
            const raceAbilities = state.builderState?.racialAbilities || [];
            const activeMods = calculateActiveModifiers([...raceAbilities, ...newHindrances]);

            const newState = { ...state, hindrances: newHindrances };
            const hindrancePts = newHindrances.reduce((sum, h: any) => sum + (h.severity === "MAJOR" ? 2 : 1), 0);
            const validation = validateCharacter(newState, activeMods, state.availableSkills, state.availableArcaneBackgrounds);

            return {
                ...newState,
                activeModifiers: activeMods,
                hindrancePointsUsed: hindrancePts,
                attributePointsUsed: validation.attributePointsUsed,
                skillPointsUsed: validation.skillPointsUsed,
                wealthSpent: validation.wealthSpent,
                maxWealth: validation.maxWealth,
                remainingWealth: validation.remainingWealth,
                validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates }
            }
        });
    },

    setHindranceAllocation: (type, amount) => {
      set((state) => {
        const currentBuilderState = state.builderState || {};
        const currentAllocations = currentBuilderState.hindranceAllocations || {
          attribute: 0, edge: 0, skill: 0, wealth: 0
        };

        const newAllocations = { ...currentAllocations, [type]: amount };
        const updatedBuilderState = { ...currentBuilderState, hindranceAllocations: newAllocations };
        
        const newState = { ...state, builderState: updatedBuilderState };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);

        return {
          ...newState,
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          validationState: { 
            isValid: validation.isValid, 
            errors: validation.errors, 
            tabStates: validation.tabStates 
          }
        };
      });
    },

    setAvailableEdges: (edges) => set({ availableEdges: edges }),

    addEdge: (slug) => {
      set((state) => {
        const edgeObj = state.availableEdges.find(e => e.slug === slug);
        if (!edgeObj) return state;

        const newEdges = [...state.edges, edgeObj];
        
        // Re-run rules engine including the new edge
        const raceAbilities = state.builderState?.racialAbilities || [];
        const activeMods = calculateActiveModifiers([...raceAbilities, ...state.hindrances, ...newEdges]);

        const newState = { ...state, edges: newEdges };
        const validation = validateCharacter(newState, activeMods, state.availableSkills, state.availableArcaneBackgrounds);

        return {
          ...newState,
          activeModifiers: activeMods,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates }
        };
      });
    },

    removeEdge: (slug) => {
      set((state) => {
        const newEdges = state.edges.filter((e: any) => e.slug !== slug);
        
        const isWipingAB = slug.includes("arcane-background");
        const newState = { 
            ...state, 
            edges: newEdges,
            arcaneBackgroundId: isWipingAB ? null : state.arcaneBackgroundId,
            powers: isWipingAB ? [] : state.powers 
        };

        const raceAbilities = state.builderState?.racialAbilities || [];
        const activeMods = calculateActiveModifiers([...raceAbilities, ...state.hindrances, ...newEdges]);

        const validation = validateCharacter(newState, activeMods, state.availableSkills, state.availableArcaneBackgrounds);

        return {
          ...newState,
          activeModifiers: activeMods,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates }
        };
      });
    },
    
    setAvailableArcaneBackgrounds: (abs) => set({ availableArcaneBackgrounds: abs }),

    setArcaneBackground: (id) => {
      set((state) => {
        const newState = { ...state, arcaneBackgroundId: id };
        // Passing state.availableArcaneBackgrounds as 4th arg
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
        return { ...newState, validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates } };
      });
    },
    
    setAvailablePowers: (powers) => set({ availablePowers: powers }),

    addPower: (power) => { 
      set((state) => {
        if (state.powers?.some(p => p.slug === power.slug)) return state;
        
        const newPowers = [...(state.powers || []), power];
        const newState = { ...state, powers: newPowers };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
        return { ...newState, validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates } };
      });
    },

    removePower: (slug) => {
      set((state) => {
        const currentPowers = state.powers || [];
        // Compare the object's slug to the provided string
        const newPowers = currentPowers.filter((p) => p.slug !== slug);
        
        const newState = { ...state, powers: newPowers };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
        
        return { 
          ...newState, 
          validationState: { 
            isValid: validation.isValid, 
            errors: validation.errors, 
            tabStates: validation.tabStates 
          } 
        };
      });
    },

    setAvailableItems: (items) => set({ availableItems: items }),

    buyItem: (item) => {
      set((state) => {
        const currentInv = state.inventory || [];
        const existing = currentInv.find(i => i.itemId === item.id);
        
        let newInventory;
        if (existing) {
          // Bump quantity if they already have it
          newInventory = currentInv.map(i => 
            i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          // Add new instance wrapper. Store cost locally for validation math!
          newInventory = [...currentInv, { itemId: item.id, quantity: 1, cost: item.cost || 0, isEquipped: false, item: item }];
        }

        const newState = { ...state, inventory: newInventory };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
        return { ...newState, 
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates } };
      });
    },

    sellItem: (itemId) => {
      set((state) => {
        const currentInv = state.inventory || [];
        const newInventory = currentInv.filter((i) => i.itemId !== itemId);

        const newState = { ...state, inventory: newInventory };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);

        return { 
          ...newState, 
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates } 
        };
      });
    },

    updateItemQuantity: (itemId, delta) => {
      set((state) => {
        const currentInv = state.inventory || [];
        const newInventory = currentInv.map((i) => {
          if (i.itemId === itemId) {
             const newQty = Math.max(0, i.quantity + delta);
             return { ...i, quantity: newQty };
          }
          return i;
        }).filter((i) => i.quantity > 0); // Auto-remove if it hits 0

        const newState = { ...state, inventory: newInventory };
        const validation = validateCharacter(newState, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);

        return { 
          ...newState,
          wealthSpent: validation.wealthSpent,
          maxWealth: validation.maxWealth,
          remainingWealth: validation.remainingWealth,
          validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates } 
        };
      });
    },

    toggleEquipped: (itemId) => {
      set((state) => {
        const currentInv = state.inventory || [];
        const newInventory = currentInv.map((i) => 
          i.itemId === itemId ? { ...i, isEquipped: !i.isEquipped } : i
        );
        
        return { ...state, inventory: newInventory };
      });
    },

    toggleAdvancementEnabled: () => set((state) => ({ 
      advancementsEnabled: !state.advancementsEnabled 
    })),

    addAdvance: (advancePayload) => {
      set((state) => {
        const currentLog = state.advancementLog || [];
        const advancesEarned = state.advancesEarned || 0;

        // Failsafe: Prevent adding more than the earned limit
        if (currentLog.length >= advancesEarned) return state;

        const advancesPerRank = state.builderState?.advancesPerRank || 4;
        
        // Use the helper from validation.ts to determine Rank and Number
        const { advanceNumber, rankAtTime } = getNextAdvanceContext(currentLog, advancesPerRank);

        const newAdvance = {
          ...advancePayload,
          advanceNumber,
          rankAtTime,
          // We use a simple timestamp-based temp ID for local UI keys; 
          // Prisma will replace this with a real UUID on the next save
          id: `temp-${Date.now()}`,
        };

        const newState = { 
          ...state, 
          advancementLog: [...currentLog, newAdvance] 
        };

        // Run validation to update math based on the new log entry
        const validation = validateCharacter(
          newState, 
          state.activeModifiers, 
          state.availableSkills, 
          state.availableArcaneBackgrounds
        );

        return {
          ...newState,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          validationState: {
            isValid: validation.isValid,
            errors: validation.errors,
            tabStates: validation.tabStates,
          },
        };
      });
    },

    removeAdvance: (advanceId) => {
      set((state) => {
        const currentLog = state.advancementLog || [];
        const targetIndex = currentLog.findIndex((a) => a.id === advanceId);
        
        if (targetIndex === -1) return state;

        // ENFORCE CHRONOLOGY: If they delete an earlier advance, 
        // we must drop all subsequent ones to keep the Rank math valid[cite: 2]
        const newLog = currentLog.slice(0, targetIndex);

        const newState = { ...state, advancementLog: newLog };
        
        const validation = validateCharacter(
          newState, 
          state.activeModifiers, 
          state.availableSkills, 
          state.availableArcaneBackgrounds
        );

        return {
          ...newState,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          validationState: {
            isValid: validation.isValid,
            errors: validation.errors,
            tabStates: validation.tabStates,
          },
        };
      });
    },

    updateAdvancesEarned: (total) => {
      set((state) => {
        // Update the total earned count directly
        const newState = { ...state, advancesEarned: Math.max(0, total) };

        // Validation will now flag if spentAdvances > earnedTotal[cite: 2]
        const validation = validateCharacter(
          newState, 
          state.activeModifiers, 
          state.availableSkills, 
          state.availableArcaneBackgrounds
        );

        return {
          ...newState,
          attributePointsUsed: validation.attributePointsUsed,
          skillPointsUsed: validation.skillPointsUsed,
          validationState: {
            isValid: validation.isValid,
            errors: validation.errors,
            tabStates: validation.tabStates,
          },
        };
      });
    },

    validate: () => {
      const state = get();
      const validation = validateCharacter(state, state.activeModifiers, state.availableSkills, state.availableArcaneBackgrounds);
      set({
        attributePointsUsed: validation.attributePointsUsed,
        skillPointsUsed: validation.skillPointsUsed,
        validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates },
      });
    },

    reset: () => {
      const fresh = { ...initialDraft };
      const validation = validateCharacter(fresh, defaultActiveModifiers, [], []);
      set({
        ...fresh,
        activeModifiers: defaultActiveModifiers,
        attributePointsUsed: validation.attributePointsUsed,
        skillPointsUsed: validation.skillPointsUsed,
        hindrancePointsUsed: 0,
        validationState: { isValid: validation.isValid, errors: validation.errors, tabStates: validation.tabStates },
      });
    },
  }))
);