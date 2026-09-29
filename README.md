# Student Management API

ExpressJS and PostgreSQL API for managing classes (`lophoc`) and students
(`sinhvien`). Prisma manages the database schema and sample data; PostgreSQL
runs in Docker with a persistent named volume.

## Project structure

```text
src/
  config/prisma.js          Prisma client singleton
  repositories/             Database queries through Prisma
  controllers/              Validation and HTTP responses
  routes/                   API endpoints
prisma/schema.prisma        Prisma models mapped to PostgreSQL tables
```

Controllers do not contain SQL. To change a query or replace the persistence
implementation, update the relevant repository instead.

## Run

1. Start PostgreSQL:

   ```powershell
   docker compose up -d
   ```

2. Install packages if `node_modules` is not available:

   ```powershell
   npm install
   ```

3. Apply Prisma migrations and load sample data for a new database:

   ```powershell
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. Start the API:

   ```powershell
   npm run dev
   ```

The API is available at `http://localhost:3000`. PostgreSQL is exposed at
`localhost:5433` because port 5432 is already used by a local PostgreSQL
installation on this computer.

To stop PostgreSQL, use `docker compose down`. `down -d` is not a valid
Compose command. The data volume is retained. For a completely fresh database,
run `docker compose down -v`, then start Docker and rerun the migration plus
seed commands above.

## Environment

Copy the values in `.env` if the database configuration changes:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/my_database?schema=public"
```

## Prisma commands

```powershell
# Regenerate the client after modifying prisma/schema.prisma
npm run prisma:generate

# Validate the Prisma schema
npm run prisma:validate

# Open the visual Prisma database editor
npm run prisma:studio

# Apply committed migrations
npm run prisma:migrate

# Insert 50 sample classes and 50 sample students into an empty database
npm run prisma:seed
```

`schema.prisma` maps `LopHoc` to `lophoc` and `SinhVien` to `sinhvien`, so
the existing SQL table names and API response names remain unchanged.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/lophoc` | List classes |
| GET | `/api/lophoc/:id` | Get one class |
| POST | `/api/lophoc` | Create a class |
| PUT | `/api/lophoc/:id` | Update a class |
| DELETE | `/api/lophoc/:id` | Delete a class |
| GET | `/api/sinhvien` | List students, with class name |
| GET | `/api/sinhvien/:id` | Get one student |
| POST | `/api/sinhvien` | Create a student |
| PUT | `/api/sinhvien/:id` | Update a student |
| DELETE | `/api/sinhvien/:id` | Delete a student |

Create a class:

```json
{ "ten_lop": "CNTT K17A" }
```

Create or update a student:

```json
{
  "ho_ten": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "tuoi": 20,
  "lop_id": 1
}
```
