"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAvailableHindrances } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import {
  AlertCircle,
  Plus,
  Minus,
  Info,
  Skull,
  Sparkles,
  BookOpen,
  Coins,
  ShieldAlert,
  BadgeAlert,
  Dices,
  ShieldPlus,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GenericTrait,
  HindranceAllocations,
} from "@/lib/types/CharacterBuilder";

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

// --- SUB-COMPONENTS ---

const HindranceMedallion = ({
  hindrance,
  isMajor,
  className,
}: {
  hindrance: GenericTrait;
  isMajor: boolean;
  className?: string;
}) => {
  // Support future dynamic iconUrl from schema, fallback to local map
  const iconPath =
    hindrance.iconUrl ||
    HINDRANCE_ICONS[hindrance.slug] ||
    "/images/icons/lorc/perspective-dice-six-faces-random.svg";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full shrink-0",
        "before:absolute before:inset-0 before:rounded-full before:shadow-inner before:border",
        isMajor
          ? "bg-error/10 before:border-error/30 shadow-[0_0_15px_rgba(var(--color-error),0.2)]"
          : "bg-warning/10 before:border-warning/30 shadow-[0_0_15px_rgba(var(--color-warning),0.2)]",
        className,
      )}
    >
      <img
        src={iconPath}
        alt={`${hindrance.name} icon`}
        className={cn(
          "w-3/5 h-3/5 drop-shadow-md",
          isMajor ? "filter-error" : "filter-warning",
        )}
        style={{
          filter: "invert(0.5) sepia(0.4) saturate(15) hue-rotate(138deg)",
        }}
      />
    </div>
  );
};

