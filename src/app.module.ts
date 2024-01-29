import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { configEnum } from './enum/config.enum'
import { RolesModule } from './roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { OidcMiddleware } from './middlewares/oidc.middleware'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`]
    }),
    // MongooseModule.forRoot(`mongodb://127.0.0.1:27017/nest-demo`),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(configEnum.DB_HOST)}:${configService.get(configEnum.DB_PORT)}/nest-demo`
      })
    }),
    UserModule,
    RolesModule,
    AuthModule
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger]
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OidcMiddleware).forRoutes({
      path: '/user/oidc',
      method: RequestMethod.GET
    })

    consumer.apply(OidcMiddleware).forRoutes({
      path: '/user/oidc/callback',
      method: RequestMethod.GET
    })
  }
}
