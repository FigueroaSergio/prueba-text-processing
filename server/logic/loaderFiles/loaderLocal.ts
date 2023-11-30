import { loadTxtFile } from "../../core/loadTxtFile";
import fs from "node:fs";
import path from "node:path";
export const LoaderLocal: loadTxtFile = {
  load: async (str: string) => {
    let data: string = "";

    try {
      const pt = path.join(str);
      data = fs.readFileSync(pt, "utf8");
    } catch (error) {
      console.log("Error", error);
    }

    return data;
  },
};
