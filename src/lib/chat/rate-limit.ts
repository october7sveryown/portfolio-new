import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT) || 500;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const perIp = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 m"),
      prefix: "chat:ip",
    })
  : null;

const global = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(DAILY_LIMIT, "1 d"),
      prefix: "chat:global",
    })
  : null;

if (!redis && process.env.NODE_ENV === "production") {
  console.warn("Chat rate limiting is off: UPSTASH_REDIS_REST_URL/TOKEN are not set.");
}

export type LimitResult = { ok: true } | { ok: false; message: string };

export async function checkRateLimit(ip: string): Promise<LimitResult> {
  if (!perIp || !global) return { ok: true };

  const ipResult = await perIp.limit(ip);
  if (!ipResult.success) {
    return {
      ok: false,
      message: "You've sent a lot of messages. Please wait a few minutes and try again.",
    };
  }

  const globalResult = await global.limit("all");
  if (!globalResult.success) {
    return {
      ok: false,
      message: "The chat has reached its daily limit. Please come back tomorrow.",
    };
  }

  return { ok: true };
}

export function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
