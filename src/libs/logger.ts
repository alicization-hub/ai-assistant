import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { differenceInMilliseconds } from 'date-fns'
import { FastifyReply, FastifyRequest } from 'fastify'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name)

  @Inject(ConfigService)
  private readonly configService: ConfigService

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const isProduction = this.configService.get('ENV.APP_MODE') === 'production'
    const now = Date.now()

    res.on('close', () => {
      const message = [
        `\x1b[34m[${req.method}]`,
        `\x1b[37m"${req.url}"`,
        `~ \x1b[35m${differenceInMilliseconds(Date.now(), now)}ms\x1b[0m`
      ].join(' ')

      if (isProduction) {
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        this.logger.debug(`\x1b[36m[${ipAddress}]`, message)
      } else {
        this.logger.debug(message)

        // if (req?.query && Object.keys(req.query).length) {
        //   this.logger.log('Query:', req.query)
        // }

        // if (req?.params && Object.keys(req.params).length) {
        //   this.logger.log('Params', req.params)
        // }

        // if (req?.body && Object.keys(req.body).length) {
        //   this.logger.log('Body', req.body)
        // }
      }
    })

    // Ends middleware function execution, hence allowing to move on
    if (next) next()
  }
}

// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"
// FgGray = "\x1b[90m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"
// BgGray = "\x1b[100m"
