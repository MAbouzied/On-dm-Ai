#!/usr/bin/env node
/**
 * Startup diagnostic - logs env and paths for Hostinger troubleshooting.
 * Run before server start to capture deployment state.
 */
require("dotenv/config");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const log = [];

function add(msg) {
  log.push(msg);
  console.log(msg);
}

add("[startup-check] === ON-DM Deployment Diagnostic ===");
add("[startup-check] Node: " + process.version);
add("[startup-check] CWD: " + process.cwd());
add("[startup-check] NODE_ENV: " + (process.env.NODE_ENV || "(not set)"));
add("[startup-check] PORT: " + (process.env.PORT || "(not set)"));

// DB (mask password)
const dbHost = process.env.MYSQL_HOST || process.env.DB_HOST || process.env.DATABASE_URL?.match(/@([^:]+):/)?.[1] || "(not set)";
const dbPort = process.env.MYSQL_PORT || process.env.DB_PORT || "3306";
add("[startup-check] DB_HOST: " + dbHost);
add("[startup-check] DB_PORT: " + dbPort);
add("[startup-check] DB_NAME: " + (process.env.MYSQL_DATABASE || process.env.DB_NAME || "(not set)"));

// Paths
const backendDist = path.join(root, "backend", "dist", "server.js");
const frontendNext = path.join(root, "frontend", ".next");
add("[startup-check] backend/dist/server.js exists: " + fs.existsSync(backendDist));
add("[startup-check] frontend/.next exists: " + fs.existsSync(frontendNext));

add("[startup-check] === End diagnostic ===");
