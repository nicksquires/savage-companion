import { motion } from "framer-motion";
import { Rank } from "@prisma/client";

const RANK_INITIALS: Record<Rank, string> = {
  NOVICE: "N",
  SEASONED: "S",
  VETERAN: "V",
  HEROIC: "H",
  LEGENDARY: "L",
};

// Hardcoded Tailwind maps ensure the compiler never purges these dynamic states
const COLOR_MAP: Record<
  Rank,
  { border: string; bg: string; shadow: string; text: string }
> = {
  NOVICE: {
    border: "border-base-300",
    bg: "bg-base-300/20",
    shadow: "shadow-[inset_0_0_15px_rgba(var(--color-success-rgb),1)]",
    text: "text-base-content",
  },
  SEASONED: {
    border: "border-success",
    bg: "bg-success/20",
    shadow: "shadow-[inset_0_0_15px_rgba(var(--color-success-rgb),1)]",
    text: "text-success",
  },
  VETERAN: {
    border: "border-info",
    bg: "bg-info/20",
    shadow: "shadow-[inset_0_0_15px_rgba(var(--color-info-rgb),1)]",
    text: "text-info",
  },
  HEROIC: {
    border: "border-error",
    bg: "bg-error/20",
    shadow: "shadow-[inset_0_0_15px_rgba(var(--color-error-rgb),1)]",
    text: "text-error",
  },
  LEGENDARY: {
    border: "border-primary",
    bg: "bg-primary/20",
    shadow: "shadow-[inset_0_0_15px_rgba(var(--color-primary-rgb),1)]",
    text: "text-primary",
  },
};

export const RankMilestoneNode = ({
  rank,
  status,
  onClick,
}: {
  rank: Rank;
  status: string;
  onClick: () => void;
}) => {
  const isLocked = status === "locked";
  const colors = COLOR_MAP[rank];

  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      className="relative z-20 w-9 h-9 md:w-14 md:h-14 rounded-full flex items-center justify-center group"
      whileHover={!isLocked ? { scale: 1.1 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
    >
      {/* Outer Engraved Metal Ring */}
      <div
        className={`absolute inset-0 rounded-full border-[3px] shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20 transition-colors duration-500
        ${isLocked ? "border-base-content/20 bg-base-900/80" : `${colors.border} bg-black/60`}
      `}
        style={{ backdropFilter: "blur(8px)" }}
      />

      {/* Rotating Runes/Gears (Visual Flair) */}
      {!isLocked && (
        <div className="absolute -inset-2 border-4 border-dashed border-base-content/40 rounded-full animate-spin-slow pointer-events-none z-10" />
      )}

      {/* Volumetric Core */}
      <div
        className={`absolute inset-1.5 rounded-full flex items-center justify-center z-30 overflow-hidden transition-all duration-500
        ${isLocked ? "bg-black/50 shadow-[inset_0_2px_4px_rgba(0,0,0,1)]" : `${colors.bg} ${colors.shadow}`}
      `}
      >
        {!isLocked && (
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay opacity-80" />
        )}

        <div className="absolute top-0 left-[10%] right-[10%] h-[40%] bg-linear-to-b from-white/40 to-transparent rounded-t-full pointer-events-none z-40" />

        <span
          className={`relative font-header text-md md:text-2xl font-bold z-50 drop-shadow-md
           ${isLocked ? "text-white/20" : "text-white"}
         `}
        >
          {RANK_INITIALS[rank]}
        </span>
      </div>
    </motion.button>
  );
};
