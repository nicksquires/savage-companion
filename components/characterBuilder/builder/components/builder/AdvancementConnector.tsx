import { motion } from "framer-motion";

export const AdvancementConnector = ({ progress }: { progress: number }) => (
  // Notice left-8 right-8 to account for the px-2 padding on the nodes in the flex container
  <div className="absolute top-1/2 left-8 right-8 h-4 -translate-y-1/2 rounded-full overflow-hidden glass-volumetric border border-white/10 bg-black/40 z-0">
    <div className="absolute inset-0 shadow-[inset_0_4px_6px_rgba(0,0,0,0.8)] z-0" />

    <motion.div
      className="relative h-full z-10 overflow-hidden"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ type: "spring", stiffness: 20, damping: 20, mass: 8 }}
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-success/80 via-[#2dd4bf]/90 to-success/80 animate-liquid-flow"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(var(--color-success-rgb), 0.7) 0%, rgba(45, 212, 191, 0.9) 50%, rgba(var(--color-success-rgb), 0.7) 100%)",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-1/2 inset-0 bg-[url('/images/textures/parchment.png')] mix-blend-overlay opacity-60 animate-pulse rounded-t-full" />
    </motion.div>

    <div className="absolute top-px left-2 right-2 h-0.75 bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full z-20 pointer-events-none" />
  </div>
);
