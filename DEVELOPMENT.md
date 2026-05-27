# Development Setup

Local setup for the SOB Supporter Platform. See [architecture.md](./architecture.md)
for the design and [README.md](./README.md) for the product overview.

## Stack

- **Frontend:** Angular 21 (`frontend/`)
- **Backend:** NestJS 11 (`backend/`)
- **Database:** PostgreSQL 16 (via Docker)

## Prerequisites

- Node.js 20+
- Docker Desktop (for PostgreSQL)

## 1. Start the database

From the repository root:

```bash
docker compose up -d
```

This runs PostgreSQL on host port **5433** (5432 is left free for any local
Postgres install). Credentials come from `docker-compose.yml`:
`sob` / `sob_password`, database `sob_platform`.

## 2. Run the backend (API)

```bash
cd backend
npm install            # first time only
cp .env.example .env   # first time only (already present in dev)
npm run start:dev      # watch mode, http://localhost:3000/api
```

Health check: `GET http://localhost:3000/api/health`

Clubs are auto-seeded on first boot. Schema is auto-synced in development
(`synchronize: true`); use migrations before going to production.

### Implemented API endpoints (Phase 1)

| Method | Path                | Auth   | Description                         |
|--------|---------------------|--------|-------------------------------------|
| GET    | `/api/health`       | —      | Service health                      |
| GET    | `/api/clubs`        | —      | List clubs                          |
| GET    | `/api/clubs/:id`    | —      | Get a club                          |
| POST   | `/api/auth/register`| —      | Register (optional `favoriteClubId`)|
| POST   | `/api/auth/login`   | —      | Log in, returns JWT                 |
| GET    | `/api/auth/me`      | Bearer | Current user profile                |

## 3. Run the frontend

```bash
cd frontend
npm install            # first time only
npm start              # http://localhost:4200
```

The API base URL is configured in `frontend/src/environments/environment.ts`.

## Project layout

```
Sob-Donation-Platform/
├── backend/        # NestJS API (auth, clubs, users)
├── frontend/       # Angular app (landing, auth, dashboard)
├── docker-compose.yml
├── README.md       # product overview
├── architecture.md # technical design
└── DEVELOPMENT.md  # this file
```

## Roadmap (by phase)

1. ✅ Foundation: auth, clubs, users, app shell, route guards
2. ⬜ Membership & Stripe subscriptions (`MembershipGuard` already in place)
3. ⬜ Step tracking + streaks
4. ⬜ Leaderboards (individual / team / streak)
5. ⬜ Monthly challenges
6. ⬜ Updates & impact reports
