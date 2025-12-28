import Fastify from 'fastify';
import { MessagingService, MockMessagingProvider, messagingRoutes } from './modules/messaging/index.js';

const app = Fastify({ logger: true });

// Initialize providers and services
const messagingProvider = new MockMessagingProvider();
const messagingService = new MessagingService(messagingProvider);

app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register module routes
app.register(messagingRoutes, { messagingService });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🎵 The Eternal Playlist API is running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
