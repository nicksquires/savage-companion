import { cn } from "@/lib/utils";

/**
 * COMPONENT: OrnateCorner (Structured)
 * Used for top-left and bottom-right to anchor the geometry.
 */
export const OrnateCorner = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    className={cn(
      "absolute w-28 h-28 pointer-events-none z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
      className,
    )}
  >
    <path
      d="M2 100V2H100M15 85V15H85M30 70V30H70"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="opacity-50"
    />
    <circle cx="2" cy="2" r="3" fill="currentColor" />
    <path
      d="M10 10L30 30M10 2V10H2M118 2H110V10M2 118V110H10"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M40 10C40 10 50 2 60 2C70 2 80 10 80 10"
      stroke="currentColor"
      strokeWidth="1"
      className="opacity-30"
    />
  </svg>
);

/**
 * COMPONENT: LaurelCorner (Expressive)
 * Used for top-right and bottom-left to introduce organic, elvish/arcane curvature.
 */
export const LaurelCorner = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    className={cn(
      "absolute w-28 h-28 pointer-events-none z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
      className,
    )}
  >
    <path
      d="M4 116 Q 4 4 116 4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      className="opacity-60"
    />
    <path
      d="M15 90 Q 20 80 35 85 Q 25 95 15 90"
      fill="currentColor"
      className="opacity-80"
    />
    <path
      d="M30 60 Q 40 50 55 60 Q 45 70 30 60"
      fill="currentColor"
      className="opacity-80"
    />
    <path
      d="M60 30 Q 70 20 85 35 Q 75 45 60 30"
      fill="currentColor"
      className="opacity-80"
    />
    <path
      d="M90 15 Q 95 25 85 35 Q 80 20 90 15"
      fill="currentColor"
      className="opacity-80"
    />
    <circle cx="4" cy="4" r="3" fill="currentColor" />
  </svg>
);
