// Admin authentication primitives. Two-step flow:
//   1. POST /api/admin/login  { password } → if bcrypt match, generate
//      a 6-digit code, store it in KV with 10-minute TTL keyed by a
//      fresh challenge ID, send the code to the admin email via Resend,
//      return { challengeId } to the client.
//   2. POST /api/admin/verify { challengeId, code } → if KV value
//      matches and not yet consumed, mint a JWT, set as HttpOnly cookie
//      `sia_admin`, return { ok: true }.
//
// JWT is signed with HS256 using ADMIN_JWT_SECRET. Session lasts 2 h.
// Rate limiting is applied at /api/admin/login to limit brute force.

import * as bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { kv } from "@vercel/kv";

const SESSION_COOKIE = "sia_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 2; // 2 hours
const CODE_TTL_SECONDS = 60 * 10; // 10 minutes
const RATE_LIMIT_WINDOW_SECONDS = 60 * 15; // 15 min
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_JWT_SECRET must be set and ≥32 chars");
  }
  return new TextEncoder().encode(secret);
}

function getPasswordHash(): string {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error("ADMIN_PASSWORD_HASH is not set");
  }
  return hash;
}

export async function checkPassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, getPasswordHash());
}

export async function rotatePassword(newPassword: string): Promise<string> {
  // Returns the new bcrypt hash. The caller is responsible for
  // persisting it (we send it by email so the user can update Vercel
  // env vars manually — we can't write env vars from runtime code).
  return bcrypt.hash(newPassword, 12);
}

function randomCode(): string {
  const buf = new Uint8Array(4);
  crypto.getRandomValues(buf);
  const n = (buf[0]! << 24) | (buf[1]! << 16) | (buf[2]! << 8) | buf[3]!;
  return String(Math.abs(n) % 1_000_000).padStart(6, "0");
}

function randomId(): string {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createChallenge(): Promise<{ challengeId: string; code: string }> {
  const challengeId = randomId();
  const code = randomCode();
  await kv.set(`admin:challenge:${challengeId}`, code, { ex: CODE_TTL_SECONDS });
  return { challengeId, code };
}

export async function consumeChallenge(challengeId: string, submittedCode: string): Promise<boolean> {
  const key = `admin:challenge:${challengeId}`;
  const stored = await kv.get<string>(key);
  if (!stored) return false;
  if (stored !== submittedCode) return false;
  await kv.del(key);
  return true;
}

export async function rateLimitOk(ip: string): Promise<boolean> {
  const key = `admin:ratelimit:${ip}`;
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, RATE_LIMIT_WINDOW_SECONDS);
  }
  return count <= RATE_LIMIT_MAX_ATTEMPTS;
}

export async function mintSession(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_TTL_SECONDS)
    .sign(getJwtSecret());
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getJwtSecret());
    return true;
  } catch {
    return false;
  }
}

export const SESSION_CONFIG = {
  cookieName: SESSION_COOKIE,
  ttlSeconds: SESSION_TTL_SECONDS,
} as const;
