import { textProcessor, token } from "../../core/textProcessor";
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
import { z } from "zod";
export const NaturalProcessor: textProcessor = {
  process: (str: string) => {
    const nlp = winkNLP(model);
    const its = nlp.its;
    const as = nlp.as;

    const r = {
      numWords: 0,
      numLetters: 0,
      numSpaces: 0,
      topWords: [] as token[],
    };
    var doc = nlp.readDoc(str);
    let tokens = doc.tokens().out(its.normal, as.freqTable);
    tokens.forEach(([key, val]) => {
      const p = z.string().safeParse(key);
      const word = p.success ? p.data : String(key);
      const frequency = Number(val);
      r.numLetters += word.length * frequency;
      if (frequency >= 10) {
        r.topWords.push({ word, frequency });
      }
    });
    r.numWords = tokens.length;
    r.numSpaces = str.length - r.numLetters;
    return r;
  },
};
