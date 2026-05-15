"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAvailableSkills } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import {
  Move,
  Brain,
  Flame,
  BicepsFlexed,
  Plus,
  Minus,
  StarIcon,
  Dices,
  Activity,
} from "lucide-react";
import { DieType } from "@prisma/client";
import { Advance } from "@/lib/types/CharacterBuilder";

const DIE_STEPS = ["D4", "D6", "D8", "D10", "D12"] as const;

const ATTRIBUTE_DATA = {
  AGILITY: {
    icon: Move,
    color: "text-success",
    description: "Fighting, Shooting, Stealth...",
  },
  SMARTS: {
    icon: Brain,
    color: "text-info",
    description: "Noticing, Hacking, Occult...",
  },
  SPIRIT: {
    icon: Flame,
    color: "text-warning",
    description: "Magic, Willpower, Intimidation...",
  },
  STRENGTH: {
    icon: BicepsFlexed,
    color: "text-error",
    description: "Damage, Athletics, Brawn...",
  },
  VIGOR: {
    icon: Activity,
    color: "text-accent",
    description: "Toughness, Vitality, Soaking Wounds...",
  },
} as const;

const ATTRIBUTES = Object.keys(
  ATTRIBUTE_DATA,
) as (keyof typeof ATTRIBUTE_DATA)[];

const SKILL_ICONS: Record<string, string> = {
  academics: "/images/icons/delapouite/classical-knowledge.svg", // or lorc/open-book
  athletics: "/images/icons/lorc/sprint.svg", // or run / jump-across
  battle: "/images/icons/lorc/sword-clash.svg",
  boating: "/images/icons/delapouite/sailboat.svg", // or boat-fishing
  "common-knowledge": "/images/icons/delapouite/classical-knowledge.svg",
  driving: "/images/icons/delapouite/steering-wheel.svg", // or city-car
  electronics: "/images/icons/lorc/circuitry.svg", // or processor
  faith: "/images/icons/delapouite/prayer.svg", // common for faith/religion
  fighting: "/images/icons/lorc/sword-clash.svg", // or blade icons
  focus: "/images/icons/delapouite/meditation.svg", // or think / eye
  gambling: "/images/icons/lorc/dice.svg", // or cards / poker
  hacking: "/images/icons/lorc/circuitry.svg", // or keyboard / bug
  healing: "/images/icons/delapouite/healing.svg", // or health-potion
  intimidation: "/images/icons/lorc/fangs.svg", // or skull / angry
  language: "/images/icons/lorc/scroll-unfurled.svg", // or speech-bubbles
  notice: "/images/icons/lorc/magnifying-glass.svg", // or eye / binoculars
  occult: "/images/icons/lorc/crystal-ball.svg", // or spell-book / pentacle
  performance: "/images/icons/delapouite/microphone.svg", // or music-notes / theater
  persuasion: "/images/icons/delapouite/speech-bubble.svg", // or handshake
  piloting: "/images/icons/delapouite/steering-wheel.svg", // or airplane / ship-wheel
  psionics: "/images/icons/lorc/brain.svg", // or third-eye / psi
  repair: "/images/icons/lorc/gear-hammer.svg", // or claw-hammer / wrench
  research: "/images/icons/lorc/open-book.svg", // or microscope
  riding: "/images/icons/delapouite/horse-head.svg", // or saddle
  science: "/images/icons/delapouite/flask.svg", // or atom / microscope
  shooting: "/images/icons/lorc/pistol.svg", // or target / gun
  spellcasting: "/images/icons/delapouite/spell-book.svg", // or magic-wand / orb
  stealth: "/images/icons/lorc/ninja-mask.svg", // or footprint / eye-slash
  survival: "/images/icons/lorc/campfire.svg", // or tent / knife
  taunt: "/images/icons/delapouite/mouth.svg", // or angry-face / fist
  thievery: "/images/icons/lorc/lockpick.svg", // or masked-face / pouch
  "weird-science": "/images/icons/lorc/gear-hammer.svg", // or flask / tesla-coil / mad-science variants
};

