"use client";

import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { useEffect, useState } from "react";

export default function DebugPanel() {
  const store = useCharacterBuilder();
  const [isVisible, setIsVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Auto-show in development only
  useEffect(() => {
    if (process.env.NODE_ENV === "development") setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-9999 max-w-xs w-full bg-background border border-base-300 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-base-400 px-4 py-3 flex items-center justify-between border-b border-base-300">
        <div
          className={`font-mono text-xs uppercase tracking-widest text-success flex items-center gap-2`}
        >
          <div
            className={`w-2 h-2 ${store.validationState.isValid ? "bg-success" : "bg-error"} rounded-full animate-pulse`}
          />
          DEBUG PANEL
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-foreground/60 hover:text-foreground text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="max-h-[70vh] overflow-auto p-4 text-xs font-mono space-y-6">
        {/* Current Tab
        <div>
          <div className="bg-background mb-1">CURRENT TAB</div>
          <div className="badge badge-primary badge-outline">
            {store.currentTab}
          </div>
        </div> */}

        {/* Point Economy */}
        <div>
          <div className="text-foreground/60 mb-2">POINT ECONOMY</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-base-400 p-3 rounded-xl">
              Attributes
              <br />
              <span className="text-2xl font-bold text-primary">
                {store.attributePointsUsed} / {store.availableAttributePoints}
              </span>
            </div>
            <div className="bg-base-400 p-3 rounded-xl">
              Skills
              <br />
              <span className="text-2xl font-bold text-primary">
                {store.skillPointsUsed} / {store.availableSkillPoints}
              </span>
            </div>
            <div className="bg-base-400 p-3 rounded-xl">
              Hindrances
              <br />
              <span className="text-2xl font-bold text-primary">
                {store.hindrancePointsUsed} / {store.maxHindrancePoints}
              </span>
            </div>
          </div>
        </div>

        {/* Validation Summary */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-foreground/60">VALIDATION</span>
            {store.validationState.isValid ? (
              <span className="badge badge-success px-2">VALID</span>
            ) : (
              <span className="badge badge-error px-2">INVALID</span>
            )}
          </div>
          <details className="bg-base-400 rounded-xl p-3">
            <summary className="cursor-pointer text-xs text-foreground/70">
              Tab States ({Object.keys(store.validationState.tabStates).length})
            </summary>
            <pre className="text-[10px] mt-2 overflow-auto">
              {JSON.stringify(store.validationState.tabStates, null, 2)}
            </pre>
          </details>
        </div>

        {/* Attributes */}
        <details className="bg-base-400 rounded-xl p-3">
          <summary className="cursor-pointer text-xs text-foreground/70">
            Attributes
          </summary>
          <pre className="text-[10px] mt-2 overflow-auto">
            {JSON.stringify(store.attributes, null, 2)}
          </pre>
        </details>

        {/* Skills */}
        <details className="bg-base-400 rounded-xl p-3">
          <summary className="cursor-pointer text-xs text-foreground/70">
            Skills
          </summary>
          <pre className="text-[10px] mt-2 overflow-auto">
            {JSON.stringify(store.skills, null, 2)}
          </pre>
        </details>

        {/* Hindrances */}
        <details className="bg-base-400 rounded-xl p-3">
          <summary className="cursor-pointer text-xs text-foreground/70">
            Hindrances ({store.hindrances.length})
          </summary>
          <pre className="text-[10px] mt-2 overflow-auto">
            {JSON.stringify(store.hindrances, null, 2)}
          </pre>
        </details>

        {/* Edges */}
        <details className="bg-base-400 rounded-xl p-3">
          <summary className="cursor-pointer text-xs text-foreground/70">
            Edges ({store.edges.length})
          </summary>
          <pre className="text-[10px] mt-2 overflow-auto">
            {JSON.stringify(store.edges, null, 2)}
          </pre>
        </details>

        {/* Character Sources */}
        <details className="bg-base-400 rounded-xl p-3">
          <summary className="cursor-pointer text-xs text-foreground/70">
            Character Sources
          </summary>
          <pre className="text-[10px] mt-2 overflow-auto max-h-96">
            {JSON.stringify(store.sources, null, 2)}
          </pre>
        </details>

        {/* --- Active Race Modifiers --- */}
        <details className="bg-base-400 rounded-xl p-3 border border-secondary/30">
          <summary className="cursor-pointer text-xs text-secondary font-bold">
            Rules Engine: Active Race Modifiers
          </summary>
          <div className="mt-3 space-y-4">
            {/* Computed Output */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                1. Computed Output (Store.activeModifiers)
              </p>
              <pre className="text-[10px] bg-base-300/50 p-2 rounded-md overflow-auto max-h-64">
                {JSON.stringify(store.activeModifiers, null, 2)}
              </pre>
            </div>

            {/* Raw Payload Interpreter */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                2. Raw Payloads (builderState.racialAbilities)
              </p>
              <pre className="text-[10px] bg-base-300/50 p-2 rounded-md overflow-auto max-h-64">
                {JSON.stringify(
                  store.builderState?.racialAbilities || [],
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </details>
        {/* --------------------------------- */}

        {/* Raw Draft (for deep debugging) */}
        <details className="bg-base-400 rounded-xl p-3">
          <summary className="cursor-pointer text-xs text-foreground/70">
            Raw Draft (full)
          </summary>
          <pre className="text-[10px] mt-2 overflow-auto max-h-96">
            {JSON.stringify(store, null, 2)}
          </pre>
        </details>
      </div>

      {/* Footer hint */}
      <div className="text-[10px] text-center py-2 bg-base-950 text-foreground/40 border-t border-base-300">
        Development Debug Panel • Close with ×
      </div>
    </div>
  );
}
