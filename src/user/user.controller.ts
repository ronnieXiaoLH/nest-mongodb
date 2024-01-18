import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
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

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.findByIdAndUpdate(id, body)
  }

  @Get('/:id/profile')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id)
  }
}
