// components/ui/DiceSVGs.tsx
import React from "react";

type DiceType = "D4" | "D6" | "D8" | "D10" | "D12" | "D20";
type DiceVariant = "numbered" | "pips";

interface DiceSVGProps {
  type: DiceType;
  variant?: DiceVariant; // Only affects D6 for now
  size?: number | string;
  color?: string;
  className?: string;
}

export const DiceSVG: React.FC<DiceSVGProps> = ({
  type,
  variant = "numbered",
  size = 100,
  color = "currentColor",
  className = "",
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: color,
    strokeWidth: "4.25",
    strokeLinejoin: "round" as const,
    className: "tracking-wider",
  };

  const numberProps = {
    fill: "none",
    fontSize: "16",
    fontWeight: "100" as const,
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontFamily: "var(--theme-font-body)",
    strokeWidth: "2",
  };

  // Alternate D6 with pips
  if (type === "D6" && variant === "pips") {
    return (
      <svg {...commonProps}>
        <rect x="18" y="18" width="64" height="64" rx="12" stroke={color} />
        {/* Six pips in standard dice layout */}
        <circle cx="35" cy="35" r="5" fill={color} />
        <circle cx="65" cy="35" r="5" fill={color} />
        <circle cx="35" cy="50" r="5" fill={color} />
        <circle cx="65" cy="50" r="5" fill={color} />
        <circle cx="35" cy="65" r="5" fill={color} />
        <circle cx="65" cy="65" r="5" fill={color} />
      </svg>
    );
  }

  // Default numbered versions
  switch (type) {
    case "D4":
      return (
        <svg {...commonProps}>
          <polygon points="50,12 88,85 12,85" />
          <text x="50" y="64" {...numberProps}>
            D4
          </text>
        </svg>
      );

    case "D6":
      return (
        <svg {...commonProps}>
          <rect x="18" y="18" width="64" height="64" rx="12" />
          <text x="50" y="53" {...numberProps}>
            D6
          </text>
        </svg>
      );

    case "D8":
      return (
        <svg {...commonProps}>
          <polygon points="50,12 85,35 85,65 50,88 15,65 15,35" />
          <text x="50" y="52" {...numberProps}>
            D8
          </text>
        </svg>
      );

    case "D10":
      return (
        <svg {...commonProps}>
          <polygon points="50,8 88,35 78,82 22,82 12,35" />
          <text x="50" y="51" {...numberProps}>
            D10
          </text>
        </svg>
      );

    case "D12":
      return (
        <svg {...commonProps}>
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
          <text x="50" y="52" {...numberProps}>
            D12
          </text>
        </svg>
      );

    case "D20":
      return (
        <svg {...commonProps}>
          <polygon points="50,10 80,30 80,70 50,90 20,70 20,30" />
          <polygon points="35,25 65,25 75,50 65,75 35,75 25,50" />
          <text x="50" y="51" {...numberProps} fontSize="23">
            D20
          </text>
        </svg>
      );

    default:
      return null;
  }
};

// Convenient individual exports
export const D4 = (props: Omit<DiceSVGProps, "type">) => (
  <DiceSVG type="D4" {...props} />
);
export const D6 = (props: Omit<DiceSVGProps, "type">) => (
  <DiceSVG type="D6" {...props} />
);
export const D6Pips = (props: Omit<DiceSVGProps, "type" | "variant">) => (
  <DiceSVG type="D6" variant="pips" {...props} />
);
export const D8 = (props: Omit<DiceSVGProps, "type">) => (
  <DiceSVG type="D8" {...props} />
);
export const D10 = (props: Omit<DiceSVGProps, "type">) => (
  <DiceSVG type="D10" {...props} />
);
export const D12 = (props: Omit<DiceSVGProps, "type">) => (
  <DiceSVG type="D12" {...props} />
);
export const D20 = (props: Omit<DiceSVGProps, "type">) => (
  <DiceSVG type="D20" {...props} />
);
