import { z } from "zod";
import { LoaderLocal } from "./loaderLocal";
import { loadTxtFile } from "../../core/loadTxtFile";
import { LoaderUrl } from "./loaderUrl";

export const loaderFactory: loadTxtFile = {
  load: async (str: string): Promise<string> => {
    const isUrl = z.string().url().safeParse(str);

    if (!isUrl.success) {
      return "";
    }
    if (isUrl.data.startsWith("http")) {
      return LoaderUrl.load(str);
    }
    return LoaderLocal.load(str);
  },
};
