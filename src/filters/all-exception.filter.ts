import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as requestIp from 'request-ip'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: LoggerService,
    private httpAdapterHost: HttpAdapterHost
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const { headers, query, parmas, body } = request
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception['response'] || 'Internal Server Error'

    const responseBody = {
      headers,
      query,
      parmas,
      body,
      statusCode: status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: message
    }

    // 记录错误日志
    this.logger.error(responseBody)

    httpAdapter.reply(response, responseBody, status)
  }
}
