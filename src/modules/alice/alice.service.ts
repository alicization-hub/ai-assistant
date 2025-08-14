import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { cosineDistance, desc, getTableColumns, gt, sql } from 'drizzle-orm'
import { pick } from 'ramda'

import { AliceAI, type OpenAI } from '@/modules/alice'
import { DrizzleORM, schema, type DrizzleDB } from '@/modules/drizzle'

@Injectable()
export class AliceService {
  private readonly logger = new Logger(AliceService.name)

  @Inject(ConfigService)
  private readonly configService: ConfigService

  @Inject(DrizzleORM)
  private readonly db: DrizzleDB

  @Inject(AliceAI)
  private readonly ai: OpenAI

  async generateVector(content: string) {
    const input = content.replaceAll('\n', ' ')
    const { data } = await this.ai.embeddings.create({
      model: 'text-embedding-3-small',
      input
    })

    if (!data.length || !data[0].embedding) {
      throw new Error('Failed to generate embedding.')
    }

    return data[0].embedding
  }

  async findSimilar(content: string, threshold: number = 0.7) {
    const documentColumns = getTableColumns(schema.documents)
    const vector = await this.generateVector(content)

    const similarity = sql<number>`1 - (${cosineDistance(schema.documents.vector, vector)})`
    const similar = await this.db
      .select({
        ...pick(['title', 'content', 'source', 'vector'], documentColumns),
        similarity
      })
      .from(schema.documents)
      .where(gt(similarity, threshold))
      .orderBy(desc(similarity))
      .limit(10)

    return similar
  }
}
