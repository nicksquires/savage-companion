import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

export const EquipToggleButton = ({
  isEquipped,
  onToggle,
  isArmor,
}: {
  isEquipped: boolean;
  onToggle: () => void;
  isArmor: boolean;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={cn(
        "relative p-1.5 rounded-md transition-all duration-300 overflow-hidden",
        isEquipped
          ? isArmor
            ? "text-info shadow-[0_0_10px_var(--color-info)]"
            : "text-accent shadow-[0_0_10px_var(--color-accent)]"
          : "text-base-content/30 hover:text-base-content/60",
      )}
    >
      {isEquipped && (
        <motion.div
          layoutId="equipGlow"
          className={cn(
            "absolute inset-0 opacity-20",
            isArmor ? "bg-info" : "bg-accent",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
        />
      )}
      {isEquipped ? (
        <CheckCircle2 className="w-5 h-5 relative z-10" />
      ) : (
        <Circle className="w-5 h-5 relative z-10" />
      )}
    </motion.button>
  );
};
