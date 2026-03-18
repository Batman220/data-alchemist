/**
 * Data Alchemist — Tracker Proxy Worker
 *
 * Sits between the frontend and Google Apps Script.
 * The real Google Script URL is stored as a Worker secret (GOOGLE_SCRIPT_URL)
 * and is never exposed in source code.
 *
 * Deploy:
 *   cd cloudflare
 *   npx wrangler secret put GOOGLE_SCRIPT_URL   ← paste the real URL when prompted
 *   npx wrangler deploy
 */

const ALLOWED_ORIGINS = [
  "https://rajamdm.github.io",
  "http://localhost",
  "http://127.0.0.1",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.some((o) => origin && origin.startsWith(o));
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://rajamdm.github.io",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // Block requests from unknown origins (skip check for direct/server calls with no Origin)
    const isKnownOrigin = ALLOWED_ORIGINS.some((o) => origin.startsWith(o));
    if (origin && !isKnownOrigin) {
      return new Response("Forbidden", { status: 403, headers });
    }

    const targetBase = env.GOOGLE_SCRIPT_URL;
    if (!targetBase) {
      return new Response("Worker not configured — set GOOGLE_SCRIPT_URL secret", {
        status: 500,
        headers,
      });
    }

    try {
      const url = new URL(request.url);
      // Preserve query params (used for getSession action)
      const targetUrl = targetBase + (url.search || "");

      const proxyReq = new Request(targetUrl, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
        body: request.method === "POST" ? request.body : undefined,
        redirect: "follow",
      });

      const resp = await fetch(proxyReq);
      const body = await resp.text();

      return new Response(body, {
        status: resp.status,
        headers: {
          ...headers,
          "Content-Type": resp.headers.get("Content-Type") || "application/json",
          "Cache-Control": "no-store",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 502,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
};
