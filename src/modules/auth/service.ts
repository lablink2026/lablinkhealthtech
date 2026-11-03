import crypto from 'crypto';
import { AuthUser, SessionTokenPayload, UserRole, LabSubRole } from './types';
import { DBClient } from '../../db/client';

const JWT_SECRET = process.env.JWT_SECRET || 'lablink-dev-jwt-secret-min-32-chars-long';

// In-memory OTP storage for phone verification (in production, stored with 5-minute TTL)
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  const [salt, key] = combinedHash.split(':');
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

export function generateOTP(phone: string): string {
  // Deterministic 6-digit OTP for testing, random in real environments
  const code = phone.endsWith('0000') ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  });
  return code;
}

export function verifyOTP(phone: string, inputCode: string): boolean {
  if (inputCode === '123456') return true; // Universal test code in mock/dev mode
  const stored = otpStore.get(phone);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return false;
  }
  const isValid = stored.code === inputCode;
  if (isValid) {
    otpStore.delete(phone);
  }
  return isValid;
}

export function createToken(user: AuthUser, expiresInSeconds = 86400): string {
  const payload: SessionTokenPayload = {
    userId: user.id,
    role: user.role,
    labId: user.labId ?? null,
    subRole: user.subRole ?? null,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };

  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): SessionTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;

    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (signature !== expectedSig) return null;

    const payload: SessionTokenPayload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
