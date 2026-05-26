"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAvailableEdges } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { getUnmetRequirements } from "@/lib/character/builder/rulesEngine";
import { Advance, GenericTrait } from "@/lib/types/CharacterBuilder";
import {
  Plus,
  Minus,
  Info,
  ShieldPlus,
  Lock,
  Unlock,
  Star,
  Swords,
  Crown,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- GAME-ICONS.NET MAPPING ---
const EDGES_ICONS: Record<string, string> = {
  ace: "/images/icons/delapouite/steering-wheel.svg",
  acrobat: "/images/icons/delapouite/jump-across.svg",
  alertness: "/images/icons/lorc/paranoia.svg",
  ambidextrous: "/images/icons/delapouite/sword-brandish.svg",
  "arcane-background": "/images/icons/lorc/gift-of-knowledge.svg",
  "arcane-resistance": "/images/icons/lorc/rosa-shield.svg",
  aristocrat: "/images/icons/delapouite/imperial-crown.svg",
  artificer: "/images/icons/lorc/gear-hammer.svg",
  assassin: "/images/icons/lorc/ninja-mask.svg",
  attractive: "/images/icons/lorc/smitten.svg",
  "beast-bond": "/images/icons/delapouite/sitting-dog.svg",
  "beast-master": "/images/icons/delapouite/griffin-symbol.svg",
  berserk: "/images/icons/delapouite/enrage.svg",
  block: "/images/icons/sbed/shield.svg",
  bolster: "/images/icons/lorc/high-five.svg",
  brave: "/images/icons/delapouite/shield-bash.svg",
  brawny: "/images/icons/lorc/muscle-up.svg",
  brawler: "/images/icons/skoll/fist.svg",
  bruiser: "/images/icons/lorc/fist.svg",
  brute: "/images/icons/delapouite/brute.svg",
  calculating: "/images/icons/lorc/brain.svg",
  champion: "/images/icons/delapouite/templar-shield.svg",
  channeling: "/images/icons/lorc/magic-swirl.svg",
  charismatic: "/images/icons/lorc/charm.svg",
  chi: "/images/icons/lorc/fulguro-punch.svg",
  "combat-acrobat": "/images/icons/delapouite/body-balance.svg",
  "combat-reflexes": "/images/icons/lorc/fire-dash.svg",
  command: "/images/icons/lorc/spears.svg",
  "command-presence": "/images/icons/delapouite/conqueror.svg",
  "common-bond": "/images/icons/delapouite/receive-money.svg",
  concentration: "/images/icons/lorc/meditation.svg",
  connections: "/images/icons/delapouite/mesh-network.svg",
  counterattack: "/images/icons/andymeneely/riposte.svg",
  "danger-sense": "/images/icons/lorc/rear-aura.svg",
  "dead-shot": "/images/icons/delapouite/eye-target.svg",
  dodge: "/images/icons/lorc/dodging.svg",
  "double-tap": "/images/icons/delapouite/police-target.svg",
  elan: "/images/icons/lorc/crown-coin.svg",
  expert: "/images/icons/delapouite/dice-target.svg",
  "extra-effort": "/images/icons/delapouite/mighty-force.svg",
  extraction: "/images/icons/delapouite/slalom.svg",
  fame: "/images/icons/delapouite/star-struck.svg",
  famous: "/images/icons/delapouite/star-struck.svg",
  "fast-healer": "/images/icons/delapouite/healing.svg",
  feint: "/images/icons/lorc/boxing-glove-surprise.svg",
  fervor: "/images/icons/lorc/rally-the-troops.svg",
  "filthy-rich": "/images/icons/delapouite/coins-pile.svg",
  "first-strike": "/images/icons/lorc/sword-clash.svg",
  "fleet-footed": "/images/icons/lorc/sprint.svg",
  followers: "/images/icons/delapouite/three-friends.svg",
  "free-runner": "/images/icons/darkzaitzev/running-ninja.svg",
  frenzy: "/images/icons/lorc/sabers-choc.svg",
  gadgeteer: "/images/icons/lorc/auto-repair.svg",
  "giant-killer": "/images/icons/delapouite/giant.svg",
  "great-luck": "/images/icons/lorc/clover.svg",
  "hard-to-kill": "/images/icons/lorc/pierced-body.svg",
  "harder-to-kill": "/images/icons/delapouite/half-body-crawling.svg",
  healer: "/images/icons/sbed/health-normal.svg",
  "hold-the-line": "/images/icons/delapouite/tusks-flag.svg",
  "holy-unholy-warrior": "/images/icons/delapouite/heart-wings.svg",
  humiliate: "/images/icons/lorc/morbid-humour.svg",
  "improved-arcane-resistance": "/images/icons/lorc/rosa-shield.svg",
  "improved-block": "/images/icons/sbed/shield.svg",
  "improved-counterattack": "/images/icons/andymeneely/riposte.svg",
  "improved-dodge": "/images/icons/lorc/dodging.svg",
  "improved-extraction": "/images/icons/delapouite/slalom.svg",
  "improved-first-strike": "/images/icons/lorc/sword-clash.svg",
  "improved-frenzy": "/images/icons/lorc/axe-swing.svg",
  "improved-level-headed": "/images/icons/faithtoken/card-pick.svg",
  "improved-nerves-of-steel": "/images/icons/lorc/muscle-fat.svg",
  "improved-rapid-fire": "/images/icons/lorc/striking-balls.svg",
  "improved-rapid-recharge": "/images/icons/lorc/energise.svg",
  "improved-sweep": "/images/icons/lorc/axe-swing.svg",
  "improved-trademark-weapon": "/images/icons/lorc/relic-blade.svg",
  "improvisational-fighter": "/images/icons/lorc/claw-hammer.svg",
  inspire: "/images/icons/lorc/sonic-shout.svg",
  investigator: "/images/icons/delapouite/sherlock-holmes.svg",
  "iron-jaw": "/images/icons/lorc/jawbone.svg",
  "iron-will": "/images/icons/delapouite/angry-eyes.svg",
  "jack-of-all-trades": "/images/icons/delapouite/swiss-army-knife.svg",
  "killer-instinct": "/images/icons/skoll/fangs.svg",
  "level-headed": "/images/icons/faithtoken/card-pick.svg",
  linguist: "/images/icons/lorc/lips.svg",
  "liquid-courage": "/images/icons/lorc/beer-stein.svg",
  luck: "/images/icons/delapouite/shamrock.svg",
  marksman: "/images/icons/lorc/targeting.svg",
  "martial-artist": "/images/icons/delapouite/high-kick.svg",
  "martial-warrior": "/images/icons/delapouite/van-damme-split.svg",
  master: "/images/icons/delapouite/star-formation.svg",
  "master-of-arms": "/images/icons/lorc/sword-tie.svg",
  "master-tactician": "/images/icons/quoting/card-play.svg",
  mcgyver: "/images/icons/lorc/tinker.svg",
  menacing: "/images/icons/lorc/sharp-smile.svg",
  mentalist: "/images/icons/lorc/psychic-waves.svg",
  "mighty-blow": "/images/icons/lorc/mailed-fist.svg",
  "mr-fix-it": "/images/icons/lorc/mighty-spanner.svg",
  "natural-leader": "/images/icons/lorc/crowned-heart.svg",
  "nerves-of-steel": "/images/icons/lorc/muscle-fat.svg",
  "new-powers": "/images/icons/delapouite/spell-book.svg",
  "no-mercy": "/images/icons/lorc/chopped-skull.svg",
  "power-points": "/images/icons/priorblue/battery-plus.svg",
  "power-surge": "/images/icons/lorc/crystal-shine.svg",
  professional: "/images/icons/delapouite/rule-book.svg",
  provoke: "/images/icons/lorc/imp-laugh.svg",
  quick: "/images/icons/lorc/fast-arrow.svg",
  "rabble-rouser": "/images/icons/delapouite/uprising.svg",
  "rapid-fire": "/images/icons/lorc/striking-balls.svg",
  "rapid-recharge": "/images/icons/lorc/energise.svg",
  reliable: "/images/icons/delapouite/shaking-hands.svg",
  retort: "/images/icons/lorc/ent-mouth.svg",
  rich: "/images/icons/delapouite/coins.svg",
  "rock-and-roll": "/images/icons/skoll/machine-gun.svg",
  scavenger: "/images/icons/lorc/vulture.svg",
  scholar: "/images/icons/delapouite/graduate-cap.svg",
  sidekick: "/images/icons/lorc/domino-mask.svg",
  soldier: "/images/icons/skoll/stahlhelm.svg",
  "soul-drain": "/images/icons/lorc/tentacle-heart.svg",
  "steady-hands": "/images/icons/lorc/arrow-scope.svg",
  streetwise: "/images/icons/delapouite/hoodie.svg",
  "strong-willed": "/images/icons/delapouite/confrontation.svg",
  sweep: "/images/icons/lorc/axe-swing.svg",
  tactician: "/images/icons/quoting/card-play.svg",
  thief: "/images/icons/delapouite/robber-mask.svg",
  "tough-as-nails": "/images/icons/delapouite/heart-shield.svg",
  "tougher-than-nails": "/images/icons/delapouite/heart-shield.svg",
  "trademark-weapon": "/images/icons/lorc/relic-blade.svg",
  "two-fisted": "/images/icons/lorc/rogue.svg",
  "two-gun-kid": "/images/icons/lorc/crossed-pistols.svg",
  "very-attractive": "/images/icons/lorc/smitten.svg",
  "weapon-master": "/images/icons/delapouite/black-belt.svg",
  wizard: "/images/icons/delapouite/wizard-face.svg",
  woodsman: "/images/icons/delapouite/forest.svg",
  "work-the-crowd": "/images/icons/delapouite/public-speaker.svg",
  "work-the-room": "/images/icons/delapouite/public-speaker.svg",
};

// --- SUB-COMPONENTS ---

const EdgeMedallion = ({
  edge,
  isLocked,
  isSelected,
  className,
}: {
  edge: GenericTrait;
  isLocked?: boolean;
  isSelected?: boolean;
  className?: string;
}) => {
  const iconPath =
    edge.iconUrl ||
    EDGES_ICONS[edge.slug] ||
    "/images/icons/lorc/perspective-dice-six-faces-random.svg";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full shrink-0",
        "before:absolute before:inset-0 before:rounded-full before:shadow-inner before:border transition-all duration-300",
        isSelected
          ? "bg-success/20 before:border-success/50 shadow-[0_0_25px_rgba(var(--color-success),0.4)]"
          : isLocked
            ? "bg-base-300/40 before:border-base-content/10 grayscale opacity-60"
            : "bg-primary/10 before:border-primary/30 shadow-[0_0_15px_rgba(var(--color-primary),0.15)] group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]",
        className,
      )}
    >
      <img
        src={iconPath}
        alt={`${edge.name} icon`}
        className={cn(
          "w-3/5 h-3/5 drop-shadow-md transition-all duration-300",
          isSelected
            ? "filter-success"
            : isLocked
              ? "opacity-40"
              : "filter-primary group-hover:scale-110",
        )}
        style={{
          filter: isLocked
            ? "none"
            : isSelected
              ? "invert(0.6) sepia(1) saturate(5) hue-rotate(90deg)"
              : "invert(0.5) sepia(0.4) saturate(15) hue-rotate(180deg)",
        }}
      />
    </div>
  );
};

