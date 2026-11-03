import crypto from 'crypto';
import { PaymentProvider, InitializePaymentParams, PaymentInitializationResult, PaymentVerificationResult } from './provider';

export class PaystackProvider implements PaymentProvider {
  name = 'paystack';
  private secretKey: string;

  constructor(secretKey?: string) {
    this.secretKey = secretKey || process.env.PAYSTACK_SECRET_KEY || '';
  }

  async initializePayment(params: InitializePaymentParams): Promise<PaymentInitializationResult> {
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: params.email,
        amount: params.amountKobo,
        reference: params.reference,
        callback_url: params.callbackUrl,
        metadata: params.metadata
      })
    });

    const data = await res.json();
    if (!data.status) {
      throw new Error(`Paystack initialization failed: ${data.message}`);
    }

    return {
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      accessCode: data.data.access_code
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.secretKey}`
      }
    });

    const data = await res.json();
    if (!data.status) {
      return {
        success: false,
        reference,
        amountKobo: 0,
        currency: 'NGN',
        status: 'failed',
        channel: 'unknown'
      };
    }

    return {
      success: data.data.status === 'success',
      reference: data.data.reference,
      amountKobo: data.data.amount,
      currency: data.data.currency,
      status: data.data.status === 'success' ? 'successful' : 'failed',
      channel: data.data.channel,
      paidAt: data.data.paid_at
    };
  }

  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(rawBody)
      .digest('hex');
    return hash === signature;
  }
}
