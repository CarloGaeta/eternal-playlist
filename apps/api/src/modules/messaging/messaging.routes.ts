import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type { InboundWebhookRequest } from './messaging.types.js';
import type { MessagingService } from './messaging.service.js';

interface MessagingRoutesOptions {
  messagingService: MessagingService;
}

export async function messagingRoutes(
  fastify: FastifyInstance,
  options: MessagingRoutesOptions
): Promise<void> {
  const { messagingService } = options;

  fastify.post('/webhooks/messaging', async (request: FastifyRequest, reply: FastifyReply) => {
    const webhookRequest: InboundWebhookRequest = {
      headers: request.headers as Record<string, string | undefined>,
      body: request.body,
      rawBody: (request as FastifyRequest & { rawBody?: string }).rawBody,
    };

    const message = await messagingService.handleInboundWebhook(webhookRequest);

    if (!message) {
      return reply.status(400).send({ error: 'Invalid message' });
    }

    // For now, just acknowledge receipt and log
    // Later: this is where we'll route to sign-up flow, response handling, etc.
    console.log(`[Webhook] Received message from ${message.from}: "${message.body}"`);

    return reply.status(200).send({ received: true });
  });
}
