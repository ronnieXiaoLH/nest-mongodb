import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Request, Response } from 'express'
import { Issuer } from 'openid-client'
import { configEnum } from 'src/enum/config.enum'

@Injectable()
export class OidcMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request & { oidc: any }, res: Response, next: NextFunction) {
    console.log('OidcMiddleware...')
    const issuer = await Issuer.discover(
      this.configService.get(configEnum.DISCOVER_URL)
    )

    const client = new issuer.Client({
      client_id: this.configService.get(configEnum.APP_ID),
      client_secret: this.configService.get(configEnum.APP_SECRET),
      redirect_uri: this.configService.get(configEnum.CALLBACK_URL),
      response_type: 'code'
    })

    req.oidc = {
      client,
      config: {
        callbackUrl: this.configService.get(configEnum.CALLBACK_URL),
        successUrl: this.configService.get(configEnum.SUCCESS_URL)
      }
    }

    next()
  }
}
