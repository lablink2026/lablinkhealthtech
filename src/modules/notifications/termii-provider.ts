import { NotificationProvider, NotificationPayload } from './provider';

export class TermiiSMSProvider implements NotificationProvider {
  name = 'termii';
  private apiKey: string;
  private senderId: string;

  constructor(apiKey?: string, senderId?: string) {
    this.apiKey = apiKey || process.env.TERMII_API_KEY || '';
    this.senderId = senderId || process.env.TERMII_SENDER_ID || 'Lablink';
  }

  async send(payload: NotificationPayload): Promise<{ success: boolean; messageId: string }> {
    if (!payload.recipient.phone) {
      return { success: false, messageId: 'missing_phone' };
    }

    // Normalize Nigerian phone number to 234...
    let phone = payload.recipient.phone.replace(/\D/g, '');
    if (phone.startsWith('0')) {
      phone = '234' + phone.substring(1);
    } else if (phone.startsWith('+234')) {
      phone = phone.substring(1);
    }

    try {
      const res = await fetch('https://api.ng.termii.com/api/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phone,
          from: this.senderId,
          sms: payload.message,
          type: 'plain',
          channel: 'generic',
          api_key: this.apiKey
        })
      });
      const data = await res.json();
      return {
        success: res.ok,
        messageId: data.message_id || 'termii_sent'
      };
    } catch {
      return { success: false, messageId: 'termii_error' };
    }
  }
}
