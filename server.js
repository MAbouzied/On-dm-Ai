#!/usr/bin/env node
/**
 * Root entry point for Hostinger deployment detection.
 * Runs db-push then starts the combined Express + Next.js server.
 */
require("dotenv/config");
const { execSync } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname);
process.chdir(root);

// Diagnostic log for Hostinger troubleshooting
execSync("node scripts/startup-check.js", { stdio: "inherit" });
if (!process.env.SKIP_DB_SETUP) {
  try {
    execSync("node scripts/db-setup.js", { stdio: "inherit" });
  } catch (e) {
    console.warn("[server] DB setup failed, starting anyway:", e.message || e);
    console.warn("[server] Check env vars. See HOSTINGER-503-FIX.md");
  }
} else {
  console.log("[server] SKIP_DB_SETUP=1, skipping db-setup");
}
execSync("node -r dotenv/config backend/dist/server.js", { stdio: "inherit" });
