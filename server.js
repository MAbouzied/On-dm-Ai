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
execSync("node scripts/db-setup.js", { stdio: "inherit" });
execSync("node -r dotenv/config backend/dist/server.js", { stdio: "inherit" });
