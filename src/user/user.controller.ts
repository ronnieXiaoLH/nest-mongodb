import { Controller, Get, Logger } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger
  ) {}

  @Get()
  getUsers() {
    this.logger.log('get users')
    return this.userService.find()
  }
}
