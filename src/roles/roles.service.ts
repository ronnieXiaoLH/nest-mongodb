import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Roles } from './roles.schema'
import { Model } from 'mongoose'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private rolesModel: Model<Roles>) {}

  find() {
    return this.rolesModel.find()
  }

  create(role: Roles) {
    console.log('role', role)
    return this.rolesModel.create(role)
  }
}
