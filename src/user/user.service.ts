import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'
import * as argon2 from 'argon2'
import { User } from './user.schema'
import { Roles } from 'src/roles/roles.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Roles.name) private rolesModel: Model<Roles>
  ) {}

  find(query: any) {
    // console.log('connect', this.connection)
    // const UserModel = this.connection.models.User
    // console.log('User', UserModel)
    // return UserModel.find(query)

    return this.userModel.find(query)
  }

  async findOne(query: any) {
    return this.userModel.findOne(query)
  }

  async create(user: Partial<User>) {
    // 加密用户的密码
    user.password = await argon2.hash(user.password)

    return this.userModel.create(user)
  }

  async findByIdAndUpdate(id: string, body: any) {
    if (body.roles?.length) {
      body.roles = await this.rolesModel.find({
        roleId: {
          $in: body.roles
        }
      })
    }

    return await this.userModel.findByIdAndUpdate(id, body, {
      new: true
    })
  }

  async getProfile(id: string) {
    return this.userModel.findById(id, {
      profile: 1
    })
  }
}
