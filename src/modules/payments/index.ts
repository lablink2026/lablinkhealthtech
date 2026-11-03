import { PaymentProvider } from './provider';
import { MockPaymentProvider } from './mock-provider';
import { PaystackProvider } from './paystack-provider';

export function getPaymentProvider(): PaymentProvider {
  if (process.env.PAYSTACK_SECRET_KEY && process.env.PAYSTACK_SECRET_KEY.startsWith('sk_live_')) {
    return new PaystackProvider();
  }
  return new MockPaymentProvider();
}

export * from './provider';
export * from './mock-provider';
export * from './paystack-provider';
