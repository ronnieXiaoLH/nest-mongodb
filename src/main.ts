import { NestFactory } from '@nestjs/core'
import { createLogger, transports, format } from 'winston'
import { WinstonModule, utilities } from 'nest-winston'
import 'winston-daily-rotate-file'
import { AppModule } from './app.module'

declare const module: any

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(format.timestamp(), utilities.format.nestLike())
      }),
      new transports.DailyRotateFile({
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: format.combine(format.timestamp(), format.simple())
      })
    ]
  })

  const logger = WinstonModule.createLogger({
    instance
  })

  const app = await NestFactory.create(AppModule, {
    // 改写内置的 logger 为 winston 的 logger
    logger
  })

  app.setGlobalPrefix('/api/v1')

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
