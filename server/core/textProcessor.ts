import { z } from "zod";
export const Vtoken = z.object({
  word: z.string(),
  frequency: z.number(),
});
export type token = z.infer<typeof Vtoken>;

export const VtextStatistics = z.object({
  numWords: z.number().min(0).default(0),
  numLetters: z.number().min(0).default(0),
  numSpaces: z.number().min(0).default(0),
  topWords: Vtoken.array().default([]),
});
export type textStatistics = z.infer<typeof VtextStatistics>;

export interface textProcessor {
  process: (str: string) => textStatistics;
}
