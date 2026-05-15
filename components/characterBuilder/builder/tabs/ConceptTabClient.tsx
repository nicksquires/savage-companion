"use client";

import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserRegisteredSources } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { User } from "lucide-react";

export default function ConceptTabClient() {
  const { id } = useParams<{ id: string }>();
  const { setDraft, sources, name, concept, biography } = useCharacterBuilder();
  const [availableSources, setAvailableSources] = useState<string[]>([]);

  useEffect(() => {
    async function loadUserSources() {
      const userSources = await getUserRegisteredSources(id as string);
      setAvailableSources(userSources);
    }
    loadUserSources();
  }, [id]);

  const syncToServer = async (payload: {
    name?: string;
    concept?: string;
    biography?: string;
    sources?: string[];
  }) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleAddSource = async (source: string) => {
    const newSources = [...new Set([...sources, source])];
    setDraft({ sources: newSources });
    await syncToServer({ sources: newSources });
  };

  const handleRemoveSource = async (source: string) => {
    const newSources = sources.filter((s: string) => s !== source);
    setDraft({ sources: newSources });
    await syncToServer({ sources: newSources });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* HEADER */}
      <div className="flex justify-between items-end pb-4 relative border-b border-primary/30 mb-10">
        <div className="absolute -bottom-px left-0 w-full h-px bg-linear-to-r from-primary via-primary/50 to-transparent" />

        <div className="relative">
          <h1 className="font-builder-header text-6xl md:text-8xl text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.4)] tracking-wide flex items-center gap-4">
            Concept
          </h1>

          <p className="text-primary/70 tracking-[0.4em] uppercase text-sm md:text-base font-bold font-serif mt-1">
            Character Fundamentals
          </p>
        </div>

        <User className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            Character Name
          </label>
          <input
            value={name || ""}
            onChange={(e) => setDraft({ name: e.target.value })}
            onBlur={(e) => syncToServer({ name: e.target.value })}
            className="input input-bordered w-full bg-base-200"
            placeholder="Sir Reginald the Bold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Concept</label>
          <input
            value={concept || ""}
            onChange={(e) => setDraft({ concept: e.target.value })}
            onBlur={(e) => syncToServer({ concept: e.target.value })}
            className="input input-bordered w-full bg-base-200"
            placeholder="A grizzled knight seeking redemption..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Biography / Backstory
          </label>
          <textarea
            value={biography || ""}
            onChange={(e) => setDraft({ biography: e.target.value })}
            onBlur={(e) => syncToServer({ biography: e.target.value })}
            className="textarea textarea-bordered w-full h-48 bg-base-200"
            placeholder="As an orphan raised by bandits, Reginald knew combat from a young age..."
          />
        </div>
      </div>

      {/* Source Selector */}
      <div className="mt-12">
        <h2 className="font-header text-2xl text-primary mb-4">
          Content Sources
        </h2>
        <p className="text-base-content/70 mb-6">
          Choose which books and expansions this character can draw from.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Added Sources */}
          <div>
            <h3 className="font-medium mb-3 text-sm uppercase tracking-widest">
              Added to Character
            </h3>
            <div className="space-y-2">
              {sources.length === 0 && (
                <div className="px-4 py-3 rounded-xl border border-dashed border-base-300 text-center text-sm text-base-content/50">
                  No sources added yet.
                </div>
              )}
              {sources.map((source) => (
                <div
                  key={source}
                  className="flex text-sm md:text-md justify-between items-center px-4 py-3 rounded-xl bg-base-300"
                >
                  <span>{source}</span>
                  <button
                    onClick={() => handleRemoveSource(source)}
                    className="text-error hover:text-red-600 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Available Sources */}
          <div>
            <h3 className="font-medium mb-3 text-sm uppercase tracking-widest">
              Available Sources
            </h3>
            <div className="space-y-2">
              {availableSources.length === 0 && (
                <p className="text-sm text-base-content/50 italic">
                  Loading sources...
                </p>
              )}
              {availableSources.map((source) => (
                <button
                  key={source}
                  onClick={() => handleAddSource(source)}
                  disabled={sources.includes(source)}
                  className="w-full text-left text-sm md:text-md px-4 py-3 rounded-xl bg-base-200 hover:bg-base-300 disabled:opacity-40 transition"
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
