import { z } from "zod";

import isEmail from "validator/es/lib/isEmail";

export const User = z.object({
  id: z.string(),
  email: z.string().refine((val) => isEmail(val)),
});

export type User = z.infer<typeof User>;
