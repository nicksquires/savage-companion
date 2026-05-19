"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  Skull,
  Wand2,
  ShieldPlus,
  ChevronDown,
  ChevronUp,
  Activity,
  Brain,
  Flame,
  BicepsFlexed,
  Book,
  Star,
  Dices,
  Move,
} from "lucide-react";
import { parchmentVariants } from "../components/summary/parchmentVariants";
import { cn } from "@/lib/utils";
import { getDieValue } from "@/lib/utils/getDieValue";
import { CategoryIcon } from "../components/gear/CategoryIcon";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { getRaceNameById } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { CharacterHeader } from "../components/summary/CharacterHeader";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// Standard SWADE Core Skills
const CORE_SKILLS = [
  "athletics",
  "common-knowledge",
  "notice",
  "persuasion",
  "stealth",
];

const SKILL_ATTRIBUTE_MAP: Record<string, string> = {
  athletics: "AGILITY",
  boating: "AGILITY",
  driving: "AGILITY",
  fighting: "AGILITY",
  piloting: "AGILITY",
  riding: "AGILITY",
  shooting: "AGILITY",
  stealth: "AGILITY",
  thievery: "AGILITY",
  academics: "SMARTS",
  battle: "SMARTS",
  "common-knowledge": "SMARTS",
  gambling: "SMARTS",
  healing: "SMARTS",
  notice: "SMARTS",
  occulut: "SMARTS",
  repair: "SMARTS",
  science: "SMARTS",
  survival: "SMARTS",
  taunt: "SMARTS",
  electronics: "SMARTS",
  hacking: "SMARTS",
  intimidation: "SPIRIT",
  performance: "SPIRIT",
  persuasion: "SPIRIT",
};

const groupSkillsByAttr = (skills: Record<string, string>) => {
  const grouped: Record<string, Record<string, string>> = {
    AGILITY: {},
    SMARTS: {},
    SPIRIT: {},
    STRENGTH: {},
    VIGOR: {},
  };
  Object.entries(skills || {}).forEach(([skillName, dieType]) => {
    const slug = skillName.toLowerCase().replace(" ", "-");
    const parentAttr = SKILL_ATTRIBUTE_MAP[slug] || "SMARTS";
    if (grouped[parentAttr]) grouped[parentAttr][skillName] = dieType;
  });
  return grouped;
};

// --- SUMMARY MICRO-COMPONENTS ---

const AttrIcons: Record<string, any> = {
  agility: Move,
  smarts: Brain,
  spirit: Flame,
  strength: BicepsFlexed,
  vigor: Activity,
};

