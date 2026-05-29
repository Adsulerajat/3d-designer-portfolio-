Local Postgres setup and initialization

1) Run Postgres with Docker (recommended):

```bash
docker run --name pa-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:15
```

2) Initialize schema and seed data:

```bash
# from the repo root
psql "postgresql://postgres:postgres@localhost:5432/portfolio" -f server/init.sql
```

3) Set `DATABASE_URL` (PowerShell):

```powershell
$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/portfolio"
$env:NODE_ENV="development"
npx tsx server/index.ts
```

4) Alternatively, use a local psql client or GUI and run `server/init.sql`.

Notes:
- The project already includes an in-memory fallback when `DATABASE_URL` is not set, so the app works without Postgres for demos.
- If you prefer persistent DB-backed data, run the steps above and restart the server.
