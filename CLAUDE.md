# The Eternal Playlist

## Project Overview

A phenomenological well-being tracker based on Thomas Metzinger's "eternal playlist" thought experiment. Users receive random WhatsApp prompts asking: "Would you save this moment for your eternal playlist?" Binary YES/NO responses reveal patterns in lived experience quality.

## Tech Stack

- Node.js 22, TypeScript, Fastify
- PostgreSQL with Prisma ORM
- Twilio WhatsApp API
- pnpm monorepo

## Project Structure
```
eternal-playlist/
├── apps/
│   └── api/              # Fastify backend
│       └── src/
│           └── modules/  # Feature modules (to be created)
├── packages/
│   └── shared/           # Shared types
```

## Key Concepts

- **Kairos**: The WhatsApp bot that sends prompts
- **Cycle**: A tracking period (week in weekly mode, day in daily mode)
- **Prompt**: A single "eternal playlist?" question sent to user
- **Response**: User's YES/NO answer with validity tracking

## Commands
```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server
pnpm typecheck   # Check TypeScript
```

## Architecture Principles

1. **Modular monolith**: Features in separate modules with clean boundaries
2. **Privacy-first**: Separate identity data from response data
3. **Type-safe**: Leverage TypeScript and Prisma for compile-time safety

## Coding Conventions

- Use async/await, not callbacks
- Prefer named exports
- Keep modules focused: routes, service, repository pattern
- Error messages should be user-friendly
