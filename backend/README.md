# ON-DM Backend

API server for the ON-DM corporate website. Handles services, blog, homepage config, team, and contact form submissions.

## Path

```
ON-DM/backend/
```

## Tech Stack

- Node.js + Express
- Prisma + MySQL
- TypeScript
- JWT for auth
- Zod for validation

## Setup

1. **Install MySQL** - See [MYSQL-SETUP.md](./MYSQL-SETUP.md) for Docker, XAMPP, or standalone options.

2. **Configure** - Copy `.env.example` to `.env` and set `DATABASE_URL`:
   ```
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/ondm"
   ```

3. **Migrate and seed**:
   ```bash
   cd backend
   pnpm install
   pnpm prisma migrate dev --name init_mysql
   pnpm db:seed
   pnpm dev
   ```

## API Base URL

- Development: `http://localhost:4000`
- Production: Set via `BACKEND_URL` env var

## Owner

Backend Developer
