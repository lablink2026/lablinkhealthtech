import { describe, it, expect } from 'vitest';
import {
  computeDocumentHash,
  signDocumentHash,
  verifyDocumentSignature,
  maskPatientName,
  generateVerificationToken
} from '../src/modules/results/crypto';
import { MockPaymentProvider } from '../src/modules/payments/mock-provider';
import { PaystackProvider } from '../src/modules/payments/paystack-provider';

describe('Ed25519 Result Digital Signatures & Security', () => {
  const samplePdfContent = 'LABLINK-DIAGNOSTIC-REPORT: PATIENT-FBS-RESULT-VERSION-1-VALUE-92MG-DL';
  const sampleHash = computeDocumentHash(samplePdfContent);

  it('computes consistent 64-character hex SHA-256 hash', () => {
    expect(sampleHash).toHaveLength(64);
    expect(computeDocumentHash(samplePdfContent)).toBe(sampleHash);
  });

  it('signs document hash with platform Ed25519 key and verifies successfully', () => {
    const { signatureHex, algorithm, keyId } = signDocumentHash(sampleHash);
    expect(algorithm).toBe('Ed25519');
    expect(keyId).toBe('lablink-root-2026');
    expect(signatureHex.length).toBeGreaterThan(64);

    const isValid = verifyDocumentSignature(sampleHash, signatureHex);
    expect(isValid).toBe(true);
  });

  it('TAMPER DETECTION: any modification of document or hash fails verification', () => {
    const { signatureHex } = signDocumentHash(sampleHash);
    
    // Tampered document content
    const tamperedContent = 'LABLINK-DIAGNOSTIC-REPORT: PATIENT-FBS-RESULT-VERSION-1-VALUE-999MG-DL';
    const tamperedHash = computeDocumentHash(tamperedContent);

    const isValid = verifyDocumentSignature(tamperedHash, signatureHex);
    expect(isValid).toBe(false);
  });

  it('generates cryptographically unguessable verification tokens', () => {
    const token1 = generateVerificationToken();
    const token2 = generateVerificationToken();
    expect(token1.startsWith('v1_')).toBe(true);
    expect(token1.length).toBeGreaterThan(20);
    expect(token1).not.toBe(token2);
  });

  it('masks patient identity for privacy on public QR verification pages', () => {
    expect(maskPatientName('Olumide Adeyemi')).toBe('O. A.');
    expect(maskPatientName('Amaka Chioma Eze')).toBe('A. C. E.');
    expect(maskPatientName('Babatunde')).toBe('B.');
  });
});

describe('Payments & Webhooks (Paystack & Mock)', () => {
  it('Mock payment provider initializes and verifies transaction', async () => {
    const mock = new MockPaymentProvider();
    const init = await mock.initializePayment({
      bookingId: 'book-123',
      reference: 'LL-TEST-REF-001',
      amountKobo: 450000,
      email: 'patient@example.com'
    });

    expect(init.authorizationUrl).toContain('LL-TEST-REF-001');
    expect(init.reference).toBe('LL-TEST-REF-001');

    const verify = await mock.verifyPayment(init.reference);
    expect(verify.success).toBe(true);
    expect(verify.status).toBe('successful');
    expect(verify.amountKobo).toBe(450000);
  });

  it('Paystack provider computes and verifies HMAC SHA-512 webhook signature', () => {
    const paystack = new PaystackProvider('sk_test_mock_secret_key_12345');
    const rawPayload = JSON.stringify({
      event: 'charge.success',
      data: { reference: 'LL-REF-999', amount: 500000, status: 'success' }
    });

    // Compute expected signature
    const crypto = require('crypto');
    const expectedSig = crypto
      .createHmac('sha512', 'sk_test_mock_secret_key_12345')
      .update(rawPayload)
      .digest('hex');

    const isValid = paystack.verifyWebhookSignature(rawPayload, expectedSig);
    expect(isValid).toBe(true);

    const isInvalid = paystack.verifyWebhookSignature(rawPayload, 'invalid_tampered_signature');
    expect(isInvalid).toBe(false);
  });
});
