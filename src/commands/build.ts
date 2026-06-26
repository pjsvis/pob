import { defineCommand } from "citty";
import { resolve } from "node:path";
import { build } from "../../build.ts";
import { BuildCoordinator } from "../agents/index.js";

// === Configuration ===
const CONTENT_DIR = resolve("./content");
const DIST_DIR = resolve("./dist");
const TEMPLATE_PATH = resolve("./src/templates/layout.html");

// === Watch Mode ===
async function watchSite() {
  console.log("👀 pob watch mode\n");
  
  const coordinator = new BuildCoordinator({
    contentDir: CONTENT_DIR,
    distDir: DIST_DIR,
    templatePath: TEMPLATE_PATH,
    watchDebounce: 300,
  });

  // Set up event logging
  coordinator.on(event => {
    switch (event.type) {
      case "started":
        console.log(`\n🎯 Watching ${event.files} files for changes...\n`);
        break;
      case "build-start":
        process.stdout.write(`  🔄 ${event.file}... `);
        break;
      case "build-complete":
        console.log(`✅ ${event.file} (${event.elapsed}ms, ${(event.size! / 1024).toFixed(1)}KB)`);
        break;
      case "build-error":
        console.log(`❌ ${event.file}\n   Error: ${event.error}`);
        break;
      case "file-removed":
        console.log(`  🗑️  Removed: ${event.path}`);
        break;
      case "stopped":
        console.log("\n👋 Watch mode stopped");
        break;
    }
  });

  // Handle Ctrl+C
  const shutdown = () => {
    coordinator.stop();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  // Start watching
  await coordinator.start();
}

export const buildCommand = defineCommand({
  meta: {
    name: "build",
    description: "Compile markdown to HTML with KaTeX rendering",
  },
  args: {
    clean: { type: "boolean", alias: "c", default: true, description: "Clear dist/ before building (use --no-clean to keep)" },
    watch: { type: "boolean", alias: "w", default: false, description: "Watch for changes" },
  },
  async run({ args }) {
    if (args.watch) {
      await watchSite();
    } else {
      await build({ clean: args.clean });
    }
  },
});
