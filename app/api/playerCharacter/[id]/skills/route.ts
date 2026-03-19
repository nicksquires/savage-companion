import { prisma } from "@/prisma/client";
import { createCharacterAssignmentHandler } from "@/app/api/createCharacterAssignmentHandler";
import { addSkillSchema } from "@/lib/schemas/api/playerCharacter/addSkillSchema";
import { skillUpdateSchema } from "@/lib/schemas/api/skill.schema";

const handler = createCharacterAssignmentHandler({
  entityName: "skill",
  assignmentModel: prisma.playerCharacterSkill,
  baseModel: prisma.skill,
  compositeKey: "playerCharacterId_skillId",
  paramIdKey: "id",
  paramItemKey: "skillId",
  addSchema: addSkillSchema,
  updateSchema: skillUpdateSchema,
  include: { skill: true },
});

export const GET = handler.GET_ALL;
export const POST = handler.POST;