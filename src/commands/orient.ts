// orient.ts – bootstrap a freshly‑cloned agent for this repository
// This command performs the minimal steps required for a new agent to
// understand the repo layout, have its dependencies installed, and be
// discoverable via the local pi‑intercom bus.

import { defineCommand } from "citty";
import { execSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export const orientCommand = defineCommand({
  meta: {
    name: "orient",
    description: "Initialize a new agent in this repository – install deps, set env, register with intercom.",
  },
  args: {
    name: { type: "string", description: "Agent name (optional – a random one will be generated)", default: "" },
  },
  async run({ args }) {
    const repoRoot = resolve(".");
    const agentName = args.name || `agent-${Math.random().toString(36).slice(2, 8)}`;

    console.log(`📂 Repository root: ${repoRoot}`);
    console.log(`🤖 Initialising agent: ${agentName}`);

    // 1️⃣ Verify required tools are present
    const requiredTools = ["bun", "git"];
    for (const tool of requiredTools) {
      try {
        execSync(`${tool} --version`, { stdio: "ignore" });
      } catch {
        console.error(`❌ Required tool "${tool}" not found. Please install it before orienting.`);
        process.exit(1);
      }
    }

    // 2️⃣ Install node‑module dependencies (bun will respect package.json)
    console.log("🔧 Installing dependencies …");
    try {
      execSync("bun install", { stdio: "inherit" });
    } catch (e) {
      console.error("❌ Dependency installation failed.");
      process.exit(1);
    }

    // 3️⃣ Create a minimal .env file if it does not already exist
    const envPath = resolve(repoRoot, ".env");
    if (!existsSync(envPath)) {
      const envContent = `AGENT_NAME=${agentName}\nREPO_ROOT=${repoRoot}\n`;
      writeFileSync(envPath, envContent);
      console.log(`🗒️ Created .env at ${envPath}`);
    } else {
      console.log("🗒️ .env already exists – leaving untouched.");
    }

    // 4️⃣ Register the agent with the local pi‑intercom bus (fire‑and‑forget)
    // We invoke the `intercom` CLI if it is available.
    try {
      execSync(`intercom --action send --to registry --message "agent‑joined ${agentName}"`, { stdio: "inherit" });
      console.log("📡 Sent registration to intercom.");
    } catch {
      console.warn("⚠️ intercom CLI not available – registration skipped.");
    }

    // 5️⃣ Quick sanity check – list the repo tree using the existing just command
    console.log("✅ Orientation complete – running a quick sanity check (just tree)…");
    try {
      execSync("just tree", { stdio: "inherit" });
    } catch {
      console.warn("⚠️ `just tree` failed – you may need to install the `just` tool globally.");
    }
  },
});
