#!/usr/bin/env bun
/**
 * pob — The Poverty of Biomechanics
 *
 * Minimalist SSG for math-heavy Markdown
 */

import { defineCommand, runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "pob",
    version: "0.1.0",
    description: "The Poverty of Biomechanics — Minimalist SSG for math-heavy Markdown",
  },
  subCommands: {
    build: () => import("./commands/build.js").then((m) => m.buildCommand),
    preview: () => import("./commands/preview.js").then((m) => m.previewCommand),
    tree: () => import("./commands/tree.js").then((m) => m.treeCommand),
    help: () => import("./commands/help.js").then((m) => m.helpCommand),
  },
});

runMain(main);