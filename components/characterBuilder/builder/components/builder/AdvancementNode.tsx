import { motion } from "framer-motion";
import { Advance } from "@/lib/types/CharacterBuilder";

interface NodeProps {
  advanceNumber: number;
  status: "locked" | "available" | "completed";
  isMilestone: boolean;
  advanceData?: Advance;
  onClick: () => void;
}

export default function AdvancementNode({
  advanceNumber,
  status,
  isMilestone,
  advanceData,
  onClick,
}: NodeProps) {
  const isLocked = status === "locked";
  const isAvailable = status === "available";
  const isCompleted = status === "completed";

  return (
    <div className="relative flex flex-col items-center justify-center snap-center shrink-0 z-10 group/node">
      <motion.button
        data-status={status}
        disabled={isLocked}
        onClick={onClick}
        className={`
          relative flex items-center justify-center outline-none
          rounded-full border-2 transition-all duration-500
          ${isMilestone ? "w-10 h-10" : "w-7 h-7"}
          ${isLocked ? "bg-black/60 border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] cursor-not-allowed" : ""}
          ${isCompleted ? "bg-black/40 border-success/60 cursor-pointer" : ""}
          ${isAvailable ? "bg-black/40 border-success shadow-[0_0_20px_rgba(var(--color-success-rgb),0.4)] cursor-pointer" : ""}
        `}
        style={{ backdropFilter: "blur(10px)" }}
        animate={
          isAvailable
            ? {
                boxShadow: [
                  "0px 0px 5px rgba(var(--color-success-rgb), 0.3)",
                  "0px 0px 25px rgba(var(--color-success-rgb), 0.8)",
                  "0px 0px 5px rgba(var(--color-success-rgb), 0.3)",
                ],
              }
            : {}
        }
        transition={
          isAvailable
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
        whileHover={!isLocked ? { scale: 1.15 } : {}}
        whileTap={!isLocked ? { scale: 0.9 } : {}}
      >
        {/* Top Glass Reflection */}
        <div className="absolute top-[10%] left-[15%] right-[15%] h-[30%] bg-linear-to-b from-white/40 to-transparent rounded-t-full pointer-events-none z-20" />

        {/* The Inner Magical Core */}
        <motion.div
          className={`
            rounded-full z-10 flex items-center justify-center
            ${isMilestone ? "w-7 h-7" : "w-4 h-4"}
            ${isLocked ? "bg-white/5" : ""}
            ${isCompleted ? "bg-success shadow-[0_0_15px_rgba(var(--color-success-rgb),0.8)]" : ""}
            ${isAvailable ? "bg-success/80" : ""}
          `}
          initial={false}
          animate={{
            scale: isCompleted ? 1 : isAvailable ? [0.8, 1, 0.8] : 0.6,
          }}
          transition={
            isAvailable
              ? { duration: 1.5, repeat: Infinity }
              : { type: "spring" }
          }
        />
      </motion.button>

      {isCompleted && advanceData && (
        <div
          className="absolute top-2 opacity-0 group-hover/node:opacity-100 transition-opacity 
        pointer-events-none whitespace-nowrap bg-base-500/60 text-xs px-3 py-2 
        rounded-md border border-success/30 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md z-100"
        >
          <p className="font-bold text-success mb-1 tracking-widest uppercase">
            Advance {advanceNumber}
          </p>
          <p className="text-white/80">{advanceData.type}</p>
        </div>
      )}
    </div>
  );
}
