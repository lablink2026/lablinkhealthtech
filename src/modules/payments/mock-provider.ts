import { PaymentProvider, InitializePaymentParams, PaymentInitializationResult, PaymentVerificationResult } from './provider';

export class MockPaymentProvider implements PaymentProvider {
  name = 'mock';

  private payments = new Map<string, PaymentVerificationResult>();

  async initializePayment(params: InitializePaymentParams): Promise<PaymentInitializationResult> {
    const authUrl = `/checkout/mock-paystack?reference=${params.reference}&amount=${params.amountKobo}&bookingId=${params.bookingId}`;
    
    // Store simulated successful payment
    this.payments.set(params.reference, {
      success: true,
      reference: params.reference,
      amountKobo: params.amountKobo,
      currency: 'NGN',
      status: 'successful',
      channel: 'card',
      paidAt: new Date().toISOString()
    });

    return {
      authorizationUrl: authUrl,
      reference: params.reference,
      accessCode: `mock_code_${Date.now()}`
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    const existing = this.payments.get(reference);
    if (existing) {
      return existing;
    }
    // Default success for any mock reference starting with LL- or mock_
    return {
      success: true,
      reference,
      amountKobo: 500000,
      currency: 'NGN',
      status: 'successful',
      channel: 'bank_transfer',
      paidAt: new Date().toISOString()
    };
  }

  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    // In mock mode, signatures matching 'mock_valid_signature' or starting with 'sha512_' pass
    return signature === 'mock_valid_signature' || signature.startsWith('mock_');
  }
}
