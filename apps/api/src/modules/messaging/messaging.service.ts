import type {
  MessagingProvider,
  InboundMessage,
  SendResult,
  InboundWebhookRequest,
} from './messaging.types.js';

/**
 * Messaging domain service.
 * Handles message sending/receiving through the configured provider.
 */
export class MessagingService {
  constructor(private readonly provider: MessagingProvider) {}

  async sendMessage(to: string, body: string): Promise<SendResult> {
    return this.provider.sendMessage(to, body);
  }

  async handleInboundWebhook(request: InboundWebhookRequest): Promise<InboundMessage | null> {
    if (!this.provider.verifyWebhookSignature(request)) {
      console.log('[MessagingService] Webhook signature verification failed');
      return null;
    }

    return this.provider.parseInboundMessage(request);
  }
}
