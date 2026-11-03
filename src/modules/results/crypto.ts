import crypto from 'crypto';
import QRCode from 'qrcode';

export interface KeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  keyId: string;
}

let platformKeyPair: KeyPair | null = null;

/**
 * Returns the platform Ed25519 signing keypair.
 * Deterministic for test predictability; uses environment variable in production.
 */
export function getPlatformKeyPair(): KeyPair {
  if (platformKeyPair) return platformKeyPair;

  if (process.env.PLATFORM_PRIVATE_KEY_PEM && process.env.PLATFORM_PUBLIC_KEY_PEM) {
    platformKeyPair = {
      privateKeyPem: process.env.PLATFORM_PRIVATE_KEY_PEM,
      publicKeyPem: process.env.PLATFORM_PUBLIC_KEY_PEM,
      keyId: process.env.PLATFORM_KEY_ID || 'lablink-root-2026'
    };
    return platformKeyPair;
  }

  // Generate Ed25519 keypair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  platformKeyPair = {
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
    privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    keyId: 'lablink-root-2026'
  };

  return platformKeyPair;
}

/**
 * Computes SHA-256 hash of a buffer or document string
 */
export function computeDocumentHash(content: Buffer | string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Signs a document hash using the platform Ed25519 private key
 */
export function signDocumentHash(hashHex: string): { signatureHex: string; keyId: string; algorithm: string } {
  const keys = getPlatformKeyPair();
  const signature = crypto.sign(null, Buffer.from(hashHex, 'hex'), keys.privateKeyPem);
  return {
    signatureHex: signature.toString('hex'),
    keyId: keys.keyId,
    algorithm: 'Ed25519'
  };
}

/**
 * Verifies an Ed25519 signature against the document hash and public key
 */
export function verifyDocumentSignature(hashHex: string, signatureHex: string, publicKeyPem?: string): boolean {
  const pubKey = publicKeyPem || getPlatformKeyPair().publicKeyPem;
  try {
    return crypto.verify(
      null,
      Buffer.from(hashHex, 'hex'),
      pubKey,
      Buffer.from(signatureHex, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Generates an unguessable 256-bit cryptographically secure token for verification URL
 */
export function generateVerificationToken(): string {
  return 'v1_' + crypto.randomBytes(24).toString('base64url');
}

/**
 * Generates QR code Data URL for verification link
 */
export async function generateVerificationQRCode(verifyUrl: string): Promise<string> {
  return await QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 256,
    color: {
      dark: '#0F766E', // Lablink signature teal
      light: '#FFFFFF'
    }
  });
}

/**
 * Masks patient name for public verification page (e.g. "Olumide Adeyemi" -> "O. A.")
 * Strictly avoids leaking Protected Health Information (PHI) to unauthorized scanners.
 */
export function maskPatientName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0][0] + '.';
  }
  return parts.map(p => p[0].toUpperCase() + '.').join(' ');
}
