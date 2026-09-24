import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

type Duration = `${number} ${'s' | 'm' | 'h'}`;

interface LimitConfig {
  limit: number;
  window: Duration;
  message: string;
}

// Per-IP limits for each public API route
const LIMITS = {
  contact: { limit: 5, window: '10 m', message: 'Too many messages sent. Please wait a few minutes and try again.' },
  chat: { limit: 20, window: '10 m', message: "You've reached the chat limit. Please wait a few minutes before asking more questions." },
  analytics: { limit: 60, window: '1 m', message: 'Too many analytics events.' }
} satisfies Record<string, LimitConfig>;

type LimitName = keyof typeof LIMITS;

interface LimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // epoch ms
}

const toMs = (window: Duration) => {
  const [value, unit] = window.split(' ');
  return Number(value) * { s: 1000, m: 60_000, h: 3_600_000 }[unit as 's' | 'm' | 'h'];
};

// Upstash Redis is used when configured (UPSTASH_REDIS_REST_* or Vercel's KV_REST_API_*),
// so limits are shared across serverless instances. Otherwise fall back to a per-instance
// in-memory fixed window, which is good enough for low traffic and local development.
const hasRedis = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
  (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)
);

const upstashLimiters = new Map<LimitName, Ratelimit>();

function getUpstashLimiter(name: LimitName) {
  let limiter = upstashLimiters.get(name);
  if (!limiter) {
    const { limit, window } = LIMITS[name];
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, window),
      prefix: `portfolio-ratelimit:${name}`
    });
    upstashLimiters.set(name, limiter);
  }
  return limiter;
}

const memoryBuckets = new Map<string, { count: number; reset: number }>();

function memoryLimit(name: LimitName, ip: string): LimitResult {
  const { limit, window } = LIMITS[name];
  const now = Date.now();
  const key = `${name}:${ip}`;

  // Opportunistically evict expired buckets so the map can't grow unbounded
  if (memoryBuckets.size > 5000) {
    for (const [k, bucket] of memoryBuckets) {
      if (bucket.reset <= now) memoryBuckets.delete(k);
    }
  }

  let bucket = memoryBuckets.get(key);
  if (!bucket || bucket.reset <= now) {
    bucket = { count: 0, reset: now + toMs(window) };
    memoryBuckets.set(key, bucket);
  }
  bucket.count++;

  return {
    success: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    reset: bucket.reset
  };
}

export function getClientIp(req: Request) {
  // On Vercel, x-forwarded-for is set by the platform and can't be spoofed by the client
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Applies the named per-IP rate limit. Returns a 429 response when the limit is hit,
 * or null when the request may proceed.
 */
export async function rateLimit(name: LimitName, req: Request): Promise<NextResponse | null> {
  const ip = getClientIp(req);

  let result: LimitResult;
  if (hasRedis) {
    try {
      result = await getUpstashLimiter(name).limit(ip);
    } catch (err) {
      // Don't take the site down if Redis is unreachable; degrade to in-memory limiting
      console.error('Upstash rate limit failed, using in-memory fallback:', err);
      result = memoryLimit(name, ip);
    }
  } else {
    result = memoryLimit(name, ip);
  }

  if (result.success) return null;

  const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
  return NextResponse.json(
    { error: LIMITS[name].message },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000))
      }
    }
  );
}
