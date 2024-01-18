import { Body, Controller, Get, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Roles } from './roles.schema'

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.find()
  }

  @Post()
  createRoles(@Body() role: Roles) {
    return this.rolesService.create(role)
  }
}
