# Project AI Chatbot Assistant.

This project focuses on the development of a cutting-edge **AI Chatbot Assistant** using a modular architecture for scalability and flexibility. The system is built upon a **Large Language Model (LLM)**, fine-tuned with a custom dataset to ensure domain-specific accuracy.

### ⚙️ Tech Stack

This project uses the following core technologies to support LLM interactions, embeddings storage, and containerized deployment:

- **NestJS** — Server framework (TypeScript), modular and testable.
- **OpenAI** — LLM and embeddings via the OpenAI API/SDK.
- **Drizzle ORM** — Typesafe ORM / query builder for PostgreSQL (drizzle-orm).
- **PostgreSQL + pgvector** — Primary database; use the `pgvector` extension for vector search (requires installing the `vector` extension).
- **WSL2** (recommended for Windows) — Linux-compatible development environment for local Docker/Postgres.
- **Docker** — Containerization and service orchestration (see `docker-compose.yml`).

Quick notes:

- Ensure environment variables are configured (DB credentials, ports, OpenAI key, etc.).
- The `docker/postgres-init` folder contains initialization SQL scripts that run on first Postgres init (files placed into `/docker-entrypoint-initdb.d`).
- Drizzle schema and migration files are under `src/modules/drizzle`.

Notes: If you run Docker on Windows, we recommend using WSL2 for a Linux-compatible environment.

## pgvector guidance & troubleshooting

Options to enable pgvector:

1. Use a Postgres image that includes pgvector.
2. Build a custom Postgres image that installs pgvector (recommended for production).
3. Install the extension on an existing server by connecting and running:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Important:

- Initialization scripts placed in `docker/postgres-init` run only on first initialization (when the Postgres data directory is empty). If you already have a `pg_data` volume with data, those scripts won't run.
- To enable pgvector on an existing DB, connect with `psql` and run the `CREATE EXTENSION` command above.
- To verify availability:

```sql
SELECT * FROM pg_available_extensions WHERE name = 'vector';
```

## 📋 Directory Structure

```
.
├─ src/                      # Application source (NestJS)
│  ├─ main.ts                # App bootstrap
│  ├─ constants/             # Constant values and environment validators
│  ├─ libs/                  # Reusable helpers (date, logger, utils)
│  ├─ modules/               # Feature modules
│  │  └─ drizzle/            # Drizzle integration, schema, migrations
│  └─ services/              # Shared services (cache, etc.)
├─ docker/                   # Docker helpers, postgres-init scripts
│  └─ postgres-init/         # init SQL (e.g. create extension)
```

## 🚀 Getting Started

More detailed setup instructions will be provided soon. In the meantime, here's a brief overview of what you'll need:

**Dependencies**: Install project dependencies using your preferred package manager, use one of them `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun install
```

**Environment Variables**: Configure your environment variables for database connection.

## 🚀 Compiles and hot-reloads for development

```bash
bun run start:dev
```

## 📦 Compiles and minifies for production

```bash
bun run build
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
