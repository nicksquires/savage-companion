import { prisma } from "@/prisma/client";
import { createCharacterAssignmentHandler } from "@/app/api/createCharacterAssignmentHandler";
import { addPowerSchema } from "@/lib/schemas/api/playerCharacter/addPowerSchema";
import { powerUpdateSchema } from "@/lib/schemas/api/power.schema";

const handler = createCharacterAssignmentHandler({
  entityName: "power",
  assignmentModel: prisma.playerCharacterPower,
  baseModel: prisma.power,
  compositeKey: "playerCharacterId_powerId",
  paramIdKey: "id",
  paramItemKey: "powerId",
  addSchema: addPowerSchema,
  updateSchema: powerUpdateSchema,
  include: { power: true },
});

export const GET = handler.GET_ALL;
export const POST = handler.POST;