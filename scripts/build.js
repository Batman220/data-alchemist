#!/usr/bin/env node
/**
 * Data Alchemist — Obfuscated Build
 *
 * Produces dist/index.html with:
 *   1. JSX pre-compiled (babel-standalone removed, no browser compilation)
 *   2. JS obfuscated (identifier renaming, string encoding, self-defending)
 *   3. Security headers added as meta tags
 *
 * Usage:
 *   npm run build
 *   npm run build -- --no-obfuscate   (compile only, skip obfuscation — faster for testing)
 */

const fs   = require("fs");
const path = require("path");
const babel = require("@babel/core");
const JavaScriptObfuscator = require("javascript-obfuscator");

const ROOT     = path.join(__dirname, "..");
const SRC      = path.join(ROOT, "index.html");
const DIST_DIR = path.join(ROOT, "dist");
const DIST     = path.join(DIST_DIR, "index.html");

const noObfuscate = process.argv.includes("--no-obfuscate");

// ── 1. Read source ─────────────────────────────────────────────────────────
let html = fs.readFileSync(SRC, "utf8");

// ── 2. Extract the babel script block ─────────────────────────────────────
const babelBlockRx = /<script\s+type="text\/babel">([\s\S]*?)<\/script>/;
const match = html.match(babelBlockRx);
if (!match) { console.error("❌  No <script type=\"text/babel\"> found."); process.exit(1); }
const jsxSource = match[1];

// ── 3. Compile JSX → plain JS ──────────────────────────────────────────────
console.log("⚙️   Compiling JSX…");
const { code: compiled } = babel.transformSync(jsxSource, {
  filename: "app.jsx",
  presets: [
    ["@babel/preset-react", { runtime: "classic" }],
    ["@babel/preset-env",   { targets: "defaults", modules: false, bugfixes: true }],
  ],
  comments: false,
});

// ── 4. Obfuscate ────────────────────────────────────────────────────────────
let finalJs = compiled;
if (!noObfuscate) {
  console.log("🔒  Obfuscating…");
  finalJs = JavaScriptObfuscator.obfuscate(compiled, {
    compact: true,
    controlFlowFlattening: false,   // keep false — reduces breakage risk
    deadCodeInjection: false,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: false,
    identifierNamesGenerator: "hexadecimal",
    renameGlobals: false,           // keep false — globals like React must stay
    selfDefending: true,
    simplify: true,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ["base64"],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayThreshold: 0.75,
    transformObjectKeys: false,
    unicodeEscapeSequence: false,
  }).getObfuscatedCode();
} else {
  console.log("⚠️   Skipping obfuscation (--no-obfuscate)");
}

// ── 5. Patch HTML ────────────────────────────────────────────────────────────
// Remove babel-standalone (no longer needed)
html = html.replace(
  /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/babel-standalone[^"]*"[^>]*><\/script>\n?/,
  ""
);

// Replace babel script block with compiled output
html = html.replace(babelBlockRx, `<script>\n${finalJs}\n</script>`);

// Add security meta tags after <head>
const securityMeta = `
  <meta http-equiv="X-Content-Type-Options" content="nosniff"/>
  <meta http-equiv="X-Frame-Options" content="DENY"/>
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin"/>`;
html = html.replace("<head>", `<head>${securityMeta}`);

// ── 6. Write output ───────────────────────────────────────────────────────────
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(DIST, html, "utf8");

const srcSize  = Buffer.byteLength(fs.readFileSync(SRC), "utf8");
const distSize = Buffer.byteLength(fs.readFileSync(DIST), "utf8");
console.log(`\n✅  Built dist/index.html`);
console.log(`    Source : ${(srcSize  / 1024).toFixed(1)} KB`);
console.log(`    Output : ${(distSize / 1024).toFixed(1)} KB`);
console.log(`\n📋  Next: deploy dist/index.html to GitHub Pages (or gh-pages branch)`);
