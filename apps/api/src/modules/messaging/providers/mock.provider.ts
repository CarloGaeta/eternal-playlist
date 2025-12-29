import type {
  MessagingProvider,
  InboundMessage,
  SendResult,
  InboundWebhookRequest,
} from '../messaging.types.js';

interface SentMessage {
  to: string;
  body: string;
  sentAt: Date;
  messageId: string;
}

/**
 * Mock messaging provider for local development and testing.
 * Logs messages to console and stores them in memory for inspection.
 */
export class MockMessagingProvider implements MessagingProvider {
  private sentMessages: SentMessage[] = [];
  private messageCounter = 0;

  async sendMessage(to: string, body: string): Promise<SendResult> {
    const messageId = `mock_${++this.messageCounter}`;
    const message: SentMessage = {
      to,
      body,
      sentAt: new Date(),
      messageId,
    };

    this.sentMessages.push(message);

    console.log(`[MockMessaging] Message sent:`);
    console.log(`  To: ${to}`);
    console.log(`  Body: ${body}`);
    console.log(`  ID: ${messageId}`);

    return { success: true, messageId };
  }

  async parseInboundMessage(request: InboundWebhookRequest): Promise<InboundMessage | null> {
    const body = request.body as Record<string, unknown>;

    // Mock format: { from: "+123...", body: "message text" }
    if (typeof body?.from !== 'string' || typeof body?.body !== 'string') {
      console.log('[MockMessaging] Invalid inbound message format');
      return null;
    }

    const message: InboundMessage = {
      from: body.from,
      body: body.body,
      receivedAt: new Date(),
    };

    console.log(`[MockMessaging] Message received:`);
    console.log(`  From: ${message.from}`);
    console.log(`  Body: ${message.body}`);

    return message;
  }

  verifyWebhookSignature(_request: InboundWebhookRequest): boolean {
    // Mock provider skips signature validation
    return true;
  }

  // Test helpers

  getSentMessages(): SentMessage[] {
    return [...this.sentMessages];
  }

  getLastSentMessage(): SentMessage | undefined {
    return this.sentMessages[this.sentMessages.length - 1];
  }

  clearSentMessages(): void {
    this.sentMessages = [];
    this.messageCounter = 0;
  }
}
