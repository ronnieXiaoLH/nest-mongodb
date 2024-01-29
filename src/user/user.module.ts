import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'
import { Roles, RolesSchema } from '../roles/roles.schema'

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
    ]),
    MongooseModule.forFeature([
      {
        name: Roles.name,
        schema: RolesSchema
      }
    ])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
