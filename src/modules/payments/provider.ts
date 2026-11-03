export interface InitializePaymentParams {
  bookingId: string;
  reference: string;
  amountKobo: number;
  email: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
}

export interface PaymentInitializationResult {
  authorizationUrl: string;
  reference: string;
  accessCode?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  reference: string;
  amountKobo: number;
  currency: string;
  status: 'successful' | 'failed' | 'pending';
  channel: string;
  paidAt?: string;
}

export interface PaymentProvider {
  name: string;
  initializePayment(params: InitializePaymentParams): Promise<PaymentInitializationResult>;
  verifyPayment(reference: string): Promise<PaymentVerificationResult>;
  verifyWebhookSignature(rawBody: string, signature: string): boolean;
}
