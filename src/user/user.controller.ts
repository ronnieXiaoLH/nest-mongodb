import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.schema'

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger
  ) {}

  @Get()
  getUsers(@Query() query: any) {
    this.logger.log('get users')
    return this.userService.find(query)
  }

  @Post()
  createUser(@Body() user: Partial<User>) {
    return this.userService.create(user)
  }
}
