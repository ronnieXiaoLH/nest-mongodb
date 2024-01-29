import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtGuard } from '../gurads/jwt.guard'
import { Request } from 'express'
import { AdminGuard } from 'src/gurads/admin.gurad'

@UseGuards(JwtGuard) // 控制器级别的守卫
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger
  ) {}

  @UseGuards(AdminGuard)
  @Get()
  getUsers(@Query() query: any) {
    this.logger.log('get users')
    return this.userService.find(query)
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.findByIdAndUpdate(id, body)
  }

  // @UseGuards(JwtGuard) // JWT 验证，方法级别的守卫
  @Get('/:id/profile')
  getProfile(@Param('id') id: string, @Req() req: Request & { user: any }) {
    // 经过 JWT 验证的接口 req.user 里有用户的信息
    console.log('req.user', req.user)
    return this.userService.getProfile(id)
  }
}
