import { z } from "zod";

import { Email } from "./utils";

export const UserTypes = ["citizen", "operator"] as const;

export type UserType = (typeof UserTypes)[number];

export const User = z.object({
  id: z.string(),
  email: Email,

  firstName: z.string().min(1),
  lastName: z.string().min(1),

  type: z.enum(UserTypes),
});

export type User = z.infer<typeof User>;
