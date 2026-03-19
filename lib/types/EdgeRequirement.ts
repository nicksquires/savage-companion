// import { DieType } from "@prisma/client";

export interface EdgeRequirement {
  type: string;
  dieType?: string;
  attribute?: string;
  skill?: string;
  edgeSlug?: string;
};

// For future use with rules engine backend validation
//
// export type RequirementPayload =
//   | {
//       type: "ATTRIBUTE";
//       attribute: string;
//       dieType: DieType;
//     }
//   | {
//       type: "SKILL";
//       skill: string;
//       dieType: DieType;
//     }
//   | {
//       type: "EDGE";
//       slug: string;
//     };
