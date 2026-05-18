import React from "react";

interface WildCardLogoProps {
  className?: string;
  style?: React.CSSProperties;
  primaryColor?: string; // Main logo color (sword + globe + border)
  flameColor?: string; // Accent flame / glow color
  size?: number | string;
}

export const WildCardLogo: React.FC<WildCardLogoProps> = ({
  className = "",
  style,
  primaryColor = "var(--color-base-content)", // Default to your theme's light color
  flameColor = "#f59e0b", // Warm flame accent
  size = 240,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        {/* Soft glow for flames */}
        <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer Flame / Ink-blot Border (Negative space creates the wild shape) */}
      <g filter="url(#flameGlow)">
        <path
          d="M85 120 Q40 180 55 280 Q35 380 95 435 Q160 480 256 465 Q380 485 445 410 Q480 320 460 190 Q425 100 340 75 Q220 45 85 120Z"
          fill="none"
          stroke={primaryColor}
          strokeWidth="38"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M100 135 Q55 190 70 275 Q50 370 105 420 Q165 460 256 448 Q365 465 425 395 Q455 305 435 185 Q405 115 325 95 Q215 70 100 135Z"
          fill="none"
          stroke={flameColor}
          strokeWidth="18"
          strokeLinejoin="round"
          opacity="0.75"
        />
      </g>

      {/* Globe */}
      <circle
        cx="256"
        cy="256"
        r="98"
        fill="none"
        stroke={primaryColor}
        strokeWidth="14"
      />
      {/* Latitude lines */}
      <circle
        cx="256"
        cy="256"
        r="68"
        fill="none"
        stroke={primaryColor}
        strokeWidth="9"
      />
      <circle
        cx="256"
        cy="256"
        r="38"
        fill="none"
        stroke={primaryColor}
        strokeWidth="9"
      />
      {/* Longitude lines */}
      <path
        d="M158 256 Q256 170 354 256"
        fill="none"
        stroke={primaryColor}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M178 256 Q256 195 334 256"
        fill="none"
        stroke={primaryColor}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M198 256 Q256 225 314 256"
        fill="none"
        stroke={primaryColor}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Sword */}
      <g transform="translate(165 125) rotate(-38)">
        {/* Blade */}
        <rect x="48" y="8" width="110" height="22" rx="4" fill={primaryColor} />
        {/* Hilt */}
        <rect x="38" y="2" width="28" height="34" rx="4" fill={primaryColor} />
        {/* Guard */}
        <rect x="25" y="0" width="18" height="38" rx="3" fill={primaryColor} />
        {/* Pommel */}
        <circle cx="48" cy="19" r="12" fill={primaryColor} />
      </g>

      {/* Subtle inner flame highlights around globe */}
      <path
        d="M180 195 Q210 165 256 175 Q300 165 325 205"
        fill="none"
        stroke={flameColor}
        strokeWidth="11"
        opacity="0.6"
      />
    </svg>
  );
};
