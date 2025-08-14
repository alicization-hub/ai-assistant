import { Controller, Inject, Logger } from '@nestjs/common'

import { AppService } from './app.service'

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  @Inject(AppService)
  private readonly appService: AppService
}
