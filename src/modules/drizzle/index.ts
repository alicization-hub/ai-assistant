import { db, DrizzleORM, schema } from './drizzle.module'

export { DrizzleORM, db, schema }

export type DrizzleDB = typeof db
