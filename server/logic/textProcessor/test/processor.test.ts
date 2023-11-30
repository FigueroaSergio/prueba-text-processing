import { NaturalProcessor } from "../NaturalProcessor";
import { TextProcessor } from "../TextProcessor";
describe("Testing processor text", () => {
  const processor = new TextProcessor(NaturalProcessor);
  test("Basic statistics", () => {
    const r = processor.process("Hello   World🌎! How are you?");

    expect(r).toEqual({
      numWords: 8,
      numLetters: 23,
      numSpaces: 6,
      topWords: [],
    });
  });

  test("Correct top words", () => {
    const r = processor.process(
      "Hello World hello hello🌎! hello How hello hello are hello you hello hello hello hello?"
    );

    expect(r.topWords).toEqual([{ word: "hello", frequency: 11 }]);
  });
});
