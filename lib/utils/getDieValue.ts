import { DieType } from "@prisma/client";

export const getDieValue = (die: DieType): number => {
  const map: Record<DieType, number> = { D4: 4, D6: 6, D8: 8, D10: 10, D12: 12, D20: 20, D30: 30, D50: 50, D100: 100 };
  return map[die] || 4;
};