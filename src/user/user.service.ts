import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'
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

  create(user: Partial<User>) {
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
