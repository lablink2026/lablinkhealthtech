import { NotificationProvider, NotificationPayload } from './provider';

export class ConsoleNotificationProvider implements NotificationProvider {
  name = 'console-mock';
  public sentNotifications: NotificationPayload[] = [];

  async send(payload: NotificationPayload): Promise<{ success: boolean; messageId: string }> {
    const messageId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.sentNotifications.push(payload);
    
    console.log(`[NOTIFICATION ${payload.event.toUpperCase()}] -> ${payload.recipient.name} (${payload.recipient.phone || payload.recipient.email}): ${payload.message}`);
    
    return {
      success: true,
      messageId
    };
  }
}
