import { useRef, useState, useEffect } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import AdvancementNode from "./AdvancementNode";
import { RankMilestoneNode } from "./RankMilestoneNode";
import { AdvancementConnector } from "./AdvancementConnector";
import AdvanceSelectionModal from "./AdvanceSelectionModal";
import {
  Minus,
  Plus,
  AlertTriangle,
  ShieldPlus,
  Dices,
  Book,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getRankForAdvance } from "@/lib/character/builder/validation";

const TOTAL_NODES = 19;

const toRoman = (num: number) => {
  const map: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let result = "";
  for (const key in map) {
    while (num >= map[key]) {
      result += key;
      num -= map[key];
    }
  }
  return result;
};

function AdvanceTypeIcon({ type }: { type?: string }) {
  if (!type) return null;
  const props = {
    className: "w-4 h-4 md:w-5 md:h-5 opacity-50 text-base-content",
  };
  switch (type) {
    case "EDGE":
      return <ShieldPlus {...props} />;
    case "ATTRIBUTE":
      return <Dices {...props} />;
    case "SKILL":
      return <Book {...props} />;
    default:
      return null;
  }
}

export default function AdvancementBar() {
  const { id } = useParams<{ id: string }>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    advancementLog,
    advancementsEnabled,
    advancesEarned,
    advancesPerRank,
    updateAdvancesEarned,
    removeAdvance,
  } = useCharacterBuilder();

  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [pendingDecrease, setPendingDecrease] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const completedCount = advancementLog.length - 1;
  const progressPercentage = (completedCount / TOTAL_NODES) * 100;

  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      const activeNode = scrollRef.current.querySelector(
        '[data-status="available"]',
      );
      if (activeNode) {
        activeNode.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [completedCount, isMinimized]);

  if (!advancementsEnabled) return null;

  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleAdjust = (delta: number) => {
    const newValue = Math.max(0, advancesEarned + delta);
    if (delta < 0 && newValue < advancementLog.length) {
      setPendingDecrease(true);
      return;
    }
    updateAdvancesEarned(newValue);
    syncToServer({ advancesEarned: newValue });
  };

  const confirmDecrease = async () => {
    const newValue = advancesEarned - 1;
    const advanceToRemove = advancementLog[advancementLog.length - 1];
    if (advanceToRemove) removeAdvance(advanceToRemove.id!);
    updateAdvancesEarned(newValue);
    const updatedLog = useCharacterBuilder.getState().advancementLog;
    await syncToServer({
      advancesEarned: newValue,
      advancementLog: updatedLog,
    });
    setPendingDecrease(false);
  };

  const scrollBar = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      layout
      className="relative w-full max-w-6xl mx-auto group z-20 overflow-visible transition-all duration-500"
    >
      <div className="relative bg-base-200/20 backdrop-blur-sm rounded-3xl rounded-tr-none rounded-tl-none border border-white/5 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {!isMinimized ? (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative p-2"
            >
              <div className="absolute inset-4 bg-success/5 blur-2xl -z-10 rounded-full pointer-events-none" />

              {/* Scroll Controls */}
              <button
                onClick={() => scrollBar("left")}
                className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-40 p-2 text-success/50 hover:text-success hover:drop-shadow-[0_0_12px_rgba(var(--color-success-rgb),0.8)] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              <button
                onClick={() => scrollBar("right")}
                className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-40 p-2 text-success/50 hover:text-success hover:drop-shadow-[0_0_12px_rgba(var(--color-success-rgb),0.8)] transition-all cursor-pointer"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              <div className="mx-8 md:mx-5">
                <div
                  ref={scrollRef}
                  className="relative flex items-center h-26 md:h-42 px-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {/* Advances Counter */}
                  <div className="flex flex-col justify-end mr-2 md:mr-4 shrink-0">
                    <span className="text-[8px] md:text-[12px] tracking-[0.2em] font-bold text-success/80 uppercase mb-2 w-full text-center">
                      Advances
                    </span>
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center bg-base-300/40 border border-success/30 py-1 px-3 rounded-2xl backdrop-blur-md">
                        <button
                          onClick={() => handleAdjust(1)}
                          className="pt-1 text-base-content/40 hover:text-success transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                        <span className="font-builder-header text-2xl md:text-4xl font-bold text-success drop-shadow-[0_0_12px_rgba(var(--color-success-rgb),0.8)] my-1 leading-none tracking-widest">
                          {advancesEarned}
                        </span>
                        <button
                          onClick={() => handleAdjust(-1)}
                          className="pb-1 text-base-content/40 hover:text-error transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between w-full min-w-350 h-full">
                    <AdvancementConnector progress={progressPercentage} />
                    {Array.from({ length: TOTAL_NODES }).map((_, index) => {
                      const advanceNumber = index + 1;
                      const logEntry = advancementLog[index];
                      let status: "locked" | "available" | "completed" =
                        "locked";
                      if (index < advancementLog.length) status = "completed";
                      else if (
                        index < advancesEarned &&
                        index === advancementLog.length
                      )
                        status = "available";

                      return (
                        <div
                          key={advanceNumber}
                          className="relative flex flex-col items-center justify-center snap-center h-full px-2"
                        >
                          <div className="absolute top-2 text-[8px] md:text-[12px] font-serif opacity-80 text-base-content select-none font-bold tracking-widest">
                            {toRoman(advanceNumber)}
                          </div>
                          <div className="z-10" data-status={status}>
                            {advanceNumber % 4 === 0 ? (
                              <RankMilestoneNode
                                rank={getRankForAdvance(
                                  advanceNumber,
                                  advancesPerRank,
                                )}
                                status={status}
                                onClick={() => setSelectedNode(advanceNumber)}
                              />
                            ) : (
                              <AdvancementNode
                                advanceNumber={advanceNumber}
                                status={status}
                                isMilestone={false}
                                advanceData={logEntry}
                                onClick={() => setSelectedNode(advanceNumber)}
                              />
                            )}
                          </div>
                          <div className="absolute bottom-0 md:bottom-2 h-6 flex items-center justify-center">
                            <AdvanceTypeIcon type={logEntry?.type} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Hide Button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="absolute -bottom-0.5 md:bottom-2 right-2 md:right-4 text-success/40 hover:text-success transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(var(--color-success-rgb),0.6)] cursor-pointer px-1"
                title="Minimize Tracker"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="minimized"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-2 flex items-center justify-center py-4 bg-success/5 hover:bg-success/10 transition-colors cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronDown className="w-6 h-6 text-success animate-pulse drop-shadow-[0_0_10px_rgba(var(--color-success-rgb),0.8)]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {pendingDecrease && (
          <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPendingDecrease(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-md bg-[url('/textures/parchment.png')] bg-cover border-2 border-error/50 p-8 rounded-lg shadow-2xl text-base-900 text-center space-y-4"
            >
              <AlertTriangle className="mx-auto text-error w-12 h-12" />
              <h2 className="font-header text-3xl mb-2 border-b border-base-900/20 pb-2 text-error">
                Sever Advancement?
              </h2>
              <p className="text-sm px-4">
                Reducing your earned advances will{" "}
                <strong>permanently delete</strong> your latest recorded
                advancement.
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setPendingDecrease(false)}
                  className="btn flex-1 border-base-900/20 text-base-900"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDecrease}
                  className="btn btn-error flex-1 text-white"
                >
                  Sever Fate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdvanceSelectionModal
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        advanceNumber={selectedNode}
      />
    </motion.div>
  );
}
