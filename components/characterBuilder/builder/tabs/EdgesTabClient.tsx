"use client";

import { useEffect, useState } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAvailableEdges } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { getUnmetRequirements } from "@/lib/character/builder/rulesEngine";
import { Advance, GenericTrait } from "@/lib/types/CharacterBuilder";
import { Plus, Minus, Info, ShieldPlus } from "lucide-react";

export default function EdgesTabClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);

  // We need the whole state to check prerequisites
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

    if (slug === "arcane-background")
      syncToServer({ edges: updated, arcaneBackgroundId: null, powers: [] });
    syncToServer({ edges: updated });
  };

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
      className="max-w-5xl mx-auto p-6"
    >
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-end pb-4 relative">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-primary/60 via-primary to-transparent opacity-90" />
        <div className="relative">
          <h1 className="font-builder-header text-5xl md:text-7xl text-primary drop-shadow-[0_0_20px_var(--color-primary)] tracking-wide">
            Edges
          </h1>
          <p className="text-base-content/60 tracking-[0.3em] uppercase text-xs font-bold font-serif mt-2">
            Heroes Have Advantages
          </p>
        </div>
        <ShieldPlus className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      {/* POINTS TRACKER */}
      <div
        className={`flex flex-col float-end w-35 p-4 rounded-2xl border-2 shadow-lg bg-base-200/50 ${remaining < 0 ? "border-error" : "border-base-300"}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-base-content/60 mb-1">
          Available Edges
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-4xl font-header font-black ${remaining < 0 ? "text-error" : "text-success"}`}
          >
            {remaining}
          </span>
          <span className="text-sm opacity-50 font-bold">/ {maxEdges} Max</span>
        </div>
      </div>

      {/* ACTIVE EDGES */}
      <h2 className="font-builder-header text-6xl text-base-content mb-6 mt-24">
        Active Edges
      </h2>
      <div className="flex flex-col gap-4 mb-16">
        {active.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed border-base-300 rounded-3xl text-base-content/40 italic">
            Your character has no advantages.
          </div>
        )}
        {active.map((edge) => (
          <div
            key={edge.slug}
            className="card border p-4 shadow-sm bg-success/5 border-success/30 rounded-3xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleRemove(edge.slug)}
                className="p-2 rounded-lg border border-error/30 text-error hover:bg-error hover:text-error-content transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="p-2 bg-success/20 rounded-xl">
                <ShieldPlus className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="font-header text-2xl text-base-content">
                  {edge.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-base-200 text-base-content/70">
                  {edge.requirements ? "Has Prerequisites" : "No Prerequisites"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AVAILABLE EDGES */}
      <div className="divider divider-vertical">
        <h3 className="font-header uppercase text-2xl font-extrabold text-base-content/70 mb-6">
          Available Edges
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {inactive.map((edge) => {
          const isExpanded = expandedDesc === edge.slug;
          const unmetReqs = getUnmetRequirements(edge, characterState);
          const canAfford = remaining > 0;
          const canTake = unmetReqs.length === 0 && canAfford;

          return (
            <div
              key={edge.slug}
              className={`flex flex-col p-4 rounded-3xl border transition-all ${canTake ? "bg-base-200/20 border-base-300 hover:border-primary/50" : "bg-base-200/5 border-base-200 opacity-70"}`}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col flex-1 min-h-16 justify-center">
                  <span className="font-header text-xl leading-tight text-base-content">
                    {edge.name}
                  </span>
                  {unmetReqs.length > 0 ? (
                    <span className="text-[10px] text-error font-bold mt-1 uppercase">
                      Reqs: {unmetReqs.join(", ")}
                    </span>
                  ) : (
                    <span className="text-[10px] text-success font-bold mt-1 uppercase">
                      Requirements Met
                    </span>
                  )}
                </div>
                <div className="flex gap-2 shrink-0 mt-1">
                  <button
                    onClick={() =>
                      setExpandedDesc(isExpanded ? null : edge.slug)
                    }
                    className="p-2 rounded-lg hover:bg-base-300 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAdd(edge)}
                    disabled={!canTake}
                    className="p-2 rounded-lg text-white shadow-sm transition-transform hover:scale-105 bg-primary disabled:bg-base-300 disabled:opacity-50"
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
                      {edge.description}
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
