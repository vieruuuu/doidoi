import { z } from "zod";

import { Email } from "./utils";

export const User = z.object({
  id: z.string(),
  email: Email,
});

export type User = z.infer<typeof User>;
