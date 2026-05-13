import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { parchmentVariants } from "./parchmentVariants";

export function PowerCard({ powerSlug }: { powerSlug: string }) {
  // In reality, map slug to actual power data from the store
  const formattedName = powerSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.02}
      transitionSpeed={2000}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          parchmentVariants({ variant: "arcane", elevation: "floating" }),
          "p-4 cursor-pointer group",
        )}
      >
        <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-accent/20 rounded-full text-accent shadow-[0_0_10px_var(--color-accent)]">
            <Wand2 size={24} />
          </div>
          <div>
            <h4 className="font-header text-xl text-base-content drop-shadow-sm">
              {formattedName}
            </h4>
            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
              Arcane Power
            </span>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}