const RewardTile = ({
  title,
  type,
  cost,
  count,
  remaining,
  onAllocate,
  icon: Icon,
}: any) => {
  const canAdd = remaining >= cost;
  return (
    <div className="relative group flex flex-col items-center justify-between bg-base-100/50 backdrop-blur-sm border border-base-content/10 p-4 rounded-2xl shadow-lg transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--color-primary),0.15)] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col items-center text-center mb-4">
        <div className="p-3 bg-base-200/80 rounded-full border border-base-content/5 mb-3 shadow-inner">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="font-header font-bold text-base-content text-lg leading-tight">
          {title}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mt-1">
          Cost: {cost} Pts
        </span>
      </div>

      <div className="relative flex items-center gap-4 bg-base-300/40 p-2 rounded-xl border border-base-content/5">
        <button
          onClick={() => onAllocate(type, count - 1)}
          disabled={count === 0}
          className="p-2 rounded-lg bg-base-100 text-base-content/70 hover:bg-error hover:text-error-content hover:shadow-[0_0_10px_rgba(var(--color-error),0.4)] disabled:opacity-30 disabled:hover:bg-base-100 disabled:hover:text-base-content/70 disabled:hover:shadow-none transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="font-header text-3xl font-black w-6 text-center text-primary drop-shadow-sm"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        <button
          onClick={() => onAllocate(type, count + 1)}
          disabled={!canAdd}
          className="p-2 rounded-lg bg-base-100 text-base-content/70 hover:bg-success hover:text-success-content hover:shadow-[0_0_10px_rgba(var(--color-success),0.4)] disabled:opacity-30 disabled:hover:bg-base-100 disabled:hover:text-base-content/70 disabled:hover:shadow-none transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- MAIN EXPORT ---

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

  // Render variables
  const alloc = builderState?.hindranceAllocations || {
    attribute: 0,
    skill: 0,
    edge: 0,
    wealth: 0,
  };
  const allocAttr = alloc.attribute || 0;
  const allocEdge = alloc.edge || 0;
  const allocSkill = alloc.skill || 0;
  const allocWealth = alloc.wealth || 0;
  const spent = allocAttr * 2 + allocEdge * 2 + allocSkill + allocWealth;
  const remaining = hindrancePointsUsed - spent;

  const handleAllocate = (type: keyof HindranceAllocations, amount: number) => {
    setHindranceAllocation(type, amount);
    syncToServer({
      builderState: {
        ...builderState,
        hindranceAllocations: { ...alloc, [type]: amount },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-16"
    >
      {/* HEADER */}
      <div className="flex justify-between items-end pb-4 relative border-b border-primary/30 mb-10">
        <div className="absolute -bottom-px left-0 w-full h-px bg-linear-to-r from-primary via-primary/50 to-transparent" />

        <div className="relative">
          <h1 className="font-builder-header text-6xl md:text-8xl text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.4)] tracking-wide flex items-center gap-4">
            Hindrances
          </h1>

          <p className="text-primary/70 tracking-[0.4em] uppercase text-sm md:text-base font-bold font-serif mt-1">
            Flaws Add Flavor
          </p>
        </div>

        <Skull className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      {/* REWARD VAULT (Allocation Panel) */}
      <section className="relative w-full rounded-3xl border border-primary/20 bg-base-200/40 backdrop-blur-md shadow-2xl overflow-hidden p-1">
        <div className="absolute inset-0 bg-[url('/images/textures/paper_361.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="bg-base-100/60 rounded-[22px] p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div>
              <h3 className="font-builder-header text-4xl text-primary drop-shadow-sm flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-secondary" />
                Reward Vault
              </h3>
              <p className="text-base-content/60 font-body text-sm mt-1 max-w-md">
                Allocate the reward points earned by claiming flaws.
              </p>
            </div>

            {/* Status Indicator */}
            <div
              className={cn(
                "flex flex-col items-center px-6 py-3 rounded-2xl border-2 shadow-xl backdrop-blur-md transition-colors",
                remaining < 0
                  ? "border-error/50 bg-error/10 text-error"
                  : remaining > 0
                    ? "border-success/50 bg-success/10 text-success shadow-[0_0_20px_rgba(var(--color-success),0.2)]"
                    : "border-base-content/10 bg-base-200 text-base-content/70",
              )}
            >
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-80 mb-1 flex items-center gap-2">
                Unspent Rewards
                {remaining < 0 && (
                  <AlertCircle className="w-4 h-4 animate-bounce" />
                )}
              </div>
              <div className="font-header text-5xl font-black leading-none drop-shadow-md">
                {remaining}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
            <RewardTile
              title="Attribute Step"
              type="attribute"
              cost={2}
              count={allocAttr}
              remaining={remaining}
              onAllocate={handleAllocate}
              icon={Dices}
            />
            <RewardTile
              title="Add Edge"
              type="edge"
              cost={2}
              count={allocEdge}
              remaining={remaining}
              onAllocate={handleAllocate}
              icon={ShieldPlus}
            />
            <RewardTile
              title="Skill Point"
              type="skill"
              cost={1}
              count={allocSkill}
              remaining={remaining}
              onAllocate={handleAllocate}
              icon={BookOpen}
            />
            <RewardTile
              title="Add Wealth"
              type="wealth"
              cost={1}
              count={allocWealth}
              remaining={remaining}
              onAllocate={handleAllocate}
              icon={Coins}
            />
          </div>
        </div>
      </section>

      {/* ACTIVE HINDRANCES (Contracts) */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-builder-header text-4xl md:text-5xl text-base-content flex items-center gap-3">
            <BadgeAlert className="w-8 h-8 text-error/80" />
            Active Hindrances
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {active.map((hindrance) => {
              const isMajor = hindrance.severity === "MAJOR";
              const cleanName = hindrance.name.replace(
                /\s*\((Minor|Major)\)/gi,
                "",
              );

              return (
                <motion.div
                  layout
                  key={hindrance.slug}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className={cn(
                    "relative overflow-hidden border p-5 md:p-6 shadow-lg rounded-2xl group transition-all",
                    "before:absolute before:inset-0 before:opacity-10 before:pointer-events-none",
                    isMajor
                      ? "bg-base-100 border-error/50 shadow-[0_4px_30px_rgba(var(--color-error),0.15)]"
                      : "bg-base-100 border-warning/50 shadow-[0_4px_30px_rgba(var(--color-warning),0.1)]",
                  )}
                >
                  {/* Glowing Edge Indicator */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1.5 shadow-[0_0_10px_currentColor]",
                      isMajor
                        ? "bg-error text-error"
                        : "bg-warning text-warning",
                    )}
                  />

                  <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                    <HindranceMedallion
                      hindrance={hindrance}
                      isMajor={isMajor}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />

                    <div className="flex flex-col grow">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <h3 className="font-header text-3xl font-bold text-base-content tracking-tight">
                          {cleanName}
                        </h3>
                        {/* Wax Seal Badge equivalent */}
                        <div
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded-sm uppercase font-bold tracking-[0.2em] text-[11px] shadow-sm",
                            isMajor
                              ? "bg-error/10 border border-error/30 text-error"
                              : "bg-warning/10 border border-warning/30 text-warning",
                          )}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          {isMajor ? "Major (+2)" : "Minor (+1)"}
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-base-content/80 leading-relaxed font-body">
                        {hindrance.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(hindrance.slug)}
                      className="absolute sm:relative top-2 right-2 sm:top-0 sm:right-0 p-2.5 rounded-xl border border-base-content/10 bg-base-200 text-base-content/50 hover:bg-error hover:text-error-content hover:border-error transition-all shadow-sm"
                      title="Break Contract"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {active.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-12 border-2 border-dashed border-base-300 rounded-3xl bg-base-200/20"
            >
              <Skull className="w-12 h-12 text-base-content/20 mx-auto mb-4" />
              <p className="font-header tracking-wider text-xl text-base-content/40 italic">
                Your soul remains unburdened... for now.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section>
        {/* --- AVAILABLE HINDRANCES --- */}
        <div className="divider divider-vertical">
          <h3 className="font-header uppercase text-2xl font-extrabold text-base-content/70 mb-6">
            Available Hindrances
            {isLoading && (
              <span className="loading loading-spinner loading-sm opacity-50" />
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          <AnimatePresence>
            {inactive.map((hindrance) => {
              const isMajor = hindrance.severity === "MAJOR";
              const isExpanded = expandedDesc === hindrance.slug;
              const cleanName = hindrance.name.replace(
                /\s*\((Minor|Major)\)/gi,
                "",
              );

              return (
                <Tilt
                  key={hindrance.slug}
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  glareEnable={true}
                  glareMaxOpacity={0.05}
                  scale={1.02}
                  transitionSpeed={250}
                  className="h-full"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={cn(
                      "flex flex-col h-full p-1 rounded-2xl shadow-md transition-all",
                      "bg-linear-to-br border",
                      isMajor
                        ? "from-error/5 to-base-100 border-error/20 hover:border-error/50 hover:shadow-[0_0_20px_rgba(var(--color-error),0.15)]"
                        : "from-warning/5 to-base-100 border-warning/20 hover:border-warning/50 hover:shadow-[0_0_20px_rgba(var(--color-warning),0.1)]",
                    )}
                  >
                    <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-4 h-full flex flex-col">
                      <div className="flex items-start justify-between w-full gap-3">
                        <HindranceMedallion
                          hindrance={hindrance}
                          isMajor={isMajor}
                          className="w-12 h-12"
                        />

                        <div className="flex flex-col flex-1 mt-1">
                          <span className="font-header font-bold text-xl leading-tight text-base-content line-clamp-2">
                            {cleanName}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] uppercase font-bold tracking-[0.2em] mt-1",
                              isMajor ? "text-error" : "text-warning",
                            )}
                          >
                            {isMajor ? "Major (+2 Pts)" : "Minor (+1 Pt)"}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                          <button
                            onClick={() =>
                              setExpandedDesc(
                                isExpanded ? null : hindrance.slug,
                              )
                            }
                            className="p-2 rounded-lg bg-base-200 text-base-content/50 hover:text-base-content hover:bg-base-300 transition-colors border border-base-content/5"
                            title="Read Curse"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAdd(hindrance)}
                            disabled={hindrancesMaxed}
                            className={cn(
                              "p-2 rounded-lg text-white shadow-sm transition-all relative overflow-hidden group",
                              isMajor
                                ? "bg-error hover:bg-error/90"
                                : "bg-warning text-warning-content hover:bg-warning/90",
                              hindrancesMaxed
                                ? "opacity-30 grayscale cursor-not-allowed"
                                : "hover:scale-105 hover:shadow-[0_0_15px_currentColor]",
                            )}
                            title="Accept Flaw"
                          >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
                            <Plus className="w-4 h-4 relative z-10" />
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-base-content/10 overflow-hidden"
                          >
                            <p className="text-sm font-body text-base-content/70 leading-relaxed">
                              {hindrance.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </Tilt>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
