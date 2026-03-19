import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

//  Using 'unknown' instead of 'any' 
//  keeps ESLint happy, hence Generics

// 1. Define operations we expect Prisma delegates to have.
type PrismaAssignmentOperations = {
  findMany: (args: unknown) => Promise<unknown[]>;
  findUnique: (args: unknown) => Promise<unknown | null>;
  create: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

type PrismaBaseOperations = {
  update: (args: unknown) => Promise<unknown>;
};

// 2. Strongly typed config object using Generics
export type HandlerConfig<
  TAssignment,
  TBase,
  TAddSchema extends ZodSchema,
  TUpdateSchema extends ZodSchema
> = {
  entityName: string;
  assignmentModel: TAssignment;
  baseModel: TBase;
  compositeKey: string;
  paramIdKey: string;
  paramItemKey: string;
  addSchema: TAddSchema;
  updateSchema: TUpdateSchema;
  include?: Record<string, unknown>; // Safely replaces 'any' for Prisma includes
};

export function createCharacterAssignmentHandler<
  TAssignment,
  TBase,
  TAddSchema extends ZodSchema,
  TUpdateSchema extends ZodSchema
>(config: HandlerConfig<TAssignment, TBase, TAddSchema, TUpdateSchema>) {
  
  const {
    entityName,
    compositeKey,
    paramIdKey,
    paramItemKey,
    addSchema,
    updateSchema,
    include,
  } = config;

  // 3. Cast the models internally so TypeScript knows they have the required methods
  const assignmentDb = config.assignmentModel as unknown as PrismaAssignmentOperations;
  const baseDb       = config.baseModel       as unknown as PrismaBaseOperations;

  return {
    // GET ALL
    async GET_ALL(
      _req: NextRequest,
      context: { params: Promise<Record<string, string>> }
    ) {
      try {
        const params = await context.params;
        const playerCharacterId = params[paramIdKey];

        const results = await assignmentDb.findMany({
          where: { playerCharacterId },
          include,
        });

        return NextResponse.json(results);
      } catch (err) {
        return NextResponse.json(
          { error: `Failed to retrieve ${entityName}s`, details: String(err) },
          { status: 500 }
        );
      }
    },

    // GET ONE
    async GET_ONE(
      _req: NextRequest,
      context: { params: Promise<Record<string, string>> }
    ) {
      try {
        const params = await context.params;
        const playerCharacterId = params[paramIdKey];
        const itemId = params[paramItemKey];

        const result = await assignmentDb.findUnique({
          where: {
            [compositeKey]: {
              playerCharacterId,
              [paramItemKey]: itemId,
            },
          },
        });

        if (!result) {
          return NextResponse.json(
            { error: `${entityName} assignment not found` },
            { status: 404 }
          );
        }

        return NextResponse.json(result);
      } catch (err) {
        return NextResponse.json(
          { error: `Failed to fetch ${entityName}`, details: String(err) },
          { status: 500 }
        );
      }
    },

    // POST
    async POST(
      req: NextRequest,
      context: { params: Promise<Record<string, string>> }
    ) {
      try {
        const params = await context.params;
        const playerCharacterId = params[paramIdKey];

        const body = await req.json();
        const validation = addSchema.safeParse(body);

        if (!validation.success) {
          return NextResponse.json(validation.error.flatten(), {
            status: 400,
          });
        }

        // 4. Safely cast Zod data to access the dynamic string key
        const parsedData = validation.data as Record<string, string>;
        const itemId = parsedData[paramItemKey];

        const existing = await assignmentDb.findUnique({
          where: {
            [compositeKey]: {
              playerCharacterId,
              [paramItemKey]: itemId,
            },
          },
        });

        if (existing) {
          return NextResponse.json(
            { error: `${entityName} already assigned` },
            { status: 409 }
          );
        }

        const created = await assignmentDb.create({
          data: {
            playerCharacterId,
            [paramItemKey]: itemId,
          },
        });

        return NextResponse.json(created, { status: 201 });
      } catch (err) {
        return NextResponse.json(
          { error: `Failed to add ${entityName}`, details: String(err) },
          { status: 500 }
        );
      }
    },

    // PATCH
    async PATCH(
      req: NextRequest,
      context: { params: Promise<Record<string, string>> }
    ) {
      const params = await context.params;
      const itemId = params[paramItemKey];

      const body = await req.json();
      const validation = updateSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(validation.error.flatten(), {
          status: 400,
        });
      }

      try {
        const updated = await baseDb.update({
          where: { id: itemId },
          data: validation.data as Record<string, unknown>,
        });

        return NextResponse.json(updated);
      } catch (err) {
        return NextResponse.json(
          { error: `Failed to update ${entityName}`, details: String(err) },
          { status: 500 }
        );
      }
    },

    // DELETE
    async DELETE(
      _req: NextRequest,
      context: { params: Promise<Record<string, string>> }
    ) {
      const params = await context.params;
      const playerCharacterId = params[paramIdKey];
      const itemId = params[paramItemKey];

      try {
        await assignmentDb.delete({
          where: {
            [compositeKey]: {
              playerCharacterId,
              [paramItemKey]: itemId,
            },
          },
        });

        return NextResponse.json({ message: `${entityName} removed` });
      } catch (err) {
        return NextResponse.json(
          { error: `Failed to remove ${entityName}`, details: String(err) },
          { status: 500 }
        );
      }
    },
  };
}