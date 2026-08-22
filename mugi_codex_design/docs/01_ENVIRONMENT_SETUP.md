# 01 Environment setup

## Required stack

| Area | Technology |
|---|---|
| Framework | Nuxt 3 |
| UI | Vue 3 |
| Language | TypeScript |
| Backend | Nuxt `server/api` |
| Runtime | Node.js LTS |
| Database | PostgreSQL |
| ORM | Prisma |
| Local database | Docker Compose |
| Validation | Zod |
| Styling | SCSS |
| Package manager | npm |
| Password hashing | `bcryptjs` |
| Upload signature validation | `file-type` |

## Required local tools

- Node.js LTS
- npm
- Git
- Docker Desktop or Docker Engine with Compose
- An editor such as Visual Studio Code

## Project creation

If the repository does not already contain a Nuxt project:

```bash
npm create nuxt@latest boulangerie-mugi-no-akari -- -t v3
cd boulangerie-mugi-no-akari
npm install
```

If the repository already contains the application, do not recreate it. Inspect and update the existing project.

## Dependencies

Runtime dependencies:

```bash
npm install @prisma/client zod bcryptjs file-type
```

Development dependencies:

```bash
npm install -D prisma sass tsx typescript vue-tsc
```

## Recommended package scripts

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "typecheck": "nuxt typecheck",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

## Docker Compose

Create or update `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: mugi-no-akari-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Environment variables

Create `.env` locally. Do not commit it.

```env
POSTGRES_USER=mugi_user
POSTGRES_PASSWORD=change_this_local_password
POSTGRES_DB=mugi_no_akari
DATABASE_URL="postgresql://mugi_user:change_this_local_password@localhost:5432/mugi_no_akari?schema=public"

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_long_unique_password
ADMIN_DISPLAY_NAME=Bakery Administrator
ADMIN_SESSION_HOURS=8

UPLOAD_DIR=public/uploads
MAX_UPLOAD_SIZE_MB=5
```

Create `.env.example` with safe placeholders, not real credentials:

```env
POSTGRES_USER=mugi_user
POSTGRES_PASSWORD=replace_me
POSTGRES_DB=mugi_no_akari
DATABASE_URL="postgresql://mugi_user:replace_me@localhost:5432/mugi_no_akari?schema=public"

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_long_unique_password
ADMIN_DISPLAY_NAME=Bakery Administrator
ADMIN_SESSION_HOURS=8

UPLOAD_DIR=public/uploads
MAX_UPLOAD_SIZE_MB=5
```

## Environment-variable rules

- `DATABASE_URL`, `ADMIN_PASSWORD`, password hashes, and session data are server-only.
- Do not place sensitive values in `runtimeConfig.public`.
- `ADMIN_PASSWORD` is used by the seed process to create or update the initial admin account. It must be hashed before database storage.
- Production must use HTTPS so the session cookie can use `Secure`.
- Do not print secrets in logs or completion reports.

## Upload directory

Create:

```txt
public/uploads/
├─ hero/
├─ menu/
├─ about/
└─ common/
```

Add an empty placeholder such as `.gitkeep` if the directory structure must exist in Git. Uploaded files themselves should normally be excluded from Git:

```gitignore
/public/uploads/*
!/public/uploads/.gitkeep
```

The implementation must create missing subdirectories safely when an upload occurs.

## Prisma setup

```bash
npx prisma init
npm run db:generate
```

For a new database:

```bash
docker compose up -d
npm run db:migrate -- --name init
npm run db:seed
```

For an existing project receiving this revision:

```bash
docker compose up -d
npm run db:migrate -- --name add_admin_media_and_hero
npm run db:seed
```

Use an accurate migration name if the actual change set differs.

## First run

```bash
docker compose up -d
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Expected local addresses:

- Nuxt: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Prisma Studio: `http://localhost:5555`
- PostgreSQL: `localhost:5432`

## Verification

```bash
npm run typecheck
npm run build
```

## Common troubleshooting

### Port 3000 is in use

```bash
npm run dev -- --port 3001
```

### Port 5432 is in use

Change the host port, for example:

```yaml
ports:
  - "5433:5432"
```

Then update `DATABASE_URL` to use port `5433`.

### Database reset for local development

This deletes local data:

```bash
docker compose down -v
docker compose up -d
npm run db:migrate -- --name init
npm run db:seed
```

### Admin login fails after changing the environment password

Run the seed again so the password hash is updated:

```bash
npm run db:seed
```

### Uploaded images disappear after deployment

The local filesystem design is intended for local or persistent-server portfolio deployment. Serverless and ephemeral environments may discard uploaded files. Replace the storage adapter with object storage before production deployment.
