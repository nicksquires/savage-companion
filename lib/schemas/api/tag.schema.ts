import { z } from "zod";

// Base edge schema
export const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

// For updates (allow partials)
export const tagUpdateSchema = tagSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);