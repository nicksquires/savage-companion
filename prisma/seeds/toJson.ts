import { Prisma } from "@prisma/client";

export const toJson = (value: any): Prisma.InputJsonValue | typeof Prisma.JsonNull =>
  value === null ? Prisma.JsonNull : (value as Prisma.InputJsonValue);