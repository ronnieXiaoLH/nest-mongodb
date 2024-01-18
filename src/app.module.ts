import { Global, Logger, Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`]
    }),
    UserModule
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger]
})
export class AppModule {}
