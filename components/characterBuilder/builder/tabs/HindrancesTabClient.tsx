"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAvailableHindrances } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { AlertCircle, Plus, Minus, Info, Skull } from "lucide-react";
import {
  GenericTrait,
  HindranceAllocations,
} from "@/lib/types/CharacterBuilder";

// --- GAME-ICONS.NET MAPPING ---
const HINDRANCE_ICONS: Record<string, string> = {
  "all-thumbs-minor": "/images/icons/delapouite/thumb-down.svg",
  "anemic-minor": "/images/icons/lorc/heart-drop.svg",
  "arrogant-major": "/images/icons/delapouite/nose-side.svg",
  "bad-eyes-major": "/images/icons/lorc/spectacles.svg",
  "bad-eyes-minor": "/images/icons/lorc/spectacles.svg",
  "bad-luck-major": "/images/icons/delapouite/dice-twenty-faces-one.svg",
  "big-mouth-minor": "/images/icons/lorc/shouting.svg",
  "blind-major": "/images/icons/skoll/sight-disabled.svg",
  "bloodthirsty-major": "/images/icons/lorc/bloody-sword.svg",
  "cant-swim-minor": "/images/icons/lorc/drowning.svg",
  "cautious-minor": "/images/icons/lorc/hazard-sign.svg",
  "clumsy-major": "/images/icons/lorc/tripwire.svg",
  "code-of-honor-major": "/images/icons/lorc/guarded-tower.svg",
  "curious-major": "/images/icons/lorc/magnifying-glass.svg",
  "death-wish-minor": "/images/icons/lorc/tombstone.svg",
  "delusional-major": "/images/icons/lorc/crystal-eye.svg",
  "delusional-minor": "/images/icons/lorc/crystal-eye.svg",
  "doubting-thomas-minor": "/images/icons/lorc/suspicious.svg",
  "driven-major": "/images/icons/lorc/run.svg",
  "driven-minor": "/images/icons/lorc/run.svg",
  "elderly-major": "/images/icons/lorc/beard.svg",
  "hard-of-hearing-major": "/images/icons/skoll/hearing-disabled.svg",
  "hard-of-hearing-minor": "/images/icons/skoll/hearing-disabled.svg",
  "hesitant-minor": "/images/icons/skoll/halt.svg",
  "illiterate-minor": "/images/icons/lorc/book-cover.svg",
  "impulsive-major": "/images/icons/lorc/sprint.svg",
  "mild-mannered-minor": "/images/icons/lorc/prayer.svg",
  "mute-major": "/images/icons/delapouite/mute.svg",
  "obese-minor": "/images/icons/skoll/fat.svg",
  "one-arm-major": "/images/icons/skoll/amputation.svg",
  "one-eye-major": "/images/icons/lorc/one-eyed.svg",
  "outsider-major": "/images/icons/lorc/hood.svg",
  "outsider-minor": "/images/icons/lorc/hood.svg",
  "phobia-major": "/images/icons/lorc/terror.svg",
  "phobia-minor": "/images/icons/lorc/terror.svg",
  "poverty-minor": "/images/icons/delapouite/pay-money.svg",
  "slow-major": "/images/icons/lorc/snail.svg",
  "slow-minor": "/images/icons/lorc/snail.svg",
  "small-minor": "/images/icons/delapouite/body-height.svg",
  "stubborn-minor": "/images/icons/skoll/donkey.svg",
  "suspicious-major": "/images/icons/lorc/paranoia.svg",
  "suspicious-minor": "/images/icons/lorc/paranoia.svg",
  "thin-skinned-major": "/images/icons/lorc/glass-heart.svg",
  "thin-skinned-minor": "/images/icons/lorc/glass-heart.svg",
  "tongue-tied-major": "/images/icons/delapouite/silenced.svg",
  "ugly-major": "/images/icons/lorc/pig-face.svg",
  "ugly-minor": "/images/icons/lorc/pig-face.svg",
  "yellow-major": "/images/icons/delapouite/chicken.svg",
  "young-major": "/images/icons/delapouite/baby-face.svg",
  "young-minor": "/images/icons/delapouite/baby-face.svg",
};

