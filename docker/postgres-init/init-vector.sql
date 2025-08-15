-- init-vector.sql
-- This runs during Postgres first init (files in /docker-entrypoint-initdb.d).
-- It will attempt to create the `vector` extension only if the image provides it.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_available_extensions WHERE name = 'vector') THEN
    CREATE EXTENSION IF NOT EXISTS vector;
  ELSE
    RAISE NOTICE 'pgvector extension not available in this image; skipping CREATE EXTENSION vector.';
  END IF;
END
$$;