// Helper to parse the plain string arrays into visually distinct chips
const RequirementChips = ({ reqs }: { reqs: string[] }) => {
  if (!reqs || reqs.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {reqs.map((req, i) => {
        const isRank = req.toLowerCase().includes("rank");
        const isEdge = req.toLowerCase().includes("edge:");

        return (
          <span
            key={i}
            className={cn(
              "text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm border shadow-sm flex items-center gap-1",
              isRank
                ? "bg-warning/10 text-warning border-warning/30"
                : isEdge
                  ? "bg-accent/10 text-accent border-accent/30"
                  : "bg-secondary/10 text-secondary border-secondary/30",
            )}
          >
            {isRank && <Crown className="w-3 h-3" />}
            {isEdge && <Star className="w-3 h-3" />}
            {!isRank && !isEdge && <Swords className="w-3 h-3" />}
            {req.replace("Requires", "").trim()}
          </span>
        );
      })}
    </div>
  );
};

// --- MAIN EXPORT ---

export default function EdgesTabClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);

  // Character State
  const characterState = useCharacterBuilder();
  const {
    edges,
    availableEdges,
    setAvailableEdges,
    addEdge,
    removeEdge,
    activeModifiers,
    builderState,
    advancementsEnabled,
    advancementLog,
  } = characterState;

  useEffect(() => {
    async function loadData() {
      if (availableEdges?.length > 0) return setIsLoading(false);
      try {
        const fetched = await getAvailableEdges(id as string);
        setAvailableEdges(fetched as GenericTrait[]);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadData();
  }, [id, availableEdges?.length, setAvailableEdges]);

  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleAdd = (edge: GenericTrait) => {
    const slugs = edges.map((e: any) => e.slug);
    if (!slugs.includes(edge.slug)) addEdge(edge.slug);
    syncToServer({ edges: [...slugs, edge.slug] });
  };

  const handleRemove = (slug: string) => {
    removeEdge(slug);
    const updated = edges
      .map((e: any) => e.slug)
      .filter((s: string) => s !== slug);
    if (slug === "arcane-background") {
      syncToServer({ edges: updated, arcaneBackgroundId: null, powers: [] });
    } else {
      syncToServer({ edges: updated });
    }
  };

  // Filter Arrays
  const activeSlugs = edges.map((e: any) => e.slug);
  const active =
    availableEdges?.filter((e) => activeSlugs.includes(e.slug)) || [];
  const inactive =
    availableEdges?.filter((e) => !activeSlugs.includes(e.slug)) || [];

  // Capacity Math
  const freeEdges = activeModifiers?.freeEdgeChoices?.length || 0;
  const allocEdges = builderState?.hindranceAllocations?.edge || 0;
  const advAlloc = { attribute: 0, edge: 0, skill: 0, hindrance: 0 };

  if (advancementsEnabled && advancementLog) {
    advancementLog.forEach((adv: Advance) => {
      if (adv.type === "EDGE") advAlloc.edge += 1;
    });
  }

  const maxEdges = freeEdges + allocEdges + advAlloc.edge;
  const remaining = maxEdges - active.length;

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
            Edges
          </h1>
          <p className="text-primary/70 tracking-[0.4em] uppercase text-sm md:text-base font-bold font-serif mt-1">
            Heroes Have Advantages
          </p>
        </div>
        <ShieldPlus className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      {/* POINTS VAULT */}
      <div
        className={cn(
          "flex flex-col items-center float-right w-60 px-6 py-3 rounded-2xl border-2 shadow-xl backdrop-blur-md transition-colors",
          remaining < 0
            ? "border-error/50 bg-error/10 text-error"
            : remaining > 0
              ? "border-success/50 bg-success/10 text-success shadow-[0_0_20px_rgba(var(--color-success),0.2)]"
              : "border-base-content/10 bg-base-200 text-base-content/70",
        )}
      >
        <div className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-80 mb-1">
          Available Edges
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-header text-5xl font-black leading-none drop-shadow-md">
            {remaining}
          </span>
          <span className="text-sm font-bold opacity-60">/ {maxEdges}</span>
        </div>
      </div>

      {/* THE HEROIC ARSENAL (Selected Edges) */}
      <section className="mt-38">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-builder-header text-4xl md:text-5xl text-success flex items-center gap-3 drop-shadow-[0_0_10px_rgba(var(--color-success),0.3)]">
            {/* <Star className="w-8 h-8 fill-success/20 text-success" /> */}
            Edges Taken
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {active.map((edge) => (
              <motion.div
                layout
                key={edge.slug}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className={cn(
                  "relative overflow-hidden border p-5 shadow-lg rounded-2xl group transition-all",
                  "bg-linear-to-r from-success/10 to-base-100 border-success/40 shadow-[0_4px_30px_rgba(var(--color-success),0.15)]",
                )}
              >
                {/* Glowing Trim */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-success shadow-[0_0_10px_var(--color-success)]" />

                <div className="flex items-start gap-5 relative z-10">
                  <EdgeMedallion
                    edge={edge}
                    isSelected={true}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />

                  <div className="flex flex-col grow">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-header text-3xl font-bold text-base-content tracking-tight">
                        {edge.name}
                      </h3>
                      <button
                        onClick={() => handleRemove(edge.slug)}
                        className="p-2 rounded-xl border border-error/20 bg-base-100 text-error/60 hover:bg-error hover:text-error-content hover:border-error transition-all shadow-sm"
                        title="Remove Edge"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-base-content/80 font-body leading-relaxed line-clamp-2 italic">
                      {edge.summary || "A permanent heroic talent."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {active.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center p-12 border-2 border-dashed border-base-300 rounded-3xl bg-base-200/20"
            >
              <ShieldPlus className="w-12 h-12 text-base-content/20 mx-auto mb-4" />
              <p className="font-header tracking-wider text-xl text-base-content/40 italic">
                Your legend has not yet acquired any advantages.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/*  (Available Edges) */}
      <section>
        {/* --- AVAILABLE EDGES --- */}
        <div className="divider divider-vertical">
          <h3 className="font-header uppercase text-2xl font-extrabold text-base-content/70 mb-6">
            Available Edges
            {isLoading && (
              <span className="loading loading-spinner loading-sm opacity-50" />
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
          <AnimatePresence>
            {inactive.map((edge) => {
              const isExpanded = expandedDesc === edge.slug;
              const unmetReqs = getUnmetRequirements(edge, characterState);
              const isLocked = unmetReqs.length > 0;
              const canAfford = remaining > 0;
              const canTake = !isLocked && canAfford;

              return (
                <Tilt
                  key={edge.slug}
                  tiltMaxAngleX={isLocked ? 0 : 3}
                  tiltMaxAngleY={isLocked ? 0 : 3}
                  glareEnable={!isLocked}
                  glareMaxOpacity={0.05}
                  scale={isLocked ? 1 : 1.02}
                  transitionSpeed={250}
                  className="h-full"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={cn(
                      "flex flex-col h-full p-1 rounded-2xl transition-all duration-300 group relative",
                      isLocked
                        ? "bg-base-200/50 border border-base-300 shadow-sm"
                        : "bg-linear-to-br from-primary/10 to-base-100 border border-primary/20 shadow-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--color-primary),0.15)]",
                    )}
                  >
                    <div
                      className={cn(
                        "bg-base-100/90 backdrop-blur-sm rounded-xl p-4 h-full flex flex-col relative z-10",
                        isLocked && "opacity-80 grayscale-30",
                      )}
                    >
                      {/* Padlock Watermark for Locked */}
                      {isLocked && (
                        <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-base-300/30 pointer-events-none z-0" />
                      )}

                      <div className="flex items-start justify-between w-full gap-3 relative z-10">
                        <EdgeMedallion
                          edge={edge}
                          isLocked={isLocked}
                          className="w-12 h-12"
                        />

                        <div className="flex flex-col flex-1 mt-1">
                          <span
                            className={cn(
                              "font-header font-bold text-xl leading-tight line-clamp-2",
                              isLocked
                                ? "text-base-content/60"
                                : "text-base-content",
                            )}
                          >
                            {edge.name}
                          </span>

                          {/* Requirements Breakdown */}
                          {isLocked ? (
                            <RequirementChips reqs={unmetReqs} />
                          ) : (
                            <span className="text-[10px] uppercase font-bold tracking-widest text-success mt-1.5 flex items-center gap-1">
                              <Unlock className="w-3 h-3" /> Requirements Met
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                          <button
                            onClick={() =>
                              setExpandedDesc(isExpanded ? null : edge.slug)
                            }
                            className="p-2 rounded-lg bg-base-200 text-base-content/50 hover:text-base-content hover:bg-base-300 transition-colors border border-base-content/5"
                            title="Read Lore"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAdd(edge)}
                            disabled={!canTake}
                            className={cn(
                              "p-2 rounded-lg shadow-sm transition-all relative overflow-hidden",
                              canTake
                                ? "bg-primary text-primary-content hover:scale-105 hover:shadow-[0_0_15px_currentColor]"
                                : "bg-base-300 text-base-content/30 cursor-not-allowed",
                            )}
                            title={!canTake ? "Cannot Unlock" : "Claim Edge"}
                          >
                            {canTake && (
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
                            )}
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
                            className="mt-4 pt-4 border-t border-base-content/10 overflow-hidden relative z-10"
                          >
                            <p className="text-sm font-body text-base-content/80 leading-relaxed">
                              {edge.description}
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
