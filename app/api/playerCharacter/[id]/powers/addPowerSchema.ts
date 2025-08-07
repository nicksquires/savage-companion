import { z } from "zod";

export const addPowerSchema = z.object({
  powerId: z.string().min(1, "Power ID is required"),
});
