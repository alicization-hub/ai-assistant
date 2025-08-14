import { Global, Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { DATABASE_URL } from '@/constants/env'

import * as documents from './schema/documents.schema'

export const DrizzleORM = 'DRIZZLE_PROVIDER'

/**
 * @link https://node-postgres.com/apis/pool
 */
const pool = new Pool({ connectionString: DATABASE_URL, allowExitOnIdle: true })

export const schema = Object.freeze({
  ...documents
})

export const db = drizzle({
  client: pool,
  schema,
  logger: false,
  casing: 'camelCase'
})

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DrizzleORM,
      useValue: db
    }
  ],
  controllers: [],
  exports: [DrizzleORM]
})
export class DrizzleModule {}
