import isEmail from "validator/es/lib/isEmail";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";

export const Email = z.string().refine((val) => isEmail(val));

export const Phone = z.string().refine((val) => isMobilePhone(val));

export const Password = z.string().min(6);
