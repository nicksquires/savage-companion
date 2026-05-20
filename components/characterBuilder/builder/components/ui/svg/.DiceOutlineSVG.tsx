// import React from "react";

// type DiceType = "D4" | "D6" | "D8" | "D10" | "D12" | "D20";

// interface DiceSVGProps {
//   type: DiceType;
//   size?: number | string;
//   color?: string;
//   className?: string;
// }

// export const DiceOutlineSVG: React.FC<DiceSVGProps> = ({
//   type,
//   size = 100,
//   color = "currentColor",
//   className = "",
// }) => {
//   const commonProps = {
//     width: size,
//     height: size,
//     viewBox: "0 0 100 100",
//     fill: "none",
//     stroke: color,
//     strokeWidth: "7",
//     strokeLinejoin: "round" as const,
//     className,
//   };

//   switch (type) {
//     case "D4":
//       return (
//         <svg {...commonProps}>
//           <polygon points="50,12 88,85 12,85" />
//           <circle cx="50" cy="48" r="6" fill={color} />
//         </svg>
//       );

//     case "D6":
//       return (
//         <svg {...commonProps}>
//           <rect x="18" y="18" width="64" height="64" rx="12" />
//           <circle cx="50" cy="50" r="7" fill={color} />
//         </svg>
//       );

//     case "D8":
//       return (
//         <svg {...commonProps}>
//           <polygon points="50,12 85,35 85,65 50,88 15,65 15,35" />
//           <circle cx="50" cy="50" r="7" fill={color} />
//         </svg>
//       );

//     case "D10":
//       return (
//         <svg {...commonProps}>
//           <polygon points="50,8 88,35 78,82 22,82 12,35" />
//           <circle cx="50" cy="48" r="7" fill={color} />
//         </svg>
//       );

//     case "D12":
//       return (
//         <svg {...commonProps}>
//           <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
//           <circle cx="50" cy="50" r="7" fill={color} />
//         </svg>
//       );

//     case "D20":
//       return (
//         <svg {...commonProps}>
//           {/* Icosahedron-style D20 */}
//           <polygon points="50,10 80,30 80,70 50,90 20,70 20,30" />
//           <polygon points="35,25 65,25 75,50 65,75 35,75 25,50" />
//           <circle cx="50" cy="50" r="8" fill={color} />
//         </svg>
//       );

//     default:
//       return null;
//   }
// };

// // Individual exports for convenience
// export const D4 = (props: Omit<DiceSVGProps, "type">) => (
//   <DiceSVG type="D4" {...props} />
// );
// export const D6 = (props: Omit<DiceSVGProps, "type">) => (
//   <DiceSVG type="D6" {...props} />
// );
// export const D8 = (props: Omit<DiceSVGProps, "type">) => (
//   <DiceSVG type="D8" {...props} />
// );
// export const D10 = (props: Omit<DiceSVGProps, "type">) => (
//   <DiceSVG type="D10" {...props} />
// );
// export const D12 = (props: Omit<DiceSVGProps, "type">) => (
//   <DiceSVG type="D12" {...props} />
// );
// export const D20 = (props: Omit<DiceSVGProps, "type">) => (
//   <DiceSVG type="D20" {...props} />
// );
