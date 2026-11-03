import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '../../../../modules/payments';
import { getNotificationProvider } from '../../../../modules/notifications';

// In-memory idempotency cache (or DB table payments.idempotency_key)
const processedReferences = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature') || '';

    const paymentProvider = getPaymentProvider();
    const isValid = paymentProvider.verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const data = payload.data || {};
    const reference = data.reference;

    if (!reference) {
      return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 });
    }

    // Idempotency check: Ignore duplicate replay events
    if (processedReferences.has(reference)) {
      return NextResponse.json({ message: 'Event already processed', reference }, { status: 200 });
    }

    if (event === 'charge.success') {
      processedReferences.add(reference);

      // Trigger booking confirmation notification
      const notificationProvider = getNotificationProvider();
      await notificationProvider.send({
        recipient: {
          name: data.customer?.first_name || 'Patient',
          email: data.customer?.email,
          phone: data.customer?.phone
        },
        event: 'booking_confirmed',
        title: 'Lablink Booking Confirmed',
        message: `Your booking ${reference} has been confirmed. Payment of ₦${(data.amount / 100).toLocaleString()} received successfully.`,
        channels: ['sms', 'email']
      });

      return NextResponse.json({ status: 'success', reference }, { status: 200 });
    }

    return NextResponse.json({ status: 'ignored_event', event }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
