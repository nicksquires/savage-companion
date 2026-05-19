import React from "react";

interface CharListCardOrnamentProps {
  className?: string;
  style?: React.CSSProperties;
  borderColor?: string;
  accentColor?: string;
  shadowColor?: string;
  innerColor?: string;
}

export const CharListCardOrnament: React.FC<CharListCardOrnamentProps> = ({
  className = "",
  style,
  borderColor = "var(--color-base-900)", // light green/cream in your theme
  accentColor = "#d4af37", // classic warm gold (you can change this)
  shadowColor = "var(--color-base-50)", // very dark
  innerColor = "var(--color-base-200)",
}) => {
  return (
    <>
      <div
        className="absolute rounded-xs mx-8.25 my-13.5 inset-0 pointer-events-none
      mix-blend-hard-light opacity-10 bg-[url('/images/textures/glass.png')] bg-bottom-right
      z-0"
      />
      <div
        className="absolute z-0 inset-0 pointer-events-none
      mix-blend-color-normal opacity-30 bg-[url('/images/textures/inkpaint.png')] bg-center m-12"
      />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <defs>
          {/* Parchment Texture (Inner Background) */}
          <pattern
            id="parchment"
            patternUnits="userSpaceOnUse"
            width="12"
            height="12"
            patternTransform="rotate(12)"
          >
            <rect width="12" height="12" fill={innerColor} opacity="0.92" />
            <circle cx="3" cy="4" r="1.1" fill="#d4af37" opacity="0.09" />
            <circle cx="9" cy="8" r="0.9" fill="#f5d56e" opacity="0.07" />
            <path
              d="M0 5 H12 M4 0 V12 M8 2 V10"
              stroke="#0f0a05"
              strokeWidth="0.5"
              opacity="0.14"
            />
          </pattern>

          {/* Border Texture (Inner Background) */}
          <pattern
            id="borderparchment"
            patternUnits="userSpaceOnUse"
            width="12"
            height="12"
            patternTransform="rotate(12)"
          >
            <rect width="12" height="12" fill={accentColor} opacity="0.93" />
            <circle cx="3" cy="4" r="1.1" fill={borderColor} opacity="0.12" />
            <circle cx="9" cy="8" r="0.9" fill={shadowColor} opacity="0.10" />
            <path
              d="M0 5 H12 M4 0 V12 M8 2 V10"
              stroke={shadowColor}
              strokeWidth=".8"
              opacity="0.09"
            />
          </pattern>

          {/* Wood Grain Texture for Borders & Laurels */}
          <pattern
            id="wood"
            patternUnits="userSpaceOnUse"
            width="24"
            height="10"
            patternTransform="rotate(18)"
          >
            <rect width="24" height="10" fill={accentColor} />
            <path
              d="M0 3 Q6 1 12 4 Q18 2 24 5"
              stroke={innerColor}
              strokeWidth="2"
              opacity="0.75"
            />
            <path
              d="M0 7 Q7 5 13 8 Q19 6 24 8"
              stroke={borderColor}
              strokeWidth="1.5"
              opacity="0.55"
            />
          </pattern>
        </defs>

        {/* Main metallic gold border */}
        <rect
          x="32"
          y="32"
          width="736"
          height="536"
          rx="12"
          ry="12"
          stroke="url(#borderparchment)"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Inner dark accent */}
        <rect
          x="38"
          y="40"
          width="724"
          height="520"
          rx="8"
          ry="8"
          stroke={shadowColor}
          opacity="0.25"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Subtle inner glow */}
        <rect
          x="50"
          y="50"
          width="700"
          height="500"
          rx="7"
          ry="7"
          stroke="url(#borderparchment)"
          strokeWidth="2.5"
          opacity="0.09"
        />

        {/* Parchment Texture Definition */}
        <defs>
          <pattern
            id="parchment"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
            patternTransform="rotate(12)"
          >
            <rect
              width="8"
              height="8"
              fill="var(--color-base-100)"
              opacity="0.65"
            />
            <circle cx="2" cy="3" r="0.7" fill={accentColor} opacity="0.09" />
            <path
              d="M0 4 H8 M3 0 V8"
              stroke="var(--color-base-50)"
              strokeWidth="0.4"
              opacity="0.14"
            />
          </pattern>
        </defs>

        {/* Parchment texture overlay */}
        <rect
          x="50"
          y="50"
          width="700"
          height="500"
          rx="7"
          ry="7"
          fill="url(#parchment)"
          opacity="0.7"
        />

        {/* Top Border Base */}
        <rect
          x="44"
          y="39"
          width="716"
          height="5.5"
          rx="20"
          fill={innerColor}
          stroke="url(#borderparchment)"
          strokeWidth="2.5"
          opacity="0.1"
        />

        {/* Top-Left Corner */}
        <g>
          <path
            d="M52 52 Q43 45 41 52 Q46 57 53 54 Z"
            fill={innerColor}
            stroke="url(#borderparchment)"
            strokeWidth="1.8"
            opacity="0.8"
          />
        </g>

        {/* Top-Right Corner */}
        <g>
          <path
            d="M748 52 Q757 45 759 52 Q754 57 747 54 Z"
            fill={innerColor}
            stroke="url(#borderparchment)"
            strokeWidth="1.8"
            opacity="0.8"
          />
        </g>

        {/* Top Center Ornament */}
        <g transform="translate(400 32.75)">
          <path
            d="M-356 -1 Q-100 -25 -50 -10 Q0 -29 50 -10 Q100 -25 356 -1"
            fill="url(#borderparchment)"
            stroke="url(#borderparchment)"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
        </g>

        {/* Bottom Border Base */}
        <rect
          x="43"
          y="554"
          width="714"
          height="6"
          rx="20"
          fill={shadowColor}
          stroke="url(#borderparchment)"
          strokeWidth="2.5"
          opacity="0.1"
        />

        {/* Bottom-Left Corner */}
        <g>
          <path
            d="M52 548 Q43 555 41 548 Q46 543 53 546 Z"
            fill={innerColor}
            stroke="url(#borderparchment)"
            strokeWidth="1.8"
            opacity="0.8"
          />
        </g>

        {/* Bottom-Right Corner */}
        <g>
          <path
            d="M748 548 Q757 555 759 548 Q754 543 747 546 Z"
            fill={innerColor}
            stroke="url(#borderparchment)"
            strokeWidth="1.8"
            opacity="0.8"
          />
        </g>

        {/* Bottom Center Ornament */}
        <g transform="translate(400 572)">
          <path
            d="M-290 -4 Q-34 24 -24 10 Q0 29 24 10 Q34 24 290 -4"
            fill="url(#borderparchment)"
            stroke="url(#borderparchment)"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
        </g>

        {/* Alternating Laurels - Top */}
        <g fill={accentColor} stroke="url(#borderparchment)" strokeWidth="1.8">
          <path d="M135 66 Q127 57 120 64 Q129 70 137 67 Z" />
          <path d="M220 66 Q212 57 205 64 Q214 70 222 67 Z" />
          <path d="M480 66 Q472 57 465 64 Q474 70 482 67 Z" />
          <path d="M565 66 Q557 57 550 64 Q559 70 567 67 Z" />
          <path d="M650 66 Q642 57 635 64 Q644 70 652 67 Z" />
        </g>

        {/* Alternating Laurels - Bottom */}
        <g fill={accentColor} stroke="url(#borderparchment)" strokeWidth="1.8">
          <path d="M135 534 Q127 543 120 536 Q129 530 137 533 Z" />
          <path d="M220 534 Q212 543 205 536 Q214 530 222 533 Z" />
          <path d="M305 534 Q297 543 290 536 Q299 530 307 533 Z" />
          <path d="M565 534 Q557 543 550 536 Q559 530 567 533 Z" />
          <path d="M650 534 Q642 543 635 536 Q644 530 652 533 Z" />
        </g>

        {/* Etched dots */}
        <g fill={accentColor} opacity="0.45">
          <circle cx="78" cy="49" r="1" />
          <circle cx="722" cy="49" r="1" />
          <circle cx="78" cy="551" r="1" />
          <circle cx="722" cy="551" r="1" />
          <circle cx="182" cy="46.5" r="1" />
        </g>
      </svg>
    </>
  );
};
