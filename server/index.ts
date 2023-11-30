import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import cors from "cors";
import { loaderFactory } from "./logic/loaderFactory";
import { TextProcessor } from "./logic/TextProcessor";

const t = initTRPC.create({});

export const publicProcedure = t.procedure;

const appRouter = t.router({
  hello: publicProcedure.query(() => {
    return "hello";
  }),
  text: publicProcedure
    .input(z.object({ path: z.string() }))
    .query(async (opt) => {
      const data = await loaderFactory.load(opt.input.path);
      const result = new TextProcessor().process(data);
      return { input: data, result };
    }),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(3000);
