import { z } from "zod";

// Schema for adding single edge
export const addEdgeSchema = z.object({
  edgeId: z.string().min(1, "Edge ID is required"),
});