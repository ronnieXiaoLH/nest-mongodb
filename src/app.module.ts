import { Global, Logger, Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { configEnum } from './enum/config.enum'

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
    UserModule
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger]
})
export class AppModule {}
