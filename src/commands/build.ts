import { defineCommand } from "citty";
import { build } from "../../build.ts";

export const buildCommand = defineCommand({
  meta: {
    name: "build",
    description: "Compile markdown to HTML with KaTeX rendering",
  },
  args: {
    clean: { type: "boolean", alias: "c", default: true, description: "Clear dist/ before building (use --no-clean to keep)" },
  },
  async run({ args }) {
    await build({ clean: args.clean });
  },
});
