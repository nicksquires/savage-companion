import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import {
  getRankForAdvance,
  canIncreaseAttribute,
} from "@/lib/character/builder/validation";
import { Rank } from "@prisma/client";
import { useParams } from "next/navigation";
import { Compass, AlertTriangle } from "lucide-react";

export default function AdvanceSelectionModal({
  isOpen,
  onClose,
  advanceNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  advanceNumber: number | null;
}) {
  const { id } = useParams<{ id: string }>();
  const {
    advancesEarned,
    advancesPerRank,
    advancementLog,
    addAdvance,
    removeAdvance,
  } = useCharacterBuilder();

  const [confirmationType, setConfirmationType] = useState<string | null>(null);

  const existingAdvance = advancementLog.find(
    (a) => a.advanceNumber === advanceNumber,
  );

  const syncToServer = async (updatedLog: any[]) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ advancementLog: updatedLog }),
    });
  };

  const handleAdd = async (type: string) => {
    if (existingAdvance?.type === type) return;

    if (existingAdvance && confirmationType !== type) {
      setConfirmationType(type);
      return;
    }

    if (existingAdvance) {
      removeAdvance(existingAdvance.id!);
    }

    const newAdvancePayload = { type: type, payload: {} };
    addAdvance(newAdvancePayload as any);

    const updatedLog = useCharacterBuilder.getState().advancementLog;
    await syncToServer(updatedLog);

    setConfirmationType(null);
    onClose();
  };

  const advanceTypes = [
    { id: "EDGE", label: "New Edge" },
    { id: "SKILL", label: "Two Skill Points" },
    { id: "ATTRIBUTE", label: "Attribute Point" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg bg-[url('/textures/parchment.png')] bg-cover border-2 border-primary/50 p-8 rounded-lg shadow-2xl text-base-900"
          >
            <h2 className="font-header text-3xl mb-4 text-center border-b border-base-900/20 pb-2">
              Advance {advanceNumber}
            </h2>

            <div className="py-6 space-y-3">
              {confirmationType ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center space-y-4"
                >
                  <AlertTriangle className="mx-auto text-error w-12 h-12" />
                  <p className="font-bold text-error">Rewriting Fate?</p>
                  <p className="text-sm px-4">
                    Changing this choice will{" "}
                    <strong>reset all subsequent advances</strong>. This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmationType(null)}
                      className="btn flex-1 border-base-900/20 text-base-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAdd(confirmationType)}
                      className="btn btn-error flex-1 text-white"
                    >
                      Confirm Change
                    </button>
                  </div>
                </motion.div>
              ) : (
                advanceTypes.map((t) => {
                  const isCurrent = existingAdvance?.type === t.id;

                  // Calculate rank for the specific node we clicked on
                  const targetRank = getRankForAdvance(
                    advanceNumber!,
                    advancesPerRank,
                  );

                  const isAttrDisabled =
                    t.id === "ATTRIBUTE" &&
                    !canIncreaseAttribute(
                      targetRank,
                      advanceNumber!, // Pass the ID so the check ignores itself
                      advancementLog,
                    );

                  return (
                    <button
                      key={t.id}
                      onClick={() => handleAdd(t.id)}
                      disabled={!isCurrent && isAttrDisabled}
                      className={`relative w-full btn btn-outline border-base-900/30 text-base-900 group
                        ${isCurrent ? "border-primary bg-primary/10 hover:bg-primary/10 cursor-default" : "hover:bg-primary/20"}
                        ${isAttrDisabled && !isCurrent ? "opacity-50 grayscale" : ""}
                      `}
                    >
                      {isCurrent && (
                        <Compass className="absolute left-4 w-6 h-6 text-amber-500 animate-pulse" />
                      )}
                      {t.label}
                      {isCurrent && (
                        <span className="absolute right-4 text-[10px] uppercase font-bold text-amber-600">
                          Current
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {!confirmationType && (
              <button
                onClick={onClose}
                className="mt-4 w-full btn btn-ghost text-base-900/60"
              >
                Close Tome
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
