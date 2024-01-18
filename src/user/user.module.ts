import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: User.name,
    //     schema: UserSchema
    //   }
    // ])
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema
          schema.pre('save', () => {
            console.log('Hello from pre save')
          })
          return schema
        }
      }
    ])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
