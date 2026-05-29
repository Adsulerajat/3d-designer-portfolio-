# 3D Designer Portfolio

Modern animated portfolio built with React + Vite and a TypeScript Express backend.

A polished, demo-ready portfolio website showcasing robotics and 3D design projects. Includes seeded project data, an in-memory fallback for quick demos, and Docker/Compose files for production deployment.

## Features

- Animated React UI with image carousel and project cards
- Project detail pages with gallery and embedded demo videos
- TypeScript Express API serving projects and contact endpoints
- In-memory seeded data for local demos (no database required)
- Production-ready Dockerfile and `docker-compose.yml` with Postgres

## Quick start (development)

```powershell
cd "Portfolio-Animator"
npm install
# Run full server (API + client)
$env:NODE_ENV="development"
npx tsx server/index.ts
# open http://localhost:5000/ or http://localhost:5173/
```

## Production (Docker Compose)

```bash
docker compose up -d --build
# open http://localhost:5000/
```

## Database

- For demo purposes the app provides an in-memory fallback. To use Postgres, run the SQL in `server/init.sql` to create tables and seed data.
- See `server/README-db.md` for instructions on initializing a local Postgres and setting `DATABASE_URL`.

## Environment

Copy `.env.example` to `.env` and set values before running a production build. Do NOT commit real secrets to the repo.

## License

This project is licensed under the MIT License. See `LICENSE`.