// --- ROTATING SVG DICE ---
const DiceIcon = ({
  type,
  isSelected,
}: {
  type: string;
  isSelected: boolean;
}) => {
  const commonProps = {
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "4",
    strokeLinejoin: "round" as const,
    className: "w-[110%] h-[110%] absolute inset-[-5%]",
  };

  return (
    <motion.div
      className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
        isSelected ? "opacity-100" : "opacity-20 group-hover:opacity-60"
      }`}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {type === "D4" && (
        <svg {...commonProps}>
          <polygon points="74,2 84,88 4,52" />
        </svg>
      )}
      {type === "D6" && (
        <svg {...commonProps}>
          <rect x="20" y="20" width="60" height="60" rx="8" />
        </svg>
      )}
      {type === "D8" && (
        <svg {...commonProps}>
          <polygon points="50,10 90,50 50,90 10,50" />
        </svg>
      )}
      {type === "D10" && (
        <svg {...commonProps}>
          <polygon points="50,5 90,40 50,97 10,40" />
        </svg>
      )}
      {type === "D12" && (
        <svg {...commonProps}>
          <polygon points="50,10 88,38 73,85 27,85 12,38" />
        </svg>
      )}
    </motion.div>
  );
};

export default function TraitsTabClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const {
    attributes,
    skills,
    availableSkills,
    setAvailableSkills,
    availableAttributePoints,
    attributePointsUsed,
    availableSkillPoints,
    skillPointsUsed,
    activeModifiers,
    setDraft,
    addSkill,
    removeSkill,
    builderState,
    advancementsEnabled,
    advancementLog,
  } = useCharacterBuilder();

  // Load skills on mount if not already populated
  useEffect(() => {
    async function loadSkills() {
      if (availableSkills.length > 0) {
        setIsLoading(false);
        return;
      }
      try {
        const fetched = await getAvailableSkills(id as string);
        setAvailableSkills(fetched);
      } catch (error) {
        console.error("Failed to load skills:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadSkills();
  }, [id, availableSkills.length, setAvailableSkills]);

  // Unified Sync
  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const updateAttribute = (attr: string, newDie: string) => {
    setDraft((draft) => {
      draft.attributes[attr as keyof typeof draft.attributes] = newDie as any;
      return draft;
    });
    syncToServer({ [attr.toLowerCase()]: newDie });
  };

  const handleAddSkill = (skillSlug: string) => {
    addSkill(skillSlug);
    syncToServer({ skills: { ...skills, [skillSlug]: "D4" as DieType } });
  };

  const handleRemoveSkill = (skillSlug: string) => {
    removeSkill(skillSlug);
    const updatedSkills = { ...skills };
    delete updatedSkills[skillSlug];
    syncToServer({ skills: updatedSkills });
  };

  const handleUpdateSkillDie = (skillSlug: string, newDie: string) => {
    setDraft((draft) => {
      draft.skills[skillSlug] = newDie as any;
      return draft;
    });
    syncToServer({ skills: { ...skills, [skillSlug]: newDie as DieType } });
  };

  // --- CALCULATIONS ---
  // Safely extract allocations (defaulting to 0 if none exist)
  const allocations = builderState?.hindranceAllocations || {
    attribute: 0,
    skill: 0,
    edge: 0,
    wealth: 0,
  };

  // Calculate Trait Totals

  // Extract attribute mutators from active modifiers
  const freeAttributeChoices =
    activeModifiers?.attributeDieSteps?.["choice:attribute"] || 0;

  // Extract trait total mutators from advancements
  const advAlloc = { attribute: 0, skill: 0 };

  if (advancementsEnabled && advancementLog) {
    advancementLog.forEach((adv: Advance) => {
      if (adv.type === "SKILL") advAlloc.skill += 2;
      if (adv.type === "ATTRIBUTE") advAlloc.attribute += 1;
    });
  }

  // Tally effective attribute points max
  const totalAttrPts =
    availableAttributePoints +
    freeAttributeChoices +
    allocations.attribute +
    advAlloc.attribute;
  const remAttr = totalAttrPts - attributePointsUsed;

  // Tally effective skill points max
  const totalSkillPts =
    availableSkillPoints + allocations.skill + advAlloc.skill;
  const remSkills = totalSkillPts - skillPointsUsed;

  const activeSkills = availableSkills.filter(
    (s) => skills[s.slug] !== undefined,
  );
  const inactiveSkills = availableSkills.filter(
    (s) => skills[s.slug] === undefined,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-end pb-4 relative border-b border-primary/30 mb-10">
        <div className="absolute -bottom-px left-0 w-full h-px bg-linear-to-r from-primary via-primary/50 to-transparent" />

        <div className="relative">
          <h1 className="font-builder-header text-6xl md:text-8xl text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.4)] tracking-wide flex items-center gap-4">
            Traits
          </h1>

          <p className="text-primary/70 tracking-[0.4em] uppercase text-sm md:text-base font-bold font-serif mt-1">
            Core Pillars of Your Legend
          </p>
        </div>

        <Dices className="w-14 h-14 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      {/* =======================
          ATTRIBUTES SECTION
      ======================== */}
      {/* Tracker */}
      <div
        className={`flex flex-col float-end p-2.5 md:p-4 rounded-2xl -mt-6 md:mt-0 border-2 shadow-lg bg-base-200/50 ${remAttr < 0 ? "border-error shadow-error/20" : "border-base-300"}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-base-content/60 mb-1">
          Attr Steps
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-2xl md:text-4xl font-header font-black ${remAttr < 0 ? "text-error" : "text-success"}`}
          >
            {remAttr}
          </span>
          <span className="text-xs md:text-sm opacity-50 font-bold">
            / {totalAttrPts}
          </span>
        </div>
      </div>
      <h2 className="font-builder-header text-4xl lg:text-5xl text-base-content mb-6 mt-14 md:mt-18">
        Attributes
      </h2>

      <div className="flex flex-col gap-6 mb-8">
        {ATTRIBUTES.map((attr) => {
          const data = ATTRIBUTE_DATA[attr];
          const AttrIcon = data.icon;
          const raceMod =
            activeModifiers?.attributeDieSteps?.[attr.toLowerCase()];

          return (
            <motion.div
              key={attr}
              className="card bg-base-200/30 border-2 border-base-200/20 p-2.5 md:p-5 shadow-md relative overflow-hidden group transition-all duration-300 rounded-4xl"
            >
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-6 lg:gap-8">
                {/* Left Side */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`ml-4 p-2 rounded-lg bg-base-200 shadow-inner group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all shrink-0 ${data.color}`}
                    >
                      <AttrIcon className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md" />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="font-header text-2xl md:text-3xl tracking-tighter text-base-content uppercase truncate">
                        {attr}
                      </h3>
                      <h4 className="font-body text-sm italic tracking-tight text-base-content/85 truncate">
                        {data.description}
                      </h4>
                    </div>
                    {raceMod && (
                      <span
                        className={`text-[10px] px-3 py-1 rounded-md font-black tracking-tighter uppercase shadow-sm shrink-0 ${raceMod > 0 ? "bg-success/20 text-success border border-success/30" : "bg-error/20 text-error border border-error/30"}`}
                      >
                        Race {raceMod > 0 ? `+${raceMod}` : raceMod} Step
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side Dice */}
                <div className="flex justify-between items-center border-2 border-base-200/20 bg-linear-to-br from-base-500/20 to-base-200/60 py-4 px-4 md:px-6 rounded-2xl shrink-0 gap-2 md:gap-5">
                  {DIE_STEPS.map((die) => {
                    const isSelected = attributes[attr] === die;
                    return (
                      <motion.button
                        key={die}
                        onClick={() => updateAttribute(attr, die)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group ${isSelected ? "text-primary" : "text-base-content/50"}`}
                      >
                        <DiceIcon type={die} isSelected={isSelected} />
                        <span
                          className={`relative z-10 font-header text-xs sm:text-sm font-semibold transition-all duration-300 ${isSelected ? "drop-shadow-[0_0_8px_rgba(var(--p),0.8)] scale-110" : "group-hover:text-base-content/60"}`}
                        >
                          {die}
                        </span>
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse -z-10" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =======================
          SKILLS SECTION
      ======================== */}

      {/*  Trackers */}
      <div
        className={`flex flex-col float-end p-2.5 md:p-4 rounded-2xl border-2 shadow-lg bg-base-200/50 ${remSkills < 0 ? "border-error shadow-error/20" : "border-base-300"}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-base-content/60 mb-1">
          Skill Pts
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-2xl md:text-4xl font-header font-black ${remSkills < 0 ? "text-error" : "text-success"}`}
          >
            {remSkills}
          </span>
          <span className="text-xs md:text-sm opacity-50 font-bold">
            / {totalSkillPts}
          </span>
        </div>
      </div>
      <h2 className="font-builder-header text-4xl lg:text-5xl text-base-content mb-6 mt-18">
        Skills
      </h2>

      {/* Added Skills (Active) */}
      <div className="flex flex-col gap-4 mb-20">
        <AnimatePresence>
          {activeSkills.map((skill) => {
            const linkedAttr =
              skill.linkedAttribute.toUpperCase() as keyof typeof ATTRIBUTE_DATA;
            const data = ATTRIBUTE_DATA[linkedAttr] || ATTRIBUTE_DATA.SMARTS;
            const SkillIcon = data.icon;
            const isCoreSkill = [
              "athletics",
              "common-knowledge",
              "notice",
              "persuasion",
              "stealth",
            ].includes(skill.slug);

            return (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="card bg-base-200/30 border border-base-200/50 p-3 lg:p-4 shadow-sm hover:shadow-md transition-all rounded-3xl"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
                  {/* Skill Label + Remove Button */}
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button
                      onClick={() =>
                        !isCoreSkill && handleRemoveSkill(skill.slug)
                      }
                      className={`p-1.5 rounded-lg border shadow-md transition-colors ${
                        isCoreSkill
                          ? "border-base-300 text-base-content/20 bg-base-200 cursor-not-allowed"
                          : "border-error/30 text-error bg-error/10 hover:bg-error hover:text-error-content"
                      }`}
                      disabled={isCoreSkill}
                      title={
                        isCoreSkill ? "Core Skill (Required)" : "Remove Skill"
                      }
                    >
                      {isCoreSkill ? (
                        <StarIcon className="w-5 h-5 text-primary/60" />
                      ) : (
                        <Minus className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <SkillIcon className={`w-4 h-4 mb-0.5 ${data.color}`} />
                        <h3 className="font-header text-xl capitalize text-base-content">
                          {skill.name}
                        </h3>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-base-content/40 font-semibold">
                        Linked: {linkedAttr} ({attributes[linkedAttr]})
                      </span>
                    </div>
                  </div>

                  {/* Skill Dice Row */}
                  <div className="flex justify-between items-center bg-base-200/50 py-2 px-4 rounded-xl shrink-0 gap-2 md:gap-4 shadow-inner">
                    {DIE_STEPS.map((die) => {
                      const isSelected = skills[skill.slug] === die;
                      return (
                        <motion.button
                          key={die}
                          onClick={() => handleUpdateSkillDie(skill.slug, die)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group ${isSelected ? "text-primary" : "text-base-content/40"}`}
                        >
                          <DiceIcon type={die} isSelected={isSelected} />
                          <span
                            className={`relative z-10 font-header text-[10px] sm:text-xs font-semibold ${isSelected ? "drop-shadow-[0_0_8px_rgba(var(--p),0.8)] scale-110" : ""}`}
                          >
                            {die}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {activeSkills.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed border-base-300 rounded-3xl text-base-content/40 italic">
            No skills added yet. Select from the available skills below.
          </div>
        )}
      </div>

      {/* --- AVAILABLE SKILLS --- */}
      <div className="divider divider-vertical">
        <h3 className="font-header uppercase text-2xl font-extrabold text-base-content/70 mb-6">
          Available Skills
          {isLoading && (
            <span className="loading loading-spinner loading-sm opacity-50" />
          )}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {inactiveSkills.map((skill) => (
          <button
            key={skill.slug}
            onClick={() => handleAddSkill(skill.slug)}
            className="flex items-center justify-between p-3 rounded-2xl bg-base-200/20 border border-base-300 hover:border-success/50 hover:bg-success/5 transition-all text-left group"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-sm capitalize text-base-content/80 group-hover:text-base-content">
                {skill.name}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-base-content/40">
                {skill.linkedAttribute}
              </span>
            </div>
            <div className="p-1 rounded-md border border-success/30 text-success bg-success/10 shadow-sm group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
