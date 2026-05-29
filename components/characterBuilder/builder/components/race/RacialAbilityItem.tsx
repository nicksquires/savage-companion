import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExpandedAbility } from "@/lib/types/CharacterBuilder";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function RacialAbilityItem({ ability }: { ability: ExpandedAbility }) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Robust value calculation (Case-insensitive)
  let calculatedValue = ability.value;
  if (ability._type === "hindrance" && ability.severity) {
    calculatedValue = ability.severity.toUpperCase() === "MAJOR" ? -2 : -1;
  }

  // Convert safely to a Number to avoid string/number coercion bugs in rendering
  const numericValue = Number(calculatedValue);
  const hasValue =
    !isNaN(numericValue) &&
    calculatedValue !== null &&
    calculatedValue !== undefined;

  // 2. Robust text display logic
  const summary = ability.summary?.trim();
  const description = ability.description?.trim();
  const displayText = summary && summary.length > 0 ? summary : description;

  // 3. Negative check logic
  const isNegative =
    ability._type === "hindrance" || (hasValue && numericValue < 0);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border transition-all duration-300",
        "bg-base-200/40 backdrop-blur-sm shadow-sm hover:shadow-md",
        isNegative
          ? "border-error/20 hover:border-error/50"
          : "border-success/20 hover:border-success/50",
        isOpen ? "bg-base-200/80" : "",
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-3 text-left focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-header text-lg font-bold tracking-wide capitalize transition-colors",
              isNegative ? "text-error" : "text-success",
            )}
          >
            {/* Added optional chaining to ability.name just to be safe */}
            {ability._type === "hindrance" && ability.name
              ? ability.name.replace(/\s*\((Minor|Major)\)/gi, "")
              : ability.name}
          </span>

          {hasValue && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-bold font-body shadow-inner border",
                isNegative
                  ? "bg-error/10 text-error border-error/20"
                  : "bg-success/10 text-success border-success/20",
              )}
            >
              {numericValue > 0 ? `+${numericValue}` : numericValue}
            </span>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "p-1 rounded-full bg-base-100 border shadow-sm transition-colors",
            isNegative
              ? "border-error/20 text-error/70 group-hover:text-error"
              : "border-success/20 text-success/70 group-hover:text-success",
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Expandable Description Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 pb-4 pt-1">
              <div className="h-px w-full bg-linear-to-r from-transparent via-base-content/10 to-transparent mb-3" />

              <p className="text-sm font-body text-base-content/80 leading-relaxed italic">
                {displayText && displayText.length > 0
                  ? displayText
                  : "No description provided."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
