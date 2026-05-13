import { cva } from "class-variance-authority";

export const parchmentVariants = cva(
  "relative overflow-hidden transition-all duration-300 backdrop-blur-sm",
  {
    variants: {
      variant: {
        // The main sheet: deep, textured, slightly aged
        panel:
          "bg-base-100/95 border border-base-300 shadow-[inset_0_0_60px_rgba(4,30,48,0.8),0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl",
        // Individual item cards: lighter, feels like a scrap or scroll
        scrollCard:
          "bg-base-200/60 border border-base-300 hover:border-primary/50 shadow-sm rounded-xl",
        // The ledger rows: rigid, ledger-line aesthetic
        ledgerRow:
          "bg-base-50/50 border-b border-base-300/40 hover:bg-base-200/30",
        // Magical elements: glowing, ethereal
        arcane:
          "bg-base-100 border border-accent/60 shadow-[0_0_15px_var(--color-accent),inset_0_0_20px_var(--color-accent)] rounded-lg",
        // Empty states or etched input fields
        etched:
          "bg-base-50/80 border-t-2 border-t-base-300 border-b border-b-base-100 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] rounded-lg",
      },
      interactive: {
        none: "",
        hover:
          "hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:-translate-y-1",
        pressed: "active:scale-95 active:shadow-inner",
      },
    },
    defaultVariants: {
      variant: "panel",
      interactive: "none",
    },
  },
);
