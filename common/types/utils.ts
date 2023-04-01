import { z } from "zod";

import isEmail from "validator/es/lib/isEmail";

export const Email = z.string().refine((val) => isEmail(val));

export const Password = z.string().min(6);