function TraitGroup({
  attribute,
  attrDie,
  skills,
}: {
  attribute: string;
  attrDie: string;
  skills: Record<string, string>;
}) {
  const Icon = AttrIcons[attribute.toLowerCase()] || Book;
  return (
    <div className="flex flex-col gap-3 relative pb-4">
      <div className="absolute left-6 top-8 bottom-0 w-px bg-primary/20" />
      <div
        className="flex justify-between items-center bg-base-300/55 p-3 rounded-lg 
      border-l-4 border-primary z-10 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-md text-primary drop-shadow-[0_0_8px_var(--color-primary)]">
            <Icon size={20} />
          </div>
          <span className="font-header text-2xl uppercase tracking-wider text-base-content">
            {attribute}
          </span>
        </div>
        <span className="font-bold font-mono text-xl text-primary">
          {attrDie}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 pl-10 z-10">
        {Object.entries(skills || {}).map(([skill, die]) => {
          const isCore = CORE_SKILLS.includes(
            skill.toLowerCase().replace(" ", "-"),
          );
          return (
            <div
              key={skill}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all",
                isCore
                  ? "bg-base-200 border-error/50 text-base-content shadow-sm"
                  : "bg-base-100 border-base-300 text-base-content/80",
              )}
            >
              {isCore && <Star size={12} className="text-error fill-error" />}
              <span className="capitalize tracking-wide text-base-content">
                {skill}
              </span>
              <span className="font-mono font-bold text-secondary">{die}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CollapsibleHindrance({ h }: { h: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        parchmentVariants({ variant: "damaged", elevation: "flat" }),
        "p-3 cursor-pointer select-none transition-all hover:bg-base-200/30",
      )}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skull className="text-error w-5 h-5" />
          <h4 className="font-bold text-error uppercase text-sm tracking-wider">
            {h.name}
          </h4>
          <Badge
            variant="outline"
            className="border-error/50 text-error text-[10px]"
          >
            {h._type || h.severity || "MINOR"}
          </Badge>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-base-content/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-base-content/50" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-base-content/70 mt-3 italic border-t border-error/20 pt-2">
              {h.summary || h.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryPowerCard({
  powerSlug,
  powerDef,
}: {
  powerSlug: string;
  powerDef?: any;
}) {
  const formattedName = powerSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return (
    <div
      className={cn(
        parchmentVariants({ variant: "arcane", elevation: "raised" }),
        "p-3 flex items-center relative group",
      )}
    >
      <div className="p-2 bg-accent/20 rounded-full text-accent shadow-[0_0_10px_var(--color-accent)] mr-3 shrink-0">
        <Wand2 size={20} />
      </div>
      <div className="flex flex-col min-w-0 pr-12">
        <h4 className="font-header text-xl text-base-content drop-shadow-sm truncate">
          {powerDef?.name || formattedName}
        </h4>
        <span className="text-[10px] uppercase tracking-widest text-accent/80 font-bold">
          {powerDef?.rank || "NOVICE"}
        </span>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <span className="font-mono text-accent font-black tracking-tighter drop-shadow-md">
          {powerDef?.powerPoints || 0} PP
        </span>
      </div>
    </div>
  );
}

// --- MAIN SUMMARY TAB ---

export default function SummaryTabClient() {
  const { id } = useParams<{ id: string }>();
  const draft = useCharacterBuilder((state) => state);
  const groupedSkills = groupSkillsByAttr(draft.skills);

  const [raceName, setRaceName] = useState<string>("Unknown Race");

  // Race name hydration from UUID
  useEffect(() => {
    let isMounted = true; // Prevents state updates if component unmounts

    async function fetchRaceDetails() {
      if (!draft.raceId) {
        setRaceName("Unknown Race");
        return;
      }

      try {
        const raceData = await getRaceNameById(draft.raceId);
        if (isMounted && raceData) {
          setRaceName(raceData.name);
        }
      } catch (error) {
        if (isMounted) setRaceName("Error loading race");
      }
    }

    fetchRaceDetails();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [draft.raceId]);

  // Toughness Calculation
  const armorBonus = draft.inventory
    .filter((i) => i.isEquipped && i.item?.armor)
    .reduce((acc, curr) => acc + (curr.item.armor.armorBonus || 0), 0);

  const baseToughness = 2 + Math.floor(getDieValue(draft.attributes.VIGOR) / 2);

  const derivedStats = {
    pace: 6,
    parry: 5, // TODO: baseParry + item.weapon.parryBonus + activeModifiers.parryMod
    toughness: baseToughness + armorBonus,
    armor: armorBonus,
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-20 p-4"
    >
      {/* HEADER CARD */}
      <CharacterHeader
        draft={draft}
        raceName={raceName}
        derivedStats={derivedStats}
      />

      {/* CORE SHEET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        {/* COL 1: 
            Traits */}

        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-primary pb-2 mb-6">
            <Dices className="text-primary" />
            <h2 className="font-header text-3xl uppercase tracking-widest">
              Traits
            </h2>
          </div>
          <div className="space-y-2">
            {Object.entries(draft.attributes).map(([attr, die]) => (
              <TraitGroup
                key={attr}
                attribute={attr}
                attrDie={die}
                skills={groupedSkills[attr as keyof typeof groupedSkills]}
              />
            ))}
          </div>
        </motion.div>

        {/*       COL 2: 
            Inventory & Powers */}

        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-info pb-2 mb-6">
            <Coins className="text-info" />
            <h2 className="font-header text-3xl uppercase tracking-widest">
              Inventory
            </h2>
          </div>
          <div
            className={cn(
              parchmentVariants({ variant: "parchment", elevation: "flat" }),
              "p-4 flex flex-col gap-3",
            )}
          >
            {draft.inventory.length === 0 && (
              <span className="italic text-base-content/50 text-sm">
                Pack is empty.
              </span>
            )}
            {draft.inventory.map((invItem, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm pb-3 border-b border-base-300/30 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <CategoryIcon
                      type={invItem?.item.type || "GEAR"}
                      className="w-5 h-5 opacity-70"
                    />
                    <span className="font-bold text-base-content">
                      {invItem?.item.name || "Unknown"}
                    </span>
                  </div>
                  <span className="font-mono text-base-content/60 font-bold">
                    {invItem.quantity}x
                  </span>
                </div>
              );
            })}
          </div>

          {draft.arcaneBackgroundId && (
            <>
              <div className="flex items-center gap-2 border-b-2 border-accent pb-2 mb-6 mt-10">
                <Wand2 className="text-accent" />
                <h2 className="font-header text-3xl uppercase tracking-widest">
                  Powers
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {draft.powers?.map((p) => (
                  <SummaryPowerCard
                    key={p.slug}
                    powerSlug={p.slug}
                    powerDef={p}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/*       COL 3: 
            Hindrances & Edges */}

        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-error pb-2 mb-6">
            <Skull className="text-error" />
            <h2 className="font-header text-3xl uppercase tracking-widest">
              Hindrances
            </h2>
          </div>
          <div className="space-y-3">
            {draft.hindrances.map((h) => (
              <CollapsibleHindrance key={h.id} h={h} />
            ))}
            {draft.hindrances.length === 0 && (
              <span className="text-base-content/40 italic text-sm">
                None selected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 border-b-2 border-success pb-2 mb-6 mt-10">
            <ShieldPlus className="text-success" />
            <h2 className="font-header text-3xl uppercase tracking-widest">
              Edges
            </h2>
          </div>
          <div className="space-y-3">
            {draft.edges.map((e) => (
              <div
                key={e.id}
                className={cn(
                  parchmentVariants({ variant: "heroic", elevation: "raised" }),
                  "p-4",
                )}
              >
                <h4 className="font-bold text-success uppercase text-sm tracking-wider">
                  {e.name}
                </h4>
                <p className="text-xs text-base-content/70 mt-1">{e.summary}</p>
              </div>
            ))}
            {draft.edges.length === 0 && (
              <span className="text-base-content/40 italic text-sm">
                None selected
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
