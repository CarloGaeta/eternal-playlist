// Messaging Domain Types
// Provider-agnostic abstractions for WhatsApp messaging

export interface InboundMessage {
  from: string; // Phone number (E.164 format, e.g., "+393331234567")
  body: string; // Message text
  receivedAt: Date;
}

export interface SendResult {
  success: boolean;
  messageId?: string; // Provider's message ID for tracking
  error?: string;
}

export interface MessagingProvider {
  /**
   * Send a WhatsApp message
   */
  sendMessage(to: string, body: string): Promise<SendResult>;

  /**
   * Parse an inbound webhook request into a domain message
   * Returns null if the request is invalid or verification fails
   */
  parseInboundMessage(request: InboundWebhookRequest): Promise<InboundMessage | null>;

  /**
   * Verify webhook request signature (for security)
   * Returns true if valid, false otherwise
   */
  verifyWebhookSignature(request: InboundWebhookRequest): boolean;
}

export interface InboundWebhookRequest {
  headers: Record<string, string | undefined>;
  body: unknown;
  rawBody?: string; // Some providers need raw body for signature verification
}
