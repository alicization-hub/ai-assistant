import { relations } from 'drizzle-orm'
import { boolean, index, pgTable, serial, text, vector } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns } from '../utils'

export const documents = pgTable(
  'documents',
  {
    id: serial('id').primaryKey(),
    source: text('source'),
    title: text('title'),
    content: text('content').notNull(),
    vector: vector('vector', { dimensions: 1536 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    ...sharedTimestampConumns
  },
  (self) => [index().using('hnsw', self.vector.op('vector_cosine_ops'))]
).enableRLS()

// ********************** Relations ********************** \\

// export const documentsRelations = relations(documents, ({ one, many }) => ({}))
