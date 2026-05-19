import { cva, type VariantProps } from "class-variance-authority";

export const parchmentVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-base-100 border border-base-300 shadow-md rounded-xl",
        parchment:
          "bg-base-50/50 border border-base-300/60 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] rounded-sm", // Rougher, older paper
        arcane:
          "bg-base-100 border border-accent/50 shadow-[0_0_15px_var(--color-accent)] rounded-lg", // Glowing, magical
        damaged:
          "bg-base-50/40 border-dashed border-error/40 shadow-sm rounded-md", // Torn, imperfect
        heroic:
          "bg-gradient-to-br from-base-100 to-base-200 border-2 border-success/30 shadow-lg rounded-xl", // Clean, embossed
      },
      elevation: {
        flat: "shadow-none",
        raised: "shadow-md hover:shadow-lg hover:-translate-y-1",
        floating:
          "shadow-lg hover:shadow-[0_10px_25px_var(--color-accent)] hover:-translate-y-2",
      },
    },
    defaultVariants: {
      variant: "default",
      elevation: "raised",
    },
  },
);
