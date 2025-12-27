# The Eternal Playlist

A phenomenological well-being tracker based on Thomas Metzinger's "eternal playlist" thought experiment.

## What is this?

Through random prompts delivered via WhatsApp, users answer a simple question: "Would you save this moment to replay forever?" The binary YES/NO responses, collected over time, reveal patterns in lived experience quality.

## Tech Stack

- **Runtime:** Node.js 22
- **Language:** TypeScript
- **Framework:** Fastify
- **Database:** PostgreSQL (via Prisma)
- **WhatsApp:** Twilio API
- **Monorepo:** pnpm workspaces

## Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Project Structure
```
eternal-playlist/
├── apps/
│   └── api/          # Fastify backend
├── packages/
│   └── shared/       # Shared types and utilities
└── ...
```

## License

MIT
