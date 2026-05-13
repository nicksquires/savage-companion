import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import { parchmentVariants } from "../gear/parchmentVariants";
import { CategoryIcon } from "./CategoryIcon";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// --- ITEM SCROLL CARD (The Shop) ---
export const ItemScrollCard = ({
  item,
  onBuy,
  disabled,
}: {
  item: any;
  onBuy: () => void;
  disabled: boolean;
}) => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.01}
      transitionSpeed={2000}
    >
      <div
        className={cn(
          parchmentVariants({ variant: "scrollCard", interactive: "hover" }),
          "p-4 flex gap-4 items-center group",
        )}
      >
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CategoryIcon type={item.type} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-base-content/50">
              {item.type}
            </span>
          </div>
          <h3 className="font-header text-xl truncate text-primary drop-shadow-sm">
            {item.name}
          </h3>

          <div className="flex items-center gap-4 mt-2 text-xs font-bold font-mono text-base-content/70">
            <span className="text-success tracking-widest">
              ${item.cost || 0}
            </span>
            <span className="flex items-center gap-1 opacity-60">
              {item.weight || 0} lbs
            </span>
          </div>
        </div>

        {/* Wax Seal Buy Button */}
        <motion.button
          whileHover={!disabled ? { scale: 1.1, rotate: [0, -10, 10, 0] } : {}}
          whileTap={!disabled ? { scale: 0.9 } : {}}
          onClick={onBuy}
          disabled={disabled}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all shadow-md",
            disabled
              ? "bg-base-300 border-base-200 text-base-content/30 opacity-50"
              : "bg-primary/20 border-primary text-primary hover:bg-primary hover:text-primary-content shadow-[inset_0_0_10px_rgba(56,189,248,0.3)]",
          )}
        >
          <Plus strokeWidth={3} />
        </motion.button>
      </div>
    </Tilt>
  );
};
