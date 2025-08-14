import { defineConfig } from 'drizzle-kit'

import { DATABASE_URL } from '@/constants/env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/modules/drizzle/schema/*.schema.ts',
  out: './src/modules/drizzle/migrations',
  dbCredentials: {
    url: DATABASE_URL
  },
  introspect: {
    casing: 'camel'
  }
})
