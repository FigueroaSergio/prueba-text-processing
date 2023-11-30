import { textProcessor } from "../core/textProcessor";
import { BasicTxtProcessor } from "./BasicProcessor";

export class TextProcessor implements textProcessor {
  private processor = BasicTxtProcessor;
  constructor(processor?: TextProcessor) {
    if (processor) this.processor = processor;
  }
  process(str: string) {
    return this.processor.process(str);
  }
}
