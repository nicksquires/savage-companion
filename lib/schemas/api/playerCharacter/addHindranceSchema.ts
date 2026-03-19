import { z } from "zod";

export const addHindranceSchema = z.object({
  hindranceId: z.string().min(1, "Hindrance ID is required"),
});