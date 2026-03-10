#!/usr/bin/env node
/**
 * Root entry point for Hostinger deployment.
 * Starts the server immediately; runs db-setup in background so Hostinger sees the app up quickly.
 */
require("dotenv/config");
const { execSync, spawn } = require("child_process");
const path = require("path");

// Diagnosable crashes: log before exit
process.on("uncaughtException", (err) => {
  console.error("[server] uncaughtException:", err.message || err);
  console.error(err.stack);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.error("[server] unhandledRejection:", reason);
  process.exit(1);
});

const root = path.resolve(__dirname);
process.chdir(root);

// 1. Quick diagnostic (non-blocking for deploy)
try {
  execSync("node scripts/startup-check.js", { stdio: "inherit" });
} catch (e) {
  console.warn("[server] startup-check failed:", e.message || e);
}

// 2. Run db-setup in background so it never blocks server startup
if (!process.env.SKIP_DB_SETUP) {
  const child = spawn("node", ["scripts/db-setup.js"], {
    stdio: "ignore",
    detached: true,
    cwd: root,
    env: { ...process.env },
  });
  child.unref();
  console.log("[server] db-setup running in background");
} else {
  console.log("[server] SKIP_DB_SETUP=1, skipping db-setup");
}

// 3. Start server immediately (this blocks until server exits)
execSync("node -r dotenv/config backend/dist/server.js", { stdio: "inherit" });
