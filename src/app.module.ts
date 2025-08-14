import { CacheModule } from '@nestjs/cache-manager'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { CACHE, ENV, JWT, REDIS } from '@/constants/env'
import { LoggerMiddleware } from '@/libs/logger'
import { AliceModule } from '@/modules/alice/alice.module'
import { DrizzleModule } from '@/modules/drizzle/drizzle.module'
import { CacheConfigService } from '@/services/cache.service'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [() => ({ CACHE, ENV, JWT, REDIS })]
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService
    }),
    ScheduleModule.forRoot(),
    DrizzleModule,
    AliceModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (ENV.APP_MODE === 'local') {
      consumer.apply(LoggerMiddleware).forRoutes({ path: '/*', method: RequestMethod.ALL })
    }
  }
}
