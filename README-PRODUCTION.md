Production deployment (Docker)

Quick steps (recommended):

1) Build and run using Docker Compose (will run Postgres and the app):

```bash
# from repo root
docker compose up -d --build
```

2) Open the app at http://localhost:5000/

3) To stop and remove containers:

```bash
docker compose down
```

Notes:
- The compose file mounts `server/init.sql` into Postgres' init directory so the seed data will be applied on first run.
- Set `SITE_PASSWORD` to a secure value before deploying to production.
- You can also build a single container and deploy to your hosting provider with the provided `Dockerfile`.
