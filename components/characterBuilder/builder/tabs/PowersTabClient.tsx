"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  getAvailableArcaneBackgrounds,
  getAvailablePowers,
} from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { Plus, Minus, Info, Orbit, Zap, Wand2 } from "lucide-react";

export default function PowersTabClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);

  const {
    activeModifiers,
    edges,
    powers = [],
    arcaneBackgroundId,
    availablePowers,
    availableArcaneBackgrounds,
    setAvailablePowers,
    setAvailableArcaneBackgrounds,
    setArcaneBackground,
    addPower,
    removePower,
  } = useCharacterBuilder();

  // Fetch data
  useEffect(() => {
    async function loadData() {
      try {
        // Check if we have NO backgrounds, or JUST the one character-specific seed
        const needsABs = availableArcaneBackgrounds.length <= 1;
        const needsPowers = availablePowers.length === 0;

        if (needsABs) {
          const fetchedABs = await getAvailableArcaneBackgrounds(id as string);
          setAvailableArcaneBackgrounds(fetchedABs);
        }

        if (needsPowers) {
          const fetchedPowers = await getAvailablePowers(id as string);
          setAvailablePowers(fetchedPowers);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadData();
  }, [id, availableArcaneBackgrounds.length, availablePowers.length]);

  const isPowersEnabled = edges.some((e) =>
    e.slug.includes("arcane-background"),
  );

  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleSetAB = (abId: string) => {
    const finalId = abId === "NONE" ? null : abId;
    setArcaneBackground(finalId);

    // If switching ABs, wipe powers to prevent illegal holdovers
    if (powers.length > 0) {
      powers.forEach((p) => removePower(p.slug));
      syncToServer({ arcaneBackgroundId: finalId, powers: [] });
    } else {
      syncToServer({ arcaneBackgroundId: finalId });
    }
  };

  const handleAddPower = (slug: string) => {
    const powerToAdd = availablePowers?.find((p) => p.slug === slug);
    if (!powerToAdd || powers.some((p) => p.slug === slug)) return;

    addPower(powerToAdd);
    syncToServer({ powers: [...powers, powerToAdd] });
  };

  const handleRemovePower = (slug: string) => {
    removePower(slug);
    syncToServer({ powers: powers.filter((p) => p.slug !== slug) });
  };

  // Math Setup
  const selectedAB = availableArcaneBackgrounds.find(
    (ab) => ab.id === arcaneBackgroundId,
  );
  const basePowers = selectedAB ? selectedAB.startingPowers : 0;
  const maxPowers = activeModifiers.grantedPowers
    ? basePowers + activeModifiers.grantedPowers
    : basePowers;

  const remaining = maxPowers - powers.length;

  // Inactive filters out anything that matches a slug in the draft
  const inactive =
    availablePowers?.filter((ap) => !powers.some((p) => p.slug === ap.slug)) ||
    [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6"
    >
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-end pb-4 relative">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-primary/60 via-primary to-transparent opacity-90" />
        <div className="relative z-10">
          <h1 className="font-builder-header text-5xl md:text-7xl text-primary drop-shadow-[0_0_20px_var(--color-primary)] tracking-wide">
            Powers
          </h1>
          <p className="text-base-content/60 tracking-[0.3em] uppercase text-xs font-bold font-serif mt-2">
            Wield the Arcane
          </p>
        </div>
        <Wand2 className="w-20 h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4 z-10" />
      </div>

      {/* ARCANE BACKGROUND SELECTOR */}
      <div
        className="bg-info/10 border border-info/30 p-6 rounded-3xl mb-12 
      flex flex-col md:flex-row items-center text-center md:text-left gap-6"
      >
        <div className="p-4 bg-info/20 rounded-full shrink-0">
          {isPowersEnabled ? (
            <Orbit className="w-12 h-12 text-info animate-spin" />
          ) : (
            <Orbit className="w-12 h-12 text-info/70" />
          )}
        </div>
        <div className="flex-1 w-full">
          <h3 className="font-builder-header text-4xl text-base-content mb-2">
            Arcane Background
          </h3>
          {isPowersEnabled ? (
            <select
              className="select select-bordered select-lg w-full bg-base-100 font-bold text-xl"
              value={arcaneBackgroundId || "NONE"}
              onChange={(e) => handleSetAB(e.target.value)}
            >
              <option value="NONE" className="opacity-75">
                Select an Origin...
              </option>
              {availableArcaneBackgrounds.map((ab) => (
                <option key={ab.id} value={ab.id}>
                  {ab.name} ({ab.startingPowers} Powers)
                </option>
              ))}
            </select>
          ) : (
            <p className="font-body italic opacity-90 text-center w-full my-5">
              Select the Arcane Background edge to view available backgrounds.
            </p>
          )}
        </div>
        {selectedAB && (
          <div className="hidden flex-col text-right md:flex shrink-0">
            <span className="text-xs uppercase tracking-widest font-bold text-base-content/50">
              Arcane Skill
            </span>
            <span className="font-header text-2xl text-info capitalize">
              {selectedAB.arcaneSkillSlug}
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-base-content/50 mt-2">
              Power Points
            </span>
            <span className="font-header text-2xl text-info">
              {selectedAB.powerPoints + activeModifiers.bonusPowerPoints}
            </span>
          </div>
        )}
      </div>

      {/* If no AB is selected, lock the rest of the UI */}
      {!selectedAB ? (
        <div className="text-center p-12 border-2 border-dashed border-base-300 rounded-3xl text-base-content/40 italic">
          Select an Arcane Background above to unlock powers.
        </div>
      ) : (
        <>
          {/* POINTS TRACKER */}
          <div
            className={`flex flex-col float-end p-4 rounded-2xl border-2 shadow-lg bg-base-200/50 ${remaining < 0 ? "border-error" : "border-base-300"}`}
          >
            <div className="text-[10px] uppercase tracking-widest text-base-content/60 mb-1">
              Power Slots
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl font-header font-black ${remaining < 0 ? "text-error" : "text-info"}`}
              >
                {remaining}
              </span>
              <span className="text-sm opacity-50 font-bold">
                / {maxPowers} Max
              </span>
            </div>
          </div>

          {/* ACTIVE POWERS */}
          <h2 className="font-builder-header text-5xl text-base-content mt-24 mb-6">
            Active Powers
          </h2>
          <div className="flex flex-col gap-4 mb-16">
            {powers.map((power) => (
              <div
                key={power.slug}
                className="card border p-4 shadow-sm bg-success/5 border-success/30 rounded-3xl flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleRemovePower(power.slug)}
                    className="p-2 rounded-lg border border-error/30 text-error hover:bg-error hover:text-error-content transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="p-2 bg-success/20 rounded-xl">
                    <Zap className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <h3 className="font-header text-2xl text-base-content">
                      {power.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-base-200 text-base-content/70">
                      Rank: {power.rank}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* --- AVAILABLE POWERS --- */}
          <div className="divider divider-vertical">
            <h3 className="font-header uppercase text-2xl font-extrabold text-base-content/70 mb-6">
              Available Powers
              {isLoading && (
                <span className="loading loading-spinner loading-sm opacity-50" />
              )}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {inactive.map((power) => {
              const isExpanded = expandedDesc === power.slug;
              const canAfford = remaining > 0;
              // Add Rank checking here if you want to lock out higher rank powers!

              return (
                <div
                  key={power.slug}
                  className={`flex flex-col p-4 rounded-3xl border transition-all ${canAfford ? "bg-accent/10 border-accent/20 hover:bg-accent/30 hover:border-info/50" : "bg-base-200/5 border-base-200 opacity-70"}`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col flex-1 min-h-14 justify-center">
                      <span className="font-header text-xl leading-tight text-base-content">
                        {power.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-info mt-1 tracking-widest">
                        {power.rank}
                      </span>
                    </div>
                    <div className="flex gap-2 shrink-0 mt-1">
                      <button
                        onClick={() =>
                          setExpandedDesc(isExpanded ? null : power.slug)
                        }
                        className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddPower(power.slug)}
                        disabled={!canAfford}
                        className="p-2 rounded-lg text-white shadow-sm transition-transform hover:scale-105 bg-info disabled:bg-base-300 disabled:opacity-50"
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
                          {power.summary}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}
