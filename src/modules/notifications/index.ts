import { NotificationProvider } from './provider';
import { ConsoleNotificationProvider } from './mock-provider';
import { TermiiSMSProvider } from './termii-provider';

const mockNotificationProvider = new ConsoleNotificationProvider();

export function getNotificationProvider(): NotificationProvider {
  if (process.env.TERMII_API_KEY && !process.env.TERMII_API_KEY.includes('mock')) {
    return new TermiiSMSProvider();
  }
  return mockNotificationProvider;
}

export * from './provider';
export * from './mock-provider';
export * from './termii-provider';
