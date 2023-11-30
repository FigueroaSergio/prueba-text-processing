import { z } from "zod";
export const VtextStatistics = z.object({
  numWords: z.number().min(0).default(0),
  numLetters: z.number().min(0).default(0),
  numSpaces: z.number().min(0).default(0),
  topWords: z.string().array().default([]),
});
export type textStatistics = z.infer<typeof VtextStatistics>;

export interface textProcessor {
  process: (str: string) => textStatistics;
}
