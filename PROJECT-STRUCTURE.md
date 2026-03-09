# ON-DM Project Structure

This document defines the folder structure and ownership for the ON-DM corporate website project.

---

## Repository Layout

```
ON-DM/
├── backend/          ← Backend Developer
├── frontend/         ← Frontend Developer
├── .cursor/          ← Project config (Dr. Sayed subagent)
└── PROJECT-STRUCTURE.md
```

---

## Backend

**Path:** `ON-DM/backend/`  
**Owner:** Backend Developer

**Full path:** `/Users/mohamedabouzied/Documents/ON-DM/backend`

### Contents

| Folder/File | Purpose |
|-------------|---------|
| `src/` | API server (Express), routes, controllers, middleware |
| `prisma/` | Database schema, migrations |
| `package.json` | Dependencies, scripts |

### Responsibilities

- API endpoints (auth, services, blog, homepage, team, contact)
- Database (Prisma + SQLite/PostgreSQL)
- Authentication (admin login)
- Contact form submission handling
- Email sending (contact notifications)

### Run

```bash
cd backend
pnpm install
pnpm dev
```

Runs on **port 4000** by default.

---

## Frontend

**Path:** `ON-DM/frontend/`  
**Owner:** Frontend Developer

**Full path:** `/Users/mohamedabouzied/Documents/ON-DM/frontend`

### Contents

| Folder/File | Purpose |
|-------------|---------|
| `src/app/` | Next.js pages (marketing site + dashboard) |
| `src/components/` | React components |
| `src/lib/` | API client, utils, constants |
| `src/i18n/` | Internationalization (EN/AR) |
| `public/` | Static assets |
| `messages/` | Translation files (en.json, ar.json) |
| `package.json` | Dependencies, scripts |

### Responsibilities

- Public website (home, services, work, blog, about, contact)
- Admin dashboard UI
- i18n (English & Arabic)
- Styling (Tailwind)
- API consumption via `NEXT_PUBLIC_API_URL`

### Run

```bash
cd frontend
pnpm install
pnpm dev
```

Runs on **port 3000** by default.

---

## QA

**Path:** Entire repository  
**Owner:** QA Engineer

**Full path:** `/Users/mohamedabouzied/Documents/ON-DM`

### Responsibilities

- End-to-end testing (frontend + backend integrated)
- API testing
- UI/UX testing
- Accessibility testing
- Cross-browser testing

### Test Setup

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`
- Run both: `pnpm dev` (from root)

---

## Root Commands

From project root (`ON-DM/`):

| Command | Action |
|---------|--------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm dev` | Run backend + frontend in parallel |
| `pnpm dev:backend` | Run backend only |
| `pnpm dev:frontend` | Run frontend only |
| `pnpm build` | Build both packages |

---

## Environment Variables

### Backend (`backend/.env`)

```
DATABASE_URL="file:./dev.db"
PORT=4000
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="..."
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Path Summary

| Role | Primary Path |
|------|--------------|
| **Backend Developer** | `ON-DM/backend/` |
| **Frontend Developer** | `ON-DM/frontend/` |
| **QA Engineer** | `ON-DM/` (full repo) |

---

## Cursor Agents

Each role has a dedicated subagent. Use `/agent-name` to invoke explicitly.

| Agent | Folder | Invoke |
|-------|--------|--------|
| **ondm-backend-developer** | `backend/` | `/ondm-backend-developer` |
| **ondm-frontend-developer** | `frontend/` | `/ondm-frontend-developer` |
| **ondm-qa-engineer** | Full repo | `/ondm-qa-engineer` |
| **dr-sayed-on-dm-orchestrator** | Read-only, strategy | `/dr-sayed-on-dm-orchestrator` |

**Folder connection:** When you open files in `backend/`, Cursor rules suggest delegating to the backend developer. Same for `frontend/` and QA.
