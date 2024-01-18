import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  find(query: any) {
    // console.log('connect', this.connection)
    // const UserModel = this.connection.models.User
    // console.log('User', UserModel)
    // return UserModel.find(query)

    return this.userModel.find(query)
  }

  create(user: Partial<User>) {
    return this.userModel.create(user)
  }
}
