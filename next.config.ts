import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Set to true to roll out CSP changes as report-only (violations are logged in the
// browser console instead of blocked) before enforcing them.
const CSP_REPORT_ONLY = true;

// Nonce-free CSP so pages stay statically rendered. 'unsafe-inline' is needed for the
// inline scripts Next.js and next-themes inject; 'unsafe-eval' only in dev for React.
const TURNSTILE = "https://challenges.cloudflare.com";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE}${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  `frame-src ${TURNSTILE}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: CSP_REPORT_ONLY ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // Keep the private analytics console out of search results without advertising it in robots.txt
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
