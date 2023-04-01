import { z } from "zod";

export const Categories = [
  "litter",
  "parking",
  "lost-objects",
  "lost-pets",
  "thieves",
] as const;

export type Category = (typeof Categories)[number];

export const Report = z.object({
  id: z.string(),

  title: z.string().min(5).max(30),
  description: z.string().min(30).max(250),

  category: z.enum(Categories),

  date: z.number().int().min(1),
});
