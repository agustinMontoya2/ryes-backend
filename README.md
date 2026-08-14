# ryes-backend

Backend de Ryes (laboratorio dental) en NestJS. Repo base creado a partir de
[`planning/BASE-PROYECTO-EXPORTABLE.md`](./planning/BASE-PROYECTO-EXPORTABLE.md):
solo infraestructura y utilidades, sin entidades ni lógica de negocio.

## Stack

- NestJS 10 + TypeScript
- TypeORM (configurado, sin entidades aún) + PostgreSQL
- Swagger (`/api/v1/docs`), Helmet, CORS, ValidationPipe
- Envelope global de respuestas y errores (`src/common`)
- ESLint guardián + Husky/lint-staged + Jest

## Setup

```bash
cp .env.example .env
npm install
npm run db:up        # levanta Postgres en el puerto 5434 (Docker Compose)
npm run start:dev
```

Postgres corre en el host `localhost:5434` (ver `docker-compose.yml`).
Bajarlo con `npm run db:down`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run start:dev` | Nest en modo watch |
| `npm run lint` | Lint + autofix (falla si queda cualquier warning/error) |
| `npm run lint:check` | Lint sin modificar (CI) |
| `npm run typecheck` | `tsc --noEmit` sin specs |
| `npm test` | Jest |
| `npm run build` | Compilación Nest |
