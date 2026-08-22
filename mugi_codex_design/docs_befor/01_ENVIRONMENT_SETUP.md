# 01_ENVIRONMENT_SETUP.md

## Purpose

This document defines the required local development environment and setup commands for the Boulangerie Mugi no Akari project.

## Technology stack

Use this stack:

| Area | Technology |
|---|---|
| Framework | Nuxt 3 |
| UI | Vue 3 |
| Language | TypeScript |
| Backend | Nuxt `server/api` |
| Runtime | Node.js LTS |
| Database | PostgreSQL |
| ORM | Prisma |
| Local DB | Docker Compose |
| Validation | Zod |
| Styling | SCSS |
| Package manager | npm |

## Required tools

Install the following on the local machine:

- Node.js LTS
- npm
- Git
- Docker Desktop
- Visual Studio Code or another editor

## Project creation

Create a new Nuxt 3 project.

```bash
npm create nuxt@latest boulangerie-mugi-no-akari -- -t v3
cd boulangerie-mugi-no-akari
npm install
```

If the Nuxt starter asks questions, choose TypeScript-compatible defaults and keep the setup simple.

## Dependency installation

Install runtime dependencies:

```bash
npm install @prisma/client zod
```

Install development dependencies:

```bash
npm install -D prisma sass tsx
```

## Recommended package scripts

Add or confirm the following scripts in `package.json`.

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  }
}
```

## Docker Compose

Create `docker-compose.yml` at the project root.

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: mugi-no-akari-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: mugi_user
      POSTGRES_PASSWORD: mugi_password
      POSTGRES_DB: mugi_no_akari
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Start PostgreSQL:

```bash
docker compose up -d
```

Stop PostgreSQL:

```bash
docker compose down
```

Delete DB volume when a complete reset is required:

```bash
docker compose down -v
```

## Environment variables

Create `.env` at the project root.

```env
DATABASE_URL="postgresql://mugi_user:mugi_password@localhost:5432/mugi_no_akari?schema=public"
```

Never expose `DATABASE_URL` to frontend code. Use it only from Prisma and Nuxt server code.

Create `.env.example`.

```env
DATABASE_URL="postgresql://mugi_user:mugi_password@localhost:5432/mugi_no_akari?schema=public"
```

## Prisma initialization

Initialize Prisma.

```bash
npx prisma init
```

Then replace `prisma/schema.prisma` with the schema defined in `docs/03_DATABASE_DESIGN.md`.

Generate Prisma Client:

```bash
npm run db:generate
```

Create and apply migration:

```bash
npm run db:migrate -- --name init
```

Seed database:

```bash
npm run db:seed
```

Open Prisma Studio when needed:

```bash
npm run db:studio
```

## First development run

Start DB:

```bash
docker compose up -d
```

Run migration and seed:

```bash
npm run db:migrate -- --name init
npm run db:seed
```

Start Nuxt:

```bash
npm run dev
```

Open the local URL displayed by Nuxt.

## Expected local URLs

- Nuxt app: `http://localhost:3000`
- Prisma Studio: `http://localhost:5555`
- PostgreSQL: `localhost:5432`

## Common troubleshooting

### Port 3000 is already in use

Use another port:

```bash
npm run dev -- --port 3001
```

### Port 5432 is already in use

Either stop the existing PostgreSQL process or change the Docker Compose port mapping.

Example:

```yaml
ports:
  - "5433:5432"
```

Then update `.env`:

```env
DATABASE_URL="postgresql://mugi_user:mugi_password@localhost:5433/mugi_no_akari?schema=public"
```

### Prisma Client is not generated

Run:

```bash
npm run db:generate
```

### DB needs a clean reset

Only do this for local development:

```bash
docker compose down -v
docker compose up -d
npm run db:migrate -- --name init
npm run db:seed
```
