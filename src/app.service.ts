import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AliceAI, type OpenAI } from '@/modules/alice'
import { DrizzleORM, type DrizzleDB } from '@/modules/drizzle'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  @Inject(ConfigService)
  private readonly configService: ConfigService

  @Inject(DrizzleORM)
  private readonly db: DrizzleDB

  @Inject(AliceAI)
  private readonly ai: OpenAI
}
