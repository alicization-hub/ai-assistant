import { Global, Module } from '@nestjs/common'
import AI from 'openai'

import { ENV } from '@/constants/env'

import { AliceService } from './alice.service'

export const AliceAI = 'ALICE_AI_PROVIDER'
export const instance = new AI({ apiKey: ENV.OPENAI_KEY })

@Global()
@Module({
  imports: [AliceService],
  providers: [
    {
      provide: AliceAI,
      useValue: instance
    }
  ],
  controllers: [],
  exports: [AliceAI, AliceService]
})
export class AliceModule {}
