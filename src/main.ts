import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { ENV } from '@/constants/env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  )

  app.enableShutdownHooks()
  app.enableCors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin || ENV.CORS.some((li) => requestOrigin.includes(li))) {
        callback(null, true)
      } else {
        callback(new Error(`Incoming Origin: "${requestOrigin}", Not allowed by CORS`), false)
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 3600
  })

  await app.listen(ENV.PORT, () => {
    new Logger('NestApplication').log(`Server started at port: \x1b[0m${ENV.PORT}`)
  })
}

bootstrap()
