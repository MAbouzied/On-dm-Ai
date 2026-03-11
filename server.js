#!/usr/bin/env node
/**
 * Root entry point for Hostinger deployment.
 * Starts the server immediately; runs db-setup in background so Hostinger sees the app up quickly.
 */
require("dotenv/config");
const { execSync, spawn, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

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

// 2. Pre-flight: run build if artifacts missing (Hostinger may skip npm run build)
const backendDist = path.join(root, "backend", "dist", "server.js");
if (!fs.existsSync(backendDist)) {
  console.log("[server] Build artifacts missing, running npm run build...");
  try {
    execSync("npm run build", { stdio: "inherit", cwd: root });
  } catch (e) {
    console.error("[server] Build failed:", e.message || e);
    process.exit(1);
  }
}

// 3. Run db-setup in background so it never blocks server startup
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

// 4. Start server (blocking until exit)
const result = spawnSync("node", ["-r", "dotenv/config", "backend/dist/server.js"], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
});
if (result.status !== 0) {
  console.error("[server] Backend exited with code:", result.status);
  process.exit(result.status || 1);
}
