import { z } from "zod";

export const UserValidation = z.object({
  email: z.email("Valid email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
});



