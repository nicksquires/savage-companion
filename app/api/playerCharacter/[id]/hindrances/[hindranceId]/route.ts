import { prisma } from "@/prisma/client";
import { createCharacterAssignmentHandler } from "@/app/api/createCharacterAssignmentHandler";
import { addHindranceSchema } from "@/lib/schemas/api/playerCharacter/addHindranceSchema";
import { hindranceUpdateSchema } from "@/lib/schemas/api/hindrance.schema";

const handler = createCharacterAssignmentHandler({
  entityName: "hindrance",
  assignmentModel: prisma.playerCharacterHindrance,
  baseModel: prisma.hindrance,
  compositeKey: "playerCharacterId_hindranceId",
  paramIdKey: "id",
  paramItemKey: "hindranceId",
  addSchema: addHindranceSchema,
  updateSchema: hindranceUpdateSchema,
});

export const GET = handler.GET_ONE;
export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;