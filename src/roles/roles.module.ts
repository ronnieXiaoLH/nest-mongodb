import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Roles, RolesSchema } from './roles.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Roles.name,
        schema: RolesSchema
      }
    ])
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
