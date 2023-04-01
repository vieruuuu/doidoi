import { z } from "zod";
import { User } from "./users";

export const Categories = [
  "litter",
  "parking",
  "lost-objects",
  "lost-pets",
  "thefts",
  "vandalism",
] as const;

export type Category = (typeof Categories)[number];

export const Report = z.object({
  id: z.string(),

  image: z.string(),

  user: User.optional(),
  anonymous: z.boolean(),

  title: z.string().min(5).max(30),
  description: z.string().min(30).max(250),

  category: z.enum(Categories),

  date: z.number().int().min(1),

  reacts: z.object({
    happy: z.number().int().min(0),
    neutral: z.number().int().min(0),
    sad: z.number().int().min(0),
  }),

  severity: z.number().int().min(0).max(10),

  spam: z.boolean(),

  solved: z.boolean(),
});

export type Report = z.infer<typeof Report>;
