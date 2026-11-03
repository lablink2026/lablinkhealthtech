export interface NotificationRecipient {
  userId?: string;
  name: string;
  phone?: string | null;
  email?: string | null;
}

export type NotificationChannel = 'sms' | 'whatsapp' | 'email' | 'in_app';

export interface NotificationPayload {
  recipient: NotificationRecipient;
  event: 'booking_confirmed' | 'collector_assigned' | 'sample_collected' | 'sample_received' | 'results_ready' | 'payment_received';
  title: string;
  message: string;
  channels: NotificationChannel[];
  metadata?: Record<string, any>;
}

export interface NotificationProvider {
  name: string;
  send(payload: NotificationPayload): Promise<{ success: boolean; messageId: string }>;
}
