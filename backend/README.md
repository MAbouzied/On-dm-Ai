# ON-DM Backend

API server for the ON-DM corporate website. Handles services, blog, homepage config, team, and contact form submissions.

## Path

```
ON-DM/backend/
```

## Tech Stack

- Node.js + Express
- Prisma + SQLite (dev) / PostgreSQL (prod)
- TypeScript
- JWT for auth
- Zod for validation

## Setup

```bash
cd backend
pnpm install
cp .env.example .env
pnpm db:push
pnpm dev
```

## API Base URL

- Development: `http://localhost:4000`
- Production: Set via `BACKEND_URL` env var

## Owner

Backend Developer
