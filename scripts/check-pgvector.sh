#!/usr/bin/env bash
# checks pgvector availability in the running Postgres container and creates the extension if available
# Usage: ./scripts/check-pgvector.sh [container_name]
# Defaults assume container name 'postgresql' and environment variables DB_NAME/DB_USER are set or fallback to postgres

set -euo pipefail
CONTAINER=${1:-postgresql}
DB_NAME=${DB_NAME:-postgres}
DB_USER=${DB_USER:-postgres}

# try to source .env if present (bash)
if [ -f .env ]; then
  # shellcheck disable=SC1091
  set -a
  . .env
  set +a
  DB_NAME=${DB_NAME:-$DB_NAME}
  DB_USER=${DB_USER:-$DB_USER}
fi

echo "Checking pgvector availability on container '${CONTAINER}' (DB: ${DB_NAME}, USER: ${DB_USER})"

# check if container exists
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
  echo "Container '${CONTAINER}' not found. Is it running?"
  exit 2
fi

# run query to see if extension is available
RESULT=$(docker exec -i ${CONTAINER} psql -U "${DB_USER}" -d "${DB_NAME}" -tAc "SELECT count(*) FROM pg_available_extensions WHERE name = 'vector';" 2>/dev/null || true)

if [ "${RESULT}" = "0" ] || [ -z "${RESULT}" ]; then
  echo "pgvector not installed in server image (no available extension named 'vector')."
  echo "If the server image supports pgvector but it's not enabled for this DB, attempting to create extension..."
  # attempt to create extension
  if docker exec -i ${CONTAINER} psql -U "${DB_USER}" -d "${DB_NAME}" -c "CREATE EXTENSION IF NOT EXISTS vector;"; then
    echo "CREATE EXTENSION command executed (check output above)."
  else
    echo "Failed to create extension. The server image may not include pgvector. Consider using an image with pgvector installed or building a custom image."
    exit 3
  fi
else
  echo "pgvector is available on the server (found ${RESULT} row(s) in pg_available_extensions)."
fi