export default function HindrancesTabClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);

  const {
    hindrances,
    availableHindrances,
    setAvailableHindrances,
    setHindranceAllocation,
    builderState,
    addHindrance,
    removeHindrance,
    maxHindrancePoints,
    hindrancePointsUsed,
  } = useCharacterBuilder();

  // Fetch available data on mount
  useEffect(() => {
    async function loadData() {
      if (availableHindrances?.length > 0) {
        setIsLoading(false);
        return;
      }
      try {
        const fetched = await getAvailableHindrances(id as string);
        setAvailableHindrances(fetched as any);
      } catch (error) {
        console.error("Failed to load hindrances:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadData();
  }, [id, availableHindrances?.length, setAvailableHindrances]);

  // Sync to Backend
  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleAdd = (hindrance: GenericTrait) => {
    // Ensure we safely extract slugs to prevent 'undefined' sync errors
    const slugs = hindrances.map((h) => (typeof h === "string" ? h : h.slug));
    if (!slugs.includes(hindrance.slug)) {
      addHindrance(hindrance.slug);
    }
    syncToServer({ hindrances: [...slugs, hindrance.slug] });
  };

  const handleRemove = (slug: string) => {
    removeHindrance(slug);
    const updated = hindrances
      .map((h) => (typeof h === "string" ? h : h.slug))
      .filter((s) => s !== slug);
    syncToServer({ hindrances: updated });
  };

  // Filter arrays
  const activeSlugs = hindrances.map((h) =>
    typeof h === "string" ? h : h.slug,
  );
  const active =
    availableHindrances?.filter((h) => activeSlugs.includes(h.slug)) || [];
  const inactive =
    availableHindrances?.filter((h) => !activeSlugs.includes(h.slug)) || [];

  const hindrancesMaxed = maxHindrancePoints === hindrancePointsUsed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6"
    >
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-end pb-4 relative">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-primary/60 via-primary to-transparent opacity-90" />
        <div className="relative">
          <h1 className="font-builder-header text-5xl md:text-7xl text-primary drop-shadow-[0_0_20px_var(--color-primary)] tracking-wide">
            Hindrances
          </h1>
          <p className="text-base-content/60 tracking-[0.3em] uppercase text-xs font-bold font-serif mt-2">
            Flaws Add Flavor
          </p>
        </div>
        <Skull className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      {/* Tracker */}
      <div
        className={`flex flex-col float-end p-4 m-4 rounded-2xl border-2 shadow-lg bg-base-200/50 ${hindrancePointsUsed > maxHindrancePoints ? "border-error shadow-error/20" : "border-base-300"}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-base-content/60 mb-1 flex items-center gap-2">
          Reward Points
          {hindrancePointsUsed > maxHindrancePoints && (
            <AlertCircle className="w-4 h-4 text-error animate-pulse" />
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-4xl font-header font-black ${hindrancePointsUsed > maxHindrancePoints ? "text-error" : "text-secondary"}`}
          >
            {hindrancePointsUsed}
          </span>
          <span className="text-sm opacity-50 font-bold">
            / {maxHindrancePoints} Max
          </span>
        </div>
      </div>

      {/* --- REWARD POINT ALLOCATOR --- */}
      <div className="col-span-full mt-6 bg-base-200/30 border border-base-300 p-5 rounded-3xl w-full">
        {(() => {
          const alloc = builderState?.hindranceAllocations || {
            attribute: 0,
            skill: 0,
            edge: 0,
            wealth: 0,
          };

          // Safe math extraction
          const allocAttr = alloc.attribute || 0;
          const allocEdge = alloc.edge || 0;
          const allocSkill = alloc.skill || 0;
          const allocWealth = alloc.wealth || 0;

          const spent =
            allocAttr * 2 + allocEdge * 2 + allocSkill + allocWealth;
          const remaining = hindrancePointsUsed - spent;

          const handleAllocate = (
            type: keyof HindranceAllocations,
            amount: number,
          ) => {
            setHindranceAllocation(type, amount);
            syncToServer({
              builderState: {
                ...builderState,
                hindranceAllocations: { ...alloc, [type]: amount },
              },
            });
          };

          const AllocatorRow = ({
            title,
            type,
            cost,
            count,
          }: {
            title: string;
            type: keyof HindranceAllocations;
            cost: number;
            count: number;
          }) => (
            <div className="flex flex-col items-center justify-between bg-base-100 p-3 rounded-xl shadow-sm border border-base-200">
              <div className="flex flex-col text-center m-4">
                <span className="font-bold text-base-content">{title}</span>
                <span className="text-[10px] uppercase tracking-widest text-base-content/50">
                  Costs {cost} Pts
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAllocate(type, count - 1)}
                  disabled={count === 0}
                  className="p-1.5 rounded-lg bg-base-200 text-base-content/70 hover:bg-error hover:text-error-content disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-header text-2xl font-bold w-4 text-center">
                  {count}
                </span>
                <button
                  onClick={() => handleAllocate(type, count + 1)}
                  disabled={remaining < cost}
                  className="p-1.5 rounded-lg bg-base-200 text-base-content/70 hover:bg-success hover:text-success-content disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );

          return (
            <>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-header text-2xl text-base-content/80">
                  Spend Reward Points
                </h3>
                {/* Explicit Unspent Badge */}
                <div
                  className={`px-4 py-2 rounded-xl font-bold font-mono tracking-widest text-sm shadow-inner border ${
                    remaining < 0
                      ? "bg-error/10 text-error border-error/30"
                      : remaining > 0
                        ? "bg-success/10 text-success border-success/30 animate-pulse"
                        : "bg-base-200 text-base-content/50 border-base-300"
                  }`}
                >
                  {remaining < 0
                    ? `OVER-SPENT BY ${Math.abs(remaining)}`
                    : `${remaining} REMAINING`}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AllocatorRow
                  title="Attribute Step"
                  type="attribute"
                  cost={2}
                  count={allocAttr}
                />
                <AllocatorRow
                  title="Add Edge"
                  type="edge"
                  cost={2}
                  count={allocEdge}
                />
                <AllocatorRow
                  title="Skill Point"
                  type="skill"
                  cost={1}
                  count={allocSkill}
                />
                <AllocatorRow
                  title="Add Wealth"
                  type="wealth"
                  cost={1}
                  count={allocWealth}
                />
              </div>
            </>
          );
        })()}
      </div>

      {/* --- ACTIVE HINDRANCES --- */}
      <h2 className="font-builder-header text-5xl text-base-content mb-6 mt-12">
        Active Hindrances
      </h2>
      <div className="flex flex-col gap-4 mb-16">
        <AnimatePresence>
          {active.map((hindrance) => {
            const isMajor = hindrance.severity === "MAJOR";
            const iconPath =
              HINDRANCE_ICONS[hindrance.slug] ||
              "/images/icons/lorc/perspective-dice-six-faces-random.svg";

            // Clean the name of (Minor) or (Major)
            const cleanName = hindrance.name.replace(
              /\s*\((Minor|Major)\)/gi,
              "",
            );

            return (
              <motion.div
                key={hindrance.slug}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`card border p-3 lg:p-4 shadow-sm hover:shadow-md transition-all rounded-3xl ${isMajor ? "bg-error/5 border-error/30" : "bg-warning/5 border-warning/30"}`}
              >
                <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-4">
                  <div className="flex items-center gap-4 w-full">
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(hindrance.slug)}
                      className="p-2 rounded-lg border border-base-300/50 text-base-content/50 hover:bg-error hover:text-error-content transition-colors shrink-0"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    {/* Icon Avatar */}
                    <div
                      className={`p-2 rounded-xl shrink-0 ${isMajor ? "bg-error/20" : "bg-warning/20"}`}
                    >
                      <img
                        src={iconPath}
                        alt="icon"
                        className={`lg:w-20 w-10 lg:h-20 h-10 ${isMajor ? "filter-error" : "filter-warning"}`}
                        style={{
                          filter:
                            "invert(0.5) sepia(0.4) saturate(15) hue-rotate(138deg)",
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-header text-2xl text-base-content">
                          {cleanName}
                        </h3>
                        <span
                          className={`text-[12px] px-2 py-0.75 mb-1 rounded uppercase font-bold tracking-widest ${isMajor ? "bg-error text-error-content" : "bg-warning text-warning-content"}`}
                        >
                          {isMajor ? "MAJOR +2 PTS" : "MINOR +1 PT"}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/70 mt-1 leading-relaxed">
                        {hindrance.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {active.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed border-base-300 rounded-3xl text-base-content/40 italic">
            Your character is remarkably flawless... so far.
          </div>
        )}
      </div>

      {/* --- AVAILABLE HINDRANCES --- */}
      <div className="divider divider-vertical">
        <h3 className="font-header uppercase text-2xl font-extrabold text-base-content/70 mb-6">
          Available Hindrances
          {isLoading && (
            <span className="loading loading-spinner loading-sm opacity-50" />
          )}
        </h3>
      </div>

      {/* Added items-start to the grid so the cards do not stretch to match expanded items! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {inactive.map((hindrance) => {
          const isMajor = hindrance.severity === "MAJOR";
          const isExpanded = expandedDesc === hindrance.slug;
          const iconPath =
            HINDRANCE_ICONS[hindrance.slug] ||
            "/images/icons/lorc/perspective-dice-six-faces-random.svg";

          // Clean the name
          const cleanName = hindrance.name.replace(
            /\s*\((Minor|Major)\)/gi,
            "",
          );

          return (
            <div
              key={hindrance.slug}
              className={`flex flex-col p-4 rounded-3xl border transition-all 
                ${
                  isMajor
                    ? "bg-error/5 border-error/20 hover:border-error/50 hover:bg-error/10"
                    : "bg-warning/5 border-warning/20 hover:border-warning/50 hover:bg-warning/10"
                }`}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex items-start gap-3 flex-1 pr-2">
                  <img
                    src={iconPath}
                    alt="icon"
                    className={`w-10 h-10 opacity-70 mt-0.5 shrink-0 ${isMajor ? "filter-error" : "filter-warning"}`}
                    style={{
                      filter:
                        "invert(0.5) sepia(0.4) saturate(15) hue-rotate(138deg)",
                    }}
                  />
                  <div className="flex flex-col flex-1 justify-center">
                    <span className="font-header text-xl leading-tight text-base-content">
                      {cleanName}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${isMajor ? "text-error" : "text-warning"}`}
                    >
                      {isMajor ? "Major (+2)" : "Minor (+1)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0 mt-1">
                  <button
                    onClick={() =>
                      setExpandedDesc(isExpanded ? null : hindrance.slug)
                    }
                    className="p-2 rounded-lg text-base-content/50 hover:bg-base-200 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAdd(hindrance)}
                    className={`p-2 rounded-lg text-white shadow-sm transition-transform
                      ${isMajor ? "bg-error" : "bg-warning"}  ${hindrancesMaxed ? "opacity-40" : "hover:scale-105 "}
                      `}
                    disabled={hindrancesMaxed ? true : false}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-base-300/50"
                  >
                    <p className="text-xs text-base-content/70 leading-relaxed italic">
                      {hindrance.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
