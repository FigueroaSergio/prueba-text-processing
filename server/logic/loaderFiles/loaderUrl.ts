import { z } from "zod";
import { loadTxtFile } from "../../core/loadTxtFile";
import axios from "axios";
export const LoaderUrl: loadTxtFile = {
  load: async (str) => {
    const r = await axios.get(str);
    const data = z.string().safeParse(r.data).success
      ? r.data
      : JSON.stringify(r.data);
    return data;
  },
};
