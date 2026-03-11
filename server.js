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

// 1. Quick diagnostic (ignore exit code - never block)
const checkResult = spawnSync("node", ["scripts/startup-check.js"], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
});
if (checkResult.status !== 0) {
  console.warn("[server] startup-check exited with", checkResult.status, "(continuing)");
}

// 2. Pre-flight: run build if artifacts missing (Hostinger may skip npm run build)
const backendDist = path.join(root, "backend", "dist", "server.js");
if (!fs.existsSync(backendDist)) {
  console.log("[server] Build artifacts missing, running npm run build...");
  try {
    const buildEnv = { ...process.env, NODE_OPTIONS: [process.env.NODE_OPTIONS, "--max-old-space-size=4096"].filter(Boolean).join(" ") };
    execSync("npm run build", {
      encoding: "utf8",
      stdio: ["inherit", "pipe", "pipe"],
      cwd: root,
      env: buildEnv,
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (e) {
    console.error("[server] Build failed:", e.message || e);
    if (e.stdout) console.error("[server] Build stdout:", e.stdout);
    if (e.stderr) console.error("[server] Build stderr:", e.stderr);
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
