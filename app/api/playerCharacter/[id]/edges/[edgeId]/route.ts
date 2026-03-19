import { prisma } from "@/prisma/client";
import { createCharacterAssignmentHandler } from "@/app/api/createCharacterAssignmentHandler";
import { addEdgeSchema } from "@/lib/schemas/api/playerCharacter/addEdgeSchema";
import { edgeUpdateSchema } from "@/lib/schemas/api/edge.schema";

const handler = createCharacterAssignmentHandler({
  entityName: "edge",
  assignmentModel: prisma.playerCharacterEdge,
  baseModel: prisma.edge,
  compositeKey: "playerCharacterId_edgeId",
  paramIdKey: "id",
  paramItemKey: "edgeId",
  addSchema: addEdgeSchema,
  updateSchema: edgeUpdateSchema,
});

export const GET = handler.GET_ONE;
export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;