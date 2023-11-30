import { textProcessor } from "../core/textProcessor";

export const BasicTxtProcessor: textProcessor = {
  process: (str) => {
    const r = {
      numWords: 0,
      numLetters: 0,
      numSpaces: 0,
      topWords: [] as string[],
    };
    const tokens: { [key: string]: number } = {};
    const arr = str.split(/\s/);
    arr.forEach((word) => {
      if (!tokens[word]) {
        tokens[word] = 0;
      }
      tokens[word] += 1;
      if (tokens[word] == 5) {
        r.topWords.push(word);
      }
    });
    r.numWords = arr.length;

    Object.entries(tokens).forEach(([word, val]) => {
      r.numLetters += word.split("").length * val;
    });
    r.numSpaces = str.length - r.numLetters;
    return r;
  },
};
