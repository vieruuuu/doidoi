import { z } from "zod";

import { Email, Phone } from "./utils";

export const UserTypes = ["citizen", "operator"] as const;

export type UserType = (typeof UserTypes)[number];

export const User = z.object({
  id: z.string(),
  email: Email,

  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: Phone,

  type: z.enum(UserTypes),
});

export type User = z.infer<typeof User>;
